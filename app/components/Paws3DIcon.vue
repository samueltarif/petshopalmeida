<template>
  <div class="paws-3d" role="img" aria-label="Ícone 3D animado de duas patas">
    <div class="scene">
      <div class="paw left">
        <div class="pad main"></div>
        <div class="pad toe t1"></div>
        <div class="pad toe t2"></div>
        <div class="pad toe t3"></div>
        <div class="pad toe t4"></div>
      </div>
      <div class="paw right">
        <div class="pad main"></div>
        <div class="pad toe t1"></div>
        <div class="pad toe t2"></div>
        <div class="pad toe t3"></div>
        <div class="pad toe t4"></div>
      </div>
      <div class="shadow"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Duas patas em 3D com animação sutil alternada (bounce/wag)
</script>

<style scoped>
.paws-3d {
  width: 48px;
  height: 28px;
  display: inline-block;
  perspective: 600px;
  vertical-align: middle;
}

.scene {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(10deg) rotateY(-12deg) translateZ(0);
}

.paw {
  position: absolute;
  bottom: 6px;
  width: 22px;
  height: 20px;
}
.paw.left { left: 2px; animation: wag-left 2.8s ease-in-out infinite; }
.paw.right { right: 2px; transform: translateZ(4px); animation: wag-right 2.8s ease-in-out infinite; }

.pad {
  position: absolute;
  background: radial-gradient(circle at 30% 30%, #704b33 0%, #5b3d29 40%, #3f2a1d 100%);
  box-shadow: inset 3px 3px 5px rgba(255,255,255,0.08), inset -4px -4px 6px rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.25);
}

.pad.main {
  left: 50%;
  bottom: 0;
  width: 14px;
  height: 12px;
  transform: translateX(-50%) translateZ(6px);
  border-radius: 8px 8px 10px 10px;
}

.pad.toe {
  top: 0;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.pad.toe.t1 { left: 0; transform: translateZ(5px); }
.pad.toe.t2 { left: 5px; transform: translateZ(4px); }
.pad.toe.t3 { right: 5px; transform: translateZ(4px); }
.pad.toe.t4 { right: 0; transform: translateZ(5px); }

.shadow {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) rotateX(90deg) translateZ(-2px);
  width: 46px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(ellipse at center, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0) 100%);
  filter: blur(3px);
}

.paws-3d:hover .paw.left, .paws-3d:hover .paw.right { animation-duration: 1.6s; }

@keyframes wag-left {
  0% { transform: translateZ(2px) rotateZ(0deg); }
  50% { transform: translateZ(2px) rotateZ(-4deg) translateY(-1px); }
  100% { transform: translateZ(2px) rotateZ(0deg); }
}
@keyframes wag-right {
  0% { transform: translateZ(4px) rotateZ(0deg); }
  50% { transform: translateZ(4px) rotateZ(4deg) translateY(-1px); }
  100% { transform: translateZ(4px) rotateZ(0deg); }
}
</style>