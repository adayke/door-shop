import { defineStore } from 'pinia'
import type { CartItem, Product } from '~/types'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    isOpen: false,
  }),

  getters: {
    count: (state): number =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),

    total: (state): number =>
      state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),

    isEmpty: (state): boolean => state.items.length === 0,

    formattedTotal(): string {
      return this.total.toLocaleString('ru-RU') + ' ₸'
    },
  },

  actions: {
    add(product: Product, quantity = 1) {
      const existing = this.items.find(item => item.product.id === product.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        this.items.push({ product, quantity })
      }
      this.isOpen = true
    },

    remove(productId: number) {
      this.items = this.items.filter(item => item.product.id !== productId)
    },

    updateQuantity(productId: number, quantity: number) {
      if (quantity <= 0) {
        this.remove(productId)
        return
      }
      const item = this.items.find(item => item.product.id === productId)
      if (item) item.quantity = quantity
    },

    clear() {
      this.items = []
    },

    toggleDrawer() {
      this.isOpen = !this.isOpen
    },

    openDrawer() {
      this.isOpen = true
    },

    closeDrawer() {
      this.isOpen = false
    },
  },

  persist: import.meta.client
    ? { storage: localStorage, pick: ['items'] }
    : false,
})
