'use client'

import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, Truck, BadgeCheck } from 'lucide-react'

export function FinalCTASection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['15%', '-5%'])

  const badges = [
    { icon: ShieldCheck, label: 'Garansi Pasang' },
    { icon: Truck, label: 'Free Ongkir' },
    { icon: BadgeCheck, label: 'COD Tersedia' },
  ]

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background py-32 flex items-center">
      {/* Back: subtle radial */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] max-w-[1000px] max-h-[1000px] rounded-full bg-primary/10 blur-3xl" />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="relative max-w-4xl mx-auto px-6 lg:px-12 text-center"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-6">Ready When You Are</p>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display tracking-tight leading-[1.1]">
          Lindungi layar.
          <br />
          <span className="text-primary">Mulai sekarang.</span>
        </h2>

        <p className="mt-8 text-lg text-muted-foreground max-w-xl mx-auto">
          Mulai dari <span className="text-foreground font-semibold">Rp 49.000</span>. Garansi pasang. Pengiriman hari ini.
        </p>

        <div className="mt-12 flex flex-wrap gap-4 justify-center">
          <Button asChild size="lg" className="h-14 px-10 text-base font-semibold">
            <Link href="#products">
              Belanja di Ugorex
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="h-14 px-10 text-base font-semibold">
            <Link href="#contact">Tanya Dulu</Link>
          </Button>
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {badges.map((b) => (
            <div key={b.label} className="flex items-center gap-2 text-sm text-muted-foreground">
              <b.icon className="w-5 h-5 text-primary" />
              <span>{b.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
