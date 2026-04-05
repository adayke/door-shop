<script setup lang="ts">
import { useCartStore } from "~/stores/cart";

useHead({
  title: "Корзина — АйбоЛюкс",
  meta: [{ name: "robots", content: "noindex" }],
});

const cartStore = useCartStore();
const { getImageUrl } = useImageUrl();
const { format } = useFormatPrice();

const form = reactive({
  name: "",
  phone: "",
  email: "",
  address: "",
  comment: "",
  agree: false,
});

const loading = ref(false);
const success = ref(false);
const errors = reactive<Record<string, string>>({});

const validate = () => {
  Object.keys(errors).forEach((k) => delete errors[k]);
  if (!form.name.trim()) errors.name = "Введите имя";
  if (!form.phone.trim()) errors.phone = "Введите телефон";
  else if (!/^\+?[\d\s\-()]{10,}$/.test(form.phone))
    errors.phone = "Неверный формат телефона";
  if (!form.agree) errors.agree = "Необходимо принять условия";
  return Object.keys(errors).length === 0;
};

const submit = async () => {
  if (!validate()) return;
  loading.value = true;
  try {
    await $fetch("/api/orders", {
      method: "POST",
      body: {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address,
        comment: form.comment,
        items: cartStore.items.map((item) => ({
          product_id: item.product.id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price,
        })),
        total: cartStore.total,
      },
    });
    success.value = true;
    cartStore.clear();
  } catch {
    errors.submit = "Произошла ошибка. Пожалуйста, позвоните нам.";
  } finally {
    loading.value = false;
  }
};

