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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 -z-10">
        <div
          className="hidden md:flex h-full w-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${activeSlide * 100}%)` }}
        >
          {heroSlides.map((slide, index) => (
            <div key={slide} className="relative h-full min-w-full bg-foreground">
              <img
                src={withBasePath(slide)}
                alt={`Hero banner ${index + 1}`}
                className="h-full w-full object-cover object-center"
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
              />
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/75 via-foreground/55 to-foreground/70 md:bg-gradient-to-r md:from-foreground/80 md:via-foreground/65 md:to-foreground/55" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-16 md:py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/15 rounded-full text-white text-sm font-medium animate-scale-in border border-white/25 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Leading Coaching Institute Since 2019</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight text-white drop-shadow-[0_3px_14px_rgba(0,0,0,0.75)]">
            Transform Your
            <span className="block mt-2 text-white [text-shadow:0_4px_16px_rgba(0,0,0,0.9)]">Academic Journey</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
            Excellence in education for 8th to 12th grade students. Expert faculty, proven methodologies, and a
            commitment to your success.
          </p>

          <div className="md:hidden w-full max-w-md mx-auto pt-2">
            <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-foreground/80 backdrop-blur-sm">
              <div
                className="flex w-full transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {heroSlides.map((slide, index) => (
                  <div key={`mobile-${slide}`} className="min-w-full aspect-[16/9]">
                    <img
                      src={withBasePath(slide)}
                      alt={`Hero mobile banner ${index + 1}`}
                      className="h-full w-full object-cover"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 mt-3">
              {heroSlides.map((_, index) => (
                <span
                  key={`dot-${index}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === activeSlide ? "w-5 bg-white" : "w-2 bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="text-lg px-8 py-6 group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
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
              className="text-lg px-8 py-6 group border-2 hover:bg-primary/5 bg-background/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/contact">Book Free Demo</Link>
            </Button>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  )
}
