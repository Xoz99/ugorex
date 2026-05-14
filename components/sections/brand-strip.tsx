export function BrandStrip() {
  const brands = ['iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme']
  return (
    <section className="relative bg-background border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10">
          <p className="text-xs text-muted-foreground uppercase tracking-widest shrink-0">
            Tersedia untuk
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-muted-foreground">
            {brands.map((b) => (
              <span
                key={b}
                className="text-base font-semibold hover:text-foreground transition-colors cursor-pointer"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
