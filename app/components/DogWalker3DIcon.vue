<template>
  <div class="dog-walker-3d" aria-hidden="true">
    <div class="scene">
      <!-- Cão estilizado -->
      <div class="dog">
        <div class="head"></div>
        <div class="ear left"></div>
        <div class="ear right"></div>
        <div class="eye left"></div>
        <div class="eye right"></div>
        <div class="nose"></div>
        <div class="collar"></div>
        <div class="tag"></div>
      </div>
      <!-- Guia (coleira/leash) com leve balanço -->
      <div class="leash">
        <div class="line"></div>
        <div class="handle"></div>
      </div>
      <!-- Passos animados no chão -->
      <div class="steps">
        <span class="s1"></span>
        <span class="s2"></span>
        <span class="s3"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D animado para Dog Walker (CSS only)
</script>

<style scoped>
.dog-walker-3d { width: 64px; height: 64px; perspective: 800px; display: inline-block; }
.scene { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: rotateX(16deg) rotateY(-14deg); }

.dog { position: absolute; left: 50%; bottom: 16px; width: 44px; height: 34px; transform: translateX(-50%) translateZ(10px); }
.head { position: absolute; left: 8px; bottom: 10px; width: 26px; height: 22px; border-radius: 12px; background: radial-gradient(70% 60% at 50% 40%, #efdfc7 0%, #dcc5a5 55%, #c7aa82 100%); box-shadow: 0 8px 14px rgba(0,0,0,.14), inset 0 2px 4px rgba(255,255,255,.75); }
.ear { position: absolute; width: 10px; height: 12px; background: linear-gradient(180deg, #d2b894 0%, #b89a70 100%); border-radius: 6px; box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 3px rgba(255,255,255,.6); }
.ear.left { left: 10px; bottom: 22px; transform: translateZ(12px) rotateZ(-10deg); animation: earSwing 3.2s ease-in-out infinite; }
.ear.right { left: 22px; bottom: 22px; transform: translateZ(12px) rotateZ(10deg); animation: earSwing 3.2s ease-in-out infinite reverse; }
@keyframes earSwing { 0%,100%{ transform: translateZ(12px) rotateZ(10deg);} 50%{ transform: translateZ(12px) rotateZ(4deg);} }

.eye { position: absolute; width: 4px; height: 4px; border-radius: 50%; background: #1a1a1a; box-shadow: 0 0 0 2px rgba(255,255,255,.4); }
.eye.left { left: 14px; bottom: 18px; transform: translateZ(16px); }
.eye.right { left: 20px; bottom: 18px; transform: translateZ(16px); }
.nose { position: absolute; left: 20px; bottom: 14px; width: 6px; height: 4px; border-radius: 3px; background: linear-gradient(180deg,#444 0%,#222 100%); transform: translateZ(18px); }

.collar { position: absolute; left: 9px; bottom: 12px; width: 24px; height: 5px; border-radius: 5px; background: linear-gradient(180deg, var(--pet-secondary, #4aa7d6) 0%, #2e7fae 100%); box-shadow: 0 3px 5px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.7); transform: translateZ(10px); }
.tag { position: absolute; left: 20px; bottom: 9px; width: 6px; height: 6px; border-radius: 50%; background: linear-gradient(180deg,#ffd27a 0%, #e6b44a 100%); box-shadow: 0 3px 4px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.7); transform: translateZ(10px); }

/* Leash */
.leash { position: absolute; left: 30px; bottom: 18px; width: 26px; height: 20px; transform: translateZ(12px); }
.line { position: absolute; left: 0; bottom: 6px; width: 22px; height: 2px; background: linear-gradient(90deg, #2e7fae 0%, #4aa7d6 100%); border-radius: 2px; transform-origin: left center; animation: leashSwing 2.6s ease-in-out infinite; box-shadow: 0 2px 3px rgba(0,0,0,.12); }
.handle { position: absolute; right: 0; bottom: 0; width: 10px; height: 10px; border-radius: 6px; background: radial-gradient(circle at 30% 30%, #eaf6ff 0%, #cfe6fb 60%, #a7cbea 100%); box-shadow: inset 0 2px 3px rgba(255,255,255,.7), 0 4px 6px rgba(0,0,0,.15); animation: handleBob 2.6s ease-in-out infinite; }
@keyframes leashSwing { 0%,100{ transform: rotateZ(6deg);} 50%{ transform: rotateZ(-6deg);} }
@keyframes handleBob { 0%,100{ transform: translateY(0);} 50%{ transform: translateY(1px);} }

/* Passos no chão */
.steps { position: absolute; left: 14px; bottom: 6px; width: 40px; height: 10px; transform: translateZ(0); }
.steps span { position: absolute; bottom: 0; width: 8px; height: 4px; border-radius: 6px; background: radial-gradient(60% 60% at 50% 50%, rgba(0,0,0,.16) 0%, rgba(0,0,0,.08) 60%, rgba(0,0,0,0) 100%); opacity: 0; animation: stepFade 2.2s ease-in-out infinite; }
.steps .s1 { left: 0; animation-delay: 0s; }
.steps .s2 { left: 14px; animation-delay: .6s; }
.steps .s3 { left: 28px; animation-delay: 1.2s; }
@keyframes stepFade { 0%{ opacity: 0; transform: translateY(0);} 20%{ opacity: .9; transform: translateY(0);} 100%{ opacity: 0; transform: translateY(-4px);} }

.dog-walker-3d:hover .scene { transform: rotateX(14deg) rotateY(-12deg) translateZ(2px); transition: transform 180ms var(--ease-standard); }
</style>