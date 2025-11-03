"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/94771234567"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 md:bottom-8 right-6 md:right-8 w-14 h-14 md:w-16 md:h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition transform hover:scale-110 z-40 animate-float animate-pulse-ring"
      title="Chat on WhatsApp"
    >
      <MessageCircle size={28} />
    </a>
  )
}
