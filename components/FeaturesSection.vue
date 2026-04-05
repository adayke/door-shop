<template>
  <section class="py-16 bg-cream-200 border-y border-cream-300">
    <div class="page-container">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="flex items-start gap-4 group"
        >
          <div
            class="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/20 transition-colors"
          >
            <component :is="feature.icon" class="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 class="font-display text-sm font-semibold text-brown-900 mb-1">{{ feature.title }}</h3>
            <p class="font-body text-xs text-brown-500 leading-relaxed">{{ feature.text }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const TruckIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V17a2 2 0 01-2 2h-1m-6 0a2 2 0 002-2H7a2 2 0 002 2m0 0a2 2 0 002-2 2 2 0 002 2"/></svg>`,
}

const ShieldIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>`,
}

const WrenchIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
}

const StarIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
}

const features = [
  {
    title: 'Бесплатная доставка',
    text: 'По городу при заказе от 50 000 ₸. Профессиональный занос на этаж.',
    icon: TruckIcon,
  },
  {
    title: 'Гарантия 5 лет',
    text: 'На все двери и фурнитуру. Бесплатный ремонт в гарантийный период.',
    icon: ShieldIcon,
  },
  {
    title: 'Профессиональная установка',
    text: 'Опытные монтажники. Установка в день доставки или в удобное время.',
    icon: WrenchIcon,
  },
  {
    title: 'Только оригиналы',
    text: 'Прямые поставки от производителей. 100% сертифицированная продукция.',
    icon: StarIcon,
  },
]
</script>
