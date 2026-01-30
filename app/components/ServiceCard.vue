<template>
  <div class="service-card">
    <ServiceIcon :aria-label="ariaLabel" class="mb-3">
      <slot name="icon" />
    </ServiceIcon>
    <h3 class="service-title">{{ title }}</h3>
    <div
      v-if="images?.length"
      class="image-gallery"
      role="region"
      aria-label="Galeria de imagens"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <div class="gallery-track" :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
        <div
          v-for="(src, i) in displayImages"
          :key="i"
          class="image-frame"
          :style="i === currentIndex ? { transform: `scale(${zoomScale})` } : {}"
        >
          <img :src="src" :alt="`Foto ${i + 1}`" loading="lazy" @error="onImageError(i)" @click="openLightbox(i)" />
        </div>
      </div>
      <button class="arrow left" type="button" aria-label="Imagem anterior" @click="prev">‹</button>
      <button class="arrow right" type="button" aria-label="Próxima imagem" @click="next">›</button>
    </div>

    <!-- Lightbox overlay -->
    <div
      v-if="lightboxOpen"
      class="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Visualização de imagem"
      tabindex="0"
      @keydown.stop="onKeydown"
      @click.self="closeLightbox"
      @touchstart="onLBTouchStart"
      @touchmove="onLBTouchMove"
      @touchend="onLBTouchEnd"
      @touchcancel="onLBTouchEnd"
    >
      <button class="lightbox-close" type="button" aria-label="Fechar" @click="closeLightbox">✕</button>
      <div class="lightbox-content">
        <img :src="displayImages[lightboxIndex]" :alt="`Foto ${lightboxIndex + 1}`" class="lightbox-image" />
      </div>
      <button class="lightbox-arrow left" type="button" aria-label="Imagem anterior" @click="prevLB">‹</button>
      <button class="lightbox-arrow right" type="button" aria-label="Próxima imagem" @click="nextLB">›</button>
    </div>
    <slot />

    <button
      v-if="showExtras"
      class="additional-services"
      type="button"
      aria-label="Abrir serviços adicionais"
      aria-haspopup="dialog"
      aria-controls="extras-modal"
      @click="openExtras"
    >
      <svg class="plus-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <linearGradient id="plus-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5ab0ff" />
            <stop offset="100%" stop-color="#1470c9" />
          </linearGradient>
          <linearGradient id="plus-edge" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.85" />
            <stop offset="100%" stop-color="#ffffff" stop-opacity="0" />
          </linearGradient>
          <filter id="plus-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.35" />
          </filter>
        </defs>
        <g filter="url(#plus-shadow)">
          <g transform="translate(2,2)">
            <rect x="28" y="10" width="8" height="44" rx="4" fill="#0b2a3a" />
            <rect x="10" y="28" width="44" height="8" rx="4" fill="#0b2a3a" />
          </g>
          <g>
            <rect x="28" y="10" width="8" height="44" rx="4" fill="url(#plus-grad)" />
            <rect x="10" y="28" width="44" height="8" rx="4" fill="url(#plus-grad)" />
            <rect x="28" y="10" width="8" height="44" rx="4" fill="url(#plus-edge)" opacity="0.6" />
            <rect x="10" y="28" width="44" height="8" rx="4" fill="url(#plus-edge)" opacity="0.6" />
          </g>
          <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite" />
        </g>
      </svg>
      <span class="label">Serviços Adicionais</span>
    </button>

    <!-- Popup de Serviços Adicionais (Teleport para body) -->
    <Teleport to="body">
      <div
        v-if="showExtras && extrasOpen"
        id="extras-modal"
        class="extras-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="Serviços Adicionais"
        tabindex="0"
        @keydown.stop="onExtrasKeydown"
        @click.self="closeExtras"
      >
        <div class="extras-content">
          <button class="extras-close" type="button" aria-label="Fechar" @click="closeExtras">✕</button>
          <div class="extras-header">
            <svg class="extras-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <defs>
                <linearGradient id="plus-grad-popup" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#5ab0ff" />
                  <stop offset="100%" stop-color="#1470c9" />
                </linearGradient>
                <filter id="plus-shadow-popup" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#000000" flood-opacity="0.35" />
                </filter>
              </defs>
              <g filter="url(#plus-shadow-popup)">
                <g transform="translate(2,2)">
                  <rect x="28" y="10" width="8" height="44" rx="4" fill="#0b2a3a" />
                  <rect x="10" y="28" width="44" height="8" rx="4" fill="#0b2a3a" />
                </g>
                <g>
                  <rect x="28" y="10" width="8" height="44" rx="4" fill="url(#plus-grad-popup)" />
                  <rect x="10" y="28" width="44" height="8" rx="4" fill="url(#plus-grad-popup)" />
                </g>
                <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="10s" repeatCount="indefinite" />
              </g>
            </svg>
            <h4 class="extras-title">Serviços Adicionais</h4>
          </div>
          <div class="extras-body">
            <ul class="extras-list">
              <li v-for="(item, i) in extrasItems" :key="i">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import ServiceIcon from './ServiceIcon.vue'
