<template>
  <section class="hero" id="home">
    <div class="hero-content">
      <h1><AnimePaw :size="34" /><AnimePaw :size="34" /> Banho, Tosa e Táxi Dog em São Paulo</h1>
      <p class="tagline">Cuidado e carinho para seu pet <Heart3DIcon :size="22" /></p>
      <p class="welcome">
        Bem-vindo ao Banho, Tosa e Táxi Dog em São Paulo! Somos especializados em banho, tosa e táxi dog em São Paulo.
        Tratamos seu pet com todo amor e profissionalismo que ele merece.
      </p>
      <div class="hero-cta">
        <AgendeAgoraButton />
      </div>
    </div>
    <ClientOnly>
      <HeroPaws
        :count="28"
        color="#000000"
        :minSize="18"
        :maxSize="42"
        :speed="16"
        :opacityMin="0.10"
        :opacityMax="0.18"
      />
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import AnimePaw from '~/components/AnimePaw.vue'
import Heart3DIcon from '~/components/Heart3DIcon.vue'
import AgendeAgoraButton from '~/components/AgendeAgoraButton.vue'
import HeroPaws from '~/components/HeroPaws.vue'
</script>

<style scoped>
.hero { background: var(--color-bg-8); padding: 80px var(--space-20) 60px; text-align: center; position: relative; isolation: isolate; overflow: hidden; }
.hero::before { content: ""; position: absolute; inset: 0; background: rgba(0,0,0,0.18); z-index: 0; }
.hero-content { max-width: 800px; margin: 0 auto; position: relative; z-index: 1; }
.hero h1 { font-size: clamp(32px, 5vw, 48px); color: var(--pet-primary); margin-bottom: var(--space-12); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-tight); }
.hero .tagline { font-size: var(--font-size-2xl); color: var(--color-text-secondary); margin-bottom: var(--space-32); }
.hero .welcome { font-size: var(--font-size-lg); line-height: 1.6; margin-bottom: var(--space-32); color: var(--color-text); }
.hero-cta { display: flex; flex-direction: column; gap: var(--space-16); align-items: center; }
.cta-button { background: var(--pet-primary); color: white; padding: var(--space-16) var(--space-32); border-radius: var(--radius-lg); text-decoration: none; font-size: var(--font-size-xl); font-weight: var(--font-weight-semibold); box-shadow: var(--shadow-md); transition: all var(--duration-normal) var(--ease-standard); display: inline-block; }
.cta-button:hover { background: #1f4a6b; transform: translateY(-2px); box-shadow: var(--shadow-lg); }
</style>
