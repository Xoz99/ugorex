'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const leftX = useTransform(scrollYProgress, [0, 1], ['-8%', '4%'])
  const rightX = useTransform(scrollYProgress, [0, 1], ['8%', '-4%'])

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background py-32">
      {/* Back layer: subtle red glow for "problem" mood */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-destructive/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-destructive/5 blur-3xl" />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Problem</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Sekali jatuh, <span className="text-primary">ribuan rupiah</span> melayang.
          </h2>
        </div>

        {/* Mid layer: before/after */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-center">
          <motion.div style={{ x: leftX }} className="relative">
            <div className="aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden border border-border relative">
              <Image
                src="/problem-before.png"
                alt="HP dengan layar retak tanpa Ugorex"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full bg-destructive/20 text-destructive text-xs font-semibold uppercase tracking-wider">
                  Tanpa Ugorex
                </span>
                <p className="mt-3 text-lg font-semibold">Layar baret, retak, mahal diperbaiki</p>
              </div>
            </div>
          </motion.div>

          <motion.div style={{ x: rightX }} className="relative">
            <div className="aspect-[4/5] bg-zinc-900 rounded-2xl overflow-hidden border border-primary/40 relative">
              <Image
                src="/problem-after.png"
                alt="HP mulus dengan Ugorex"
                fill
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                  Dengan Ugorex
                </span>
                <p className="mt-3 text-lg font-semibold">Mulus, aman, hemat jutaan</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-3 max-w-3xl mx-auto gap-4 text-center">
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-primary">Rp 1.5jt+</p>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Ganti layar rata-rata</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-primary">70%</p>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">HP pernah jatuh</p>
          </div>
          <div>
            <p className="text-3xl sm:text-4xl font-bold text-primary">3 detik</p>
            <p className="text-xs text-muted-foreground mt-2 uppercase tracking-wider">Untuk menyesal</p>
          </div>
        </div>
      </div>
    </section>
  )
}
