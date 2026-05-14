'use client'

import { useState } from 'react'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { ProductCard } from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { products, categories, brands } from '@/lib/products'

export default function ProdukPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('Semua')

  const filtered = products.filter((p) => {
    const catMatch = selectedCategory === 'all' || p.category === selectedCategory
    const brandMatch = selectedBrand === 'Semua' || p.brand === selectedBrand
    return catMatch && brandMatch
  })

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Katalog</p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display tracking-tight">
              Semua <span className="text-primary">Produk</span>
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Anti gores premium untuk tiap tipe HP. Pilih kategori dan brand sesuai kebutuhan kamu.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Brand filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {brands.map((brand) => (
              <button
                key={brand}
                type="button"
                onClick={() => setSelectedBrand(brand)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  selectedBrand === brand
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-muted-foreground hover:text-foreground'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>

          {/* Result count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filtered.length} produk ditemukan
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground">Tidak ada produk untuk filter ini.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedBrand('Semua')
                }}
              >
                Reset Filter
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
