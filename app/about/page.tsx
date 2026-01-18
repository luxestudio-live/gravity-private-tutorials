import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Target, Eye, Award, Users, BookOpen, Heart, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const values = [
  {
    icon: Target,
    title: "Excellence",
    description: "We strive for the highest standards in education and student achievement",
    color: "from-primary to-accent",
  },
  {
    icon: Heart,
    title: "Dedication",
    description: "Committed to nurturing each student's potential with personalized care",
    color: "from-accent to-secondary",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Embracing modern teaching methodologies and technology in education",
    color: "from-secondary to-primary",
  },
  {
    icon: Users,
    title: "Community",
    description: "Building a supportive environment where everyone thrives together",
    color: "from-primary to-accent",
  },
]

const milestones = [
  { year: "2006", event: "Academy Founded", description: "Started with a vision to transform education" },
  { year: "2015", event: "1000+ Students", description: "Reached milestone of teaching 1000 students" },
  { year: "2025", event: "5000+ Alumni", description: "Growing network of successful students" },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-20 right-10 w-80 h-80 bg-accent/20 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium border border-primary/20">
              <Award className="w-4 h-4" />
              <span>15 Years of Educational Excellence</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              About
              <span className="block mt-2 text-primary">Decent Academy</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Where passion meets purpose, and dreams transform into achievements
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mission */}
            <div className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Target className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6 group-hover:text-primary transition-colors duration-300">
                  Our Mission
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To provide world-class education that empowers students to achieve academic excellence and develop
                  into well-rounded individuals. We are committed to fostering critical thinking, creativity, and a
                  lifelong love for learning.
                </p>
              </div>
            </div>

            {/* Vision */}
            <div className="group relative bg-card rounded-3xl border border-border/50 hover:border-primary/50 p-12 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-secondary/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-accent to-secondary rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <Eye className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold mb-6 group-hover:text-accent transition-colors duration-300">
                  Our Vision
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  To be the most trusted and sought-after educational institution, recognized for producing leaders,
                  innovators, and achievers who contribute positively to society. We envision a future where every
                  student reaches their full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Our Core
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Values & Principles
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              The foundation that guides everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-card rounded-2xl border border-border/50 hover:border-primary/50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}
                />
                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                  >
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              Our
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Journey of Excellence
              </span>
            </h2>
            <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
              Milestones that define our commitment to education
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-secondary hidden lg:block" />

              {/* Timeline Items */}
              <div className="space-y-12">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className={`relative flex items-center gap-8 ${
                      index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1">
                      <div
                        className={`group bg-card rounded-2xl border border-border/50 hover:border-primary/50 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                          index % 2 === 0 ? "lg:text-right" : "lg:text-left"
                        }`}
                      >
                        <div className="text-4xl font-bold text-primary mb-3">{milestone.year}</div>
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                          {milestone.event}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>

                    {/* Center Dot */}
                    <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
                      <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-lg" />
                    </div>

                    {/* Spacer */}
                    <div className="flex-1 hidden lg:block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary via-accent to-secondary rounded-3xl p-12 lg:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: "40px 40px",
                }}
              />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">Ready to Begin Your Journey?</h2>
              <p className="text-xl mb-8 text-white/90 text-pretty leading-relaxed max-w-2xl mx-auto">
                Join thousands of successful students who transformed their academic careers with us
              </p>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 group" asChild>
                <Link href="/contact">
                  <span className="flex items-center gap-2">
                    Contact Us Today
                    <BookOpen className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
