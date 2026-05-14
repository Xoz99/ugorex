import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'

const benefits = [
  'Diskon hingga 50% untuk member',
  'Akses produk eksklusif lebih awal',
  'Gratis ongkir tanpa minimum',
  'Garansi diperpanjang 2x lipat'
]

export function CTASection() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border border-primary/20">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-balance">
                  Bergabung dengan{' '}
                  <span className="text-primary">UGOREX Club</span>
                </h2>
                <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
                  Daftar sekarang dan dapatkan akses eksklusif ke penawaran terbaik, produk terbaru, dan berbagai keuntungan member.
                </p>

                {/* Benefits List */}
                <ul className="mt-8 space-y-3">
                  {benefits.map((benefit) => (
                    <li key={benefit} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="text-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="h-14 px-8 text-base font-semibold">
                    <Link href="#signup">
                      Daftar Sekarang
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="h-14 px-8 text-base font-semibold border-border hover:bg-secondary">
                    <Link href="#learn-more">
                      Pelajari Lebih Lanjut
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Stats Card */}
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8">
                <h3 className="text-xl font-semibold mb-6">Sudah Dipercaya Oleh</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <p className="text-3xl font-bold text-primary">50K+</p>
                    <p className="text-sm text-muted-foreground mt-1">Member Aktif</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <p className="text-3xl font-bold text-primary">98%</p>
                    <p className="text-sm text-muted-foreground mt-1">Kepuasan</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <p className="text-3xl font-bold text-primary">24/7</p>
                    <p className="text-sm text-muted-foreground mt-1">Support</p>
                  </div>
                  <div className="text-center p-4 rounded-xl bg-secondary/50">
                    <p className="text-3xl font-bold text-primary">1 Hari</p>
                    <p className="text-sm text-muted-foreground mt-1">Pengiriman</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
