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
          :service-options="service.serviceOptions"
          :icon="service.icon"
          :images="service.images"
          :animation="service.animation"
          :whatsapp-message="service.whatsappMessage"
          :extra-info="service.extraInfo"
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
    images: [
      '/images/Somente Banho.jpg',
      '/images/Somente Banho1.jpg',
      '/images/Somente Banho2.jpg',
      '/images/Somente Banho3.jpg'
    ],
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
    images: [
      '/images/tosahigienica.jpg',
      '/images/tosa higienica.jpg'
    ],
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
    images: [
      '/images/Tosa Padrão.jpg',
      '/images/Tosa Padrão1.jpg',
      '/images/Tosa Padrão2.jpg',
      '/images/Tosa Padrão3.jpg'
    ],
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
    images: [
      '/images/tosatesoura.jpg',
      '/images/tosatesoura1.jpg',
      '/images/tosatesoura2.jpg'
    ],
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
    images: [
      '/images/Tosa Zero.jpg',
      '/images/Tosa Zero1.jpg',
      '/images/Tosa Zero2.jpg'
    ],
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
    images: [
      '/images/splitz.png',
      '/images/splitz1.jpg'
    ],
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
    images: [
      '/images/Banho Felinos.jpg',
      '/images/Banho Felinos1.jpg',
      '/images/Banho Felinos2.jpg'
    ],
    serviceOptions: [
      {
        name: 'Banho a Seco',
        prices: [
          { size: 'Filhote', value: 'R$ 60' },
          { size: 'Adulto', value: 'R$ 100' }
        ]
      },
      {
        name: 'Banho Molhado',
        prices: [
          { size: 'Filhote', value: 'R$ 80' },
          { size: 'Adulto', value: 'R$ 120' }
        ]
      }
    ],
    extraInfo: 'INCLUSO CORTE DE UNHA'
  },
  {
    title: 'Remoção Pelo Morto',
    description: 'Remoção de pelos mortos',
    icon: '🧹',
    images: [
      '/images/remova_pelo.jpg',
      '/images/remove_pelo2.jpg'
    ],
    prices: [
      { size: 'Mini', value: 'R$ 30' },
      { size: 'Pequeno', value: 'R$ 40' },
      { size: 'Médio', value: 'R$ 50' },
      { size: 'Grande', value: 'R$ 60' }
    ]
  },
  {
    title: 'Dog Walker – Passeios com seu pet',
    description: 'Passeio de até 1h',
    icon: '🦮',
    animation: '/animations/Taking the Duggy out.json',
    prices: [
      { size: 'Todos', value: 'A combinar' }
    ]
  },
  {
    title: 'Taxi Dog',
    description: 'Fazemos TAXI DOG',
    icon: '🚗',
    animation: '/animations/Colchester-Airport-Taxi.json',
    extraInfo: 'SOMENTE SÁBADO',
    serviceOptions: [
      {
        name: 'Distância',
        prices: [
          { size: '1 a 2 km', value: 'R$ 10,00' },
          { size: '2 a 4 km', value: 'R$ 20,00' },
          { size: '4 a 6 km', value: 'R$ 40,00' },
          { size: '6 a 10 km', value: 'R$ 60,00' },
          { size: '10 a 15 km', value: 'R$ 80,00' }
        ]
      }
    ]
  },
  {
    title: 'Táxi Pet para Consulta',
    description: 'Levamos seu pet para consulta',
    icon: '🏥',
    animation: '/animations/dog stethoscope.json',
    serviceOptions: [
      {
        name: 'Destinos',
        prices: [
          { size: '✓ Hospitais', value: '' },
          { size: '✓ Clínicas Veterinárias', value: '' },
          { size: '✓ Consultas/Exames', value: '' },
          { size: '✓ Castrações', value: '' }
        ]
      }
    ]
  }
]

onMounted(() => {
  useScrollAnimation()
})
</script>
