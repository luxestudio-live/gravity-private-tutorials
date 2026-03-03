"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { withBasePath } from "@/lib/utils"

const heroSlides = ["/1.png", "/2.png", "/3.png", "/4.png"]

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 3500)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <section className="relative min-h-[calc(100svh-5rem)] flex items-center overflow-hidden pt-20 md:pt-24 bg-gradient-to-b from-background via-background to-muted/20">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="h-full w-full bg-background" />
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8 py-8 md:py-10">
        <div className="max-w-6xl mx-auto space-y-8 md:space-y-10">
          <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen md:static md:ml-0 md:mr-0 md:w-full">
            <div className="relative rounded-2xl md:rounded-3xl p-0 md:p-3 border-0 md:border md:border-border/60 bg-card/70 md:backdrop-blur-sm md:shadow-[0_25px_70px_-30px_hsl(var(--primary)/0.45)] overflow-hidden">
              <div className="hidden md:block absolute inset-0 rounded-3xl ring-1 ring-white/40 pointer-events-none" />
              <div className="relative w-full overflow-hidden rounded-2xl md:rounded-2xl aspect-[16/9] min-h-[220px] md:min-h-[320px] bg-muted">
                {heroSlides.map((slide, index) => (
                  <img
                    key={`hero-${slide}`}
                    src={withBasePath(slide)}
                    alt={`Hero banner ${index + 1}`}
                    className={`absolute inset-0 h-full w-full object-contain object-center transition-opacity duration-700 ${
                      index === activeSlide ? "opacity-100" : "opacity-0"
                    }`}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-4">
              {heroSlides.map((_, index) => (
                <span
                  key={`dot-${index}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeSlide ? "w-6 bg-primary" : "w-2.5 bg-primary/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="text-center space-y-7 md:space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-semibold animate-scale-in border border-primary/20 backdrop-blur-sm shadow-sm">
              <Sparkles className="w-4 h-4" />
              <span>Leading Coaching Institute Since 2019</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.05] text-foreground">
              Transform Your
              <span className="block mt-2 text-primary">Academic Journey</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Excellence in education for 8th to 12th grade students. Expert faculty, proven methodologies, and a
              commitment to your success.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Button
                size="lg"
                className="text-lg px-8 py-6 group relative overflow-hidden shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 transition-all duration-300"
                asChild
              >
                <Link href="/courses">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Courses
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 group border-2 border-primary/20 hover:bg-primary/5 bg-background/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
                asChild
              >
                <Link href="/contact">Book Free Demo</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
