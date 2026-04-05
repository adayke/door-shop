import type { H3Event } from 'h3'
import { mockProducts } from '~/server/utils/mockData'

export default defineEventHandler(async (event: H3Event) => {
  const config = useRuntimeConfig()
  const slug = getRouterParam(event, 'slug')

  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: 'Slug is required' })
  }

  // ── Попытка запросить Directus ─────────────────────────────────────────────
  const directusUrl = config.public.directusUrl
  if (directusUrl && directusUrl !== 'http://localhost:8055') {
    try {
      const params = new URLSearchParams()
      params.set('fields', '*,category.name,category.slug')
      params.set('filter[slug][_eq]', slug)
      params.set('limit', '1')

      const res = await $fetch<{ data: unknown[] }>(
        `${directusUrl}/items/products?${params.toString()}`,
        {
          headers: config.directusToken
            ? { Authorization: `Bearer ${config.directusToken}` }
            : {},
          timeout: 4000,
        },
      )

      if (res.data?.[0]) return res.data[0]
    } catch {
      // Directus недоступен — используем мок-данные
    }
  }

  // ── Мок-данные ────────────────────────────────────────────────────────────
  const product = mockProducts.find(p => p.slug === slug)
  if (!product) {
    throw createError({ statusCode: 404, statusMessage: 'Product not found' })
  }
  return product
})
