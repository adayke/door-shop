export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/sitemap',
  ],

  runtimeConfig: {
    directusToken: process.env.DIRECTUS_TOKEN,
    public: {
      directusUrl: process.env.DIRECTUS_URL || 'http://localhost:8055',
      siteUrl: process.env.SITE_URL || 'http://localhost:3000',
    },
  },

  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Manrope:wght@300;400;500;600;700&display=swap',
        },
      ],
    },
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: process.env.SITE_URL || 'http://localhost:3000',
  },

  sitemap: {
    urls: [
      '/',
      '/catalog',
      '/about',
      '/contacts',
      '/delivery',
    ],
  },

  typescript: {
    strict: true,
    typeCheck: false,
  },

  compatibilityDate: '2024-10-03',
})
