export const useImageUrl = () => {
  const config = useRuntimeConfig()

  const getImageUrl = (
    imageId: string | undefined,
    params?: { width?: number; height?: number; quality?: number },
  ): string => {
    if (!imageId) return '/images/placeholder.jpg'

    // Уже полный URL (Unsplash, http/https) — вернуть как есть
    if (imageId.startsWith('http')) return imageId

    // Directus asset ID — строим URL к Directus
    const url = new URL(`${config.public.directusUrl}/assets/${imageId}`)
    if (params?.width) url.searchParams.set('width', String(params.width))
    if (params?.height) url.searchParams.set('height', String(params.height))
    if (params?.quality) url.searchParams.set('quality', String(params.quality))
    url.searchParams.set('format', 'webp')

    return url.toString()
  }

  return { getImageUrl }
}
