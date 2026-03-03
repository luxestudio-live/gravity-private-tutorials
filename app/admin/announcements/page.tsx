'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { Plus, Edit2, Trash2, Bell } from 'lucide-react'

type Announcement = {
  id: string
  message: string
  order: number
  active: boolean
  createdAt?: number
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    message: '',
    order: '1',
    active: true,
  })

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      setLoading(true)
      const snap = await getDocs(collection(db, 'announcements'))
      const list = snap.docs
        .map((item) => ({ id: item.id, ...item.data() }) as Announcement)
        .sort((a, b) => {
          if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999)
          return (a.createdAt ?? 0) - (b.createdAt ?? 0)
        })
      setAnnouncements(list)
    } catch (error) {
      console.error('Error fetching announcements:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({ message: '', order: '1', active: true })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.message.trim()) {
      alert('Message is required')
      return
    }

    try {
      setSaving(true)

      const payload = {
        message: formData.message.trim(),
        order: Number(formData.order) || 1,
        active: formData.active,
      }

      if (editingId) {
        await updateDoc(doc(db, 'announcements', editingId), payload)
        alert('Announcement updated')
      } else {
        await addDoc(collection(db, 'announcements'), {
          ...payload,
          createdAt: Date.now(),
        })
        alert('Announcement added')
      }

      resetForm()
      await fetchAnnouncements()
    } catch (error) {
      console.error('Error saving announcement:', error)
      alert('Error: ' + (error as any).message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: Announcement) => {
    setFormData({
      message: item.message,
      order: String(item.order ?? 1),
      active: item.active !== false,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this announcement?')) return

    try {
      await deleteDoc(doc(db, 'announcements', id))
      await fetchAnnouncements()
    } catch (error) {
      console.error('Error deleting announcement:', error)
      alert('Error: ' + (error as any).message)
    }
  }

  const handleToggleActive = async (item: Announcement) => {
    try {
      await updateDoc(doc(db, 'announcements', item.id), {
        active: item.active === false,
      })
      await fetchAnnouncements()
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Error: ' + (error as any).message)
    }
  }

  return (
    <div className="py-4 md:py-6">
      <div className="flex items-center justify-between gap-4 mb-4 md:mb-6 flex-wrap">
        <h1 className="text-2xl md:text-4xl font-bold">Top Bar Announcements</h1>
        <button
          onClick={() => {
            if (showForm) {
              resetForm()
            } else {
              setShowForm(true)
            }
          }}
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm md:text-base"
        >
          <Plus className="w-4 h-4" />
          {showForm ? 'Cancel' : 'Add Announcement'}
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <Bell className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p>Announcements appear at the top of public pages only when active items exist.</p>
            <p>They rotate automatically in a loop based on order (lowest to highest).</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{editingId ? 'Edit Announcement' : 'Add Announcement'}</h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Message *</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="e.g., Admissions are open for 2025-2026"
                rows={3}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  min={1}
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>

              <div className="flex items-center gap-3 pt-8">
                <input
                  id="active"
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4"
                />
                <label htmlFor="active" className="text-sm font-medium">Active (show in top bar)</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-70"
            >
              {saving ? 'Saving...' : editingId ? 'Update Announcement' : 'Add Announcement'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-border">
          <h3 className="text-lg md:text-xl font-bold">Announcement List</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : announcements.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No announcements yet. Add one to show the top bar.</div>
        ) : (
          <div className="divide-y divide-border">
            {announcements.map((item) => (
              <div key={item.id} className="p-4 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-sm md:text-base font-medium break-words">{item.message}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <span className="px-2 py-1 rounded bg-muted">Order: {item.order ?? 1}</span>
                    <span className={`px-2 py-1 rounded ${item.active === false ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      {item.active === false ? 'Inactive' : 'Active'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleToggleActive(item)}
                    className="px-3 py-2 text-xs md:text-sm rounded bg-muted hover:bg-muted/80"
                  >
                    {item.active === false ? 'Activate' : 'Deactivate'}
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 rounded hover:bg-primary/10"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 rounded text-destructive hover:bg-destructive/10"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
