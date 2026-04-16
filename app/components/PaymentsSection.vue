<template>
  <section id="pagamento" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-center mb-12 text-blue-600 text-3xl font-bold animate-on-scroll animate-fade-up">Formas de Pagamento</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <div class="text-center p-8 bg-gray-100 rounded-xl animate-on-scroll animate-scale animate-delay-100">
          <div class="text-6xl mb-4 text-green-600">
            <i class="fas fa-money-bill-wave"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Dinheiro</h3>
          <p class="text-gray-600">Pagamento em espécie</p>
        </div>
        
        <div class="text-center p-8 bg-gray-100 rounded-xl animate-on-scroll animate-scale animate-delay-200">
          <div class="text-6xl mb-4 text-blue-600">
            <i class="fas fa-qrcode"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">PIX</h3>
          <p class="text-gray-600">Transferência instantânea</p>
        </div>
        
        <div class="text-center p-8 bg-gray-100 rounded-xl animate-on-scroll animate-scale animate-delay-300">
          <div class="text-6xl mb-4 text-purple-600">
            <i class="fas fa-credit-card"></i>
          </div>
          <h3 class="text-xl font-bold mb-2">Cartão</h3>
          <p class="text-gray-600">Crédito ou Débito</p>
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
