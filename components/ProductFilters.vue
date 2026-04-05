<template>
  <aside class="w-full">
    <!-- Mobile toggle -->
    <div class="lg:hidden mb-4">
      <button
        class="w-full flex items-center justify-between px-4 py-3 bg-brown-900 text-white rounded-sm font-body text-sm font-semibold"
        @click="filtersOpen = !filtersOpen"
      >
        <span class="flex items-center gap-2">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/>
          </svg>
          Фильтры
          <span v-if="activeCount > 0" class="w-5 h-5 bg-gold text-white text-xs rounded-full flex items-center justify-center">
            {{ activeCount }}
          </span>
        </span>
        <svg
          class="w-4 h-4 transition-transform"
          :class="filtersOpen ? 'rotate-180' : ''"
          fill="none" stroke="currentColor" viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
    </div>

    <div :class="['space-y-6', { 'hidden lg:block': !filtersOpen }]">
      <!-- Price range -->
      <div class="bg-white p-4 rounded-sm shadow-sm">
        <h3 class="font-display text-sm font-semibold text-brown-900 mb-4 flex items-center justify-between">
          Цена
          <button v-if="localMin !== absoluteMin || localMax !== absoluteMax" @click="resetPrice" class="text-xs text-gold hover:underline">
            Сбросить
          </button>
        </h3>
        <div class="space-y-3">
          <!-- Dual range display -->
          <div class="flex items-center gap-2">
            <input
              v-model.number="localMin"
              type="number"
              :min="absoluteMin"
              :max="localMax"
              class="input text-center text-sm py-2"
              placeholder="От"
              @change="emitFilters"
            />
            <span class="text-brown-400 flex-shrink-0">—</span>
            <input
              v-model.number="localMax"
              type="number"
              :min="localMin"
              :max="absoluteMax"
              class="input text-center text-sm py-2"
              placeholder="До"
              @change="emitFilters"
            />
          </div>
          <!-- Range slider -->
          <div class="relative h-5 flex items-center px-1">
            <div class="relative w-full h-1 bg-cream-300 rounded-full">
              <div
                class="absolute h-1 bg-gold rounded-full"
                :style="{
                  left: `${((localMin - absoluteMin) / (absoluteMax - absoluteMin)) * 100}%`,
                  right: `${100 - ((localMax - absoluteMin) / (absoluteMax - absoluteMin)) * 100}%`
                }"
              ></div>
            </div>
            <input
              v-model.number="localMin"
              type="range"
              :min="absoluteMin"
              :max="absoluteMax"
              step="1000"
              class="absolute w-full opacity-0 h-5 cursor-pointer"
              style="left:0"
              @input="onMinChange"
            />
            <input
              v-model.number="localMax"
              type="range"
              :min="absoluteMin"
              :max="absoluteMax"
              step="1000"
              class="absolute w-full opacity-0 h-5 cursor-pointer"
              style="left:0"
              @input="onMaxChange"
            />
          </div>
          <div class="flex justify-between text-xs text-brown-400">
            <span>{{ format(absoluteMin) }}</span>
            <span>{{ format(absoluteMax) }}</span>
          </div>
        </div>
      </div>

      <!-- Category -->
      <div v-if="!props.category" class="bg-white p-4 rounded-sm shadow-sm">
        <h3 class="font-display text-sm font-semibold text-brown-900 mb-3">Категория</h3>
        <ul class="space-y-1.5">
          <li v-for="cat in categories" :key="cat.slug">
            <button
              class="w-full text-left px-2 py-1.5 rounded-sm text-sm font-body transition-colors flex items-center justify-between group"
              :class="localCategory === cat.slug
                ? 'text-gold font-semibold bg-gold/5'
                : 'text-brown-700 hover:text-brown-900 hover:bg-cream-200'"
              @click="selectCategory(cat.slug)"
            >
              <span class="flex items-center gap-2">
                <span class="text-base">{{ cat.icon }}</span>
                {{ cat.name }}
              </span>
              <svg
                v-if="localCategory === cat.slug"
                class="w-3.5 h-3.5 text-gold"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"/>
              </svg>
            </button>
          </li>
        </ul>
      </div>

      <!-- Material -->
      <div v-if="options.materials.length" class="bg-white p-4 rounded-sm shadow-sm">
        <h3 class="font-display text-sm font-semibold text-brown-900 mb-3 flex items-center justify-between">
          Материал
          <button v-if="localMaterials.length" @click="localMaterials = []; emitFilters()" class="text-xs text-gold hover:underline">
            Сбросить
          </button>
        </h3>
        <div class="space-y-2">
          <label
            v-for="mat in options.materials"
            :key="mat"
            class="filter-checkbox"
          >
            <input
              type="checkbox"
              :value="mat"
              v-model="localMaterials"
              @change="emitFilters"
              class="rounded-sm border-brown-300 text-gold focus:ring-gold/20"
            />
            <span class="font-body text-sm text-brown-700 cursor-pointer hover:text-brown-900">{{ mat }}</span>
          </label>
        </div>
      </div>

      <!-- Color -->
      <div v-if="options.colors.length" class="bg-white p-4 rounded-sm shadow-sm">
        <h3 class="font-display text-sm font-semibold text-brown-900 mb-3 flex items-center justify-between">
          Цвет
          <button v-if="localColors.length" @click="localColors = []; emitFilters()" class="text-xs text-gold hover:underline">
            Сбросить
          </button>
        </h3>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="color in options.colors"
            :key="color"
            class="flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium transition-all"
            :class="localColors.includes(color)
              ? 'border-gold bg-gold/10 text-gold'
              : 'border-cream-300 text-brown-600 hover:border-brown-400'"
            @click="toggleColor(color)"
          >
            <span
              class="w-3.5 h-3.5 rounded-full border border-brown-200/40 flex-shrink-0"
              :style="{ backgroundColor: colorMap[color] || '#ccc' }"
            ></span>
            {{ color }}
          </button>
        </div>
      </div>

      <!-- Brand -->
      <div v-if="options.brands.length" class="bg-white p-4 rounded-sm shadow-sm">
        <h3 class="font-display text-sm font-semibold text-brown-900 mb-3 flex items-center justify-between">
          Производитель
          <button v-if="localBrands.length" @click="localBrands = []; emitFilters()" class="text-xs text-gold hover:underline">
            Сбросить
          </button>
        </h3>
        <div class="space-y-2">
          <label
            v-for="brand in options.brands"
            :key="brand"
            class="filter-checkbox"
          >
            <input
              type="checkbox"
              :value="brand"
              v-model="localBrands"
              @change="emitFilters"
              class="rounded-sm border-brown-300 text-gold focus:ring-gold/20"
            />
            <span class="font-body text-sm text-brown-700 cursor-pointer hover:text-brown-900">{{ brand }}</span>
          </label>
        </div>
      </div>

      <!-- Reset all -->
      <button
        v-if="activeCount > 0"
        class="btn-outline w-full text-sm"
        @click="resetAll"
      >
        Сбросить все фильтры
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import type { FilterState, Category } from '~/types'

