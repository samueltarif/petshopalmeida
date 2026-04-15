<template>
  <ServiceCard title="Tosa na Tesoura" ariaLabel="Ícone de tesoura" :images="['/images/tosatesoura.jpg','/images/tosatesoura1.jpg','/images/tosatesoura2.jpg']">
    <template #icon>
      <Scissors3DIcon />
    </template>
    <p class="service-description">A partir de:</p>
    <table class="price-table">
      <thead><tr><th>Porte</th><th>Preço</th></tr></thead>
  <tbody>
        <tr>
          <td>Mini</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 50,00</span>
              <ScheduleButton service="Tosa na Tesoura" variant="Mini" price="R$ 50,00" :extras="extrasTosaTesoura" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Pequeno</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 65,00</span>
              <ScheduleButton service="Tosa na Tesoura" variant="Pequeno" price="R$ 65,00" :extras="extrasTosaTesoura" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Médio</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 80,00</span>
              <ScheduleButton service="Tosa na Tesoura" variant="Médio" price="R$ 80,00" :extras="extrasTosaTesoura" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 95,00</span>
              <ScheduleButton service="Tosa na Tesoura" variant="Grande" price="R$ 95,00" :extras="extrasTosaTesoura" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Extra Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>A combinar</span>
              <ScheduleButton service="Tosa na Tesoura" variant="Extra Grande" price="A combinar" :extras="extrasTosaTesoura" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Scissors3DIcon from '~/components/Scissors3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasTosaTesoura = [
  'Hidratação – R$ 20,00',
  'Coloração – a partir de R$ 15,00',
  'Higiene bucal – R$ 10,00',
  'Corte de unha – R$ 10,00',
  'Desembolo – R$ 30,00 a hora'
]
</script>