'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    faculty: 0,
    results: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const facultySnapshot = await getDocs(collection(db, 'faculty'))
        const resultsSnapshot = await getDocs(collection(db, 'results'))

        setStats({
          faculty: facultySnapshot.size,
          results: resultsSnapshot.size,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Faculty Stats */}
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="text-muted-foreground text-sm font-medium mb-2">Total Faculty</div>
          <div className="text-4xl font-bold text-primary mb-4">{stats.faculty}</div>
          <p className="text-muted-foreground text-sm">
            Active faculty members in the system
          </p>
        </div>

        {/* Results Stats */}
        <div className="bg-card border border-border rounded-xl p-8">
          <div className="text-muted-foreground text-sm font-medium mb-2">Total Results</div>
          <div className="text-4xl font-bold text-accent mb-4">{stats.results}</div>
          <p className="text-muted-foreground text-sm">
            Student results entered in the system
          </p>
        </div>
      </div>

      <div className="mt-8 bg-card border border-border rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <a
            href="/admin/faculty"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center font-medium"
          >
            Manage Faculty
          </a>
          <a
            href="/admin/results"
            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors text-center font-medium"
          >
            Manage Results
          </a>
        </div>
      </div>
    </div>
  )
}
