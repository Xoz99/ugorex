'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, ShieldCheck, Wand2, Fingerprint, MousePointer2 } from 'lucide-react'
import { motion, useScroll, useTransform, useSpring, type MotionValue } from 'framer-motion'
import { useRef } from 'react'

function Particle({
  scrollY,
  scrollX,
  className,
  duration,
  delay,
  amplitude,
}: {
  scrollY: MotionValue<number>
  scrollX: MotionValue<number>
  className: string
  duration: number
  delay: number
  amplitude: number
}) {
  return (
    <motion.div
      style={{ y: scrollY, x: scrollX }}
      className={`absolute rounded-full pointer-events-none ${className}`}
      aria-hidden
    >
      <motion.div
        animate={{
          y: [0, -amplitude, 0],
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.3, 1],
        }}
        transition={{ duration, delay, repeat: Infinity, ease: 'easeInOut' }}
        className="w-full h-full rounded-full bg-inherit"
      />
    </motion.div>
  )
}

const FEATURES = [
  { icon: ShieldCheck, label: 'Tempered Glass' },
  { icon: Wand2, label: 'Easy Install' },
  { icon: Fingerprint, label: 'Anti-Fingerprint' },
  { icon: MousePointer2, label: 'Fast Touch' },
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.5,
  })

  // Big background "UGOREX" graffiti text layer
  const graffitiY = useTransform(smoothProgress, [0, 1], [0, -100])
  const graffitiOpacity = useTransform(smoothProgress, [0, 0.6], [0.08, 0.02])

  // Brushstroke
  const brushY = useTransform(smoothProgress, [0, 1], [0, -180])
  const brushRotate = useTransform(smoothProgress, [0, 1], [-12, -18])

  // Radar
  const radarRotate = useTransform(smoothProgress, [0, 1], [0, 30])
  const radarY = useTransform(smoothProgress, [0, 1], [0, -60])

  // Glow
  const glowY = useTransform(smoothProgress, [0, 1], [0, -60])
  const glowScale = useTransform(smoothProgress, [0, 1], [1, 1.3])
  const glowOpacity = useTransform(smoothProgress, [0, 0.5, 1], [0.6, 0.4, 0.2])

  // Text
  const textY = useTransform(smoothProgress, [0, 1], [0, 80])
  const textOpacity = useTransform(smoothProgress, [0, 0.4, 0.6], [1, 1, 0])
  const textBlur = useTransform(smoothProgress, [0, 0.6], ['blur(0px)', 'blur(6px)'])

  // Phone
  const phoneY = useTransform(smoothProgress, [0, 1], [0, -220])
  const phoneScale = useTransform(smoothProgress, [0, 1], [1, 0.85])
  const phoneRotateY = useTransform(smoothProgress, [0, 1], [0, -12])
  const phoneRotateZ = useTransform(smoothProgress, [0, 1], [0, 4])

  // Particles
  const particle1Y = useTransform(smoothProgress, [0, 1], [0, -350])
  const particle1X = useTransform(smoothProgress, [0, 1], [0, 40])
  const particle2Y = useTransform(smoothProgress, [0, 1], [0, -420])
  const particle2X = useTransform(smoothProgress, [0, 1], [0, -60])
  const particle3Y = useTransform(smoothProgress, [0, 1], [0, -300])
  const particle3X = useTransform(smoothProgress, [0, 1], [0, 80])

  // Feature pills
  const pillsY = useTransform(smoothProgress, [0, 1], [0, 120])
  const pillsOpacity = useTransform(smoothProgress, [0, 0.3, 0.55], [1, 1, 0])

  return (
    <div ref={containerRef} className="relative h-[180vh]">
      <div className="sticky top-0 h-screen bg-background overflow-hidden">
        {/* LAYER 0: Graffiti UGOREX background text (deepest) */}
        <motion.div
          style={{ y: graffitiY, opacity: graffitiOpacity }}
          className="absolute inset-0 flex flex-col justify-center items-start pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <div className="font-black text-primary text-[18vw] leading-[0.85] tracking-tighter -ml-[2vw] italic skew-y-[-4deg]">
            UGOREX
          </div>
          <div className="font-black text-primary text-[18vw] leading-[0.85] tracking-tighter ml-[8vw] italic skew-y-[-4deg] -mt-[3vw]">
            UGOREX
          </div>
          <div className="font-black text-primary text-[18vw] leading-[0.85] tracking-tighter -ml-[4vw] italic skew-y-[-4deg] -mt-[3vw]">
            UGOREX
          </div>
        </motion.div>

        {/* LAYER 0b: Radar pattern (corner) */}
        <motion.div
          style={{ rotate: radarRotate, y: radarY }}
          className="absolute -top-32 -right-32 w-[600px] h-[600px] opacity-10 pointer-events-none"
          aria-hidden
        >
          <svg viewBox="0 0 600 600" className="w-full h-full">
            <circle cx="300" cy="300" r="100" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <circle cx="300" cy="300" r="180" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <circle cx="300" cy="300" r="260" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
            <circle cx="300" cy="300" r="290" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <line x1="300" y1="0" x2="300" y2="600" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <line x1="0" y1="300" x2="600" y2="300" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <line x1="88" y1="88" x2="512" y2="512" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
            <line x1="512" y1="88" x2="88" y2="512" stroke="currentColor" strokeWidth="0.5" className="text-primary" />
          </svg>
        </motion.div>

        {/* LAYER 0c: Brushstroke (diagonal) */}
        <motion.div
          style={{ y: brushY, rotate: brushRotate }}
          className="absolute top-1/2 -translate-y-1/2 -left-20 w-[120%] h-32 pointer-events-none opacity-30"
          aria-hidden
        >
          <svg viewBox="0 0 1400 120" preserveAspectRatio="none" className="w-full h-full">
            <defs>
              <linearGradient id="brushGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="30%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="70%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M0,60 Q200,40 400,55 T800,50 T1200,60 T1400,55"
              stroke="url(#brushGrad)"
              strokeWidth="40"
              fill="none"
              className="text-primary"
              strokeLinecap="round"
            />
            <path
              d="M50,80 Q300,70 600,75 T1000,75 T1350,75"
              stroke="url(#brushGrad)"
              strokeWidth="14"
              fill="none"
              className="text-primary"
              strokeLinecap="round"
            />
          </svg>
        </motion.div>

        {/* LAYER 1: Glow blobs */}
        <motion.div
          style={{ y: glowY, scale: glowScale, opacity: glowOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div className="absolute top-[20%] right-[15%] w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
          <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        </motion.div>

        {/* LAYER 1b: Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* MAIN CONTENT */}
        <div
          className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center"
          style={{ perspective: '1200px' }}
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center w-full">
            {/* TEXT */}
            <motion.div
              style={{ y: textY, opacity: textOpacity, filter: textBlur }}
              className="relative z-10"
            >
              <h1 className="font-black tracking-tight leading-[0.85] uppercase">
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl italic -skew-y-3 text-foreground">
                  Unbreakable
                </span>
                <span className="block text-6xl sm:text-7xl lg:text-8xl xl:text-9xl italic -skew-y-3 text-primary mt-2 drop-shadow-[0_0_30px_rgba(220,255,80,0.3)]">
                  Defense.
                </span>
              </h1>

              <p className="mt-10 text-lg text-muted-foreground max-w-md leading-relaxed">
                Anti gores premium dengan teknologi 9H hardness. Dilindungi sang pelindung paling tangguh.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Button asChild size="lg" className="h-14 px-8 text-base font-bold uppercase tracking-wider">
                  <Link href="#products">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-bold uppercase tracking-wider">
                  <Link href="#features">Lihat Koleksi</Link>
                </Button>
              </div>

              <div className="mt-12 flex items-center gap-8 text-sm text-muted-foreground">
                <div>
                  <span className="text-foreground font-bold">500K+</span> Terjual
                </div>
                <div>
                  <span className="text-foreground font-bold">4.9</span> Rating
                </div>
                <div>
                  <span className="text-foreground font-bold">100+</span> Model HP
                </div>
              </div>
            </motion.div>

            {/* PHONE */}
            <motion.div
              style={{
                y: phoneY,
                scale: phoneScale,
                rotateY: phoneRotateY,
                rotateZ: phoneRotateZ,
                transformStyle: 'preserve-3d',
              }}
              className="relative flex items-center justify-center"
            >
              <div className="relative">
                <div
                  className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-primary/40 blur-3xl rounded-full pointer-events-none"
                  aria-hidden
                />

                <div className="w-56 sm:w-64 lg:w-72 aspect-[9/19] bg-zinc-900 rounded-[2.5rem] p-1.5 shadow-2xl border border-zinc-800 relative">
                  <div className="w-full h-full bg-black rounded-[2rem] flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent" />

                    <div className="text-center z-10">
                      <p className="text-primary font-display text-3xl tracking-tight">UGOREX</p>
                      <p className="text-zinc-500 text-xs mt-2 uppercase tracking-[0.3em]">Protected</p>
                    </div>

                    <div className="absolute inset-0 opacity-20">
                      <div className="absolute top-12 right-6 w-0.5 h-20 bg-gradient-to-b from-zinc-400 to-transparent rotate-[30deg]" />
                      <div className="absolute top-8 right-12 w-0.5 h-28 bg-gradient-to-b from-zinc-400 to-transparent rotate-[30deg]" />
                      <div className="absolute top-16 right-3 w-0.5 h-16 bg-gradient-to-b from-zinc-400 to-transparent rotate-[30deg]" />
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        </div>

        {/* LAYER 5: Feature pills (bottom, from packaging) */}
        <motion.div
          style={{ y: pillsY, opacity: pillsOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6"
        >
          <div className="flex flex-wrap justify-center gap-3 md:gap-6">
            {FEATURES.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-card/60 backdrop-blur-md border border-primary/20"
              >
                <f.icon className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">{f.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* LAYER 6: Foreground particles */}
        <Particle scrollY={particle1Y} scrollX={particle1X} className="top-[30%] left-[20%] w-2 h-2 bg-primary/60 blur-[1px]" duration={4} delay={0} amplitude={20} />
        <Particle scrollY={particle2Y} scrollX={particle2X} className="top-[55%] right-[25%] w-3 h-3 bg-primary/40 blur-[2px]" duration={5.5} delay={0.8} amplitude={28} />
        <Particle scrollY={particle3Y} scrollX={particle3X} className="top-[40%] left-[55%] w-1.5 h-1.5 bg-primary/80" duration={3.5} delay={1.2} amplitude={16} />
        <Particle scrollY={particle1Y} scrollX={particle2X} className="bottom-[20%] left-[40%] w-2 h-2 bg-primary/50 blur-[1px]" duration={4.8} delay={0.4} amplitude={22} />
        <Particle scrollY={particle3Y} scrollX={particle1X} className="top-[15%] right-[40%] w-1 h-1 bg-primary/70" duration={3} delay={2} amplitude={14} />
        <Particle scrollY={particle2Y} scrollX={particle3X} className="top-[70%] left-[15%] w-1.5 h-1.5 bg-primary/60 blur-[1px]" duration={4.2} delay={1.6} amplitude={18} />
        <Particle scrollY={particle1Y} scrollX={particle3X} className="top-[25%] right-[18%] w-1 h-1 bg-primary/80" duration={3.8} delay={0.6} amplitude={15} />

      </div>
    </div>
  )
}
