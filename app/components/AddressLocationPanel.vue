<template>
  <div class="address-panel" data-component="AddressLocationPanel">
    <div class="card">
      <div class="card-header">
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 3h7l4 4h7v14H3V3z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M8 16h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p class="card-title">{{ howToGetTitle }}</p>
      </div>
      <div class="card-content">
        <div class="map-wrapper">
          <iframe
            :title="mapTitle"
            :src="embedSrc"
            class="map-iframe"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <!-- Overlay clicável: qualquer clique abre o Maps no endereço especificado -->
          <a :href="mapsHref" target="_blank" rel="noopener noreferrer" class="map-link-overlay" aria-label="Abrir endereço no Google Maps"></a>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header">
        <svg class="icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M12 21s-7-6.4-7-11a7 7 0 1 1 14 0c0 4.6-7 11-7 11z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="2"/>
        </svg>
        <p class="card-title">{{ addressTitle }}</p>
      </div>
      <div class="card-content">
        <div class="address-lines">
          <p>{{ addressLine1 }}</p>
          <p>{{ addressLine2 }}</p>
          <p>{{ addressZip }}</p>
        </div>
        <a :href="mapsHref" target="_blank" rel="noopener noreferrer" class="address-button">
          <svg class="btn-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M3 11h18M12 3v18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
          <span>{{ mapsLabel }}</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs, withDefaults, defineProps } from 'vue'

type Props = {
  mapQuery?: string
  mapTitle?: string
  howToGetTitle?: string
  addressTitle?: string
  addressLine1?: string
  addressLine2?: string
  addressZip?: string
  googleMapsLink?: string
  mapsLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  mapQuery: 'Av. Inajar de Souza, 3823 - Cachoeirinha, São Paulo - SP, 02717-000',
  mapTitle: 'Mapa',
  howToGetTitle: 'Como Chegar',
  addressTitle: 'Endereço Completo',
  addressLine1: 'Av. Inajar de Souza, 3916, antes do Mercadão D Àgua',
  addressLine2: 'Cachoeirinha, São Paulo - SP',
  addressZip: 'CEP: 02717-000',
  googleMapsLink: 'https://www.google.com/maps/@-23.4761221,-46.671967,3a,83.9y,147.18h,78.13t/data=!3m7!1e1!3m5!1skh_pgbuAbmjTX_sjXF6lsw!2e0!6shttps:%2F%2Fstreetviewpixels-pa.googleapis.com%2Fv1%2Fthumbnail%3Fcb_client%3Dmaps_sv.tactile%26w%3D900%26h%3D600%26pitch%3D11.873030133748486%26panoid%3Dkh_pgbuAbmjTX_sjXF6lsw%26yaw%3D147.1763386357464!7i16384!8i8192?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D',
  mapsLabel: 'Ver no Google Maps'
})

const embedSrc = computed(() => {
  const q = encodeURIComponent(props.mapQuery)
  // Mostrar visual de rotas/directions no embed (sem API key)
  // Usa modo de direções com destino predefinido
  return `https://www.google.com/maps?output=embed&f=d&daddr=${q}`
})

// Link externo para abrir direções no Google Maps
const mapsHref = computed(() => {
  const q = encodeURIComponent(props.mapQuery)
  return props.googleMapsLink || `https://www.google.com/maps/dir/?api=1&destination=${q}`
})

const { mapTitle, howToGetTitle, addressTitle, addressLine1, addressLine2, addressZip, mapsLabel } = toRefs(props)
</script>

<style scoped>
.address-panel { display: grid; gap: 16px; }
.card { background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); }
.card-header { display: flex; align-items: center; gap: 8px; padding: 16px 16px 8px; color: var(--color-text); }
.card-title { font-weight: var(--font-weight-medium); }
.card-content { padding: 8px 16px 16px; }
.icon { width: 20px; height: 20px; color: var(--pet-primary); }
.map-wrapper { position: relative; }
.map-iframe { width: 100%; height: 320px; border: 0; border-radius: var(--radius-md); }
.map-link-overlay { position: absolute; inset: 0; z-index: 5; }
.address-lines p { margin-bottom: 4px; color: var(--color-text); }
.address-button { margin-top: 12px; display: inline-flex; align-items: center; gap: 8px; background: var(--pet-primary); color: #fff; padding: 10px 14px; border-radius: var(--radius-base); text-decoration: none; box-shadow: var(--shadow-sm); transition: background var(--duration-fast) var(--ease-standard); }
.address-button:hover { background: #1f4a6b; }
.btn-icon { width: 18px; height: 18px; color: #fff; }

@media (min-width: 640px) { .map-iframe { height: 360px; } }
@media (min-width: 768px) { .map-iframe { height: 400px; } }
</style>