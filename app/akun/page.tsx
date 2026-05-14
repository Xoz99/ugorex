'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Package, MapPin, Heart, ChevronRight } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'

const MENU = [
  { icon: Package, label: 'Pesanan saya', sub: 'Lacak & riwayat pesanan' },
  { icon: MapPin, label: 'Alamat pengiriman', sub: 'Kelola alamat tersimpan' },
  { icon: Heart, label: 'Wishlist', sub: 'Produk yang kamu simpan' },
]

export default function AkunPage() {
  const router = useRouter()
  const { user, hydrated, logout } = useAuth()

  useEffect(() => {
    if (hydrated && !user) router.replace('/login')
  }, [hydrated, user, router])

  if (!hydrated || !user) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 text-center text-muted-foreground">Memuat…</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-28 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile header */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-display text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-display tracking-tight">{user.name}</h1>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          {/* Menu */}
          <div className="space-y-3">
            {MENU.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.label}
                  type="button"
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors text-left"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/30">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.sub}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </button>
              )
            })}
          </div>

          {/* Empty orders state */}
          <div className="mt-8 p-6 rounded-xl bg-secondary/40 border border-border text-center">
            <Package className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
            <p className="font-semibold">Belum ada pesanan</p>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Pesanan kamu bakal muncul di sini.
            </p>
            <Button asChild>
              <Link href="/produk">Mulai belanja</Link>
            </Button>
          </div>

          <Button
            variant="outline"
            className="w-full mt-8"
            onClick={() => {
              logout()
              router.push('/')
            }}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Keluar
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-6">
            Demo mode — menu di atas masih placeholder, belum tersambung backend.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
