<template>
  <div class="scissors-3d" aria-hidden="true">
    <div class="scene">
      <div class="pivot"></div>
      <div class="blade blade-top"></div>
      <div class="blade blade-bottom"></div>
      <div class="shank shank-top"></div>
      <div class="shank shank-bottom"></div>
      <div class="handle handle-top"></div>
      <div class="handle handle-bottom"></div>
      <div class="floor-shadow"></div>
    </div>
  </div>
</template>

<script setup>
// Tesoura 3D moderna: lâminas finas e cabos ovais com anel.
// Animação discreta apenas no hover.
</script>

<style scoped>
.scissors-3d {
  width: 64px;
  height: 64px;
  display: inline-block;
  perspective: 900px;
}
.scene {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transform: rotateX(17deg) rotateY(-15deg);
}

.pivot {
  position: absolute;
  left: 28px;
  bottom: 32px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 40%, #e6ebf0 0%, #b8c2cb 60%, #8d99a6 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.14), inset 0 2px 3px rgba(255,255,255,.6);
  transform: translateZ(16px);
}

.blade {
  position: absolute;
  left: 30px;
  bottom: 34px;
  width: 32px;
  height: 4px;
  border-radius: 3px;
  background: linear-gradient(180deg, #eef2f5 0%, #c9d3db 60%, #98a6b3 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.14), inset 0 2px 3px rgba(255,255,255,.6);
  transform-origin: left center;
}
.blade::before { /* brilho sutil */
  content: "";
  position: absolute;
  left: 4px;
  right: 8px;
  top: 0;
  bottom: 0;
  border-radius: 3px;
  background: linear-gradient(180deg, rgba(255,255,255,.65), rgba(255,255,255,0));
}
.blade::after { /* ponta afiada */
  content: "";
  position: absolute;
  right: -8px;
  top: 0;
  width: 10px;
  height: 4px;
  border-radius: 0 4px 4px 0;
  background: linear-gradient(180deg, #dfe6ec 0%, #b4bfca 60%, #8a97a4 100%);
}
.blade-top { transform: translateZ(16px) rotateZ(8deg); animation: snipTop 1.8s cubic-bezier(.25,.7,.25,1) infinite; }
.blade-bottom { transform: translateZ(12px) rotateZ(-8deg); animation: snipBottom 1.8s cubic-bezier(.25,.7,.25,1) infinite; }

/* hastes conectando lâminas aos cabos */
.shank {
  position: absolute;
  width: 20px;
  height: 5px;
  border-radius: 4px;
  background: linear-gradient(180deg, #e6ebf0 0%, #bfc9d2 60%, #97a4b1 100%);
  box-shadow: 0 5px 8px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.6);
}
.shank-top { left: 16px; bottom: 36px; transform: translateZ(12px) rotateZ(18deg); }
.shank-bottom { left: 18px; bottom: 22px; transform: translateZ(10px) rotateZ(-18deg); }

.handle {
  position: absolute;
  width: 22px;
  height: 16px;
  border-radius: 14px;
  background: linear-gradient(180deg, #556270 0%, #3e4d59 100%);
  box-shadow: 0 8px 12px rgba(0,0,0,.14), inset 0 3px 5px rgba(255,255,255,.65);
}
.handle::before { /* furo oval do cabo */
  content: "";
  position: absolute;
  inset: 4px 5px;
  border-radius: 10px;
  background: var(--color-white, #fff);
  box-shadow: inset 0 2px 3px rgba(0,0,0,.06);
}
.handle-top { left: 6px; bottom: 38px; transform: translateZ(10px) rotateZ(22deg); }
.handle-bottom { left: 10px; bottom: 18px; transform: translateZ(8px) rotateZ(-22deg); }

.floor-shadow {
  position: absolute;
  left: 14px;
  bottom: 8px;
  width: 44px;
  height: 12px;
  border-radius: 50%;
  background: radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,.16) 0%, rgba(0,0,0,.08) 60%, rgba(0,0,0,0) 100%);
  transform: translateZ(0);
}

.scissors-3d:hover .blade-top { animation-duration: 1.2s; }
.scissors-3d:hover .blade-bottom { animation-duration: 1.2s; }
.scissors-3d:hover .scene { transform: rotateX(15deg) rotateY(-12deg) translateZ(2px); transition: transform 180ms var(--ease-standard); }

@keyframes snipTop {
  0% { transform: translateZ(16px) rotateZ(8deg); }
  22% { transform: translateZ(16px) rotateZ(20deg); }
  44% { transform: translateZ(16px) rotateZ(6deg); }
  64% { transform: translateZ(16px) rotateZ(18deg); }
  100% { transform: translateZ(16px) rotateZ(8deg); }
}

@keyframes snipBottom {
  0% { transform: translateZ(12px) rotateZ(-8deg); }
  22% { transform: translateZ(12px) rotateZ(-20deg); }
  44% { transform: translateZ(12px) rotateZ(-6deg); }
  64% { transform: translateZ(12px) rotateZ(-18deg); }
  100% { transform: translateZ(12px) rotateZ(-8deg); }
}
</style>