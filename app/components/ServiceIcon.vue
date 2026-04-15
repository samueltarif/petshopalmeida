<template>
  <div class="service-icon" :aria-label="ariaLabel">
    <slot>{{ icon }}</slot>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  icon?: string
  ariaLabel?: string
}>(), {
  icon: '🏥',
  ariaLabel: 'Ícone de serviço'
})
</script>