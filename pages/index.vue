<script setup lang="ts">
useHead({
  title: "АйбоЛюкс — Премиальные двери и фурнитура в Астана",
  meta: [
    {
      name: "description",
      content:
        "Интернет-магазин премиальных дверей. Межкомнатные и входные двери, ручки, замки, фурнитура. Доставка по Астана и Казахстану. Гарантия 5 лет.",
    },
    {
      property: "og:title",
      content: "АйбоЛюкс — Премиальные двери и фурнитура",
    },
    {
      property: "og:description",
      content:
        "Интернет-магазин премиальных дверей. Широкий выбор, доставка, установка.",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/images/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
  ],
});
</script>

<template>
  <div>
    <HeroSection />
    <FeaturesSection />
    <CategoryGrid />
    <HitsSection />
    <PromoSection />

    <!-- Testimonials -->
    <section class="py-20 bg-cream-50">
      <div class="page-container">
        <div class="text-center mb-12">
          <div class="flex items-center justify-center gap-4 mb-4">
            <div class="h-px w-16 bg-gold/40"></div>
            <span
              class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body"
              >Отзывы</span
            >
            <div class="h-px w-16 bg-gold/40"></div>
          </div>
          <h2 class="section-title">Что говорят клиенты</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="review in reviews"
            :key="review.name"
            class="bg-white p-6 rounded-sm shadow-sm border border-cream-300"
          >
            <div class="flex items-center gap-1 mb-3">
              <svg
                v-for="i in 5"
                :key="i"
                class="w-4 h-4"
                :class="
                  i <= review.rating
                    ? 'text-gold fill-current'
                    : 'text-cream-300 fill-current'
                "
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                />
              </svg>
            </div>
            <p
              class="font-body text-sm text-brown-600 leading-relaxed mb-4 italic"
            >
              "{{ review.text }}"
            </p>
            <div class="flex items-center gap-3 pt-3 border-t border-cream-200">
              <div
                class="w-9 h-9 rounded-full bg-gold/10 flex items-center justify-center font-display font-semibold text-gold text-sm"
              >
                {{ review.name[0] }}
              </div>
              <div>
                <div class="font-body text-sm font-semibold text-brown-900">
                  {{ review.name }}
                </div>
                <div class="font-body text-xs text-brown-400">
                  {{ review.product }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="py-16 bg-gold relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div
          class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"
        ></div>
      </div>
      <div class="page-container relative z-10 text-center">
        <h2
          class="font-display text-3xl md:text-4xl font-semibold text-white mb-4"
        >
          Нужна консультация?
        </h2>
        <p class="font-body text-white/80 text-base mb-8 max-w-md mx-auto">
          Наши специалисты помогут подобрать идеальные двери для вашего
          интерьера. Звоните!
        </p>
        <div class="flex flex-wrap items-center justify-center gap-4">
          <a
            href="tel:+77001234567"
            class="inline-flex items-center gap-2 px-8 py-4 bg-white text-gold font-body font-semibold text-base rounded-sm hover:bg-cream-100 transition-all shadow-gold active:scale-95"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            +7 (700) 123-45-67
          </a>
          <NuxtLink
            to="/contacts"
            class="inline-flex items-center gap-2 px-8 py-4 border border-white/40 text-white font-body font-semibold text-base rounded-sm hover:bg-white/10 transition-all"
          >
            Написать нам
          </NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
const reviews = [
  {
    name: "Алия М.",
    rating: 5,
    text: "Заказала межкомнатные двери для всей квартиры. Качество отличное, установили быстро и аккуратно. Рекомендую!",
    product: "Межкомнатные двери «Классика»",
  },
  {
    name: "Сергей К.",
    rating: 5,
    text: "Купил входную дверь с антивандальным покрытием. Очень доволен — и выглядит дорого, и надёжная. Монтажники — профессионалы.",
    product: "Входная дверь «Форт»",
  },
  {
    name: "Гульнар Т.",
    rating: 4,
    text: "Хороший выбор дверных ручек, нашла именно то, что искала под свой интерьер. Доставка была быстрой.",
    product: "Ручки дверные «Модерн»",
  },
];
</script>
