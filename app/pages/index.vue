<template>
  <div>
    <LocalBusinessSchema />
    <HeaderBar :navItems="navItems" />

    <section class="hero" id="home">
      <div class="hero-content">
        <h1 class="hero-title" style="color: #FFFFFF !important;">Bem-vindo ao Banho e Tosa Almeida em São Paulo!</h1>
        <p class="hero-subtitle" style="color: #FFFFFF !important;">
          Somos especializados em banho, tosa e táxi dog em São Paulo – Zona Norte. 
          Tratamos seu pet com todo o amor e profissionalismo que ele merece.
        </p>
        <div class="hero-cta">
          <button class="cta-button-custom" @click="scrollToContact" style="color: #FFFFFF !important;">
            🐾 Agende Agora
          </button>
        </div>
      </div>
    </section>

    <section id="sobre">
      <h2>Sobre Nós</h2>
      <div class="about-content">
        <p>
          O Banho e Tosa Almeida é referência em cuidados para pets na região da Zona Norte de São Paulo.
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

    <ServicesSection />

    <PaymentsSection />

    <ContactSection />

    <div v-if="termsOpen" class="terms-overlay" role="dialog" aria-modal="true" aria-labelledby="terms-title">
      <div class="terms-dialog">
        <div class="terms-header">
          <h2 id="terms-title">Termos de Uso</h2>
          <button class="terms-close" type="button" @click="termsOpen = false" aria-label="Fechar Termos">Fechar</button>
        </div>
        <div class="terms-content">
          <p>
            Ao utilizar o site e os serviços do Banho e Tosa Almeida, você declara estar de
            acordo com estes termos. Nosso objetivo é oferecer banho, tosa e táxi dog
            com segurança, respeito e profissionalismo.
          </p>

          <h3>Serviços</h3>
          <ul class="terms-list">
            <li>Banho e tosa realizados por profissionais qualificados.</li>
            <li>Cuidados adicionais (hidratação, corte de unhas) conforme avaliação.</li>
            <li>Táxi dog com transporte seguro e adequado ao porte do animal.</li>
          </ul>

          <h3>Agendamentos e Cancelamentos</h3>
          <ul class="terms-list">
            <li>Agendamentos podem ser feitos pelos canais de contato disponíveis.</li>
            <li>Cancelamentos devem ser informados com antecedência mínima de 12 horas.</li>
            <li>Ausências sem aviso podem gerar taxa para compensar o horário reservado.</li>
          </ul>

          <h3>Responsabilidades do Tutor</h3>
          <ul class="terms-list">
            <li>Informar condições de saúde, alergias e histórico comportamental do pet.</li>
            <li>Apresentar carteira de vacinação quando solicitado.</li>
            <li>Uso de coleira/guia adequada e, quando necessário, focinheira para segurança.</li>
          </ul>

          <h3>Saúde e Segurança</h3>
          <ul class="terms-list">
            <li>Podemos recusar o atendimento em casos que representem risco ao pet ou à equipe.</li>
            <li>Pets idosos ou com condições especiais terão manejo adaptado conforme avaliação.</li>
            <li>Qualquer intercorrência será comunicada imediatamente ao tutor.</li>
          </ul>

          <h3>Transporte (Táxi Dog)</h3>
          <ul class="terms-list">
            <li>O transporte é realizado em condições adequadas e com contenção segura.</li>
            <li>Áreas atendidas podem variar conforme disponibilidade e distância.</li>
            <li>Horários são combinados previamente e podem sofrer ajustes por trânsito.</li>
          </ul>

          <h3>Pagamentos e Reembolsos</h3>
          <ul class="terms-list">
            <li>Aceitamos Pix, cartão e dinheiro, conforme indicado na página de pagamento.</li>
            <li>Valores e promoções podem ser atualizados sem aviso prévio.</li>
            <li>Reembolsos são avaliados caso a caso, de acordo com o serviço prestado.</li>
          </ul>

          <h3>Privacidade e Dados</h3>
          <ul class="terms-list">
            <li>Utilizamos seus dados apenas para agendamento e atendimento.</li>
            <li>Informações de contato não são compartilhadas com terceiros sem consentimento.</li>
          </ul>

          <h3>Direitos de Imagem</h3>
          <ul class="terms-list">
            <li>Podemos solicitar autorização para uso de fotos do pet em nossos canais.</li>
            <li>O tutor pode revogar a autorização a qualquer momento pelos canais de contato.</li>
          </ul>

          <h3>Garantias e Limitações</h3>
          <ul class="terms-list">
            <li>Empregamos boas práticas e técnicas reconhecidas nos serviços prestados.</li>
            <li>Resultados estéticos podem variar conforme características individuais do pet.</li>
            <li>Não nos responsabilizamos por informações incorretas fornecidas pelo tutor.</li>
          </ul>

          <h3>Contato</h3>
          <p>
            Dúvidas ou solicitações podem ser feitas pelos canais na seção Contato.
          </p>

          <h3>Atualizações</h3>
          <p>
            Estes termos podem ser atualizados a qualquer momento. O uso contínuo dos
            serviços implica concordância com a versão vigente.
          </p>

          <p class="terms-meta">Última atualização: 12/11/2025</p>
        </div>
      </div>
    </div>

    <FooterBar />
    <LocalBusinessSchema />
  </div>
  
  
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useHead } from '#imports'
import ThreeDIcon from '~/components/ThreeDIcon.vue'
import ServicesSection from '~/components/ServicesSection.vue'
import CarTaxi3DIcon from '~/components/CarTaxi3DIcon.vue'
import Location3DIcon from '~/components/Location3DIcon.vue'
import HeaderBar from '~/components/HeaderBar.vue'
import FooterBar from '~/components/FooterBar.vue'

