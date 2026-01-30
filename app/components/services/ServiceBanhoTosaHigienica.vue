<template>
  <ServiceCard
    title="Banho e Tosa Higiênica"
    ariaLabel="Banheira"
    :images="['/images/toby.jpg','/images/tosahigienica.jpg','/images/dog.jpg']"
  >
    <template #icon>
      <Bath3DIcon />
    </template>
    <table class="price-table">
      <thead><tr><th>Porte</th><th>Preço Total</th></tr></thead>
      <tbody>
        <tr>
          <td>Mini</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>{{ toBRL(totals.mini) }}</span>
              <ScheduleButton service="Banho e Tosa Higiênica" variant="Mini" :price="toBRL(totals.mini)" :extras="extrasHigienica" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Pequeno</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>{{ toBRL(totals.pequeno) }}</span>
              <ScheduleButton service="Banho e Tosa Higiênica" variant="Pequeno" :price="toBRL(totals.pequeno)" :extras="extrasHigienica" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Médio</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>{{ toBRL(totals.medio) }}</span>
              <ScheduleButton service="Banho e Tosa Higiênica" variant="Médio" :price="toBRL(totals.medio)" :extras="extrasHigienica" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>{{ toBRL(totals.grande) }}</span>
              <ScheduleButton service="Banho e Tosa Higiênica" variant="Grande" :price="toBRL(totals.grande)" :extras="extrasHigienica" />
            </div>
          </td>
        </tr>
        <tr>
          <td>Extra Grande</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>A combinar</span>
              <ScheduleButton service="Banho e Tosa Higiênica" variant="Extra Grande" price="A combinar" :extras="extrasHigienica" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Bath3DIcon from '~/components/Bath3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasHigienica = [
  'Coloração – a partir de R$ 15,00',
  'Desembolo – R$ 30,00 a hora',
  'Hidratação – R$ 20,00',
  'Higiene bucal – R$ 10,00',
  'Corte de unha – R$ 10,00'
]

// Utilitário para formatar valores em BRL
const toBRL = (n) => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })

// Totais por porte (Banho + Tosa Higiênica)
const totals = {
  mini: 35 + 10,        // 45,00
  pequeno: 45 + 20,     // 65,00
  medio: 60 + 30,       // 90,00
  grande: 75 + 40       // 115,00
}
</script>