const props = defineProps<{
  category?: string
  options: {
    materials: string[]
    colors: string[]
    brands: string[]
  }
  categories?: Category[]
  modelValue: Partial<FilterState>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Partial<FilterState>]
}>()

const { format } = useFormatPrice()

const absoluteMin = 0
const absoluteMax = 2000000

const filtersOpen = ref(false)

const localMin = ref(props.modelValue.priceMin ?? absoluteMin)
const localMax = ref(props.modelValue.priceMax ?? absoluteMax)
const localMaterials = ref<string[]>(props.modelValue.materials ?? [])
const localColors = ref<string[]>(props.modelValue.colors ?? [])
const localBrands = ref<string[]>(props.modelValue.brands ?? [])
const localCategory = ref(props.modelValue.category ?? '')

const activeCount = computed(() => {
  let count = 0
  if (localMin.value > absoluteMin || localMax.value < absoluteMax) count++
  if (localMaterials.value.length) count += localMaterials.value.length
  if (localColors.value.length) count += localColors.value.length
  if (localBrands.value.length) count += localBrands.value.length
  return count
})

const categories = props.categories ?? [
  { id: 1, name: 'Межкомнатные', slug: 'mezhkomnatnye', icon: '🚪' },
  { id: 2, name: 'Входные', slug: 'vhodnye', icon: '🏠' },
  { id: 3, name: 'Ручки', slug: 'ruchki', icon: '🔑' },
  { id: 4, name: 'Замки', slug: 'zamki', icon: '🔒' },
  { id: 5, name: 'Фурнитура', slug: 'furnitura', icon: '⚙️' },
  { id: 6, name: 'Пороги', slug: 'porogi', icon: '📏' },
]

const colorMap: Record<string, string> = {
  'Белый': '#F5F0E8',
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

const emitFilters = () => {
  emit('update:modelValue', {
    priceMin: localMin.value,
    priceMax: localMax.value,
    materials: localMaterials.value,
    colors: localColors.value,
    brands: localBrands.value,
    category: localCategory.value || undefined,
  })
}

const onMinChange = () => {
  if (localMin.value > localMax.value) localMin.value = localMax.value
  emitFilters()
}

const onMaxChange = () => {
  if (localMax.value < localMin.value) localMax.value = localMin.value
  emitFilters()
}

const resetPrice = () => {
  localMin.value = absoluteMin
  localMax.value = absoluteMax
  emitFilters()
}

const toggleColor = (color: string) => {
  const idx = localColors.value.indexOf(color)
  if (idx === -1) localColors.value.push(color)
  else localColors.value.splice(idx, 1)
  emitFilters()
}

const selectCategory = (slug: string) => {
  localCategory.value = localCategory.value === slug ? '' : slug
  emitFilters()
}

const resetAll = () => {
  localMin.value = absoluteMin
  localMax.value = absoluteMax
  localMaterials.value = []
  localColors.value = []
  localBrands.value = []
  localCategory.value = ''
  emitFilters()
}
</script>