import { ref, computed, watch } from 'vue'
import { useRuntimeConfig } from '#imports'

const props = withDefaults(defineProps<{
  title: string
  ariaLabel?: string
  images?: string[]
  showExtras?: boolean
  extrasItems?: string[]
}>(), {
  images: ['/images/dog.jpg', '/images/toby.jpg'],
  showExtras: true,
  extrasItems: [
    'Coloração – a partir de R$15,00',
    'Desembolo – R$30,00 a hora',
    'Corte de unha – R$10,00',
    'Hidratação – R$20,00',
    'Higiene bucal – R$10,00'
  ]
})

const currentIndex = ref(0)
const appBase = useRuntimeConfig()?.app?.baseURL || '/'
const resolvedImages = computed(() => (props.images || []).map((src) => {
  // Mantém URLs absolutas (http/https) como estão
  if (/^https?:\/\//.test(src)) return src
  const clean = src.startsWith('/') ? src.slice(1) : src
  return appBase.replace(/\/$/, '/') + clean
}))

// Array mutável de exibição com fallback
const displayImages = ref<string[]>([])
watch(resolvedImages, (val) => { displayImages.value = [...val] }, { immediate: true })
const onImageError = (i: number) => {
  // Fallback para imagem local
  displayImages.value[i] = appBase.replace(/\/$/, '/') + 'images/dog.jpg'
}
const next = () => {
  if (!props.images?.length) return
  currentIndex.value = (currentIndex.value + 1) % props.images.length
}
const prev = () => {
  if (!props.images?.length) return
  currentIndex.value = (currentIndex.value - 1 + props.images.length) % props.images.length
}

// Pinch-to-zoom para mobile
const zoomScale = ref(1)
let startDist = 0
let startScale = 1
const getDist = (touches: TouchList) => {
  const [a, b] = [touches[0], touches[1]]
  const dx = a.clientX - b.clientX
  const dy = a.clientY - b.clientY
  return Math.sqrt(dx * dx + dy * dy)
}
const clamp = (n: number, min = 1, max = 3) => Math.max(min, Math.min(max, n))
const onTouchStart = (e: TouchEvent) => {
  if (e.touches.length === 2) {
    startDist = getDist(e.touches)
    startScale = zoomScale.value
  }
}
const onTouchMove = (e: TouchEvent) => {
  if (e.touches.length === 2 && startDist) {
    const d = getDist(e.touches)
    zoomScale.value = clamp(startScale * (d / startDist))
    e.preventDefault()
  }
}
const onTouchEnd = () => {
  if (zoomScale.value < 1.02) zoomScale.value = 1
}

// Lightbox state & handlers
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)
const openLightbox = (i: number) => { lightboxIndex.value = i; lightboxOpen.value = true }
const closeLightbox = () => { lightboxOpen.value = false }
const nextLB = () => { lightboxIndex.value = (lightboxIndex.value + 1) % displayImages.value.length }
const prevLB = () => { lightboxIndex.value = (lightboxIndex.value - 1 + displayImages.value.length) % displayImages.value.length }
const onKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') return closeLightbox()
  if (e.key === 'ArrowRight') return nextLB()
  if (e.key === 'ArrowLeft') return prevLB()
}
// Swipe navigation for lightbox
let lbStartX = 0
let lbMoveX = 0
const onLBTouchStart = (e: TouchEvent) => { lbStartX = e.touches[0].clientX; lbMoveX = lbStartX }
const onLBTouchMove = (e: TouchEvent) => { lbMoveX = e.touches[0].clientX }
const onLBTouchEnd = () => {
  const delta = lbMoveX - lbStartX
  const threshold = 40
  if (Math.abs(delta) > threshold) { delta < 0 ? nextLB() : prevLB() }
  lbStartX = 0; lbMoveX = 0
}

// Extras popup state & handlers
const extrasOpen = ref(false)
const openExtras = (e?: Event) => { if (e) e.stopPropagation(); extrasOpen.value = true }
const closeExtras = () => { extrasOpen.value = false }
const onExtrasKeydown = (e: KeyboardEvent) => { if (e.key === 'Escape') closeExtras() }
</script>

