<script setup lang="ts">
import type { FilterState, Product } from "~/types";

const route = useRoute();
const router = useRouter();
const { getProducts, getFilterOptions } = useDirectus();
const { format } = useFormatPrice();

useHead({
  title: "Каталог дверей и фурнитуры — ЭталонЛюкс",
  meta: [
    {
      name: "description",
      content:
        "Широкий каталог дверей: межкомнатные, входные, ручки, замки, фурнитура. Фильтры по цене, материалу, бренду.",
    },
    { property: "og:title", content: "Каталог — ЭталонЛюкс" },
  ],
});

// Filter state from URL
const filters = reactive<FilterState>({
  priceMin: Number(route.query.priceMin) || 0,
  priceMax: Number(route.query.priceMax) || 2000000,
  materials: route.query.materials
    ? String(route.query.materials).split(",")
    : [],
  colors: route.query.colors ? String(route.query.colors).split(",") : [],
  brands: route.query.brands ? String(route.query.brands).split(",") : [],
  category: String(route.query.category || ""),
  sort: (route.query.sort as FilterState["sort"]) || "popular",
  page: Number(route.query.page) || 1,
  perPage: 12,
});

// Sync filters to URL
const syncUrl = () => {
  const query: Record<string, string> = {};
  if (filters.priceMin > 0) query.priceMin = String(filters.priceMin);
  if (filters.priceMax < 2000000) query.priceMax = String(filters.priceMax);
  if (filters.materials.length) query.materials = filters.materials.join(",");
  if (filters.colors.length) query.colors = filters.colors.join(",");
  if (filters.brands.length) query.brands = filters.brands.join(",");
  if (filters.category) query.category = filters.category;
  if (filters.sort !== "popular") query.sort = filters.sort;
  if (filters.page > 1) query.page = String(filters.page);
  router.replace({ query });
};

// Fetch filter options
const { data: optionsData } = await useAsyncData("filter-options", () =>
  getFilterOptions(),
);

const filterOptions = computed(
  () => optionsData.value ?? { materials: [], colors: [], brands: [] },
);

// Fetch products
const {
  data: productsData,
  pending,
  refresh,
} = await useAsyncData("catalog-products", () => getProducts(filters), {
  watch: [() => ({ ...filters })],
});

const products = computed<Product[]>(() => productsData.value?.data ?? []);
const totalCount = computed(() => productsData.value?.meta?.filter_count ?? 0);
const totalPages = computed(() =>
  Math.ceil(totalCount.value / filters.perPage),
);

// Handle filter updates
const onFilterUpdate = (updated: Partial<FilterState>) => {
  Object.assign(filters, updated);
  filters.page = 1;
  syncUrl();
};

// Handle sort change
const onSortChange = (sort: FilterState["sort"]) => {
  filters.sort = sort;
  filters.page = 1;
  syncUrl();
};

// Pagination
const goToPage = (page: number) => {
  if (page < 1 || page > totalPages.value) return;
  filters.page = page;
  syncUrl();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// Visible pages for pagination
const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = filters.page;
  const pages: (number | "...")[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) pages.push("...");
    for (
      let i = Math.max(2, current - 1);
      i <= Math.min(total - 1, current + 1);
      i++
    ) {
      pages.push(i);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
  }
  return pages;
});

const breadcrumbs = computed(() => [
  { label: "Главная", to: "/" },
  { label: filters.category ? "Категория" : "Каталог", to: "/catalog" },
]);

const sortOptions = [
  { value: "popular", label: "По популярности" },
  { value: "price_asc", label: "Цена: дешевле" },
  { value: "price_desc", label: "Цена: дороже" },
  { value: "newest", label: "Новинки" },
];
</script>

