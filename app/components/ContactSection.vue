<template>
  <section id="contato" class="py-20 bg-gray-100">
    <div class="container mx-auto px-4">
      <h2 class="text-center mb-12 text-blue-600 text-3xl font-bold animate-on-scroll animate-fade-up">Entre em Contato</h2>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <div class="space-y-6">
          <a 
            href="https://wa.me/5511993602794" 
            target="_blank"
            class="flex items-center gap-4 p-6 bg-white rounded-xl hover:shadow-lg transition-all block animate-on-scroll animate-fade-left animate-delay-100"
          >
            <div class="text-5xl text-green-500">
              <i class="fab fa-whatsapp"></i>
            </div>
            <div>
              <div class="text-sm text-gray-600">WhatsApp</div>
              <div class="text-lg font-semibold">(11) 99360-2794</div>
            </div>
          </a>
          
          <a 
            href="https://instagram.com/_pets_almeida" 
            target="_blank"
            class="flex items-center gap-4 p-6 bg-white rounded-xl hover:shadow-lg transition-all block animate-on-scroll animate-fade-left animate-delay-200"
          >
            <div class="text-5xl text-pink-500">
              <i class="fab fa-instagram"></i>
            </div>
            <div>
              <div class="text-sm text-gray-600">Instagram</div>
              <div class="text-lg font-semibold">@_pets_almeida</div>
            </div>
          </a>
          
          <div class="flex items-center gap-4 p-6 bg-white rounded-xl animate-on-scroll animate-fade-left animate-delay-300">
            <div class="text-5xl text-red-500">
              <i class="fas fa-map-marker-alt"></i>
            </div>
            <div>
              <div class="text-sm text-gray-600">Endereço</div>
              <div class="text-lg font-semibold">Av. Inajar de Souza, 3823</div>
              <div class="text-sm text-gray-600">Cachoeirinha, São Paulo - SP</div>
              <div class="text-sm text-gray-600">CEP: 02717-000</div>
            </div>
          </div>
          
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Av.+Inajar+de+Souza,+3823+-+Cachoeirinha,+São+Paulo" 
            target="_blank"
            class="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors animate-on-scroll animate-fade-left animate-delay-400 flex items-center justify-center gap-2"
          >
            <i class="fas fa-star"></i>
            Avaliar no Google
          </a>
        </div>
        
        <div class="rounded-xl overflow-hidden shadow-lg h-[400px] animate-on-scroll animate-fade-right">
          <iframe
            src="https://www.google.com/maps?output=embed&f=d&daddr=Av.+Inajar+de+Souza,+3823+-+Cachoeirinha,+São+Paulo"
            class="w-full h-full border-0"
            loading="lazy"
            title="Localização Pets Almeida"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  useScrollAnimation()
})
</script>
