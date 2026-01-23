'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Trash2, Edit2 } from 'lucide-react'

type StudentResult = {
  id: string
  name: string
  class: string
  score: string
  rank?: string
  date: string
}

export default function ResultsManagement() {
  const [results, setResults] = useState<StudentResult[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    class: '',
    score: '',
    rank: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    fetchResults()
  }, [])

  const fetchResults = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'results'))
      const resultsList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as StudentResult[]
      setResults(resultsList.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    } catch (error) {
      console.error('Error fetching results:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddResult = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploading(true)

    try {
      const resultData = {
        ...formData,
        rank: formData.rank || undefined,
      }

      if (editingId) {
        await updateDoc(doc(db, 'results', editingId), resultData)
        setEditingId(null)
      } else {
        await addDoc(collection(db, 'results'), resultData)
      }

      setFormData({
        name: '',
        class: '',
        score: '',
        rank: '',
        date: new Date().toISOString().split('T')[0],
      })
      setShowForm(false)
      await fetchResults()
    } catch (error) {
      console.error('Error adding result:', error)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteResult = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteDoc(doc(db, 'results', id))
        await fetchResults()
      } catch (error) {
        console.error('Error deleting result:', error)
      }
    }
  }

  const handleEditResult = (result: StudentResult) => {
    setFormData({
      name: result.name,
      class: result.class,
      score: result.score,
      rank: result.rank || '',
      date: result.date,
    })
    setEditingId(result.id)
    setShowForm(true)
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Results Management</h1>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormData({
              name: '',
              class: '',
              score: '',
              rank: '',
              date: new Date().toISOString().split('T')[0],
            })
            setShowForm(!showForm)
          }}
        >
          {showForm ? 'Cancel' : 'Add Result'}
        </Button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Edit Result' : 'Add New Result'}
          </h2>
          <form onSubmit={handleAddResult} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Student Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Class</label>
                <Input
                  value={formData.class}
                  onChange={(e) =>
                    setFormData({ ...formData, class: e.target.value })
                  }
                  placeholder="e.g., 10th, 12th Science"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Score</label>
                <Input
                  value={formData.score}
                  onChange={(e) =>
                    setFormData({ ...formData, score: e.target.value })
                  }
                  placeholder="e.g., 95/100"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Rank (Optional)</label>
                <Input
                  value={formData.rank}
                  onChange={(e) =>
                    setFormData({ ...formData, rank: e.target.value })
                  }
                  placeholder="e.g., 1st"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={uploading} className="w-full">
              {uploading ? 'Saving...' : editingId ? 'Update Result' : 'Add Result'}
            </Button>
          </form>
        </div>
      )}

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Student Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Class</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Score</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-4 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr key={result.id} className="border-t border-border hover:bg-muted/50">
                  <td className="px-6 py-4">{result.name}</td>
                  <td className="px-6 py-4">{result.class}</td>
                  <td className="px-6 py-4 font-semibold text-primary">{result.score}</td>
                  <td className="px-6 py-4">
                    {result.rank && (
                      <span className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                        {result.rank}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(result.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button
                      onClick={() => handleEditResult(result)}
                      className="p-2 hover:bg-primary/10 rounded transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteResult(result.id)}
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

      {results.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No results yet</p>
          <Button onClick={() => setShowForm(true)}>Add First Result</Button>
        </div>
      )}
    </div>
  )
}
