<template>
  <ServiceCard title="Táxi Pet para Consulta" ariaLabel="Hospital Pet" :images="[]" :showExtras="false">
    <template #icon>
      <HospitalDog3DIcon />
    </template>
    <p class="service-description">Levamos seu pet para consulta</p>
    <ul class="service-list">
      <li>Hospitais</li>
      <li>Clínicas Veterinárias</li>
      <li>Consultas/Exames</li>
      <li>Castrações</li>
    </ul>
    <div class="mt-3">
      <ScheduleButton service="Táxi Pet para Consulta" greetingPrefix="Olá, vim pelo seu site" />
    </div>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import HospitalDog3DIcon from '~/components/HospitalDog3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
</script>