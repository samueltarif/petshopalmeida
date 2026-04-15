<template>
  <section id="sobre">
    <h2>Sobre Nós</h2>
    <div class="about-content">
      <p>
        O Banho, Tosa e Táxi Dog em São Paulo é referência em cuidados para pets na região do Limão, São Paulo.
        Com profissionais experientes e apaixonados por animais, oferecemos serviços de
        banho, tosa e táxi dog com qualidade e dedicação.
      </p>
      <p>
        Nossa missão é proporcionar bem-estar e conforto para seu melhor amigo,
        com atendimento personalizado e todo o carinho que ele merece.
      </p>
      <div class="highlights">
        <div class="highlight-item">
          <ThreeDIcon />
          <h3>Profissionais Experientes</h3>
          <p>Equipe qualificada e treinada</p>
        </div>
        <div class="highlight-item">
          <CarTaxi3DIcon />
          <h3>Táxi Dog</h3>
          <p>Transporte seguro para seu pet</p>
        </div>
        <div class="highlight-item">
          <div class="icon" aria-label="Ícone de localização"><Location3DIcon /></div>
          <h3>Localização</h3>
          <p>Av. Inajar de Souza, 3823<br>Cachoeirinha - São Paulo</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import ThreeDIcon from '~/components/ThreeDIcon.vue'
import CarTaxi3DIcon from '~/components/CarTaxi3DIcon.vue'
import Location3DIcon from '~/components/Location3DIcon.vue'
</script>

<style scoped>
section { padding: 60px var(--space-20); max-width: 1280px; margin: 0 auto; }
section h2 { text-align: center; font-size: var(--font-size-4xl); margin-bottom: var(--space-32); color: var(--pet-primary); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-tight); }
.about-content { max-width: 800px; margin: 0 auto; text-align: center; }
.about-content p { font-size: var(--font-size-lg); line-height: 1.8; margin-bottom: var(--space-20); color: var(--color-text); }
.highlights { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-20); margin-top: var(--space-32); }
.highlight-item { background: var(--color-bg-1); padding: var(--space-20); border-radius: var(--radius-lg); border: 1px solid var(--color-card-border); }
.highlight-item .icon { font-size: 40px; margin-bottom: var(--space-12); }
.highlight-item h3 { font-size: var(--font-size-lg); margin-bottom: var(--space-8); color: var(--color-text); }
</style>