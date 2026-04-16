<template>
  <section id="inicio" class="relative h-screen flex items-center justify-center overflow-hidden bg-sky-400">
    <!-- Animação Lottie de fundo -->
    <div class="absolute inset-0 z-0 w-full h-full flex items-center justify-center bg-sky-400">
      <LottieAnimation 
        animation-url="/animations/Dog in the park.json"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-blue-900/30 via-transparent to-blue-900/30"></div>
    </div>
    
    <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
      <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fade-in drop-shadow-lg">
        Banho, Tosa e Táxi Dog em São Paulo
      </h1>
      <p class="text-xl md:text-2xl mb-6 animate-fade-in flex items-center justify-center gap-2 drop-shadow-lg" style="animation-delay: 0.2s;">
        <i class="fas fa-heart text-red-500"></i>
        Cuidado e carinho para seu pet
      </p>
      <p class="text-lg mb-8 max-w-2xl mx-auto animate-fade-in drop-shadow-lg" style="animation-delay: 0.4s;">
        Oferecemos serviços completos de banho, tosa e transporte para seu pet na Zona Norte de São Paulo. 
        Profissionais qualificados e ambiente acolhedor para garantir o bem-estar do seu melhor amigo.
      </p>
      <button 
        @click="handleSchedule"
        class="bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg animate-fade-in flex items-center gap-2 mx-auto"
        style="animation-delay: 0.6s;"
      >
        <i class="fab fa-whatsapp"></i>
        Agende Agora
      </button>
    </div>
    
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-soft z-10">
      <i class="fas fa-chevron-down text-white text-3xl drop-shadow-lg"></i>
    </div>
  </section>
</template>

<script setup lang="ts">
const handleSchedule = () => {
  const phone = '5511993602794'
  const message = 'Olá! Gostaria de agendar um serviço para meu pet.'
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
}
</script>

<style scoped>
/* Garantir que a animação preencha todo o espaço */
:deep(.lottie-animation) {
  position: absolute !important;
  top: 0 !important;
  left: 0 !important;
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

:deep(.lottie-animation canvas),
:deep(.lottie-animation svg) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}
</style>
