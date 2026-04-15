<template>
  <!-- Personagem de pet shop (banhista/tosador) em 3D com micro animações -->
  <div class="pet-worker-3d" aria-hidden="true">
    <div class="scene">
      <div class="head">
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="mouth"></div>
      </div>
      <div class="hair"></div>
      <div class="body">
        <div class="shirt"></div>
        <div class="apron"></div>
        <div class="pocket"></div>
        <div class="arm left">
          <div class="hand"></div>
        </div>
        <div class="arm right">
          <div class="hand"></div>
          <div class="brush">
            <div class="handle"></div>
            <div class="bristle"></div>
          </div>
        </div>
        <div class="bubbles">
          <span class="b1"></span>
          <span class="b2"></span>
          <span class="b3"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.pet-worker-3d {
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
  transform: rotateX(14deg) rotateY(-12deg);
}

.head {
  position: absolute;
  top: 10px;
  left: 50%;
  width: 32px;
  height: 32px;
  transform: translateX(-50%) translateZ(10px);
  border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 35%, #f7c48a 0%, #f1b374 40%, #e2a567 100%);
  box-shadow: inset 0 2px 4px rgba(255,255,255,.6), inset 0 -3px 6px rgba(0,0,0,.08), 0 10px 16px rgba(0,0,0,.12);
}

.hair {
  position: absolute;
  top: 6px;
  left: 50%;
  width: 34px;
  height: 18px;
  transform: translateX(-50%) translateZ(12px);
  border-top-left-radius: 18px;
  border-top-right-radius: 18px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: linear-gradient(180deg, #3a2a1f 0%, #2c2018 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.15);
}

.eye {
  position: absolute;
  top: 14px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #231f20;
  box-shadow: 0 0 0 2px rgba(255,255,255,.35);
}
.eye.left { left: 10px; }
.eye.right { right: 10px; }

.mouth {
  position: absolute;
  bottom: 7px;
  left: 50%;
  width: 12px;
  height: 6px;
  transform: translateX(-50%);
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  background: linear-gradient(180deg, #d77b6a 0%, #b65e52 100%);
}

.body {
  position: absolute;
  bottom: 6px;
  left: 50%;
  width: 48px;
  height: 36px;
  transform: translateX(-50%) translateZ(6px);
}

.shirt {
  position: absolute;
  top: 8px;
  left: 50%;
  width: 24px;
  height: 18px;
  transform: translateX(-50%) translateZ(8px);
  border-radius: 6px;
  background: linear-gradient(180deg, var(--pet-secondary, #4aa7d6) 0%, #2e7fae 100%);
}

/* Avental de banho/tosa */
.apron {
  position: absolute;
  inset: 0;
  border-radius: 10px;
  background: linear-gradient(180deg, #fefefe 0%, #f3f7fb 50%, #e6eef7 100%);
  box-shadow: 0 12px 18px rgba(0,0,0,.08), inset 0 2px 4px rgba(255,255,255,.8);
}
.pocket {
  position: absolute;
  left: 50%;
  top: 18px;
  width: 16px;
  height: 12px;
  transform: translateX(-50%) translateZ(10px);
  border-radius: 4px 4px 8px 8px;
  background: linear-gradient(180deg, #ffffff 0%, #e9eef5 100%);
  box-shadow: inset 0 2px 3px rgba(255,255,255,.7), 0 2px 4px rgba(0,0,0,.08);
}

/* Braços e mãos */
.arm { position: absolute; top: 16px; width: 16px; height: 10px; }
.arm.left { left: 2px; transform: translateZ(8px) rotateZ(-6deg); }
.arm.right { right: 2px; transform: translateZ(8px) rotateZ(6deg); animation: armWiggle 2.4s ease-in-out infinite; }
.hand { position: absolute; bottom: -2px; left: 6px; width: 10px; height: 10px; border-radius: 50%; background: radial-gradient(60% 60% at 50% 40%, #f1b374 0%, #e2a567 100%); box-shadow: 0 2px 4px rgba(0,0,0,.12); }

/* Escova de banho */
.brush { position: absolute; right: -6px; bottom: -2px; width: 18px; height: 10px; transform: translateZ(10px); }
.handle { position: absolute; left: 0; top: 2px; width: 10px; height: 6px; border-radius: 3px; background: linear-gradient(180deg, var(--pet-secondary, #4aa7d6) 0%, #2e7fae 100%); box-shadow: 0 2px 3px rgba(0,0,0,.12), inset 0 1px 2px rgba(255,255,255,.6); }
.bristle { position: absolute; right: 0; top: 0; width: 10px; height: 10px; border-radius: 2px; background: linear-gradient(180deg, #cfe6fb 0%, #a7cbea 100%); box-shadow: inset 0 2px 3px rgba(255,255,255,.7); }

/* Bolhas sutis */
.bubbles { position: absolute; right: 2px; bottom: 6px; width: 24px; height: 20px; transform: translateZ(12px); }
.bubbles span { position: absolute; bottom: 0; width: 6px; height: 6px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #ffffff 0%, #eaf6ff 70%, rgba(255,255,255,0) 100%); opacity: .9; animation: bubbleUp 3s ease-in-out infinite; }
.bubbles .b1 { left: 2px; animation-delay: 0s; }
.bubbles .b2 { left: 10px; animation-delay: .6s; width: 5px; height: 5px; }
.bubbles .b3 { left: 18px; animation-delay: 1.2s; width: 7px; height: 7px; }

@keyframes bubbleUp {
  0% { transform: translateY(0) scale(1); opacity: .9; }
  70% { transform: translateY(-10px) scale(1.1); opacity: .6; }
  100% { transform: translateY(-14px) scale(1.2); opacity: 0; }
}

@keyframes armWiggle {
  0%, 100% { transform: translateZ(8px) rotateZ(6deg); }
  50% { transform: translateZ(8px) rotateZ(2deg); }
}

.pet-worker-3d:hover .scene {
  transform: rotateX(10deg) rotateY(-9deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>