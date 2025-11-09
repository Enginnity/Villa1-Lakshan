"use client"

export default function Attractions() {
  const attractions = [
    {
      name: "Galle Dutch Fort Ramparts",
      distance: "Paces from your door",
      description: "Sunset strolls along UNESCO-listed walls with sweeping ocean panoramas",
      image: "/galle-fort-sri-lanka.jpg",
    },
    {
      name: "Galle Lighthouse",
      distance: "0.5 km away",
      description: "Iconic colonial-era beacon overlooking palm-fringed coves",
      image: "/luxury-villa-sunset-view.jpg",
    },
    {
      name: "Jungle Beach, Rumassala",
      distance: "4 km away",
      description: "Hidden turquoise bay ideal for snorkelling and relaxed swims",
      image: "/unawatuna-beach-sri-lanka.jpg",
    },
    {
      name: "Koggala Lake Cruise",
      distance: "12 km away",
      description: "Sunrise boat safaris through cinnamon islands and bird sanctuaries",
      image: "/jungle-trek-sri-lanka.jpg",
    },
    {
      name: "Mirissa Whale Watching",
      distance: "35 km away",
      description: "Set sail at dawn to spot blue whales and playful dolphins offshore",
      image: "/mirissa-beach-sri-lanka.jpg",
    },
  ]

  return (
    <section className="py-16 md:py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16 scroll-fade">
          <p className="text-primary font-semibold mb-2 text-sm md:text-base">Nearby Attractions</p>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground">Discover Your Surroundings</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={index}
              className="scroll-fade bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 flex flex-col h-full"
            >
              <img
                src={attraction.image || "/placeholder.svg"}
                alt={attraction.name}
                className="w-full h-40 md:h-48 object-cover"
              />
              <div className="p-5 md:p-6 flex flex-col flex-grow">
                <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">{attraction.name}</h3>
                <p className="text-primary text-xs md:text-sm font-semibold mb-3">{attraction.distance}</p>
                <p className="text-muted-foreground text-sm md:text-base flex-grow">{attraction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
