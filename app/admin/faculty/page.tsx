'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Trash2, Edit2, Plus, Upload } from 'lucide-react'

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY

type FacultyMember = {
  id: string
  name: string
  subject: string
  qualification: string
  experience: string
  specialization: string
  image: string
  color: string
  isDefault?: boolean
}

const defaultFaculty: FacultyMember[] = [
  {
    id: 'default_1',
    name: 'Virendra Kumar Badgujar',
    subject: '',
    qualification: '',
    experience: '',
    specialization: '',
    image: '/Virendra Kumar Badgujar.jpeg',
    color: 'from-primary to-accent',
    isDefault: true,
  },
  {
    id: 'default_2',
    name: 'Ramkrishna Badgujar',
    subject: 'English',
    qualification: 'MA B.Ed - English',
    experience: '',
    specialization: '',
    image: '/ramkrishna-badgujar.jpeg',
    color: 'from-secondary to-primary',
    isDefault: true,
  },
  {
    id: 'default_3',
    name: 'Sujeet Patil',
    subject: 'Marathi, Hindi',
    qualification: 'MA B.Ed Marathi Hindi',
    experience: '',
    specialization: '',
    image: '/sujeet-patil.png',
    color: 'from-accent to-secondary',
    isDefault: true,
  },
  {
    id: 'default_4',
    name: 'Jayant Pawar',
    subject: 'Counsellor',
    qualification: '',
    experience: '',
    specialization: '',
    image: '/jayant.jpeg',
    color: 'from-primary to-accent',
    isDefault: true,
  },
  {
    id: 'default_5',
    name: 'Rupesh Santosh Pawar',
    subject: 'Administration Head',
    qualification: 'M.Com (Management)',
    experience: '12 Years',
    specialization: '',
    image: '/rupesh.jpeg',
    color: 'from-secondary to-primary',
    isDefault: true,
  },
  {
    id: 'default_6',
    name: 'Akshay Ramchandra Bhilare',
    subject: 'Administration Head',
    qualification: 'Bachelor in Accounting & Finance',
    experience: '12 Years',
    specialization: '',
    image: '/akshay.jpeg',
    color: 'from-accent to-secondary',
    isDefault: true,
  },
  {
    id: 'default_7',
    name: 'Santosh Gopal Sawant',
    subject: '',
    qualification: '',
    experience: '',
    specialization: '',
    image: '/santosh-gopal-sawant.jpeg',
    color: 'from-secondary to-primary',
    isDefault: true,
  },
  {
    id: 'default_8',
    name: 'Pratik Sawant',
    subject: 'English, S.S',
    qualification: 'D.Ed',
    experience: '',
    specialization: '',
    image: '/pratik-sawant.jpeg',
    color: 'from-accent to-secondary',
    isDefault: true,
  },
  {
    id: 'default_9',
    name: 'Pankaj Vasant Rane',
    subject: 'English',
    qualification: 'B.A., B.Ed. (Eng.), TET & CTET qualified',
    experience: '21 Years',
    specialization: '',
    image: '/pankaj.jpeg',
    color: 'from-accent to-secondary',
    isDefault: true,
  },
  {
    id: 'default_10',
    name: 'Pravin Devidas Thorat',
    subject: 'Commerce Teacher',
    qualification: 'M.Com, B.Ed, MBA, LLB',
    experience: '16 Years',
    specialization: 'O.CM. // S.P',
    image: '/pravin-devidas-thorat.jpeg',
    color: 'from-primary to-accent',
    isDefault: true,
  },
  {
    id: 'default_11',
    name: 'Arun Saheb Gauda',
    subject: 'Accounts, Financial Studies, Economics',
    qualification: 'B.Com (Account & Finance), M.Com (Accounts & Finance), M.Com (Management)',
    experience: '11 Years',
    specialization: '',
    image: '/arun-saheb-gauda.jpeg',
    color: 'from-primary to-accent',
    isDefault: true,
  },
  {
    id: 'default_12',
    name: 'Ganesh Tulsiram Rathod',
    subject: 'Maths',
    qualification: 'BSc IT, MSc Math, MSc IT - Pursuing',
    experience: '9 Years',
    specialization: '',
    image: '/ganesh.jpeg',
    color: 'from-primary to-accent',
    isDefault: true,
  },
  {
    id: 'default_13',
    name: 'Praveena Gelot',
    subject: 'History',
    qualification: 'D.El.Ed, B.A, B.Ed, M.A',
    experience: '6 Years',
    specialization: '',
    image: '/praveena.jpeg',
    color: 'from-secondary to-primary',
    isDefault: true,
  },
]

