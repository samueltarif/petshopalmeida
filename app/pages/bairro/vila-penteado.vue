<template>
  <div>
    <LocalBusinessSchema 
      business-name="Pet Shop Vila Penteado SP - Banho, Tosa e Táxi Dog"
      description="Pet shop especializado na Vila Penteado SP. Banho, tosa e táxi dog na Vila Penteado com atendimento domiciliar."
      neighborhood="Vila Penteado"
    />
    <HeaderBar :navItems="navItems" />
    <main>
      <section class="hero bairro-hero" id="home">
        <div class="hero-content">
          <div class="hero-badge">
            <PawIcon :size="24" color="#2B5F8D" />
            <span>Vila Penteado - SP</span>
          </div>
          <h1>Pet Shop na Vila Penteado</h1>
          <p class="tagline">Banho, tosa e táxi dog especializado</p>
          <p class="welcome">
            Atendemos pets na Vila Penteado com serviços completos de banho, tosa e transporte. 
            Cuidado especial e profissionalismo para seu pet na Vila Penteado, São Paulo.
          </p>
          <div class="hero-buttons">
            <ScheduleButton service="Banho e Tosa" />
            <AgendeAgoraButton />
          </div>
        </div>
        <div class="hero-visual">
          <div class="floating-icons">
            <PawIcon :size="32" color="#2B5F8D" class="floating-icon icon-1" />
            <PawIcon :size="24" color="#87CEEB" class="floating-icon icon-2" />
            <PawIcon :size="28" color="#FFD700" class="floating-icon icon-3" />
          </div>
        </div>
      </section>

      <section class="about bairro-about" id="sobre">
        <div class="container">
          <h2>Serviços Pet na Vila Penteado</h2>
          <div class="about-content">
            <div class="about-text">
              <p>
                Na Vila Penteado, oferecemos serviços completos para seu pet com a qualidade que você procura.
                Conhecemos bem a região da Vila Penteado e proporcionamos atendimento personalizado e táxi dog.
              </p>
            </div>
            <div class="bairro-highlights">
              <div class="highlight-item">
                <div class="highlight-icon">
                  <Location3DIcon :size="32" />
                </div>
                <div class="highlight-content">
                  <h3>Cobertura Completa</h3>
                  <p>Atendimento em toda Vila Penteado</p>
                </div>
              </div>
              <div class="highlight-item">
                <div class="highlight-icon">
                  <CarTaxi3DIcon :size="32" />
                </div>
                <div class="highlight-content">
                  <h3>Táxi Dog</h3>
                  <p>Busca e entrega na Vila Penteado</p>
                </div>
              </div>
              <div class="highlight-item">
                <div class="highlight-icon">
                  <Scissors3DIcon :size="32" />
                </div>
                <div class="highlight-content">
                  <h3>Tosa Profissional</h3>
                  <p>Tosa especializada e personalizada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesSection />
      <PaymentsSection />
      <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
// Importações explícitas
import ServicesSection from '~/components/ServicesSection.vue'
import PaymentsSection from '~/components/PaymentsSection.vue'
import ContactSection from '~/components/ContactSection.vue'

// Navigation items
const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Bairros', href: '/bairros' },
  { label: 'Pagamento', href: '/#pagamento' },
  { label: 'Contato', href: '/#contato' }
]

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: 'Pet Shop Vila Penteado SP - Banho, Tosa e Táxi Dog',
  meta: [
    { name: 'description', content: 'Pet shop na Vila Penteado SP. Serviços de banho, tosa e táxi dog na Vila Penteado. Atendimento especializado para pets.' },
    { name: 'keywords', content: 'pet shop vila penteado, banho tosa vila penteado, táxi dog vila penteado, pet vila penteado sp' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { property: 'og:title', content: 'Pet Shop Vila Penteado SP - Serviços Completos' },
    { property: 'og:description', content: 'Banho, tosa e táxi dog na Vila Penteado. Atendimento especializado e personalizado.' }
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
  const elementsToObserve = document.querySelectorAll('.highlight-item, .service-card, .payment-card')
  elementsToObserve.forEach(el => observer.observe(el))
})
</script>

<style scoped>
.bairro-hero {
  background: linear-gradient(135deg, rgba(43, 95, 141, 0.8) 0%, rgba(135, 206, 235, 0.8) 100%), url('/images/foto_capa.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 60vh;
  display: flex;
  align-items: center;
  padding: 3rem 2rem;
  text-align: center;
  color: white;
  position: relative;
  overflow: hidden;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.hero-badge span {
  font-weight: 600;
  font-size: 1rem;
}

.hero-content h1 {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.tagline {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  opacity: 0.9;
  font-weight: 600;
}

.welcome {
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.hero-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-visual {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.floating-icons {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-icon {
  position: absolute;
  opacity: 0.3;
  animation: float 6s ease-in-out infinite;
}

.icon-1 {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.icon-2 {
  top: 60%;
  right: 15%;
  animation-delay: 2s;
}

.icon-3 {
  bottom: 30%;
  left: 20%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(10deg); }
}

.bairro-about {
  padding: 3rem 2rem;
  background: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.bairro-about h2 {
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: var(--text-primary);
}

.about-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

.about-text {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.about-text p {
  font-size: 1.2rem;
  line-height: 1.7;
  color: var(--text-secondary);
}

.bairro-highlights {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  padding: 2rem;
  background: var(--bg-primary);
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.highlight-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.highlight-icon {
  background: rgba(43, 95, 141, 0.1);
  padding: 1rem;
  border-radius: 12px;
  color: var(--primary-color);
  flex-shrink: 0;
}

.highlight-content h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.highlight-content p {
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2.5rem;
  }
  
  .bairro-highlights {
    grid-template-columns: 1fr;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .highlight-item {
    flex-direction: column;
    text-align: center;
  }
  
  .floating-icon {
    display: none;
  }
}

/* Fade-in animations */
.highlight-item, .service-card, .payment-card { 
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