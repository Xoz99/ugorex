'use client'

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { Droplet, Wind, Square, ArrowDownToLine, SquareDashed, Hand, Timer, ShieldCheck } from 'lucide-react'

const STEPS = [
  {
    n: '01',
    icon: Droplet,
    title: 'Bersihkan Layar',
    desc: 'Lap pake wet wipe dulu buat angkat noda, lanjut dry wipe sampe kering total. Pastikan gak ada minyak atau sidik jari yang ketinggalan.',
    duration: '45 dtk',
  },
  {
    n: '02',
    icon: Wind,
    title: 'Angkat Debu',
    desc: 'Tempel dust absorber sticker ke layar — narik partikel halus yang gak keliatan tapi bisa bikin bubble pas pasang.',
    duration: '15 dtk',
  },
  {
    n: '03',
    icon: Square,
    title: 'Pasang Easy Fit Frame',
    desc: 'Pasang frame instan ke atas HP — posisinya udah pas otomatis, no manual align. Klik bunyi "tek" tanda nempel sempurna.',
    duration: '20 dtk',
  },
  {
    n: '04',
    icon: ArrowDownToLine,
    title: 'Tarik & Lepas',
    desc: 'Tarik "pull out" tab di frame buat lepasin pelindung ke layar. Diamkan 20 detik biar adhesive nempel sempurna.',
    duration: '30 dtk',
  },
  {
    n: '05',
    icon: SquareDashed,
    title: 'Lepas Frame',
    desc: 'Angkat frame plastik dari HP — pelindung udah terpasang presisi. Edge-to-edge gak miring sedikitpun.',
    duration: '5 dtk',
  },
  {
    n: '06',
    icon: Hand,
    title: 'Finishing',
    desc: 'Ada gelembung kecil? Gosok perlahan dari tengah ke pinggir pake kartu. Bubble keluar otomatis, layar mulus.',
    duration: '15 dtk',
  },
]

const TOTAL = STEPS.length

export function SetupSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  })

  // Active step derived from scroll progress (divided into TOTAL equal segments)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(TOTAL - 1, Math.max(0, Math.floor(latest * TOTAL)))
    if (idx !== activeStep) setActiveStep(idx)
  })

  // Tool image animations — subtle rotation that progresses through steps
  const toolRotate = useTransform(scrollYProgress, [0, 1], [-6, 6])
  const toolY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.15, 0.95])
  const progressX = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  const step = STEPS[activeStep]
  const StepIcon = step.icon

  return (
    <section ref={ref} className="relative h-[450vh] bg-background">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full bg-primary/5 blur-3xl pointer-events-none" />

        {/* HEADER — heading + progress */}
        <div className="relative pt-20 pb-6 px-6 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Easy Fit Setup</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display tracking-tight leading-[1.1]">
                6 langkah. <span className="text-primary">Pasang sendiri.</span>
              </h2>
            </div>

            {/* Progress bar */}
            <div className="max-w-xl mx-auto">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display text-sm text-primary">{step.n}</span>
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  Step {activeStep + 1} of {TOTAL}
                </span>
                <span className="font-display text-sm text-muted-foreground">/{String(TOTAL).padStart(2, '0')}</span>
              </div>
              <div className="relative h-1 bg-border rounded-full overflow-hidden">
                <motion.div
                  style={{ width: progressX }}
                  className="absolute inset-y-0 left-0 bg-primary rounded-full"
                />
              </div>
              {/* Step ticks */}
              <div className="flex justify-between mt-2">
                {STEPS.map((s, i) => (
                  <button
                    key={s.n}
                    type="button"
                    aria-label={`Step ${i + 1}`}
                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                      i <= activeStep ? 'bg-primary' : 'bg-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BODY — split: image + active step content */}
        <div className="relative flex-1 px-6 lg:px-12 overflow-hidden">
          <div className="max-w-7xl mx-auto h-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* LEFT — Image */}
            <div className="relative flex items-end justify-center order-2 lg:order-1 lg:pt-24 pb-4">
              <motion.div
                style={{ y: toolY, rotate: toolRotate, scale: glowScale }}
                className="relative aspect-square w-full max-w-[380px] sm:max-w-[440px]"
              >
                <Image
                  src="/easyfit-tool.png"
                  alt="Ugorex Easy Fit applicator frame"
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-contain [filter:drop-shadow(0_0_60px_rgba(220,255,80,0.3))_drop-shadow(0_20px_40px_rgba(220,255,80,0.15))]"
                  priority
                />
              </motion.div>
            </div>

            {/* RIGHT — Active step (animated) */}
            <div className="relative order-1 lg:order-2 min-h-[280px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  {/* Mega number background */}
                  <div className="relative">
                    <span
                      className="absolute -top-12 -left-4 font-display text-[180px] sm:text-[220px] leading-none text-primary/10 select-none pointer-events-none"
                      aria-hidden
                    >
                      {step.n}
                    </span>

                    <div className="relative">
                      <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 mb-4">
                        <StepIcon className="w-4 h-4 text-primary" />
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          Step {step.n}
                        </span>
                      </div>

                      <h3 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight leading-[1.05] mb-4">
                        {step.title}
                      </h3>

                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md mb-6">
                        {step.desc}
                      </p>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-semibold">
                        <Timer className="w-3.5 h-3.5 text-primary" />
                        <span className="text-foreground">{step.duration}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* FOOTER — total time + garansi (always visible) */}
        <div className="relative pb-8 px-6 lg:px-12">
          <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-primary" />
              <span>
                Total: <span className="font-display text-primary">~2 MENIT</span>
              </span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-border" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span>
                <span className="font-semibold">Garansi pasang</span>
                <span className="text-muted-foreground"> · gagal? dipasangin ulang gratis</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
