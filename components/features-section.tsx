import { Shield, Droplets, Fingerprint, Zap, Award, Truck } from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: '9H Hardness',
    description: 'Perlindungan maksimal dengan kekerasan 9H, setara dengan safir. Tahan terhadap goresan dan benturan.'
  },
  {
    icon: Droplets,
    title: 'Oleophobic Coating',
    description: 'Lapisan anti minyak yang mudah dibersihkan. Layar tetap bersih dan bebas noda sidik jari.'
  },
  {
    icon: Fingerprint,
    title: 'Touch Sensitivity',
    description: 'Sensitivitas sentuhan yang responsif. Tidak mengganggu pengalaman bermain game atau mengetik.'
  },
  {
    icon: Zap,
    title: 'Easy Installation',
    description: 'Pemasangan mudah dengan teknologi anti-bubble. Hasilnya sempurna tanpa gelembung udara.'
  },
  {
    icon: Award,
    title: 'Lifetime Warranty',
    description: 'Garansi seumur hidup untuk kualitas produk. Kepuasan pelanggan adalah prioritas kami.'
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Gratis ongkir ke seluruh Indonesia untuk pembelian minimal Rp 200.000.'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Mengapa <span className="text-primary">UGOREX</span>?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Kami menggunakan teknologi terdepan untuk memberikan perlindungan terbaik bagi layar smartphone Anda.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
