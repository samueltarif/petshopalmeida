<template>
  <ServiceCard
    title="Tosa Zero"
    ariaLabel="Ícone de navalha"
    :images="['/images/Tosa Zero.jpg','/images/Tosa Zero1.jpg','/images/Tosa Zero2.jpg']"
    :extrasItems="extrasTosaZero"
  >
    <template #icon>
      <Razor3DIcon />
    </template>
    <p class="service-description">A partir de:</p>
    <table class="price-table">
      <thead><tr><th>Porte</th><th>Preço</th></tr></thead>
  <tbody>
        <tr>
          <td>Mini</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 45,00</span>
              <ScheduleButton service="Tosa Zero" variant="Mini" price="R$ 45,00" :extras="extrasTosaZero" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Pequeno</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 55,00</span>
              <ScheduleButton service="Tosa Zero" variant="Pequeno" price="R$ 55,00" :extras="extrasTosaZero" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Médio</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 65,00</span>
              <ScheduleButton service="Tosa Zero" variant="Médio" price="R$ 65,00" :extras="extrasTosaZero" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 90,00</span>
              <ScheduleButton service="Tosa Zero" variant="Grande" price="R$ 90,00" :extras="extrasTosaZero" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Extra Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>A combinar</span>
              <ScheduleButton service="Tosa Zero" variant="Extra Grande" price="A combinar" :extras="extrasTosaZero" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Razor3DIcon from '~/components/Razor3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasTosaZero = [
  'Coloração – a partir de R$15,00',
  'Corte de unha – R$ 10,00',
  'Hidratação – R$ 20,00',
  'Higiene bucal – R$ 10,00'
]
</script>