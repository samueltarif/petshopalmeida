<template>
  <div class="star-3d" aria-hidden="true">
    <div class="scene">
      <div class="star"></div>
      <div class="sparkle s1"></div>
      <div class="sparkle s2"></div>
      <div class="sparkle s3"></div>
      <div class="glow"></div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D de estrelas com brilho/reluzir suave e faíscas.
</script>

<style scoped>
.star-3d {
  width: 64px;
  height: 64px;
  perspective: 900px;
  display: inline-block;
}
.scene {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(16deg) rotateY(-14deg);
}

/* estrela principal */
.star {
  position: absolute;
  left: 50%;
  bottom: 24px;
  width: 28px;
  height: 28px;
  transform: translateX(-50%) translateZ(14px) rotateZ(12deg);
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  background: radial-gradient(70% 70% at 50% 40%, #fff6c7 0%, #ffd86b 55%, #f0b32e 100%);
  box-shadow: 0 10px 16px rgba(0,0,0,.14), inset 0 3px 5px rgba(255,255,255,.85);
  animation: shimmer 2.8s ease-in-out infinite;
}
@keyframes shimmer {
  0%, 100% { filter: brightness(1); transform: translateX(-50%) translateZ(14px) rotateZ(12deg) scale(1); }
  50% { filter: brightness(1.15); transform: translateX(-50%) translateZ(16px) rotateZ(12deg) scale(1.06); }
}

/* faíscas menores */
.sparkle {
  position: absolute;
  width: 8px;
  height: 8px;
  transform: translateZ(16px) rotateZ(45deg);
  border-radius: 2px;
  background: radial-gradient(60% 60% at 50% 40%, #fff8d6 0%, #ffe389 60%, #f7c649 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 3px rgba(255,255,255,.75);
  animation: twinkle 2.4s ease-in-out infinite;
}
.s1 { left: 18px; bottom: 40px; animation-delay: 0.0s; }
.s2 { left: 40px; bottom: 34px; animation-delay: 0.6s; }
.s3 { left: 28px; bottom: 20px; animation-delay: 1.2s; }
@keyframes twinkle {
  0%, 100% { opacity: .5; transform: translateZ(16px) rotateZ(45deg) scale(.9); }
  50% { opacity: 1; transform: translateZ(18px) rotateZ(45deg) scale(1.15); }
}

/* brilho difuso */
.glow {
  position: absolute;
  left: 50%;
  bottom: 18px;
  width: 42px;
  height: 42px;
  transform: translateX(-50%) translateZ(0);
  border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 50%, rgba(255, 216, 107, .35) 0%, rgba(255, 216, 107, .12) 60%, rgba(255,216,107,0) 100%);
}

.star-3d:hover .scene {
  transform: rotateX(14deg) rotateY(-12deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>