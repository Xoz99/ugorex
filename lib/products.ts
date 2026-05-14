export interface Product {
  id: string
  name: string
  brand: string
  model: string
  price: number
  originalPrice?: number
  image: string
  category: 'tempered-glass' | 'hydrogel' | 'privacy' | 'matte'
  features: string[]
  rating: number
  reviews: number
  inStock: boolean
  isNew?: boolean
  isBestSeller?: boolean
}

export const products: Product[] = [
  {
    id: '1',
    name: 'UGOREX Pro Max Shield',
    brand: 'iPhone',
    model: 'iPhone 15 Pro Max',
    price: 149000,
    originalPrice: 199000,
    image: '/products/iphone-15-pro-max.jpg',
    category: 'tempered-glass',
    features: ['9H Hardness', 'Anti-Fingerprint', 'Crystal Clear', '99.9% Transparency'],
    rating: 4.9,
    reviews: 2341,
    inStock: true,
    isBestSeller: true
  },
  {
    id: '2',
    name: 'UGOREX Ultra Guard',
    brand: 'Samsung',
    model: 'Galaxy S24 Ultra',
    price: 139000,
    originalPrice: 179000,
    image: '/products/samsung-s24-ultra.jpg',
    category: 'tempered-glass',
    features: ['Curved Edge', 'Full Coverage', 'Oleophobic Coating', 'Case Friendly'],
    rating: 4.8,
    reviews: 1892,
    inStock: true,
    isNew: true
  },
  {
    id: '3',
    name: 'UGOREX Privacy Shield',
    brand: 'iPhone',
    model: 'iPhone 15 Pro',
    price: 179000,
    originalPrice: 229000,
    image: '/products/iphone-15-pro.jpg',
    category: 'privacy',
    features: ['Privacy Filter', 'Anti-Spy', '28° View Angle', 'Tempered Glass'],
    rating: 4.7,
    reviews: 1456,
    inStock: true
  },
  {
    id: '4',
    name: 'UGOREX Hydrogel Film',
    brand: 'Samsung',
    model: 'Galaxy Z Fold 5',
    price: 199000,
    image: '/products/samsung-fold-5.jpg',
    category: 'hydrogel',
    features: ['Self-Healing', 'Flexible', 'Full Coverage', 'Bubble-Free'],
    rating: 4.8,
    reviews: 987,
    inStock: true,
    isNew: true
  },
  {
    id: '5',
    name: 'UGOREX Matte Pro',
    brand: 'iPhone',
    model: 'iPhone 14',
    price: 129000,
    originalPrice: 159000,
    image: '/products/iphone-14.jpg',
    category: 'matte',
    features: ['Anti-Glare', 'Paper-like Feel', 'Gaming Optimized', 'Fingerprint Resistant'],
    rating: 4.6,
    reviews: 2156,
    inStock: true,
    isBestSeller: true
  },
  {
    id: '6',
    name: 'UGOREX Shield Plus',
    brand: 'Xiaomi',
    model: 'Xiaomi 14 Ultra',
    price: 119000,
    originalPrice: 149000,
    image: '/products/xiaomi-14-ultra.jpg',
    category: 'tempered-glass',
    features: ['9H Hardness', 'Edge-to-Edge', 'Anti-Scratch', 'HD Clear'],
    rating: 4.7,
    reviews: 1234,
    inStock: true
  },
  {
    id: '7',
    name: 'UGOREX Pro Guard',
    brand: 'OPPO',
    model: 'OPPO Find X7 Ultra',
    price: 129000,
    image: '/products/oppo-find-x7.jpg',
    category: 'tempered-glass',
    features: ['Diamond Hard', 'Ultra Thin', 'Touch Sensitive', 'Easy Install'],
    rating: 4.5,
    reviews: 876,
    inStock: true
  },
  {
    id: '8',
    name: 'UGOREX Privacy Ultra',
    brand: 'Samsung',
    model: 'Galaxy S24+',
    price: 169000,
    originalPrice: 209000,
    image: '/products/samsung-s24-plus.jpg',
    category: 'privacy',
    features: ['Privacy Screen', 'Anti-Peep', 'Tempered Glass', 'High Definition'],
    rating: 4.6,
    reviews: 654,
    inStock: true
  }
]

export const categories = [
  { id: 'all', name: 'Semua Produk', icon: 'grid' },
  { id: 'tempered-glass', name: 'Tempered Glass', icon: 'shield' },
  { id: 'hydrogel', name: 'Hydrogel Film', icon: 'layers' },
  { id: 'privacy', name: 'Privacy Screen', icon: 'eye-off' },
  { id: 'matte', name: 'Matte/Anti-Glare', icon: 'sun' }
]

export const brands = ['Semua', 'iPhone', 'Samsung', 'Xiaomi', 'OPPO', 'Vivo', 'Realme']

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}