// HeaderBar gerencia o estado de navegação internamente
const navItems = [
  { label: 'Início', href: '#home' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Bairros', href: '/bairro' },
  { label: 'Pagamento', href: '#pagamento' },
  { label: 'Contato', href: '#contato' }
]

useHead({
  htmlAttrs: { lang: 'pt-BR' },
  title: 'Banho e Tosa Almeida em São Paulo Zona Norte - Cuidado e carinho para seu pet',
  meta: [
    { name: 'description', content: 'Banho e Tosa Almeida em São Paulo Zona Norte - Banho, tosa e taxi dog em São Paulo Zona Norte. Cuidado e carinho para seu pet.' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
  ]
})

const termsOpen = ref(false)

const scrollToContact = () => {
  const contactSection = document.querySelector('#contato')
  if (contactSection) {
    const header = document.querySelector('header')
    const headerHeight = header?.offsetHeight || 0
    const rect = contactSection.getBoundingClientRect()
    const targetPosition = rect.top + window.pageYOffset - headerHeight
    window.scrollTo({ top: targetPosition, behavior: 'smooth' })
  }
}

  onMounted(() => {
    // Smooth scroll with offset for sticky header
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        const href = anchor.getAttribute('href')
        if (!href) return
        if (href === '#termos') {
          e.preventDefault()
          termsOpen.value = true
          return
        }
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          const header = document.querySelector('header')
          const headerHeight = header?.offsetHeight || 0
          const rect = target.getBoundingClientRect()
          const targetPosition = rect.top + window.pageYOffset - headerHeight
          window.scrollTo({ top: targetPosition, behavior: 'smooth' })
        }
      })
    })

  // Fade-in animation on scroll
  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
      }
    })
  }, observerOptions)
  document.querySelectorAll('.service-card, .payment-card, .highlight-item').forEach(el => observer.observe(el))
})
</script>

<style>

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Montserrat:wght@400;500;600&display=swap');

/* Importando Google Fonts para tipografia moderna */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=Inter:wght@400;500&display=swap');

@font-face {
  font-family: 'FKGroteskNeue';
  src: url('https://r2cdn.perplexity.ai/fonts/FKGroteskNeue.woff2') format('woff2');
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; font-family: var(--font-family-base); }
body { background-color: var(--color-background); color: var(--color-text); line-height: var(--line-height-normal); overflow-x: hidden; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }


