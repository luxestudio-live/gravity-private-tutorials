'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where } from 'firebase/firestore'
import { Trash2, Edit2, Plus } from 'lucide-react'

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

type TopperSection = 'STAR_ACHIEVERS' | 'CBSE_10TH' | 'ICSE_10TH' | 'HSC_12TH'

type Topper = {
  id: string
  category: TopperSection
  board?: string
  position?: number
  name: string
  score: string
  rank: string
  school?: string
  college?: string
  standard?: string
  image?: string
}

const normalizeTopperSection = (category?: string, board?: string): TopperSection | null => {
  if (category === 'STAR_ACHIEVERS' || category === 'Featured') return 'STAR_ACHIEVERS'
  if (category === 'CBSE_10TH' || category === 'CBSE-10th' || (category === '10th' && board === 'CBSE')) return 'CBSE_10TH'
  if (category === 'ICSE_10TH' || category === 'ICSE-10th' || (category === '10th' && board === 'ICSE')) return 'ICSE_10TH'
  if (category === 'HSC_12TH' || category === 'HSC-12th' || (category === '12th' && board === 'HSC')) return 'HSC_12TH'
  return null
}

const categories: { key: TopperSection; title: string; subtitle: string }[] = [
  {
    key: 'CBSE_10TH',
    title: 'CBSE 10th Toppers',
    subtitle: 'Excellence in CBSE Board Examinations',
  },
  {
    key: 'ICSE_10TH',
    title: 'ICSE 10th Toppers',
    subtitle: 'Excellence in ICSE Board Examinations',
  },
  {
    key: 'HSC_12TH',
    title: 'HSC 12th Toppers',
    subtitle: 'Excellence in HSC Science Stream',
  },
  {
    key: 'STAR_ACHIEVERS',
    title: 'Star Achievers',
    subtitle: 'Excellence in NEET, JEE & CET',
  },
]

