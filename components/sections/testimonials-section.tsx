"use client"

import { useEffect, useState } from "react"
import { Star, Quote } from "lucide-react"
import { collection, onSnapshot } from "firebase/firestore"
import { db } from "@/lib/firebase"

type ReviewItem = {
  id: string
  name: string
  role: string
  content: string
  rating: number
  order?: number
  active?: boolean
  createdAt?: number
}

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")

export function TestimonialsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>([])
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "reviews"), (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }) as ReviewItem)
        .filter((item) => item.active !== false)
        .sort((a, b) => {
          if ((a.order ?? 999) !== (b.order ?? 999)) return (a.order ?? 999) - (b.order ?? 999)
          return (a.createdAt ?? 0) - (b.createdAt ?? 0)
        })

      setReviews(list)
      setActiveIndex(0)
      setLoading(false)
    })

    return () => unsub()
  }, [])

  useEffect(() => {
    if (reviews.length <= 1) return

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % reviews.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [reviews])

  if (loading) {
    return (
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center text-muted-foreground">Loading reviews...</div>
        </div>
      </section>
    )
  }

  if (reviews.length === 0) {
    return null
  }

  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  const handleNext = () => setActiveIndex((prev) => (prev + 1) % reviews.length)

  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Success Stories That
            <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Inspire Excellence
            </span>
          </h2>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Hear from our students who achieved their dreams
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {reviews[activeIndex] && (
            <div className="relative bg-card border-2 border-primary/20 rounded-3xl p-6 md:p-10 shadow-2xl mb-10 min-h-[420px] flex flex-col justify-between">
              {/* Quote Icon */}
              <div className="absolute -top-10 left-12 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br from-primary to-accent rounded-3xl flex items-center justify-center rotate-12 opacity-100">
                <Quote className="w-12 md:w-16 h-12 md:h-16 text-white" />
              </div>

              {/* Rating */}
              <div className="flex gap-2 mb-6 pt-28 md:pt-16">
                {[...Array(Math.max(1, Math.min(5, reviews[activeIndex].rating || 5)))].map((_, i) => (
                  <Star key={i} className="w-6 h-6 md:w-7 md:h-7 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Content - Large and Prominent */}
              <p className="text-lg md:text-xl lg:text-2xl text-foreground/95 leading-relaxed italic font-medium mb-8 flex-grow">
                "{reviews[activeIndex].content}"
              </p>

              {/* Student Info */}
              <div className="flex items-center gap-4 pt-8 border-t-2 border-border/50">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg md:text-2xl border-3 border-primary/20 flex-shrink-0">
                  {initialsFromName(reviews[activeIndex].name)}
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg md:text-xl">{reviews[activeIndex].name}</div>
                  <div className="text-muted-foreground text-base md:text-lg">{reviews[activeIndex].role || "Student"}</div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          {reviews.length > 1 && (
            <div className="flex items-center justify-center gap-4 md:gap-6">
              <button
                onClick={handlePrev}
                className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-medium transition-all hover:shadow-md"
              >
                ← Previous
              </button>

              <div className="flex gap-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={`rounded-full transition-all duration-300 ${
                      index === activeIndex ? "bg-primary w-8 h-3" : "bg-primary/30 w-3 h-3 hover:bg-primary/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="px-4 md:px-6 py-2 md:py-3 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary font-medium transition-all hover:shadow-md"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
