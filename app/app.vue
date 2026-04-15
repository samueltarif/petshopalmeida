<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <Analytics v-if="enableAnalytics" mode="auto" />
    <div v-if="showConsent" class="cookie-banner" role="dialog" aria-live="polite">
      <div class="cookie-content">
        <p class="cookie-text">Usamos cookies essenciais para melhorar sua experiência.</p>
        <div class="cookie-actions">
          <a href="#termos" class="cookie-link">Termos de Uso</a>
          <button class="cookie-btn" type="button" @click="acceptConsent">Aceitar</button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Analytics } from '@vercel/analytics/nuxt'
const showConsent = ref(false)
const enableAnalytics = ref(false)
const acceptConsent = () => {
  document.cookie = 'cookie_consent=yes; path=/; max-age=31536000'
  showConsent.value = false
  const isLocal = typeof window !== 'undefined' && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  enableAnalytics.value = !isLocal
}
onMounted(() => {
  // Em produção, habilita sempre. Em localhost, mantém desativado.
  const isLocal = typeof window !== 'undefined' && (location.hostname === 'localhost' || location.hostname === '127.0.0.1')
  enableAnalytics.value = !isLocal
  // Banner de consentimento permanece apenas informativo
  showConsent.value = false
})
</script>

<style scoped>
.cookie-banner { position: fixed; left: 0; right: 0; bottom: 0; z-index: 10000; display: flex; justify-content: center; padding: var(--space-12); }
.cookie-content { background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-md); display: flex; align-items: center; gap: var(--space-16); padding: var(--space-12) var(--space-16); max-width: 960px; width: calc(100% - 24px); }
.cookie-text { font-size: var(--font-size-base); }
.cookie-actions { display: flex; align-items: center; gap: var(--space-16); margin-left: auto; }
.cookie-link { color: var(--color-text-secondary); text-decoration: none; font-size: var(--font-size-sm); }
.cookie-link:hover { color: var(--pet-primary); text-decoration: underline; }
.cookie-btn { background: var(--pet-primary); color: #fff; border: none; border-radius: var(--radius-md); padding: 8px 14px; font-weight: var(--font-weight-semibold); cursor: pointer; box-shadow: var(--shadow-sm); }
.cookie-btn:hover { background: #1f4a6b; }
@media (max-width: 640px) { .cookie-content { flex-direction: column; align-items: flex-start; } .cookie-actions { width: 100%; justify-content: space-between; margin-left: 0; } }
</style>
