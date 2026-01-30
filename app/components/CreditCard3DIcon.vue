<template>
  <div class="card-3d" aria-hidden="true">
    <div class="scene">
      <div class="body">
        <div class="chip"></div>
        <div class="stripe"></div>
        <div class="digits d1"></div>
        <div class="digits d2"></div>
        <div class="digits d3"></div>
      </div>
      <div class="shine"></div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D de cartão de crédito: cartão com chip, faixa e números em relevo
</script>

<style scoped>
.card-3d { width: 64px; height: 42px; display: inline-block; perspective: 600px; }
.scene { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: rotateX(12deg) rotateY(-10deg); transition: transform 180ms var(--ease-standard); }
.body {
  position: absolute; inset: 0; border-radius: 6px;
  background: linear-gradient(135deg, #2b5f8d 0%, #1f4a6b 60%, #183a53 100%);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -4px 8px rgba(0,0,0,0.2), 0 8px 14px rgba(0,0,0,0.16);
  transform: translateZ(16px);
}
.chip {
  position: absolute; left: 8px; top: 8px; width: 14px; height: 10px; border-radius: 2px;
  background: linear-gradient(135deg, #d9d9d9, #b8b8b8);
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.6), inset 0 -1px 2px rgba(0,0,0,0.25);
}
.stripe { position: absolute; right: 6px; top: 10px; width: 24px; height: 6px; border-radius: 2px; background: rgba(255,255,255,0.18); }
.digits { position: absolute; left: 8px; bottom: 8px; height: 3px; border-radius: 2px; background: rgba(255,255,255,0.7); box-shadow: 0 1px 1px rgba(0,0,0,0.15); }
.digits.d1 { width: 24px; transform: translateZ(20px); }
.digits.d2 { width: 18px; transform: translateZ(18px); bottom: 13px; opacity: 0.9; }
.digits.d3 { width: 30px; transform: translateZ(16px); bottom: 18px; opacity: 0.8; }
.shine { position: absolute; left: 6px; top: 6px; width: 70%; height: 38%; transform: translateZ(22px) rotate(-18deg); border-radius: 8px; background: linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0)); filter: blur(2px); pointer-events: none; }
.card-3d:hover .scene { transform: rotateX(10deg) rotateY(-8deg) translateZ(2px); }
</style>