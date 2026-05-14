'use client'

import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export function TechLayersSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  const layers = [
    {
      name: 'Oleophobic Coating',
      desc: 'Anti minyak & sidik jari',
      image: '/layer-oleophobic.png',
      from: 'left' as const,
    },
    {
      name: 'Tempered Glass 9H',
      desc: 'Inti pelindung utama',
      image: '/layer-glass.png',
      from: 'right' as const,
    },
    {
      name: 'Shatterproof Layer',
      desc: 'Tidak pecah berkeping',
      image: '/layer-shatterproof.png',
      from: 'left' as const,
    },
    {
      name: 'Silicone Adhesive',
      desc: 'Lengket tanpa bubble',
      image: '/layer-silicone.png',
      from: 'right' as const,
    },
  ]

  return (
    <section ref={ref} className="relative h-[250vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* Back: blueprint grid */}
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 w-full">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">The Technology</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight leading-[1.1]">
              4 Lapisan. <span className="text-primary">1 Perlindungan.</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Scroll untuk lihat tiap lapisan menyatu jadi satu pelindung sempurna.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto h-[320px] flex flex-col justify-center gap-5 overflow-visible">
            {layers.map((l) => (
              <TechLayer
                key={l.name}
                name={l.name}
                desc={l.desc}
                image={l.image}
                from={l.from}
                progress={scrollYProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TechLayer({
  name,
  desc,
  image,
  from,
  progress,
}: {
  name: string
  desc: string
  image: string
  from: 'left' | 'right'
  progress: MotionValue<number>
}) {
  const startPercent = from === 'left' ? -120 : 120
  const x = useTransform(progress, [0, 1], [`${startPercent}%`, '0%'])
  const labelX = useTransform(progress, [0, 1], [`${startPercent * 0.4}%`, '0%'])
  const labelOpacity = useTransform(progress, [0, 0.3, 1], [0, 1, 1])

  const Strip = (
    <motion.div
      style={{ x }}
      className="flex-1 relative h-16 rounded-lg overflow-hidden border border-border shadow-[0_0_30px_rgba(0,0,0,0.4)]"
    >
      <Image
        src={image}
        alt={name}
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover"
      />
    </motion.div>
  )

  const Label = (
    <motion.div
      style={{ x: labelX, opacity: labelOpacity }}
      className={`w-56 shrink-0 ${from === 'right' ? 'text-right' : ''}`}
    >
      <p className="font-semibold text-sm">{name}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </motion.div>
  )

  return (
    <div className="flex items-center gap-6">
      {from === 'left' ? (
        <>
          {Strip}
          {Label}
        </>
      ) : (
        <>
          {Label}
          {Strip}
        </>
      )}
    </div>
  )
}
