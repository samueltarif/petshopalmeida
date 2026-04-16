// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-11-22',
  
  modules: ['@nuxtjs/tailwindcss'],
  
  css: ['~/assets/css/theme.css'],
  
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  
  experimental: {
    clientNodePlaceholder: true
  },
  
  nitro: {
    preset: 'vercel',
    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'no-referrer',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
          'Cross-Origin-Opener-Policy': 'same-origin'
        }
      }
    }
  },
  
  app: {
    head: {
      title: 'Pets Almeida - Banho e Tosa em São Paulo Zona Norte',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Banho, tosa e táxi dog na Zona Norte de São Paulo. Atendimento profissional e carinhoso para seu pet.' },
        { name: 'keywords', content: 'banho e tosa, pet shop, zona norte, são paulo, cachoeirinha, casa verde' },
        { property: 'og:title', content: 'Pets Almeida - Banho e Tosa' },
        { property: 'og:description', content: 'Cuidado profissional para seu pet' },
        { property: 'og:type', content: 'website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
      ],
      script: [
        {
          src: 'https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs',
          type: 'module'
        }
      ]
    }
  }
})
