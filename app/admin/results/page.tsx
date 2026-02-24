'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { useAuth } from '@/lib/auth-context'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, query, where, setDoc, getDoc } from 'firebase/firestore'
import { Trash2, Edit2, Plus, Upload } from 'lucide-react'

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const CLOUDINARY_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY

type Topper = {
  id: string
  academicYear: string
  category: string
  name: string
  score: string
  rank: string
  school?: string
  college?: string
  standard?: string
  image?: string
}

type ResultsPageMeta = {
  highlights?: { label: string; value: string; category: string }[]
  statistics?: {
    '10th'?: { total?: string | number; above90?: string | number; above85?: string | number; above80?: string | number; above75?: string | number; passRate?: string | number }
    '12th'?: { total?: string | number; above90?: string | number; above85?: string | number; above80?: string | number; above75?: string | number; passRate?: string | number }
  }
  featuredToppers?: any[]
  sscToppers?: any[]
  scienceToppers?: any[]
}

// Seed data to push the public Results page content for 2024-2025
const sampleResults2024_2025 = {
  highlights: [
    { label: 'Students Above 90%', value: '16', category: 'SSC Toppers' },
    { label: 'Students Above 85%', value: '35', category: 'SSC Results' },
    { label: 'Students Above 80%', value: '51', category: 'Overall Excellence' },
    { label: 'Success Rate', value: '100%', category: 'Pass Percentage' },
  ],
  featuredToppers: [
    { name: 'Hrithik Pandey', standard: 'NEET-2023', score: '681/720', rank: 'AIR - 1499', category: 'Medical', subjects: ['Medical Entrance'] },
    { name: 'Ritesh Vishwakarma', standard: 'NEET-2022', score: '645/720', rank: 'AIR - 5333', category: 'Medical', subjects: ['Grant Medical College - Sir J.J. Hospital Mumbai'] },
    { name: 'Rudra Vengurlekar', standard: 'JEE-ADV 2021', score: '98.33%', rank: 'AIR - 8025 • Gold Medal', category: 'Engineering', subjects: ['ITI GANDHINAGAR CHEMICAL ENGG.'] },
    { name: 'Riddhi Bhor', standard: 'MHT-CET 2023', score: '99.46%', rank: 'VIT Pune-Chem Eng', category: 'Engineering', subjects: ['Vishwakarma Institute of Technology'] },
  ],
  sscToppers: [
    { name: 'Sanskruti M.', score: '96.20%', rank: '1st', standard: 'PBAG' },
    { name: 'Vaibhavi K.', score: '95.00%', rank: '1st', standard: 'ADARSH' },
    { name: 'Vedant G.', score: '94.50%', rank: '3rd', standard: 'PBAG' },
    { name: 'Kunal R.', score: '93.50%', rank: '2nd', standard: 'ADARSH' },
    { name: 'Aaiya D.', score: '93.00%', standard: 'PBAG' },
    { name: 'Aayesha P.', score: '92.20%', standard: 'PBAG' },
    { name: 'Rehan S.', score: '92.00%', rank: '1st', standard: 'HKVEEVAN' },
    { name: 'Samarth P.', score: '91.50%', rank: '2nd', standard: 'HKVEEVAN' },
    { name: 'Rohana R.', score: '91.60%', standard: 'PBAG' },
    { name: 'Tanvi R.', score: '91.00%', standard: 'OXFORD' },
    { name: 'Parth R.', score: '90.00%', standard: 'PBAG' },
    { name: 'Aarchi S.', score: '90.00%', standard: 'PBAG' },
    { name: 'Yashshree S.', score: '90.00%', standard: 'PBAG' },
    { name: 'Sai M.', score: '90.00%', standard: 'OXFORD' },
    { name: 'Siddhi M.', score: '90.00%', standard: 'ADARSH' },
    { name: 'Varad D.', score: '90.00%', standard: 'ADARSH' },
  ],

  scienceToppers: [
    { name: 'Mahesh K.', score: '94.67%', college: 'RATNAI COLLEGE' },
    { name: 'Aishwarya K.', score: '94.67%', college: 'MITHIBAI COLLEGE' },
    { name: 'Sanjay U.', score: '92.83%', college: 'MAHILA SAMITI COLLEGE' },
    { name: 'Piyush M.', score: '91.50%', college: 'ROYAL COLLEGE' },
    { name: 'Meghana P.', score: '91.17%', college: 'SKN COLLEGE' },
  ],
  statistics: {
    '10th': { total: 102, above90: 16, above85: 35, above80: 51, passRate: 100 },
    '12th': { total: 85, above90: 15, above75: 68, passRate: 98.8 },
  },
}