export default function ResultsManagement() {
  const { user } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<TopperSection>('CBSE_10TH')
  const [toppers, setToppers] = useState<Topper[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    position: '1',
    name: '',
    score: '',
    rank: '',
    school: '',
    college: '',
    standard: '',
    image: '',
  })

  useEffect(() => {
    fetchToppers()
  }, [selectedCategory])

  const fetchToppers = async () => {
    try {
      setLoading(true)
      const querySnapshot = await getDocs(collection(db, 'toppers'))
      const toppersList = querySnapshot.docs
        .map((item) => ({ id: item.id, ...item.data() }) as Topper)
        .map((item) => ({
          ...item,
          category: normalizeTopperSection(item.category, item.board),
        }))
        .filter((item): item is Topper => item.category === selectedCategory)
        .sort((a, b) => (a.position ?? 999) - (b.position ?? 999))
        .slice(0, 10)
      setToppers(toppersList)
    } catch (error) {
      console.error('Error fetching toppers:', error)
      setToppers([])
    } finally {
      setLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      position: '1',
      name: '',
      score: '',
      rank: '',
      school: '',
      college: '',
      standard: '',
      image: '',
    })
    setEditingId(null)
    setShowForm(false)
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    formDataUpload.append('upload_preset', 'gallery_uploads')

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formDataUpload,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error?.message || 'Upload failed')
      }

      const data = await response.json()
      setFormData({ ...formData, image: data.secure_url })
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Failed to upload image: ' + (error as any).message)
    } finally {
      setUploading(false)
    }
  }

  const handleAddOrUpdateTopper = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('You must be logged in to manage toppers')
      return
    }

    if (!formData.position || !formData.name.trim() || !formData.score.trim() || !formData.rank.trim()) {
      alert('Position, Name, Score and Rank are required')
      return
    }

    try {
      setUploading(true)

      if (!editingId) {
        const sectionSnapshot = await getDocs(collection(db, 'toppers'))
        const sectionCount = sectionSnapshot.docs
          .map((item) => item.data() as Omit<Topper, 'id'>)
          .map((item) => normalizeTopperSection(item.category, item.board))
          .filter((item) => item === selectedCategory).length
        if (sectionCount >= 10) {
          alert('Maximum 10 entries allowed in this section. Delete one to add a new topper.')
          setUploading(false)
          return
        }
      }

      const selectedPosition = Number(formData.position)
      const sectionSnapshot = await getDocs(collection(db, 'toppers'))
      const positionTaken = sectionSnapshot.docs.some((item) => {
        const data = item.data() as Omit<Topper, 'id'>
        const normalizedCategory = normalizeTopperSection(data.category, data.board)
        return (
          normalizedCategory === selectedCategory &&
          Number(data.position) === selectedPosition &&
          item.id !== editingId
        )
      })

      if (positionTaken) {
        alert('This position is already used in the selected section. Choose a different position.')
        setUploading(false)
        return
      }

      const topperData = {
        category: selectedCategory,
        position: selectedPosition,
        name: formData.name.trim(),
        score: formData.score.trim(),
        rank: formData.rank.trim(),
        school: formData.school.trim(),
        college: formData.college.trim(),
        standard: formData.standard.trim(),
        image: formData.image.trim(),
      }

      if (editingId) {
        await updateDoc(doc(db, 'toppers', editingId), topperData)
        alert('Topper updated successfully!')
      } else {
        await addDoc(collection(db, 'toppers'), topperData)
        alert('Topper added successfully!')
      }

      resetForm()
      await fetchToppers()
    } catch (error) {
      console.error('Error saving topper:', error)
      alert('Error: ' + (error as any).message)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteTopper = async (id: string) => {
    if (!confirm('Are you sure you want to delete this topper?')) return

    try {
      await deleteDoc(doc(db, 'toppers', id))
      await fetchToppers()
    } catch (error) {
      console.error('Error deleting topper:', error)
      alert('Error deleting topper: ' + (error as any).message)
    }
  }

  const handleEditTopper = (topper: Topper) => {
    setFormData({
      position: topper.position ? String(topper.position) : '1',
      name: topper.name,
      score: topper.score,
      rank: topper.rank,
      school: topper.school || '',
      college: topper.college || '',
      standard: topper.standard || '',
      image: topper.image || '',
    })
    setEditingId(topper.id)
    setShowForm(true)
  }

  const activeCategory = categories.find((c) => c.key === selectedCategory)

  return (
    <div className="py-4 md:py-6 lg:py-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Results Management</h1>

      <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Fixed Sections (Top 10 each)</h2>
        <div className="flex gap-3 flex-wrap">
          {categories.map((category) => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`px-4 md:px-6 py-2 rounded-lg font-medium transition-all text-sm md:text-base ${
                selectedCategory === category.key ? 'bg-primary text-white' : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
        {activeCategory && (
          <p className="text-sm text-muted-foreground mt-3">{activeCategory.subtitle}</p>
        )}
      </div>

      <div className="flex justify-end mb-6 md:mb-8">
        <button
          onClick={() => {
            if (showForm) {
              resetForm()
            } else {
              setShowForm(true)
            }
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          {showForm ? 'Cancel' : 'Add Topper'}
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
            {editingId ? 'Edit Topper' : 'Add New Topper'} - {activeCategory?.title}
          </h2>

          <form onSubmit={handleAddOrUpdateTopper} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-xs md:text-sm font-medium mb-2">Profile Image (Optional)</label>
              <div className="flex gap-2 md:gap-3 items-end flex-wrap">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="flex-1 min-w-0 text-xs md:text-sm"
                />
                {formData.image && (
                  <img src={formData.image} alt="preview" className="w-16 md:w-20 h-16 md:h-20 rounded object-cover" />
                )}
              </div>
              {formData.image && (
                <p className="text-xs md:text-sm text-muted-foreground mt-2">Image uploaded: {formData.image.slice(0, 50)}...</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">Position *</label>
                <select
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                  }}
                  className="md:text-base"
                >
                  {Array.from({ length: 10 }, (_, idx) => idx + 1).map((position) => (
                    <option key={position} value={position}>
                      Position {position}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Student name"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                  }}
                  className="md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">Score *</label>
                <input
                  type="text"
                  value={formData.score}
                  onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                  placeholder="e.g., 95% or 681/720"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                  }}
                  className="md:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">Rank *</label>
                <input
                  type="text"
                  value={formData.rank}
                  onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                  placeholder="e.g., 1st or AIR - 1499"
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                  }}
                  className="md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">Standard / Exam</label>
                <input
                  type="text"
                  value={formData.standard}
                  onChange={(e) => setFormData({ ...formData, standard: e.target.value })}
                  placeholder="e.g., 10th, 12th, NEET, JEE, CET"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                  }}
                  className="md:text-base"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">School (Optional)</label>
                <input
                  type="text"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  placeholder="School name"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                  }}
                  className="md:text-base"
                />
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">College (Optional)</label>
                <input
                  type="text"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  placeholder="College name"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    boxSizing: 'border-box',
                  }}
                  className="md:text-base"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={uploading}
              style={{
                width: '100%',
                padding: '0.75rem',
                background: '#3b82f6',
                color: '#fff',
                borderRadius: '0.375rem',
                fontWeight: '500',
                border: 'none',
                cursor: uploading ? 'not-allowed' : 'pointer',
                opacity: uploading ? 0.7 : 1,
              }}
              className="text-sm md:text-base"
            >
              {uploading ? 'Saving...' : editingId ? 'Update Topper' : 'Add Topper'}
            </button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border flex items-center justify-between gap-3">
          <h3 className="text-lg font-bold">{activeCategory?.title} (Top 10)</h3>
          <span className="text-sm text-muted-foreground">{toppers.length}/10</span>
        </div>

        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : toppers.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No toppers added for this section yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Position</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Score</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Details</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {toppers.map((topper) => (
                  <tr key={topper.id} className="border-t border-border hover:bg-muted/50">
                    <td className="px-6 py-4 font-semibold text-primary">{topper.position ?? '-'}</td>
                    <td className="px-6 py-4 font-medium">{topper.name}</td>
                    <td className="px-6 py-4 font-semibold text-primary">{topper.score}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                        {topper.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {topper.standard || topper.school || topper.college || '-'}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button
                        onClick={() => handleEditTopper(topper)}
                        className="p-2 hover:bg-primary/10 rounded transition-colors inline-block"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTopper(topper.id)}
                        className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive inline-block"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
