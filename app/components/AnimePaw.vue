<template>
  <span class="anime-paw" :style="{ width: size + 'px', height: size + 'px' }" role="img" aria-label="Patinha azul flutuante">
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="pawGlow">
          <feDropShadow dx="0" dy="2" stdDeviation="2.2" flood-color="currentColor" flood-opacity="0.75" />
        </filter>
      </defs>
      <g fill="currentColor" filter="url(#pawGlow)">
        <!-- Layout harmonioso igual ao rodapé -->
        <circle cx="18" cy="20" r="6" />
        <circle cx="30" cy="14" r="6" />
        <circle cx="42" cy="18" r="6" />
        <circle cx="50" cy="28" r="6" />
        <path d="M32 30c-8 0-16 6-16 14 0 6 4 10 10 10h12c6 0 10-4 10-10 0-8-8-14-16-14z" />
      </g>
    </svg>
  </span>
</template>

<script setup lang="ts">
const props = defineProps<{ size?: number }>();
const size = props.size ?? 28;
</script>

<style scoped>
.anime-paw { display: inline-flex; align-items: center; justify-content: center; color: var(--pet-primary); margin-right: 8px; animation: floatPaw 2.6s ease-in-out infinite; }
.anime-paw svg { display: block; }

@keyframes floatPaw {
  0% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-8px) rotate(-6deg); }
  100% { transform: translateY(0) rotate(0deg); }
}
</style>