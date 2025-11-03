"use client"

export default function Attractions() {
  const attractions = [
    {
      name: "Mirissa Beach",
      distance: "5 km away",
      description: "Pristine sandy beach perfect for swimming and whale watching",
      image: "/mirissa-beach-sri-lanka.jpg",
    },
    {
      name: "Galle Fort",
      distance: "15 km away",
      description: "Historic UNESCO World Heritage site with stunning architecture",
      image: "/galle-fort-sri-lanka.jpg",
    },
    {
      name: "Unawatuna Beach",
      distance: "12 km away",
      description: "Scenic beach with coral reefs ideal for snorkeling",
      image: "/unawatuna-beach-sri-lanka.jpg",
    },
    {
      name: "Jungle Trekking",
      distance: "20 km away",
      description: "Explore lush tropical forests and spot exotic wildlife",
      image: "/jungle-trek-sri-lanka.jpg",
    },
    {
      name: "Local Markets",
      distance: "3 km away",
      description: "Vibrant markets with fresh produce and local crafts",
      image: "/sri-lanka-local-market.jpg",
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
