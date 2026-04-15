<template>
  <div>
    <HeaderBar :navItems="navItems" />
    <main>
      <section class="hero bairros-hero" id="home">
        <div class="hero-content">
          <h1><AnimePaw :size="34" /><AnimePaw :size="34" /> Bairros Atendidos em São Paulo</h1>
          <p class="tagline">Banho, tosa e táxi dog em diversos bairros <Heart3DIcon :size="22" /></p>
          <p class="welcome">
            Atendemos diversos bairros de São Paulo com serviços especializados para pets.
            Escolha seu bairro e conheça nossos serviços na sua região.
          </p>
        </div>
      </section>

      <section class="bairros-grid" id="bairros">
        <h2>Selecione seu Bairro</h2>
        <div class="bairros-container">
          <NuxtLink to="/bairro/cachoeirinha" class="bairro-card featured">
            <Location3DIcon :size="32" />
            <h3>Cachoeirinha</h3>
            <p>Nossa sede principal</p>
            <span class="address">Av. Inajar de Souza, 3823</span>
          </NuxtLink>

          <NuxtLink to="/bairro/limao" class="bairro-card">
            <Location3DIcon :size="32" />
            <h3>Limão</h3>
            <p>Atendimento completo</p>
          </NuxtLink>

          <NuxtLink to="/bairro/vila-penteado" class="bairro-card">
            <Location3DIcon :size="32" />
            <h3>Vila Penteado</h3>
            <p>Serviços especializados</p>
          </NuxtLink>

          <NuxtLink to="/bairro/brasilandia" class="bairro-card">
            <Location3DIcon :size="32" />
            <h3>Brasilândia</h3>
            <p>Cuidado e carinho</p>
          </NuxtLink>

          <NuxtLink to="/bairro/eliza-maria" class="bairro-card">
            <Location3DIcon :size="32" />
            <h3>Eliza Maria</h3>
            <p>Atendimento 5 estrelas</p>
          </NuxtLink>

          <NuxtLink to="/bairro/casa-verde" class="bairro-card">
            <Location3DIcon :size="32" />
            <h3>Casa Verde</h3>
            <p>Qualidade garantida</p>
          </NuxtLink>
        </div>
      </section>

      <section class="services-overview">
        <h2>Nossos Serviços</h2>
        <div class="services-grid">
          <div class="service-item">
            <Bath3DIcon :size="48" />
            <h3>Banho Completo</h3>
            <p>Banho, secagem e perfumação</p>
          </div>
          <div class="service-item">
            <Scissors3DIcon :size="48" />
            <h3>Tosa Profissional</h3>
            <p>Tosa higiênica e estética</p>
          </div>
          <div class="service-item">
            <CarTaxi3DIcon :size="48" />
            <h3>Táxi Dog</h3>
            <p>Busca e entrega do seu pet</p>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Bairros', href: '/bairro' },
  { label: 'Contato', href: '/#contato' }
]

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: 'Bairros Atendidos - Pet Shop em São Paulo | Banho, Tosa e Táxi Dog',
  meta: [
    { name: 'description', content: 'Pet shop em diversos bairros de São Paulo: Limão, Cachoeirinha, Vila Penteado, Brasilândia, Eliza Maria, Casa Verde. Banho, tosa e táxi dog.' },
    { name: 'keywords', content: 'pet shop são paulo, bairros atendidos, banho tosa sp, táxi dog são paulo, limão cachoeirinha vila penteado' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { property: 'og:title', content: 'Pet Shop em Diversos Bairros de São Paulo' },
    { property: 'og:description', content: 'Atendemos diversos bairros de SP com banho, tosa e táxi dog. Escolha seu bairro.' }
  ]
})
</script>

<style scoped>
.bairros-hero {
  background: 
    linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%),
    url('/images/foto_capa.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 6rem 2rem 4rem;
  text-align: center;
  color: white;
}

.bairros-grid {
  padding: 4rem 2rem;
  background: var(--bg-secondary);
}

.bairros-grid h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--text-primary);
}

.bairros-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.bairro-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 16px;
  text-align: center;
  text-decoration: none;
  color: var(--text-primary);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.bairro-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  border-color: var(--accent-color);
}

.bairro-card.featured {
  border-color: #ffd700;
  background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
}

.bairro-card h3 {
  margin: 1rem 0 0.5rem;
  font-size: 1.5rem;
  color: var(--text-primary);
}

.bairro-card p {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.address {
  font-size: 0.9rem;
  color: var(--accent-color);
  font-weight: 500;
}

.services-overview {
  padding: 4rem 2rem;
  background: var(--bg-primary);
}

.services-overview h2 {
  text-align: center;
  margin-bottom: 3rem;
  font-size: 2.5rem;
  color: var(--text-primary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 900px;
  margin: 0 auto;
}

.service-item {
  text-align: center;
  padding: 2rem;
  background: var(--bg-secondary);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.service-item h3 {
  margin: 1rem 0 0.5rem;
  color: var(--text-primary);
}

.service-item p {
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .bairros-container {
    grid-template-columns: 1fr;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
  }
}
</style>