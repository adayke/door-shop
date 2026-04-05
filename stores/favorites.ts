import { defineStore } from 'pinia'
import type { Product } from '~/types'

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as Product[],
  }),

  getters: {
    count: (state): number => state.items.length,

    ids: (state): number[] => state.items.map(p => p.id),

    isFavorite: (state) => (id: number): boolean =>
      state.items.some(p => p.id === id),
  },

  actions: {
    toggle(product: Product) {
      const idx = this.items.findIndex(p => p.id === product.id)
      if (idx === -1) {
        this.items.push(product)
      } else {
        this.items.splice(idx, 1)
      }
    },

    remove(id: number) {
      this.items = this.items.filter(p => p.id !== id)
    },
  },

  persist: import.meta.client ? { storage: localStorage } : false,
})
