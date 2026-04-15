<template>
  <div class="car-taxi-3d" aria-hidden="true">
    <div class="scene">
      <div class="car">
        <div class="body"></div>
        <div class="stripe"></div>
        <div class="roof"></div>
        <div class="window front"></div>
        <div class="window side"></div>
        <div class="light front"></div>
        <div class="light rear"></div>
        <div class="sign"><span>TAXI</span></div>
        <div class="wheel left"><div class="rim"></div></div>
        <div class="wheel right"><div class="rim"></div></div>
      </div>
      <div class="speed-lines">
        <span class="sl s1"></span>
        <span class="sl s2"></span>
        <span class="sl s3"></span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Ícone 3D animado de carro táxi (CSS only)
</script>

<style scoped>
.car-taxi-3d { width: 64px; height: 64px; perspective: 700px; display: inline-block; }
.scene { position: relative; width: 100%; height: 100%; transform-style: preserve-3d; transform: rotateX(16deg) rotateY(-14deg); overflow: hidden; }
.car { position: absolute; left: 50%; bottom: 10px; width: 54px; height: 28px; transform: translateX(-50%) translateZ(6px); animation: driveBounce 1.6s ease-in-out infinite; }

.body { position: absolute; bottom: 0; left: 0; width: 54px; height: 16px; border-radius: 8px; background: linear-gradient(180deg, #ffd54d 0%, #ffca28 40%, #f9a825 100%); box-shadow: 0 8px 14px rgba(0,0,0,.12), inset 0 2px 4px rgba(255,255,255,.7); }
.stripe { position: absolute; left: 6px; bottom: 6px; width: 42px; height: 4px; background: repeating-linear-gradient(90deg, #000 0 6px, #fff 6px 12px); border-radius: 2px; opacity: .9; transform: translateZ(7px); }
.roof { position: absolute; left: 8px; bottom: 12px; width: 30px; height: 12px; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; background: linear-gradient(180deg, #ffe082 0%, #fbc02d 100%); transform: translateZ(8px); }

.window { position: absolute; background: linear-gradient(180deg, #eaf6ff 0%, #cfe6fb 60%, #a7cbea 100%); box-shadow: inset 0 2px 4px rgba(255,255,255,.6); }
.window.front { left: 12px; bottom: 14px; width: 12px; height: 10px; border-radius: 4px 6px 4px 4px; transform: translateZ(10px); }
.window.side { left: 26px; bottom: 14px; width: 12px; height: 10px; border-radius: 6px; transform: translateZ(10px); }

.sign { position: absolute; left: 50%; bottom: 24px; transform: translateX(-50%) translateZ(12px); background: #000; color: #fff; font-size: 7px; line-height: 10px; letter-spacing: .5px; padding: 2px 6px; border-radius: 2px; box-shadow: 0 4px 6px rgba(0,0,0,.2), inset 0 1px 2px rgba(255,255,255,.4); animation: signWobble 2.2s ease-in-out infinite; }
.sign span { font-weight: 700; font-family: system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }

.light.front { position: absolute; right: -2px; bottom: 6px; width: 6px; height: 4px; border-radius: 2px; background: radial-gradient(circle at 30% 50%, #fff7c2 0%, #ffd766 70%, #f4a836 100%); box-shadow: 0 0 8px rgba(255, 210, 90, .7); transform: translateZ(8px); }
.light.rear { position: absolute; left: -3px; bottom: 7px; width: 5px; height: 3px; border-radius: 2px; background: radial-gradient(circle at 40% 50%, #ffb3b3 0%, #ff6a6a 60%, #d43c3c 100%); box-shadow: 0 0 6px rgba(255, 90, 90, .6); transform: translateZ(8px); }

.wheel { position: absolute; bottom: -4px; width: 14px; height: 14px; border-radius: 50%; background: radial-gradient(circle at 30% 30%, #222 0%, #111 50%, #000 100%); box-shadow: 0 6px 10px rgba(0,0,0,.25); transform: translateZ(2px); animation: wheelSpin 1.1s linear infinite; }
.wheel.left { left: 8px; }
.wheel.right { right: 8px; animation-delay: .15s; }
.rim { position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; transform: translate(-50%, -50%); border-radius: 50%; background: radial-gradient(circle, #cfd6db 0%, #a9b2b9 70%, #848e95 100%); }

@keyframes wheelSpin { from { transform: translateZ(2px) rotate(0deg); } to { transform: translateZ(2px) rotate(360deg); } }

@keyframes driveBounce {
  0% { transform: translateX(-50%) translateZ(6px) translateY(0) rotateZ(0deg); }
  25% { transform: translateX(-50%) translateZ(6px) translateY(-0.8px) rotateZ(.6deg); }
  50% { transform: translateX(-50%) translateZ(6px) translateY(0) rotateZ(0deg); }
  75% { transform: translateX(-50%) translateZ(6px) translateY(.7px) rotateZ(-.6deg); }
  100% { transform: translateX(-50%) translateZ(6px) translateY(0) rotateZ(0deg); }
}

@keyframes signWobble {
  0% { transform: translateX(-50%) translateZ(12px) rotateZ(0deg); }
  50% { transform: translateX(-50%) translateZ(12px) rotateZ(.8deg); }
  100% { transform: translateX(-50%) translateZ(12px) rotateZ(0deg); }
}

.speed-lines { position: absolute; left: 0; bottom: 10px; width: 100%; height: 18px; transform: translateZ(0); pointer-events: none; }
.sl { position: absolute; left: 110%; height: 3px; border-radius: 2px; background: linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.28) 50%, rgba(0,0,0,0) 100%); opacity: 0; filter: blur(.4px); animation: rush 1.2s linear infinite; }
.s1 { top: 6px; width: 26px; animation-delay: 0s; }
.s2 { top: 10px; width: 18px; animation-delay: .22s; }
.s3 { top: 14px; width: 14px; animation-delay: .44s; }

@keyframes rush {
  0% { transform: translateX(0); opacity: 0; }
  10% { opacity: .8; }
  100% { transform: translateX(-220%); opacity: 0; }
}

.car-taxi-3d:hover .scene { transform: rotateX(12deg) rotateY(-11deg) translateZ(2px); transition: transform 180ms var(--ease-standard); }
</style>