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
.hero { 
  background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/images/foto_capa.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 80px 20px 60px; 
  text-align: center; 
  position: relative; 
  isolation: isolate; 
  overflow: hidden;
  min-height: 70vh;
}

/* Fallback caso a imagem não carregue no Vercel */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #2B5F8D 0%, #4A90E2 50%, #87CEEB 100%);
  z-index: -2;
}

.hero::before { 
  content: ""; 
  position: absolute; 
  inset: 0; 
  background: rgba(0,0,0,0.3); 
  z-index: -1; 
}

.hero-content { 
  max-width: 800px; 
  margin: 0 auto; 
  position: relative; 
  z-index: 1;
  background: rgba(0,0,0,0.1);
  backdrop-filter: blur(5px);
  padding: 40px 20px;
  border-radius: 20px;
}

.hero h1 { 
  font-size: clamp(28px, 5vw, 48px); 
  color: #FFFFFF !important; 
  margin-bottom: 20px; 
  font-weight: 800; 
  letter-spacing: -0.02em; 
  text-shadow: 3px 3px 6px rgba(0,0,0,0.8), 1px 1px 3px rgba(0,0,0,0.9); 
  line-height: 1.2;
}

.hero .tagline { 
  font-size: clamp(18px, 3vw, 24px); 
  color: #FFFFFF !important; 
  margin-bottom: 30px; 
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8); 
  font-weight: 600;
}

.hero .welcome { 
  font-size: clamp(16px, 2.5vw, 20px); 
  line-height: 1.6; 
  margin-bottom: 40px; 
  color: #FFFFFF !important; 
  text-shadow: 2px 2px 4px rgba(0,0,0,0.8); 
  font-weight: 500;
}

.hero-cta { 
  display: flex; 
  flex-direction: column; 
  gap: 20px; 
  align-items: center; 
}

/* Mobile fixes */
@media (max-width: 768px) {
  .hero {
    background-attachment: scroll;
    min-height: 100vh;
    padding: 60px 15px 40px;
  }
  
  .hero-content {
    background: rgba(0,0,0,0.2);
    backdrop-filter: blur(10px);
    padding: 30px 15px;
  }
}
</style>