<template>
  <div>
    <HeaderBar :navItems="navItems" />
    
    <!-- HERO SECTION - COPIADO DE pages/index.vue -->
    <section class="hero" id="home">
      <div class="hero-content">
        <h1 class="hero-title" style="color: #FFFFFF !important;">Bairros Atendidos em São Paulo</h1>
        <p class="hero-subtitle" style="color: #FFFFFF !important;">
          Banho, tosa e táxi dog em diversos bairros de São Paulo com serviços especializados para pets. Escolha seu bairro e conheça nossos serviços na sua região.
        </p>
        <!-- BOTÃO REMOVIDO conforme solicitado -->
      </div>
    </section>

    <main>
      <!-- Lista de Bairros -->
      <section class="bairros-section">
        <div class="container">
          <h2>Regiões Atendidas</h2>
          
          <div class="regiao-group">
            <h3>
              <Location3DIcon :size="28" />
              Zona Norte
            </h3>
            <div class="bairros-grid">
              <NuxtLink 
                v-for="bairro in zonaNorte" 
                :key="bairro.slug"
                :to="`/bairro/${bairro.slug}`"
                class="bairro-card"
                :class="{ 'featured': bairro.slug === 'cachoeirinha' }"
              >
                <div class="bairro-header">
                  <div class="bairro-icon">
                    <PawIcon :size="32" />
                  </div>
                  <div class="bairro-info">
                    <h4>{{ bairro.nome }}</h4>
                    <p class="bairro-desc">{{ bairro.descricao }}</p>
                  </div>
                </div>
                <div class="bairro-footer">
                  <span class="cta">Ver serviços</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span v-if="bairro.slug === 'cachoeirinha'" class="featured-badge">Nossa Sede</span>
              </NuxtLink>
            </div>
          </div>

        </div>
      </section>

      <ContactSection />
    </main>
    <FooterBar />
  </div>
</template>

<script setup>
// Navigation items
const navItems = [
  { label: 'Início', href: '/' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Serviços', href: '/#servicos' },
  { label: 'Bairros', href: '/bairros' },
  { label: 'Pagamento', href: '/#pagamento' },
  { label: 'Contato', href: '/#contato' }
]

const zonaNorte = [
  {
    slug: 'cachoeirinha',
    nome: 'Cachoeirinha',
    descricao: 'Nossa sede principal - Av. Inajar de Souza, 3823'
  },
  {
    slug: 'vila-penteado',
    nome: 'Vila Penteado',
    descricao: 'Banho e tosa na Vila Penteado com busca e entrega'
  },
  {
    slug: 'brasilandia',
    nome: 'Brasilândia',
    descricao: 'Serviços pet na Brasilândia com profissionais experientes'
  },
  {
    slug: 'eliza-maria',
    nome: 'Eliza Maria',
    descricao: 'Cuidados pet no Eliza Maria com qualidade'
  },
  {
    slug: 'casa-verde',
    nome: 'Casa Verde',
    descricao: 'Atendimento especializado na Casa Verde'
  },
  {
    slug: 'limao',
    nome: 'Limão',
    descricao: 'Atendimento completo na região do Limão'
  }
]

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: 'Bairros Atendidos - Pet Shop Zona Norte SP | Banho, Tosa e Táxi Dog',
  meta: [
    { 
      name: 'description', 
      content: 'Pet shop na Zona Norte de São Paulo atende Cachoeirinha, Vila Penteado, Brasilândia, Casa Verde, Limão e Eliza Maria. Banho, tosa e táxi dog com qualidade.' 
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'keywords', content: 'pet shop zona norte sp, cachoeirinha, vila penteado, brasilândia, casa verde, limão, eliza maria, táxi dog' }
  ]
})
</script>

<style scoped>
/* Importando Google Fonts para tipografia moderna */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500&display=swap');

/* HERO SECTION - COPIADO DE pages/index.vue */
.hero { 
  background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('/images/foto_capa.png');
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  padding: 100px var(--space-20) 80px; 
  text-align: left; 
  position: relative; 
  min-height: 75vh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

/* RESET COMPLETO DE CORES NO HERO - FORÇA BRANCO PURO */
.hero,
.hero *,
.hero h1,
.hero h2,
.hero h3,
.hero h4,
.hero h5,
.hero h6,
.hero p,
.hero span,
.hero div,
.hero-content,
.hero-content *,
.hero-title,
.hero-subtitle {
  color: #FFFFFF !important;
  --color-text: #FFFFFF !important;
  --color-text-secondary: #FFFFFF !important;
  --pet-primary: #FFFFFF !important;
  --color-slate-900: #FFFFFF !important;
}

.hero-content { 
  max-width: 580px; 
  margin: 0 0 0 var(--space-40); 
  position: relative; 
  z-index: 2; 
  padding: 30px 40px;
  background: rgba(0,0,0,0.9);
  border-radius: 20px;
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.15);
  box-shadow: 0 12px 40px rgba(0,0,0,0.4);
}

.hero-title { 
  font-family: 'Poppins', sans-serif !important;
  font-weight: 700 !important;
  font-size: clamp(32px, 5vw, 48px) !important;
  color: #FFFFFF !important;
  margin-bottom: var(--space-32) !important;
  letter-spacing: -0.03em !important;
  text-shadow: 
    3px 3px 0px rgba(0,0,0,1),
    -1px -1px 0px rgba(0,0,0,1),
    1px -1px 0px rgba(0,0,0,1),
    -1px 1px 0px rgba(0,0,0,1),
    0 0 15px rgba(0,0,0,0.9),
    0 0 30px rgba(0,0,0,0.7) !important;
  line-height: 1.6 !important;
  text-align: left !important;
}

