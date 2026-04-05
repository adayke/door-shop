<script setup lang="ts">
useHead({
  title: "Доставка и оплата — ЭталонЛюкс",
  meta: [
    {
      name: "description",
      content:
        "Информация о доставке и оплате в ЭталонЛюкс. Доставка по Астана и Казахстану. Наличные, карта, рассрочка.",
    },
    { property: "og:title", content: "Доставка и оплата — ЭталонЛюкс" },
  ],
});
</script>

<template>
  <div>
    <div class="bg-brown-900 py-16">
      <div class="page-container text-center">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="h-px w-12 bg-gold/40"></div>
          <span
            class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body"
            >Сервис</span
          >
          <div class="h-px w-12 bg-gold/40"></div>
        </div>
        <h1
          class="font-display text-4xl md:text-5xl font-semibold text-white mb-4"
        >
          Доставка и оплата
        </h1>
        <p class="font-body text-cream-300/70 text-base max-w-lg mx-auto">
          Удобная доставка по всему Казахстану и несколько способов оплаты
        </p>
      </div>
    </div>

    <div class="page-container py-16">
      <!-- Delivery -->
      <section class="mb-16">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-px w-10 bg-gold/40"></div>
          <h2 class="section-title text-2xl">Условия доставки</h2>
        </div>

        <div class="grid md:grid-cols-3 gap-6 mb-10">
          <div
            v-for="opt in deliveryOptions"
            :key="opt.title"
            class="bg-white p-6 rounded-sm shadow-sm border border-cream-300/50 hover:border-gold/40 transition-all"
          >
            <div class="text-3xl mb-4">{{ opt.icon }}</div>
            <h3 class="font-display text-lg font-semibold text-brown-900 mb-2">
              {{ opt.title }}
            </h3>
            <p class="font-body text-sm text-brown-600 leading-relaxed mb-3">
              {{ opt.text }}
            </p>
            <div
              class="font-display text-xl font-semibold"
              :class="opt.free ? 'text-green-600' : 'text-gold'"
            >
              {{ opt.price }}
            </div>
          </div>
        </div>

        <!-- Steps -->
        <div class="bg-brown-900 rounded-sm p-8">
          <h3
            class="font-display text-xl font-semibold text-white mb-6 text-center"
          >
            Как это работает
          </h3>
          <div class="grid sm:grid-cols-4 gap-6">
            <div
              v-for="(step, idx) in steps"
              :key="step.title"
              class="text-center relative"
            >
              <div
                class="w-12 h-12 rounded-full bg-gold/20 border border-gold/40 flex items-center justify-center mx-auto mb-3"
              >
                <span class="font-display text-gold font-bold">{{
                  idx + 1
                }}</span>
              </div>
              <h4 class="font-display text-sm font-semibold text-white mb-1">
                {{ step.title }}
              </h4>
              <p class="font-body text-xs text-cream-300/60">{{ step.text }}</p>
              <div
                v-if="idx < 3"
                class="hidden sm:block absolute top-5 left-[calc(50%+28px)] right-[calc(-50%+28px)] h-px bg-gold/20"
              ></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Payment -->
      <section class="mb-16">
        <div class="flex items-center gap-4 mb-8">
          <div class="h-px w-10 bg-gold/40"></div>
          <h2 class="section-title text-2xl">Способы оплаты</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-6">
          <div
            v-for="payment in payments"
            :key="payment.title"
            class="flex gap-4 p-5 bg-white rounded-sm shadow-sm border border-cream-300/50"
          >
            <div
              class="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center text-2xl flex-shrink-0"
            >
              {{ payment.icon }}
            </div>
            <div>
              <h3
                class="font-display text-base font-semibold text-brown-900 mb-1"
              >
                {{ payment.title }}
              </h3>
              <p class="font-body text-sm text-brown-600 leading-relaxed">
                {{ payment.text }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Installation -->
      <section>
        <div class="flex items-center gap-4 mb-8">
          <div class="h-px w-10 bg-gold/40"></div>
          <h2 class="section-title text-2xl">Монтаж и установка</h2>
        </div>
        <div class="bg-cream-100 rounded-sm p-8 border border-cream-300">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3
                class="font-display text-lg font-semibold text-brown-900 mb-3"
              >
                Профессиональная установка
              </h3>
              <ul class="space-y-2.5">
                <li
                  v-for="item in installItems"
                  :key="item"
                  class="flex items-start gap-2.5 font-body text-sm text-brown-700"
                >
                  <svg
                    class="w-4 h-4 text-gold mt-0.5 flex-shrink-0"
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
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="bg-white rounded-sm p-5 border border-cream-300/50">
              <h4 class="font-display font-semibold text-brown-900 mb-3">
                Стоимость монтажа
              </h4>
              <div class="space-y-2">
                <div
                  v-for="price in installPrices"
                  :key="price.name"
                  class="flex justify-between text-sm font-body"
                >
                  <span class="text-brown-600">{{ price.name }}</span>
                  <span class="font-semibold text-brown-900">{{
                    price.price
                  }}</span>
                </div>
              </div>
              <p class="text-xs text-brown-400 mt-3">
                *Стоимость зависит от сложности работ
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
const deliveryOptions = [
  {
    icon: "🚚",
    title: "По Астана",
    text: "Доставка курьером в удобное для вас время. Профессиональный занос на этаж. Для заказов от 50 000 ₸ — бесплатно.",
    price: "От 3 000 ₸",
    free: false,
  },
  {
    icon: "🎉",
    title: "Бесплатно при заказе от 50 000 ₸",
    text: "Заказывайте на сумму от 50 000 ₸ и получайте бесплатную доставку по городу Астана в любое удобное время.",
    price: "Бесплатно",
    free: true,
  },
  {
    icon: "📦",
    title: "По Казахстану",
    text: "Доставка транспортными компаниями (СДЭК, КазПочта) в любой город. Упаковка и страховка груза включены.",
    price: "По тарифу",
    free: false,
  },
];

const steps = [
  { title: "Оформление", text: "Оформите заказ на сайте или по телефону" },
  {
    title: "Подтверждение",
    text: "Менеджер свяжется для подтверждения заказа",
  },
  { title: "Доставка", text: "Доставим в удобное для вас время" },
  { title: "Установка", text: "При необходимости установим профессионально" },
];

const payments = [
  {
    icon: "💵",
    title: "Наличными",
    text: "Оплата курьеру при получении. Приезжайте к нам в шоурум.",
  },
  {
    icon: "💳",
    title: "Банковская карта",
    text: "Visa, MasterCard, Мир. Оплата онлайн или терминалом при получении.",
  },
  {
    icon: "📱",
    title: "Kaspi Pay / QR",
    text: "Быстрая оплата через Kaspi Pay или QR-код.",
  },
  {
    icon: "📋",
    title: "Рассрочка 0%",
    text: "Рассрочка на 3, 6 или 12 месяцев через Kaspi Рассрочка.",
  },
];

const installItems = [
  "Снятие старых дверей и демонтаж коробки",
  "Установка новой дверной коробки",
  "Навеска дверного полотна",
  "Регулировка петель и замков",
  "Уборка мусора после монтажа",
  "Гарантия на монтаж — 2 года",
];

const installPrices = [
  { name: "Межкомнатная дверь", price: "от 8 000 ₸" },
  { name: "Входная дверь", price: "от 12 000 ₸" },
  { name: "Демонтаж старой двери", price: "от 3 000 ₸" },
  { name: "Установка ручки/замка", price: "от 2 000 ₸" },
];
</script>
