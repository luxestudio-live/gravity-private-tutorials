'use client'

import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import Link from 'next/link'
import { LogOut, Users, BarChart3, Image as ImageIcon, Mail, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Skip auth check for login page
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (!isLoginPage && !loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router, isLoginPage])

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Show login page without layout
  if (isLoginPage) {
    return <>{children}</>
  }

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

  const navItems = [
    { href: '/admin/dashboard', icon: BarChart3, label: 'Dashboard' },
    { href: '/admin/results', icon: BarChart3, label: 'Results' },
    { href: '/admin/faculty', icon: Users, label: 'Faculty' },
    { href: '/admin/gallery', icon: ImageIcon, label: 'Gallery' },
    { href: '/admin/contact', icon: Mail, label: 'Contacts' },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 bg-card border-b border-border p-4 z-50 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 hover:bg-muted rounded-lg"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="text-sm font-bold">
          <span className="text-secondary">GRAVITY</span>
          <span className="text-accent ml-1">PRIVATE TUTORIALS</span>
        </h1>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30 mt-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 z-40 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:sticky lg:top-0`}
      >
        <div className="mb-8 mt-16 lg:mt-0">
          <h1 className="text-2xl font-bold">
            <span className="text-secondary">GRAVITY</span>
            <span className="text-accent ml-2">PRIVATE TUTORIALS</span>
          </h1>
          <p className="text-xs text-muted-foreground mt-2">Admin Panel</p>
        </div>

        <nav className="space-y-2 mb-8">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <p className="text-xs text-muted-foreground mb-3 truncate">
            {user.email}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={() => window.open('/', '_blank')}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              Visit
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
            >
              <LogOut className="w-3 h-3 mr-1" />
              Exit
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 mt-16 lg:mt-0 px-4 md:px-6 lg:px-8 min-h-screen">
        {children}
      </main>
    </div>
  )
}
