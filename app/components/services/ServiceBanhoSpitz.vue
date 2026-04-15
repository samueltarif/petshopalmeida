<template>
  <ServiceCard title="Banho Spitz - Lulu da Pomerânia" ariaLabel="Ícone de estrelas" :images="['/images/splitz.png','/images/splitz1.jpg']">
    <template #icon>
      <Star3DIcon />
    </template>
    <table class="price-table">
      <thead><tr><th>Porte</th><th>Preço</th></tr></thead>
  <tbody>
        <tr>
          <td>Mini</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 45,00</span>
              <ScheduleButton service="Banho Spitz - Lulu da Pomerânia" variant="Mini" price="R$ 45,00" :extras="extrasBanhoSpitz" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Pequeno</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 60,00</span>
              <ScheduleButton service="Banho Spitz - Lulu da Pomerânia" variant="Pequeno" price="R$ 60,00" :extras="extrasBanhoSpitz" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Médio</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 75,00</span>
              <ScheduleButton service="Banho Spitz - Lulu da Pomerânia" variant="Médio" price="R$ 75,00" :extras="extrasBanhoSpitz" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 85,00</span>
              <ScheduleButton service="Banho Spitz - Lulu da Pomerânia" variant="Grande" price="R$ 85,00" :extras="extrasBanhoSpitz" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Extra Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>A combinar</span>
              <ScheduleButton service="Banho Spitz - Lulu da Pomerânia" variant="Extra Grande" price="A combinar" :extras="extrasBanhoSpitz" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Star3DIcon from '~/components/Star3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasBanhoSpitz = [
  'Coloração – a partir de R$ 15,00',
  'Hidratação – R$ 20,00',
  'Higiene bucal – R$ 10,00',
  'Corte de unha – R$ 10,00',
  'Desembolo – R$ 30,00 a hora'
]
</script>