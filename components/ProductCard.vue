<template>
  <article class="card group relative flex flex-col bg-white" :class="{ 'opacity-60': !product.in_stock }">
    <!-- Image wrapper -->
    <div class="relative overflow-hidden aspect-[4/3] bg-cream-200">
      <NuxtLink :to="`/catalog/${product.slug}`">
        <img
          :src="primaryImage"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </NuxtLink>

      <!-- Badges -->
      <div class="absolute top-3 left-3 flex flex-col gap-1.5">
        <span v-if="product.is_new" class="badge-new">Новинка</span>
        <span v-if="product.old_price" class="badge-sale">-{{ discountPercent }}%</span>
        <span v-if="!product.in_stock" class="inline-block px-2 py-0.5 bg-brown-700 text-white text-xs font-semibold tracking-wide uppercase rounded-sm">
          Нет в наличии
        </span>
      </div>

      <!-- Favorite button -->
      <button
        class="absolute top-3 right-3 w-9 h-9 rounded-sm flex items-center justify-center transition-all duration-200 shadow-sm"
        :class="isFavorite
          ? 'bg-red-50 text-red-500 shadow-md'
          : 'bg-white/80 text-brown-400 opacity-0 group-hover:opacity-100 hover:text-red-500 hover:bg-red-50'"
        @click.prevent="toggleFavorite"
        :aria-label="isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'"
      >
        <svg
          class="w-4.5 h-4.5"
          :fill="isFavorite ? 'currentColor' : 'none'"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      </button>

      <!-- Quick view on hover -->
      <div class="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <NuxtLink
          :to="`/catalog/${product.slug}`"
          class="block w-full py-2.5 bg-brown-900/90 text-white text-xs font-semibold text-center tracking-widest uppercase hover:bg-gold transition-colors"
        >
          Подробнее
        </NuxtLink>
      </div>
    </div>

    <!-- Card body -->
    <div class="p-4 flex flex-col flex-1">
      <!-- Brand & material -->
      <div class="flex items-center gap-2 mb-1.5">
        <span v-if="product.brand" class="text-xs text-gold font-semibold tracking-wide uppercase">
          {{ product.brand }}
        </span>
        <span v-if="product.brand && product.material" class="text-brown-300 text-xs">·</span>
        <span v-if="product.material" class="text-xs text-brown-500">{{ product.material }}</span>
      </div>

      <!-- Name -->
      <NuxtLink :to="`/catalog/${product.slug}`" class="group/name mb-auto">
        <h3 class="font-body text-sm font-semibold text-brown-900 leading-snug group-hover/name:text-gold transition-colors line-clamp-2">
          {{ product.name }}
        </h3>
      </NuxtLink>

      <!-- Color dot -->
      <div v-if="product.color" class="flex items-center gap-2 mt-2">
        <span
          class="w-3.5 h-3.5 rounded-full border border-brown-200/50 flex-shrink-0"
          :style="{ backgroundColor: colorMap[product.color] || product.color }"
        ></span>
        <span class="text-xs text-brown-500">{{ product.color }}</span>
      </div>

      <!-- Price & add to cart -->
      <div class="mt-3 pt-3 border-t border-cream-300 flex items-center justify-between gap-2">
        <div>
          <div class="price">{{ formatPrice(product.price) }}</div>
          <div v-if="product.old_price" class="price-old">{{ formatPrice(product.old_price) }}</div>
        </div>

        <button
          :disabled="!product.in_stock"
          class="w-9 h-9 flex-shrink-0 rounded-sm flex items-center justify-center transition-all duration-200"
          :class="added
            ? 'bg-green-500 text-white'
            : 'bg-gold/10 text-gold hover:bg-gold hover:text-white active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed'"
          @click="addToCart"
          :aria-label="product.in_stock ? 'Добавить в корзину' : 'Нет в наличии'"
        >
          <svg v-if="!added" class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types'
import { useCartStore } from '~/stores/cart'
import { useFavoritesStore } from '~/stores/favorites'

const props = defineProps<{ product: Product }>()

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const { getImageUrl } = useImageUrl()
const { format, discount } = useFormatPrice()

const added = ref(false)

const primaryImage = computed(() => {
  const img = props.product.images?.[0]
  return getImageUrl(img, { width: 400, height: 300, quality: 85 })
})

const isFavorite = computed(() => favoritesStore.isFavorite(props.product.id))

const discountPercent = computed(() =>
  props.product.old_price ? discount(props.product.price, props.product.old_price) : 0
)

const formatPrice = (price: number) => format(price)

const colorMap: Record<string, string> = {
  'Белый': '#FFFFFF',
  'Чёрный': '#1C1612',
  'Венге': '#3D2B1F',
  'Дуб': '#8B6914',
  'Орех': '#5C3317',
  'Серый': '#9E9E9E',
  'Серебро': '#C0C0C0',
  'Золото': '#C4973A',
  'Хром': '#D4D4D4',
  'Бронза': '#8C5A2C',
  'Натуральный': '#C9A96E',
}

const toggleFavorite = () => {
  favoritesStore.toggle(props.product)
}

const addToCart = () => {
  if (!props.product.in_stock) return
  cartStore.add(props.product)
  added.value = true
  setTimeout(() => { added.value = false }, 1500)
}
</script>
