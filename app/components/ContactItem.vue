<template>
  <component
    :is="isLink ? 'a' : 'div'"
    class="contact-item no-underline inline-flex items-center gap-3 rounded-xl border border-slate-200 bg-white/70 px-4 py-3 text-slate-800 shadow-sm hover:bg-white hover:shadow-md hover:border-slate-300 transition focus:outline-none focus:ring-2 focus:ring-slate-300"
    :href="href"
    :target="target"
    :rel="relAttr"
    :aria-label="ariaLabel"
    @click="handleClick"
  >
    <span class="icon inline-flex items-center justify-center rounded-md bg-slate-100 p-2" aria-hidden="true">
      <WhatsApp3DIcon v-if="iconName === 'whatsapp'" class="w-6 h-6" />
      <Instagram3DIcon v-else-if="iconName === 'instagram'" class="w-6 h-6" />
      <span v-else class="text-2xl">{{ icon }}</span>
    </span>
    <div v-if="!hideText" class="leading-tight">
      <strong class="font-semibold text-black modern-font">{{ label }}:</strong><br />
      <span class="text-black modern-font">{{ value }}</span>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import WhatsApp3DIcon from '~/components/WhatsApp3DIcon.vue'
import Instagram3DIcon from '~/components/Instagram3DIcon.vue'

const props = defineProps<{
  icon?: string
  iconName?: 'whatsapp' | 'instagram'
  label: string
  value: string
  href?: string
  target?: string
  hideText?: boolean
}>()

const isLink = computed(() => !!props.href)
const relAttr = computed(() => (props.target === '_blank' ? 'noopener noreferrer' : undefined))
const ariaLabel = computed(() => `${props.label}: ${props.value}`)
const iconColorClass = computed(() => {
  if (props.iconName === 'whatsapp') return 'text-[#25D366]'
  if (props.iconName === 'instagram') return 'text-[#E4405F]'
  return 'text-slate-600'
})

const handleClick = (e: MouseEvent) => {
  if (!isLink.value) return
  const href = props.href || ''
  const isWhats = href.startsWith('https://wa.me/') || href.startsWith('https://api.whatsapp.com/')
  if (props.target === '_blank' && isWhats) {
    e.preventDefault()
    const win = window.open(href, '_blank')
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = href
    }
  }
}
</script>

<style scoped>
.modern-font {
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Inter", "Poppins", sans-serif;
  letter-spacing: 0.01em;
}
</style>