'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { BarChart3, Users, Image as ImageIcon, Mail, Award } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    toppers: 0,
    faculty: 0,
    gallery: 0,
    contacts: 0,
    unreadContacts: 0,
    academicYears: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [toppersSnap, facultySnap, gallerySnap, contactsSnap, resultsSnap] = await Promise.all([
          getDocs(collection(db, 'toppers')),
          getDocs(collection(db, 'faculty')),
          getDocs(collection(db, 'gallery')),
          getDocs(collection(db, 'contacts')),
          getDocs(collection(db, 'resultsPages')),
        ])

        const unreadContacts = contactsSnap.docs.filter(
          (doc) => doc.data().status === 'unread'
        ).length

        setStats({
          toppers: toppersSnap.size,
          faculty: facultySnap.size,
          gallery: gallerySnap.size,
          contacts: contactsSnap.size,
          unreadContacts,
          academicYears: resultsSnap.size,
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

  const statCards = [
    {
      title: 'Total Toppers',
      value: stats.toppers,
      description: 'Student toppers and achievers',
      icon: Award,
      color: 'from-blue-500 to-blue-600',
      href: '/admin/results',
    },
    {
      title: 'Faculty Members',
      value: stats.faculty,
      description: 'Added faculty members',
      icon: Users,
      color: 'from-purple-500 to-purple-600',
      href: '/admin/faculty',
    },
    {
      title: 'Gallery Images',
      value: stats.gallery,
      description: 'Added gallery images',
      icon: ImageIcon,
      color: 'from-green-500 to-green-600',
      href: '/admin/gallery',
    },
    {
      title: 'Contact Submissions',
      value: stats.contacts,
      description: stats.unreadContacts > 0 ? `${stats.unreadContacts} unread` : 'All contacts read',
      icon: Mail,
      color: 'from-orange-500 to-orange-600',
      href: '/admin/contact',
      badge: stats.unreadContacts > 0 ? stats.unreadContacts : undefined,
    },
    {
      title: 'Academic Years',
      value: stats.academicYears,
      description: 'Years with results data',
      icon: BarChart3,
      color: 'from-pink-500 to-pink-600',
      href: '/admin/results',
    },
  ]

  return (
    <div className="py-4 md:py-6">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground text-sm md:text-base">Welcome to the admin panel. Manage your academy content below.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 md:gap-6 mb-8">
        {statCards.map((card) => {
          const Icon = card.icon
          return (
            <Link
              key={card.title}
              href={card.href}
              className="group bg-card border border-border rounded-xl p-4 md:p-6 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3 md:mb-4">
                <div className={`p-2 md:p-3 rounded-lg bg-gradient-to-br ${card.color} text-white`}>
                  <Icon className="w-5 md:w-6 h-5 md:h-6" />
                </div>
                {card.badge && (
                  <span className="bg-destructive text-white text-xs font-bold rounded-full w-6 h-6 md:w-7 md:h-7 flex items-center justify-center">
                    {card.badge}
                  </span>
                )}
              </div>
              <p className="text-xs md:text-sm text-muted-foreground mb-1 font-medium">{card.title}</p>
              <p className="text-2xl md:text-3xl font-bold text-primary mb-2">{card.value}</p>
              <p className="text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {card.description}
              </p>
            </Link>
          )
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-4 md:p-8">
        <h2 className="text-lg md:text-2xl font-bold mb-4 md:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <Link
            href="/admin/results"
            className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all font-medium text-sm md:text-base text-center"
          >
            📊 Manage Results
          </Link>
          <Link
            href="/admin/faculty"
            className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all font-medium text-sm md:text-base text-center"
          >
            👥 Manage Faculty
          </Link>
          <Link
            href="/admin/gallery"
            className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all font-medium text-sm md:text-base text-center"
          >
            🖼️ Gallery
          </Link>
          <Link
            href="/admin/contact"
            className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all font-medium text-sm md:text-base text-center relative"
          >
            💬 Contacts
            {stats.unreadContacts > 0 && (
              <span className="absolute -top-2 -right-2 bg-destructive text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {stats.unreadContacts}
              </span>
            )}
          </Link>
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 md:px-6 py-3 md:py-4 bg-gradient-to-r from-slate-500 to-slate-600 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all font-medium text-sm md:text-base text-center"
          >
            🌐 Visit Website
          </a>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-6 md:mt-8 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 md:p-6">
        <h3 className="text-base md:text-lg font-bold mb-2">Quick Summary</h3>
        <div className="text-sm md:text-base text-muted-foreground space-y-1">
          <p>
            ✅ <strong>{stats.toppers}</strong> toppers across <strong>{stats.academicYears}</strong> academic year(s)
          </p>
          <p>
            ✅ <strong>{stats.faculty}</strong> faculty member(s) added to the system
          </p>
          <p>
            ✅ <strong>{stats.gallery}</strong> gallery image(s) uploaded
          </p>
          <p>
            {stats.unreadContacts > 0 ? (
              <>
                ⚠️ <strong>{stats.unreadContacts}</strong> unread contact submission(s) - <Link href="/admin/contact" className="text-primary hover:underline font-semibold">View now</Link>
              </>
            ) : (
              <>
                ✅ All <strong>{stats.contacts}</strong> contact submission(s) have been reviewed
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
