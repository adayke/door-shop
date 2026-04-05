<template>
  <header
    class="sticky top-0 z-50 transition-all duration-300"
    :class="
      scrolled
        ? 'bg-brown-900 shadow-luxury'
        : 'bg-brown-900/95 backdrop-blur-sm'
    "
  >
    <!-- Top bar -->
    <div class="border-b border-white/5 hidden md:block">
      <div class="page-container">
        <div
          class="flex items-center justify-between py-2 text-xs text-cream-300/70"
        >
          <div class="flex items-center gap-6">
            <a
              href="tel:+77001234567"
              class="flex items-center gap-1.5 hover:text-gold transition-colors"
            >
              <svg
                class="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +7 (700) 123-45-67
            </a>
            <span class="text-white/20">|</span>
            <span>Пн–Пт: 9:00–19:00, Сб: 10:00–17:00</span>
          </div>
          <div class="flex items-center gap-4">
            <a href="/delivery" class="hover:text-gold transition-colors"
              >Доставка</a
            >
            <a href="/about" class="hover:text-gold transition-colors">О нас</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Main header -->
    <div class="page-container">
      <div class="flex items-center justify-between py-4 gap-4">
        <!-- Logo -->
        <NuxtLink to="/" class="flex-shrink-0 flex items-center gap-3 group">
          <div
            class="w-10 h-10 rounded-sm bg-gold flex items-center justify-center shadow-gold transition-transform group-hover:scale-105"
          >
            <svg
              class="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h10v10H7V7zm2 2v6h6V9H9z"
              />
            </svg>
          </div>
          <div>
            <div
              class="font-display text-xl font-semibold text-white leading-tight tracking-wide"
            >
              АйбоЛюкс
            </div>
            <div
              class="text-xs text-gold/80 tracking-widest uppercase font-body"
            >
              Premium Doors
            </div>
          </div>
        </NuxtLink>

        <!-- Desktop nav -->
        <nav class="hidden lg:flex items-center gap-8">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="font-body text-sm font-medium text-cream-300/80 hover:text-gold transition-colors duration-200 tracking-wide"
            active-class="!text-gold"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Actions -->
        <div class="flex items-center gap-1">
          <!-- Search (desktop) -->
          <div class="hidden md:flex items-center relative">
            <Transition name="fade">
              <input
                v-if="searchOpen"
                v-model="searchQuery"
                type="text"
                placeholder="Поиск товаров..."
                class="w-56 px-4 py-2 bg-white/10 text-white placeholder-white/40 text-sm font-body rounded-sm border border-white/20 focus:outline-none focus:border-gold/60 transition-all"
                @keyup.enter="handleSearch"
                @keyup.esc="searchOpen = false"
              />
            </Transition>
            <button
              class="p-2.5 text-cream-300/70 hover:text-gold transition-colors rounded-sm"
              @click="toggleSearch"
              aria-label="Поиск"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <!-- Favorites -->
          <NuxtLink
            to="/favorites"
            class="relative p-2.5 text-cream-300/70 hover:text-gold transition-colors rounded-sm"
            aria-label="Избранное"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span
              v-if="favoritesCount > 0"
              class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center"
            >
              {{ favoritesCount }}
            </span>
          </NuxtLink>

          <!-- Cart button -->
          <button
            class="relative p-2.5 text-cream-300/70 hover:text-gold transition-colors rounded-sm"
            aria-label="Корзина"
            @click="cartStore.openDrawer()"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <Transition name="fade">
              <span
                v-if="cartCount > 0"
                class="absolute -top-0.5 -right-0.5 w-4 h-4 bg-gold text-white text-[10px] font-bold rounded-full flex items-center justify-center"
              >
                {{ cartCount > 9 ? "9+" : cartCount }}
              </span>
            </Transition>
          </button>

          <!-- Mobile menu -->
          <button
            class="lg:hidden p-2.5 text-cream-300/70 hover:text-gold transition-colors rounded-sm ml-1"
            @click="mobileOpen = !mobileOpen"
            aria-label="Меню"
          >
            <svg
              class="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                v-if="!mobileOpen"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
              <path
                v-else
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile nav -->
    <Transition name="slide-down">
      <div
        v-if="mobileOpen"
        class="lg:hidden bg-brown-900 border-t border-white/10"
      >
        <nav class="page-container py-4 flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-3 font-body text-sm font-medium text-cream-300/80 hover:text-gold hover:bg-white/5 rounded-sm transition-colors"
            active-class="!text-gold bg-white/5"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <div
            class="mt-3 pt-3 border-t border-white/10 flex flex-col gap-2 px-4"
          >
            <a
              href="tel:+77001234567"
              class="text-sm text-cream-300/70 flex items-center gap-2"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +7 (700) 123-45-67
            </a>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { useCartStore } from "~/stores/cart";
import { useFavoritesStore } from "~/stores/favorites";

const cartStore = useCartStore();
const favoritesStore = useFavoritesStore();
const router = useRouter();

const cartCount = computed(() => cartStore.count);
const favoritesCount = computed(() => favoritesStore.count);

const scrolled = ref(false);
const mobileOpen = ref(false);
const searchOpen = ref(false);
const searchQuery = ref("");

const navLinks = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/delivery", label: "Доставка" },
  { to: "/about", label: "О нас" },
  { to: "/contacts", label: "Контакты" },
];

const toggleSearch = () => {
  searchOpen.value = !searchOpen.value;
  if (!searchOpen.value) searchQuery.value = "";
};

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    router.push({ path: "/catalog", query: { q: searchQuery.value } });
    searchOpen.value = false;
    searchQuery.value = "";
  }
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 20;
  });
});
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}

.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}

.slide-down-enter-to,
.slide-down-leave-from {
  max-height: 400px;
  opacity: 1;
}
</style>