export default function ResultsManagement() {
  const { user, loading: authLoading } = useAuth()
  const [academicYears, setAcademicYears] = useState<string[]>([])
  const [selectedYear, setSelectedYear] = useState<string>('')
  const [newYear, setNewYear] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('Featured')
  const [toppers, setToppers] = useState<Topper[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    score: '',
    rank: '',
    school: '',
    college: '',
    standard: '',
    image: '',
  })
  const [uploading, setUploading] = useState(false)
  const [seeding, setSeeding] = useState(false)
  const [pageMeta, setPageMeta] = useState<ResultsPageMeta | null>(null)
  const [metaLoading, setMetaLoading] = useState(false)
  const [highlightsForm, setHighlightsForm] = useState({ above90: '', above85: '', above80: '', successRate: '' })
  const [stats10, setStats10] = useState({ total: '', above90: '', above85: '', above80: '', passRate: '' })
  const [stats12, setStats12] = useState({ total: '', above90: '', above75: '', passRate: '' })

  const categories = ['Featured', 'SSC', 'Science']

  // Check authentication
  useEffect(() => {
    if (!authLoading && !user) {
      console.warn('User not authenticated')
    }
  }, [user, authLoading])

  // Fetch academic years from Firestore
  useEffect(() => {
    fetchAcademicYears()
  }, [])

  const fetchAcademicYears = async () => {
    try {
      setLoading(true)
      const yearsSet = new Set<string>()

      // Collect years from toppers
      const toppersSnapshot = await getDocs(collection(db, 'toppers'))
      toppersSnapshot.forEach(docSnap => {
        const data = docSnap.data()
        if (data.academicYear) {
          yearsSet.add(data.academicYear)
        }
      })

      // Collect years from resultsPages documents
      const resultsSnapshot = await getDocs(collection(db, 'resultsPages'))
      resultsSnapshot.forEach(docSnap => {
        yearsSet.add(docSnap.id)
      })
      
      const sortedYears = Array.from(yearsSet).sort().reverse()
      setAcademicYears(sortedYears)
      
      // Set first year as selected
      if (sortedYears.length > 0) {
        setSelectedYear(sortedYears[0])
      }
    } catch (error) {
      console.error('Error fetching academic years:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch toppers when year or category changes
  useEffect(() => {
    if (selectedYear) {
      fetchToppers()
      fetchPageMeta()
    }
  }, [selectedYear, selectedCategory])

  const fetchToppers = async () => {
    try {
      const q = query(
        collection(db, 'toppers'),
        where('academicYear', '==', selectedYear),
        where('category', '==', selectedCategory)
      )
      const querySnapshot = await getDocs(q)
      const toppersList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Topper[]
      setToppers(toppersList)
    } catch (error) {
      console.error('Error fetching toppers:', error)
    }
  }

  const fetchPageMeta = async () => {
    if (!selectedYear) return
    try {
      setMetaLoading(true)
      const ref = doc(db, 'resultsPages', selectedYear)
      const snap = await getDoc(ref)
      const data = snap.exists() ? (snap.data() as ResultsPageMeta) : null
      setPageMeta(data)

      const highlights = data?.highlights || []
      setHighlightsForm({
        above90: highlights.find((h) => h.label.includes('Above 90'))?.value?.toString() || '',
        above85: highlights.find((h) => h.label.includes('Above 85'))?.value?.toString() || '',
        above80: highlights.find((h) => h.label.includes('Above 80'))?.value?.toString() || '',
        successRate: highlights.find((h) => h.label.toLowerCase().includes('success rate'))?.value?.toString() || '',
      })

      const stats10 = data?.statistics?.['10th'] || {}
      const stats12 = data?.statistics?.['12th'] || {}
      setStats10({
        total: stats10.total?.toString() || '',
        above90: stats10.above90?.toString() || '',
        above85: stats10.above85?.toString() || '',
        above80: stats10.above80?.toString() || '',
        passRate: stats10.passRate?.toString() || '',
      })
      setStats12({
        total: stats12.total?.toString() || '',
        above90: stats12.above90?.toString() || '',
        above75: stats12.above75?.toString() || '',
        passRate: stats12.passRate?.toString() || '',
      })
    } catch (error) {
      console.error('Error fetching page meta:', error)
    } finally {
      setMetaLoading(false)
    }
  }

  const handleCreateYear = async () => {
    const trimmed = newYear.trim()
    if (!trimmed) return
    
    if (!academicYears.includes(trimmed)) {
      // Create an empty results page doc so the year persists even before toppers are added
      try {
        await setDoc(doc(db, 'resultsPages', trimmed), {
          highlights: [],
          featuredToppers: [],
          sscToppers: [],
          scienceToppers: [],
          statistics: {},
        })
      } catch (error) {
        console.error('Error creating year doc:', error)
        alert('Could not create academic year: ' + (error as any).message)
        return
      }

      const updated = [...academicYears, trimmed].sort().reverse()
      setAcademicYears(updated)
      setSelectedYear(trimmed)
      setNewYear('')
    }
  }

  const handleSeedPublicResults = async () => {
    try {
      setSeeding(true)
      await setDoc(doc(db, 'resultsPages', '2024-2025'), sampleResults2024_2025)

      if (!academicYears.includes('2024-2025')) {
        const updated = [...academicYears, '2024-2025'].sort().reverse()
        setAcademicYears(updated)
      }

      alert('Public Results page data for 2024-2025 pushed to Firestore')
    } catch (error) {
      console.error('Error seeding results page data:', error)
      alert('Failed to seed results data: ' + (error as any).message)
    } finally {
      setSeeding(false)
    }
  }

  const handleSaveMeta = async () => {
    if (!selectedYear) {
      alert('Select an academic year first')
      return
    }
    try {
      setMetaLoading(true)
      const highlights = [
        { label: 'Students Above 90%', value: highlightsForm.above90 || '0', category: 'SSC Toppers' },
        { label: 'Students Above 85%', value: highlightsForm.above85 || '0', category: 'SSC Results' },
        { label: 'Students Above 80%', value: highlightsForm.above80 || '0', category: 'Overall Excellence' },
        { label: 'Success Rate', value: highlightsForm.successRate || '0%', category: 'Pass Percentage' },
      ]

      const statistics = {
        '10th': {
          total: stats10.total || '',
          above90: stats10.above90 || '',
          above85: stats10.above85 || '',
          above80: stats10.above80 || '',
          passRate: stats10.passRate || '',
        },
        '12th': {
          total: stats12.total || '',
          above90: stats12.above90 || '',
          above75: stats12.above75 || '',
          passRate: stats12.passRate || '',
        },
      }

      const ref = doc(db, 'resultsPages', selectedYear)
      const existing = pageMeta || {}
      await setDoc(ref, {
        ...existing,
        highlights,
        statistics,
      })
      alert('Overview saved')
      setPageMeta({ ...existing, highlights, statistics })
    } catch (error) {
      console.error('Error saving overview:', error)
      alert('Failed to save overview: ' + (error as any).message)
    } finally {
      setMetaLoading(false)
    }
  }

  const handleDeleteYear = async (yearToDelete: string) => {
    if (!confirm(`Delete academic year ${yearToDelete} and all its data? This cannot be undone.`)) {
      return
    }

    try {
      // Delete resultsPages document
      try {
        await deleteDoc(doc(db, 'resultsPages', yearToDelete))
      } catch (e) {
        console.warn('No resultsPages doc for this year')
      }

      // Delete all toppers for this year
      const q = query(collection(db, 'toppers'), where('academicYear', '==', yearToDelete))
      const snap = await getDocs(q)
      const deletePromises = snap.docs.map((d) => deleteDoc(d.ref))
      await Promise.all(deletePromises)

      // Update UI
      const updated = academicYears.filter((y) => y !== yearToDelete)
      setAcademicYears(updated)

      // Switch to another year if the deleted year was selected
      if (selectedYear === yearToDelete) {
        setSelectedYear(updated.length > 0 ? updated[0] : '')
      }

      alert(`Academic year ${yearToDelete} deleted successfully`)
    } catch (error) {
      console.error('Error deleting year:', error)
      alert('Error deleting year: ' + (error as any).message)
    }
  }

  const handleAddTopper = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Check authentication
    if (!user) {
      alert('You must be logged in to add toppers')
      return
    }
    
    // Validate required fields
    if (!formData.name.trim()) {
      alert('Name is required')
      return
    }
    if (!formData.score.trim()) {
      alert('Score is required')
      return
    }
    if (!formData.rank.trim()) {
      alert('Rank is required')
      return
    }
    if (!selectedYear) {
      alert('Please select an academic year')
      return
    }
    if (!selectedCategory) {
      alert('Please select a category')
      return
    }
    
    setUploading(true)

    try {
      console.log('User authenticated:', user.email)
      console.log('Adding topper with data:', {
        academicYear: selectedYear,
        category: selectedCategory,
        ...formData,
      })

      const topperData = {
        academicYear: selectedYear,
        category: selectedCategory,
        ...formData,
      }

      if (editingId) {
        console.log('Updating topper:', editingId)
        await updateDoc(doc(db, 'toppers', editingId), topperData)
        setEditingId(null)
        alert('Topper updated successfully!')
      } else {
        console.log('Adding new topper')
        await addDoc(collection(db, 'toppers'), topperData)
        alert('Topper added successfully!')
      }

      setFormData({
        name: '',
        score: '',
        rank: '',
        school: '',
        college: '',
        standard: '',
        image: '',
      })
      setShowForm(false)
      await fetchToppers()
    } catch (error) {
      console.error('Error adding topper:', error)
      const errorMessage = (error as any).message || 'Unknown error occurred'
      alert('Error: ' + errorMessage)
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteTopper = async (id: string) => {
    if (confirm('Are you sure?')) {
      try {
        await deleteDoc(doc(db, 'toppers', id))
        await fetchToppers()
      } catch (error) {
        console.error('Error deleting topper:', error)
      }
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    formDataUpload.append('upload_preset', 'gallery_uploads')
    formDataUpload.append('cloud_name', CLOUDINARY_CLOUD_NAME!)
    formDataUpload.append('api_key', CLOUDINARY_KEY!)

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formDataUpload,
      })
      const data = await res.json()
      if (data.secure_url) {
        setFormData({ ...formData, image: data.secure_url })
        console.log('Image uploaded successfully:', data.secure_url)
      }
    } catch (error) {
      console.error('Image upload failed:', error)
      alert('Failed to upload image')
    } finally {
      setUploading(false)
    }
  }

  const handleEditTopper = (topper: Topper) => {
    setFormData({
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

  return (
    <div className="py-4 md:py-6 lg:py-4">
      <h1 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Results Management</h1>

      {/* Step 1: Create/Select Academic Year */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold mb-4 md:mb-6">Step 1: Academic Year</h2>
        
        {/* Create New Year */}
        <div className="mb-4 md:mb-6 p-3 md:p-4 bg-muted/50 rounded-lg">
          <label className="block text-xs md:text-sm font-medium mb-2 md:mb-3">Create New Academic Year</label>
          <div className="flex gap-2 flex-col sm:flex-row">
            <input
              type="text"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              placeholder="e.g., 2026-2027"
              style={{
                flex: 1,
                padding: '0.5rem 0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
              }}
              className="md:text-base"
            />
            <button
              onClick={handleCreateYear}
              className="px-4 md:px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm md:text-base whitespace-nowrap"
            >
              Create
            </button>
          </div>
        </div>

        {/* Select Existing Year */}
        {academicYears.length > 0 && (
          <div>
            <label className="block text-xs md:text-sm font-medium mb-2 md:mb-3">Select Academic Year</label>
            <div className="flex gap-2 md:gap-3 flex-wrap items-center">
              {academicYears.map(year => (
                <div key={year} className="flex items-center gap-1">
                  <button
                    onClick={() => setSelectedYear(year)}
                    className={`px-3 md:px-6 py-1.5 md:py-2 rounded-lg font-medium transition-all text-sm md:text-base ${
                      selectedYear === year
                        ? 'bg-primary text-white'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    {year}
                  </button>
                  <button
                    onClick={() => handleDeleteYear(year)}
                    className="p-1 md:p-1.5 text-destructive hover:bg-destructive/10 rounded transition-colors"
                    title="Delete this academic year"
                  >
                    <Trash2 className="w-3 md:w-4 h-3 md:h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {academicYears.length === 0 && (
          <p className="text-muted-foreground text-xs md:text-sm">
            No academic years yet. Create one above to get started.
          </p>
        )}
      </div>

      {/* Step 2: Select Category and Add Toppers */}
      {selectedYear && (
        <>
          {/* Step 2: Overview (Highlights & Stats) */}
          <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4 md:mb-6 gap-4 flex-wrap">
              <h2 className="text-lg md:text-xl font-bold">Step 2: Overview (Highlights & Stats)</h2>
              <button
                onClick={handleSaveMeta}
                disabled={metaLoading}
                className="px-3 md:px-4 py-1.5 md:py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-60 text-sm md:text-base whitespace-nowrap"
              >
                {metaLoading ? 'Saving...' : 'Save Overview'}
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              {/* Highlights */}
              <div className="p-3 md:p-4 border border-border rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">Highlights</h3>
                <div className="space-y-2 md:space-y-3">
                  {[{ label: 'Students Above 90%', key: 'above90' }, { label: 'Students Above 85%', key: 'above85' }, { label: 'Students Above 80%', key: 'above80' }, { label: 'Success Rate (%)', key: 'successRate' }].map(item => (
                    <div key={item.key}>
                      <label className="block text-xs md:text-sm font-medium mb-1">{item.label}</label>
                      <input
                        type="text"
                        value={(highlightsForm as any)[item.key]}
                        onChange={(e) => setHighlightsForm({ ...highlightsForm, [item.key]: e.target.value })}
                        placeholder={item.label}
                        style={{
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          fontSize: '0.85rem',
                          boxSizing: 'border-box',
                        }}
                        className="md:text-base"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div className="p-4 border border-border rounded-lg bg-muted/30">
                <h3 className="font-semibold mb-4">Performance Overview</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm font-semibold">10th Standard</div>
                    {[{ label: 'Total Students', key: 'total' }, { label: 'Above 90%', key: 'above90' }, { label: 'Above 85%', key: 'above85' }, { label: 'Above 80%', key: 'above80' }, { label: 'Pass Rate (%)', key: 'passRate' }].map(item => (
                      <div key={item.key}>
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">{item.label}</label>
                        <input
                          type="text"
                          value={(stats10 as any)[item.key]}
                          onChange={(e) => setStats10({ ...stats10, [item.key]: e.target.value })}
                          placeholder={item.label}
                          style={{
                            width: '100%',
                            padding: '0.55rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.9rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-semibold">11th & 12th</div>
                    {[{ label: 'Total Students', key: 'total' }, { label: 'Above 90%', key: 'above90' }, { label: 'Above 75%', key: 'above75' }, { label: 'Pass Rate (%)', key: 'passRate' }].map(item => (
                      <div key={item.key}>
                        <label className="block text-xs font-medium mb-1 text-muted-foreground">{item.label}</label>
                        <input
                          type="text"
                          value={(stats12 as any)[item.key]}
                          onChange={(e) => setStats12({ ...stats12, [item.key]: e.target.value })}
                          placeholder={item.label}
                          style={{
                            width: '100%',
                            padding: '0.55rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            fontSize: '0.9rem',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-8 mb-8">
            <h2 className="text-xl font-bold mb-6">Step 3: Select Category</h2>
            <label className="block text-sm font-medium mb-3">Category</label>
            <div className="flex gap-3 flex-wrap">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-accent text-white'
                      : 'bg-muted hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Add Topper Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => {
                if (showForm) {
                  setEditingId(null)
                  setFormData({
                    name: '',
                    score: '',
                    rank: '',
                    school: '',
                    college: '',
                    standard: '',
                    image: '',
                  })
                }
                setShowForm(!showForm)
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              <Plus className="w-5 h-5" />
              {showForm ? 'Cancel' : 'Add Topper'}
            </button>
          </div>

          {/* Add Form */}
          {showForm && (
            <div className="bg-card border border-border rounded-xl p-4 md:p-8 mb-6 md:mb-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">
                {editingId ? 'Edit Topper' : 'Add New Topper'} - {selectedYear} ({selectedCategory})
              </h2>
              <form onSubmit={handleAddTopper} className="space-y-4 md:space-y-6">
                {/* Image Upload */}
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
                  {formData.image && <p className="text-xs md:text-sm text-muted-foreground mt-2">Image uploaded: {formData.image.slice(0, 50)}...</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
                  <div>
                    <label className="block text-xs md:text-sm font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, score: e.target.value })
                      }
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
                      onChange={(e) =>
                        setFormData({ ...formData, rank: e.target.value })
                      }
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
                    <label className="block text-xs md:text-sm font-medium mb-2">Standard</label>
                    <input
                      type="text"
                      value={formData.standard}
                      onChange={(e) =>
                        setFormData({ ...formData, standard: e.target.value })
                      }
                      placeholder="e.g., 10th, 12th, NEET-2023"
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
                    <label className="block text-xs md:text-sm font-medium mb-2">School</label>
                    <input
                      type="text"
                      value={formData.school}
                      onChange={(e) =>
                        setFormData({ ...formData, school: e.target.value })
                      }
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
                    <label className="block text-xs md:text-sm font-medium mb-2">College</label>
                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) =>
                        setFormData({ ...formData, college: e.target.value })
                      }
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

          {/* Toppers Table */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold">
                Toppers - {selectedYear} ({selectedCategory})
              </h3>
            </div>
            {toppers.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                No toppers added for {selectedYear} - {selectedCategory} yet
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
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
        </>
      )}
    </div>
  )
}
