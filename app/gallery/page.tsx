"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Camera, X } from "lucide-react"
import { db } from "@/lib/firebase"
import { collection, getDocs } from "firebase/firestore"
import { withBasePath } from "@/lib/utils"

type GalleryImage = {
  id: string
  src: string
  title: string
  description: string
  isDefault?: boolean
}

const CONTENT_PLACEHOLDER = withBasePath("/placeholder.svg?height=400&width=400")

const withPlaceholderImages = <T extends { src: string }>(items: T[]): T[] =>
  items.map((item) => ({ ...item, src: CONTENT_PLACEHOLDER }))

const defaultGalleryImages: GalleryImage[] = [
  {
    id: "default_1",
    src: "/da2.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_2",
    src: "/da3.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_3",
    src: "/da4.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_4",
    src: "/da7.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_5",
    src: "/da8.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_6",
    src: "/da9.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_7",
    src: "/daa1.png",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_8",
    src: "/daa2.png",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_9",
    src: "/daa3.png",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_10",
    src: "/daa4.png",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_11",
    src: "/daa5.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_12",
    src: "/daa6.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_13",
    src: "/da1.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_14",
    src: "/da5.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
  {
    id: "default_15",
    src: "/da6.jpeg",
    title: "Gravity Private Tutorials",
    description: "Moments from Gravity Private Tutorials",
    isDefault: true,
  },
]

export default function GalleryPage() {
  const [allImages, setAllImages] = useState<GalleryImage[]>(withPlaceholderImages(defaultGalleryImages))
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchGalleryImages()
  }, [])

  const fetchGalleryImages = async () => {
    try {
      setLoading(true)
      const snap = await getDocs(collection(db, 'gallery'))
      const newImages = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as GalleryImage[]
      console.log('Fetched new gallery images from Firestore:', newImages)
      // New images first, then default images
      setAllImages(withPlaceholderImages([...newImages, ...defaultGalleryImages]))
    } catch (error) {
      console.error('Error fetching gallery images:', error)
      setAllImages(withPlaceholderImages(defaultGalleryImages))
    } finally {
      setLoading(false)
    }
  }

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
              A glimpse into the vibrant life at Gravity Private Tutorials
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allImages.map((image, index) => (
              <div
                key={image.id}
                onClick={() => setSelectedImage(image)}
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <img
                  src={image.src || withBasePath("/placeholder.svg?height=400&width=400")}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                  decoding="async"
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
          )}
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
              src={selectedImage.src || withBasePath("/placeholder.svg?height=800&width=1200")}
              alt={selectedImage.title}
              className="w-full h-auto rounded-2xl shadow-2xl"
              decoding="async"
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
