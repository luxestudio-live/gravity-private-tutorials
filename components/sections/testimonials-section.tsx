"use client"

import { useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Priya Sharma",
    course: "12th Science (JEE)",
    rank: "AIR 245 in JEE Mains",
    image: "/decent-academy-v1/student-success.jpg",
    content:
      "The faculty at Decent Academy transformed my approach to learning. Their personalized attention and innovative teaching methods helped me achieve my dream rank.",
    rating: 5,
  },
  {
    name: "Rahul Patil",
    course: "12th Science (CET)",
    rank: "State Rank 12",
    image: "/decent-academy-v1/student-cet-topper.jpg",
    content:
      "Best decision I made for my career. The structured curriculum and regular assessments kept me on track throughout my preparation journey.",
    rating: 5,
  },
  {
    name: "Ananya Desai",
    course: "10th Standard",
    rank: "98.4% in Boards",
    image: "/decent-academy-v1/student-10th-ranker.jpg",
    content:
      "The teachers make complex topics so easy to understand. I not only improved my grades but also developed a genuine love for learning.",
    rating: 5,
  },
]

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="py-20 lg:py-32 bg-muted/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
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

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`group relative bg-card rounded-3xl border transition-all duration-500 cursor-pointer ${
                  activeIndex === index
                    ? "border-primary shadow-2xl scale-105 lg:col-span-1"
                    : "border-border/50 hover:border-primary/30 hover:shadow-xl hover:-translate-y-1"
                }`}
              >
                {/* Quote Icon */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  <Quote className="w-8 h-8 text-white" />
                </div>

                <div className="p-8">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-foreground/90 leading-relaxed mb-6 italic">"{testimonial.content}"</p>

                  {/* Student Info */}
                  <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                      <div className="text-sm text-primary font-medium mt-1">{testimonial.rank}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
