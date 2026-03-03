import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/sections/hero-section"
import { FeaturedSection } from "@/components/sections/featured-section"
import { StatsSection } from "@/components/sections/stats-section"
import { CoursesPreview } from "@/components/sections/courses-preview"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { WhyChooseUs } from "@/components/sections/why-choose-us"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Smartphone } from "lucide-react"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturedSection />
      <StatsSection />
      <CoursesPreview />
      <WhyChooseUs />
      <TestimonialsSection />

      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center bg-card border border-border/50 rounded-3xl p-8 lg:p-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium border border-primary/20 mb-5">
              <Smartphone className="w-4 h-4" />
              <span>Learn On The Go</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-3">Download Gravity - JEE/NEET</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Access study resources, updates, and learning support directly from your phone.
            </p>
            <Button size="lg" asChild>
              <Link
                href="https://play.google.com/store/apps/details?id=com.gravity.gravitydost"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get it on Google Play
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
