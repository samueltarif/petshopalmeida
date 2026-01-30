<template>
  <span
    class="wa3d"
    :style="{ width: size ? size + 'px' : undefined, height: size ? size + 'px' : undefined }"
    role="img"
    :aria-label="ariaLabel"
  >
    <span class="wa3d-body">
      <span class="wa3d-inset"></span>
      <span class="wa3d-tail"></span>
      <svg class="wa3d-glyph" viewBox="0 0 16 16" aria-hidden="true">
        <path fill="#ffffff" d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
      </svg>
      <span class="wa3d-shine"></span>
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
  ariaLabel: 'Ícone do WhatsApp'
})
</script>

<style scoped>
.wa3d { display: inline-flex; align-items: center; justify-content: center; }
.wa3d-body {
  position: relative;
  width: 100%;
  height: 100%;
  min-width: 24px;
  min-height: 24px;
  border-radius: 22%;
  background: radial-gradient(120% 120% at 0% 0%, #5df08f 0%, #25D366 45%, #1eb854 100%), #25D366;
  box-shadow: inset 0 2px 6px rgba(0,0,0,0.18), 0 4px 10px rgba(0,0,0,0.25);
  transform: perspective(200px) rotateX(4deg) rotateY(-6deg);
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.wa3d-inset {
  position: absolute; inset: 8%; border-radius: 20%; background: rgba(255,255,255,0.08);
  box-shadow: inset 0 1px 3px rgba(0,0,0,0.2);
}
.wa3d-tail {
  position: absolute; right: 6%; bottom: 10%; width: 22%; height: 18%;
  background: linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0));
  transform: skewX(-20deg) rotate(18deg);
  border-bottom-right-radius: 60% 80%;
}
.wa3d-glyph { position: absolute; left: 50%; top: 50%; width: 58%; height: 58%; transform: translate(-50%, -50%); filter: drop-shadow(0 1px 1px rgba(0,0,0,0.2)); }
.wa3d-shine { position: absolute; left: 6%; top: 10%; width: 60%; height: 30%; transform: rotate(-18deg); border-radius: 50%; background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0)); filter: blur(4px); pointer-events: none; }
.wa3d-body:hover { transform: perspective(200px) rotateX(0deg) rotateY(0deg) translateZ(2px); box-shadow: inset 0 2px 6px rgba(0,0,0,0.18), 0 6px 16px rgba(0,0,0,0.32); }
</style>