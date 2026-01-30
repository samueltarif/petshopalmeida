<template>
  <ServiceCard title="Tosa Padrão" ariaLabel="Ícone de cachorro/dog" :images="['/images/Tosa Padrão.jpg','/images/Tosa Padrão1.jpg','/images/Tosa Padrão2.jpg','/images/Tosa Padrão3.jpg']">
    <template #icon>
      <Dog3DIcon />
    </template>
    <p class="service-description">A partir de:</p>
    <table class="price-table">
      <thead><tr><th>Porte</th><th>Preço</th></tr></thead>
  <tbody>
        <tr>
          <td>Mini</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 40,00</span>
              <ScheduleButton service="Tosa Padrão" variant="Mini" price="R$ 40,00" :extras="extrasTosaPadrao" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Pequeno</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 50,00</span>
              <ScheduleButton service="Tosa Padrão" variant="Pequeno" price="R$ 50,00" :extras="extrasTosaPadrao" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Médio</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 60,00</span>
              <ScheduleButton service="Tosa Padrão" variant="Médio" price="R$ 60,00" :extras="extrasTosaPadrao" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 80,00</span>
              <ScheduleButton service="Tosa Padrão" variant="Grande" price="R$ 80,00" :extras="extrasTosaPadrao" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Extra Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>A combinar</span>
              <ScheduleButton service="Tosa Padrão" variant="Extra Grande" price="A combinar" :extras="extrasTosaPadrao" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Dog3DIcon from '~/components/Dog3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasTosaPadrao = [
  'Hidratação – R$ 20,00',
  'Coloração – a partir de R$ 15,00',
  'Higiene bucal – R$ 10,00',
  'Corte de unha – R$ 10,00',
  'Desembolo – R$ 30,00 a hora'
]
</script>