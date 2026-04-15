<template>
  <div class="paw-3d" role="img" aria-label="Ícone de pata 3D realista">
    <div class="scene">
      <div class="fur-ring"></div>
      <div class="pad main">
        <div class="sheen"></div>
      </div>
      <div class="pad toe t1"></div>
      <div class="pad toe t2"></div>
      <div class="pad toe t3"></div>
      <div class="pad toe t4"></div>
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Pata única em 3D com aparência mais realista: almofada central com formato orgânico,
// quatro almofadas dos dedos, anel de “pelos” ao redor e brilho sutil.
// Micro‑interação: brilho varre no hover.
</script>

<style scoped>
.paw-3d {
  width: 40px;
  height: 40px;
  display: inline-block;
  perspective: 600px;
  vertical-align: middle;
}

.scene {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(12deg) rotateY(-10deg);
}

/* Anel de “pelos” para realismo em volta da pata */
.fur-ring {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%) translateZ(-2px);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 60%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.12) 20%, rgba(0,0,0,0.12) 65%, rgba(0,0,0,0.25) 100%);
  filter: blur(1px) contrast(1.05);
  box-shadow: inset 0 2px 3px rgba(255,255,255,0.2), inset 0 -2px 3px rgba(0,0,0,0.2);
}

/* Almofada central (formato orgânico levemente em coração/gota) */
.pad.main {
  position: absolute;
  left: 50%;
  bottom: 8px;
  transform: translateX(-50%) translateZ(8px) rotateZ(-2deg);
  width: 22px;
  height: 18px;
  border-radius: 12px 12px 14px 14px;
  background: radial-gradient(circle at 30% 30%, #b47b6a 0%, #9b6a59 40%, #7c5144 70%, #5a3b31 100%);
  box-shadow: inset 6px 6px 10px rgba(255,255,255,0.18), inset -10px -10px 12px rgba(0,0,0,0.25), 0 4px 8px rgba(0,0,0,0.25);
}

.pad.main .sheen {
  position: absolute;
  top: 2px;
  left: 4px;
  width: 14px;
  height: 7px;
  border-radius: 10px;
  background: radial-gradient(circle, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.2) 60%, rgba(255,255,255,0) 100%);
  filter: blur(0.6px);
}

/* Almofadas dos dedos */
.pad.toe {
  position: absolute;
  top: 6px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #c88a79 0%, #a87464 45%, #7c5144 100%);
  box-shadow: inset 3px 3px 5px rgba(255,255,255,0.16), inset -4px -4px 6px rgba(0,0,0,0.22), 0 2px 4px rgba(0,0,0,0.18);
}
.pad.toe.t1 { left: 3px; transform: translateZ(6px); }
.pad.toe.t2 { left: 11px; transform: translateZ(7px); }
.pad.toe.t3 { right: 11px; transform: translateZ(7px); }
.pad.toe.t4 { right: 3px; transform: translateZ(6px); }

/* Sombra para profundidade */
.shadow {
  position: absolute;
  bottom: 2px;
  left: 50%;
  transform: translateX(-50%) rotateX(90deg) translateZ(-3px);
  width: 34px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%);
  filter: blur(4px);
}

/* Micro‑interação: brilho varre apenas no hover para maior sobriedade */
.paw-3d:hover .pad.main::after {
  content: "";
  position: absolute;
  top: -20%;
  left: -40%;
  width: 50%;
  height: 200%;
  background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%);
  transform: rotate(18deg);
  animation: sweep 2s ease-in-out;
}

@keyframes sweep {
  0% { left: -40%; opacity: 0; }
  10% { opacity: 1; }
  60% { left: 80%; opacity: 1; }
  100% { left: 120%; opacity: 0; }
}
</style>