'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function PackagingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const boxY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
  const boxRotate = useTransform(scrollYProgress, [0, 1], [-5, 5])
  const itemsY = useTransform(scrollYProgress, [0, 1], ['25%', '-25%'])

  const includes = [
    { label: 'Anti Gores Ugorex', desc: '1 lembar premium glass' },
    { label: 'Alcohol Wipe', desc: 'Bersihkan layar' },
    { label: 'Dust Sticker', desc: 'Tarik debu sebelum pasang' },
    { label: 'Microfiber Cloth', desc: 'Lap halus anti goresan' },
    { label: 'Kartu Garansi', desc: 'Garansi pasang & ganti' },
  ]

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background py-32">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">In the Box</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Lengkap. <span className="text-primary">Tinggal pasang.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Box hero */}
          <motion.div style={{ y: boxY, rotate: boxRotate }} className="relative">
            <div className="aspect-[3/5] max-w-[400px] mx-auto rounded-3xl overflow-hidden border border-border shadow-2xl shadow-primary/20 relative">
              <Image
                src="/packaging-front.png"
                alt="Ugorex packaging — T-Rex shield design"
                fill
                sizes="(min-width: 1024px) 33vw, 80vw"
                className="object-cover"
              />
              <div className="absolute top-6 left-6 px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-lg">
                Premium Box
              </div>
            </div>

            {/* Decorative glow behind */}
            <div className="absolute inset-0 -z-10 blur-3xl bg-primary/20 rounded-full scale-75" aria-hidden />
          </motion.div>

          {/* Items list */}
          <motion.div style={{ y: itemsY }} className="space-y-4">
            {includes.map((item, i) => (
              <div
                key={item.label}
                className="flex items-start gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors"
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-bold">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
