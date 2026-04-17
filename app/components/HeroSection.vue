<template>
  <section id="inicio" class="relative min-h-screen flex flex-col items-start justify-center overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-6 md:px-12 lg:px-20">
    
    <!-- Animação de fundo apenas para desktop -->
    <div class="hidden lg:block absolute inset-0 z-0 w-full h-full">
      <LottieAnimation 
        animation-url="/animations/Dog in the park.json"
        class="w-full h-full opacity-20"
      />
    </div>
    
    <!-- Conteúdo principal -->
    <div class="relative z-10 w-full lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16 2xl:gap-20 lg:items-center max-w-7xl 2xl:max-w-[1600px]">
      
      <!-- Coluna esquerda - Texto -->
      <div class="lg:pr-8">
        <!-- Badge Zona Norte -->
        <div class="mb-8 animate-fade-in">
          <span class="bg-blue-200 text-blue-800 px-8 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider inline-block">
            Zona Norte • São Paulo
          </span>
        </div>
        
        <!-- Título principal - H1 -->
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 animate-fade-in leading-tight tracking-tight text-gray-900" style="animation-delay: 0.1s;">
          Banho, Tosa e
          <br>
          <span class="text-5xl md:text-7xl lg:text-8xl text-blue-600 font-extrabold">
            Táxi Dog
          </span>
          <span class="text-gray-900"> em</span>
          <br>
          <span class="text-5xl md:text-7xl lg:text-8xl text-gray-900 font-extrabold">
            São Paulo
          </span>
        </h1>
        
        <!-- Descrição -->
        <div class="text-base md:text-lg mb-8 lg:mb-12 animate-fade-in text-gray-500 font-normal leading-relaxed max-w-2xl" style="animation-delay: 0.2s;">
          <p class="mb-2">Cuidado e carinho para seu pet na</p>
          <p class="mb-2">Zona Norte de São Paulo.</p>
          <p>Profissionais qualificados e ambiente acolhedor.</p>
        </div>
        
        <!-- CTA Button -->
        <button 
          @click="handleSchedule"
          class="bg-green-500 text-white px-10 py-5 rounded-full text-xl md:text-2xl font-bold hover:bg-green-600 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl shadow-xl animate-fade-in flex items-center gap-3 group mb-12 lg:mb-0"
          style="animation-delay: 0.4s;"
        >
          <i class="fab fa-whatsapp text-2xl group-hover:rotate-12 transition-transform duration-300"></i>
          Agende Agora
        </button>
      </div>
      
      <!-- Coluna direita - Animação (mobile e tablet) -->
      <div class="lg:hidden w-full max-w-4xl animate-fade-in" style="animation-delay: 0.3s;">
        <div class="w-full h-64 md:h-96 flex items-center justify-start">
          <LottieAnimation 
            animation-url="/animations/Dog in the park.json"
            class="w-full h-full"
          />
        </div>
      </div>
      
      <!-- Coluna direita - Animação (desktop) -->
      <div class="hidden lg:flex w-full h-[500px] xl:h-[600px] 2xl:h-[700px] items-center justify-center animate-fade-in" style="animation-delay: 0.3s;">
        <LottieAnimation 
          animation-url="/animations/Dog in the park.json"
          class="w-full h-full object-contain"
        />
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-soft z-10">
      <i class="fas fa-chevron-down text-gray-600 text-4xl opacity-60"></i>
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
