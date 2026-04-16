<template>
  <section id="servicos" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-center mb-12 text-blue-600 text-3xl font-bold animate-on-scroll animate-fade-up">Nossos Serviços</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ServiceCard
          v-for="(service, index) in services"
          :key="service.title"
          :title="service.title"
          :description="service.description"
          :prices="service.prices"
          :icon="service.icon"
          :image="service.image"
          :animation="service.animation"
          :whatsapp-message="service.whatsappMessage"
          :class="`animate-on-scroll animate-fade-up animate-delay-${Math.min(index * 100, 500)}`"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const services = [
  {
    title: 'Somente Banho',
    description: 'Banho completo com produtos de qualidade',
    icon: '🛁',
    image: '/images/Somente Banho.jpg',
    prices: [
      { size: 'Mini', value: 'R$ 40' },
      { size: 'Pequeno', value: 'R$ 50' },
      { size: 'Médio', value: 'R$ 60' },
      { size: 'Grande', value: 'R$ 80' }
    ],
    whatsappMessage: 'Olá! Gostaria de agendar um Banho para meu pet.'
  },
  {
    title: 'Banho + Tosa Higiênica',
    description: 'Banho completo com tosa higiênica',
    icon: '✂️',
    image: '/images/tosahigienica.jpg',
    prices: [
      { size: 'Mini', value: 'R$ 50' },
      { size: 'Pequeno', value: 'R$ 60' },
      { size: 'Médio', value: 'R$ 70' },
      { size: 'Grande', value: 'R$ 90' }
    ]
  },
  {
    title: 'Tosa Padrão',
    description: 'Tosa completa no padrão da raça',
    icon: '💇',
    image: '/images/Tosa Padrão.jpg',
    prices: [
      { size: 'Mini', value: 'R$ 60' },
      { size: 'Pequeno', value: 'R$ 70' },
      { size: 'Médio', value: 'R$ 80' },
      { size: 'Grande', value: 'R$ 100' }
    ]
  },
  {
    title: 'Tosa Tesoura',
    description: 'Tosa delicada com tesoura',
    icon: '✨',
    image: '/images/tosatesoura.jpg',
    prices: [
      { size: 'Mini', value: 'R$ 70' },
      { size: 'Pequeno', value: 'R$ 80' },
      { size: 'Médio', value: 'R$ 90' },
      { size: 'Grande', value: 'R$ 110' }
    ]
  },
  {
    title: 'Tosa Zero',
    description: 'Tosa completa bem curtinha',
    icon: '🪒',
    image: '/images/Tosa Zero.jpg',
    prices: [
      { size: 'Mini', value: 'R$ 60' },
      { size: 'Pequeno', value: 'R$ 70' },
      { size: 'Médio', value: 'R$ 80' },
      { size: 'Grande', value: 'R$ 100' }
    ]
  },
  {
    title: 'Banho Spitz',
    description: 'Banho especial para raças Spitz',
    icon: '🐕',
    image: '/images/splitz.png',
    prices: [
      { size: 'Mini', value: 'R$ 80' },
      { size: 'Pequeno', value: 'R$ 90' },
      { size: 'Médio', value: 'R$ 100' },
      { size: 'Grande', value: 'R$ 120' }
    ]
  },
  {
    title: 'Banho Felinos',
    description: 'Banho especializado para gatos',
    icon: '🐱',
    image: '/images/Banho Felinos.jpg',
    prices: [
      { size: 'Mini', value: 'R$ 60' },
      { size: 'Pequeno', value: 'R$ 70' },
      { size: 'Médio', value: 'R$ 80' },
      { size: 'Grande', value: '-' }
    ]
  },
  {
    title: 'Remoção Pelo Morto',
    description: 'Remoção de pelos mortos',
    icon: '🧹',
    image: '/images/remova_pelo.jpg',
    prices: [
      { size: 'Mini', value: 'R$ 30' },
      { size: 'Pequeno', value: 'R$ 40' },
      { size: 'Médio', value: 'R$ 50' },
      { size: 'Grande', value: 'R$ 60' }
    ]
  },
  {
    title: 'Passeador de Cães',
    description: 'Passeio de 30 minutos',
    icon: '🦮',
    animation: '/animations/Taking the Duggy out.json',
    prices: [
      { size: 'Todos', value: 'R$ 25' },
      { size: '30 min', value: '' }
    ]
  },
  {
    title: 'Táxi Dog',
    description: 'Transporte seguro para seu pet',
    icon: '🚗',
    animation: '/animations/Colchester-Airport-Taxi.json',
    prices: [
      { size: 'Consultar', value: '' }
    ]
  }
]

onMounted(() => {
  useScrollAnimation()
})
</script>
