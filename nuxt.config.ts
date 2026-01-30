// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  compatibilityDate: '2025-11-22',
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/theme.css'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
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
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap'
        },
        { rel: 'preload', href: '/images/foto_capa.png', as: 'image' }
      ],
      meta: [
        // Meta tags para evitar cache em desenvolvimento
        ...(process.env.NODE_ENV !== 'production' ? [
          { 'http-equiv': 'Cache-Control', content: 'no-cache, no-store, must-revalidate' },
          { 'http-equiv': 'Pragma', content: 'no-cache' },
          { 'http-equiv': 'Expires', content: '0' }
        ] : []),
        // CSP apenas em produção
        ...(process.env.NODE_ENV === 'production' ? [
          {
            name: 'Content-Security-Policy',
            content: "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; upgrade-insecure-requests; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; connect-src 'self' https:"
          }
        ] : [])
      ]
    }
  }
})
