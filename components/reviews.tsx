"use client"

import { Star } from "lucide-react"

export default function Reviews() {
  const reviews = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "An absolutely stunning villa with breathtaking ocean views. The staff was incredibly attentive and the amenities exceeded our expectations.",
      image: "/woman-profile.png",
    },
    {
      name: "Michael Chen",
      rating: 5,
      text: "Best vacation ever! The private pool, beach access, and sunset views made this an unforgettable experience. Highly recommended!",
      image: "/man-profile.png",
    },
    {
      name: "Emma Williams",
      rating: 5,
      text: "Luxury at its finest. Every detail was perfect, from the room decor to the personalized service. We will definitely return!",
      image: "/profile-photo-woman-2.jpg",
    },
    {
      name: "David Martinez",
      rating: 5,
      text: "The villa exceeded all our expectations. Beautiful location, impeccable service, and amazing food. Worth every penny!",
      image: "/profile-photo-man-2.jpg",
    },
  ]

  return (
    <section className="py-16 md:py-20 px-4 bg-card/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 scroll-fade">
          <p className="text-primary font-semibold mb-2 text-sm md:text-base">Guest Testimonials</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">What Our Guests Say</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="scroll-fade bg-card p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition flex flex-col h-full"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={review.image || "/placeholder.svg"}
                  alt={review.name}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover flex-shrink-0"
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-foreground text-sm md:text-base truncate">{review.name}</h3>
                  <div className="flex gap-1 mt-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-accent text-accent flex-shrink-0" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm md:text-base flex-grow">"{review.text}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
