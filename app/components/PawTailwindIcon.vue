<template>
  <!-- Ícone SVG de duas patas; herda a cor via currentColor -->
  <span class="paw-icon" :style="{ width: size + 'px', height: size + 'px' }" role="img" :aria-label="ariaLabel">
    <svg :width="size" :height="size" viewBox="0 0 64 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <!-- Pata esquerda -->
      <g transform="translate(4,0)">
        <circle cx="8" cy="6" r="4"/>
        <circle cx="18" cy="6" r="4"/>
        <circle cx="4" cy="12" r="4"/>
        <circle cx="22" cy="12" r="4"/>
        <path d="M6 18 C6 12, 20 12, 20 18 C20 24, 6 24, 6 18 Z"/>
      </g>
      <!-- Pata direita -->
      <g transform="translate(36,0)">
        <circle cx="8" cy="6" r="4"/>
        <circle cx="18" cy="6" r="4"/>
        <circle cx="4" cy="12" r="4"/>
        <circle cx="22" cy="12" r="4"/>
        <path d="M6 18 C6 12, 20 12, 20 18 C20 24, 6 24, 6 18 Z"/>
      </g>
    </svg>
  </span>
  
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

type Props = {
  size?: number
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  size: 28,
  ariaLabel: 'Ícone de duas patas'
})
</script>

<style scoped>
.paw-icon { display: inline-flex; align-items: center; justify-content: center; }
.paw-icon svg { display: block; }
</style>