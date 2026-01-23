'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'
import { LogOut, Users, BarChart3 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const handleLogout = async () => {
    await signOut(auth)
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-screen w-64 bg-foreground/5 border-r border-border p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">
            <span className="text-secondary">DECENT</span>
            <span className="text-accent ml-2">ACADEMY</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-2">Admin Panel</p>
        </div>

        <nav className="space-y-4 mb-8">
          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/admin/faculty"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>Faculty</span>
          </Link>
          <Link
            href="/admin/results"
            className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <BarChart3 className="w-5 h-5" />
            <span>Results</span>
          </Link>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs text-muted-foreground mb-4">
            Logged in as: {user.email}
          </p>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        {children}
      </main>
    </div>
  )
}
