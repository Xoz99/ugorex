'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { CheckCircle2, Zap, Target, ShieldCheck, MousePointerClick } from 'lucide-react'

const FEATURES = [
  {
    icon: Target,
    title: 'Presisi 100%',
    desc: 'Frame otomatis menyesuaikan posisi layar. Gak ada lagi drama tempered glass miring.'
  },
  {
    icon: Zap,
    title: 'Pasang dalam Hitungan Detik',
    desc: 'Cukup tempel, tarik, dan lepas. Selesai kurang dari 2 menit bahkan buat pemula.'
  },
  {
    icon: MousePointerClick,
    title: 'Zero Bubbles',
    desc: 'Teknologi adhesive otomatis membuang udara. Layar mulus tanpa gelembung.'
  },
  {
    icon: ShieldCheck,
    title: 'Anti-Gagal Guarantee',
    desc: 'Desain tool yang fool-proof. Siapapun bisa pasang dengan hasil kualitas pabrik.'
  }
]

export function SetupSection() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-background">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -mr-64 -mt-32" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/3 blur-[100px] rounded-full -ml-32 -mb-16" />

      <div className="container relative z-10 px-6 mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* LEFT: Image Container */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-700" />
            <div className="relative aspect-square max-w-lg mx-auto">
              <Image
                src="/easyfit-tool.png"
                alt="Ugorex Easy Fit Tool"
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(220,255,80,0.3)]"
              />
            </div>
          </motion.div>

          {/* RIGHT: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-primary text-xs uppercase tracking-[0.3em] mb-4">The Setup</p>
              <h3 className="text-4xl lg:text-6xl font-display tracking-tight leading-none mb-6">
                Easy Fit Tool. <br />
                <span className="text-muted-foreground/50 italic">Bye-bye ribet.</span>
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-xl">
                Lupakan cara pasang manual yang bikin tegang. Dengan <span className="text-foreground font-semibold">Easy Fit Tool</span>, kami membawa standar pemasangan pabrik langsung ke tangan Anda. Cepat, presisi, dan dijamin anti-gagal.
              </p>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
              {FEATURES.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-secondary flex items-center justify-center border border-border/50 group-hover:border-primary/50 transition-colors">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
