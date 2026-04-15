<template>
  <ServiceCard title="Taxi Dog" ariaLabel="Táxi Dog" :images="[]" :showExtras="false">
    <template #icon>
      <CarTaxi3DIcon />
    </template>
    <p class="service-description">Fazemos TAXI DOG</p>
    <div class="service-availability">SOMENTE SÁBADO</div>
    <table class="price-table">
      <thead><tr><th>Distância</th><th>Preço</th></tr></thead>
  <tbody>
        <tr>
          <td>1 a 2 km</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 10,00</span>
              <ScheduleButton class="taxi-button" service="Taxi Dog" variant="1 a 2 km" price="R$ 10,00" />
            </div>
          </td>
        </tr>
        <tr>
          <td>2 a 4 km</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 20,00</span>
              <ScheduleButton class="taxi-button" service="Taxi Dog" variant="2 a 4 km" price="R$ 20,00" />
            </div>
          </td>
        </tr>
        <tr>
          <td>4 a 6 km</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 40,00</span>
              <ScheduleButton class="taxi-button" service="Taxi Dog" variant="4 a 6 km" price="R$ 40,00" />
            </div>
          </td>
        </tr>
        <tr>
          <td>6 a 10 km</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 60,00</span>
              <ScheduleButton class="taxi-button" service="Taxi Dog" variant="6 a 10 km" price="R$ 60,00" />
            </div>
          </td>
        </tr>
        <tr>
          <td>10 a 15 km</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 80,00</span>
              <ScheduleButton class="taxi-button" service="Taxi Dog" variant="10 a 15 km" price="R$ 80,00" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import CarTaxi3DIcon from '~/components/CarTaxi3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
</script>

<style scoped>
:deep(.taxi-button button) {
  background: var(--color-surface);
  color: var(--color-text);
  border-color: var(--color-card-border);
}
:deep(.taxi-button button:hover) {
  transform: translateY(-1px) scale(1.02);
  border-color: var(--pet-primary);
  color: var(--pet-primary);
  box-shadow: var(--shadow-sm);
}
</style>
