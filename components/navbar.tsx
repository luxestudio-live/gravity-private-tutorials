"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Courses", href: "/courses" },
  { name: "Faculty", href: "/faculty" },
  { name: "Results", href: "/results" },
  { name: "Gallery", href: "/gallery" },
  { name: "Activities", href: "/activities" },
  { name: "Contact", href: "/contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

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

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 transition-all duration-300 hover:scale-105 group"
          >
            <img 
              src="/decent-academy-v1/DecentLogo.png" 
              alt="Decent Academy" 
              className="h-12 w-auto"
            />
            <span className="text-2xl lg:text-3xl font-[family-name:var(--font-bebas)] font-normal tracking-wide">
              <span className="text-primary">DECENT</span>{" "}
              <span className="text-primary">ACADEMY</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-primary group overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute inset-0 bg-primary/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg" />
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Button className="ml-4 relative overflow-hidden group" size="lg">
              <span className="relative z-10">Enroll Now</span>
              <span className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-6 animate-scale-in">
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
              <Button className="mt-4" size="lg">
                Enroll Now
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
