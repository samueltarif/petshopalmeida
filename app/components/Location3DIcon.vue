<template>
  <div class="location-3d" role="img" aria-label="Ícone de localização 3D">
    <div class="scene">
      <div class="pin">
        <div class="pin-body"></div>
        <div class="pin-head"></div>
        <div class="highlight"></div>
      </div>
      <div class="inner-dot"></div>
      <div class="ground-shadow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Ícone de localização 3D (pin) com animação sutil de pulsar e brilho
</script>

<style scoped>
.location-3d {
  width: 56px;
  height: 56px;
  display: inline-block;
  perspective: 600px;
}

.scene {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(12deg) rotateY(-10deg) translateZ(0) scale(0.85);
}

.pin {
  position: absolute;
  left: 50%;
  top: 36%;
  transform: translate(-50%, -50%) translateZ(8px);
  width: 30px;
  height: 40px;
}

.pin-body {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 24px;
  background: radial-gradient(ellipse at center, #ff5f7e 0%, #ff345f 50%, #e01242 100%);
  border-bottom-left-radius: 8px 14px;
  border-bottom-right-radius: 8px 14px;
  border-top-left-radius: 8px 10px;
  border-top-right-radius: 8px 10px;
  box-shadow: inset 0 8px 12px rgba(255,255,255,0.25), inset 0 -8px 12px rgba(0,0,0,0.25), 0 10px 16px rgba(0,0,0,0.35);
}

.pin-head {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 26px;
  background: radial-gradient(circle at 35% 35%, #ff8fa3 0%, #ff5f7e 40%, #ff345f 70%, #cf0f3c 100%);
  border-radius: 50%;
  box-shadow: inset 8px 8px 12px rgba(255,255,255,0.25), inset -10px -10px 14px rgba(0,0,0,0.25), 0 8px 14px rgba(0,0,0,0.25);
  animation: pulse 2.8s ease-in-out infinite;
}

.highlight {
  position: absolute;
  top: 2px;
  left: 4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.25) 60%, rgba(255,255,255,0) 100%);
  filter: blur(0.5px);
}

.inner-dot {
  position: absolute;
  left: 50%;
  top: 28%;
  transform: translate(-50%, -50%) translateZ(10px);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #fff 0%, #f4f4f4 40%, #ddd 100%);
  box-shadow: 0 1px 2px rgba(0,0,0,0.25);
}

.ground-shadow {
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translateX(-50%) rotateX(90deg) translateZ(-4px);
  width: 36px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0) 100%);
  filter: blur(4px);
}

.location-3d:hover .pin-head {
  animation-duration: 1.8s;
}

@keyframes pulse {
  0% { transform: translateX(-50%) scale(1); filter: brightness(1); }
  50% { transform: translateX(-50%) scale(1.06); filter: brightness(1.08); }
  100% { transform: translateX(-50%) scale(1); filter: brightness(1); }
}
</style>