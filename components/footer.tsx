"use client"

export default function Footer() {
  return (
    <footer className="bg-background/80 border-t border-border/60 py-6 md:py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-2 text-center text-sm md:text-base text-muted-foreground">
        <span className="font-medium text-foreground/80">© {new Date().getFullYear()} Sunset Villa Galle Fort</span>
        <span className="hidden md:inline text-foreground/40">•</span>
        <span>
          Developed by{" "}
          <a href="https://enginnity.com" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
            Enginnity
          </a>
        </span>
      </div>
    </footer>
  )
}

