<template>
  <div class="pet-hospital-3d" aria-hidden="true">
    <div class="badge">
      <div class="cross"></div>
      <div class="paw">
      </div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D de hospital pet: medalhão com cruz e pata em relevo
</script>

<style scoped>
.pet-hospital-3d {
  width: 64px;
  height: 64px;
  perspective: 700px;
  display: inline-block;
}

.badge {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(16deg) rotateY(-14deg);
  border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 45%, #ffffff 0%, #f3f7fb 55%, #e6eef7 100%);
  box-shadow:
    0 20px 30px rgba(0, 0, 0, 0.12),
    inset 0 2px 4px rgba(255, 255, 255, 0.8),
    inset 0 -8px 14px rgba(0, 0, 0, 0.06);
}

.badge::before {
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: inherit;
  background: linear-gradient(180deg, #ffffff 0%, #eef3f8 40%, #cfd9e6 100%);
  transform: translateZ(-12px);
  box-shadow: 0 12px 18px rgba(0, 0, 0, 0.15);
}

.cross {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 30px;
  height: 30px;
  transform: translate(-50%, -50%) translateZ(8px);
}
.cross::before,
.cross::after {
  content: "";
  position: absolute;
  background: var(--color-red-500);
  border-radius: 6px;
  box-shadow:
    0 6px 10px rgba(0, 0, 0, 0.15),
    inset 0 2px 2px rgba(255, 255, 255, 0.5);
}
.cross::before { /* vertical */
  width: 10px;
  height: 30px;
  left: 10px;
}
.cross::after { /* horizontal */
  width: 30px;
  height: 10px;
  top: 10px;
}

.paw {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -35%) translateZ(12px);
}

.pet-hospital-3d:hover .badge {
  transform: rotateX(12deg) rotateY(-11deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>