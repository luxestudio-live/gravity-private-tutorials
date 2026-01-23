'use client'

import { useEffect, useState } from 'react'
import { db, storage } from '@/lib/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Trash2, Edit2 } from 'lucide-react'

type FacultyMember = {
  id: string
  name: string
  subject: string
  qualification: string
  experience: string
  specialization: string
  achievements: string[]
  image: string
  color: string
}

export default function FacultyManagement() {
  const [faculty, setFaculty] = useState<FacultyMember[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    qualification: '',
    experience: '',
    specialization: '',
    achievements: '',
    color: 'from-primary to-accent',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchFaculty()
  }, [])

  const fetchFaculty = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'faculty'))
      const facultyList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as FacultyMember[]
      setFaculty(facultyList)
    } catch (error) {
      console.error('Error fetching faculty:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddFaculty = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      let imageUrl = ''

      if (imageFile) {
        const storageRef = ref(storage, `faculty/${Date.now()}-${imageFile.name}`)
        await uploadBytes(storageRef, imageFile)
        imageUrl = await getDownloadURL(storageRef)
      }

      const facultyData = {
        ...formData,
        achievements: formData.achievements.split('\n').filter(a => a.trim()),
        image: imageUrl,
      }

      if (editingId) {
        await updateDoc(doc(db, 'faculty', editingId), facultyData)
        setEditingId(null)
      } else {
        await addDoc(collection(db, 'faculty'), facultyData)
      }

      setFormData({
        name: '',
        subject: '',
        qualification: '',
        experience: '',
        specialization: '',
        achievements: '',
        color: 'from-primary to-accent',
      })
      setImageFile(null)
      setShowForm(false)
      await fetchFaculty()
    } catch (error) {
      console.error('Error adding faculty:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteFaculty = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteDoc(doc(db, 'faculty', id))
        await fetchFaculty()
      } catch (error) {
        console.error('Error deleting faculty:', error)
      }
    }
  }

  const handleEditFaculty = (member: FacultyMember) => {
    setFormData({
      name: member.name,
      subject: member.subject,
      qualification: member.qualification,
      experience: member.experience,
      specialization: member.specialization,
      achievements: member.achievements.join('\n'),
      color: member.color,
    })
    setEditingId(member.id)
    setShowForm(true)
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Faculty Management</h1>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({
              name: '',
              subject: '',
              qualification: '',
              experience: '',
              specialization: '',
              achievements: '',
              color: 'from-primary to-accent',
            })
            setShowForm(!showForm)
          }}
        >
          {showForm ? 'Cancel' : 'Add Faculty'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Edit Faculty' : 'Add New Faculty'}
          </h2>
          <form onSubmit={handleAddFaculty} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Qualification</label>
                <Input
                  value={formData.qualification}
                  onChange={(e) =>
                    setFormData({ ...formData, qualification: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <Input
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Specialization</label>
              <Input
                value={formData.specialization}
                onChange={(e) =>
                  setFormData({ ...formData, specialization: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Achievements (one per line)
              </label>
              <Textarea
                value={formData.achievements}
                onChange={(e) =>
                  setFormData({ ...formData, achievements: e.target.value })
                }
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photo</label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? 'Uploading...' : editingId ? 'Update Faculty' : 'Add Faculty'}
            </Button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Qualification</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Experience</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {faculty.map((member) => (
                <tr key={member.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-6 py-4">{member.name}</td>
                  <td className="px-6 py-4">{member.subject}</td>
                  <td className="px-6 py-4">{member.qualification}</td>
                  <td className="px-6 py-4">{member.experience}</td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditFaculty(member)}
                      className="p-2 hover:bg-primary/10 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaculty(member.id)}
                      className="p-2 hover:bg-destructive/10 rounded transition-colors text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {faculty.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No faculty members yet</p>
          <Button onClick={() => setShowForm(true)}>Add First Faculty</Button>
        </div>
      )}
    </div>
  )
}
