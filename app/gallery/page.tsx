"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Camera, X } from "lucide-react"

type GalleryCategory = "all" | "classroom" | "events" | "achievements" | "cultural" | "sports"

const galleryImages = [
  {
    id: 1,
    src: "/decent-academy-v1/gallery-classroom-1.jpg",
    category: "classroom",
    title: "Interactive Learning Session",
    description: "Students engaged in collaborative problem-solving",
  },
  {
    id: 2,
    src: "/decent-academy-v1/gallery-achievement-1.jpg",
    category: "achievements",
    title: "JEE Toppers Celebration",
    description: "Congratulating our AIR achievers",
  },
  {
    id: 3,
    src: "/decent-academy-v1/gallery-cultural-1.jpg",
    category: "cultural",
    title: "Annual Day Performance",
    description: "Students showcasing their talents",
  },
  {
    id: 4,
    src: "/decent-academy-v1/gallery-sports-1.jpg",
    category: "sports",
    title: "Sports Day Events",
    description: "Inter-batch sports competition",
  },
  {
    id: 5,
    src: "/decent-academy-v1/gallery-event-1.jpg",
    category: "events",
    title: "Science Exhibition",
    description: "Student projects on display",
  },
  {
    id: 6,
    src: "/decent-academy-v1/gallery-classroom-2.jpg",
    category: "classroom",
    title: "Laboratory Experiments",
    description: "Hands-on practical sessions",
  },
  {
    id: 7,
    src: "/decent-academy-v1/gallery-achievement-2.jpg",
    category: "achievements",
    title: "Board Exam Toppers",
    description: "10th standard distinction holders",
  },
  {
    id: 8,
    src: "/decent-academy-v1/gallery-cultural-2.jpg",
    category: "cultural",
    title: "Traditional Day Celebration",
    description: "Celebrating our cultural heritage",
  },
  {
    id: 9,
    src: "/decent-academy-v1/gallery-event-2.jpg",
    category: "events",
    title: "Parent-Teacher Meet",
    description: "Collaborative discussion on student progress",
  },
  {
    id: 10,
    src: "/decent-academy-v1/gallery-classroom-3.jpg",
    category: "classroom",
    title: "Smart Classroom Technology",
    description: "Digital learning environment",
  },
  {
    id: 11,
    src: "/decent-academy-v1/gallery-achievement-3.jpg",
    category: "achievements",
    title: "CET State Rankers",
    description: "Celebrating top CET performers",
  },
  {
    id: 12,
    src: "/decent-academy-v1/gallery-sports-2.jpg",
    category: "sports",
    title: "Cricket Tournament",
    description: "Annual inter-academy match",
  },
]

const categories = [
  { id: "all", label: "All Photos" },
  { id: "classroom", label: "Classroom" },
  { id: "events", label: "Events" },
  { id: "achievements", label: "Achievements" },
  { id: "cultural", label: "Cultural" },
  { id: "sports", label: "Sports" },
]

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all")
  const [selectedImage, setSelectedImage] = useState<(typeof galleryImages)[0] | null>(null)

  const filteredImages =
    activeCategory === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeCategory)

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
              <Camera className="w-4 h-4" />
              <span>Capturing Memorable Moments</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-tight">
              Photo
              <span className="block mt-2 text-primary">Gallery</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed">
              A glimpse into the vibrant life at Decent Academy
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-background/95 backdrop-blur-lg border-y border-border/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-3 max-w-4xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id as GalleryCategory)}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-xl scale-105"
                    : "bg-card border border-border/50 hover:border-primary/50 hover:shadow-lg hover:-translate-y-1"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={image.src || "/decent-academy-v1/placeholder.svg?height=400&width=400"}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-background">
                    <h3 className="text-lg font-bold mb-1">{image.title}</h3>
                    <p className="text-sm text-background/80">{image.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-foreground/95 z-50 flex items-center justify-center p-4 animate-scale-in"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-12 h-12 bg-background/10 hover:bg-background/20 rounded-full flex items-center justify-center transition-colors duration-300 group"
          >
            <X className="w-6 h-6 text-background group-hover:rotate-90 transition-transform duration-300" />
          </button>
          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedImage.src || "/decent-academy-v1/placeholder.svg?height=800&width=1200"}
              alt={selectedImage.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-6 text-center text-background">
              <h3 className="text-3xl font-bold mb-2">{selectedImage.title}</h3>
              <p className="text-xl text-background/80">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  )
}
