<template>
  <div>
    <HeaderBar :navItems="navItems" />
    <main>
      <!-- Hero Section específica do bairro -->
      <section class="hero bairro-hero">
        <div class="hero-content">
          <div class="hero-icon">
            <PawIcon :size="48" />
          </div>
          <h1>Pet Shop em {{ bairroData.nome }}</h1>
          <p class="tagline">Banho, Tosa e Táxi Dog em {{ bairroData.nome }}</p>
          <p class="welcome">
            Atendemos pets em {{ bairroData.nome }} e região com serviços de banho, tosa e táxi dog.
            Profissionais experientes e apaixonados por animais, oferecendo qualidade e dedicação.
          </p>
          <div class="cta-buttons">
            <ScheduleButton service="Banho e Tosa" />
            <AgendeAgoraButton />
          </div>
        </div>
      </section>

      <!-- Seção específica do bairro -->
      <section class="bairro-info">
        <div class="container">
          <h2>Serviços Pet em {{ bairroData.nome }}</h2>
          <div class="bairro-content">
            <div class="info-grid">
              <div class="info-card">
                <div class="card-icon">
                  <Location3DIcon :size="32" />
                </div>
                <h3>Atendimento em {{ bairroData.nome }}</h3>
                <p>{{ bairroData.descricao }}</p>
              </div>
              <div class="info-card">
                <div class="card-icon">
                  <CarTaxi3DIcon :size="32" />
                </div>
                <h3>Táxi Dog para {{ bairroData.nome }}</h3>
                <p>Buscamos e entregamos seu pet em {{ bairroData.nome }} com segurança e conforto.</p>
              </div>
              <div class="info-card">
                <div class="card-icon">
                  <Bath3DIcon :size="32" />
                </div>
                <h3>Banho e Tosa</h3>
                <p>Serviços completos de banho e tosa para pets de {{ bairroData.nome }}.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Seção de serviços -->
      <ServicesSection />

      <!-- Seção de pagamentos -->
      <PaymentsSection />

      <!-- Seção de contato -->
      <ContactSection />
    </main>
    <FooterBar />
    <LocalBusinessSchema :bairro="bairroData.nome" />
  </div>
</template>

<script setup>
// Dados dos bairros
const bairros = {
  'cachoeirinha': {
    nome: 'Cachoeirinha',
    descricao: 'Atendemos toda a região da Cachoeirinha com serviços especializados para pets. Nossa equipe conhece bem o bairro e oferece atendimento personalizado.',
    cep: '02717-000',
    regiao: 'Zona Norte'
  },
  'vila-penteado': {
    nome: 'Vila Penteado',
    descricao: 'Na Vila Penteado, oferecemos serviços completos de pet shop com a comodidade do táxi dog para buscar e entregar seu pet.',
    cep: '02717-000', 
    regiao: 'Zona Norte'
  },
  'brasilandia': {
    nome: 'Brasilândia',
    descricao: 'Atendimento especializado na Brasilândia com profissionais experientes em cuidados pet. Banho, tosa e transporte seguro.',
    cep: '02717-000',
    regiao: 'Zona Norte'
  },
  'eliza-maria': {
    nome: 'Eliza Maria',
    descricao: 'No bairro Eliza Maria, cuidamos do seu pet com carinho e profissionalismo. Serviços de qualidade na sua região.',
    cep: '02717-000',
    regiao: 'Zona Norte'
  },
  'cachoeirinha': {
    nome: 'Cachoeirinha',
    descricao: 'Nossa sede principal na Cachoeirinha, Av. Inajar de Souza, 3823. Atendemos toda a região com serviços completos de pet shop.',
    cep: '02717-000',
    regiao: 'Zona Norte'
  },
  'casa-verde': {
    nome: 'Casa Verde',
    descricao: 'Atendimento especializado na Casa Verde com profissionais experientes. Banho, tosa e táxi dog na região.',
    cep: '02717-000',
    regiao: 'Zona Norte'
  }
}

const route = useRoute()
const slug = route.params.slug

// Navigation items
const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Bairros', href: '/bairros' },
  { label: 'Pagamento', href: '/#pagamento' },
  { label: 'Contato', href: '/#contato' }
]

// Buscar dados do bairro
const bairroData = bairros[slug] || {
  nome: 'São Paulo',
  descricao: 'Atendemos toda a região de São Paulo com serviços especializados para pets.',
  cep: '01000-000',
  regiao: 'São Paulo'
}

// SEO dinâmico para cada bairro
useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: `Pet Shop em ${bairroData.nome} - Banho, Tosa e Táxi Dog | São Paulo`,
  meta: [
    { 
      name: 'description', 
      content: `Pet shop em ${bairroData.nome} - Banho, tosa e táxi dog. Atendemos ${bairroData.nome} e região com qualidade e profissionalismo. Agende já!` 
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'keywords', content: `pet shop ${bairroData.nome}, banho pet ${bairroData.nome}, tosa pet ${bairroData.nome}, táxi dog ${bairroData.nome}, ${bairroData.regiao}` },
    { property: 'og:title', content: `Pet Shop em ${bairroData.nome} - Banho, Tosa e Táxi Dog` },
    { property: 'og:description', content: `Serviços de pet shop em ${bairroData.nome}. Banho, tosa e táxi dog com qualidade e profissionalismo.` },
    { property: 'og:type', content: 'website' },
    { name: 'geo.region', content: 'BR-SP' },
    { name: 'geo.placename', content: `${bairroData.nome}, São Paulo` },
    { name: 'geo.position', content: '-23.5505;-46.6333' }
  ]
})

// Fade-in animation on scroll
onMounted(() => {
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
      }
    })
  }, observerOptions)

  // Observe elements that need fade-in animation
  const elementsToObserve = document.querySelectorAll('.info-card, .service-card, .payment-card')
  elementsToObserve.forEach(el => observer.observe(el))
})
</script>

<style scoped>
.bairro-hero {
  background: linear-gradient(135deg, #2B5F8D 0%, #87CEEB 100%);
  min-height: 70vh;
  display: flex;
  align-items: center;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.hero-icon {
  margin-bottom: 2rem;
  color: white;
}

.hero-content h1 {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.tagline {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.welcome {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.bairro-info {
  padding: 3rem 2rem;
  background: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.bairro-info h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: var(--text-primary);
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.info-card {
  background: var(--bg-primary);
  padding: 2.5rem;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.info-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.card-icon {
  background: rgba(43, 95, 141, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  color: var(--primary-color);
}

.info-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-weight: 600;
}

.info-card p {
  color: var(--text-secondary);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .info-grid {
    grid-template-columns: 1fr;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

/* Fade-in animations */
.info-card, .service-card, .payment-card { 
  opacity: 0; 
  transform: translateY(8px); 
  will-change: transform, opacity; 
}

.fade-in { 
  opacity: 1; 
  transform: translateY(0); 
  transition: opacity var(--duration-normal, 250ms) var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)), 
              transform var(--duration-normal, 250ms) var(--ease-standard, cubic-bezier(0.16, 1, 0.3, 1)); 
}
</style>