"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/utils"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"

type AnnouncementItem = {
  id: string
  message: string
  order: number
  active: boolean
  createdAt?: number
}

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Results", href: "/results" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([])
  const [activeAnnouncementIndex, setActiveAnnouncementIndex] = useState(0)
  const pathname = usePathname()
  const isHomeHero = pathname === "/" && !scrolled
  const hasAnnouncements = announcements.length > 0

  useEffect(() => {
    window.scrollTo(0, 0)
    setIsOpen(false)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "announcements"), (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((item): item is AnnouncementItem => Boolean((item as AnnouncementItem).message))
        .filter((item) => item.active !== false)
        .sort((a, b) => {
          if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999)
          return (a.createdAt ?? 0) - (b.createdAt ?? 0)
        })
      setAnnouncements(list)
      setActiveAnnouncementIndex(0)
    })

    return () => unsub()
  }, [])

  useEffect(() => {
    if (announcements.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveAnnouncementIndex((prev) => (prev + 1) % announcements.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [announcements])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      {hasAnnouncements && (
        <div className="w-full bg-gradient-to-r from-red-950 via-red-900 to-red-950 text-white border-b border-red-700 shadow-md">
          <div className="container mx-auto px-4 lg:px-6 h-10 md:h-11 flex items-center justify-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/15 border border-white/30 text-[10px] md:text-xs font-bold uppercase tracking-wider">
              <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
              Important
            </span>
            <span className="line-clamp-1 text-center text-xs md:text-sm font-semibold tracking-wide [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]">
              {announcements[activeAnnouncementIndex]?.message}
            </span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-6">
        <div className={`flex items-center justify-between ${hasAnnouncements ? "h-16 md:h-20" : "h-20"}`}>
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-0 md:gap-3 transition-all duration-300 hover:scale-105 group"
          >
            <img 
              src={withBasePath("/gravity-logo.png")}
              alt="Gravity Private Tutorials" 
              className="h-12 w-auto"
              decoding="async"
            />
            <span className="hidden md:block text-2xl lg:text-3xl font-[family-name:var(--font-bebas)] font-bold tracking-wide">
              <span className="text-primary">GRAVITY</span>{" "}
              <span className="text-primary">PRIVATE TUTORIALS</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-all duration-300 group overflow-hidden text-foreground/90 hover:text-primary"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300 bg-primary" />
              </Link>
            ))}
            <Button asChild className="ml-4 relative overflow-hidden group" size="lg">
              <Link href="/contact">
                <span className="relative z-10">Enroll Now</span>
                <span className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 transition-colors duration-300 text-foreground hover:text-primary"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 bg-background/98 backdrop-blur-xl border-t border-border/50 shadow-2xl rounded-b-2xl animate-scale-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-base font-medium text-foreground/80 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 transform hover:translate-x-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <Button asChild className="mt-4 mx-4 w-[calc(100%-2rem)]" size="lg">
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  Enroll Now
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
