<template>
  <div class="shower-3d" aria-hidden="true">
    <div class="scene">
      <div class="pipe"></div>
      <div class="elbow"></div>
      <div class="head"></div>
      <div class="spray">
        <div class="jet j1"></div>
        <div class="jet j2"></div>
        <div class="jet j3"></div>
        <div class="jet j4"></div>
        <div class="jet j5"></div>
      </div>
      <div class="drops">
        <div class="drop d1"></div>
        <div class="drop d2"></div>
        <div class="drop d3"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Ícone de chuveiro 3D com cabeça, cano e jatos de água
</script>

<style scoped>
.shower-3d {
  width: 64px;
  height: 64px;
  perspective: 800px;
  display: inline-block;
}

.scene {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(16deg) rotateY(-18deg);
}

.pipe {
  position: absolute;
  left: 10px;
  bottom: 40px;
  width: 6px;
  height: 20px;
  border-radius: 4px;
  background: linear-gradient(180deg, #aeb8c1 0%, #7a8894 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.6);
  transform: translateZ(12px);
}

.elbow {
  position: absolute;
  left: 12px;
  bottom: 48px;
  width: 18px;
  height: 6px;
  border-radius: 4px;
  background: linear-gradient(180deg, #aeb8c1 0%, #7a8894 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.6);
  transform: translateZ(14px);
}

.head {
  position: absolute;
  left: 26px;
  bottom: 44px;
  width: 18px;
  height: 10px;
  border-radius: 8px 8px 10px 10px;
  background: radial-gradient(80% 60% at 50% 40%, #dde4ea 0%, #b8c2cb 60%, #8d99a6 100%);
  box-shadow: 0 8px 12px rgba(0,0,0,.14), inset 0 3px 4px rgba(255,255,255,.5);
  transform: translateZ(16px) rotateZ(-8deg);
}

.spray { position: absolute; left: 30px; bottom: 34px; transform: translateZ(16px); animation: sprayShift 2.6s ease-in-out infinite; }
.jet {
  position: absolute;
  width: 2px;
  height: 16px;
  border-radius: 2px;
  background: linear-gradient(180deg, rgba(120,200,230,.95) 0%, rgba(90,180,220,.7) 60%, rgba(70,160,200,.5) 100%);
  box-shadow: 0 2px 6px rgba(0,0,0,.12);
  filter: blur(.3px);
  opacity: .9;
  background-size: 100% 200%;
  background-position: 0% 0%;
  animation: jetFlow 1.6s var(--ease-standard) infinite, jetShimmer 1.6s linear infinite;
}
.jet.j1 { left: 0px;  transform: rotateZ(-6deg); animation-delay: 0s; }
.jet.j2 { left: 4px;  transform: rotateZ(-2deg); animation-delay: .2s; }
.jet.j3 { left: 8px;  transform: rotateZ(0deg);  animation-delay: .4s; }
.jet.j4 { left: 12px; transform: rotateZ(2deg); animation-delay: .6s; }
.jet.j5 { left: 16px; transform: rotateZ(6deg); animation-delay: .8s; }

.drops { position: absolute; left: 32px; bottom: 18px; transform: translateZ(14px); }
.drop {
  position: absolute;
  width: 4px;
  height: 6px;
  border-radius: 50% 50% 60% 60%;
  background: radial-gradient(60% 60% at 50% 40%, rgba(140,210,240,.9) 0%, rgba(90,180,220,.75) 60%, rgba(70,160,200,.55) 100%);
  box-shadow: 0 2px 4px rgba(0,0,0,.12);
  filter: blur(.2px);
}
.drop.d1 { left: 0px;  animation: drip 1400ms cubic-bezier(.25,.7,.25,1) infinite; }
.drop.d2 { left: 8px;  animation: drip 1600ms cubic-bezier(.25,.7,.25,1) infinite; }
.drop.d3 { left: 16px; animation: drip 1500ms cubic-bezier(.25,.7,.25,1) infinite; }

@keyframes drip {
  0% { transform: translateY(0) translateX(0) translateZ(0) scale(.96); opacity: 0; }
  20% { opacity: 1; }
  50% { transform: translateY(9px) translateX(-.6px) translateZ(-1px) scale(1); opacity: .9; }
  100% { transform: translateY(18px) translateX(.8px) translateZ(-2px) scale(1.04); opacity: 0; }
}

@keyframes jetFlow {
  0% { height: 14px; opacity: .92; }
  40% { height: 18px; opacity: .85; }
  70% { height: 16px; opacity: .9; }
  100% { height: 15px; opacity: .92; }
}

@keyframes jetShimmer {
  0% { background-position: 0% 0%; }
  100% { background-position: 0% 100%; }
}

@keyframes sprayShift {
  0% { transform: translateZ(16px) translateX(0); }
  50% { transform: translateZ(16px) translateX(1px); }
  100% { transform: translateZ(16px) translateX(0); }
}

.shower-3d:hover .scene {
  transform: rotateX(13deg) rotateY(-14deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>