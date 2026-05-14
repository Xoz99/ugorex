'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Star } from 'lucide-react'

export function SocialProofSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const cardsY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%'])

  const testimonials = [
    {
      name: 'Rizky A.',
      city: 'Jakarta',
      rating: 5,
      text: 'Udah 6 bulan pake, layar masih mulus banget. Padahal HP gue sering jatoh. Worth it!',
    },
    {
      name: 'Sarah W.',
      city: 'Bandung',
      rating: 5,
      text: 'Pasangnya gampang, no bubble, dan sensitivitas layar gak berubah. Recommended.',
    },
    {
      name: 'Andi P.',
      city: 'Surabaya',
      rating: 5,
      text: 'Awalnya ragu krn murah, ternyata kualitas premium. Beli lagi buat HP istri.',
    },
  ]

  return (
    <section ref={ref} className="relative min-h-screen overflow-hidden bg-secondary/30 py-32">
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Social Proof</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight leading-[1.1]">
            Dipercaya <span className="text-primary">500.000+</span> pengguna
          </h2>
          <div className="mt-6 flex items-center justify-center gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-primary text-primary" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">4.9 dari 12.500+ review</span>
          </div>
        </div>

        <motion.div style={{ y: cardsY }} className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-card border border-border p-8 flex flex-col gap-6"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-base leading-relaxed">"{t.text}"</p>
              <div className="mt-auto flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-sm font-semibold text-primary">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-semibold">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Marketplace logos placeholder */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60">
          {['Shopee', 'Tokopedia', 'TikTok Shop', 'Lazada', 'Blibli'].map((m) => (
            <span key={m} className="text-lg font-semibold text-muted-foreground">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
