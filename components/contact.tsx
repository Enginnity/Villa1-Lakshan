"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Mail, Phone, MapPin } from "lucide-react"

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [successVisible, setSuccessVisible] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus("idle")
    setErrorMessage("")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data?.error || "Something went wrong")
      }

      setStatus("success")
      setFormData({ name: "", email: "", phone: "", message: "" })
      setSuccessVisible(true)
    } catch (error) {
      console.error(error)
      setStatus("error")
      setErrorMessage(error instanceof Error ? error.message : "Unable to send message.")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (status === "success" && successVisible) {
      const timeoutId = window.setTimeout(() => {
        setSuccessVisible(false)
        setStatus("idle")
      }, 5000)

      return () => window.clearTimeout(timeoutId)
    }
  }, [status, successVisible])

  return (
    <section id="contact" className="py-16 md:py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 scroll-fade">
          <p className="text-primary font-semibold mb-2 text-sm md:text-base">Plan Your Galle Escape</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Contact & Booking</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Info */}
          <div className="scroll-fade space-y-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Phone className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm md:text-base">Phone</p>
                    <a href="tel:+94771234567" className="text-primary hover:underline text-sm md:text-base break-all">
                      +94 77 123 4567
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Mail className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div className="min-w-0">
                    <p className="font-semibold text-foreground text-sm md:text-base">Email</p>
                    <a
                      href="mailto:info@sunsetvilla.lk"
                      className="text-primary hover:underline text-sm md:text-base break-all"
                    >
                      info@sunsetvilla.lk
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <MapPin className="text-primary flex-shrink-0 mt-1" size={24} />
                  <div>
                    <p className="font-semibold text-foreground text-sm md:text-base">Location</p>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Sunset Villa, Rampart Street
                      <br />
                      Galle Fort 80000, Sri Lanka
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden h-64 md:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.07917296876!2d80.2153345!3d6.0307026!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae173f7aff0b2dd%3A0x67f3c0a8f9ad7889!2sGalle%20Fort!5e0!3m2!1sen!2slk!4v1731146400000!5m2!1sen!2slk"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>

          {/* Booking Form */}
          <div className="scroll-fade bg-card p-6 md:p-8 rounded-2xl shadow-lg">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-6">Book Your Stay</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Phone / WhatsApp</label>
                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-sm font-semibold text-muted-foreground">
                    +94
                  </div>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-16 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm md:text-base"
                    placeholder="77 123 4567"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none text-sm md:text-base"
                  rows={4}
                  placeholder="Any special requests?"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 md:py-4 px-4 bg-primary text-primary-foreground rounded-lg font-semibold transition text-sm md:text-base disabled:cursor-not-allowed disabled:opacity-80"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-3 w-3 animate-ping rounded-full bg-white" />
                    Sending...
                  </span>
                ) : (
                  "Send Inquiry"
                )}
              </button>

              {status === "success" && successVisible && (
                <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 shadow-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Thank you for your inquiry! Our reservations team will reach out shortly.</span>
                </div>
              )}
              {status === "error" && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900 shadow-sm">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
