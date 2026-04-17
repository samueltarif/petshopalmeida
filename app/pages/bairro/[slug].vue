<template>
  <div class="relative">
    <HeaderBar />
    
    <!-- Animações de fundo -->
    <div class="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <!-- Animação 1 - Canto superior esquerdo -->
      <div class="absolute top-20 left-10 w-24 h-24 opacity-10 animate-float-diagonal-1">
        <LottieAnimation 
          animation-url="/animations/dog.json"
          class="w-full h-full"
        />
      </div>
      
      <!-- Animação 2 - Canto superior direito -->
      <div class="absolute top-32 right-16 w-28 h-28 opacity-10 animate-float-diagonal-2">
        <LottieAnimation 
          animation-url="/animations/Dog Running.json"
          class="w-full h-full"
        />
      </div>
      
      <!-- Animação 3 - Meio esquerda -->
      <div class="absolute top-1/3 left-20 w-20 h-20 opacity-10 animate-float-diagonal-3">
        <LottieAnimation 
          animation-url="/animations/Woman holding a Dog.json"
          class="w-full h-full"
        />
      </div>
      
      <!-- Animação 4 - Meio direita -->
      <div class="absolute top-1/2 right-24 w-32 h-32 opacity-10 animate-float-diagonal-4">
        <LottieAnimation 
          animation-url="/animations/dog.json"
          class="w-full h-full"
        />
      </div>
      
      <!-- Animação 5 - Inferior esquerda -->
      <div class="absolute bottom-32 left-16 w-24 h-24 opacity-10 animate-float-diagonal-1">
        <LottieAnimation 
          animation-url="/animations/Taking the Duggy out.json"
          class="w-full h-full"
        />
      </div>
      
      <!-- Animação 6 - Inferior direita -->
      <div class="absolute bottom-20 right-20 w-28 h-28 opacity-10 animate-float-diagonal-2">
        <LottieAnimation 
          animation-url="/animations/Dog Running.json"
          class="w-full h-full"
        />
      </div>
    </div>
    
    <section class="relative z-10 pt-32 pb-12 overflow-hidden text-white">
      <!-- Fundo com animações desfocadas -->
      <div class="absolute inset-0 bg-gradient-to-r from-[var(--pet-primary)] to-[var(--pet-secondary)] opacity-90"></div>
      
      <div class="absolute inset-0 overflow-hidden">
        <!-- Animação 1 -->
        <div class="absolute top-10 left-10 w-40 h-40 blur-md opacity-30 animate-float-diagonal-1">
          <LottieAnimation 
            animation-url="/animations/dog.json"
            class="w-full h-full"
          />
        </div>
        
        <!-- Animação 2 -->
        <div class="absolute top-5 right-20 w-48 h-48 blur-md opacity-25 animate-float-diagonal-2">
          <LottieAnimation 
            animation-url="/animations/Dog Running.json"
            class="w-full h-full"
          />
        </div>
        
        <!-- Animação 3 -->
        <div class="absolute top-20 left-1/3 w-36 h-36 blur-md opacity-20 animate-float-diagonal-3">
          <LottieAnimation 
            animation-url="/animations/Woman holding a Dog.json"
            class="w-full h-full"
          />
        </div>
        
        <!-- Animação 4 -->
        <div class="absolute top-0 right-1/4 w-44 h-44 blur-md opacity-30 animate-float-diagonal-4">
          <LottieAnimation 
            animation-url="/animations/Taking the Duggy out.json"
            class="w-full h-full"
          />
        </div>
        
        <!-- Animação 5 -->
        <div class="absolute bottom-5 left-1/4 w-40 h-40 blur-md opacity-25 animate-float-diagonal-1">
          <LottieAnimation 
            animation-url="/animations/dog.json"
            class="w-full h-full"
          />
        </div>
        
        <!-- Animação 6 -->
        <div class="absolute bottom-10 right-10 w-48 h-48 blur-md opacity-30 animate-float-diagonal-2">
          <LottieAnimation 
            animation-url="/animations/Dog in the park.json"
            class="w-full h-full"
          />
        </div>
      </div>
      
      <div class="container mx-auto px-4 text-center relative z-10">
        <h1 class="mb-4">Banho e Tosa em {{ bairroData.nome }}</h1>
        <p class="text-xl max-w-2xl mx-auto">
          Atendemos a região de {{ bairroData.nome }} com carinho e profissionalismo
        </p>
      </div>
    </section>
    
    <section class="relative z-10 py-20 bg-white">
      <div class="container mx-auto px-4">
        <div class="max-w-4xl mx-auto mb-12">
          <h2 class="text-3xl font-bold text-[var(--pet-primary)] mb-6">Sobre o Atendimento em {{ bairroData.nome }}</h2>
          <p class="text-lg text-[var(--color-text)] mb-4">
            A Pets Almeida oferece serviços completos de banho, tosa e transporte para pets na região de {{ bairroData.nome }}. 
            Nossa equipe está preparada para atender seu pet com todo cuidado e atenção que ele merece.
          </p>
          <p class="text-lg text-[var(--color-text)]">
            Trabalhamos com produtos de qualidade e técnicas adequadas para cada raça e porte, 
            garantindo o bem-estar e a satisfação do seu melhor amigo.
          </p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <div class="bg-[var(--color-bg-2)] p-6 rounded-xl">
            <div class="text-4xl mb-4">🏠</div>
            <h3 class="text-xl font-bold mb-2">Localização Conveniente</h3>
            <p class="text-[var(--color-text-light)]">
              Fácil acesso a partir de {{ bairroData.nome }} até nossa unidade na Av. Inajar de Souza
            </p>
          </div>
          
          <div class="bg-[var(--color-bg-2)] p-6 rounded-xl">
            <div class="text-4xl mb-4">🚗</div>
            <h3 class="text-xl font-bold mb-2">Táxi Dog Disponível</h3>
            <p class="text-[var(--color-text-light)]">
              Oferecemos serviço de transporte para buscar e levar seu pet com segurança
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <ServicesSection />
    
    <section class="relative z-10 py-20 bg-[var(--color-bg-2)]">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl font-bold text-[var(--pet-primary)] mb-6">
          Agende Agora em {{ bairroData.nome }}
        </h2>
        <p class="text-lg text-[var(--color-text-light)] mb-8 max-w-2xl mx-auto">
          Entre em contato pelo WhatsApp e agende o melhor horário para seu pet
        </p>
        <button 
          @click="handleSchedule"
          class="bg-[var(--pet-success)] text-white px-8 py-4 rounded-lg text-xl font-semibold hover:bg-[#45a049] transition-all transform hover:scale-105 shadow-lg"
        >
          📱 Agendar pelo WhatsApp
        </button>
      </div>
    </section>
    
    <ContactSection />
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string