/* Header */
header { position: sticky; top: 0; background: var(--color-surface); box-shadow: var(--shadow-sm); z-index: 1000; border-bottom: 1px solid var(--color-card-border); }
.header-container { max-width: 1280px; margin: 0 auto; padding: var(--space-16) var(--space-20); display: flex; justify-content: space-between; align-items: center; }
.logo { 
  font-family: 'Poppins', sans-serif;
  font-size: clamp(18px, 3vw, 24px); /* Responsivo e maior */
  font-weight: 800; /* Extra Bold para destaque da marca */
  color: var(--pet-primary); 
  display: flex; 
  align-items: center; 
  gap: var(--space-8); 
  text-shadow: 0 1px 2px rgba(0,0,0,0.1); /* Sombra sutil para destaque */
  letter-spacing: -0.02em; /* Melhor legibilidade */
}
nav ul { display: flex; list-style: none; gap: var(--space-24); }
nav a { color: var(--color-text); text-decoration: none; font-weight: var(--font-weight-medium); transition: color var(--duration-fast) var(--ease-standard); font-size: var(--font-size-base); }
nav a:hover { color: var(--pet-primary); }
.menu-toggle { display: none; background: none; border: none; font-size: 28px; cursor: pointer; color: var(--color-text); }

/* Hero */
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
.hero button,
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

/* MÁXIMA ESPECIFICIDADE PARA FORÇAR BRANCO PURO */
section.hero .hero-content .hero-title,
section.hero .hero-content .hero-subtitle,
section#home .hero-content .hero-title,
section#home .hero-content .hero-subtitle,
.hero .hero-content h1.hero-title,
.hero .hero-content p.hero-subtitle {
  color: #FFFFFF !important;
  text-shadow: 
    2px 2px 0px rgba(0,0,0,1),
    -1px -1px 0px rgba(0,0,0,1),
    1px -1px 0px rgba(0,0,0,1),
    -1px 1px 0px rgba(0,0,0,1),
    0 0 10px rgba(0,0,0,0.9) !important;
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

.hero-cta { 
  display: flex; 
  justify-content: flex-start; 
  align-items: center; 
  margin-top: var(--space-12);
}

/* FORÇA MÁXIMA PARA TEXTO BRANCO NO HERO */
.hero *,
.hero-content *,
.hero h1,
.hero p,
.hero-title,
.hero-subtitle {
  color: #FFFFFF !important;
}

/* Regras específicas para garantir branco puro */
section.hero .hero-content h1.hero-title {
  color: #FFFFFF !important;
  font-family: 'Poppins', sans-serif !important;
  font-weight: 700 !important;
}

section.hero .hero-content p.hero-subtitle {
  color: #FFFFFF !important;
  font-family: 'Inter', sans-serif !important;
  font-weight: 400 !important;
}

/* Máxima especificidade para forçar branco */
div section.hero div.hero-content h1.hero-title,
div section.hero div.hero-content p.hero-subtitle {
  color: #FFFFFF !important;
  text-shadow: 
    2px 2px 0px rgba(0,0,0,1),
    -1px -1px 0px rgba(0,0,0,1),
    1px -1px 0px rgba(0,0,0,1),
    -1px 1px 0px rgba(0,0,0,1),
    0 0 10px rgba(0,0,0,0.9) !important;
}

/* Override de todas as variáveis CSS que possam afetar a cor */
.hero .hero-title,
.hero .hero-subtitle {
  color: #FFFFFF !important;
  --color-text: #FFFFFF !important;
  --text-primary: #FFFFFF !important;
  --color-slate-900: #FFFFFF !important;
}

.cta-button-custom { 
  font-family: 'Poppins', sans-serif;
  font-weight: 800; /* Extra Bold para destaque máximo */
  background: linear-gradient(135deg, #FF6B35, #F7931E); 
  color: #FFFFFF; /* Branco puro sem tom amarelado */
  padding: var(--space-20) var(--space-56); /* MAIS padding horizontal para ser mais "clicável" */
  border: none;
  border-radius: 50px; 
  font-size: clamp(18px, 3vw, 22px); 
  box-shadow: 
    0 6px 20px rgba(255, 107, 53, 0.4), /* Sombra principal */
    0 2px 8px rgba(0, 0, 0, 0.15), /* Sombra sutil adicional */
    0 0 0 3px rgba(255,255,255,0.1), /* Borda brilhante */
    inset 0 1px 0 rgba(255,255,255,0.25); /* Brilho interno */
  transition: all 0.3s ease; 
  cursor: pointer;
  text-transform: uppercase; 
  letter-spacing: 1.4px; 
  min-width: 260px; /* Mais largo para ser mais clicável */
  text-align: center;
  position: relative;
  overflow: hidden;
  transform: scale(1.02); /* Ligeiramente maior mas não exagerado */
  text-shadow: 0 1px 2px rgba(0,0,0,0.2); /* Sombra sutil no texto */
}

.cta-button-custom::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.cta-button-custom:hover::before {
  left: 100%;
}

.cta-button-custom:hover { 
  background: linear-gradient(135deg, #E55A2B, #E8851C); 
  transform: translateY(-3px) scale(1.04); /* Elevação mais sutil */
  box-shadow: 
    0 8px 30px rgba(255, 107, 53, 0.5), /* Sombra principal */
    0 4px 12px rgba(0, 0, 0, 0.2), /* Sombra sutil adicional */
    0 0 0 4px rgba(255,255,255,0.2), /* Borda brilhante */
    inset 0 1px 0 rgba(255,255,255,0.3); /* Brilho interno mais forte */
  letter-spacing: 1.6px; /* Mais espaçamento no hover */
  color: #FFFFFF; /* Garante branco puro no hover */
}

.cta-button-custom:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 
    0 4px 20px rgba(255, 107, 53, 0.4),
    0 2px 8px rgba(0, 0, 0, 0.15),
    0 0 0 3px rgba(255,255,255,0.15);
}

/* Section */
section { padding: 60px var(--space-20); max-width: 1280px; margin: 0 auto; }
section h2 { text-align: center; font-size: var(--font-size-4xl); margin-bottom: var(--space-32); color: var(--pet-primary); font-weight: var(--font-weight-bold); letter-spacing: var(--letter-spacing-tight); }
.about-content { max-width: 800px; margin: 0 auto; text-align: center; }
.about-content p { font-size: var(--font-size-lg); line-height: 1.8; margin-bottom: var(--space-20); color: var(--color-text); }
.highlights { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-20); margin-top: var(--space-32); }
.highlight-item { background: var(--color-bg-1); padding: var(--space-20); border-radius: var(--radius-lg); border: 1px solid var(--color-card-border); }
.highlight-item .icon { font-size: 40px; margin-bottom: var(--space-12); }
.highlight-item h3 { font-size: var(--font-size-lg); margin-bottom: var(--space-8); color: var(--color-text); }


/* Payment */
.payment-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-20); max-width: 900px; margin: 0 auto; }
.payment-card { background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); padding: var(--space-24); text-align: center; box-shadow: var(--shadow-sm); transition: all var(--duration-normal) var(--ease-standard); }
.payment-card:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); }
.payment-icon { font-size: 48px; margin-bottom: var(--space-12); }
.payment-method { font-size: var(--font-size-lg); font-weight: var(--font-weight-semibold); margin-bottom: var(--space-8); color: var(--color-text); }
  .payment-note { font-size: var(--font-size-sm); color: var(--color-text-secondary); font-style: italic; }

