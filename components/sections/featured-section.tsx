"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Star } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, onSnapshot } from "firebase/firestore"
import { Button } from "@/components/ui/button"
import { withBasePath } from "@/lib/utils"

type FeaturedItem = {
  id: string
  title: string
  description: string
  image?: string
  ctaText?: string
  ctaLink?: string
  order?: number
  active?: boolean
  createdAt?: number
}

const MAX_TITLE_LENGTH = 70
const MAX_DESCRIPTION_LENGTH = 170

export function FeaturedSection() {
  const [items, setItems] = useState<FeaturedItem[]>([])
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "featuredItems"), (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter((item): item is FeaturedItem => Boolean((item as FeaturedItem).title))
        .filter((item) => item.active !== false)
        .sort((a, b) => {
          if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999)
          return (a.createdAt ?? 0) - (b.createdAt ?? 0)
        })
      setItems(list)
      setActiveIndex(0)
    })

    return () => unsub()
  }, [])

  useEffect(() => {
    if (items.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length)
    }, 4500)

    return () => window.clearInterval(timer)
  }, [items])

  if (items.length === 0) {
    return null
  }

  const activeItem = items[activeIndex]
  const imageSource = activeItem.image || withBasePath("/gravity-logo-normal.jpeg")
  const title = (activeItem.title || "").slice(0, MAX_TITLE_LENGTH)
  const description = (activeItem.description || "").slice(0, MAX_DESCRIPTION_LENGTH)

  return (
    <section className="py-10 lg:py-12 bg-muted/30 border-y border-border/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Star className="w-4 h-4" />
              <span>Featured Update</span>
            </div>
          </div>

          <article className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/40 transition-colors">
            <div className="flex flex-col lg:grid lg:grid-cols-2 lg:h-[280px]">
              <div className="aspect-[16/9] h-[220px] lg:aspect-auto lg:h-full bg-muted overflow-hidden">
                <img
                  src={imageSource}
                  alt={title}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div className="p-5 lg:p-6 flex flex-col h-full">
                <h3 className="text-xl lg:text-2xl font-bold leading-snug line-clamp-2 min-h-[56px]">{title}</h3>
                <p className="mt-3 block w-full text-sm md:text-base text-muted-foreground leading-relaxed break-words line-clamp-4 min-h-[96px]">
                  {description}
                </p>

                {activeItem.ctaText && activeItem.ctaLink ? (
                  <div className="mt-auto pt-4 min-h-[52px] flex items-end">
                    <Button asChild>
                      <Link
                        href={activeItem.ctaLink}
                        target={activeItem.ctaLink.startsWith("http") ? "_blank" : undefined}
                        rel={activeItem.ctaLink.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {activeItem.ctaText.slice(0, 28)}
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <div className="mt-auto pt-4 min-h-[52px]" />
                )}
              </div>
            </div>
          </article>

          {items.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {items.map((item, index) => (
                <span
                  key={item.id}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeIndex ? "w-5 bg-primary" : "w-2 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
