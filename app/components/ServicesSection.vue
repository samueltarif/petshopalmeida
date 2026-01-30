<template>
  <section id="servicos" class="services-section">
    <div class="container">
      <h2>Nossos Serviços</h2>
      <div class="services-grid">
        <ServiceDogWalker />
        <ServiceTaxiDog />
        <ServiceTaxiConsulta />
        <ServiceBanhoTosaHigienica />
        <ServiceSomenteBanho />
        <ServiceBanhoSpitz />
        <ServiceTosaTesoura />
        <ServiceBanhoFelinos />
        <ServiceTosaPadrao />
        <ServiceTosaZero />
        <ServiceRemocaoPeloMorto />
        <ServiceTransformacoes />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ServiceDogWalker from '~/components/services/ServiceDogWalker.vue'
import ServiceTaxiDog from '~/components/services/ServiceTaxiDog.vue'
import ServiceTaxiConsulta from '~/components/services/ServiceTaxiConsulta.vue'
import ServiceBanhoTosaHigienica from '~/components/services/ServiceBanhoTosaHigienica.vue'
import ServiceSomenteBanho from '~/components/services/ServiceSomenteBanho.vue'
import ServiceBanhoSpitz from '~/components/services/ServiceBanhoSpitz.vue'
import ServiceTosaTesoura from '~/components/services/ServiceTosaTesoura.vue'
import ServiceBanhoFelinos from '~/components/services/ServiceBanhoFelinos.vue'
import ServiceTosaPadrao from '~/components/services/ServiceTosaPadrao.vue'
import ServiceTosaZero from '~/components/services/ServiceTosaZero.vue'
import ServiceRemocaoPeloMorto from '~/components/services/ServiceRemocaoPeloMorto.vue'
import ServiceTransformacoes from '~/components/services/ServiceTransformacoes.vue'
</script>

<style scoped>
.services-section { 
  padding: 60px 20px; 
  background: var(--bg-primary, #ffffff);
}

.container {
  max-width: 1200px; 
  margin: 0 auto;
  padding: 0 16px;
}

.services-section h2 { 
  text-align: center; 
  font-size: 30px; 
  margin-bottom: 40px; 
  color: var(--pet-primary, #2B5F8D); 
  font-weight: 600; 
  letter-spacing: -0.01em; 
}

/* Grid responsivo: 3 colunas desktop, 2 tablet, 1 mobile */
.services-grid { 
  display: grid !important; 
  grid-template-columns: repeat(3, 1fr) !important; 
  gap: 24px !important; 
  align-items: start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

/* Força cada card a ocupar exatamente 1 coluna */
.services-grid > * {
  grid-column: span 1 !important;
  width: 100% !important;
  max-width: none !important;
  margin: 0 !important;
}

/* Tablet: 2 colunas */
@media (max-width: 1023px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 20px;
  }
}

/* Mobile: 1 coluna */
@media (max-width: 767px) {
  .services-grid {
    grid-template-columns: 1fr !important;
    gap: 20px;
  }
  
  .container {
    padding: 0 12px;
  }
}
</style>