const bairrosMap: Record<string, { nome: string, descricao: string }> = {
  'cachoeirinha': {
    nome: 'Cachoeirinha',
    descricao: 'Banho, tosa e táxi dog em Cachoeirinha - São Paulo'
  },
  'casa-verde': {
    nome: 'Casa Verde',
    descricao: 'Banho, tosa e táxi dog na Casa Verde - São Paulo'
  },
  'limao': {
    nome: 'Limão',
    descricao: 'Banho, tosa e táxi dog no Limão - São Paulo'
  },
  'vila-penteado': {
    nome: 'Vila Penteado',
    descricao: 'Banho, tosa e táxi dog na Vila Penteado - São Paulo'
  },
  'brasilandia': {
    nome: 'Brasilândia',
    descricao: 'Banho, tosa e táxi dog na Brasilândia - São Paulo'
  },
  'eliza-maria': {
    nome: 'Eliza Maria',
    descricao: 'Banho, tosa e táxi dog em Eliza Maria - São Paulo'
  }
}

const bairroData = bairrosMap[slug] || { nome: 'Zona Norte', descricao: 'Banho e tosa na Zona Norte de São Paulo' }

useHead({
  title: `Banho e Tosa em ${bairroData.nome} - Pets Almeida`,
  meta: [
    { name: 'description', content: bairroData.descricao },
    { name: 'keywords', content: `banho e tosa ${bairroData.nome}, pet shop ${bairroData.nome}, tosa ${bairroData.nome}` }
  ]
})

const handleSchedule = () => {
  const phone = '5511993602794'
  const message = `Olá! Gostaria de agendar um serviço em ${bairroData.nome} para meu pet.`
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
}
</script>
