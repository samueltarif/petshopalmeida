<template>
  <div class="cat-3d" aria-hidden="true">
    <div class="scene">
      <div class="head"></div>
      <div class="ear left"></div>
      <div class="ear right"></div>
      <div class="inner-ear left"></div>
      <div class="inner-ear right"></div>
      <div class="eye left"><div class="lid"></div></div>
      <div class="eye right"><div class="lid"></div></div>
      <div class="muzzle"></div>
      <div class="nose"></div>
      <div class="whisker w1"></div>
      <div class="whisker w2"></div>
      <div class="whisker w3"></div>
      <div class="whisker w4"></div>
      <div class="floor-shadow"></div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D de gato/felino com animação de piscar leve.
</script>

<style scoped>
.cat-3d {
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

.head {
  position: absolute;
  left: 50%;
  bottom: 18px;
  width: 46px;
  height: 40px;
  transform: translateX(-50%) translateZ(12px);
  border-radius: 22px;
  background: radial-gradient(75% 65% at 50% 40%, #f7f3ef 0%, #e9e1d9 55%, #d1c7bb 100%);
  box-shadow: 0 12px 18px rgba(0,0,0,.16), inset 0 3px 5px rgba(255,255,255,.8);
}

.ear {
  position: absolute;
  width: 16px;
  height: 16px;
  background: linear-gradient(180deg, #e6ded3 0%, #cfc5b8 100%);
  transform: translateZ(14px) rotateZ(8deg);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  box-shadow: 0 8px 12px rgba(0,0,0,.12), inset 0 2px 3px rgba(255,255,255,.65);
}
.ear.left { left: 14px; bottom: 46px; transform: translateZ(14px) rotateZ(-10deg); }
.ear.right { right: 14px; bottom: 46px; transform: translateZ(14px) rotateZ(10deg); }

.inner-ear {
  position: absolute;
  width: 10px;
  height: 10px;
  background: linear-gradient(180deg, #ffd9e6 0%, #f6b6cc 100%);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  box-shadow: inset 0 2px 2px rgba(255,255,255,.8);
}
.inner-ear.left { left: 18px; bottom: 48px; transform: translateZ(16px) rotateZ(-10deg); }
.inner-ear.right { right: 18px; bottom: 48px; transform: translateZ(16px) rotateZ(10deg); }

.eye {
  position: absolute;
  width: 8px;
  height: 10px;
  border-radius: 50% 50% 45% 45%;
  background: radial-gradient(60% 60% at 40% 40%, #3a3a3a 0%, #1e1e1e 60%, #0d0d0d 100%);
  box-shadow: inset 0 2px 3px rgba(255,255,255,.4), 0 4px 6px rgba(0,0,0,.12);
}
.eye.left { left: 22px; bottom: 36px; transform: translateZ(18px); }
.eye.right { right: 22px; bottom: 36px; transform: translateZ(18px); }
.eye::before { /* brilho do olho */
  content: "";
  position: absolute;
  left: 2px;
  top: 2px;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: rgba(255,255,255,.8);
}
.lid {
  position: absolute;
  inset: 0;
  border-radius: 50% 50% 45% 45%;
  background: #e9e1d9;
  opacity: 0;
  animation: blink 4.2s ease-in-out infinite;
}

@keyframes blink {
  0%, 92%, 100% { opacity: 0; }
  94%, 98% { opacity: 1; }
}

.muzzle {
  position: absolute;
  left: 50%;
  bottom: 24px;
  width: 26px;
  height: 14px;
  transform: translateX(-50%) translateZ(18px);
  border-radius: 10px;
  background: linear-gradient(180deg, #f3ede6 0%, #e6ded3 100%);
  box-shadow: inset 0 2px 3px rgba(255,255,255,.8);
}

.nose {
  position: absolute;
  left: 50%;
  bottom: 28px;
  width: 7px;
  height: 6px;
  transform: translateX(-50%) translateZ(20px);
  clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
  background: linear-gradient(180deg, #ff9fb0 0%, #f07f95 100%);
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
}

.whisker {
  position: absolute;
  width: 16px;
  height: 2px;
  background: linear-gradient(180deg, #c3b9ad 0%, #a79c8f 100%);
  box-shadow: 0 2px 3px rgba(0,0,0,.1);
}
.w1 { left: 14px; bottom: 26px; transform: translateZ(18px) rotateZ(6deg); }
.w2 { left: 14px; bottom: 22px; transform: translateZ(18px) rotateZ(-6deg); }
.w3 { right: 14px; bottom: 26px; transform: translateZ(18px) rotateZ(-6deg); }
.w4 { right: 14px; bottom: 22px; transform: translateZ(18px) rotateZ(6deg); }

.floor-shadow {
  position: absolute;
  left: 14px;
  bottom: 8px;
  width: 40px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,.16) 0%, rgba(0,0,0,.08) 60%, rgba(0,0,0,0) 100%);
  transform: translateZ(0);
}

.cat-3d:hover .scene {
  transform: rotateX(14deg) rotateY(-12deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>