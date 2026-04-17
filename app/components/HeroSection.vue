<template>
  <section id="inicio" class="relative h-screen flex items-center justify-center overflow-hidden bg-sky-400">
    <!-- Animação Lottie de fundo com overlay escuro -->
    <div class="absolute inset-0 z-0 w-full h-full flex items-center justify-center bg-sky-400">
      <LottieAnimation 
        animation-url="/animations/Dog in the park.json"
      />
      <!-- Overlay escuro para melhor legibilidade -->
      <div class="absolute inset-0 bg-black/50"></div>
    </div>
    
    <!-- Conteúdo principal -->
    <div class="relative z-10 text-center text-white px-6 max-w-5xl mx-auto">
      <!-- Título principal - H1 -->
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 animate-fade-in leading-tight tracking-tight">
        Banho, Tosa e Táxi Dog
        <span class="block text-4xl md:text-5xl lg:text-6xl mt-2 text-green-400 font-bold">
          em São Paulo
        </span>
      </h1>
      
      <!-- Subtítulo -->
      <p class="text-2xl md:text-3xl mb-4 animate-fade-in font-semibold text-green-300 flex items-center justify-center gap-3" style="animation-delay: 0.2s;">
        <i class="fas fa-heart text-red-400 text-2xl"></i>
        Cuidado profissional para seu pet
      </p>
      
      <!-- Descrição curta -->
      <p class="text-lg md:text-xl mb-10 max-w-3xl mx-auto animate-fade-in text-gray-100 font-light leading-relaxed" style="animation-delay: 0.3s;">
        Serviços completos na Zona Norte. Profissionais qualificados e ambiente acolhedor.
      </p>
      
      <!-- CTA Button -->
      <button 
        @click="handleSchedule"
        class="bg-green-500 text-white px-10 py-5 rounded-full text-xl md:text-2xl font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-xl animate-fade-in flex items-center gap-3 mx-auto group"
        style="animation-delay: 0.4s;"
      >
        <i class="fab fa-whatsapp text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
        Agende Agora
      </button>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-soft z-10">
      <i class="fas fa-chevron-down text-white text-4xl opacity-80"></i>
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
  filter: blur(1px); /* Blur sutil para não distrair */
}

:deep(.lottie-animation canvas),
:deep(.lottie-animation svg) {
  width: 100% !important;
  height: 100% !important;
  object-fit: cover !important;
}

/* Animações suaves */
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out forwards;
  opacity: 0;
}

@keyframes bounce-soft {
  0%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  50% {
    transform: translateY(-10px) translateX(-50%);
  }
}

.animate-bounce-soft {
  animation: bounce-soft 2s ease-in-out infinite;
}

/* Responsividade mobile */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem !important;
    line-height: 1.2;
  }
  
  h1 span {
    font-size: 2rem !important;
  }
}
</style>