/* Contact */
#contato { background: var(--color-bg-2); }

/* Modern tweaks */
header { backdrop-filter: saturate(1.1) blur(6px); }
.service-icon { transition: transform var(--duration-normal) var(--ease-standard); }
.service-card:hover .service-icon { transform: translateY(-2px); }
.highlight-item, .service-card, .payment-card { opacity: 0; transform: translateY(8px); will-change: transform, opacity; }
.fade-in { opacity: 1; transform: translateY(0); transition: opacity var(--duration-normal) var(--ease-standard), transform var(--duration-normal) var(--ease-standard); }
.contact-content { max-width: 800px; margin: 0 auto; }
.contact-info { background: var(--color-surface); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); padding: var(--space-32); margin-bottom: var(--space-32); box-shadow: var(--shadow-sm); }
.contact-item { display: flex; align-items: center; gap: var(--space-16); margin-bottom: var(--space-20); font-size: var(--font-size-lg); }
.contact-item .icon { font-size: 32px; }
.contact-item a { color: var(--pet-primary); text-decoration: none; font-weight: var(--font-weight-medium); }
.contact-item a:hover { text-decoration: underline; }

/* (removido) estilos locais de Serviços Adicionais; agora controlado no ServiceCard */


/* Footer estilizado pelo componente FooterBar */

