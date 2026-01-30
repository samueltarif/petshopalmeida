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
      },
      // Prerender páginas de bairros para melhor SEO
      '/bairros': { prerender: true },
      '/bairro/cachoeirinha': { prerender: true },
      '/bairro/vila-penteado': { prerender: true },
      '/bairro/brasilandia': { prerender: true },
      '/bairro/eliza-maria': { prerender: true },
      '/bairro/pinheiros': { prerender: true },
      '/bairro/vila-madalena': { prerender: true },
      '/bairro/perdizes': { prerender: true },
      '/bairro/santana': { prerender: true }
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
        }
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
