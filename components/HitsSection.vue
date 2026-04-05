<template>
  <section class="py-20 bg-white">
    <div class="page-container">
      <!-- Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <div class="h-px w-12 bg-gold/40"></div>
            <span class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body">Бестселлеры</span>
          </div>
          <h2 class="section-title">Хиты продаж</h2>
        </div>
        <NuxtLink to="/catalog?sort=popular" class="btn-ghost text-brown-600 self-start sm:self-auto">
          Все хиты
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>

      <!-- Loading skeleton -->
      <div v-if="pending" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <div
          v-for="i in 8"
          :key="i"
          class="bg-cream-200 rounded-sm overflow-hidden animate-pulse"
        >
          <div class="aspect-[4/3] bg-cream-300"></div>
          <div class="p-4 space-y-2">
            <div class="h-3 bg-cream-300 rounded w-1/3"></div>
            <div class="h-4 bg-cream-300 rounded"></div>
            <div class="h-4 bg-cream-300 rounded w-4/5"></div>
            <div class="h-6 bg-cream-300 rounded w-1/2 mt-3"></div>
          </div>
        </div>
      </div>

      <!-- Products grid -->
      <div v-else-if="products.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
          class="animate-slide-up"
        />
      </div>

      <div v-else class="text-center py-12 text-brown-400">
        Нет доступных товаров
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const { getHits } = useDirectus()

const { data, pending } = await useAsyncData('hits', () => getHits(8), {
  default: () => ({ data: [] as Product[] }),
})

const products = computed(() => data.value?.data ?? [])
</script>
