"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GraduationCap, Beaker, BookOpen, CheckCircle2, Clock, Users, ArrowRight, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

type GradeLevel = "8-10" | "11-12"

const juniorClassCards = [
  {
    className: "Class 8th",
    tag: "Foundation Year",
    boards: ["ICSE", "CBSE"],
    subjects: ["Mathematics", "Physics", "Chemistry", "Biology", "Social Studies", "English"],
    points: ["Strong fundamentals", "Regular practice sheets", "Weekly chapter tests"],
    icon: GraduationCap,
  },
  {
    className: "Class 9th",
    tag: "Progression Year",
    boards: ["ICSE", "CBSE"],
    subjects: ["Mathematics", "Science"],
    points: ["Board + foundation approach", "Application-based problems", "Performance tracking"],
    icon: BookOpen,
  },
  {
    className: "Class 10th",
    tag: "Board Readiness",
    boards: ["ICSE", "CBSE", "Foundation"],
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    points: ["Revision strategy", "Mock test series", "Exam writing techniques"],
    icon: Target,
  },
]

const seniorClassCards = [
  {
    className: "Class 11th",
    tag: "Integrated + Non-Integrated",
    exams: ["IIT JEE", "MHT-CET", "NEET"],
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    points: ["Concept depth for PCM/PCB", "Entrance-aligned practice", "Structured doubt solving"],
    icon: Beaker,
  },
  {
    className: "Class 12th",
    tag: "Boards + Entrance Focus",
    exams: ["IIT JEE", "MHT-CET", "NEET"],
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    points: ["Board scoring strategy", "CET/JEE/NEET test cycles", "Final revision support"],
    icon: GraduationCap,
  },
]

export default function CoursesPage() {
  const [activeGrade, setActiveGrade] = useState<GradeLevel>("8-10")

  return (
    <main className="min-h-screen">
      <Navbar />

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
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Our
              <span className="block mt-2 text-primary">Course Offerings</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              Comprehensive programs designed for academic excellence across CBSE, ICSE, and HSC boards
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 bg-background/95 backdrop-blur-lg border-y border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <button
              onClick={() => setActiveGrade("8-10")}
              className={`group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto ${
                activeGrade === "8-10"
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-xl scale-105"
                  : "bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <GraduationCap className="w-5 h-5" />
                <span>8th to 10th</span>
              </span>
            </button>
            <button
              onClick={() => setActiveGrade("11-12")}
              className={`group relative px-8 py-4 rounded-xl font-medium transition-all duration-300 w-full sm:w-auto ${
                activeGrade === "11-12"
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-xl scale-105"
                  : "bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <Beaker className="w-5 h-5" />
                <span>11th & 12th Science</span>
              </span>
            </button>
          </div>
        </div>
      </section>

      {activeGrade === "8-10" ? (
        <section className="py-16 lg:py-20 bg-muted/20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="relative mb-12 rounded-3xl border border-border/60 bg-card/70 backdrop-blur-sm p-8 lg:p-10 overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-5">
                    <GraduationCap className="w-4 h-4" />
                    <span>Classes 8th to 10th</span>
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-balance">
                    Batches for
                    <span className="block mt-1 text-primary">Class 8th to 10th</span>
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                    Board-focused and foundation batches designed for strong subject fundamentals
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-primary/20 bg-primary/10 text-primary">ICSE</span>
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-secondary/20 bg-secondary/10 text-secondary">CBSE</span>
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/20 bg-accent/10 text-accent">JEE/NEET Foundation</span>
                    <span className="px-3 py-1.5 rounded-full text-xs font-semibold border border-border bg-muted text-muted-foreground">Olympiad</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {juniorClassCards.map((card) => (
                  <div
                    key={card.className}
                    className="group relative bg-card rounded-3xl border border-border/50 p-7 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-primary to-accent" />
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-2xl font-bold leading-tight">{card.className}</h3>
                        <p className="text-primary font-semibold mt-1">{card.tag}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.boards.map((board) => (
                        <span key={board} className="px-3 py-1.5 rounded-full text-xs font-semibold border border-secondary/20 bg-secondary/10 text-secondary">
                          {board}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-3 py-1.5 rounded-full text-sm font-medium border border-primary/20 bg-primary/10 text-primary"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mb-6">
                      {card.points.map((point) => (
                        <div key={point} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full group-hover:border-primary/50" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">Batches for Class 11th & 12th</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Integrated and non-integrated science programs for boards and entrance exams
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {seniorClassCards.map((card) => (
                  <div
                    key={card.className}
                    className="group relative bg-card rounded-3xl border border-border/50 p-7 hover:border-primary/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-primary to-accent" />
                    <div className="flex items-center justify-between mb-5">
                      <div>
                        <h3 className="text-2xl font-bold leading-tight">{card.className}</h3>
                        <p className="text-primary font-semibold mt-1">{card.tag}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <card.icon className="w-5 h-5 text-primary" />
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {card.exams.map((exam) => (
                        <span key={exam} className="px-3 py-1.5 rounded-full text-xs font-semibold border border-secondary/20 bg-secondary/10 text-secondary">
                          {exam}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {card.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-3 py-1.5 rounded-full text-sm font-medium border border-primary/20 bg-primary/10 text-primary"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-2 mb-6">
                      {card.points.map((point) => (
                        <div key={point} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{point}</span>
                        </div>
                      ))}
                    </div>

                    <Button variant="outline" className="w-full group-hover:border-primary/50" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-20 bg-muted/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-balance">
              What's Included in
              <span className="block mt-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Every Course
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: BookOpen, title: "Study Material", desc: "Comprehensive notes and practice sheets" },
              { icon: CheckCircle2, title: "Regular Tests", desc: "Weekly assessments and mock exams" },
              { icon: Users, title: "Doubt Sessions", desc: "Dedicated time for clearing doubts" },
              { icon: Clock, title: "Flexible Timings", desc: "Multiple batch options available" },
              { icon: GraduationCap, title: "Expert Faculty", desc: "Experienced and qualified teachers" },
              { icon: ArrowRight, title: "Progress Tracking", desc: "Regular performance reports" },
            ].map((feature, index) => (
              <div
                key={index}
                className="group bg-card rounded-2xl border border-border/50 hover:border-primary/50 p-6 transition-all duration-500 hover:shadow-xl hover:-translate-y-2"
              >
                <feature.icon className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
