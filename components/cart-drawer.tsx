'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { formatPrice, productImage } from '@/lib/products'

export function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, count } = useCart()

  return (
    <Sheet open={isOpen} onOpenChange={(o) => !o && closeCart()}>
      <SheetContent className="w-full sm:max-w-md p-0">
        <SheetHeader className="border-b border-border">
          <SheetTitle className="flex items-center gap-2 font-display tracking-tight text-lg">
            <ShoppingBag className="h-5 w-5 text-primary" />
            Keranjang
            {count > 0 && (
              <span className="text-sm font-sans font-normal text-muted-foreground">
                ({count} item)
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <div>
              <p className="font-semibold">Keranjang masih kosong</p>
              <p className="text-sm text-muted-foreground mt-1">
                Yuk pilih anti gores buat HP kamu.
              </p>
            </div>
            <Button asChild onClick={closeCart}>
              <Link href="/produk">Lihat Produk</Link>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-3">
              {items.map(({ product, qty }) => (
                <div
                  key={product.id}
                  className="flex gap-3 p-3 rounded-xl bg-card border border-border"
                >
                  {/* Thumb */}
                  <Link
                    href={`/produk/${product.id}`}
                    onClick={closeCart}
                    className="relative shrink-0 w-16 h-16 rounded-lg bg-secondary/60 flex items-center justify-center overflow-hidden"
                  >
                    {productImage(product) ? (
                      <Image
                        src={productImage(product) as string}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-contain p-1"
                      />
                    ) : (
                      <div className="w-7 h-12 rounded-md bg-gradient-to-br from-muted to-secondary shadow-inner" />
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/produk/${product.id}`}
                      onClick={closeCart}
                      className="text-sm font-semibold line-clamp-1 hover:text-primary transition-colors"
                    >
                      {product.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">{product.model}</p>
                    <p className="text-sm font-bold text-primary mt-1">
                      {formatPrice(product.price)}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-border rounded-lg">
                        <button
                          type="button"
                          aria-label="Kurangi"
                          onClick={() => updateQty(product.id, qty - 1)}
                          className="p-1.5 hover:text-primary transition-colors"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="text-sm w-6 text-center tabular-nums">{qty}</span>
                        <button
                          type="button"
                          aria-label="Tambah"
                          onClick={() => updateQty(product.id, qty + 1)}
                          className="p-1.5 hover:text-primary transition-colors"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        aria-label="Hapus"
                        onClick={() => removeItem(product.id)}
                        className="p-1.5 text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <SheetFooter className="border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold font-display">{formatPrice(subtotal)}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Ongkir dihitung saat checkout.
              </p>
              <Button asChild size="lg" className="w-full" onClick={closeCart}>
                <Link href="/checkout">
                  Checkout
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={closeCart}
                asChild
              >
                <Link href="/produk">Lanjut belanja</Link>
              </Button>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
