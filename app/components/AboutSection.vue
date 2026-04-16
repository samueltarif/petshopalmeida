<template>
  <section id="sobre" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-center mb-12 text-blue-600 text-3xl font-bold animate-on-scroll animate-fade-up">Sobre Nós</h2>
      
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div class="animate-on-scroll animate-fade-left flex justify-center">
            <div class="w-full max-w-md aspect-square rounded-xl shadow-lg overflow-hidden bg-white p-2">
              <LottieAnimation 
                animation-url="/animations/Woman holding a Dog.json"
              />
            </div>
          </div>
          
          <div class="space-y-4 animate-on-scroll animate-fade-right">
            <p class="text-lg text-gray-700">
              A <strong>Pets Almeida</strong> é especializada em cuidados para pets na Zona Norte de São Paulo. 
              Com anos de experiência, oferecemos serviços de banho, tosa e transporte com muito carinho e profissionalismo.
            </p>
            
            <p class="text-lg text-gray-700">
              Nossa equipe é treinada para garantir o bem-estar e a segurança do seu pet durante todo o atendimento. 
              Utilizamos produtos de qualidade e técnicas adequadas para cada raça e porte.
            </p>
            
            <p class="text-lg text-gray-700">
              Atendemos diversos bairros da região, incluindo Cachoeirinha, Casa Verde, Limão, Vila Penteado, 
              Brasilândia e Eliza Maria.
            </p>
            
            <div class="flex gap-4 pt-4">
              <div class="text-center animate-on-scroll animate-scale animate-delay-100">
                <div class="text-3xl font-bold text-blue-600">5+</div>
                <div class="text-sm text-gray-600">Anos de experiência</div>
              </div>
              <div class="text-center animate-on-scroll animate-scale animate-delay-200">
                <div class="text-3xl font-bold text-blue-600">1000+</div>
                <div class="text-sm text-gray-600">Pets atendidos</div>
              </div>
              <div class="text-center animate-on-scroll animate-scale animate-delay-300">
                <div class="text-3xl font-bold text-blue-600">100%</div>
                <div class="text-sm text-gray-600">Satisfação</div>
              </div>
            </div>
          </div>
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
