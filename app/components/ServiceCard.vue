<template>
  <div class="bg-white border border-gray-200 rounded-xl overflow-hidden transition-all hover:transform hover:-translate-y-1 hover:shadow-xl">
    <div v-if="animation" class="relative h-64 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
      <LottieAnimation 
        :animation-url="animation"
      />
    </div>
    <div v-else-if="images && images.length > 0" class="relative h-64 overflow-hidden">
      <ImageCarousel
        :images="images"
        :alt="title"
      />
    </div>
    <div v-else class="mb-4 text-5xl pt-6 text-center">
      {{ icon }}
    </div>
    
    <div class="p-6">
      <h3 class="text-xl font-bold text-blue-600 mb-2">{{ title }}</h3>
      <p class="text-gray-600 mb-4 text-sm">{{ description }}</p>
      
      <div v-if="extraInfo" class="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
        <p class="text-green-700 font-semibold text-sm text-center">{{ extraInfo }}</p>
      </div>
      
      <!-- Layout para serviços com múltiplas opções -->
      <div v-if="serviceOptions && serviceOptions.length > 0" class="space-y-4 mb-4">
        <div v-for="option in serviceOptions" :key="option.name" class="border-b border-gray-200 pb-3 last:border-0">
          <h4 class="font-semibold text-gray-700 mb-2">{{ option.name }}</h4>
          <div class="space-y-2">
            <div 
              v-for="price in option.prices" 
              :key="price.size"
              class="flex justify-between items-center"
            >
              <span class="text-sm text-gray-600">{{ price.size }}</span>
              <div class="flex items-center gap-3">
                <span class="text-base text-blue-600 font-bold">{{ price.value }}</span>
                <button
                  @click.stop="handleScheduleOption(option.name, price)"
                  class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                >
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Layout padrão para serviços simples -->
      <div v-else-if="prices && prices.length > 0" class="mb-4">
        <div class="flex justify-between items-center mb-2 pb-2 border-b border-gray-200">
          <span class="text-sm font-semibold text-gray-700">Tipo</span>
          <span class="text-sm font-semibold text-gray-700">Preço</span>
        </div>
        <div 
          v-for="price in prices" 
          :key="price.size"
          class="flex justify-between items-center py-2"
        >
          <span class="text-sm text-gray-600">{{ price.size }}</span>
          <span class="text-base text-blue-600 font-bold">{{ price.value }}</span>
        </div>
      </div>
      
      <button
        v-if="!serviceOptions"
        @click="handleSchedule"
        class="w-full py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        :aria-label="`Agendar ${title}`"
      >
        <i class="fab fa-whatsapp"></i>
        Agendar
      </button>
    </div>
    
    <ScheduleModal
      :is-open="showScheduleModal"
      @close="closeScheduleModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Price {
  size: string
  value: string
}

interface ServiceOption {
  name: string
  prices: Price[]
}

interface Props {
  title: string
  description: string
  prices?: Price[]
  serviceOptions?: ServiceOption[]
  icon: string
  images?: string[]
  animation?: string
  whatsappMessage?: string
  extraInfo?: string
}

const props = defineProps<Props>()

const showScheduleModal = ref(false)

const handleSchedule = () => {
  showScheduleModal.value = true
}

const handleScheduleOption = (optionName: string, price: Price) => {
  const phone = '5511993602794'
  const message = `Olá! Gostaria de agendar:

${props.title} - ${optionName}
${price.size}: ${price.value}

Aguardo confirmação!`
  
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
}

const closeScheduleModal = () => {
  showScheduleModal.value = false
}
</script>
