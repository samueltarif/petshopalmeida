<template>
  <ServiceCard title="Somente Banho" ariaLabel="Ícone de chuveiro" :images="['/images/Somente Banho.jpg','/images/Somente Banho1.jpg','/images/Somente Banho2.jpg','/images/Somente Banho3.jpg']">
    <template #icon>
      <Shower3DIcon />
    </template>
    <p class="service-description">A partir de:</p>
    <table class="price-table">
      <thead><tr><th>Porte</th><th>Preço</th></tr></thead>
  <tbody>
        <tr>
          <td>Mini</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 35,00</span>
              <ScheduleButton service="Somente Banho" variant="Mini" price="R$ 35,00" :extras="extrasSomenteBanho" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Pequeno</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 45,00</span>
              <ScheduleButton service="Somente Banho" variant="Pequeno" price="R$ 45,00" :extras="extrasSomenteBanho" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Médio</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 60,00</span>
              <ScheduleButton service="Somente Banho" variant="Médio" price="R$ 60,00" :extras="extrasSomenteBanho" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 75,00</span>
              <ScheduleButton service="Somente Banho" variant="Grande" price="R$ 75,00" :extras="extrasSomenteBanho" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Extra Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>A combinar</span>
              <ScheduleButton service="Somente Banho" variant="Extra Grande" price="A combinar" :extras="extrasSomenteBanho" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Shower3DIcon from '~/components/Shower3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasSomenteBanho = [
  'Hidratação – R$ 20,00',
  'Higiene bucal – R$ 10,00',
  'Corte de unha – R$ 10,00',
  'Desembolo – R$ 30,00 a hora',
  'Coloração – a partir de R$ 15,00'
]
</script>