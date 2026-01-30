<template>
  <span class="heart3d" :style="{ width: size + 'px', height: size + 'px' }" role="img" aria-label="Coração 3D animado">
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ff6b6b"/>
          <stop offset="60%" stop-color="#ff3b3b"/>
          <stop offset="100%" stop-color="#d92626"/>
        </linearGradient>
        <linearGradient id="highlight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
        </linearGradient>
        <filter id="heartShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="3.4" flood-color="#0b2a3a" flood-opacity="0.35"/>
        </filter>
      </defs>
      <g filter="url(#heartShadow)">
        <!-- Forma principal do coração (curvas suaves para aspecto 3D) -->
        <path d="M32 54 C 16 44, 10 38, 10 28 C 10 18, 18 12, 26 12 C 30 12, 34 14, 36.5 17 C 39 14, 43 12, 48 12 C 56 12, 62 18, 62 28 C 62 38, 56 44, 40 54 C 36 56, 28 56, 32 54 Z" fill="url(#heartGrad)"/>
        <!-- brilho lateral para dar realce -->
        <path d="M28 16 C 24 16, 20 19, 18 23 C 16 27, 18 30, 24 34" fill="url(#highlight)" opacity="0.35"/>
      </g>
    </svg>
  </span>
  
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number }>();
const size = props.size ?? 22;
</script>

<style scoped>
.heart3d { display: inline-flex; align-items: center; justify-content: center; vertical-align: middle; margin-left: 8px; animation: beat 1.2s ease-in-out infinite; }
.heart3d svg { display: block; }

@keyframes beat {
  0% { transform: translateY(0) scale(1); }
  25% { transform: translateY(-5px) scale(1.06); }
  50% { transform: translateY(-9px) scale(1.12); }
  75% { transform: translateY(-5px) scale(1.06); }
  100% { transform: translateY(0) scale(1); }
}
</style>