<template>
  <ServiceCard title="Dog Walker – Passeios com seu pet" ariaLabel="Ícone Dog Walker" :images="[]" :showExtras="false">
    <template #icon>
      <DogWalker3DIcon />
    </template>

    <p class="service-description">
      Seu doguinho precisa se exercitar, gastar energia e se divertir!
      Oferecemos passeios simples e interativos com duração de até 1 hora,
      garantindo bem‑estar, socialização e muito carinho. Ideal para quem
      quer ver o pet feliz mesmo com a rotina corrida.
    </p>

    <table class="price-table">
      <thead>
        <tr>
          <th>Plano</th>
          <th>Preço</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Passeio até 1 hora</td>
          <td>
            <div class="flex items-center justify-between gap-2">
              <span>A combinar</span>
              <ScheduleButton service="Dog Walker – Passeios com seu pet" variant="Passeio até 1 hora" price="A combinar" greetingPrefix="Olá, vim pelo seu site" />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </ServiceCard>
  <!-- O botão "Serviços Adicionais" já é fornecido por ServiceCard -->
</template>

<script setup>
import ServiceCard from '~/components/ServiceCard.vue'
import DogWalker3DIcon from '~/components/DogWalker3DIcon.vue'
import ScheduleButton from '~/components/ScheduleButton.vue'
</script>

<style scoped>
/* sem estilos próprios; usa padrões de ServiceCard */
</style>