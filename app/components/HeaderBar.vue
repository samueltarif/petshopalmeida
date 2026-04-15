<template>
  <header>
    <div class="header-container">
      <div class="logo"><AnimePaw :size="26" /><AnimePaw :size="26" /> Banho e Tosa em São Paulo Zona Norte</div>
      <div class="header-right">
        <NavMenu id="mainNav" :items="props.navItems" :active="isNavActive" @click-link="isNavActive = false" />
        <MenuToggle :active="isNavActive" @toggle="isNavActive = !isNavActive" />
      </div>
      <div v-if="isNavActive" class="nav-backdrop" @click="isNavActive = false" aria-hidden="true" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AnimePaw from '~/components/AnimePaw.vue'
import MenuToggle from '~/components/MenuToggle.vue'
import NavMenu from '~/components/NavMenu.vue'

const props = defineProps<{ navItems: { label: string; href: string }[] }>()
const isNavActive = ref(false)
</script>

<style scoped>
/* Desktop Header - mantém estilo original */
header { 
  position: sticky; 
  top: 0; 
  background: var(--color-surface); 
  box-shadow: var(--shadow-sm); 
  z-index: 1000; 
  border-bottom: 1px solid var(--color-card-border); 
}

.header-container { 
  max-width: 1280px; 
  margin: 0 auto; 
  padding: var(--space-16) var(--space-20); 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
}

.header-right { display: flex; align-items: center; gap: var(--space-12); }

.logo { 
  font-size: var(--font-size-3xl); 
  font-weight: var(--font-weight-bold); 
  color: var(--pet-primary); 
  display: flex; 
  align-items: center; 
  gap: var(--space-8); 
}

/* Desktop nav */
:deep(nav) { 
  display: block; 
  position: static;
  background: transparent;
  padding: 0;
  box-shadow: none;
  transform: none;
  transition: none;
}

:deep(nav ul) { 
  display: flex; 
  list-style: none; 
  gap: var(--space-24); 
  margin: 0;
  padding: 0;
}

:deep(nav a) { 
  color: var(--color-text); 
  text-decoration: none; 
  font-weight: var(--font-weight-medium); 
  transition: color var(--duration-fast) var(--ease-standard); 
  font-size: var(--font-size-base); 
  padding: var(--space-8) var(--space-12);
  border-radius: 4px;
}

:deep(nav a:hover) { 
  color: var(--pet-primary); 
  background: rgba(var(--pet-primary-rgb), 0.1);
}

.menu-toggle { 
  display: none; 
  background: none; 
  border: none; 
  font-size: 28px; 
  cursor: pointer; 
  color: var(--color-text); 
}

/* MOBILE HEADER - AJUSTES URGENTES */
@media (max-width: 768px) {
  /* HEADER MOBILE: altura 56px + fundo fosco */
  header {
    background: rgba(0, 0, 0, 0.6) !important; /* FUNDO FOSCO */
    backdrop-filter: blur(10px) !important; /* BLUR FROSTED GLASS */
    -webkit-backdrop-filter: blur(10px) !important; /* Safari support */
    box-shadow: none !important; /* Remove sombra original */
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; /* Borda sutil branca */
    z-index: 1001 !important; /* ACIMA do hero */
  }
  
  .header-container {
    padding: 12px var(--space-16) !important; /* ALTURA 56px: padding reduzido */
    min-height: 56px !important; /* ALTURA FIXA 56px */
    max-height: 56px !important;
    display: flex; 
    flex-direction: row; 
    align-items: center; 
    justify-content: space-between; 
    gap: var(--space-12); 
    flex-wrap: nowrap;
  }
  
  /* LOGO/TÍTULO: branco puro, 16px, bold */
  .logo {
    font-size: 16px !important; /* TAMANHO 16px conforme solicitado */
    font-weight: 700 !important; /* BOLD */
    color: #FFFFFF !important; /* BRANCO PURO */
    text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; /* Sombra para legibilidade */
    flex: 1 1 auto;
  }
  
  /* ÍCONES DO LOGO: brancos */
  .logo :deep(svg) {
    fill: #FFFFFF !important;
    color: #FFFFFF !important;
  }
  
  .menu-toggle { 
    display: inline-flex !important; 
    color: #FFFFFF !important; /* ÍCONE HAMBURGER: branco puro */
    font-size: 24px !important; /* Tamanho otimizado */
    background: none !important;
    border: none !important;
    cursor: pointer !important;
    padding: 8px !important;
  }
  
  :deep(.menu-toggle) { 
    flex: 0 0 auto; 
    display: inline-flex; 
    align-items: center; 
    color: #FFFFFF !important;
  }
  
  /* Backdrop abaixo do header, acima do conteúdo */
  .nav-backdrop { 
    position: fixed; 
    inset: 0; 
    top: 56px !important; /* Ajustado para nova altura do header */
    background: rgba(0,0,0,0.45); 
    z-index: 999; 
  }
  
  /* MENU MOBILE: fundo fosco + textos brancos */
  :deep(nav) { 
    position: fixed; 
    top: 56px !important; /* Ajustado para nova altura do header */
    left: 0; 
    width: 100%; 
    background: rgba(0, 0, 0, 0.9) !important; /* FUNDO FOSCO ESCURO */
    backdrop-filter: blur(15px) !important; /* BLUR MAIS FORTE NO MENU */
    -webkit-backdrop-filter: blur(15px) !important;
    padding: var(--space-24); 
    box-shadow: 0 4px 20px rgba(0,0,0,0.3) !important; 
    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important; 
    z-index: 1000; 
    transform: translateX(-100%); 
    transition: transform var(--duration-normal) var(--ease-standard); 
    display: block !important;
  }
  
  :deep(nav.active) { 
    transform: translateX(0) !important; 
    display: block !important;
  }
  :deep(nav ul) { flex-direction: column; gap: var(--space-16); }
  
  /* MENU LINKS: branco puro, weight 500 */
  :deep(nav a) { 
    font-size: var(--font-size-lg); 
    display: block; 
    padding: var(--space-12); 
    color: #FFFFFF !important; /* BRANCO PURO */
    font-weight: 500 !important; /* WEIGHT 500 conforme solicitado */
    text-shadow: 0 1px 2px rgba(0,0,0,0.5) !important; /* Sombra para legibilidade */
    transition: all 0.2s ease !important;
  }
  
  :deep(nav a:hover) { 
    color: #FFFFFF !important; /* Mantém branco no hover */
    background: rgba(255, 255, 255, 0.1) !important; /* Fundo sutil no hover */
    border-radius: 8px !important;
  }
}
</style>