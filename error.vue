<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-cream-200 px-4">
    <div class="text-center max-w-md">
      <div class="font-display text-8xl font-bold text-gold/30 mb-4">{{ error.statusCode }}</div>
      <h1 class="font-display text-2xl font-semibold text-brown-900 mb-3">
        {{ error.statusCode === 404 ? 'Страница не найдена' : 'Что-то пошло не так' }}
      </h1>
      <p class="font-body text-brown-500 mb-8">
        {{ error.statusCode === 404
          ? 'Запрашиваемая страница не существует или была удалена.'
          : 'Произошла непредвиденная ошибка. Попробуйте обновить страницу.'
        }}
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <NuxtLink to="/" class="btn-primary">На главную</NuxtLink>
        <button class="btn-outline" @click="handleError">Попробовать снова</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const handleError = () => clearError({ redirect: '/' })
</script>
