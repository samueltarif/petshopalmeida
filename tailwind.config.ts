import type { Config } from 'tailwindcss'

export default <Config>{
  content: [
    './app/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.ts'
  ],
  theme: {
    extend: {
      colors: {
        surface: 'var(--color-surface)',
        card: 'var(--color-card-border)',
        primary: 'var(--pet-primary)'
      },
      borderRadius: {
        md: 'var(--radius-md)'
      }
    }
  },
  plugins: []
}