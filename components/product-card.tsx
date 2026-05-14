'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Star, ShoppingCart } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  formatPrice,
  categoryLabel,
  discountPercent,
  productImage,
  type Product,
} from '@/lib/products'
import { useCart } from '@/lib/cart-context'

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const discount = discountPercent(product)
  const image = productImage(product)

  return (
    <Card className="group bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col">
      {/* Image / phone mockup */}
      <Link
        href={`/produk/${product.id}`}
        className="relative aspect-square bg-secondary/50 overflow-hidden block"
      >
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-40 rounded-2xl bg-gradient-to-br from-muted to-secondary shadow-xl group-hover:scale-105 transition-transform duration-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && <Badge className="bg-primary text-primary-foreground">Baru</Badge>}
          {product.isBestSeller && (
            <Badge className="bg-foreground text-background">Best Seller</Badge>
          )}
          {discount && <Badge variant="destructive">-{discount}%</Badge>}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-primary">{product.brand}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{categoryLabel(product.category)}</span>
        </div>

        <Link href={`/produk/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{product.model}</p>

        <div className="flex items-center gap-1.5 mt-2">
          <Star className="h-4 w-4 fill-primary text-primary" />
          <span className="text-sm font-medium">{product.rating}</span>
          <span className="text-xs text-muted-foreground">
            ({product.reviews.toLocaleString('id-ID')} ulasan)
          </span>
        </div>

        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-lg font-bold font-display">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        <Button
          size="sm"
          className="w-full mt-4"
          onClick={() => addItem(product)}
          disabled={!product.inStock}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.inStock ? 'Tambah ke Keranjang' : 'Stok Habis'}
        </Button>
      </div>
    </Card>
  )
}
