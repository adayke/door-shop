<script setup lang="ts">
import type { Product } from '~/types'

const route = useRoute()
const { getProductBySlug, getRelatedProducts } = useDirectus()
const { getImageUrl } = useImageUrl()
const { format, discount } = useFormatPrice()
const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()

const slug = computed(() => route.params.slug as string)

const { data: product, error } = await useAsyncData(
  `product-${slug.value}`,
  () => getProductBySlug(slug.value)
)

if (!product.value) {
  throw createError({ statusCode: 404, statusMessage: 'Товар не найден' })
}

const categorySlug = computed(() => {
  const cat = product.value?.category
  if (typeof cat === 'object' && cat !== null) return (cat as { slug: string }).slug
  return String(cat ?? '')
})

const categoryName = computed(() => {
  const cat = product.value?.category
  if (typeof cat === 'object' && cat !== null) return (cat as { name: string }).name
  return String(cat ?? 'Каталог')
})

const { data: relatedData } = await useAsyncData(
  `related-${slug.value}`,
  () => product.value
    ? getRelatedProducts(categorySlug.value, product.value.id, 4)
    : Promise.resolve({ data: [] }),
  { default: () => ({ data: [] as Product[] }) }
)

const related = computed<Product[]>(() => relatedData.value?.data ?? [])

// SEO
useHead({
  title: computed(() => `${product.value?.name ?? ''} — ЭталонЛюкс`),
  meta: computed(() => [
    {
      name: 'description',
      content: product.value?.description ?? `Купить ${product.value?.name} в интернет-магазине ЭталонЛюкс. Цена: ${product.value ? format(product.value.price) : ''}.`,
    },
    { property: 'og:title', content: product.value?.name ?? '' },
    { property: 'og:image', content: getImageUrl(product.value?.images?.[0], { width: 1200, height: 630 }) },
    { property: 'og:type', content: 'product' },
  ]),
})

// Active image tab
const activeImage = ref(0)

// Quantity
const qty = ref(1)

// Tab
const activeTab = ref<'specs' | 'desc' | 'delivery'>('specs')

const isFavorite = computed(() => product.value ? favoritesStore.isFavorite(product.value.id) : false)
const addedToCart = ref(false)

const addToCart = () => {
  if (!product.value?.in_stock) return
  cartStore.add(product.value, qty.value)
  addedToCart.value = true
  setTimeout(() => { addedToCart.value = false }, 2000)
}

const toggleFavorite = () => {
  if (product.value) favoritesStore.toggle(product.value)
}

const discountPercent = computed(() =>
  product.value?.old_price ? discount(product.value.price, product.value.old_price) : 0
)

// Specs map per category
const specsLabels: Record<string, string> = {
  material: 'Материал',
  color: 'Цвет',
  brand: 'Производитель',
  in_stock: 'Наличие',
  is_new: 'Новинка',
}
</script>

