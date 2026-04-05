<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'

useHead({
  title: 'Избранное — ДверьЛюкс',
  meta: [{ name: 'robots', content: 'noindex' }],
})

const favoritesStore = useFavoritesStore()
</script>

<template>
  <div>
    <div class="bg-brown-900 py-3">
      <div class="page-container">
        <nav class="flex items-center gap-2 text-xs font-body">
          <NuxtLink to="/" class="text-cream-300/50 hover:text-gold transition-colors">Главная</NuxtLink>
          <svg class="w-3 h-3 text-cream-300/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-cream-300/70">Избранное</span>
        </nav>
      </div>
    </div>

    <div class="page-container py-10">
      <h1 class="section-title mb-8">Избранное</h1>

      <div v-if="favoritesStore.items.length === 0" class="text-center py-20">
        <div class="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-5">
          <svg class="w-12 h-12 text-brown-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
        </div>
        <h2 class="font-display text-2xl font-semibold text-brown-900 mb-3">Список пуст</h2>
        <p class="font-body text-brown-500 mb-8">Нажмите ♡ на карточке товара, чтобы добавить в избранное</p>
        <NuxtLink to="/catalog" class="btn-primary">Перейти в каталог</NuxtLink>
      </div>

      <div v-else>
        <p class="font-body text-sm text-brown-500 mb-6">{{ favoritesStore.count }} товаров</p>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          <ProductCard
            v-for="product in favoritesStore.items"
            :key="product.id"
            :product="product"
          />
        </div>
        <div class="mt-8 text-right">
          <button
            class="text-sm text-brown-400 hover:text-red-500 transition-colors font-body"
            @click="favoritesStore.items = []"
          >
            Очистить избранное
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
