'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { Plus, Edit2, Trash2, Star } from 'lucide-react'

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

type FeaturedItem = {
  id: string
  title: string
  description: string
  image?: string
  ctaText?: string
  ctaLink?: string
  order?: number
  active?: boolean
  createdAt?: number
}

const MAX_TITLE_LENGTH = 70
const MAX_DESCRIPTION_LENGTH = 170
const MAX_CTA_TEXT_LENGTH = 28

export default function FeaturedAdminPage() {
  const [items, setItems] = useState<FeaturedItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    ctaText: '',
    ctaLink: '',
    order: '1',
    active: true,
  })

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    try {
      setLoading(true)
      const snap = await getDocs(collection(db, 'featuredItems'))
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as FeaturedItem)
        .sort((a, b) => {
          if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999)
          return (a.createdAt ?? 0) - (b.createdAt ?? 0)
        })
      setItems(list)
    } catch (error) {
      console.error('Error fetching featured items:', error)
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      ctaText: '',
      ctaLink: '',
      order: '1',
      active: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSaving(true)
    const uploadData = new FormData()
    uploadData.append('file', file)
    uploadData.append('upload_preset', 'gallery_uploads')

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: uploadData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Upload failed')
      }

      const data = await response.json()
      setFormData({ ...formData, image: data.secure_url })
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Image upload failed: ' + (error as any).message)
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim() || !formData.description.trim()) {
      alert('Title and description are required')
      return
    }

    if (formData.title.trim().length > MAX_TITLE_LENGTH) {
      alert(`Title must be ${MAX_TITLE_LENGTH} characters or less`)
      return
    }

    if (formData.description.trim().length > MAX_DESCRIPTION_LENGTH) {
      alert(`Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`)
      return
    }

    if (formData.ctaText.trim().length > MAX_CTA_TEXT_LENGTH) {
      alert(`CTA text must be ${MAX_CTA_TEXT_LENGTH} characters or less`)
      return
    }

    try {
      setSaving(true)
      const payload = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        ctaText: formData.ctaText.trim(),
        ctaLink: formData.ctaLink.trim(),
        order: Number(formData.order) || 1,
        active: formData.active,
      }

      if (editingId) {
        await updateDoc(doc(db, 'featuredItems', editingId), payload)
        alert('Featured item updated')
      } else {
        await addDoc(collection(db, 'featuredItems'), {
          ...payload,
          createdAt: Date.now(),
        })
        alert('Featured item added')
      }

      resetForm()
      await fetchItems()
    } catch (error) {
      console.error('Error saving featured item:', error)
      alert('Error: ' + (error as any).message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (item: FeaturedItem) => {
    setFormData({
      title: item.title,
      description: item.description,
      image: item.image || '',
      ctaText: item.ctaText || '',
      ctaLink: item.ctaLink || '',
      order: String(item.order ?? 1),
      active: item.active !== false,
    })
    setEditingId(item.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this featured item?')) return

    try {
      await deleteDoc(doc(db, 'featuredItems', id))
      await fetchItems()
    } catch (error) {
      console.error('Error deleting featured item:', error)
      alert('Error: ' + (error as any).message)
    }
  }

  const handleToggleActive = async (item: FeaturedItem) => {
    try {
      await updateDoc(doc(db, 'featuredItems', item.id), { active: item.active === false })
      await fetchItems()
    } catch (error) {
      console.error('Error updating active state:', error)
      alert('Error: ' + (error as any).message)
    }
  }

  return (
    <div className="py-4 md:py-6">
      <div className="flex items-center justify-between gap-4 mb-4 md:mb-6 flex-wrap">
        <h1 className="text-2xl md:text-4xl font-bold">Homepage Featured Section</h1>
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
          {showForm ? 'Cancel' : 'Add Featured Item'}
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <Star className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p>This section appears below homepage hero only when at least one active item exists.</p>
            <p>You can use it for launch events, admissions updates, or important highlights.</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{editingId ? 'Edit Featured Item' : 'Add Featured Item'}</h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Admissions Open 2025-2026"
                maxLength={MAX_TITLE_LENGTH}
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.95rem',
                  boxSizing: 'border-box',
                }}
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.title.length}/{MAX_TITLE_LENGTH}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Short details for the featured card"
                rows={4}
                maxLength={MAX_DESCRIPTION_LENGTH}
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
              <p className="text-xs text-muted-foreground mt-1">{formData.description.length}/{MAX_DESCRIPTION_LENGTH}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Image (Optional)</label>
              <div className="flex gap-3 items-end flex-wrap">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={saving}
                  className="text-sm"
                />
                {formData.image && <img src={formData.image} alt="preview" className="w-20 h-12 rounded object-cover" />}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">CTA Text (Optional)</label>
                <input
                  type="text"
                  value={formData.ctaText}
                  onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                  placeholder="e.g., Register Now"
                  maxLength={MAX_CTA_TEXT_LENGTH}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.95rem',
                    boxSizing: 'border-box',
                  }}
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.ctaText.length}/{MAX_CTA_TEXT_LENGTH}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">CTA Link (Optional)</label>
                <input
                  type="text"
                  value={formData.ctaLink}
                  onChange={(e) => setFormData({ ...formData, ctaLink: e.target.value })}
                  placeholder="e.g., /contact or https://..."
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
                <label htmlFor="active" className="text-sm font-medium">Active (show on homepage)</label>
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-70"
            >
              {saving ? 'Saving...' : editingId ? 'Update Featured Item' : 'Add Featured Item'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-border">
          <h3 className="text-lg md:text-xl font-bold">Featured Items</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No featured items yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {items.map((item) => (
              <div key={item.id} className="p-4 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-base font-semibold break-words">{item.title}</p>
                  <p className="text-sm text-muted-foreground mt-1 break-words">{item.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground flex-wrap">
                    <span className="px-2 py-1 rounded bg-muted">Order: {item.order ?? 1}</span>
                    <span className={`px-2 py-1 rounded ${item.active === false ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      {item.active === false ? 'Inactive' : 'Active'}
                    </span>
                    {item.ctaText && <span className="px-2 py-1 rounded bg-muted">CTA: {item.ctaText}</span>}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => handleToggleActive(item)} className="px-3 py-2 text-xs md:text-sm rounded bg-muted hover:bg-muted/80">
                    {item.active === false ? 'Activate' : 'Deactivate'}
                  </button>
                  <button onClick={() => handleEdit(item)} className="p-2 rounded hover:bg-primary/10" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 rounded text-destructive hover:bg-destructive/10" title="Delete">
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