<template>
  <div v-if="product">
    <!-- Breadcrumb -->
    <div class="bg-brown-900 py-3">
      <div class="page-container">
        <nav class="flex items-center gap-2 text-xs font-body flex-wrap">
          <NuxtLink to="/" class="text-cream-300/50 hover:text-gold transition-colors">Главная</NuxtLink>
          <svg class="w-3 h-3 text-cream-300/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <NuxtLink to="/catalog" class="text-cream-300/50 hover:text-gold transition-colors">Каталог</NuxtLink>
          <svg class="w-3 h-3 text-cream-300/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <NuxtLink
            :to="`/catalog?category=${categorySlug}`"
            class="text-cream-300/50 hover:text-gold transition-colors"
          >
            {{ categoryName }}
          </NuxtLink>
          <svg class="w-3 h-3 text-cream-300/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
          <span class="text-cream-300/70 line-clamp-1">{{ product.name }}</span>
        </nav>
      </div>
    </div>

    <div class="page-container py-10">
      <!-- Product layout -->
      <div class="grid lg:grid-cols-2 gap-10 mb-16">
        <!-- Gallery -->
        <div class="space-y-4">
          <!-- Main image -->
          <div class="relative aspect-[4/3] bg-white rounded-sm overflow-hidden shadow-luxury group">
            <img
              :src="getImageUrl(product.images?.[activeImage], { width: 800, height: 600, quality: 90 })"
              :alt="product.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <!-- Badges -->
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <span v-if="product.is_new" class="badge-new">Новинка</span>
              <span v-if="product.old_price" class="badge-sale">-{{ discountPercent }}%</span>
            </div>
            <!-- Nav arrows -->
            <button
              v-if="(product.images?.length ?? 0) > 1 && activeImage > 0"
              class="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-sm flex items-center justify-center hover:bg-white transition-colors shadow"
              @click="activeImage--"
            >
              <svg class="w-4 h-4 text-brown-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
              </svg>
            </button>
            <button
              v-if="(product.images?.length ?? 0) > 1 && activeImage < (product.images?.length ?? 0) - 1"
              class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 rounded-sm flex items-center justify-center hover:bg-white transition-colors shadow"
              @click="activeImage++"
            >
              <svg class="w-4 h-4 text-brown-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          <!-- Thumbnails -->
          <div v-if="(product.images?.length ?? 0) > 1" class="flex gap-3 overflow-x-auto scrollbar-thin pb-1">
            <button
              v-for="(img, idx) in product.images"
              :key="idx"
              class="flex-shrink-0 w-20 h-16 rounded-sm overflow-hidden border-2 transition-all"
              :class="activeImage === idx ? 'border-gold shadow-gold' : 'border-transparent opacity-70 hover:opacity-100'"
              @click="activeImage = idx"
            >
              <img
                :src="getImageUrl(img, { width: 160, height: 128 })"
                :alt="`${product.name} фото ${idx + 1}`"
                class="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <!-- Product info -->
        <div class="flex flex-col">
          <!-- Brand & category -->
          <div class="flex items-center gap-3 mb-3">
            <NuxtLink
              :to="`/catalog?category=${categorySlug}`"
              class="text-xs text-gold font-semibold tracking-wide uppercase hover:underline"
            >
              {{ categoryName }}
            </NuxtLink>
            <span v-if="product.brand" class="text-brown-300">·</span>
            <span v-if="product.brand" class="text-xs text-brown-500">{{ product.brand }}</span>
          </div>

          <!-- Name -->
          <h1 class="font-display text-2xl md:text-3xl font-semibold text-brown-900 leading-snug mb-4">
            {{ product.name }}
          </h1>

          <!-- Rating stub -->
          <div class="flex items-center gap-3 mb-5">
            <div class="flex items-center gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-4 h-4" :class="i <= (product.rating ?? 5) ? 'text-gold fill-current' : 'fill-current text-cream-300'" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <span class="text-sm text-brown-500 font-body">{{ product.reviews_count ?? 0 }} отзывов</span>
          </div>

          <!-- Price -->
          <div class="flex items-baseline gap-4 mb-6 pb-6 border-b border-cream-300">
            <span class="font-display text-3xl font-bold text-brown-900">{{ format(product.price) }}</span>
            <span v-if="product.old_price" class="price-old text-base">{{ format(product.old_price) }}</span>
            <span v-if="product.old_price" class="badge-sale">−{{ discountPercent }}%</span>
          </div>

          <!-- Quick specs -->
          <div class="grid grid-cols-2 gap-3 mb-6">
            <div v-if="product.material" class="flex flex-col">
              <span class="text-xs text-brown-400 font-body">Материал</span>
              <span class="text-sm text-brown-900 font-semibold font-body mt-0.5">{{ product.material }}</span>
            </div>
            <div v-if="product.color" class="flex flex-col">
              <span class="text-xs text-brown-400 font-body">Цвет</span>
              <span class="text-sm text-brown-900 font-semibold font-body mt-0.5">{{ product.color }}</span>
            </div>
          </div>

          <!-- Stock status -->
          <div class="flex items-center gap-2 mb-6">
            <div
              class="w-2 h-2 rounded-full"
              :class="product.in_stock ? 'bg-green-500' : 'bg-red-500'"
            ></div>
            <span class="text-sm font-body" :class="product.in_stock ? 'text-green-700' : 'text-red-600'">
              {{ product.in_stock ? 'В наличии' : 'Нет в наличии' }}
            </span>
          </div>

          <!-- Quantity + Add to cart -->
          <div class="flex items-stretch gap-3 mb-4">
            <!-- Qty -->
            <div class="flex items-center border border-cream-300 rounded-sm overflow-hidden">
              <button
                class="w-10 h-12 flex items-center justify-center text-brown-700 hover:text-gold hover:bg-cream-100 transition-colors font-bold text-lg"
                @click="qty = Math.max(1, qty - 1)"
              >−</button>
              <span class="w-12 text-center font-semibold text-brown-900 font-body select-none">{{ qty }}</span>
              <button
                class="w-10 h-12 flex items-center justify-center text-brown-700 hover:text-gold hover:bg-cream-100 transition-colors font-bold text-lg"
                @click="qty++"
              >+</button>
            </div>

            <!-- Add to cart -->
            <button
              :disabled="!product.in_stock"
              class="btn-primary flex-1 py-3 text-base transition-all"
              :class="addedToCart ? '!bg-green-500' : ''"
              @click="addToCart"
            >
              <svg v-if="!addedToCart" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              {{ addedToCart ? 'Добавлено!' : 'В корзину' }}
            </button>

            <!-- Favorite -->
            <button
              class="w-12 h-12 border rounded-sm flex items-center justify-center transition-all"
              :class="isFavorite
                ? 'border-red-300 bg-red-50 text-red-500'
                : 'border-cream-300 text-brown-400 hover:border-red-300 hover:text-red-400'"
              @click="toggleFavorite"
              :aria-label="isFavorite ? 'Убрать из избранного' : 'В избранное'"
            >
              <svg
                class="w-5 h-5"
                :fill="isFavorite ? 'currentColor' : 'none'"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
              </svg>
            </button>
          </div>

          <!-- One-click order -->
          <NuxtLink to="/cart" class="btn-outline w-full mb-6">
            Оформить заказ быстро
          </NuxtLink>

          <!-- Delivery info -->
          <div class="bg-cream-100 rounded-sm p-4 space-y-2.5">
            <div class="flex items-center gap-3 text-sm font-body text-brown-600">
              <svg class="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3m0 0h2.586a1 1 0 01.707.293l2.414 2.414a1 1 0 01.293.707V17a2 2 0 01-2 2h-1m-6 0a2 2 0 002-2H7a2 2 0 002 2m0 0a2 2 0 002-2 2 2 0 002 2"/>
              </svg>
              Доставка по Астана — от 1 дня
            </div>
            <div class="flex items-center gap-3 text-sm font-body text-brown-600">
              <svg class="w-4 h-4 text-gold flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
              </svg>
              Гарантия производителя 5 лет
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs: specs / desc / delivery -->
      <div class="mb-16">
        <div class="flex border-b border-cream-300 gap-1 mb-6">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            class="px-5 py-3 font-body text-sm font-semibold border-b-2 transition-all -mb-px"
            :class="activeTab === tab.id
              ? 'border-gold text-gold'
              : 'border-transparent text-brown-500 hover:text-brown-800'"
            @click="activeTab = tab.id as typeof activeTab"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- Specs tab -->
        <div v-if="activeTab === 'specs'" class="grid sm:grid-cols-2 gap-3">
          <div
            v-for="[key, label] in Object.entries(specsLabels)"
            :key="key"
            class="flex items-center justify-between py-3 px-4 bg-white rounded-sm border border-cream-300/50"
          >
            <span class="font-body text-sm text-brown-500">{{ label }}</span>
            <span class="font-body text-sm font-semibold text-brown-900">
              {{ key === 'in_stock' ? (product.in_stock ? 'Да' : 'Нет') : key === 'is_new' ? (product.is_new ? 'Да' : 'Нет') : (product as Record<string, unknown>)[key] ?? '—' }}
            </span>
          </div>
          <!-- Additional specs -->
          <template v-if="product.specs">
            <div
              v-for="[key, val] in Object.entries(product.specs)"
              :key="key"
              class="flex items-center justify-between py-3 px-4 bg-white rounded-sm border border-cream-300/50"
            >
              <span class="font-body text-sm text-brown-500">{{ key }}</span>
              <span class="font-body text-sm font-semibold text-brown-900">{{ val }}</span>
            </div>
          </template>
        </div>

        <!-- Description tab -->
        <div v-if="activeTab === 'desc'" class="prose max-w-none">
          <p v-if="product.description" class="font-body text-base text-brown-700 leading-relaxed">
            {{ product.description }}
          </p>
          <p v-else class="font-body text-base text-brown-500 italic">Описание скоро появится.</p>
        </div>

        <!-- Delivery tab -->
        <div v-if="activeTab === 'delivery'" class="space-y-4">
          <div v-for="info in deliveryInfo" :key="info.title" class="bg-white p-5 rounded-sm border border-cream-300/50">
            <h3 class="font-display text-base font-semibold text-brown-900 mb-1.5">{{ info.title }}</h3>
            <p class="font-body text-sm text-brown-600 leading-relaxed">{{ info.text }}</p>
          </div>
        </div>
      </div>

      <!-- Related products -->
      <div v-if="related.length">
        <div class="flex items-center gap-4 mb-6">
          <div class="h-px w-10 bg-gold/40"></div>
          <h2 class="section-title text-2xl">Похожие товары</h2>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const tabs = [
  { id: 'specs', label: 'Характеристики' },
  { id: 'desc', label: 'Описание' },
  { id: 'delivery', label: 'Доставка' },
]

const deliveryInfo = [
  {
    title: 'Доставка по Астана',
    text: 'Бесплатная доставка при заказе от 50 000 ₸. Срок доставки: 1–3 рабочих дня. Профессиональный занос на любой этаж.',
  },
  {
    title: 'Доставка по Казахстану',
    text: 'Доставка транспортными компаниями (КазПочта, СДЭК). Срок: 3–7 рабочих дней в зависимости от региона. Стоимость рассчитывается при оформлении.',
  },
  {
    title: 'Самовывоз',
    text: 'г. Астана, ул. Абая, 100, ТЦ «ДомТорг», 2 этаж. Пн–Пт 9:00–19:00, Сб 10:00–17:00.',
  },
  {
    title: 'Установка',
    text: 'Профессиональная установка дверей нашими мастерами. Стоимость уточняется при заказе. Гарантия на монтаж — 2 года.',
  },
]
</script>