.hero-subtitle { 
  font-family: 'Inter', sans-serif !important;
  font-weight: 400 !important;
  font-size: clamp(14px, 2.5vw, 18px) !important;
  color: #FFFFFF !important;
  margin-bottom: var(--space-32) !important;
  line-height: 1.6 !important;
  text-shadow: 
    2px 2px 0px rgba(0,0,0,1),
    -1px -1px 0px rgba(0,0,0,1),
    1px -1px 0px rgba(0,0,0,1),
    -1px 1px 0px rgba(0,0,0,1),
    0 0 10px rgba(0,0,0,0.9),
    0 0 20px rgba(0,0,0,0.6) !important;
  text-align: left !important;
  max-width: 520px;
}

/* Desktop - mantém layout original */
@media (min-width: 769px) {
  .hero { 
    justify-content: flex-start;
    align-items: center;
    min-height: 75vh;
  }
  
  .hero-content { 
    max-width: 580px; 
    margin: 0 0 0 var(--space-40);
    padding: 30px 40px;
    max-height: none;
  }
}

/* Mobile: HERO IMAGE SOBE ATÉ O HEADER */
@media (max-width: 768px) {
  .hero { 
    padding: 0 var(--space-16) 20px !important;
    margin-top: -56px !important;
    padding-top: 56px !important;
    text-align: left;
    min-height: 100vh;
    justify-content: flex-end;
    align-items: flex-end;
    background-position: center top;
    position: relative;
    z-index: 1;
  }
  
  .hero-content { 
    margin: 0 0 40px 0;
    padding: 16px 20px;
    max-width: 95%; 
    background: rgba(0,0,0,0.9);
    border-radius: 16px;
    max-height: 45vh;
    overflow: visible;
    position: relative;
    z-index: 2;
  }
  
  .hero-title { 
    font-size: 18px !important;
    margin-bottom: 8px !important;
    line-height: 1.3 !important;
    font-weight: 700 !important;
    color: #FFFFFF !important;
    text-align: left !important;
    text-shadow: 
      1px 1px 0px rgba(0,0,0,1),
      -1px -1px 0px rgba(0,0,0,1),
      1px -1px 0px rgba(0,0,0,1),
      -1px 1px 0px rgba(0,0,0,1),
      0 0 8px rgba(0,0,0,0.95) !important;
  }
  
  .hero-subtitle { 
    font-size: 13px !important;
    margin-bottom: 16px !important;
    line-height: 1.4 !important;
    font-weight: 400 !important;
    color: #FFFFFF !important;
    text-align: left !important;
    text-shadow: 
      1px 1px 0px rgba(0,0,0,1),
      -1px -1px 0px rgba(0,0,0,1),
      1px -1px 0px rgba(0,0,0,1),
      -1px 1px 0px rgba(0,0,0,1),
      0 0 6px rgba(0,0,0,0.9) !important;
  }
}

@media (max-width: 480px) {
  .hero { 
    padding: 0 var(--space-12) 15px !important;
    margin-top: -56px !important;
    padding-top: 56px !important;
    text-align: left;
    min-height: 100vh;
    justify-content: flex-end;
    align-items: flex-end;
    background-position: center top;
    position: relative;
    z-index: 1;
  }
  
  .hero-content {
    padding: 14px 18px;
    max-width: 92%;
    margin: 0 auto 30px auto;
    border-radius: 12px;
    max-height: 40vh;
    overflow: visible;
    position: relative;
    z-index: 2;
  }
  
  .hero-title {
    font-size: 17px !important;
    line-height: 1.25 !important;
    margin-bottom: 6px !important;
    font-weight: 700 !important;
    color: #FFFFFF !important;
    text-align: left !important;
  }
  
  .hero-subtitle {
    font-size: 12px !important;
    line-height: 1.3 !important;
    margin-bottom: 16px !important;
    color: #FFFFFF !important;
    text-align: left !important;
  }
}

/* RESTO DA PÁGINA - ESTILOS ORIGINAIS */

.bairros-section {
  padding: 6rem 2rem;
  background: var(--bg-secondary);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.bairros-section h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 4rem;
  color: var(--text-primary);
  font-weight: 700;
}

.regiao-group {
  margin-bottom: 5rem;
}

.regiao-group h3 {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  margin-bottom: 2.5rem;
  color: var(--primary-color);
  font-weight: 600;
}

.bairros-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
}

.bairro-card {
  background: var(--bg-primary);
  padding: 2rem;
  border-radius: 16px;
  text-decoration: none;
  color: inherit;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
}

.bairro-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  border-color: var(--primary-color);
}

.bairro-card.featured {
  border-color: #FFD700;
  background: linear-gradient(135deg, #fff9e6 0%, #ffffff 100%);
}

.bairro-header {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.bairro-icon {
  background: rgba(43, 95, 141, 0.1);
  padding: 1rem;
  border-radius: 12px;
  color: var(--primary-color);
  flex-shrink: 0;
}

.bairro-info {
  flex: 1;
}

.bairro-info h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
}

.bairro-desc {
  color: var(--text-secondary);
  line-height: 1.5;
  margin: 0;
}

.bairro-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.cta {
  color: var(--primary-color);
  font-weight: 600;
  font-size: 1rem;
}

.bairro-footer svg {
  color: var(--primary-color);
  transition: transform 0.2s ease;
}

.bairro-card:hover .bairro-footer svg {
  transform: translateX(4px);
}

.featured-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #FFD700;
  color: #333;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 2.5rem;
  }
  
  .bairros-grid {
    grid-template-columns: 1fr;
  }
  
  .bairro-header {
    flex-direction: column;
    text-align: center;
  }
  
  .bairro-icon {
    align-self: center;
  }
}
</style>