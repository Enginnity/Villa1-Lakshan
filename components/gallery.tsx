"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [animatedImages, setAnimatedImages] = useState<Set<number>>(new Set())

  const images = [
    { src: "/luxury-villa-pool-area.jpg", alt: "Pool Area" },
    { src: "/luxury-villa-dining-room.jpg", alt: "Dining Area" },
    { src: "/luxury-villa-bedroom-interior.jpg", alt: "Bedroom" },
    { src: "/luxury-villa-beach-view.jpg", alt: "Beach View" },
    { src: "/luxury-villa-garden-landscape.jpg", alt: "Garden" },
    { src: "/luxury-villa-sunset-view.jpg", alt: "Sunset" },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const galleryItems = document.querySelectorAll(".gallery-item")
      galleryItems.forEach((el, index) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75 && !animatedImages.has(index)) {
          el.classList.add("animate-fadeIn")
          setAnimatedImages((prev) => new Set(prev).add(index))
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [animatedImages])

  return (
    <section id="gallery" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 scroll-fade">
          <p className="text-primary font-semibold mb-3 text-sm md:text-base uppercase tracking-wide">Visual Tour</p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">Discover Your Paradise</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              className="gallery-item scroll-fade relative group cursor-pointer overflow-hidden rounded-2xl opacity-0 h-56 md:h-72 border border-border/50 hover:border-primary/30 transition"
              onClick={() => setSelectedImage(index)}
            >
              <img
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <ChevronRight size={28} className="text-black" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 p-2 transition"
          >
            <X size={32} />
          </button>

          <button
            onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
            className="absolute left-4 text-white hover:text-gray-300 p-2 transition"
          >
            <ChevronLeft size={32} />
          </button>

          <img
            src={images[selectedImage].src || "/placeholder.svg"}
            alt={images[selectedImage].alt}
            className="max-w-4xl max-h-[80vh] object-contain rounded-lg"
          />

          <button
            onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
            className="absolute right-4 text-white hover:text-gray-300 p-2 transition"
          >
            <ChevronRight size={32} />
          </button>
        </div>
      )}
    </section>
  )
}
