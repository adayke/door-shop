<script setup lang="ts">
useHead({
  title: "О компании — ЭталонЛюкс",
  meta: [
    {
      name: "description",
      content:
        "ЭталонЛюкс — компания с 15-летним опытом продажи и установки премиальных дверей в Астана и по всему Казахстану.",
    },
    { property: "og:title", content: "О компании — ЭталонЛюкс" },
  ],
});
</script>

<template>
  <div>
    <!-- Hero -->
    <div class="bg-brown-900 py-16">
      <div class="page-container text-center">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="h-px w-12 bg-gold/40"></div>
          <span
            class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body"
            >О нас</span
          >
          <div class="h-px w-12 bg-gold/40"></div>
        </div>
        <h1
          class="font-display text-4xl md:text-5xl font-semibold text-white mb-4"
        >
          О компании
        </h1>
        <p class="font-body text-cream-300/70 text-base max-w-xl mx-auto">
          Более 15 лет мы помогаем создавать уют и красоту в казахстанских домах
        </p>
      </div>
    </div>

    <div class="page-container py-16">
      <!-- Story -->
      <div class="grid lg:grid-cols-2 gap-12 items-center mb-20">
        <div>
          <div class="flex items-center gap-3 mb-4">
            <div class="h-px w-10 bg-gold/40"></div>
            <span
              class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body"
              >Наша история</span
            >
          </div>
          <h2 class="section-title mb-5">Мы открылись в 2009 году</h2>
          <div
            class="space-y-4 font-body text-brown-600 text-base leading-relaxed"
          >
            <p>
              ЭталонЛюкс начинался как небольшой магазин в Астана с мечтой
              сделать красивые и качественные двери доступными для каждого
              казахстанца.
            </p>
            <p>
              Сегодня мы — один из крупнейших специализированных магазинов
              дверей в Казахстане. Наш каталог насчитывает более 500 моделей от
              ведущих производителей России, Европы и Казахстана.
            </p>
            <p>
              Мы не просто продаём двери — мы помогаем создавать интерьеры. Наши
              дизайн-консультанты работают бесплатно и помогут подобрать двери
              именно под ваш стиль и бюджет.
            </p>
          </div>
        </div>
        <div
          class="bg-cream-200 rounded-sm overflow-hidden aspect-[4/3] flex items-center justify-center"
        >
          <div class="text-center text-brown-300">
            <svg
              class="w-16 h-16 mx-auto mb-2 opacity-40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span class="text-sm">Фото шоурума</span>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="text-center p-6 bg-white rounded-sm shadow-sm border border-cream-300/50"
        >
          <div class="font-display text-4xl font-bold text-gold mb-2">
            {{ stat.value }}
          </div>
          <div class="font-body text-sm text-brown-600">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Values -->
      <div class="mb-20">
        <div class="text-center mb-10">
          <h2 class="section-title">Наши ценности</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-6">
          <div
            v-for="value in values"
            :key="value.title"
            class="bg-white p-6 rounded-sm shadow-sm border border-cream-300/50 hover:border-gold/40 hover:shadow-luxury transition-all"
          >
            <div
              class="w-12 h-12 rounded-sm bg-gold/10 flex items-center justify-center text-2xl mb-4"
            >
              {{ value.emoji }}
            </div>
            <h3 class="font-display text-lg font-semibold text-brown-900 mb-2">
              {{ value.title }}
            </h3>
            <p class="font-body text-sm text-brown-600 leading-relaxed">
              {{ value.text }}
            </p>
          </div>
        </div>
      </div>

      <!-- Team -->
      <div>
        <div class="text-center mb-10">
          <h2 class="section-title">Наша команда</h2>
          <p class="section-subtitle max-w-md mx-auto">
            Профессионалы, которые помогут вам с выбором и установкой
          </p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="member in team" :key="member.name" class="text-center">
            <div
              class="w-20 h-20 rounded-full bg-cream-200 flex items-center justify-center text-3xl mx-auto mb-3 shadow-sm"
            >
              {{ member.emoji }}
            </div>
            <div class="font-body text-sm font-semibold text-brown-900">
              {{ member.name }}
            </div>
            <div class="font-body text-xs text-brown-400 mt-0.5">
              {{ member.role }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const stats = [
  { value: "15+", label: "Лет на рынке" },
  { value: "500+", label: "Моделей в каталоге" },
  { value: "12 000+", label: "Довольных клиентов" },
  { value: "50+", label: "Партнёров-производителей" },
];

const values = [
  {
    emoji: "🏆",
    title: "Качество",
    text: "Мы работаем только с проверенными производителями. Каждый товар проходит контроль качества перед попаданием в наш каталог.",
  },
  {
    emoji: "🤝",
    title: "Честность",
    text: "Прозрачное ценообразование без скрытых платежей. Честные консультации — мы посоветуем то, что действительно подходит вам.",
  },
  {
    emoji: "✨",
    title: "Сервис",
    text: "От выбора до установки — мы с вами на каждом этапе. Наш сервис не заканчивается после продажи.",
  },
];

const team = [
  { name: "Айбол Нурболат", role: "Директор", emoji: "👨‍💼" },
  { name: "Жанна Ахмет", role: "Дизайн-консультант", emoji: "👩‍🎨" },
  { name: "Руслан Кали", role: "Мастер-монтажник", emoji: "👷‍♂️" },
  { name: "Айгуль Нур", role: "Менеджер по продажам", emoji: "👩‍💼" },
];
</script>
