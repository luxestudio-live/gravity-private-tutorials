'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Trash2, Edit2, Plus } from 'lucide-react'

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

type GalleryImage = {
  id: string
  src: string
  title: string
  description: string
  isDefault?: boolean
}

const CONTENT_PLACEHOLDER = '/placeholder.svg?height=400&width=400'

const withPlaceholderImages = <T extends { src: string }>(items: T[]): T[] =>
  items.map((item) => ({ ...item, src: CONTENT_PLACEHOLDER }))

const defaultGalleryImages: GalleryImage[] = [
  { id: 'default_1', src: '/da2.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_2', src: '/da3.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_3', src: '/da4.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_4', src: '/da7.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_5', src: '/da8.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_6', src: '/da9.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_7', src: '/daa1.png', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_8', src: '/daa2.png', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_9', src: '/daa3.png', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_10', src: '/daa4.png', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_11', src: '/daa5.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_12', src: '/daa6.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_13', src: '/da1.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_14', src: '/da5.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
  { id: 'default_15', src: '/da6.jpeg', title: 'Gravity Private Tutorials', description: 'Moments from Gravity Private Tutorials', isDefault: true },
]

export default function GalleryManagement() {
  const { user } = useAuth()
  const [allImages, setAllImages] = useState<GalleryImage[]>(withPlaceholderImages(defaultGalleryImages))
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    src: '',
    title: 'Gravity Private Tutorials',
    description: 'Moments from Gravity Private Tutorials',
  })

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  useEffect(() => {
    if (showForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [showForm])

  const fetchGalleryImages = async () => {
    try {
      setLoading(true)
      const snap = await getDocs(collection(db, 'gallery'))
      const newImages = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as GalleryImage[]
      console.log('Fetched new gallery images from Firestore:', newImages)
      setAllImages(withPlaceholderImages([...newImages, ...defaultGalleryImages]))
    } catch (error) {
      console.error('Error fetching gallery images:', error)
      setAllImages(withPlaceholderImages(defaultGalleryImages))
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const uploadData = new FormData()
      uploadData.append('file', file)
      uploadData.append('upload_preset', 'gallery_uploads')

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: uploadData,
        }
      )

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(`Upload failed: ${errorData.error?.message || 'Unknown error'}`)
      }
      const data = await response.json()
      console.log('Cloudinary upload response:', data)
      console.log('Image URL:', data.secure_url)
      setFormData({ ...formData, src: data.secure_url })
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Image upload failed: ' + (error as any).message)
    } finally {
      setUploading(false)
    }
  }

  const handleAddImage = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('You must be logged in')
      return
    }

    if (!formData.src.trim()) {
      alert('Image URL is required')
      return
    }

    if (!formData.title.trim()) {
      alert('Title is required')
      return
    }

    try {
      setUploading(true)
      console.log('Saving gallery image:', formData)
      if (editingId && !editingId.startsWith('default_')) {
        await updateDoc(doc(db, 'gallery', editingId), formData)
        alert('Gallery image updated!')
        setEditingId(null)
      } else if (!editingId) {
        const docRef = await addDoc(collection(db, 'gallery'), formData)
        console.log('Gallery image added with ID:', docRef.id)
        alert('Gallery image added!')
      } else {
        alert('Cannot edit default gallery images')
      }

      setFormData({
        src: '',
        title: 'Gravity Private Tutorials',
        description: 'Moments from Gravity Private Tutorials',
      })
      setShowForm(false)
      await fetchGalleryImages()
    } catch (error) {
      console.error('Error saving gallery image:', error)
      alert('Error: ' + (error as any).message)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (id: string) => {
    if (id.startsWith('default_')) {
      alert('Cannot delete default gallery images')
      return
    }

    if (confirm('Are you sure you want to delete this gallery image?')) {
      try {
        setUploading(true)
        console.log('Deleting gallery image with ID:', id)
        await deleteDoc(doc(db, 'gallery', id))
        console.log('Gallery image deleted successfully')
        alert('Gallery image deleted!')
        await fetchGalleryImages()
      } catch (error) {
        console.error('Error deleting gallery image:', error)
        alert('Error deleting gallery image: ' + (error as any).message)
      } finally {
        setUploading(false)
      }
    }
  }

  const handleEditImage = (image: GalleryImage) => {
    if (image.isDefault) {
      alert('Default gallery images cannot be edited. Only new images can be edited.')
      return
    }
    setFormData({
      src: image.src,
      title: image.title,
      description: image.description,
    })
    setEditingId(image.id)
    setShowForm(true)
  }

  const defaultCount = allImages.filter((i) => i.isDefault).length
  const newCount = allImages.filter((i) => !i.isDefault).length

  return (
    <div className="py-4 md:py-6">
      <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-4">
        <h1 className="text-2xl md:text-4xl font-bold">Gallery Management</h1>
        {/* Add Button */}
        <button
          onClick={() => {
            if (showForm) {
              setEditingId(null)
              setFormData({
                src: '',
                title: 'Gravity Private Tutorials',
                description: 'Moments from Gravity Private Tutorials',
              })
            }
            setShowForm(!showForm)
          }}
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm md:text-base"
        >
          <Plus className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
          <span className="hidden sm:inline">{showForm ? 'Cancel' : 'Add Gallery Image'}</span>
          <span className="sm:hidden">{showForm ? 'Cancel' : 'Add'}</span>
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}</h2>
          <form onSubmit={handleAddImage} className="space-y-4 md:space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-2">Gallery Image</label>
              <div className="flex gap-2 md:gap-3 flex-col">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="block text-xs md:text-sm"
                />
                {formData.src && (
                  <img src={formData.src} alt="preview" className="w-24 md:w-32 h-24 md:h-32 rounded object-cover" />
                )}
              </div>
              {formData.src && <p className="text-xs md:text-sm text-muted-foreground mt-2">Image uploaded: {formData.src.slice(0, 50)}...</p>}
            </div>

            <div>
              <label className="block text-xs md:text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Image title"
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
              <label className="block text-xs md:text-sm font-medium mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Image description"
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  boxSizing: 'border-box',
                  fontFamily: 'inherit',
                }}
                className="md:text-base"
              />
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
            >
              {uploading ? 'Uploading...' : editingId ? 'Update Image' : 'Add Image'}
            </button>
          </form>
        </div>
      )}

      {/* Image Lists */}
      <div className="space-y-6 md:space-y-8">
        {/* New Images */}
        {newCount > 0 && (
          <div className="bg-card border border-border rounded-xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">New Gallery Images ({newCount})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {allImages
                .filter((i) => !i.isDefault)
                .map((image) => (
                  <div key={image.id} className="border border-border rounded-lg overflow-hidden bg-muted/30 relative flex flex-col">
                    <img src={image.src} alt={image.title} className="w-full h-32 md:h-48 object-cover" />
                    <div className="p-2 md:p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-sm md:text-lg mb-1">{image.title}</h3>
                      <p className="text-xs text-muted-foreground flex-1 line-clamp-2">{image.description}</p>

                      <div className="flex gap-1 md:gap-2 mt-2 md:mt-4 pt-2 md:pt-4 border-t border-border">
                        <button
                          onClick={() => handleEditImage(image)}
                          disabled={uploading}
                          className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                        >
                          <Edit2 className="w-3 md:w-4 h-3 md:h-4" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        <button
                          onClick={() => image.id && handleDeleteImage(image.id)}
                          disabled={uploading}
                          className="flex-1 flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-xs md:text-sm"
                        >
                          <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
                          <span className="hidden sm:inline">{uploading ? 'Deleting...' : 'Delete'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Default Images */}
        <div className="bg-card border border-border rounded-xl p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Default Gallery Images ({defaultCount})</h2>
          <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Existing gallery images - cannot be edited or deleted</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {allImages
              .filter((i) => i.isDefault)
              .map((image) => (
                <div key={image.id} className="border border-border rounded-lg overflow-hidden bg-muted/30">
                  <img src={image.src} alt={image.title} className="w-full h-32 md:h-48 object-cover" />
                  <div className="p-2 md:p-4">
                    <h3 className="font-bold text-sm md:text-lg mb-1">{image.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{image.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
