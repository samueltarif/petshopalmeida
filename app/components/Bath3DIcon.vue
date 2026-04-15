<template>
  <div class="bath-3d" aria-hidden="true">
  <div class="scene">
    <div class="tub-body"></div>
    <div class="tub-lip"></div>
    <div class="water"></div>
    <div class="foam f1"></div>
    <div class="foam f2"></div>
    <div class="foam f3"></div>
    <div class="bubbles">
      <span class="bubble b1"></span>
      <span class="bubble b2"></span>
      <span class="bubble b3"></span>
      <span class="bubble b4"></span>
      <span class="bubble b5"></span>
    </div>
    <div class="faucet">
      <div class="pipe"></div>
      <div class="spout"></div>
      <div class="shower"></div>
    </div>
      <div class="foot left"></div>
      <div class="foot right"></div>
    </div>
  </div>
</template>

<script setup>
// Banheira estilo "clawfoot" (pés clássicos) com relevo 3D
</script>

<style scoped>
.bath-3d {
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
  transform: rotateX(18deg) rotateY(-14deg);
}

.tub-body {
  position: absolute;
  left: 50%;
  bottom: 12px;
  width: 54px;
  height: 22px;
  transform: translateX(-50%) translateZ(6px);
  border-radius: 16px 16px 20px 20px;
  background: radial-gradient(70% 60% at 50% 40%, #ffffff 0%, #f3f7fb 55%, #dfe6ef 100%);
  box-shadow:
    0 12px 18px rgba(0,0,0,.14),
    inset 0 3px 6px rgba(255,255,255,.85),
    inset 0 -6px 10px rgba(0,0,0,.06);
}
.tub-body::before { /* leve espessura externa */
  content: "";
  position: absolute;
  inset: -6px;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff 0%, #ecf2f8 45%, #cfd9e6 100%);
  transform: translateZ(-12px);
  box-shadow: 0 12px 18px rgba(0,0,0,.15);
}

.tub-lip {
  position: absolute;
  left: 50%;
  bottom: 32px;
  width: 56px;
  height: 10px;
  transform: translateX(-50%) translateZ(10px);
  border-radius: 10px;
  background: linear-gradient(180deg, #eaf0f6 0%, #d7e2ee 100%);
  box-shadow: 0 10px 14px rgba(0,0,0,.1), inset 0 2px 3px rgba(255,255,255,.75);
}

.water {
  position: absolute;
  left: 50%;
  bottom: 30px;
  width: 46px;
  height: 9px;
  transform: translateX(-50%) translateZ(12px);
  border-radius: 7px;
  background: linear-gradient(180deg, var(--pet-secondary) 0%, #66bfe8 60%, #4aa7d6 100%);
  box-shadow: inset 0 3px 6px rgba(255,255,255,.8);
}

.foam {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffffff 0%, #eef6fc 60%, #d1dbe7 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 3px rgba(255,255,255,.85);
}
.foam.f1 { width: 10px; height: 10px; left: 22px; bottom: 40px; transform: translateZ(14px); }
.foam.f2 { width: 8px; height: 8px; left: 34px; bottom: 42px; transform: translateZ(16px); }
.foam.f3 { width: 6px; height: 6px; left: 40px; bottom: 36px; transform: translateZ(15px); }

.bubbles { position: absolute; left: 50%; bottom: 34px; width: 60px; height: 40px; transform: translateX(-50%); pointer-events: none; }
.bubble { position: absolute; width: 8px; height: 8px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.6) 60%, rgba(255,255,255,.2) 100%); box-shadow: inset 0 0 4px rgba(255,255,255,.8), 0 2px 6px rgba(0,0,0,.12); opacity: 0; transform: translateZ(18px); animation: bubbleRise 2.6s ease-in infinite; }
.bubble.b1 { left: 18px; animation-delay: 0s; }
.bubble.b2 { left: 26px; width: 6px; height: 6px; animation-delay: .5s; }
.bubble.b3 { left: 36px; width: 7px; height: 7px; animation-delay: 1s; }
.bubble.b4 { left: 12px; width: 5px; height: 5px; animation-delay: 1.4s; }
.bubble.b5 { left: 42px; width: 6px; height: 6px; animation-delay: 1.8s; }

@keyframes bubbleRise {
  0% { transform: translateZ(18px) translateY(0) scale(.8); opacity: 0; }
  15% { opacity: .9; }
  50% { transform: translateZ(18px) translateY(-14px) scale(1); opacity: .7; }
  100% { transform: translateZ(10px) translateY(-28px) scale(1.05); opacity: 0; }
}

.faucet { position: absolute; left: 8px; bottom: 34px; transform: translateZ(16px); }
.pipe {
  width: 3px;
  height: 16px;
  background: linear-gradient(180deg, #9aa8b2 0%, #6c7a86 100%);
  border-radius: 4px;
  box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.6);
}
.spout {
  position: absolute;
  left: 4px;
  top: 10px;
  width: 12px;
  height: 5px;
  border-radius: 4px;
  background: linear-gradient(180deg, #9aa8b2 0%, #6c7a86 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.6);
}
.shower {
  position: absolute;
  left: 16px;
  top: 6px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: linear-gradient(180deg, #aeb8c1 0%, #7a8894 100%);
  box-shadow: 0 6px 10px rgba(0,0,0,.12), inset 0 2px 2px rgba(255,255,255,.55);
}

.foot {
  position: absolute;
  bottom: 6px;
  width: 12px;
  height: 6px;
  border-radius: 8px;
  background: linear-gradient(180deg, #e0b05a 0%, #c48c2f 100%);
  box-shadow: 0 8px 12px rgba(0,0,0,.18);
  transform: translateZ(2px);
}
.foot.left { left: 10px; }
.foot.right { right: 10px; }

.bath-3d:hover .scene {
  transform: rotateX(13deg) rotateY(-11deg) translateZ(2px);
  transition: transform 180ms var(--ease-standard);
}
</style>