<style scoped>
.service-card { 
  position: relative;
  background: var(--color-surface, #ffffff);
  border: 1px solid var(--color-card-border, #e0e0e0);
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  opacity: 1 !important;
  visibility: visible !important;
  z-index: 5;
}

.service-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
}

.service-title {
  color: var(--pet-primary, #2B5F8D);
  font-size: 16px;
  font-weight: 600;
  letter-spacing: -0.01em;
  margin-bottom: 8px;
  line-height: 1.3;
}

.mb-3 {
  margin-bottom: 8px;
}

.image-gallery {
  position: relative;
  margin: 12px 0;
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-bg-1, #f8f9fa);
  aspect-ratio: 16 / 9;
}

.gallery-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.gallery-track img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.image-frame {
  width: 100%;
  height: 100%;
  overflow: hidden;
  will-change: transform;
  flex: 0 0 100%;
}

.arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0,0,0,0.4);
  color: #fff;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  backdrop-filter: blur(2px);
  font-size: 14px;
}

.arrow.left { left: 6px; }
.arrow.right { right: 6px; }
.arrow:hover { background: rgba(0,0,0,0.6); }

/* Lightbox styles */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.lightbox-content {
  max-width: 90vw;
  max-height: 85vh;
}

.lightbox-image {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 10px;
}

.lightbox-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.2);
  color: #fff;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.lightbox-arrow.left { left: 16px; }
.lightbox-arrow.right { right: 16px; }

.additional-services {
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--color-text, #333);
  background: transparent;
  border: 1px solid var(--color-card-border, #e0e0e0);
  padding: 6px 10px;
  border-radius: 8px;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  cursor: pointer;
  font-size: 12px;
}

.plus-icon {
  width: 18px;
  height: 18px;
  display: inline-block;
}

.additional-services:hover { 
  border-color: var(--pet-primary, #2B5F8D); 
  transform: translateY(-1px); 
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.02); 
}

.additional-services:hover .label {
  color: var(--pet-primary, #2B5F8D);
}

.label {
  font-weight: 500;
  font-size: 12px;
}

/* Extras popup */
.extras-overlay { 
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000; 
}

.extras-content { 
  position: relative;
  background: var(--color-surface, #ffffff);
  border: 1px solid var(--color-card-border, #e0e0e0);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02);
  width: min(90vw, 560px);
}

.extras-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(0,0,0,0.5);
  color: #fff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
}

.extras-close:hover { 
  background: rgba(0,0,0,0.65); 
}

.extras-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.extras-icon {
  width: 32px;
  height: 32px;
}

.extras-title {
  color: var(--color-text, #333);
  font-size: 18px;
  font-weight: 600;
}

.extras-body {
  color: var(--color-text, #333);
}

.extras-list {
  list-style: disc;
  margin-left: 20px;
}

.extras-list li {
  margin-bottom: 8px;
}

/* Conteúdo comum dos cards de serviço (aplica aos elementos vindos via slot) */
:deep(.service-description) { 
  color: var(--color-text-secondary, #666); 
  margin-bottom: 12px; 
  font-size: 12px; 
}

:deep(.service-note) { 
  background: var(--color-bg-3, #f0f9ff); 
  color: var(--color-text, #333); 
  padding: 6px 10px; 
  border-radius: 6px; 
  font-size: 11px; 
  font-weight: 500; 
  margin-bottom: 12px; 
  border: 1px solid var(--color-card-border, #e0e0e0); 
}

:deep(.service-availability) { 
  background: #FFD700; 
  color: #111; 
  padding: 4px 8px; 
  border-radius: 6px; 
  font-size: 10px; 
  font-weight: 600; 
  display: inline-block; 
  margin-bottom: 12px; 
  position: relative; 
  border: 1px solid #111; 
}

/* tabela de preços comum aos serviços */
:deep(.price-table) { 
  width: 100%; 
  border-collapse: collapse; 
  margin-top: 8px; 
  font-size: 11px;
  max-height: 200px;
  overflow-y: auto;
  display: block;
}

:deep(.price-table thead) {
  display: table;
  width: 100%;
  table-layout: fixed;
}

:deep(.price-table tbody) {
  display: table;
  width: 100%;
  table-layout: fixed;
}

:deep(.price-table th), :deep(.price-table td) { 
  text-align: left; 
  padding: 6px 8px; 
  border-bottom: 1px solid var(--color-border, #e0e0e0); 
  font-size: 11px; 
}

:deep(.price-table thead th) { 
  color: var(--color-text-secondary, #666); 
  font-weight: 600; 
  font-size: 10px;
}

:deep(.price-table tbody tr:hover) { 
  background: var(--color-bg-hover, #f8f9fa); 
}

/* lista de itens comum aos serviços */
:deep(.service-list) { 
  list-style: none; 
  margin-top: 8px; 
}

:deep(.service-list li) { 
  padding: 6px 0; 
  padding-left: 20px; 
  position: relative; 
  font-size: 12px; 
}

:deep(.service-list li)::before { 
  content: '✓'; 
  position: absolute; 
  left: 0; 
  color: var(--pet-primary, #2B5F8D); 
  font-weight: 600; 
}
</style>
