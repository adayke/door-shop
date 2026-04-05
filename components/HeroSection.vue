<template>
  <section class="relative min-h-[90vh] flex items-center overflow-hidden bg-hero-gradient">
    <!-- Background decorative elements -->
    <div class="absolute inset-0">
      <div class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brown-800/30 to-transparent"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
      <div class="absolute top-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"></div>
      <!-- Decorative lines -->
      <div class="absolute inset-0 opacity-5">
        <div v-for="i in 8" :key="i"
          class="absolute top-0 bottom-0 border-r border-white/20"
          :style="{ left: `${i * 12.5}%` }"
        ></div>
      </div>
    </div>

    <!-- Door silhouette decoration -->
    <div class="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-end pr-16">
      <div class="relative w-72 h-[520px] opacity-20">
        <!-- Door frame SVG -->
        <svg viewBox="0 0 200 360" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
          <rect x="5" y="5" width="190" height="350" rx="2" stroke="#C4973A" stroke-width="4"/>
          <rect x="15" y="15" width="170" height="330" rx="1" stroke="#C4973A" stroke-width="2"/>
          <rect x="25" y="25" width="70" height="120" rx="1" stroke="#C4973A" stroke-width="1.5"/>
          <rect x="105" y="25" width="70" height="120" rx="1" stroke="#C4973A" stroke-width="1.5"/>
          <rect x="25" y="160" width="150" height="180" rx="1" stroke="#C4973A" stroke-width="1.5"/>
          <circle cx="160" cy="250" r="6" stroke="#C4973A" stroke-width="2"/>
          <line x1="154" y1="250" x2="130" y2="250" stroke="#C4973A" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </div>
    </div>

    <div class="page-container relative z-10">
      <div class="max-w-2xl">
        <!-- Eyebrow -->
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold"></div>
          <span class="font-body text-xs text-gold tracking-[0.3em] uppercase font-semibold">
            Премиум коллекция 2025
          </span>
        </div>

        <!-- Heading -->
        <h1 class="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.1] mb-6 text-balance">
          Двери,<br>
          <span class="text-gold">достойные</span><br>
          вашего дома
        </h1>

        <!-- Description -->
        <p class="font-body text-base md:text-lg text-cream-300/70 leading-relaxed mb-10 max-w-lg">
          Эксклюзивные межкомнатные и входные двери из натурального дерева.
          Создайте атмосферу роскоши и уюта с нашей коллекцией.
        </p>

        <!-- CTAs -->
        <div class="flex flex-wrap gap-4 mb-14">
          <NuxtLink to="/catalog" class="btn-primary text-base px-8 py-4">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"/>
            </svg>
            Смотреть каталог
          </NuxtLink>
          <NuxtLink to="/contacts" class="btn-outline text-base px-8 py-4 border-white/30 text-white hover:bg-white hover:text-brown-900">
            Консультация
          </NuxtLink>
        </div>

        <!-- Stats -->
        <div class="flex flex-wrap gap-8">
          <div v-for="stat in stats" :key="stat.label" class="flex flex-col">
            <span class="font-display text-2xl md:text-3xl font-semibold text-gold">{{ stat.value }}</span>
            <span class="font-body text-xs text-cream-300/50 tracking-wide mt-1">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-cream-300/40 animate-bounce">
      <span class="font-body text-xs tracking-widest uppercase">Листайте</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  { value: '500+', label: 'Моделей дверей' },
  { value: '15 лет', label: 'На рынке' },
  { value: '98%', label: 'Довольных клиентов' },
  { value: '7 дней', label: 'Срок доставки' },
]
</script>
