"use client"

export default function Rooms() {
  const rooms = [
    {
      name: "Ocean View Suite",
      size: "45 m²",
      beds: "King Bed",
      features: ["AC", "Private Balcony", "Ocean View", "Ensuite Bathroom"],
      price: "$180/night",
      image: "/room-ocean-view.jpg",
    },
    {
      name: "Tropical Deluxe",
      size: "55 m²",
      beds: "King + Twin Beds",
      features: ["AC", "Garden View", "Jacuzzi", "Walk-in Closet"],
      price: "$220/night",
      image: "/room-tropical-deluxe.jpg",
    },
    {
      name: "Beach Villa",
      size: "75 m²",
      beds: "2 King Beds",
      features: ["AC", "Private Pool", "Beach Access", "Full Kitchen"],
      price: "$350/night",
      image: "/room-beach-villa.jpg",
    },
    {
      name: "Sunset Penthouse",
      size: "100 m²",
      beds: "2 King + Living Area",
      features: ["AC", "Infinity Pool", "Sunset View", "Premium Amenities"],
      price: "$500/night",
      image: "/room-sunset-penthouse.jpg",
    },
  ]

  return (
    <section id="rooms" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 scroll-fade">
          <p className="text-primary font-semibold mb-3 text-sm md:text-base uppercase tracking-wide">
            Luxury Accommodations
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">Our Rooms & Suites</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Each room is thoughtfully designed with premium amenities and stunning views
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {rooms.map((room, index) => (
            <div
              key={index}
              className="scroll-fade bg-card rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105 flex flex-col h-full border border-border/50"
            >
              <img
                src={room.image || "/placeholder.svg"}
                alt={room.name}
                className="w-full h-56 md:h-72 object-cover"
              />
              <div className="p-6 md:p-8 flex flex-col flex-grow">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{room.name}</h3>
                <p className="text-primary font-bold text-lg mb-6">{room.price}</p>

                <div className="space-y-3 mb-6 flex-grow">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Size:</span> {room.size}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">Beds:</span> {room.beds}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {room.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <a
                  href="https://wa.me/94771234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 md:py-4 px-6 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition text-center font-semibold text-sm md:text-base"
                >
                  Book Room
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-20 p-8 md:p-12 bg-primary/5 rounded-3xl scroll-fade border border-primary/10">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-8 md:mb-10">Amenities Included</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground text-sm md:text-base font-medium">High-speed Wi-Fi</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground text-sm md:text-base font-medium">Daily Breakfast</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground text-sm md:text-base font-medium">Free Parking</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground text-sm md:text-base font-medium">24/7 Room Service</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground text-sm md:text-base font-medium">Beach Towels</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-primary rounded-full flex-shrink-0" />
              <span className="text-foreground text-sm md:text-base font-medium">Concierge Service</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
