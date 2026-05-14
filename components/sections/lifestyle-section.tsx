'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function LifestyleSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Slow zoom on photo + subtle vertical pan
  const photoScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.15])
  const photoY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  // Text parallax
  const textY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])
  const labelY = useTransform(scrollYProgress, [0, 1], ['30%', '-20%'])

  return (
    <section ref={ref} className="relative h-screen min-h-[640px] overflow-hidden bg-background">
      {/* Full-bleed photo with parallax zoom */}
      <motion.div
        style={{ scale: photoScale, y: photoY }}
        className="absolute inset-0"
      >
        <Image
          src="/lifestyle-urban.png"
          alt="HP dilindungi Ugorex di jalan kota"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Gradient overlays for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-12 flex items-center">
        <div className="max-w-xl">
          <motion.p
            style={{ y: labelY }}
            className="text-xs uppercase tracking-[0.3em] text-primary mb-6"
          >
            In the Wild
          </motion.p>

          <motion.h2
            style={{ y: textY }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight leading-[1.1]"
          >
            Dipakai di mana aja.
            <br />
            <span className="text-primary">Tahan apa aja.</span>
          </motion.h2>

          <motion.p
            style={{ y: textY }}
            className="mt-8 text-lg text-muted-foreground max-w-md leading-relaxed"
          >
            Dari pantai sampai gunung, dari pasar sampai meeting — Ugorex temenin layar kamu 24/7.
          </motion.p>

          <motion.div style={{ y: textY }} className="mt-10 space-y-4">
            {[
              { label: 'Anti UV', desc: 'aman di outdoor seharian' },
              { label: 'Anti Panas', desc: 'tahan di dashboard mobil' },
              { label: 'Anti Slip', desc: 'tetap nyaman digenggam' },
            ].map((item) => (
              <div key={item.label} className="flex items-baseline gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 translate-y-[-3px]" />
                <p className="text-base">
                  <span className="font-semibold text-foreground">{item.label}</span>
                  <span className="text-muted-foreground"> — {item.desc}</span>
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
