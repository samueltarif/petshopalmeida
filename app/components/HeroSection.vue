<template>
  <section class="hero" id="home">
    <div class="hero-content">
      <h1><AnimePaw :size="34" /><AnimePaw :size="34" /> Banho, Tosa e Táxi Dog em São Paulo</h1>
      <p class="tagline">Cuidado e carinho para seu pet <Heart3DIcon :size="22" /></p>
      <p class="welcome">
        Bem-vindo ao Banho, Tosa e Táxi Dog em São Paulo! Somos especializados em banho, tosa e táxi dog em São Paulo.
        Tratamos seu pet com todo amor e profissionalismo que ele merece.
      </p>
      <div class="hero-cta">
        <AgendeAgoraButton />
      </div>
    </div>
    <ClientOnly>
      <HeroPaws
        :count="28"
        color="#000000"
        :minSize="18"
        :maxSize="42"
        :speed="16"
        :opacityMin="0.10"
        :opacityMax="0.18"
      />
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import AnimePaw from '~/components/AnimePaw.vue'
import Heart3DIcon from '~/components/Heart3DIcon.vue'
import AgendeAgoraButton from '~/components/AgendeAgoraButton.vue'
import HeroPaws from '~/components/HeroPaws.vue'
</script>

<style scoped>
/* CSS FORÇADO para garantir funcionamento no Vercel */
.hero { 
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/foto_capa.png') !important;
  background-size: cover !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-attachment: scroll !important;
  padding: 80px 20px 60px !important; 
  text-align: center !important; 
  position: relative !important; 
  isolation: isolate !important; 
  overflow: hidden !important;
  min-height: 70vh !important;
}

/* Fallback GARANTIDO caso a imagem não carregue no Vercel */
.hero::after {
  content: "" !important;
  position: absolute !important;
  inset: 0 !important;
  background: linear-gradient(135deg, #2B5F8D 0%, #4A90E2 50%, #87CEEB 100%) !important;
  z-index: -2 !important;
}

.hero::before { 
  content: "" !important; 
  position: absolute !important; 
  inset: 0 !important; 
  background: rgba(0,0,0,0.3) !important; 
  z-index: -1 !important; 
}

.hero-content { 
  max-width: 800px !important; 
  margin: 0 auto !important; 
  position: relative !important; 
  z-index: 1 !important;
  background: rgba(0,0,0,0.1) !important;
  backdrop-filter: blur(5px) !important;
  padding: 40px 20px !important;
  border-radius: 20px !important;
}

.hero h1 { 
  font-size: clamp(28px, 5vw, 48px) !important; 
  color: #FFFFFF !important; 
  margin-bottom: 20px !important; 
  font-weight: 800 !important; 
  letter-spacing: -0.02em !important; 
  text-shadow: 3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.9) !important; 
  line-height: 1.2 !important;
}

.hero .tagline { 
  font-size: clamp(18px, 3vw, 24px) !important; 
  color: #FFFFFF !important; 
  margin-bottom: 30px !important; 
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important; 
  font-weight: 600 !important;
}

.hero .welcome { 
  font-size: clamp(16px, 2.5vw, 20px) !important; 
  line-height: 1.6 !important; 
  margin-bottom: 40px !important; 
  color: #FFFFFF !important; 
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8) !important; 
  font-weight: 500 !important;
}

.hero-cta { 
  display: flex !important; 
  flex-direction: column !important; 
  gap: 20px !important; 
  align-items: center !important; 
}

/* Mobile fixes FORÇADOS */
@media (max-width: 768px) {
  .hero {
    background-attachment: scroll !important;
    min-height: 100vh !important;
    padding: 60px 15px 40px !important;
  }
  
  .hero-content {
    background: rgba(0,0,0,0.2) !important;
    backdrop-filter: blur(10px) !important;
    padding: 30px 15px !important;
  }
}
</style>