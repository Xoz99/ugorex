'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Shield, Zap, Droplet, Play } from 'lucide-react'

// 👇 Ganti ID YouTube-nya disini kalo video Ugorex udah ready.
// Cara: ambil ID dari URL YouTube. Misal https://youtu.be/abc123  → ID = "abc123"
const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ'
const YOUTUBE_VIDEO_TITLE = 'Ugorex Durability Test'

export function DurabilityTestSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const statsY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  const tests = [
    { icon: Shield, value: '1000+', label: 'Tes Goresan', sub: 'Pisau, koin, kunci — semua dicoba' },
    { icon: Zap, value: '50+', label: 'Drop Test', sub: 'Dijatuhkan dari 1.5m berulang kali' },
    { icon: Droplet, value: '99%', label: 'Water Beading', sub: 'Air & minyak gak nempel di layar' },
  ]

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-secondary/30 py-32">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Durability Test</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight max-w-3xl mx-auto leading-[1.1]">
            Ditest. <span className="text-primary">Bukan diomongin doang.</span>
          </h2>
        </div>

        {/* YouTube video hero */}
        <div className="max-w-4xl mx-auto mb-20">
          <YouTubeEmbed videoId={YOUTUBE_VIDEO_ID} title={YOUTUBE_VIDEO_TITLE} />
        </div>

        <motion.div
          style={{ y: statsY }}
          className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border border-y border-border"
        >
          {tests.map((t, i) => (
            <div
              key={t.label}
              className="relative px-6 py-12 md:py-16 flex flex-col items-start gap-4 group overflow-hidden"
            >
              {/* hover accent */}
              <div className="absolute inset-x-0 bottom-0 h-px bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500" />

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-primary/60">0{i + 1}</span>
                <div className="w-px h-4 bg-border" />
                <t.icon className="w-4 h-4 text-primary" />
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{t.label}</p>
              </div>

              <p className="font-display text-7xl sm:text-8xl text-primary leading-[0.9] drop-shadow-[0_0_30px_rgba(220,255,80,0.2)]">
                {t.value}
              </p>

              <p className="text-base text-muted-foreground leading-relaxed max-w-xs">{t.sub}</p>
            </div>
          ))}
        </motion.div>

        <p className="text-center mt-16 text-sm text-muted-foreground max-w-xl mx-auto">
          Setiap batch Ugorex diuji di lab independen sebelum dikirim. Tidak ada produk lolos kalau gagal salah satu test.
        </p>
      </div>
    </section>
  )
}

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const [playing, setPlaying] = useState(false)
  const thumbnail = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/10">
      {playing ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 w-full h-full cursor-pointer"
          aria-label={`Play ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbnail}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              // Fallback if maxres unavailable
              ;(e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 group-hover:from-black/40 transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 transition-transform">
              <Play className="w-8 h-8 ml-1 fill-current" />
            </div>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-left">
            <p className="text-xs uppercase tracking-widest text-primary mb-1">Watch the test</p>
            <p className="text-lg font-semibold text-white">{title}</p>
          </div>
        </button>
      )}
    </div>
  )
}
