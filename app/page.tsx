"use client"

import { useEffect, useState } from "react"
import Navigation from "@/components/navigation"
import Hero from "@/components/hero"
import About from "@/components/about"
import Rooms from "@/components/rooms"
import Gallery from "@/components/gallery"
import Reviews from "@/components/reviews"
import Attractions from "@/components/attractions"
import Contact from "@/components/contact"
import WhatsAppButton from "@/components/whatsapp-button"
import { CurrencyProvider } from "@/components/currency-provider"
import Footer from "@/components/footer"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Trigger scroll animations
      const elements = document.querySelectorAll(".scroll-fade")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        if (rect.top < window.innerHeight * 0.75) {
          el.classList.add("visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <CurrencyProvider>
      <main className="min-h-screen bg-background">
        <Navigation scrolled={scrolled} />
        <Hero />
        <About />
        <Rooms />
        <Gallery />
        <Reviews />
        <Attractions />
        <Contact />
        <Footer />
        <WhatsAppButton />
      </main>
    </CurrencyProvider>
  )
}
