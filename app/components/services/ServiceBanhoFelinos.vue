<template>
  <ServiceCard
    title="Banho Felinos"
    ariaLabel="Ícone de gato/felino"
    :images="['/images/Banho Felinos.jpg','/images/Banho Felinos1.jpg','/images/Banho Felinos2.jpg']"
    :extrasItems="extrasBanhoFelinos"
  >
    <template #icon>
      <Cat3DIcon />
    </template>
    <div class="service-note">INCLUSO CORTE DE UNHA</div>
    <table class="price-table">
      <thead><tr><th>Tipo</th><th>Preço</th></tr></thead>
  <tbody>
        <tr>
          <td>Banho a Seco - Filhote</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 60,00</span>
              <ScheduleButton service="Banho Felinos" variant="Banho a Seco - Filhote" price="R$ 60,00" :extras="extrasBanhoFelinos" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Banho a Seco - Adulto</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 100,00</span>
              <ScheduleButton service="Banho Felinos" variant="Banho a Seco - Adulto" price="R$ 100,00" :extras="extrasBanhoFelinos" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Banho Molhado - Filhote</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 80,00</span>
              <ScheduleButton service="Banho Felinos" variant="Banho Molhado - Filhote" price="R$ 80,00" :extras="extrasBanhoFelinos" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Banho Molhado - Adulto</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 120,00</span>
              <ScheduleButton service="Banho Felinos" variant="Banho Molhado - Adulto" price="R$ 120,00" :extras="extrasBanhoFelinos" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Cat3DIcon from '~/components/Cat3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasBanhoFelinos = [
  'Coloração – a partir de R$ 15,00',
  'Desembolo – R$ 30,00 a hora',
  'Hidratação – R$ 20,00',
  'Higiene bucal – R$ 10,00'
]
</script>