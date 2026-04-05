import type { Config } from 'tailwindcss'

export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          DEFAULT: '#1C1612',
          50: '#F5F0E8',
          100: '#EDE4D4',
          200: '#D4BFA0',
          300: '#BB9A6C',
          400: '#A27548',
          500: '#7A5530',
          600: '#5C3F22',
          700: '#3D2A16',
          800: '#2A1D0F',
          900: '#1C1612',
        },
        gold: {
          DEFAULT: '#C4973A',
          light: '#D4A84A',
          dark: '#A67D2A',
          50: '#FDF8EE',
          100: '#FAF0D4',
          200: '#F0D898',
          300: '#E6C05C',
          400: '#D4A84A',
          500: '#C4973A',
          600: '#A67D2A',
          700: '#8A631E',
          800: '#6E4F16',
          900: '#523B10',
        },
        cream: {
          DEFAULT: '#F5F0E8',
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F5F0E8',
          300: '#EDE4D4',
          400: '#E0D3B8',
          500: '#CDB898',
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Manrope', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'wood-pattern': "url('/images/wood-bg.jpg')",
        'hero-gradient': 'linear-gradient(135deg, #1C1612 0%, #3D2A16 50%, #2A1D0F 100%)',
      },
      boxShadow: {
        'luxury': '0 4px 24px rgba(28, 22, 18, 0.15)',
        'luxury-hover': '0 8px 40px rgba(28, 22, 18, 0.25)',
        'gold': '0 4px 20px rgba(196, 151, 58, 0.3)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
