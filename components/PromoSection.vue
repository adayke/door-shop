<template>
  <section class="py-20 bg-brown-900 relative overflow-hidden">
    <!-- Decorative background -->
    <div class="absolute inset-0 opacity-5">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-gold rounded-full blur-3xl"></div>
    </div>

    <div class="page-container relative z-10">
      <!-- Banner CTA -->
      <div class="grid lg:grid-cols-5 gap-10 items-center mb-20">
        <div class="lg:col-span-3">
          <div class="flex items-center gap-3 mb-4">
            <div class="h-px w-10 bg-gold"></div>
            <span class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body">Специальное предложение</span>
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-semibold text-white leading-tight mb-5">
            Скидка <span class="text-gold">до 30%</span><br>на входные двери
          </h2>
          <p class="font-body text-cream-300/70 text-base leading-relaxed mb-8 max-w-md">
            Только до конца месяца! Успейте приобрести премиальные входные двери со скидкой.
            Бесплатная замерная служба и установка в подарок.
          </p>
          <div class="flex flex-wrap gap-4">
            <NuxtLink
              to="/catalog?category=vhodnye&has_discount=true"
              class="btn-primary text-base px-8 py-4"
            >
              Смотреть акцию
            </NuxtLink>
            <a href="tel:+77001234567" class="btn-outline text-base px-8 py-4 border-white/30 text-white hover:bg-white/10">
              Позвонить
            </a>
          </div>
        </div>

        <!-- Countdown timer -->
        <div class="lg:col-span-2">
          <div class="bg-white/5 border border-white/10 rounded-sm p-6 backdrop-blur-sm">
            <p class="font-body text-xs text-gold/80 tracking-wider uppercase text-center mb-5">
              До конца акции осталось
            </p>
            <div class="grid grid-cols-4 gap-2 text-center">
              <div v-for="unit in countdown" :key="unit.label" class="flex flex-col">
                <div class="font-display text-3xl md:text-4xl font-bold text-white bg-white/10 rounded-sm py-3 px-2 mb-1.5">
                  {{ unit.value.toString().padStart(2, '0') }}
                </div>
                <span class="font-body text-[10px] text-cream-300/50 uppercase tracking-wider">
                  {{ unit.label }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Sale products -->
      <div v-if="saleProducts.length">
        <h3 class="font-display text-2xl font-semibold text-white mb-6 flex items-center gap-3">
          Товары со скидкой
          <span class="text-xs font-body bg-red-500 text-white px-2 py-0.5 rounded-sm">СКИДКИ</span>
        </h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ProductCard
            v-for="product in saleProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { Product } from '~/types'

const { getSaleProducts } = useDirectus()

const { data } = await useAsyncData('sale-products', () => getSaleProducts(4), {
  default: () => ({ data: [] as Product[] }),
})

const saleProducts = computed(() => data.value?.data ?? [])

// Countdown timer
const endDate = new Date()
endDate.setDate(endDate.getDate() + 12)
endDate.setHours(23, 59, 59, 0)

const countdown = ref([
  { label: 'Дней', value: 0 },
  { label: 'Часов', value: 0 },
  { label: 'Минут', value: 0 },
  { label: 'Секунд', value: 0 },
])

const updateCountdown = () => {
  const now = new Date().getTime()
  const distance = endDate.getTime() - now
  if (distance <= 0) return

  countdown.value = [
    { label: 'Дней', value: Math.floor(distance / (1000 * 60 * 60 * 24)) },
    { label: 'Часов', value: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) },
    { label: 'Минут', value: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) },
    { label: 'Секунд', value: Math.floor((distance % (1000 * 60)) / 1000) },
  ]
}

let timer: ReturnType<typeof setInterval>

onMounted(() => {
  updateCountdown()
  timer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>
