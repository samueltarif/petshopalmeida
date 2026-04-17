<template>
  <header class="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
    <nav class="container mx-auto px-4 py-4 flex items-center justify-between">
      <div class="text-2xl font-bold text-[var(--pet-primary)] flex items-center gap-2">
        <div class="w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
          <LottieAnimation 
            animation-url="/animations/Dog Running.json"
            class="w-full h-full"
          />
        </div>
        Pets Almeida
      </div>
      
      <div class="hidden md:flex items-center gap-6">
        <a @click="scrollTo('inicio')" href="#inicio" class="hover:text-[var(--pet-primary)] transition-colors cursor-pointer flex items-center gap-2">
          <i class="fas fa-home"></i>
          Início
        </a>
        <a @click="scrollTo('sobre')" href="#sobre" class="hover:text-[var(--pet-primary)] transition-colors cursor-pointer flex items-center gap-2">
          <i class="fas fa-info-circle"></i>
          Sobre
        </a>
        <a @click="scrollTo('servicos')" href="#servicos" class="hover:text-[var(--pet-primary)] transition-colors cursor-pointer flex items-center gap-2">
          <i class="fas fa-cut"></i>
          Serviços
        </a>
        <NuxtLink to="/bairros" class="hover:text-[var(--pet-primary)] transition-colors flex items-center gap-2">
          <i class="fas fa-map-marked-alt"></i>
          Bairros
        </NuxtLink>
        <a @click="scrollTo('pagamento')" href="#pagamento" class="hover:text-[var(--pet-primary)] transition-colors cursor-pointer flex items-center gap-2">
          <i class="fas fa-credit-card"></i>
          Pagamento
        </a>
        <a @click="scrollTo('contato')" href="#contato" class="hover:text-[var(--pet-primary)] transition-colors cursor-pointer flex items-center gap-2">
          <i class="fas fa-phone"></i>
          Contato
        </a>
        <button @click="handleSchedule" class="bg-[var(--pet-success)] text-white px-6 py-2 rounded-lg hover:bg-[#45a049] transition-colors font-semibold flex items-center gap-2">
          <i class="fab fa-whatsapp"></i>
          Agende Agora
        </button>
      </div>
      
      <button @click="toggleMenu" class="md:hidden text-2xl">
        <i :class="isMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </button>
    </nav>
    
    <div v-if="isMenuOpen" class="md:hidden bg-white border-t">
      <div class="container mx-auto px-4 py-4 flex flex-col gap-4">
        <a @click="scrollToAndClose('inicio')" href="#inicio" class="hover:text-[var(--pet-primary)] transition-colors flex items-center gap-2">
          <i class="fas fa-home"></i>
          Início
        </a>
        <a @click="scrollToAndClose('sobre')" href="#sobre" class="hover:text-[var(--pet-primary)] transition-colors flex items-center gap-2">
          <i class="fas fa-info-circle"></i>
          Sobre
        </a>
        <a @click="scrollToAndClose('servicos')" href="#servicos" class="hover:text-[var(--pet-primary)] transition-colors flex items-center gap-2">
          <i class="fas fa-cut"></i>
          Serviços
        </a>
        <NuxtLink to="/bairros" @click="toggleMenu" class="hover:text-[var(--pet-primary)] transition-colors flex items-center gap-2">
          <i class="fas fa-map-marked-alt"></i>
          Bairros
        </NuxtLink>
        <a @click="scrollToAndClose('pagamento')" href="#pagamento" class="hover:text-[var(--pet-primary)] transition-colors flex items-center gap-2">
          <i class="fas fa-credit-card"></i>
          Pagamento
        </a>
        <a @click="scrollToAndClose('contato')" href="#contato" class="hover:text-[var(--pet-primary)] transition-colors flex items-center gap-2">
          <i class="fas fa-phone"></i>
          Contato
        </a>
        <button @click="handleSchedule" class="bg-[var(--pet-success)] text-white px-6 py-2 rounded-lg hover:bg-[#45a049] transition-colors font-semibold flex items-center gap-2">
          <i class="fab fa-whatsapp"></i>
          Agende Agora
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const isMenuOpen = ref(false)
const router = useRouter()
const route = useRoute()

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const scrollTo = async (id: string) => {
  // Se não estiver na página inicial, navegar primeiro
  if (route.path !== '/') {
    await router.push('/')
    // Aguardar um pouco para a página carregar
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  
  if (id === 'inicio') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  } else {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }
}

const scrollToAndClose = async (id: string) => {
  await scrollTo(id)
  isMenuOpen.value = false
}

const handleSchedule = () => {
  const phone = '5511993602794'
  const message = 'Olá! Gostaria de agendar um serviço para meu pet.'
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
}
</script>
