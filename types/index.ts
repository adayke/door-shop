export interface Category {
  id: number
  name: string
  slug: string
  icon: string
  description?: string
  products_count?: number
}

export interface Product {
  id: number
  name: string
  slug: string
  category: string | Category
  price: number
  old_price?: number
  description?: string
  material?: string
  color?: string
  brand?: string
  images: string[]
  in_stock: boolean
  is_new: boolean
  rating?: number
  reviews_count?: number
  specs?: Record<string, string>
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Order {
  id?: number
  name: string
  phone: string
  email?: string
  address?: string
  items: CartItem[]
  total: number
  status?: 'new' | 'processing' | 'completed' | 'cancelled'
  comment?: string
}

export interface FilterState {
  priceMin: number
  priceMax: number
  materials: string[]
  colors: string[]
  brands: string[]
  category?: string
  sort: 'popular' | 'price_asc' | 'price_desc' | 'newest'
  page: number
  perPage: number
}

export interface DirectusResponse<T> {
  data: T
  meta?: {
    filter_count: number
    total_count: number
  }
}
