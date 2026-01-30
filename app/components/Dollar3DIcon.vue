<template>
  <div class="dollar-3d" aria-hidden="true">
    <div class="scene">
      <div class="coin">
        <div class="rim"></div>
        <div class="face"></div>
        <div class="glyph">$</div>
      </div>
      <div class="glow"></div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D de dólar: moeda com símbolo $ em relevo e brilho
</script>

<style scoped>
.dollar-3d { width: 56px; height: 56px; display: inline-block; perspective: 600px; }
.scene { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: rotateX(12deg) rotateY(-10deg); transition: transform 180ms var(--ease-standard); }
.coin {
  position: absolute; inset: 0; border-radius: 50%;
  transform: translateZ(14px);
  box-shadow: 0 10px 16px rgba(0,0,0,0.15);
}
.rim {
  position: absolute; inset: 0; border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 40%, #2b5f8d 0%, #1f4a6b 60%, #183a53 100%);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.12), inset 0 -6px 10px rgba(0,0,0,0.22);
}
.face {
  position: absolute; inset: 8%; border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 50%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.08) 60%, rgba(255,255,255,0) 100%);
  box-shadow: inset 0 1px 2px rgba(255,255,255,0.25), inset 0 -2px 4px rgba(0,0,0,0.2);
}
.glyph {
  position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%) translateZ(20px);
  font-weight: 700; font-size: 26px; color: #fff;
  text-shadow: 0 2px 4px rgba(0,0,0,0.25);
}
.glow { position: absolute; left: 50%; bottom: 6px; width: 40px; height: 40px; transform: translateX(-50%) translateZ(0); border-radius: 50%; background: radial-gradient(60% 60% at 50% 50%, rgba(43,95,141,.35) 0%, rgba(43,95,141,.12) 60%, rgba(43,95,141,0) 100%); }
.dollar-3d:hover .scene { transform: rotateX(10deg) rotateY(-8deg) translateZ(2px); }
</style>