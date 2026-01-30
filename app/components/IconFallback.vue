<template>
  <div class="icon-fallback" :class="iconType">
    <component 
      :is="iconComponent" 
      v-if="iconComponent && !forceEmoji" 
      :size="size" 
      @error="handleError"
    />
    <span v-else class="emoji-fallback" :style="{ fontSize: size + 'px' }">
      {{ emojiMap[iconType] || '🔧' }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  iconType: 'credit-card' | 'dollar' | 'pix' | 'whatsapp' | 'instagram'
  size?: number
}>()

const forceEmoji = ref(false)
const size = computed(() => props.size || 48)

const emojiMap = {
  'credit-card': '💳',
  'dollar': '💵',
  'pix': '💰',
  'whatsapp': '💬',
  'instagram': '📷'
}

const iconComponent = computed(() => {
  const components = {
    'credit-card': 'CreditCard3DIcon',
    'dollar': 'Dollar3DIcon',
    'pix': 'PixIcon',
    'whatsapp': 'WhatsApp3DIcon',
    'instagram': 'Instagram3DIcon'
  }
  return components[props.iconType]
})

const handleError = () => {
  forceEmoji.value = true
}

// Fallback para SSR/hydration issues
onMounted(() => {
  setTimeout(() => {
    if (!forceEmoji.value) {
      // Se após 1 segundo ainda não carregou, usa emoji
      const iconElement = document.querySelector('.icon-fallback svg, .icon-fallback .wa3d, .icon-fallback .ig3d')
      if (!iconElement) {
        forceEmoji.value = true
      }
    }
  }, 1000)
})
</script>

<style scoped>
.icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  min-height: 48px;
}

.emoji-fallback {
  display: inline-block;
  line-height: 1;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.credit-card .emoji-fallback,
.dollar .emoji-fallback,
.pix .emoji-fallback {
  color: #2B5F8D;
}

.whatsapp .emoji-fallback {
  color: #25D366;
}

.instagram .emoji-fallback {
  color: #E4405F;
}
</style>