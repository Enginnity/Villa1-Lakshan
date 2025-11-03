"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"

interface NavigationProps {
  scrolled: boolean
}

export default function Navigation({ scrolled }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1
              className={`text-xl md:text-2xl font-bold transition-colors ${scrolled ? "text-primary" : "text-white"}`}
            >
              Sunset Villa
            </h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("about")}
              className={`transition text-sm md:text-base font-medium ${
                scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("rooms")}
              className={`transition text-sm md:text-base font-medium ${
                scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
              }`}
            >
              Rooms
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className={`transition text-sm md:text-base font-medium ${
                scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
              }`}
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`transition text-sm md:text-base font-medium ${
                scrolled ? "text-foreground hover:text-primary" : "text-white hover:text-white/80"
              }`}
            >
              Contact
            </button>
          </div>

          <div className="hidden md:flex gap-4 items-center">
            <a
              href="tel:+94771234567"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition text-sm md:text-base font-medium"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 transition ${scrolled ? "text-foreground" : "text-white"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-white/95">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-3 hover:bg-muted rounded text-sm text-foreground"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("rooms")}
              className="block w-full text-left px-4 py-3 hover:bg-muted rounded text-sm text-foreground"
            >
              Rooms
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left px-4 py-3 hover:bg-muted rounded text-sm text-foreground"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-3 hover:bg-muted rounded text-sm text-foreground"
            >
              Contact
            </button>
            <a
              href="tel:+94771234567"
              className="block w-full text-center px-4 py-3 bg-primary text-primary-foreground rounded mt-2 text-sm font-medium"
            >
              Call Now
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
