'use client'

import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'

type VariantId = 'regular' | 'antispy'

const VARIANTS: Record<
  VariantId,
  {
    id: VariantId
    label: string
    sub: string
    title: string
    titleAccent: string
    description: string
    image: string
    hint: string
    extraSpec: { label: string; desc: string }
  }
> = {
  regular: {
    id: 'regular',
    label: 'Pro Glass',
    sub: 'Clear',
    title: 'Ugorex',
    titleAccent: 'Pro Glass',
    description: 'Tempered glass premium dengan teknologi yang dipakai brand HP flagship.',
    image: '/product-pro-glass.png',
    hint: 'Clear & crystal — touch sensitivity 1:1 sama layar asli.',
    extraSpec: { label: 'Full Cover', desc: '2.5D edge presisi' },
  },
  antispy: {
    id: 'antispy',
    label: 'Anti Spy',
    sub: 'Privacy',
    title: 'Ugorex',
    titleAccent: 'Anti Spy',
    description: 'Privacy tempered glass — layar cuma keliatan dari depan, orang sebelah gak bisa intip.',
    // TODO: ganti dengan foto Anti Spy variant kalo udah ready
    image: '/product-pro-glass.png',
    hint: 'Privacy 30° — chatting, banking, kerja tetap rahasia di tempat ramai.',
    extraSpec: { label: 'Privacy 30°', desc: 'Sudut pandang dibatasi 30°' },
  },
}

export function ProductRevealSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [variantId, setVariantId] = useState<VariantId>('regular')
  const variant = VARIANTS[variantId]

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const productY = useTransform(scrollYProgress, [0, 1], ['15%', '-15%'])
  const productRotate = useTransform(scrollYProgress, [0, 1], [-8, 8])
  const productScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.05, 0.95])
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  const specs = [
    { label: '9H Hardness', desc: 'Tahan goresan koin & pisau' },
    { label: '0.3mm Tipis', desc: 'Tidak terasa di layar' },
    { label: 'Oleophobic', desc: 'Anti minyak & sidik jari' },
    variant.extraSpec,
  ]

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-background py-32">
      {/* Back: radial glow */}
      <motion.div
        style={{ y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-primary/10 blur-3xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Product</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight leading-[1.1]">
            {variant.title}{' '}
            <AnimatePresence mode="wait">
              <motion.span
                key={variant.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-primary inline-block"
              >
                {variant.titleAccent}
              </motion.span>
            </AnimatePresence>
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={variant.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-4 text-muted-foreground max-w-xl mx-auto"
            >
              {variant.description}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-center">
          {/* Left specs */}
          <div className="space-y-8 lg:text-right">
            {specs.slice(0, 2).map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold">{s.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Center: rotating product */}
          <motion.div
            style={{ y: productY, rotate: productRotate, scale: productScale }}
            className="relative aspect-square w-full max-w-[450px] mx-auto"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0"
              >
                <Image
                  src={variant.image}
                  alt={`Ugorex ${variant.label} — tempered glass screen protector`}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className={`object-contain drop-shadow-[0_30px_60px_rgba(220,255,80,0.15)] ${
                    variant.id === 'antispy' ? 'brightness-75 contrast-110' : ''
                  }`}
                  priority
                />
                {variant.id === 'antispy' && (
                  <div className="absolute inset-0 bg-gradient-to-br from-zinc-900/30 via-transparent to-zinc-900/30 pointer-events-none rounded-3xl mix-blend-multiply" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right specs */}
          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {specs.slice(2).map((s) => (
                  <div key={s.label}>
                    <p className="text-2xl font-bold">{s.label}</p>
                    <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Variants */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Pilih Varian</p>
          <div className="inline-flex p-1 rounded-full bg-card border border-border relative">
            {(['regular', 'antispy'] as VariantId[]).map((id) => {
              const v = VARIANTS[id]
              const active = variantId === id
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setVariantId(id)}
                  className={`relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                    active ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {active && (
                    <motion.div
                      layoutId="variant-pill-bg"
                      className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/30 -z-10"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span>{v.label}</span>
                  <span className={`text-xs ${active ? 'opacity-70' : 'opacity-50'}`}>· {v.sub}</span>
                </button>
              )
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={variant.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-muted-foreground max-w-sm text-center mt-2"
            >
              {variant.hint}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