/* Desktop - mantém layout original */
@media (min-width: 769px) {
  .hero { 
    justify-content: flex-start; /* Alinhamento à esquerda no desktop */
    align-items: center; /* Centralizado verticalmente no desktop */
    min-height: 75vh; /* Altura original do desktop */
  }
  
  .hero-content { 
    max-width: 580px; 
    margin: 0 0 0 var(--space-40); /* Margem esquerda no desktop */
    padding: 30px 40px; /* Padding original do desktop */
    max-height: none; /* Remove limitação de altura no desktop */
  }
}

/* Mobile: HERO IMAGE SOBE ATÉ O HEADER */
@media (max-width: 768px) {
  /* Navegação móvel encapsulada pelo HeaderBar */
  .services-grid { grid-template-columns: 1fr; }
  .payment-grid { grid-template-columns: 1fr; }
  .highlights { grid-template-columns: 1fr; }
  
  .hero { 
    padding: 0 var(--space-16) 20px !important; /* REMOVE padding superior - foto sobe até o header */
    margin-top: -56px !important; /* MARGIN NEGATIVO para subir até o header */
    padding-top: 56px !important; /* PADDING-TOP igual à altura do header para não sobrepor conteúdo */
    text-align: left;
    min-height: 100vh; /* Altura total para mostrar mais a foto */
    justify-content: flex-end; /* Posiciona o box na parte inferior */
    align-items: flex-end;
    background-position: center top; /* Foca na parte superior da foto (cães) */
    position: relative;
    z-index: 1; /* Fica abaixo do header */
  }
  
  .hero-content { 
    margin: 0 0 40px 0; /* Margem inferior otimizada */
    padding: 16px 20px; /* BOX COMPACTO: top 16px | bottom 16px | left 20px | right 20px */
    max-width: 95%; 
    background: rgba(0,0,0,0.9);
    border-radius: 16px; /* Bordas menores para compactar */
    max-height: 45vh; /* AUMENTADO para 45% para mostrar todo o conteúdo */
    overflow: visible; /* MUDADO para visible para não cortar conteúdo */
    position: relative;
    z-index: 2; /* Fica acima da imagem de fundo */
  }
  
  .hero-title { 
    font-size: 18px !important; /* TÍTULO: 18px conforme solicitado */
    margin-bottom: 8px !important; /* ESPAÇAMENTO: 8px entre título e descrição */
    line-height: 1.3 !important; /* Line-height mais compacto */
    font-weight: 700 !important; /* Mantém peso bold */
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
    font-size: 13px !important; /* DESCRIÇÃO: 13px conforme solicitado */
    margin-bottom: 16px !important; /* AUMENTADO espaço antes do botão para melhor separação */
    line-height: 1.4 !important; /* DESCRIÇÃO: line-height 1.4 conforme solicitado */
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
  
  .hero-cta { 
    justify-content: flex-start; /* Alinhado à esquerda para consistência */
    margin-top: 0; /* Remove margem extra */
    display: flex !important; /* FORÇA exibição */
    width: 100% !important; /* Garante largura total */
    visibility: visible !important; /* FORÇA visibilidade */
  }
  
  .cta-button-custom { 
    padding: 10px 24px !important; /* BOTÃO: padding 10px 24px conforme solicitado */
    font-size: 14px !important; /* Tamanho de fonte proporcional */
    min-width: auto; /* Remove largura mínima */
    min-height: 48px !important; /* BOTÃO: altura mínima 48px para acessibilidade */
    letter-spacing: 1px;
    transform: scale(1.0);
    color: #FFFFFF !important;
    border-radius: 24px; /* Bordas proporcionais */
    display: inline-flex !important; /* FORÇA exibição do botão */
    align-items: center;
    justify-content: center;
    visibility: visible !important; /* FORÇA visibilidade */
    opacity: 1 !important; /* FORÇA opacidade */
  }
}

@media (max-width: 480px) {
  .hero { 
    padding: 0 var(--space-12) 15px !important; /* REMOVE padding superior */
    margin-top: -56px !important; /* MARGIN NEGATIVO para subir até o header */
    padding-top: 56px !important; /* PADDING-TOP igual à altura do header */
    text-align: left;
    min-height: 100vh; /* Altura total para mostrar a foto */
    justify-content: flex-end; /* Box na parte inferior */
    align-items: flex-end;
    background-position: center top; /* Foca na parte superior da foto (cães) */
    position: relative;
    z-index: 1; /* Fica abaixo do header */
  }
  
  .hero-content {
    padding: 14px 18px; /* BOX AINDA MAIS COMPACTO: padding reduzido */
    max-width: 92%; /* Mais compacto */
    margin: 0 auto 30px auto; /* Margem inferior menor */
    border-radius: 12px; /* Bordas menores */
    max-height: 40vh; /* AUMENTADO para 40% para mostrar todo o conteúdo */
    overflow: visible; /* MUDADO para visible para não cortar conteúdo */
    position: relative;
    z-index: 2; /* Fica acima da imagem de fundo */
  }
  
  section { padding: 40px var(--space-16); }
  .header-container { padding: var(--space-12) var(--space-16); }
  
  .logo {
    font-size: clamp(16px, 4vw, 20px);
    font-weight: 800;
  }
  
  .hero-title {
    font-size: 17px !important; /* Ligeiramente menor em telas pequenas */
    line-height: 1.25 !important; /* Line-height mais compacto */
    margin-bottom: 6px !important; /* ESPAÇAMENTO: ainda menor entre título e descrição */
    font-weight: 700 !important;
    color: #FFFFFF !important;
    text-align: left !important;
  }
  
  .hero-subtitle {
    font-size: 12px !important; /* DESCRIÇÃO: menor em telas pequenas */
    line-height: 1.3 !important; /* Line-height mais compacto */
    margin-bottom: 16px !important; /* AUMENTADO espaço antes do botão para garantir visibilidade */
    color: #FFFFFF !important;
    text-align: left !important;
  }
  
  .cta-button-custom { 
    padding: 8px 20px !important; /* BOTÃO: padding menor mas mantém acessibilidade */
    font-size: 13px !important; /* Fonte menor */
    min-height: 44px !important; /* Altura mínima ainda acessível */
    letter-spacing: 0.8px;
    color: #FFFFFF !important;
    border-radius: 22px; /* Bordas proporcionais */
    transform: scale(1.0);
    display: inline-flex !important; /* FORÇA exibição do botão */
    align-items: center;
    justify-content: center;
    visibility: visible !important; /* FORÇA visibilidade */
    opacity: 1 !important; /* FORÇA opacidade */
  }
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeIn 0.6s var(--ease-standard) forwards; }
</style>

<style>
.terms-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 10000; display: flex; align-items: center; justify-content: center; padding: var(--space-20); }
.terms-dialog { background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-card-border); border-radius: var(--radius-lg); box-shadow: var(--shadow-lg); max-width: 1000px; width: 100%; max-height: 85vh; overflow: auto; }
.terms-header { display: flex; align-items: center; justify-content: space-between; padding: var(--space-16) var(--space-20); border-bottom: 1px solid var(--color-card-border); }
.terms-header h2 { font-size: var(--font-size-4xl); color: var(--pet-primary); }
.terms-close { background: transparent; color: var(--color-text); border: 1px solid var(--color-card-border); border-radius: var(--radius-md); padding: 6px 10px; cursor: pointer; font-weight: var(--font-weight-medium); }
.terms-close:hover { background: var(--color-bg-3); }
.terms-content { max-width: 900px; margin: 0 auto; text-align: left; padding: var(--space-20); }
.terms-content h3 { font-size: var(--font-size-xl); margin: var(--space-16) 0 var(--space-8); color: var(--color-text); }
.terms-content p { font-size: var(--font-size-base); line-height: 1.8; color: var(--color-text); margin-bottom: var(--space-12); }
.terms-list { list-style: disc; padding-left: 1.25rem; margin-bottom: var(--space-12); }
.terms-list li { margin-bottom: var(--space-8); color: var(--color-text); font-size: var(--font-size-base); line-height: 1.7; }
.terms-meta { font-size: var(--font-size-sm); color: var(--color-text-secondary); margin-top: var(--space-24); }

/* FINAL OVERRIDE - MÁXIMA PRIORIDADE PARA TEXTO BRANCO NO HERO */
.hero .hero-content .hero-title,
.hero .hero-content .hero-subtitle,
section.hero .hero-content h1,
section.hero .hero-content p,
#home .hero-content .hero-title,
#home .hero-content .hero-subtitle {
  color: #FFFFFF !important;
  font-family: inherit !important;
}
</style>
