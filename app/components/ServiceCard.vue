<template>
  <div class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-xl">
    <div v-if="animation" class="relative h-48 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
      <LottieAnimation 
        :animation-url="animation"
      />
    </div>
    <div v-else-if="image" class="relative h-48 overflow-hidden">
      <img 
        :src="image" 
        :alt="title"
        class="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
    <div v-else class="mb-4 text-5xl pt-6 text-center">
      {{ icon }}
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold text-blue-600 mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4 text-sm">{{ description }}</p>
      
      <div class="grid grid-cols-2 gap-2 mb-4">
        <div 
          v-for="price in prices" 
          :key="price.size"
          class="flex flex-col p-2 bg-gray-100 rounded"
        >
          <span class="text-xs text-gray-600 font-medium">{{ price.size }}</span>
          <span class="text-base text-blue-600 font-bold">{{ price.value }}</span>
        </div>
      </div>
      
      <button
        @click="handleSchedule"
        class="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        :aria-label="`Agendar ${title}`"
      >
        <i class="fab fa-whatsapp"></i>
        Agendar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Price {
  size: string
  value: string
}

interface Props {
  title: string
  description: string
  prices: Price[]
  icon: string
  image?: string
  animation?: string
  whatsappMessage?: string
}

const props = defineProps<Props>()

const handleSchedule = () => {
  const phone = '5511993602794'
  const message = props.whatsappMessage || `Olá! Gostaria de agendar ${props.title} para meu pet.`
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
}
</script>