const colors = [
  'from-primary to-accent',
  'from-secondary to-primary',
  'from-accent to-secondary',
  'from-primary to-secondary',
]

export default function FacultyManagement() {
  const { user } = useAuth()
  const [allFaculty, setAllFaculty] = useState<FacultyMember[]>(defaultFaculty)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    qualification: '',
    experience: '',
    specialization: '',
    image: '',
    color: 'from-primary to-accent',
  })

  useEffect(() => {
    fetchFaculty()
  }, [])

  useEffect(() => {
    if (showForm) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [showForm])

  const fetchFaculty = async () => {
    try {
      setLoading(true)
      const snap = await getDocs(collection(db, 'faculty'))
      const newFaculty = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as FacultyMember[]
      console.log('Fetched new faculty from Firestore:', newFaculty)
      setAllFaculty([...defaultFaculty, ...newFaculty])
    } catch (error) {
      console.error('Error fetching faculty:', error)
      setAllFaculty(defaultFaculty)
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
      uploadData.append('upload_preset', 'faculty_uploads') // Use unsigned preset

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
      setFormData({ ...formData, image: data.secure_url })
      alert('Image uploaded successfully!\nURL: ' + data.secure_url)
    } catch (error) {
      console.error('Error uploading image:', error)
      alert('Image upload failed: ' + (error as any).message)
    } finally {
      setUploading(false)
    }
  }

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      alert('You must be logged in')
      return
    }

    if (!formData.name.trim()) {
      alert('Name is required')
      return
    }

    try {
      setUploading(true)
      console.log('Saving faculty data:', formData)
      if (editingId && !editingId.startsWith('default_')) {
        await updateDoc(doc(db, 'faculty', editingId), formData)
        alert('Faculty member updated!')
        setEditingId(null)
      } else if (!editingId) {
        const docRef = await addDoc(collection(db, 'faculty'), formData)
        console.log('Faculty added with ID:', docRef.id)
        alert('Faculty member added!')
      } else {
        alert('Cannot edit default faculty data')
      }

      setFormData({
        name: '',
        subject: '',
        qualification: '',
        experience: '',
        specialization: '',
        image: '',
        color: 'from-primary to-accent',
      })
      setShowForm(false)
      await fetchFaculty()
    } catch (error) {
      console.error('Error saving faculty:', error)
      alert('Error: ' + (error as any).message)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteFaculty = async (id: string) => {
    if (id.startsWith('default_')) {
      alert('Cannot delete default faculty data')
      return
    }

    if (confirm('Are you sure you want to delete this faculty member?')) {
      try {
        setUploading(true)
        console.log('Deleting faculty with ID:', id)
        await deleteDoc(doc(db, 'faculty', id))
        console.log('Faculty deleted successfully')
        alert('Faculty member deleted!')
        await fetchFaculty()
      } catch (error) {
        console.error('Error deleting faculty:', error)
        alert('Error deleting faculty: ' + (error as any).message)
      } finally {
        setUploading(false)
      }
    }
  }

  const handleEditFaculty = (member: FacultyMember) => {
    if (member.isDefault) {
      alert('Default faculty data cannot be edited. Only new entries can be edited.')
      return
    }
    setFormData({
      name: member.name,
      subject: member.subject,
      qualification: member.qualification,
      experience: member.experience,
      specialization: member.specialization,
      image: member.image,
      color: member.color,
    })
    setEditingId(member.id)
    setShowForm(true)
  }

  const defaultFacultyCount = allFaculty.filter((f) => f.isDefault).length
  const newFacultyCount = allFaculty.filter((f) => !f.isDefault).length

  return (
    <div className="py-4 md:py-6">
      <div className="flex items-center justify-between mb-4 md:mb-6 flex-wrap gap-4">
        <h1 className="text-2xl md:text-4xl font-bold">Faculty Management</h1>
        {/* Add Button */}
        <button
          onClick={() => {
            if (showForm) {
              setEditingId(null)
              setFormData({
                name: '',
                subject: '',
                qualification: '',
                experience: '',
                specialization: '',
                image: '',
                color: 'from-primary to-accent',
              })
            }
            setShowForm(!showForm)
          }}
          className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm md:text-base"
        >
          <Plus className="w-4 md:w-5 h-4 md:h-5 flex-shrink-0" />
          <span className="hidden sm:inline">{showForm ? 'Cancel' : 'Add Faculty Member'}</span>
          <span className="sm:hidden">{showForm ? 'Cancel' : 'Add'}</span>
        </button>
      </div>

      {/* Add Form */}
      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">{editingId ? 'Edit Faculty' : 'Add New Faculty Member'}</h2>
          <form onSubmit={handleAddFaculty} className="space-y-4 md:space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-xs md:text-sm font-medium mb-2">Profile Image</label>
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
              {formData.image && <p className="text-xs md:text-sm text-muted-foreground mt-2">Image uploaded: {formData.image.slice(0, 50)}...</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div>
                <label className="block text-xs md:text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Faculty name"
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
                <label className="block text-xs md:text-sm font-medium mb-2">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Subject/Department"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Qualification</label>
                <input
                  type="text"
                  value={formData.qualification}
                  onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                  placeholder="E.g., M.Com, B.Ed"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                  placeholder="E.g., 10 Years"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Specialization</label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  placeholder="Optional specialization"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Color Theme</label>
                <select
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '1rem',
                    boxSizing: 'border-box',
                  }}
                >
                  {colors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
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
            >
              {uploading ? 'Uploading...' : editingId ? 'Update Faculty' : 'Add Faculty'}
            </button>
          </form>
        </div>
      )}

      {/* Faculty Lists */}
      <div className="space-y-6 md:space-y-8">
        {/* Default Faculty */}
        <div className="bg-card border border-border rounded-xl p-4 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Default Faculty ({defaultFacultyCount})</h2>
          <p className="text-xs md:text-sm text-muted-foreground mb-4 md:mb-6">Existing faculty members - cannot be edited or deleted</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {allFaculty
              .filter((f) => f.isDefault)
              .map((member) => (
                <div key={member.id} className="border border-border rounded-lg p-3 md:p-4 bg-muted/30">
                  {member.image && <img src={member.image} alt={member.name} className="w-full h-32 md:h-48 object-cover rounded mb-2 md:mb-4" />}
                  <h3 className="font-bold text-base md:text-lg mb-1">{member.name}</h3>
                  <p className="text-xs md:text-sm text-primary font-medium">{member.subject}</p>
                  <p className="text-xs text-muted-foreground">{member.qualification}</p>
                  {member.experience && <p className="text-xs text-muted-foreground">{member.experience}</p>}
                </div>
              ))}
          </div>
        </div>

        {/* New Faculty */}
        {newFacultyCount > 0 && (
          <div className="bg-card border border-border rounded-xl p-4 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-4">Added Faculty ({newFacultyCount})</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
              {allFaculty
                .filter((f) => !f.isDefault)
                .map((member) => (
                  <div key={member.id} className="border border-border rounded-lg p-4 bg-muted/30 relative">
                    {member.image && <img src={member.image} alt={member.name} className="w-full h-48 object-cover rounded mb-4" />}
                    <h3 className="font-bold text-lg mb-1">{member.name}</h3>
                    <p className="text-sm text-primary font-medium">{member.subject}</p>
                    <p className="text-xs text-muted-foreground">{member.qualification}</p>
                    {member.experience && <p className="text-xs text-muted-foreground">{member.experience}</p>}

                    <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                      <button
                        onClick={() => handleEditFaculty(member)}
                        disabled={uploading}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => member.id && handleDeleteFaculty(member.id)}
                        disabled={uploading}
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 className="w-4 h-4" />
                        {uploading ? 'Deleting...' : 'Delete'}
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
