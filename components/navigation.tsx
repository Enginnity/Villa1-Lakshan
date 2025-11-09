"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import CurrencySelector from "./currency-selector"

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
        <div className="flex justify-between items-center h-16 gap-3">
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
            <CurrencySelector />
            <a
              href="tel:+94771234567"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition text-sm md:text-base font-medium"
            >
              Call Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <CurrencySelector buttonSize="sm" align="right" />
            <button
              className={`p-2 transition ${scrolled ? "text-foreground" : "text-white"}`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-white/95 rounded-3xl border border-border/50 shadow-2xl mx-2 mt-2 overflow-hidden backdrop-blur animate-[mobileMenuEnter_0.28s_ease-out]">
            <button
              onClick={() => scrollToSection("about")}
              className="block w-full text-left px-4 py-3 hover:bg-muted/80 text-sm text-foreground transition-colors"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("rooms")}
              className="block w-full text-left px-4 py-3 hover:bg-muted/80 text-sm text-foreground transition-colors"
            >
              Rooms
            </button>
            <button
              onClick={() => scrollToSection("gallery")}
              className="block w-full text-left px-4 py-3 hover:bg-muted/80 text-sm text-foreground transition-colors"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="block w-full text-left px-4 py-3 hover:bg-muted/80 text-sm text-foreground transition-colors"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
