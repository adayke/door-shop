import type { Product, Category, FilterState, DirectusResponse } from '~/types'

// Все запросы идут через Nuxt server-routes /api/…
// Если Directus недоступен, server-routes автоматически возвращают мок-данные.

export const useDirectus = () => {
  const getProducts = (filters: Partial<FilterState> = {}) => {
    const params: Record<string, string> = {}

    if (filters.page) params.page = String(filters.page)
    if (filters.perPage) params.limit = String(filters.perPage)
    if (filters.category) params.category = filters.category
    if (filters.priceMin !== undefined && filters.priceMin > 0) params.priceMin = String(filters.priceMin)
    if (filters.priceMax !== undefined && filters.priceMax < 2000000) params.priceMax = String(filters.priceMax)
    if (filters.materials?.length) params.materials = filters.materials.join(',')
    if (filters.colors?.length) params.colors = filters.colors.join(',')
    if (filters.brands?.length) params.brands = filters.brands.join(',')

    const sortMap: Record<string, string> = {
      popular: '-reviews_count',
      price_asc: 'price',
      price_desc: '-price',
      newest: '-date_created',
    }
    params.sort = sortMap[filters.sort ?? 'popular']

    return $fetch<DirectusResponse<Product[]>>('/api/products', { params })
  }

  const getProductBySlug = (slug: string) =>
    $fetch<Product>(`/api/product/${slug}`)

  const getCategories = () =>
    $fetch<DirectusResponse<Category[]>>('/api/categories')

  const getRelatedProducts = async (category: string, excludeId: number, limit = 4) => {
    const res = await $fetch<DirectusResponse<Product[]>>('/api/products', {
      params: { category, limit: limit + 1 },
    })
    return {
      ...res,
      data: res.data.filter(p => p.id !== excludeId).slice(0, limit),
    }
  }

  const getHits = (limit = 8) =>
    $fetch<DirectusResponse<Product[]>>('/api/products', {
      params: { limit, sort: '-reviews_count' },
    })

  const getSaleProducts = async (limit = 4) => {
    // Вернём товары у которых есть old_price
    const res = await $fetch<DirectusResponse<Product[]>>('/api/products', {
      params: { limit: 50 },
    })
    return {
      ...res,
      data: res.data.filter(p => p.old_price).slice(0, limit),
    }
  }

  const getFilterOptions = async () => {
    const res = await $fetch<DirectusResponse<Product[]>>('/api/products', {
      params: { limit: 100 },
    })
    const products = res.data

    const unique = <T>(arr: (T | undefined | null)[]) =>
      [...new Set(arr.filter(Boolean))] as T[]

    return {
      materials: unique(products.map(p => p.material)),
      colors:    unique(products.map(p => p.color)),
      brands:    unique(products.map(p => p.brand)),
    }
  }

  const createOrder = (orderData: {
    name: string
    phone: string
    email?: string
    address?: string
    items: Array<{ product_id: number; quantity: number; price: number }>
    total: number
    comment?: string
  }) =>
    $fetch('/api/orders', { method: 'POST', body: orderData })

  return {
    getProducts,
    getProductBySlug,
    getCategories,
    getRelatedProducts,
    getHits,
    getSaleProducts,
    getFilterOptions,
    createOrder,
  }
}
