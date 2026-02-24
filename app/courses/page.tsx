"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { GraduationCap, Beaker, BookOpen, CheckCircle2, Clock, Users, ArrowRight, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type GradeLevel = "8-10" | "11-12"

export default function CoursesPage() {
  const [activeGrade, setActiveGrade] = useState<GradeLevel>("8-10")

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

      {/* Grade Toggle */}
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

      {/* Grade Content */}
      {activeGrade === "8-10" ? (
        <>
          {/* CBSE Board Section */}
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Board Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">CBSE Board</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive CBSE curriculum with focus on conceptual understanding and board exam excellence
                  </p>
                </div>

                {/* Class Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Class 8 */}
                  <div className="bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/50 p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                        <span className="text-2xl font-bold text-primary">8</span>
                      </div>
                      <h3 className="text-2xl font-bold">Class 8</h3>
                      <p className="text-sm text-muted-foreground mt-1">Annual Course</p>
                    </div>
                    
                    <div className="bg-accent/10 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-accent text-center">Foundation & Problem Solving</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Small batch sizes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Complete syllabus coverage</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Regular assessments</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>

                  {/* Class 9 */}
                  <div className="bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/50 p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                        <span className="text-2xl font-bold text-primary">9</span>
                      </div>
                      <h3 className="text-2xl font-bold">Class 9</h3>
                      <p className="text-sm text-muted-foreground mt-1">Annual Course</p>
                    </div>
                    
                    <div className="bg-accent/10 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-accent text-center">Advanced Concepts</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Small batch sizes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Complete syllabus coverage</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Regular assessments</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>

                  {/* Class 10 */}
                  <div className="bg-card rounded-2xl border-2 border-primary/20 hover:border-primary/50 p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mb-3">
                        <span className="text-2xl font-bold text-primary">10</span>
                      </div>
                      <h3 className="text-2xl font-bold">Class 10</h3>
                      <p className="text-sm text-muted-foreground mt-1">Annual Course</p>
                    </div>
                    
                    <div className="bg-accent/10 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-accent text-center">Board Exam Excellence</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Small batch sizes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Complete syllabus coverage</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Regular assessments</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ICSE Board Section */}
          <section className="py-16 lg:py-20 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Board Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full mb-4">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">ICSE Board</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Comprehensive coverage of ICSE mathematics syllabus with emphasis on application, reasoning, and analytical thinking
                  </p>
                </div>

                {/* Class Cards */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Class 8 */}
                  <div className="bg-card rounded-2xl border-2 border-accent/20 hover:border-accent/50 p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
                        <span className="text-2xl font-bold text-accent">8</span>
                      </div>
                      <h3 className="text-2xl font-bold">Class 8</h3>
                      <p className="text-sm text-muted-foreground mt-1">Annual Course</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-primary text-center">Advanced Concepts</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Small batch sizes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Complete syllabus coverage</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Regular assessments</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>

                  {/* Class 9 */}
                  <div className="bg-card rounded-2xl border-2 border-accent/20 hover:border-accent/50 p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
                        <span className="text-2xl font-bold text-accent">9</span>
                      </div>
                      <h3 className="text-2xl font-bold">Class 9</h3>
                      <p className="text-sm text-muted-foreground mt-1">Annual Course</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-primary text-center">Critical Thinking Development</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Small batch sizes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Complete syllabus coverage</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Regular assessments</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>

                  {/* Class 10 */}
                  <div className="bg-card rounded-2xl border-2 border-accent/20 hover:border-accent/50 p-6 transition-all duration-300 hover:shadow-xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
                        <span className="text-2xl font-bold text-accent">10</span>
                      </div>
                      <h3 className="text-2xl font-bold">Class 10</h3>
                      <p className="text-sm text-muted-foreground mt-1">Annual Course</p>
                    </div>
                    
                    <div className="bg-primary/10 rounded-lg p-4 mb-4">
                      <p className="font-semibold text-primary text-center">ICSE Excellence Program</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Small batch sizes</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Complete syllabus coverage</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm">Regular assessments</span>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* HSC Board Section - 11th & 12th Science */}
          <section className="py-16 lg:py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Board Header */}
                <div className="text-center mb-12">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
                    <Beaker className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">HSC Science</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Advanced science education with specialized coaching for JEE, NEET, and CET preparation along with board excellence
                  </p>
                </div>

                {/* Class 11 & 12 Cards */}
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Class 11 Science */}
                  <div className="bg-card rounded-3xl border-2 border-primary/20 hover:border-primary/50 p-8 transition-all duration-300 hover:shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
                        <span className="text-3xl font-bold text-white">11</span>
                      </div>
                      <h3 className="text-3xl font-bold">Class 11 Science</h3>
                      <p className="text-md text-primary font-medium mt-2">Foundation Year</p>
                    </div>

                    {/* Streams */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                        <h4 className="font-bold text-lg mb-3">PCM Stream</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">Physics</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">Chemistry</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">Mathematics</span>
                        </div>
                        <p className="text-sm text-muted-foreground">JEE & CET Foundation</p>
                      </div>

                      <div className="bg-accent/5 rounded-xl p-4 border border-accent/20">
                        <h4 className="font-bold text-lg mb-3">PCB Stream</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">Physics</span>
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">Chemistry</span>
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">Biology</span>
                        </div>
                        <p className="text-sm text-muted-foreground">NEET & CET Foundation</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Board Syllabus Coverage</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Competitive Exam Preparation</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Weekly Tests & Assessments</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Practical Sessions</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pb-6 border-b border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Full Academic Year</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>30-35 Students</span>
                      </div>
                    </div>

                    <Button className="w-full mt-6" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>

                  {/* Class 12 Science */}
                  <div className="bg-card rounded-3xl border-2 border-primary/20 hover:border-primary/50 p-8 transition-all duration-300 hover:shadow-2xl">
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full mb-4">
                        <span className="text-3xl font-bold text-white">12</span>
                      </div>
                      <h3 className="text-3xl font-bold">Class 12 Science</h3>
                      <p className="text-md text-primary font-medium mt-2">Board & Competitive Exams</p>
                    </div>

                    {/* Streams */}
                    <div className="space-y-4 mb-6">
                      <div className="bg-primary/5 rounded-xl p-4 border border-primary/20">
                        <h4 className="font-bold text-lg mb-3">PCM Stream</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">Physics</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">Chemistry</span>
                          <span className="px-3 py-1 bg-primary/10 text-primary rounded-lg text-sm font-medium">Mathematics</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Intensive JEE & CET Training</p>
                      </div>

                      <div className="bg-accent/5 rounded-xl p-4 border border-accent/20">
                        <h4 className="font-bold text-lg mb-3">PCB Stream</h4>
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">Physics</span>
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">Chemistry</span>
                          <span className="px-3 py-1 bg-accent/10 text-accent rounded-lg text-sm font-medium">Biology</span>
                        </div>
                        <p className="text-sm text-muted-foreground">NEET & CET Preparation</p>
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Board Excellence Program</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">All India Test Series</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">CET Mock Tests</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">Crash Courses Available</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pb-6 border-b border-border/50">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>Full Year + Crash Courses</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>30-35 Students</span>
                      </div>
                    </div>

                    <Button className="w-full mt-6" asChild>
                      <Link href="/contact">Enroll Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
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
