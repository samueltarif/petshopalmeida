<template>
  <div>
    <HeaderBar />
    
    <section class="pt-32 pb-12 bg-gradient-to-r from-[var(--pet-primary)] to-[var(--pet-secondary)] text-white">
      <div class="container mx-auto px-4 text-center">
        <h1 class="mb-4">Banho e Tosa em {{ bairroData.nome }}</h1>
        <p class="text-xl max-w-2xl mx-auto">
          Atendemos a região de {{ bairroData.nome }} com carinho e profissionalismo
        </p>
      </div>
    </section>
    
    <section class="py-20 bg-white">
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
    
    <section class="py-20 bg-[var(--color-bg-2)]">
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
