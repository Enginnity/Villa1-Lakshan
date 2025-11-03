"use client"

export default function About() {
  return (
    <section id="about" className="py-16 md:py-24 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          {/* Image */}
          <div className="scroll-fade">
            <img
              src="/luxury-villa-exterior-with-tropical-garden.jpg"
              alt="Villa exterior"
              className="rounded-3xl shadow-2xl w-full"
            />
          </div>

          {/* Content */}
          <div className="scroll-fade space-y-6">
            <div>
              <p className="text-primary font-semibold mb-3 text-sm md:text-base uppercase tracking-wide">
                The Unmatched Beauty
              </p>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">Of the Archipelago</h2>
            </div>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Discover the unparalleled natural beauty of Sri Lanka's pristine coastline. Sunset Villa offers an
              exclusive retreat where luxury meets nature, providing an unforgettable experience by the ocean.
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6">
              <div className="bg-card p-5 md:p-7 rounded-2xl text-center border border-border/50 hover:border-primary/30 transition">
                <p className="text-3xl md:text-4xl font-bold text-primary">5★</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">Rating</p>
              </div>
              <div className="bg-card p-5 md:p-7 rounded-2xl text-center border border-border/50 hover:border-primary/30 transition">
                <p className="text-3xl md:text-4xl font-bold text-accent">100+</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">Reviews</p>
              </div>
              <div className="bg-card p-5 md:p-7 rounded-2xl text-center border border-border/50 hover:border-primary/30 transition">
                <p className="text-3xl md:text-4xl font-bold text-secondary">2024</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-2 font-medium">Established</p>
              </div>
            </div>

            <div className="space-y-4 pt-6">
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                <span className="text-foreground text-sm md:text-base leading-relaxed">
                  Private infinity pool overlooking the ocean
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                <span className="text-foreground text-sm md:text-base leading-relaxed">
                  Direct beach access with pristine sand
                </span>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                <span className="text-foreground text-sm md:text-base leading-relaxed">
                  Lush tropical garden with exotic plants
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
