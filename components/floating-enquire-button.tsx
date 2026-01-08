"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"

export function FloatingEnquireButton() {
  return (
    <Link
      href="/contact"
      className="fixed bottom-6 right-6 z-40 group animate-float-gentle"
    >
      <div className="relative">
        {/* Pulsing ring effect */}
        <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
        
        {/* Main button */}
        <div className="relative flex items-center gap-3 bg-gradient-to-r from-primary via-secondary to-primary bg-size-200 animate-gradient px-6 py-4 rounded-full shadow-2xl animate-glow-pulse transition-all duration-300 hover:scale-110">
          <MessageCircle className="w-6 h-6 text-background transition-transform duration-300 group-hover:rotate-12" />
          <span className="text-background font-bold text-lg hidden md:block">
            Enquire Now
          </span>
        </div>
        
        {/* Tooltip for mobile */}
        <div className="md:hidden absolute bottom-full right-0 mb-2 px-3 py-1 bg-foreground text-background text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Enquire Now
        </div>
      </div>
    </Link>
  )
}
