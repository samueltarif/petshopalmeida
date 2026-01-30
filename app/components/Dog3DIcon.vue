<template>
  <div class="dog-3d" aria-hidden="true">
    <div class="scene">
      <div class="head"></div>
      <div class="ear left"></div>
      <div class="ear right"></div>
      <div class="eye left"><div class="lid"></div></div>
      <div class="eye right"><div class="lid"></div></div>
      <div class="muzzle"></div>
      <div class="nose"></div>
      <div class="tongue"></div>
      <div class="collar"></div>
      <div class="tag"></div>
      <div class="floor-shadow"></div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D de cachorro/dog com animação sutil (piscar e língua).
</script>

<style scoped>
.dog-3d {
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
  width: 48px;
  height: 40px;
  transform: translateX(-50%) translateZ(12px);
  border-radius: 22px;
  background: radial-gradient(75% 65% at 50% 40%, #f0e3d3 0%, #e0ceb6 55%, #c6ab8a 100%);
  box-shadow: 0 12px 18px rgba(0,0,0,.16), inset 0 3px 5px rgba(255,255,255,.8);
}

.ear {
  position: absolute;
  width: 16px;
  height: 18px;
  background: linear-gradient(180deg, #d7c2a4 0%, #bfa686 100%);
  border-radius: 8px 8px 12px 12px;
  box-shadow: 0 8px 12px rgba(0,0,0,.12), inset 0 2px 3px rgba(255,255,255,.65);
}
.ear.left { left: 12px; bottom: 44px; transform: translateZ(14px) rotateZ(-12deg); animation: earWag 3.6s ease-in-out infinite; }
.ear.right { right: 12px; bottom: 44px; transform: translateZ(14px) rotateZ(12deg); animation: earWag 3.6s ease-in-out infinite reverse; }

@keyframes earWag {
  0%, 100% { transform: translateZ(14px) rotateZ(-12deg); }
  50% { transform: translateZ(14px) rotateZ(-6deg); }
}

.eye {
  position: absolute;
  width: 8px;
  height: 10px;
  border-radius: 50% 50% 45% 45%;
  background: radial-gradient(60% 60% at 40% 40%, #2f2f2f 0%, #161616 60%, #0a0a0a 100%);
  box-shadow: inset 0 2px 3px rgba(255,255,255,.4), 0 4px 6px rgba(0,0,0,.12);
}
.eye.left { left: 22px; bottom: 36px; transform: translateZ(18px); }
.eye.right { right: 22px; bottom: 36px; transform: translateZ(18px); }
.eye::before { content: ""; position: absolute; left: 2px; top: 2px; width: 3px; height: 3px; border-radius: 50%; background: rgba(255,255,255,.8); }
.lid { position: absolute; inset: 0; border-radius: 50% 50% 45% 45%; background: #e0ceb6; opacity: 0; animation: blink 5s ease-in-out infinite; }
@keyframes blink { 0%, 94%, 100% { opacity: 0; } 96%, 98% { opacity: 1; } }

.muzzle {
  position: absolute;
  left: 50%;
  bottom: 22px;
  width: 30px;
  height: 16px;
  transform: translateX(-50%) translateZ(18px);
  border-radius: 10px;
  background: linear-gradient(180deg, #ede0cf 0%, #dccab1 100%);
  box-shadow: inset 0 2px 3px rgba(255,255,255,.8);
}

.nose {
  position: absolute;
  left: 50%;
  bottom: 27px;
  width: 9px;
  height: 7px;
  transform: translateX(-50%) translateZ(20px);
  border-radius: 5px 5px 7px 7px;
  background: linear-gradient(180deg, #444 0%, #222 100%);
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
}

.tongue {
  position: absolute;
  left: 50%;
  bottom: 18px;
  width: 10px;
  height: 8px;
  transform: translateX(-50%) translateZ(20px);
  border-radius: 0 0 8px 8px;
  background: linear-gradient(180deg, #ff8aa3 0%, #e86a86 100%);
  box-shadow: inset 0 2px 2px rgba(255,255,255,.65);
  animation: tongue 2.8s ease-in-out infinite;
}
@keyframes tongue {
  0%, 100% { transform: translateX(-50%) translateZ(20px) translateY(0); }
  50% { transform: translateX(-50%) translateZ(20px) translateY(2px); }
}

.collar {
  position: absolute;
  left: 50%;
  bottom: 16px;
  width: 38px;
  height: 6px;
  transform: translateX(-50%) translateZ(12px);
  border-radius: 6px;
  background: linear-gradient(180deg, var(--pet-secondary, #4aa7d6) 0%, #2e7fae 100%);
  box-shadow: 0 4px 6px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.65);
}
.tag {
  position: absolute;
  left: 50%;
  bottom: 12px;
  width: 8px;
  height: 8px;
  transform: translateX(-50%) translateZ(12px);
  border-radius: 50%;
  background: linear-gradient(180deg, #ffd27a 0%, #e6b44a 100%);
  box-shadow: 0 3px 4px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.7);
}

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

.dog-3d:hover .scene {
  transform: rotateX(14deg) rotateY(-12deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>