<template>
  <div>
    <!-- Breadcrumb -->
    <div class="bg-brown-900 py-3">
      <div class="page-container">
        <nav class="flex items-center gap-2 text-xs font-body">
          <NuxtLink
            to="/"
            class="text-cream-300/50 hover:text-gold transition-colors"
            >Главная</NuxtLink
          >
          <svg
            class="w-3 h-3 text-cream-300/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
          <span class="text-cream-300/70">Каталог</span>
        </nav>
      </div>
    </div>

    <div class="page-container py-10">
      <!-- Page header -->
      <div
        class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8"
      >
        <div>
          <h1 class="section-title">Каталог</h1>
          <p class="font-body text-sm text-brown-500 mt-1">
            <span v-if="!pending"
              >{{ totalCount.toLocaleString("ru-RU") }} товаров</span
            >
            <span v-else>Загрузка...</span>
          </p>
        </div>

        <!-- Sort -->
        <div class="flex items-center gap-3">
          <span
            class="font-body text-sm text-brown-500 whitespace-nowrap hidden sm:block"
            >Сортировка:</span
          >
          <div class="relative">
            <select
              :value="filters.sort"
              @change="
                onSortChange(
                  ($event.target as HTMLSelectElement)
                    .value as FilterState['sort'],
                )
              "
              class="select pr-8 text-sm min-w-[180px]"
            >
              <option
                v-for="opt in sortOptions"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
            <svg
              class="absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brown-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div class="flex gap-8">
        <!-- Sidebar filters -->
        <div class="w-64 flex-shrink-0 hidden lg:block">
          <ProductFilters
            :options="filterOptions"
            :model-value="filters"
            @update:model-value="onFilterUpdate"
          />
        </div>

        <!-- Main content -->
        <div class="flex-1 min-w-0">
          <!-- Mobile filters -->
          <div class="lg:hidden mb-5">
            <ProductFilters
              :options="filterOptions"
              :model-value="filters"
              @update:model-value="onFilterUpdate"
            />
          </div>

          <!-- Active filters chips -->
          <div
            v-if="
              filters.materials.length ||
              filters.colors.length ||
              filters.brands.length
            "
            class="flex flex-wrap gap-2 mb-5"
          >
            <span class="text-xs text-brown-500 font-body self-center mr-1"
              >Активные фильтры:</span
            >
            <button
              v-for="mat in filters.materials"
              :key="`mat-${mat}`"
              class="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full hover:bg-gold/20 transition-colors"
              @click="
                filters.materials = filters.materials.filter((m) => m !== mat);
                syncUrl();
              "
            >
              {{ mat }}
              <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              v-for="color in filters.colors"
              :key="`col-${color}`"
              class="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full hover:bg-gold/20 transition-colors"
              @click="
                filters.colors = filters.colors.filter((c) => c !== color);
                syncUrl();
              "
            >
              {{ color }}
              <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <button
              v-for="brand in filters.brands"
              :key="`brand-${brand}`"
              class="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-xs font-semibold rounded-full hover:bg-gold/20 transition-colors"
              @click="
                filters.brands = filters.brands.filter((b) => b !== brand);
                syncUrl();
              "
            >
              {{ brand }}
              <svg
                class="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <!-- Products grid -->
          <div
            v-if="pending"
            class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <div
              v-for="i in 12"
              :key="i"
              class="bg-white rounded-sm overflow-hidden animate-pulse shadow-sm"
            >
              <div class="aspect-[4/3] bg-cream-200"></div>
              <div class="p-4 space-y-2.5">
                <div class="h-3 bg-cream-200 rounded w-1/3"></div>
                <div class="h-4 bg-cream-200 rounded"></div>
                <div class="h-4 bg-cream-200 rounded w-3/4"></div>
                <div class="h-px bg-cream-200 mt-3"></div>
                <div class="flex justify-between items-center">
                  <div class="h-6 bg-cream-200 rounded w-1/2"></div>
                  <div class="w-9 h-9 bg-cream-200 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-else-if="products.length"
            class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <ProductCard
              v-for="product in products"
              :key="product.id"
              :product="product"
            />
          </div>

          <!-- Empty state -->
          <div v-else class="text-center py-20">
            <div
              class="w-20 h-20 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <svg
                class="w-10 h-10 text-brown-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 class="font-display text-xl font-semibold text-brown-800 mb-2">
              Ничего не найдено
            </h3>
            <p class="text-sm text-brown-500 mb-6">
              Попробуйте изменить параметры фильтрации
            </p>
            <button
              class="btn-outline"
              @click="
                onFilterUpdate({
                  priceMin: 0,
                  priceMax: 2000000,
                  materials: [],
                  colors: [],
                  brands: [],
                  category: '',
                })
              "
            >
              Сбросить фильтры
            </button>
          </div>

          <!-- Pagination -->
          <div
            v-if="totalPages > 1"
            class="flex items-center justify-center gap-2 mt-12"
          >
            <!-- Prev -->
            <button
              class="w-10 h-10 flex items-center justify-center rounded-sm border transition-all text-sm font-body"
              :class="
                filters.page === 1
                  ? 'border-cream-300 text-brown-300 cursor-not-allowed'
                  : 'border-cream-300 text-brown-700 hover:border-gold hover:text-gold'
              "
              :disabled="filters.page === 1"
              @click="goToPage(filters.page - 1)"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <!-- Pages -->
            <template v-for="page in visiblePages" :key="page">
              <span
                v-if="page === '...'"
                class="w-10 h-10 flex items-center justify-center text-brown-400 text-sm"
              >
                ···
              </span>
              <button
                v-else
                class="w-10 h-10 flex items-center justify-center rounded-sm border text-sm font-body font-medium transition-all"
                :class="
                  filters.page === page
                    ? 'bg-gold border-gold text-white shadow-gold'
                    : 'border-cream-300 text-brown-700 hover:border-gold hover:text-gold'
                "
                @click="goToPage(page as number)"
              >
                {{ page }}
              </button>
            </template>

            <!-- Next -->
            <button
              class="w-10 h-10 flex items-center justify-center rounded-sm border transition-all text-sm font-body"
              :class="
                filters.page === totalPages
                  ? 'border-cream-300 text-brown-300 cursor-not-allowed'
                  : 'border-cream-300 text-brown-700 hover:border-gold hover:text-gold'
              "
              :disabled="filters.page === totalPages"
              @click="goToPage(filters.page + 1)"
            >
              <svg
                class="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
