<template>
  <Teleport to="body">
    <!-- Overlay -->
    <Transition name="overlay">
      <div
        v-if="cartStore.isOpen"
        class="fixed inset-0 bg-brown-900/50 backdrop-blur-sm z-50"
        @click="cartStore.closeDrawer()"
      />
    </Transition>

    <!-- Drawer -->
    <Transition name="cart-drawer">
      <div
        v-if="cartStore.isOpen"
        class="fixed top-0 right-0 h-full w-full sm:w-96 bg-white z-50 flex flex-col shadow-2xl"
      >
        <!-- Header -->
        <div class="flex items-center justify-between px-5 py-4 bg-brown-900 text-white flex-shrink-0">
          <div class="flex items-center gap-3">
            <svg class="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            <h2 class="font-display text-lg font-semibold">Корзина</h2>
            <span class="text-xs text-gold/80 font-body">{{ cartStore.count }} товара</span>
          </div>
          <button
            class="w-8 h-8 rounded-sm flex items-center justify-center text-cream-300/70 hover:text-white hover:bg-white/10 transition-all"
            @click="cartStore.closeDrawer()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Empty state -->
        <div v-if="cartStore.isEmpty" class="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div class="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-brown-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
          </div>
          <h3 class="font-display text-xl font-semibold text-brown-900 mb-2">Корзина пуста</h3>
          <p class="text-sm text-brown-500 mb-6">Добавьте товары из каталога</p>
          <NuxtLink to="/catalog" class="btn-primary" @click="cartStore.closeDrawer()">
            Перейти в каталог
          </NuxtLink>
        </div>

        <!-- Items list -->
        <div v-else class="flex-1 overflow-y-auto scrollbar-thin px-4 py-3">
          <TransitionGroup name="list" tag="ul" class="space-y-3">
            <li
              v-for="item in cartStore.items"
              :key="item.product.id"
              class="flex gap-3 p-3 bg-cream-50 rounded-sm border border-cream-300/50"
            >
              <!-- Image -->
              <div class="w-16 h-16 rounded-sm overflow-hidden bg-cream-200 flex-shrink-0">
                <img
                  :src="getImageUrl(item.product.images?.[0], { width: 128, height: 128 })"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                />
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <NuxtLink
                  :to="`/catalog/${item.product.slug}`"
                  class="font-body text-sm font-semibold text-brown-900 hover:text-gold transition-colors line-clamp-2 leading-snug"
                  @click="cartStore.closeDrawer()"
                >
                  {{ item.product.name }}
                </NuxtLink>
                <div class="text-xs text-brown-500 mt-0.5">{{ item.product.brand }}</div>

                <div class="flex items-center justify-between mt-2">
                  <!-- Quantity -->
                  <div class="flex items-center gap-1">
                    <button
                      class="w-6 h-6 rounded-sm bg-white border border-cream-300 flex items-center justify-center text-brown-700 hover:border-gold hover:text-gold transition-colors text-sm font-bold"
                      @click="cartStore.updateQuantity(item.product.id, item.quantity - 1)"
                    >
                      −
                    </button>
                    <span class="w-7 text-center text-sm font-semibold text-brown-900">{{ item.quantity }}</span>
                    <button
                      class="w-6 h-6 rounded-sm bg-white border border-cream-300 flex items-center justify-center text-brown-700 hover:border-gold hover:text-gold transition-colors text-sm font-bold"
                      @click="cartStore.updateQuantity(item.product.id, item.quantity + 1)"
                    >
                      +
                    </button>
                  </div>

                  <!-- Price -->
                  <span class="font-display text-sm font-semibold text-brown-900">
                    {{ formatPrice(item.product.price * item.quantity) }}
                  </span>
                </div>
              </div>

              <!-- Remove -->
              <button
                class="self-start mt-0.5 text-brown-300 hover:text-red-500 transition-colors flex-shrink-0"
                @click="cartStore.remove(item.product.id)"
                aria-label="Удалить"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </li>
          </TransitionGroup>
        </div>

        <!-- Footer -->
        <div v-if="!cartStore.isEmpty" class="flex-shrink-0 px-5 py-4 border-t border-cream-300 bg-white">
          <!-- Total -->
          <div class="flex items-center justify-between mb-1">
            <span class="font-body text-sm text-brown-600">Итого</span>
            <span class="font-display text-xl font-semibold text-brown-900">{{ cartStore.formattedTotal }}</span>
          </div>
          <p class="text-xs text-brown-400 mb-4">Без учёта доставки</p>

          <!-- Actions -->
          <div class="space-y-2.5">
            <NuxtLink
              to="/cart"
              class="btn-primary w-full"
              @click="cartStore.closeDrawer()"
            >
              Оформить заказ
            </NuxtLink>
            <button
              class="btn-ghost w-full text-brown-500 hover:text-red-500"
              @click="cartStore.clear()"
            >
              Очистить корзину
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()
const { getImageUrl } = useImageUrl()
const { format } = useFormatPrice()

const formatPrice = (price: number) => format(price)
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
