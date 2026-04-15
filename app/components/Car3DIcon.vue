<template>
  <div class="car-3d" aria-hidden="true">
    <div class="scene">
      <div class="car">
        <div class="body"></div>
        <div class="roof"></div>
        <div class="window front"></div>
        <div class="window side"></div>
        <div class="bumper"></div>
        <div class="wheel left"><div class="rim"></div></div>
        <div class="wheel right"><div class="rim"></div></div>
        <div class="light front"></div>
        <div class="light rear"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Carro 3D minimalista feito apenas com divs e CSS, com perspectiva
</script>

<style scoped>
.car-3d {
  width: 64px;
  height: 64px;
  perspective: 700px;
  display: inline-block;
}

.scene {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(16deg) rotateY(-14deg);
}

.car {
  position: absolute;
  left: 50%;
  bottom: 10px;
  width: 54px;
  height: 28px;
  transform: translateX(-50%) translateZ(6px);
}

.body {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 54px;
  height: 16px;
  border-radius: 8px;
  background: linear-gradient(180deg, var(--pet-secondary) 0%, #66bfe8 50%, #4aa7d6 100%);
  box-shadow: 0 8px 14px rgba(0,0,0,.12), inset 0 2px 4px rgba(255,255,255,.7);
}

.roof {
  position: absolute;
  left: 8px;
  bottom: 12px;
  width: 30px;
  height: 12px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background: linear-gradient(180deg, #5db3e0 0%, #3e96c7 100%);
  transform: translateZ(8px);
}

.window {
  position: absolute;
  background: linear-gradient(180deg, #eaf6ff 0%, #cfe6fb 60%, #a7cbea 100%);
  box-shadow: inset 0 2px 4px rgba(255,255,255,.6);
}
.window.front {
  left: 12px;
  bottom: 14px;
  width: 12px;
  height: 10px;
  border-radius: 4px 6px 4px 4px;
  transform: translateZ(10px);
}
.window.side {
  left: 26px;
  bottom: 14px;
  width: 12px;
  height: 10px;
  border-radius: 6px;
  transform: translateZ(10px);
}

.bumper {
  position: absolute;
  left: -2px;
  bottom: 2px;
  width: 9px;
  height: 6px;
  border-radius: 3px;
  background: linear-gradient(180deg, #8a96a0 0%, #5f6d78 100%);
  box-shadow: 0 4px 6px rgba(0,0,0,.15);
  transform: translateZ(6px);
}

.wheel {
  position: absolute;
  bottom: -4px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #222 0%, #111 50%, #000 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.25);
  transform: translateZ(2px);
}
.wheel.left { left: 8px; }
.wheel.right { right: 8px; }

.rim {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(circle, #cfd6db 0%, #a9b2b9 70%, #848e95 100%);
}

.light.front {
  position: absolute;
  right: -2px;
  bottom: 6px;
  width: 6px;
  height: 4px;
  border-radius: 2px;
  background: radial-gradient(circle at 30% 50%, #fff7c2 0%, #ffd766 70%, #f4a836 100%);
  box-shadow: 0 0 8px rgba(255, 210, 90, .7);
  transform: translateZ(8px);
}
.light.rear {
  position: absolute;
  left: -3px;
  bottom: 7px;
  width: 5px;
  height: 3px;
  border-radius: 2px;
  background: radial-gradient(circle at 40% 50%, #ffb3b3 0%, #ff6a6a 60%, #d43c3c 100%);
  box-shadow: 0 0 6px rgba(255, 90, 90, .6);
  transform: translateZ(8px);
}

.car-3d:hover .scene {
  transform: rotateX(12deg) rotateY(-11deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>