const formatPhone = (e: Event) => {
  const input = e.target as HTMLInputElement;
  let value = input.value.replace(/\D/g, "");
  if (value.startsWith("7") || value.startsWith("8")) {
    value =
      "+7 (" +
      value.slice(1, 4) +
      ") " +
      value.slice(4, 7) +
      "-" +
      value.slice(7, 9) +
      "-" +
      value.slice(9, 11);
  }
  form.phone = value.trim();
};
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
          <span class="text-cream-300/70">Корзина</span>
        </nav>
      </div>
    </div>

    <div class="page-container py-10">
      <h1 class="section-title mb-8">Корзина</h1>

      <!-- Success state -->
      <div v-if="success" class="max-w-xl mx-auto text-center py-20">
        <div
          class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <svg
            class="w-10 h-10 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 class="font-display text-2xl font-semibold text-brown-900 mb-3">
          Заказ принят!
        </h2>
        <p class="font-body text-brown-600 mb-8">
          Спасибо за ваш заказ! Наш менеджер свяжется с вами в ближайшее время
          для подтверждения.
        </p>
        <NuxtLink to="/catalog" class="btn-primary"
          >Продолжить покупки</NuxtLink
        >
      </div>

      <!-- Empty cart -->
      <div v-else-if="cartStore.isEmpty" class="text-center py-20">
        <div
          class="w-24 h-24 bg-cream-200 rounded-full flex items-center justify-center mx-auto mb-5"
        >
          <svg
            class="w-12 h-12 text-brown-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 class="font-display text-2xl font-semibold text-brown-900 mb-3">
          Корзина пуста
        </h2>
        <p class="font-body text-brown-500 mb-8">
          Добавьте товары из нашего каталога
        </p>
        <NuxtLink to="/catalog" class="btn-primary">Перейти в каталог</NuxtLink>
      </div>

      <!-- Cart content -->
      <div v-else class="grid lg:grid-cols-3 gap-8">
        <!-- Items -->
        <div class="lg:col-span-2 space-y-4">
          <TransitionGroup name="list" tag="div" class="space-y-3">
            <div
              v-for="item in cartStore.items"
              :key="item.product.id"
              class="bg-white rounded-sm shadow-sm border border-cream-300/50 p-4 flex gap-4"
            >
              <!-- Image -->
              <NuxtLink
                :to="`/catalog/${item.product.slug}`"
                class="flex-shrink-0"
              >
                <div class="w-24 h-20 rounded-sm overflow-hidden bg-cream-200">
                  <img
                    :src="
                      getImageUrl(item.product.images?.[0], {
                        width: 192,
                        height: 160,
                      })
                    "
                    :alt="item.product.name"
                    class="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </NuxtLink>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0">
                    <NuxtLink
                      :to="`/catalog/${item.product.slug}`"
                      class="font-body text-sm font-semibold text-brown-900 hover:text-gold transition-colors line-clamp-2 leading-snug"
                    >
                      {{ item.product.name }}
                    </NuxtLink>
                    <div class="text-xs text-brown-400 mt-0.5">
                      {{
                        [item.product.brand, item.product.material]
                          .filter(Boolean)
                          .join(" · ")
                      }}
                    </div>
                  </div>
                  <button
                    class="flex-shrink-0 text-brown-300 hover:text-red-400 transition-colors"
                    @click="cartStore.remove(item.product.id)"
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
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>

                <div class="flex items-center justify-between mt-3">
                  <!-- Quantity -->
                  <div
                    class="flex items-center border border-cream-300 rounded-sm overflow-hidden"
                  >
                    <button
                      class="w-8 h-8 flex items-center justify-center text-brown-600 hover:text-gold hover:bg-cream-100 transition-colors font-bold"
                      @click="
                        cartStore.updateQuantity(
                          item.product.id,
                          item.quantity - 1,
                        )
                      "
                    >
                      −
                    </button>
                    <span
                      class="w-10 text-center text-sm font-semibold text-brown-900 font-body"
                      >{{ item.quantity }}</span
                    >
                    <button
                      class="w-8 h-8 flex items-center justify-center text-brown-600 hover:text-gold hover:bg-cream-100 transition-colors font-bold"
                      @click="
                        cartStore.updateQuantity(
                          item.product.id,
                          item.quantity + 1,
                        )
                      "
                    >
                      +
                    </button>
                  </div>

                  <!-- Price -->
                  <div class="text-right">
                    <div
                      class="font-display font-semibold text-base text-brown-900"
                    >
                      {{ format(item.product.price * item.quantity) }}
                    </div>
                    <div
                      v-if="item.quantity > 1"
                      class="text-xs text-brown-400"
                    >
                      {{ format(item.product.price) }} / шт.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Clear cart -->
          <div class="text-right">
            <button
              class="text-sm text-brown-400 hover:text-red-500 transition-colors font-body"
              @click="cartStore.clear()"
            >
              Очистить корзину
            </button>
          </div>
        </div>

        <!-- Order form + summary -->
        <div class="space-y-5">
          <!-- Summary -->
          <div
            class="bg-white rounded-sm shadow-sm border border-cream-300/50 p-5"
          >
            <h2 class="font-display text-lg font-semibold text-brown-900 mb-4">
              Итого
            </h2>
            <div class="space-y-2.5 mb-4">
              <div class="flex justify-between text-sm font-body">
                <span class="text-brown-500"
                  >Товаров: {{ cartStore.count }}</span
                >
                <span class="text-brown-900 font-semibold">{{
                  cartStore.formattedTotal
                }}</span>
              </div>
              <div class="flex justify-between text-sm font-body">
                <span class="text-brown-500">Доставка</span>
                <span class="text-green-600 font-semibold">Уточняется</span>
              </div>
            </div>
            <div class="pt-4 border-t border-cream-300 flex justify-between">
              <span class="font-display font-semibold text-brown-900"
                >Итого</span
              >
              <span class="font-display text-xl font-bold text-brown-900">{{
                cartStore.formattedTotal
              }}</span>
            </div>
          </div>

          <!-- Form -->
          <div
            class="bg-white rounded-sm shadow-sm border border-cream-300/50 p-5"
          >
            <h2 class="font-display text-lg font-semibold text-brown-900 mb-5">
              Ваши данные
            </h2>
            <form @submit.prevent="submit" class="space-y-4">
              <div>
                <label
                  class="block text-xs font-semibold text-brown-700 mb-1.5 font-body"
                >
                  Имя <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.name"
                  type="text"
                  placeholder="Иван Иванов"
                  class="input"
                  :class="{
                    'border-red-400 focus:border-red-400': errors.name,
                  }"
                />
                <p v-if="errors.name" class="mt-1 text-xs text-red-500">
                  {{ errors.name }}
                </p>
              </div>

              <div>
                <label
                  class="block text-xs font-semibold text-brown-700 mb-1.5 font-body"
                >
                  Телефон <span class="text-red-500">*</span>
                </label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="+7 (700) 000-00-00"
                  class="input"
                  :class="{
                    'border-red-400 focus:border-red-400': errors.phone,
                  }"
                  @input="formatPhone"
                />
                <p v-if="errors.phone" class="mt-1 text-xs text-red-500">
                  {{ errors.phone }}
                </p>
              </div>

              <div>
                <label
                  class="block text-xs font-semibold text-brown-700 mb-1.5 font-body"
                  >Email</label
                >
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="mail@example.com"
                  class="input"
                />
              </div>

              <div>
                <label
                  class="block text-xs font-semibold text-brown-700 mb-1.5 font-body"
                  >Адрес доставки</label
                >
                <input
                  v-model="form.address"
                  type="text"
                  placeholder="г. Астана, ул. Абая, 1"
                  class="input"
                />
              </div>

              <div>
                <label
                  class="block text-xs font-semibold text-brown-700 mb-1.5 font-body"
                  >Комментарий</label
                >
                <textarea
                  v-model="form.comment"
                  rows="3"
                  placeholder="Уточните детали заказа..."
                  class="input resize-none"
                ></textarea>
              </div>

              <label class="flex items-start gap-3 cursor-pointer group">
                <input
                  v-model="form.agree"
                  type="checkbox"
                  class="mt-0.5 w-4 h-4 rounded-sm border-brown-300 text-gold focus:ring-gold/20 cursor-pointer flex-shrink-0"
                />
                <span class="text-xs text-brown-500 font-body leading-relaxed">
                  Я принимаю
                  <a href="#" class="text-gold hover:underline"
                    >условия использования</a
                  >
                  и согласен с
                  <a href="#" class="text-gold hover:underline"
                    >политикой конфиденциальности</a
                  >
                </span>
              </label>
              <p v-if="errors.agree" class="text-xs text-red-500 -mt-2">
                {{ errors.agree }}
              </p>

              <p v-if="errors.submit" class="text-sm text-red-500 text-center">
                {{ errors.submit }}
              </p>

              <button
                type="submit"
                class="btn-primary w-full py-4 text-base"
                :disabled="loading"
              >
                <svg
                  v-if="loading"
                  class="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  />
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {{ loading ? "Отправка..." : "Оформить заказ" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
  height: 0;
  margin: 0;
  padding: 0;
}
</style>
