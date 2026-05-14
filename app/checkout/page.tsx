'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { CheckCircle2, ShoppingBag, ChevronLeft, Truck } from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { formatPrice, productImage } from '@/lib/products'

const SHIPPING_FLAT = 15000
const FREE_SHIPPING_MIN = 150000

const PAYMENT_METHODS = [
  { id: 'transfer', label: 'Transfer Bank', sub: 'BCA / Mandiri / BNI' },
  { id: 'ewallet', label: 'E-Wallet', sub: 'GoPay / OVO / DANA' },
  { id: 'cod', label: 'COD', sub: 'Bayar di tempat' },
]

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart()
  const { user } = useAuth()

  const [form, setForm] = useState({
    name: user?.name ?? '',
    phone: '',
    address: '',
    city: '',
    note: '',
  })
  const [payment, setPayment] = useState('transfer')
  const [placed, setPlaced] = useState(false)

  const shipping = subtotal >= FREE_SHIPPING_MIN || subtotal === 0 ? 0 : SHIPPING_FLAT
  const total = subtotal + shipping

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setPlaced(true)
    clear()
  }

  // Success screen
  if (placed) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-primary/15 mb-6">
              <CheckCircle2 className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-display tracking-tight">Pesanan diterima!</h1>
            <p className="text-muted-foreground mt-2">
              Terima kasih, {form.name || 'kak'}. Pesanan kamu lagi kami proses. Detail pembayaran
              dikirim ke email.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-8 justify-center">
              <Button asChild>
                <Link href="/produk">Belanja lagi</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/akun">Lihat akun</Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              Demo mode — pesanan ini tidak benar-benar diproses.
            </p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 px-6">
          <div className="max-w-md mx-auto text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-secondary mb-6">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-display tracking-tight">Keranjang kosong</h1>
            <p className="text-muted-foreground mt-2">
              Belum ada produk buat di-checkout. Yuk pilih dulu.
            </p>
            <Button asChild className="mt-8">
              <Link href="/produk">Lihat Produk</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/produk"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ChevronLeft className="h-4 w-4" />
            Lanjut belanja
          </Link>

          <h1 className="text-3xl font-display tracking-tight mb-8">Checkout</h1>

          <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* LEFT — forms */}
            <div className="space-y-8">
              {/* Shipping */}
              <section>
                <h2 className="font-display text-lg tracking-tight mb-4">Alamat Pengiriman</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="name">Nama penerima</Label>
                    <Input id="name" required value={form.name} onChange={set('name')} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">No. HP</Label>
                    <Input
                      id="phone"
                      required
                      placeholder="08xxxxxxxxxx"
                      value={form.phone}
                      onChange={set('phone')}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Kota</Label>
                    <Input id="city" required value={form.city} onChange={set('city')} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="address">Alamat lengkap</Label>
                    <Input
                      id="address"
                      required
                      placeholder="Jalan, no. rumah, kelurahan, kecamatan"
                      value={form.address}
                      onChange={set('address')}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="note">Catatan (opsional)</Label>
                    <Input
                      id="note"
                      placeholder="Patokan, instruksi kurir, dll"
                      value={form.note}
                      onChange={set('note')}
                    />
                  </div>
                </div>
              </section>

              {/* Payment */}
              <section>
                <h2 className="font-display text-lg tracking-tight mb-4">Metode Pembayaran</h2>
                <div className="space-y-3">
                  {PAYMENT_METHODS.map((m) => (
                    <label
                      key={m.id}
                      className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${
                        payment === m.id
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/40'
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={payment === m.id}
                        onChange={(e) => setPayment(e.target.value)}
                        className="accent-primary"
                      />
                      <div>
                        <p className="font-semibold text-sm">{m.label}</p>
                        <p className="text-xs text-muted-foreground">{m.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT — order summary */}
            <aside>
              <div className="rounded-xl bg-card border border-border p-5 lg:sticky lg:top-24">
                <h2 className="font-display text-lg tracking-tight mb-4">Ringkasan Pesanan</h2>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex gap-3">
                      <div className="relative shrink-0 w-12 h-12 rounded-lg bg-secondary/60 flex items-center justify-center overflow-hidden">
                        {productImage(product) ? (
                          <Image
                            src={productImage(product) as string}
                            alt={product.name}
                            fill
                            sizes="48px"
                            className="object-contain p-0.5"
                          />
                        ) : (
                          <div className="w-5 h-9 rounded bg-gradient-to-br from-muted to-secondary" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium line-clamp-1">{product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {qty} × {formatPrice(product.price)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold">
                        {formatPrice(product.price * qty)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border mt-4 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Ongkir</span>
                    <span className={shipping === 0 ? 'text-primary' : ''}>
                      {shipping === 0 ? 'GRATIS' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Truck className="h-3.5 w-3.5" />
                      Belanja {formatPrice(FREE_SHIPPING_MIN)} untuk gratis ongkir
                    </p>
                  )}
                  <div className="flex justify-between font-bold text-base pt-2 border-t border-border">
                    <span>Total</span>
                    <span className="font-display">{formatPrice(total)}</span>
                  </div>
                </div>

                <Button type="submit" size="lg" className="w-full mt-5">
                  Buat Pesanan
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Demo mode — tidak ada pembayaran nyata.
                </p>
              </div>
            </aside>
          </form>
        </div>
      </div>

      <Footer />
    </main>
  )
}
