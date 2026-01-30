<template>
  <div class="razor-3d" role="img" aria-label="Ícone de navalha 3D animado">
    <div class="scene">
      <div class="handle"></div>
      <div class="neck"></div>
      <div class="head">
        <div class="cap top"></div>
        <div class="blade">
          <div class="slots"></div>
        </div>
        <div class="cap bottom"></div>
      </div>
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Ícone de navalha 3D animado (estilo safety razor) em CSS puro
// Animação sutil: brilho varrendo pela lâmina e leve oscilação do conjunto
</script>

<style scoped>
.razor-3d {
  width: 72px;
  height: 72px;
  display: inline-block;
  position: relative;
  perspective: 600px;
}

.scene {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(14deg) rotateY(-16deg) translateZ(0);
  animation: sway 4.5s ease-in-out infinite;
}

/* Cabo (handle) */
.handle {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%) rotateZ(1deg) translateZ(-6px);
  width: 18px;
  height: 40px;
  border-radius: 9px;
  background: linear-gradient(180deg, #3b3f46 0%, #22252b 35%, #1b1e23 65%, #2b2f36 100%);
  box-shadow: inset 0 4px 6px rgba(255,255,255,0.06), inset 0 -6px 8px rgba(0,0,0,0.25), 0 6px 12px rgba(0,0,0,0.35);
}

/* Pescoço (neck) que liga cabo à cabeça */
.neck {
  position: absolute;
  bottom: 42px;
  left: 50%;
  transform: translateX(-50%) translateZ(2px);
  width: 10px;
  height: 12px;
  border-radius: 4px;
  background: linear-gradient(180deg, #cfd3d9 0%, #b5bac1 40%, #9fa4ab 100%);
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.25);
}

/* Cabeça da navalha */
.head {
  position: absolute;
  bottom: 52px;
  left: 50%;
  transform: translateX(-50%) translateZ(6px);
  width: 46px;
  height: 20px;
  border-radius: 6px;
  background: linear-gradient(180deg, #d7dbe0 0%, #c6cbd1 50%, #b2b7bf 100%);
  box-shadow: inset 0 2px 3px rgba(255,255,255,0.65), inset 0 -3px 4px rgba(0,0,0,0.15), 0 6px 12px rgba(0,0,0,0.25);
}

.cap {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 42px;
  height: 6px;
  background: linear-gradient(180deg, #eceeef 0%, #d7dadd 60%, #c1c5ca 100%);
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.2);
}

.cap.top { top: 1px; }
.cap.bottom { bottom: 1px; }

/* Lâmina com brilho varrendo */
.blade {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 38px;
  height: 8px;
  border-radius: 3px;
  background: linear-gradient(90deg, #cfd3d8 0%, #f1f3f5 40%, #c8ccd1 70%, #eef1f3 100%);
  overflow: hidden;
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.7), inset 0 -2px 3px rgba(0,0,0,0.12);
}

.blade::before {
  content: "";
  position: absolute;
  top: -20%;
  left: -30%;
  width: 50%;
  height: 200%;
  background: linear-gradient(120deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.75) 50%, rgba(255,255,255,0) 100%);
  transform: rotate(18deg);
  animation: sweep 2.8s ease-in-out infinite;
}

.slots {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to right,
    transparent 0 6px,
    rgba(120,125,130,0.25) 6px 7px,
    transparent 7px 12px
  );
  mix-blend-mode: multiply;
}

/* Sombra no "chão" para dar profundidade */
.shadow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) rotateX(90deg) translateZ(-2px);
  width: 50px;
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0) 100%);
  filter: blur(4px);
}

/* Micro-interações */
.razor-3d:hover .scene {
  animation-play-state: paused;
  transform: rotateX(10deg) rotateY(-10deg) translateZ(2px);
}

.razor-3d:hover .blade::before {
  animation-duration: 1.8s;
}

@keyframes sweep {
  0% { left: -40%; opacity: 0; }
  10% { opacity: 1; }
  60% { left: 80%; opacity: 1; }
  100% { left: 120%; opacity: 0; }
}

@keyframes sway {
  0% { transform: rotateX(14deg) rotateY(-16deg) translateZ(0); }
  50% { transform: rotateX(12deg) rotateY(-18deg) translateZ(1px); }
  100% { transform: rotateX(14deg) rotateY(-16deg) translateZ(0); }
}
</style>