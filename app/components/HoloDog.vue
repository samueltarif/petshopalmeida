<template>
  <!-- Cachorro holográfico estilizado -->
  <div class="holo-dog pointer-events-none" role="img" aria-label="Cachorro holográfico animado">
    <svg viewBox="0 0 160 220" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Gradiente neon para o traço -->
        <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#4df1ff"/>
          <stop offset="50%" stop-color="#7d7aff"/>
          <stop offset="100%" stop-color="#a8ff78"/>
        </linearGradient>
        <filter id="glow">
          <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#7d7aff" flood-opacity="0.7"/>
        </filter>
      </defs>

      <!-- Estrutura do cão em linhas (holograma) -->
      <g stroke="url(#strokeGrad)" stroke-width="3" fill="none" filter="url(#glow)">
        <!-- Corpo -->
        <path d="M80 80 C 50 92, 40 120, 46 152 C 52 184, 66 202, 84 204 C 104 206, 118 190, 122 158 C 126 126, 112 92, 80 80 Z"
              stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Barriga (contorno interno) -->
        <path d="M84 112 C 70 122, 62 142, 66 162 C 70 178, 82 188, 94 186 C 106 184, 116 170, 116 154 C 116 138, 100 120, 84 112 Z"
              stroke-opacity="0.6"/>
        <!-- Patas dianteiras -->
        <path d="M62 174 C 58 190, 66 206, 76 206"/>
        <path d="M104 174 C 100 190, 108 206, 118 206"/>
      </g>

      <!-- Cabeça e orelhas -->
      <g stroke="url(#strokeGrad)" stroke-width="3" fill="none" filter="url(#glow)">
        <path d="M80 44 C 58 52, 46 70, 50 92 C 54 110, 72 124, 92 122 C 112 120, 126 102, 122 80 C 118 60, 100 46, 80 44 Z"/>
        <!-- focinho -->
        <path d="M92 96 C 86 100, 84 106, 86 112 C 88 118, 94 120, 100 118 C 106 116, 108 110, 106 104 C 104 98, 98 94, 92 96 Z" stroke-opacity="0.7"/>
        <!-- olhos -->
        <circle cx="72" cy="74" r="3" />
        <circle cx="100" cy="74" r="3" />
        <!-- língua (linha) -->
        <g id="tongue">
          <path d="M98 108 C 104 118, 94 126, 98 134" />
        </g>
        <!-- orelhas -->
        <g id="ears">
          <path d="M56 52 C 40 36, 34 26, 34 48 C 34 66, 46 72, 56 66"/>
          <path d="M110 52 C 126 36, 132 26, 132 48 C 132 66, 120 72, 110 66"/>
        </g>
      </g>

      <!-- Cauda animada -->
      <g id="tail" stroke="url(#strokeGrad)" stroke-width="3" fill="none" filter="url(#glow)"
         transform="translate(44,160)" transform-origin="44 160">
        <path d="M0 0 C -10 -12, -12 -28, 8 -32 C 22 -34, 26 -18, 18 -6" stroke-linecap="round" />
      </g>
    </svg>

    <!-- Scanlines / efeito de holograma -->
    <div class="scanlines" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
// Componente decorativo holográfico
</script>

<style scoped>
.holo-dog { width: 3cm; height: 5cm; margin: 14px auto 0; position: relative; filter: hue-rotate(0deg); animation: hueShift 12s linear infinite; }
.scanlines { position: absolute; inset: 0; background: repeating-linear-gradient( to bottom, rgba(125,122,255,0.08) 0px, rgba(125,122,255,0.08) 2px, transparent 3px, transparent 6px ); mix-blend-mode: screen; pointer-events: none; }

#tail { transform-box: fill-box; transform-origin: 0 0; animation: wag 1s ease-in-out infinite; }
#tongue { transform-box: fill-box; transform-origin: 98px 108px; animation: pant 1.1s ease-in-out infinite; }
#ears { animation: earWobble 2.6s ease-in-out infinite; transform-box: fill-box; transform-origin: center; }

@keyframes wag { 0% { transform: rotate(-16deg); } 50% { transform: rotate(16deg); } 100% { transform: rotate(-16deg); } }
@keyframes pant { 0% { transform: translateY(0); } 50% { transform: translateY(2px); } 100% { transform: translateY(0); } }
@keyframes earWobble { 0% { transform: rotate(0deg); } 50% { transform: rotate(3deg); } 100% { transform: rotate(0deg); } }
@keyframes hueShift { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
</style>