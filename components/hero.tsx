"use client"

import { useEffect, useRef } from "react"

export default function Hero() {
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY
        backgroundRef.current.style.transform = `translateY(${scrollY * 0.5}px)`
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative h-screen w-full overflow-hidden pt-16">
      {/* Background Image with Parallax */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-0"
        style={{
          backgroundImage: "url(/hero-villa.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="animate-fadeInUp space-y-4 md:space-y-6 max-w-4xl">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white text-balance leading-tight">
            Sunset Villa Galle Fort
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-white/90 text-balance">
            Boutique luxury inside Sri Lanka&apos;s UNESCO heritage city
          </p>
          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
            Wake to the sound of the Indian Ocean, wander centuries-old ramparts, and unwind with curated comforts crafted
            for discerning global travellers.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-6 md:pt-8">
            <a
              href="tel:+94771234567"
              className="px-8 md:px-10 py-3 md:py-4 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition transform hover:scale-105 text-sm md:text-base"
            >
              Call for Inquiry
            </a>
            <a
              href="https://wa.me/94771234567"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 md:px-10 py-3 md:py-4 bg-white/20 text-white rounded-full font-semibold hover:bg-white/30 transition border border-white/50 text-sm md:text-base"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-white rounded-full animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
