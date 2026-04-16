<template>
  <div>
    <HeaderBar />
    
    <section class="pt-32 pb-20 bg-[var(--color-bg-2)]">
      <div class="container mx-auto px-4">
        <h1 class="text-center mb-6 text-[var(--pet-primary)]">Bairros Atendidos</h1>
        <p class="text-center text-lg text-[var(--color-text-light)] mb-12 max-w-2xl mx-auto">
          Atendemos diversos bairros da Zona Norte de São Paulo com serviços de banho, tosa e transporte para pets
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <NuxtLink
            v-for="bairro in bairros"
            :key="bairro.slug"
            :to="`/bairro/${bairro.slug}`"
            class="bairro-card fade-in bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all hover:transform hover:-translate-y-1"
          >
            <div class="text-5xl mb-4">📍</div>
            <h2 class="text-2xl font-bold text-[var(--pet-primary)] mb-2">{{ bairro.nome }}</h2>
            <p class="text-[var(--color-text-light)]">{{ bairro.descricao }}</p>
            <div class="mt-4 text-[var(--pet-primary)] font-semibold">
              Ver serviços →
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
    
    <FooterBar />
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Bairros Atendidos - Pets Almeida',
  meta: [
    { name: 'description', content: 'Atendemos Cachoeirinha, Casa Verde, Limão, Vila Penteado, Brasilândia e Eliza Maria com serviços de banho e tosa para pets.' }
  ]
})

const bairros = [
  {
    nome: 'Cachoeirinha',
    slug: 'cachoeirinha',
    descricao: 'Atendimento completo na região da Cachoeirinha'
  },
  {
    nome: 'Casa Verde',
    slug: 'casa-verde',
    descricao: 'Serviços de qualidade na Casa Verde'
  },
  {
    nome: 'Limão',
    slug: 'limao',
    descricao: 'Cuidados especiais para pets no Limão'
  },
  {
    nome: 'Vila Penteado',
    slug: 'vila-penteado',
    descricao: 'Atendimento profissional na Vila Penteado'
  },
  {
    nome: 'Brasilândia',
    slug: 'brasilandia',
    descricao: 'Serviços completos na Brasilândia'
  },
  {
    nome: 'Eliza Maria',
    slug: 'eliza-maria',
    descricao: 'Cuidado e carinho em Eliza Maria'
  }
]

onMounted(() => {
  useScrollAnimation()
})
</script>
