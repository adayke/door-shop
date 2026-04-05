<template>
  <section class="py-20">
    <div class="page-container">
      <!-- Section header -->
      <div class="text-center mb-12">
        <div class="flex items-center justify-center gap-4 mb-4">
          <div class="h-px w-16 bg-gold/40"></div>
          <span class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body">Ассортимент</span>
          <div class="h-px w-16 bg-gold/40"></div>
        </div>
        <h2 class="section-title">Категории товаров</h2>
        <p class="section-subtitle max-w-lg mx-auto">
          Полный ассортимент дверей и сопутствующей фурнитуры для вашего дома
        </p>
      </div>

      <!-- Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <NuxtLink
          v-for="(cat, idx) in categories"
          :key="cat.slug"
          :to="`/catalog?category=${cat.slug}`"
          class="group relative overflow-hidden rounded-sm"
          :class="idx < 2 ? 'md:col-span-1 lg:col-span-2' : ''"
        >
          <div
            class="aspect-square flex flex-col items-center justify-center p-4 text-center transition-all duration-300 border border-cream-300 bg-white group-hover:border-gold group-hover:shadow-luxury"
          >
            <!-- Icon -->
            <div
              class="w-14 h-14 rounded-sm mb-3 flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
              :class="cat.bgClass"
            >
              {{ cat.icon }}
            </div>
            <h3 class="font-display text-sm font-semibold text-brown-900 leading-tight group-hover:text-gold transition-colors">
              {{ cat.name }}
            </h3>
            <p class="font-body text-xs text-brown-400 mt-1">{{ cat.count }} товаров</p>
          </div>
        </NuxtLink>
      </div>

      <!-- View all button -->
      <div class="text-center mt-10">
        <NuxtLink to="/catalog" class="btn-outline">
          Весь каталог
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
          </svg>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const categories = [
  {
    name: 'Межкомнатные двери',
    slug: 'mezhkomnatnye',
    icon: '🚪',
    count: 124,
    bgClass: 'bg-amber-50 text-amber-700',
  },
  {
    name: 'Входные двери',
    slug: 'vhodnye',
    icon: '🏠',
    count: 67,
    bgClass: 'bg-brown-50 text-brown-700',
  },
  {
    name: 'Дверные ручки',
    slug: 'ruchki',
    icon: '🔑',
    count: 89,
    bgClass: 'bg-yellow-50 text-yellow-700',
  },
  {
    name: 'Врезные замки',
    slug: 'zamki',
    icon: '🔒',
    count: 45,
    bgClass: 'bg-gray-50 text-gray-600',
  },
  {
    name: 'Фурнитура',
    slug: 'furnitura',
    icon: '⚙️',
    count: 156,
    bgClass: 'bg-cream-200 text-brown-600',
  },
  {
    name: 'Пороги и уплотнители',
    slug: 'porogi',
    icon: '📏',
    count: 38,
    bgClass: 'bg-orange-50 text-orange-700',
  },
]
</script>
