<script setup lang="ts">
useHead({
  title: "Контакты — АйбоЛюкс",
  meta: [
    {
      name: "description",
      content:
        "Контакты магазина АйбоЛюкс в Астана. Адрес, телефон, режим работы. Задайте вопрос онлайн.",
    },
    { property: "og:title", content: "Контакты — АйбоЛюкс" },
  ],
});

const form = reactive({
  name: "",
  phone: "",
  message: "",
});

const loading = ref(false);
const sent = ref(false);
const error = ref("");

const submit = async () => {
  if (!form.name || !form.phone) return;
  loading.value = true;
  error.value = "";
  try {
    // In real app: POST to backend or Directus
    await new Promise((r) => setTimeout(r, 1000));
    sent.value = true;
    form.name = "";
    form.phone = "";
    form.message = "";
  } catch {
    error.value = "Ошибка. Попробуйте ещё раз или позвоните нам.";
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <div class="bg-brown-900 py-16">
      <div class="page-container text-center">
        <div class="flex items-center justify-center gap-3 mb-4">
          <div class="h-px w-12 bg-gold/40"></div>
          <span
            class="text-xs text-gold tracking-[0.3em] uppercase font-semibold font-body"
            >Связаться с нами</span
          >
          <div class="h-px w-12 bg-gold/40"></div>
        </div>
        <h1
          class="font-display text-4xl md:text-5xl font-semibold text-white mb-4"
        >
          Контакты
        </h1>
        <p class="font-body text-cream-300/70 text-base max-w-lg mx-auto">
          Мы всегда рады ответить на ваши вопросы
        </p>
      </div>
    </div>

    <div class="page-container py-16">
      <div class="grid lg:grid-cols-2 gap-12">
        <!-- Contact info -->
        <div>
          <h2 class="section-title text-2xl mb-8">Наши контакты</h2>
          <div class="space-y-6">
            <div
              v-for="contact in contacts"
              :key="contact.label"
              class="flex items-start gap-4 p-5 bg-white rounded-sm shadow-sm border border-cream-300/50"
            >
              <div
                class="w-11 h-11 rounded-sm bg-gold/10 flex items-center justify-center flex-shrink-0"
              >
                <component :is="contact.icon" class="w-5 h-5 text-gold" />
              </div>
              <div>
                <div
                  class="font-body text-xs text-brown-400 font-semibold tracking-wide uppercase mb-1"
                >
                  {{ contact.label }}
                </div>
                <component
                  :is="contact.href ? 'a' : 'p'"
                  :href="contact.href"
                  class="font-body text-sm text-brown-900 font-medium leading-relaxed"
                  :class="
                    contact.href ? 'hover:text-gold transition-colors' : ''
                  "
                  v-html="contact.value"
                />
              </div>
            </div>
          </div>

          <!-- Map placeholder -->
          <div
            class="mt-8 aspect-[16/9] bg-cream-200 rounded-sm overflow-hidden flex items-center justify-center border border-cream-300"
          >
            <div class="text-center text-brown-300">
              <svg
                class="w-12 h-12 mx-auto mb-2 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <p class="text-sm">Карта (Yandex / Google Maps)</p>
              <p class="text-xs mt-1">г. Астана, ул. Абая, 100</p>
            </div>
          </div>
        </div>

        <!-- Contact form -->
        <div>
          <h2 class="section-title text-2xl mb-8">Напишите нам</h2>

          <div
            v-if="sent"
            class="bg-green-50 border border-green-200 rounded-sm p-6 text-center"
          >
            <svg
              class="w-10 h-10 text-green-500 mx-auto mb-3"
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
            <h3 class="font-display text-lg font-semibold text-green-800 mb-1">
              Сообщение отправлено!
            </h3>
            <p class="text-sm text-green-600">
              Мы ответим вам в ближайшее время.
            </p>
            <button
              class="btn-outline mt-4 text-green-700 border-green-300"
              @click="sent = false"
            >
              Написать ещё
            </button>
          </div>

          <form
            v-else
            @submit.prevent="submit"
            class="bg-white p-6 rounded-sm shadow-sm border border-cream-300/50 space-y-5"
          >
            <div>
              <label
                class="block text-xs font-semibold text-brown-700 mb-1.5 font-body"
              >
                Ваше имя <span class="text-red-500">*</span>
              </label>
              <input
                v-model="form.name"
                type="text"
                placeholder="Как к вам обращаться?"
                class="input"
                required
              />
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
                required
              />
            </div>
            <div>
              <label
                class="block text-xs font-semibold text-brown-700 mb-1.5 font-body"
                >Сообщение</label
              >
              <textarea
                v-model="form.message"
                rows="5"
                placeholder="Расскажите, что вас интересует..."
                class="input resize-none"
              ></textarea>
            </div>
            <p v-if="error" class="text-sm text-red-500">{{ error }}</p>
            <button
              type="submit"
              class="btn-primary w-full py-4"
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
              {{ loading ? "Отправка..." : "Отправить сообщение" }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const PhoneIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>`,
};
const MailIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
};
const MapIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>`,
};
const ClockIcon = {
  template: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
};

const contacts = [
  {
    label: "Телефон",
    value: "+7 (700) 123-45-67",
    href: "tel:+77001234567",
    icon: PhoneIcon,
  },
  {
    label: "Email",
    value: "info@dverlux.kz",
    href: "mailto:info@dverlux.kz",
    icon: MailIcon,
  },
  {
    label: "Адрес",
    value: "г. Астана, ул. Абая, 100<br>ТЦ «ДомТорг», 2 этаж",
    href: null,
    icon: MapIcon,
  },
  {
    label: "Режим работы",
    value: "Пн–Пт: 9:00–19:00<br>Сб: 10:00–17:00<br>Вс: выходной",
    href: null,
    icon: ClockIcon,
  },
];
</script>
