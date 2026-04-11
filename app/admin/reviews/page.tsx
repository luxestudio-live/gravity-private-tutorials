'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { Plus, Edit2, Trash2, MessageSquare, Star } from 'lucide-react'

type ReviewItem = {
  id: string
  name: string
  role: string
  content: string
  rating: number
  order?: number
  active?: boolean
  createdAt?: number
}

const MAX_NAME_LENGTH = 60
const MAX_ROLE_LENGTH = 60
const MAX_CONTENT_LENGTH = 800

export default function ReviewsAdminPage() {
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    role: 'Student',
    content: '',
    rating: '5',
    order: '1',
    active: true,
  })

  useEffect(() => {
    fetchReviews()
  }, [])

  const fetchReviews = async () => {
    try {
      setLoading(true)
      const snap = await getDocs(collection(db, 'reviews'))
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as ReviewItem)
        .sort((a, b) => {
          if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999)
          return (a.createdAt ?? 0) - (b.createdAt ?? 0)
        })
      setReviews(list)
    } catch (error) {
      console.error('Error fetching reviews:', error)
      alert('Could not load reviews')
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      role: 'Student',
      content: '',
      rating: '5',
      order: '1',
      active: true,
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.content.trim()) {
      alert('Name and review are required')
      return
    }

    if (formData.name.trim().length > MAX_NAME_LENGTH) {
      alert(`Name must be ${MAX_NAME_LENGTH} characters or less`)
      return
    }

    if (formData.role.trim().length > MAX_ROLE_LENGTH) {
      alert(`Role must be ${MAX_ROLE_LENGTH} characters or less`)
      return
    }

    if (formData.content.trim().length > MAX_CONTENT_LENGTH) {
      alert(`Review content must be ${MAX_CONTENT_LENGTH} characters or less`)
      return
    }

    const parsedRating = Number(formData.rating)
    if (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      alert('Rating must be between 1 and 5')
      return
    }

    try {
      setSaving(true)

      const payload = {
        name: formData.name.trim(),
        role: formData.role.trim() || 'Student',
        content: formData.content.trim(),
        rating: parsedRating,
        order: Number(formData.order) || 1,
        active: formData.active,
      }

      if (editingId) {
        await updateDoc(doc(db, 'reviews', editingId), payload)
        alert('Review updated')
      } else {
        await addDoc(collection(db, 'reviews'), {
          ...payload,
          createdAt: Date.now(),
        })
        alert('Review added')
      }

      resetForm()
      await fetchReviews()
    } catch (error) {
      console.error('Error saving review:', error)
      alert('Error: ' + (error as any).message)
    } finally {
      setSaving(false)
    }
  }

  const handleEdit = (review: ReviewItem) => {
    setFormData({
      name: review.name,
      role: review.role || 'Student',
      content: review.content,
      rating: String(review.rating || 5),
      order: String(review.order ?? 1),
      active: review.active !== false,
    })
    setEditingId(review.id)
    setShowForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this review?')) return

    try {
      await deleteDoc(doc(db, 'reviews', id))
      await fetchReviews()
    } catch (error) {
      console.error('Error deleting review:', error)
      alert('Error: ' + (error as any).message)
    }
  }

  const handleToggleActive = async (item: ReviewItem) => {
    try {
      await updateDoc(doc(db, 'reviews', item.id), { active: item.active === false })
      await fetchReviews()
    } catch (error) {
      console.error('Error updating active state:', error)
      alert('Error: ' + (error as any).message)
    }
  }

  return (
    <div className="py-4 md:py-6">
      <div className="flex items-center justify-between gap-4 mb-4 md:mb-6 flex-wrap">
        <h1 className="text-2xl md:text-4xl font-bold">Homepage Reviews</h1>
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
          {showForm ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-4 md:p-6 mb-6">
        <div className="flex items-start gap-3 text-sm text-muted-foreground">
          <MessageSquare className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
          <div>
            <p>Add real student/parent reviews shown on the homepage.</p>
            <p>Only active reviews are visible publicly. Use display order for sorting.</p>
          </div>
        </div>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{editingId ? 'Edit Review' : 'Add Review'}</h2>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Aarya Patil"
                  maxLength={MAX_NAME_LENGTH}
                  required
                  className="w-full px-3 py-3 rounded-md border border-border bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.name.length}/{MAX_NAME_LENGTH}</p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Role / Class</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="e.g., Parent of Class 10 Student"
                  maxLength={MAX_ROLE_LENGTH}
                  className="w-full px-3 py-3 rounded-md border border-border bg-background"
                />
                <p className="text-xs text-muted-foreground mt-1">{formData.role.length}/{MAX_ROLE_LENGTH}</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Content *</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={5}
                maxLength={MAX_CONTENT_LENGTH}
                placeholder="Write the review exactly as it should appear on homepage"
                required
                className="w-full px-3 py-3 rounded-md border border-border bg-background"
              />
              <p className="text-xs text-muted-foreground mt-1">{formData.content.length}/{MAX_CONTENT_LENGTH}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  className="w-full px-3 py-3 rounded-md border border-border bg-background"
                >
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Display Order</label>
                <input
                  type="number"
                  min={1}
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full px-3 py-3 rounded-md border border-border bg-background"
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
              {saving ? 'Saving...' : editingId ? 'Update Review' : 'Add Review'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 md:p-6 border-b border-border">
          <h3 className="text-lg md:text-xl font-bold">Saved Reviews</h3>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : reviews.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No reviews added yet.</div>
        ) : (
          <div className="divide-y divide-border">
            {reviews.map((item) => (
              <div key={item.id} className="p-4 md:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-base font-semibold break-words">{item.name}</p>
                  <p className="text-sm text-muted-foreground mt-1 break-words">{item.role || 'Student'}</p>
                  <p className="text-sm text-foreground/80 mt-2 break-words line-clamp-3">{item.content}</p>
                  <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground flex-wrap">
                    <span className="px-2 py-1 rounded bg-muted">Order: {item.order ?? 1}</span>
                    <span className="px-2 py-1 rounded bg-muted inline-flex items-center gap-1">
                      <Star className="w-3 h-3 fill-secondary text-secondary" />
                      {item.rating || 5}
                    </span>
                    <span className={`px-2 py-1 rounded ${item.active === false ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                      {item.active === false ? 'Inactive' : 'Active'}
                    </span>
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
