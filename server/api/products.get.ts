import type { H3Event } from 'h3'
import { mockProducts, filterProducts } from '~/server/utils/mockData'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)

  // ── Попытка запросить Directus ─────────────────────────────────────────────
  const directusUrl = config.public.directusUrl
  if (directusUrl && directusUrl !== 'http://localhost:8055') {
    try {
      const params = new URLSearchParams()
      params.set('fields', 'id,name,slug,category.name,category.slug,price,old_price,material,color,brand,images,in_stock,is_new,rating,reviews_count')
      params.set('limit', String(query.limit ?? 12))
      params.set('page', String(query.page ?? 1))
      params.set('meta', 'filter_count,total_count')
      if (query.sort) params.set('sort', String(query.sort))
      if (query.filter) params.set('filter', String(query.filter))

      return await $fetch(`${directusUrl}/items/products?${params.toString()}`, {
        headers: config.directusToken
          ? { Authorization: `Bearer ${config.directusToken}` }
          : {},
        timeout: 4000,
      })
    } catch {
      // Directus недоступен — используем мок-данные
    }
  }

  // ── Мок-данные ────────────────────────────────────────────────────────────
  const page = Number(query.page ?? 1)
  const limit = Number(query.limit ?? 12)

  // Передаём query-параметры фильтра
  const filterParams: Record<string, string | undefined> = {}
  if (query.category) filterParams.category = String(query.category)
  if (query.priceMin) filterParams.priceMin = String(query.priceMin)
  if (query.priceMax) filterParams.priceMax = String(query.priceMax)
  if (query.materials) filterParams.materials = String(query.materials)
  if (query.colors) filterParams.colors = String(query.colors)
  if (query.brands) filterParams.brands = String(query.brands)
  if (query.sort) filterParams.sort = String(query.sort)

  // Directus передаёт фильтр как JSON-строку — поддержим и это
  if (query.filter && typeof query.filter === 'string') {
    try {
      const f = JSON.parse(query.filter)
      const rules: Array<Record<string, unknown>> = f._and ?? [f]
      for (const rule of rules) {
        if (rule['category.slug']) filterParams.category = (rule['category.slug'] as Record<string, string>)._eq
        if (rule.material) filterParams.materials = (rule.material as Record<string, unknown[]>)._in?.join(',')
        if (rule.color) filterParams.colors = (rule.color as Record<string, unknown[]>)._in?.join(',')
        if (rule.brand) filterParams.brands = (rule.brand as Record<string, unknown[]>)._in?.join(',')
      }
    } catch { /* ignore */ }
  }

  const filtered = filterProducts(mockProducts, filterParams)
  const total = filtered.length
  const start = (page - 1) * limit
  const data = filtered.slice(start, start + limit)

  return {
    data,
    meta: { filter_count: total, total_count: mockProducts.length },
  }
})
