<template>
  <span class="paw-image" role="img" :aria-label="ariaLabel">
    <img :src="src" :alt="alt" loading="lazy" />
  </span>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

type Props = {
  src?: string
  alt?: string
  ariaLabel?: string
  size?: number
}

withDefaults(defineProps<Props>(), {
  src: '/paw-realistic.png',
  alt: 'Pata realista',
  ariaLabel: 'Ícone de pata realista',
  size: 36
})
</script>

<style scoped>
.paw-image {
  display: inline-flex;
  width: v-bind(size + 'px');
  height: v-bind(size + 'px');
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.25));
}
.paw-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  image-rendering: auto;
  border-radius: 8px;
  transition: transform var(--duration-fast) var(--ease-standard), filter var(--duration-fast) var(--ease-standard);
}
.paw-image:hover img { transform: translateY(-1px) scale(1.02); filter: brightness(1.05); }

/* Fallback visual caso a imagem não esteja disponível */
.paw-image img[src=""], .paw-image img:not([src]) {
  background: radial-gradient(circle at 50% 60%, #8c6a50 0%, #5a3b31 70%, #3c2a22 100%);
}
</style>