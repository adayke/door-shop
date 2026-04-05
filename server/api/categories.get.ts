import type { H3Event } from 'h3'
import { mockCategories } from '~/server/utils/mockData'

export default defineEventHandler(async (_event: H3Event) => {
  const config = useRuntimeConfig()

  // ── Попытка запросить Directus ─────────────────────────────────────────────
  const directusUrl = config.public.directusUrl
  if (directusUrl && directusUrl !== 'http://localhost:8055') {
    try {
      const params = new URLSearchParams()
      params.set('fields', 'id,name,slug,icon,description')
      params.set('sort', 'sort')

      return await $fetch(`${directusUrl}/items/categories?${params.toString()}`, {
        headers: config.directusToken
          ? { Authorization: `Bearer ${config.directusToken}` }
          : {},
        timeout: 4000,
      })
    } catch {
      // Directus недоступен
    }
  }

  // ── Мок-данные ────────────────────────────────────────────────────────────
  return { data: mockCategories }
})
