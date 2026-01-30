<template>
  <a
    :href="href"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
    class="cta-button inline-block"
  >
    <slot>{{ label }}</slot>
  </a>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

type Props = {
  href?: string
  label?: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}

withDefaults(defineProps<Props>(), {
  href: '#contato',
  label: 'Agende Agora',
  target: '_self'
})
</script>