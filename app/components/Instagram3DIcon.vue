<template>
  <span
    class="ig3d"
    :style="{ width: size ? size + 'px' : undefined, height: size ? size + 'px' : undefined }"
    role="img"
    :aria-label="ariaLabel"
  >
    <span class="ig3d-body">
      <span class="ig3d-inset"></span>
      <span class="ig3d-lens"></span>
      <span class="ig3d-dot"></span>
      <span class="ig3d-shine"></span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from 'vue'

type Props = {
  size?: number
  ariaLabel?: string
}

withDefaults(defineProps<Props>(), {
  size: undefined,
  ariaLabel: 'Ícone do Instagram'
})
</script>

<style scoped>
.ig3d {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.ig3d-body {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 24px;
  min-height: 24px;
  border-radius: 22%;
  background: radial-gradient(100% 100% at 0% 0%, #f9ce34 0%, #ee2a7b 40%, #6228e5 100%), #E4405F;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.2), 0 4px 10px rgba(0,0,0,0.25);
  transform: perspective(200px) rotateX(4deg) rotateY(-6deg);
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.ig3d-inset {
  position: absolute;
  inset: 8%;
  border-radius: 20%;
  background: rgba(255,255,255,0.08);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}
.ig3d-lens {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 38%;
  height: 38%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #ffffff 0%, #e9e9e9 40%, #bdbdbd 100%);
  box-shadow: 0 2px 6px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.4);
}
.ig3d-dot {
  position: absolute;
  right: 14%;
  top: 16%;
  width: 14%;
  height: 14%;
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}
.ig3d-shine {
  position: absolute;
  left: 6%;
  top: 10%;
  width: 60%;
  height: 30%;
  transform: rotate(-20deg);
  border-radius: 50%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0));
  filter: blur(4px);
  pointer-events: none;
}
.ig3d-body:hover {
  transform: perspective(200px) rotateX(0deg) rotateY(0deg) translateZ(2px);
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.2), 0 6px 16px rgba(0,0,0,0.35);
}
</style>