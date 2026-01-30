<template>
  <ServiceCard
    title="Remoção de Pêlo Morto"
    ariaLabel="Ícone de máquina de cortar pelo"
    :images="['/images/remova_pelo.jpg','/images/remove_pelo2.jpg']"
    :extrasItems="extrasRemocao"
  >
    <template #icon>
      <Clipper3DIcon />
    </template>
    <p class="service-description">A partir de:</p>
    <table class="price-table">
      <thead><tr><th>Serviço</th><th>Preço</th></tr></thead>
      <tbody>
        <tr>
          <td>Padrão</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>R$ 50,00</span>
              <ScheduleButton service="Remoção de Pêlo Morto" price="A partir de R$ 50,00" :extras="extrasRemocao" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
  
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import Clipper3DIcon from '~/components/Clipper3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
const extrasRemocao = [
  'Hidratação – R$ 20,00',
  'Higiene bucal – R$ 10,00',
  'Corte de unha – R$ 10,00',
  'Desembolo – R$ 30,00 a hora',
  'Coloração – a partir de R$ 15,00'
]
</script>