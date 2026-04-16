<template>
  <footer class="bg-[var(--pet-secondary)] text-white py-12">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <h3 class="text-2xl font-bold mb-4 flex items-center gap-2">
            <i class="fas fa-paw"></i>
            Pets Almeida
          </h3>
          <p class="text-gray-300">
            Cuidado e carinho para seu pet desde 2020
          </p>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-link"></i>
            Links Rápidos
          </h4>
          <ul class="space-y-2">
            <li><a href="#inicio" class="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><i class="fas fa-home"></i> Início</a></li>
            <li><a href="#sobre" class="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><i class="fas fa-info-circle"></i> Sobre</a></li>
            <li><a href="#servicos" class="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><i class="fas fa-cut"></i> Serviços</a></li>
            <li><NuxtLink to="/bairros" class="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><i class="fas fa-map-marked-alt"></i> Bairros</NuxtLink></li>
            <li><a href="#contato" class="text-gray-300 hover:text-white transition-colors flex items-center gap-2"><i class="fas fa-phone"></i> Contato</a></li>
          </ul>
        </div>
        
        <div>
          <h4 class="text-lg font-semibold mb-4 flex items-center gap-2">
            <i class="fas fa-share-alt"></i>
            Redes Sociais
          </h4>
          <div class="flex gap-4">
            <a 
              href="https://wa.me/5511993602794" 
              target="_blank"
              class="text-3xl hover:scale-110 transition-transform text-green-400"
              aria-label="WhatsApp"
            >
              <i class="fab fa-whatsapp"></i>
            </a>
            <a 
              href="https://instagram.com/_pets_almeida" 
              target="_blank"
              class="text-3xl hover:scale-110 transition-transform text-pink-400"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div class="border-t border-gray-600 pt-8 text-center text-gray-300">
        <p class="flex items-center justify-center gap-2">
          <i class="far fa-copyright"></i>
          {{ currentYear }} Pets Almeida. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>
