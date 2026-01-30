<template>
  <span
    class="image3d"
    :style="sizeStyle"
    role="img"
    :aria-label="ariaLabel"
    @click.stop="openPopup"
  >
    <span class="img-frame">
      <span class="img-sky"></span>
      <span class="img-sun"></span>
      <span class="img-hill"></span>
    </span>
  </span>

  <Teleport to="body">
    <div v-if="isOpen" class="icon-popup fixed inset-0 bg-black/60 flex items-center justify-center z-[10001]" role="dialog" aria-modal="true" :aria-label="popupAriaLabel" @click.self="closePopup">
      <div class="icon-popup-content relative bg-[var(--color-surface)] border border-[var(--color-card-border)] rounded-lg p-4 w-[min(90vw,420px)] text-sm text-[var(--color-text)]">
        <button type="button" class="icon-popup-close absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 text-white" aria-label="Fechar" @click="closePopup">✕</button>
        <template v-if="hasImages">
          <div class="gallery">
            <div class="gallery-image">
              <img :src="resolvedImages[current]" :alt="`${ariaLabel} ${current + 1}`" class="max-w-full max-h-[60vh] object-contain rounded-md" />
            </div>
            <div class="gallery-controls flex items-center justify-between mt-3">
              <button type="button" class="px-3 py-1 rounded-md border" aria-label="Imagem anterior" @click="prev">‹</button>
              <div class="text-xs text-[var(--color-text-secondary)]">{{ current + 1 }} / {{ resolvedImages.length }}</div>
              <button type="button" class="px-3 py-1 rounded-md border" aria-label="Próxima imagem" @click="next">›</button>
            </div>
          </div>
        </template>
        <template v-else>
          <slot name="popup">
            <div class="text-xs">Clique nos ícones de imagem.</div>
          </slot>
        </template>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRuntimeConfig } from '#imports'
const emit = defineEmits(['open','close'])
const props = withDefaults(defineProps<{ size?: number; ariaLabel?: string; popupAriaLabel?: string; images?: string[] }>(), {
  size: 18,
  ariaLabel: 'Ícone de imagem',
  popupAriaLabel: 'Janela de ajuda'
})
const sizeStyle = { width: `${props.size}px`, height: `${props.size}px` }
const isOpen = ref(false)
const openPopup = () => { isOpen.value = true; emit('open') }
const closePopup = () => { isOpen.value = false; emit('close') }
const hasImages = computed(() => (props.images?.length || 0) > 0)
const appBase = useRuntimeConfig()?.app?.baseURL || '/'
const resolvedImages = computed(() => (props.images || []).map((src) => {
  if (/^https?:\/\//.test(src)) return src
  const clean = src.startsWith('/') ? src.slice(1) : src
  return appBase.replace(/\/$/, '/') + clean
}))
const current = ref(0)
const next = () => { if (resolvedImages.value.length) current.value = (current.value + 1) % resolvedImages.value.length }
const prev = () => { if (resolvedImages.value.length) current.value = (current.value - 1 + resolvedImages.value.length) % resolvedImages.value.length }
</script>

<style scoped>
.image3d { display: inline-flex; perspective: 300px; cursor: pointer; }
.img-frame { position: relative; width: 100%; height: 100%; border-radius: 3px; background: #fff; box-shadow: inset 0 1px 2px rgba(0,0,0,0.25), 0 2px 6px rgba(0,0,0,0.25); transform-style: preserve-3d; transform: rotateX(8deg) rotateY(-6deg) translateZ(0); }
.img-sky { position: absolute; inset: 2px 2px 6px 2px; border-radius: 2px; background: linear-gradient(180deg, #c8e9ff 0%, #9fd0f2 100%); box-shadow: inset 0 1px 1px rgba(255,255,255,0.6); transform: translateZ(2px); }
.img-sun { position: absolute; right: 4px; top: 4px; width: 4px; height: 4px; border-radius: 50%; background: radial-gradient(circle at 40% 40%, #fff8d1 0%, #ffd66b 60%, #f0b32e 100%); box-shadow: 0 0 4px rgba(255,210,90,0.7); transform: translateZ(3px); }
.img-hill { position: absolute; left: 3px; bottom: 4px; width: 11px; height: 6px; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; border-top-left-radius: 10px; border-top-right-radius: 10px; background: linear-gradient(180deg, #82c785 0%, #57a85b 100%); box-shadow: inset 0 1px 1px rgba(255,255,255,0.5); transform: translateZ(2px) rotateZ(-2deg); }
.image3d:hover .img-frame { transform: rotateX(6deg) rotateY(-4deg) translateZ(1px); }
.icon-popup-content { box-shadow: var(--shadow-lg); }
.icon-popup-close:hover { background: rgba(0,0,0,0.2); }
.gallery-image img { display: block; margin: 0 auto; }
</style>
