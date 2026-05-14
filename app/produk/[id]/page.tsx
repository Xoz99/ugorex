'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  Star,
  ShoppingCart,
  Minus,
  Plus,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ChevronLeft,
} from 'lucide-react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  getProduct,
  relatedProducts,
  productBlurb,
  categoryLabel,
  discountPercent,
  formatPrice,
  productImage,
} from '@/lib/products'
import { useCart } from '@/lib/cart-context'

const PERKS = [
  { icon: Truck, label: 'Gratis ongkir', sub: 'min. belanja Rp150rb' },
  { icon: ShieldCheck, label: 'Garansi pasang', sub: 'gagal? ganti gratis' },
  { icon: RotateCcw, label: '7 hari retur', sub: 'no questions asked' },
]

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const product = getProduct(params.id)
  const { addItem, openCart } = useCart()
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-2xl font-display">Produk tidak ditemukan</h1>
          <Button asChild className="mt-6">
            <Link href="/produk">Kembali ke katalog</Link>
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  const discount = discountPercent(product)
  const related = relatedProducts(product)
  const image = productImage(product)

  const handleAdd = () => addItem(product, qty)
  const handleBuyNow = () => {
    addItem(product, qty)
    router.push('/checkout')
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <Link
            href="/produk"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ChevronLeft className="h-4 w-4" />
            Semua Produk
          </Link>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* LEFT — visual */}
            <div className="relative aspect-square rounded-3xl bg-secondary/40 border border-border overflow-hidden flex items-center justify-center">
              <div className="absolute w-[70%] h-[70%] rounded-full bg-primary/10 blur-3xl" />
              {image ? (
                <Image
                  src={image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <div className="relative w-44 h-80 rounded-[2rem] bg-gradient-to-br from-muted to-secondary shadow-2xl" />
              )}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.isNew && (
                  <Badge className="bg-primary text-primary-foreground">Baru</Badge>
                )}
                {product.isBestSeller && (
                  <Badge className="bg-foreground text-background">Best Seller</Badge>
                )}
                {discount && <Badge variant="destructive">-{discount}%</Badge>}
              </div>
            </div>

            {/* RIGHT — info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-primary">{product.brand}</span>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">
                  {categoryLabel(product.category)}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-display tracking-tight leading-tight">
                {product.name}
              </h1>
              <p className="text-muted-foreground mt-1">untuk {product.model}</p>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.round(product.rating)
                          ? 'fill-primary text-primary'
                          : 'text-border'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviews.toLocaleString('id-ID')} ulasan)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mt-6">
                <span className="text-3xl font-bold font-display">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <Badge variant="destructive" className="text-xs">
                    Hemat {discount}%
                  </Badge>
                )}
              </div>

              <p className="text-muted-foreground leading-relaxed mt-6">
                {productBlurb(product)}
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mt-6">
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    {f}
                  </div>
                ))}
              </div>

              {/* Qty + actions */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex items-center border border-border rounded-xl">
                  <button
                    type="button"
                    aria-label="Kurangi"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="p-3 hover:text-primary transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-10 text-center tabular-nums font-semibold">{qty}</span>
                  <button
                    type="button"
                    aria-label="Tambah"
                    onClick={() => setQty((q) => q + 1)}
                    className="p-3 hover:text-primary transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <span
                  className={`text-sm ${
                    product.inStock ? 'text-primary' : 'text-destructive'
                  }`}
                >
                  {product.inStock ? '● Stok tersedia' : '● Stok habis'}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1"
                  onClick={handleAdd}
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Tambah ke Keranjang
                </Button>
                <Button
                  size="lg"
                  className="flex-1"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                >
                  Beli Sekarang
                </Button>
              </div>

              <button
                type="button"
                onClick={openCart}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors mt-3"
              >
                Lihat keranjang →
              </button>

              {/* Perks */}
              <div className="grid grid-cols-3 gap-3 mt-8 pt-6 border-t border-border">
                {PERKS.map((perk) => {
                  const Icon = perk.icon
                  return (
                    <div key={perk.label} className="text-center">
                      <Icon className="h-5 w-5 text-primary mx-auto mb-1.5" />
                      <p className="text-xs font-semibold">{perk.label}</p>
                      <p className="text-[11px] text-muted-foreground">{perk.sub}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-2xl font-display tracking-tight mb-6">
                Produk <span className="text-primary">lainnya</span>
              </h2>
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
