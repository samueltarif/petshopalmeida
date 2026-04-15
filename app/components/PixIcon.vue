<template>
  <span class="pix-icon" :style="{ width: size + 'px', height: size + 'px', color: color }" role="img" :aria-label="ariaLabel">
    <svg :width="size" :height="size" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <!-- Marca Pix estilizada: quatro losangos arredondados (sem faixa branca) -->
      <g fill="currentColor">
        <!-- esquerda -->
        <rect x="8" y="22" width="20" height="20" rx="6" transform="rotate(45 18 32)" />
        <!-- direita -->
        <rect x="36" y="22" width="20" height="20" rx="6" transform="rotate(45 46 32)" />
        <!-- topo -->
        <rect x="22" y="8" width="20" height="20" rx="6" transform="rotate(45 32 18)" />
        <!-- base -->
        <rect x="22" y="36" width="20" height="20" rx="6" transform="rotate(45 32 46)" />
      </g>
    </svg>
  </span>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

type Props = {
  size?: number
  color?: string
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  size: 48,
  color: 'var(--pix-green, #00b894)',
  ariaLabel: 'Ícone do Pix'
})
</script>

<style scoped>
.pix-icon { display: inline-flex; align-items: center; justify-content: center; }
.pix-icon svg { display: block; }
</style>