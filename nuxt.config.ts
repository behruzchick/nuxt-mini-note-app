// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    'nuxt-headlessui',
    'nuxt-vitest',
    '@nuxt/devtools',
    '@nuxtjs/supabase',
    'nuxt-typed-router',
    '@vee-validate/nuxt',
  ],
  css: ['~/assets/css/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  },
  devtools:{enabled:false},
  runtimeConfig: {
    public: {
      supabase: {
        redirect:false,
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY
      },
    },
  },
  colorMode: {
    classSuffix: ''
  },

  headlessui: {
    prefix: ''
  },
  vite:{
    optimizeDeps: {
      exclude: ['vee-validate']
    }
  },
  // devtools: false,
  compatibilityDate: '2025-03-16'
})
