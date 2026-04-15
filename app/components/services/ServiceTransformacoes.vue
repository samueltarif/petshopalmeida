<template>
  <ServiceCard
    title="Transformações"
    ariaLabel="Galeria de transformações"
    :images="['/images/transformacao1.jpg','/images/transformacao2.jpg']"
    :showExtras="false"
  >
    <template #icon></template>
    <p class="service-description">Visualize alguns resultados de transformações.</p>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
</script>