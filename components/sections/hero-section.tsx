import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Horizontal Gradient Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/5 to-accent/10" />
        
        {/* Logo Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <img 
            src="/DecentLogo.png" 
            alt="" 
            className="w-[400px] md:w-[600px] h-auto object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium animate-scale-in border border-primary/20 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span>Leading Coaching Institute Since 2006</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
            Transform Your
            <span className="block mt-2 text-primary">Academic Journey</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
            Excellence in education for 5th to 12th grade students. Expert faculty, proven methodologies, and a
            commitment to your success.
          </p>

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

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 max-w-4xl mx-auto">
            {[
              { value: "20+", label: "Years Experience" },
              { value: "10000+", label: "Students Taught" },
              { value: "30+", label: "Expert Faculty" },
              { value: "100%", label: "Success Rate" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group"
              >
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
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
