'use client'

import { useState } from 'react'
import { products, categories, brands, formatPrice, type Product } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, ShoppingCart, Filter, Grid3X3, LayoutList, ChevronDown } from 'lucide-react'

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="group bg-card border-border overflow-hidden hover:border-primary/50 transition-all duration-300">
      {/* Image Container */}
      <div className="relative aspect-square bg-secondary/50 overflow-hidden">
        {/* Placeholder for product image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="w-20 h-32 bg-gradient-to-br from-muted to-secondary rounded-xl mx-auto mb-2 shadow-lg" />
            <p className="text-xs text-muted-foreground">{product.model}</p>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">Baru</Badge>
          )}
          {product.isBestSeller && (
            <Badge variant="secondary" className="bg-foreground text-background">Best Seller</Badge>
          )}
          {product.originalPrice && (
            <Badge variant="destructive">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </Badge>
          )}
        </div>

        {/* Quick Add Button */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/90 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Tambah ke Keranjang
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand & Model */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-primary">{product.brand}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{product.category.replace('-', ' ')}</span>
        </div>

        {/* Name */}
        <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1">{product.model}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()} ulasan)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-lg font-bold text-foreground">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Features Preview */}
        <div className="flex flex-wrap gap-1 mt-3">
          {product.features.slice(0, 2).map((feature) => (
            <span key={feature} className="text-[10px] px-2 py-1 bg-secondary rounded-full text-muted-foreground">
              {feature}
            </span>
          ))}
          {product.features.length > 2 && (
            <span className="text-[10px] px-2 py-1 bg-secondary rounded-full text-muted-foreground">
              +{product.features.length - 2}
            </span>
          )}
        </div>
      </div>
    </Card>
  )
}

export function ProductCatalog() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedBrand, setSelectedBrand] = useState('Semua')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const filteredProducts = products.filter((product) => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
    const brandMatch = selectedBrand === 'Semua' || product.brand === selectedBrand
    return categoryMatch && brandMatch
  })

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Koleksi <span className="text-primary">Produk</span> Kami
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Temukan anti gores terbaik untuk smartphone Anda. Kualitas premium dengan harga terjangkau.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? '' : 'border-border hover:border-primary/50'}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Brand Filter & View Toggle */}
          <div className="flex items-center gap-4 lg:ml-auto">
            {/* Brand Dropdown */}
            <div className="relative">
              <Button variant="outline" size="sm" className="border-border">
                <Filter className="h-4 w-4 mr-2" />
                {selectedBrand}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
              {/* Simple dropdown could be added here */}
            </div>

            {/* View Toggle */}
            <div className="hidden sm:flex items-center gap-1 bg-secondary rounded-lg p-1">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode('list')}
              >
                <LayoutList className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Brand Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {brands.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedBrand === brand
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80'
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Tidak ada produk yang ditemukan untuk filter ini.</p>
            <Button variant="outline" className="mt-4" onClick={() => { setSelectedCategory('all'); setSelectedBrand('Semua') }}>
              Reset Filter
            </Button>
          </div>
        )}

        {/* Load More */}
        {filteredProducts.length > 0 && (
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-border hover:border-primary/50">
              Lihat Lebih Banyak
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
