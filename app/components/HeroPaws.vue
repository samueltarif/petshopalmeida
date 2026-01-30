<template>
  <!-- Overlay absoluto para patas flutuantes -->
  <div class="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <!-- Wrapper (float) + Inner (drift/rotate) para evitar conflito de transform -->
    <span
      v-for="p in paws"
      :key="p.id"
      class="paw-wrap absolute block"
      :style="wrapStyle(p)"
      aria-hidden="true"
    >
      <span class="paw-move" :style="moveStyle(p)">
        <span class="paw-inner bg-no-repeat" :style="innerStyle(p)" />
      </span>
    </span>
  </div>
</template>

<script setup lang="ts">
type Paw = {
  id: number
  x: number
  y: number
  size: number
  delay: number
  dur: number
  rot: number
  opacity: number
  ax: number
  ay: number
}

const props = withDefaults(defineProps<{
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
  speed?: number
  opacityMin?: number
  opacityMax?: number
}>(), {
  count: 24,
  color: '#cbd5e1',
  minSize: 22,
  maxSize: 52,
  speed: 18,
  opacityMin: 0.26,
  opacityMax: 0.42
})

function svgUrl(color: string) {
  // Pata com 4 dedinhos (círculos) e um coxim (elipse)
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64' fill='none'>
    <circle cx='12' cy='16' r='6' fill='${color}'/>
    <circle cx='26' cy='12' r='6' fill='${color}'/>
    <circle cx='40' cy='12' r='6' fill='${color}'/>
    <circle cx='52' cy='16' r='6' fill='${color}'/>
    <ellipse cx='32' cy='44' rx='18' ry='14' fill='${color}'/>
  </svg>`
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`
}

const paws: Paw[] = Array.from({ length: props.count }).map((_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.round(props.minSize + Math.random() * (props.maxSize - props.minSize)),
  delay: Math.random() * 4,
  dur: props.speed + Math.random() * 8,
  rot: Math.random() * 360,
  opacity: props.opacityMin + Math.random() * (props.opacityMax - props.opacityMin),
  ax: 8 + Math.random() * 20,
  ay: 10 + Math.random() * 24
}))

function wrapStyle(p: Paw) {
  return {
    left: `${p.x}%`,
    top: `${p.y}%`,
    width: `${p.size}px`,
    height: `${p.size}px`,
    animation: `floatY ${p.dur}s ease-in-out ${p.delay}s infinite`,
    willChange: 'transform',
    opacity: p.opacity
  } as Record<string, string | number>
}

function moveStyle(p: Paw) {
  return {
    display: 'block',
    width: '100%',
    height: '100%',
    // amplitude em X via translateX nos keyframes usando CSS var
    '--ax': `${p.ax}px`,
    animation: `swayX ${p.dur * 0.9}s ease-in-out ${p.delay}s infinite`,
    willChange: 'transform'
  } as Record<string, string | number>
}

function innerStyle(p: Paw) {
  return {
    display: 'block',
    width: '100%',
    height: '100%',
    backgroundImage: svgUrl(props.color),
    backgroundSize: '100% 100%',
    backgroundPosition: 'center',
    // rotação contínua e leve variação de escala para dar vida
    animation: `rotate360 ${p.dur * 1.1}s linear ${p.delay}s infinite`,
    willChange: 'transform'
  } as Record<string, string | number>
}
</script>

<style scoped>
/* Garante sizing e centragem do background sem distorcer */
.paw-inner { background-size: 100% 100%; background-position: center; }
.paw-wrap { will-change: transform; }
.paw-move { will-change: transform; }

/* Suave flutuar (vertical) */
@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(var(--ay, -24px)); }
}

/* Sway horizontal com amplitude controlada */
@keyframes swayX {
  0% { transform: translateX(0); }
  50% { transform: translateX(var(--ax, 16px)); }
  100% { transform: translateX(0); }
}

/* Rotação contínua 360° */
@keyframes rotate360 {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(1turn); }
}
</style>