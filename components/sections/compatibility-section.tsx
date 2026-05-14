'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Search } from 'lucide-react'

export function CompatibilitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const row1X = useTransform(scrollYProgress, [0, 1], ['-15%', '5%'])
  const row2X = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const row3X = useTransform(scrollYProgress, [0, 1], ['-5%', '15%'])

  const brands = [
    ['iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16', 'iPhone 15 Pro', 'iPhone 15', 'iPhone 14'],
    ['Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', 'Galaxy Z Fold 6', 'Galaxy A55', 'Galaxy M55'],
    ['Xiaomi 14 Pro', 'Redmi Note 13', 'POCO X6', 'OPPO Reno 12', 'Vivo V30', 'Realme 12 Pro'],
  ]

  const rowMotions = [row1X, row2X, row3X]

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background py-32">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Compatibility</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight max-w-3xl mx-auto leading-[1.1]">
            200+ tipe HP. <span className="text-primary">Cek punyamu.</span>
          </h2>
        </div>

        {/* Search bar */}
        <div className="max-w-xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Cari tipe HP kamu..."
              className="w-full h-14 pl-12 pr-4 rounded-full bg-card border border-border focus:border-primary outline-none transition-colors"
            />
          </div>
        </div>

        {/* Parallax brand rows */}
        <div className="space-y-4 overflow-hidden">
          {brands.map((row, i) => (
            <motion.div
              key={i}
              style={{ x: rowMotions[i] }}
              className="flex gap-4 whitespace-nowrap"
            >
              {row.concat(row).map((b, j) => (
                <div
                  key={`${b}-${j}`}
                  className="shrink-0 px-6 py-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
                >
                  <p className="font-semibold text-sm">{b}</p>
                  <p className="text-xs text-muted-foreground mt-1">Tersedia</p>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <p className="text-center mt-12 text-sm text-muted-foreground">
          Belum nemu tipe HP kamu? <span className="text-primary cursor-pointer hover:underline">Request di sini</span>
        </p>
      </div>
    </section>
  )
}
