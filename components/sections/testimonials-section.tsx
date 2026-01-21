"use client"

import { useState } from "react"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Veena Pednekar",
    initials: "VP",
    course: "Student",
    rank: "",
    image: "/placeholder-user.jpg",
    content:
      "My classes at Decent Academy was an incredibly positive experience, marked by highly knowledgeable teachers who made complex concepts easy to understand and provided ample support through doubt-clearing sessions.",
    rating: 5,
  },
  {
    name: "Tejas Pawar",
    initials: "TP",
    course: "Student",
    rank: "",
    image: "/placeholder-user.jpg",
    content:
      "Number 1 classes in Bhandup. All teachers teach very politely and great.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    course: "Student",
    rank: "",
    image: "/placeholder-user.jpg",
    content:
      "Very nice tution class techers and their teaching quality is very good they understand every student and solve their every issue",
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
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg border-2 border-primary/20">
                      {testimonial.initials}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.course}</div>
                      {testimonial.rank && (
                        <div className="text-sm text-primary font-medium mt-1">{testimonial.rank}</div>
                      )}
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
