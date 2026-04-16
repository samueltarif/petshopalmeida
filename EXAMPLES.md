# 📚 Exemplos de Uso - Pets Almeida

## 🎨 Customização de Cores

Para alterar as cores do site, edite `assets/css/theme.css`:

```css
:root {
  /* Altere estas cores */
  --pet-primary: #4A90E2;      /* Azul principal */
  --pet-secondary: #2B5F8D;    /* Azul escuro */
  --pet-success: #4CAF50;      /* Verde dos botões */
}
```

## 📝 Adicionar Novo Serviço

Edite `app/components/ServicesSection.vue`:

```typescript
const services = [
  // ... serviços existentes
  {
    title: 'Hidratação',
    description: 'Tratamento de hidratação profunda',
    icon: '💧',
    prices: [
      { size: 'Mini', value: 'R$ 40' },
      { size: 'Pequeno', value: 'R$ 50' },
      { size: 'Médio', value: 'R$ 60' },
      { size: 'Grande', value: 'R$ 80' }
    ],
    whatsappMessage: 'Olá! Gostaria de agendar uma Hidratação para meu pet.'
  }
]
```

## 🏘️ Adicionar Novo Bairro

### 1. Adicione na lista de bairros (`app/pages/bairros.vue`):

```typescript
const bairros = [
  // ... bairros existentes
  {
    nome: 'Santana',
    slug: 'santana',
    descricao: 'Atendimento completo em Santana'
  }
]
```

### 2. Adicione no mapa de bairros (`app/pages/bairro/[slug].vue`):

```typescript
const bairrosMap: Record<string, { nome: string, descricao: string }> = {
  // ... bairros existentes
  'santana': {
    nome: 'Santana',
    descricao: 'Banho, tosa e táxi dog em Santana - São Paulo'
  }
}
```

### 3. Adicione no sitemap (`server/routes/sitemap.xml.ts`):

```typescript
const pages = [
  // ... páginas existentes
  '/bairro/santana'
]
```

## 📱 Customizar Mensagem do WhatsApp

### Mensagem Padrão

Edite `utils/whatsapp.ts`:

```typescript
export const whatsappMessages = {
  agendar: 'Olá! Gostaria de agendar um serviço para meu pet.',
  informacoes: 'Olá! Gostaria de mais informações.',
  precos: 'Olá! Gostaria de saber os preços.'
}
```

### Mensagem Específica por Serviço

No componente ServiceCard:

```typescript
const handleSchedule = () => {
  const phone = '5511993602794'
  const message = `Olá! Gostaria de agendar ${props.title} para meu ${petType}.`
  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank')
}
```

## 🖼️ Adicionar Nova Imagem

### 1. Adicione a imagem em `public/images/`

### 2. Use no componente:

```vue
<img 
  src="/images/nova-imagem.jpg" 
  alt="Descrição da imagem" 
  loading="lazy"
  class="rounded-xl"
/>
```

### 3. Com WebP e fallback:

```vue
<picture>
  <source srcset="/images/nova-imagem.webp" type="image/webp">
  <img src="/images/nova-imagem.jpg" alt="Descrição" loading="lazy">
</picture>
```

## 🎯 Adicionar Nova Seção na Homepage

### 1. Crie o componente (`app/components/TestimonialsSection.vue`):

```vue
<template>
  <section id="depoimentos" class="py-20 bg-white">
    <div class="container mx-auto px-4">
      <h2 class="text-center mb-12 text-[var(--pet-primary)]">
        Depoimentos
      </h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Seus depoimentos aqui -->
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Lógica do componente
</script>
```

### 2. Adicione na homepage (`app/pages/index.vue`):

```vue
<template>
  <div>
    <HeaderBar />
    <HeroSection />
    <AboutSection />
    <ServicesSection />
    <TestimonialsSection />  <!-- Nova seção -->
    <PaymentsSection />
    <ContactSection />
    <FooterBar />
  </div>
</template>
```

### 3. Adicione no menu (`app/components/HeaderBar.vue`):

```vue
<a @click.prevent="scrollTo('depoimentos')" href="#depoimentos">
  Depoimentos
</a>
```

## 🔧 Alterar Informações de Contato

### Telefone/WhatsApp

Busque e substitua em todos os arquivos:
- `5511993602794` → seu novo número

### Instagram

Busque e substitua:
- `@_pets_almeida` → seu novo @
- `https://instagram.com/_pets_almeida` → seu novo link

### Endereço

Edite `app/components/ContactSection.vue`:

```vue
<div>
  <div class="text-sm text-[var(--color-text-light)]">Endereço</div>
  <div class="text-lg font-semibold">Seu Novo Endereço</div>
  <div class="text-sm text-[var(--color-text-light)]">Bairro, Cidade - Estado</div>
  <div class="text-sm text-[var(--color-text-light)]">CEP: 00000-000</div>
</div>
```

E atualize o Google Maps:

```vue
<iframe
  src="https://www.google.com/maps?output=embed&f=d&daddr=Seu+Novo+Endereço"
  ...
></iframe>
```

## 🎨 Adicionar Animação Customizada

### 1. Defina a animação em `assets/css/theme.css`:

```css
@keyframes bounce-in {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.bounce-in {
  animation: bounce-in 0.6s ease-out;
}
```

### 2. Use no componente:

```vue
<div class="bounce-in">
  Conteúdo animado
</div>
```

## 📊 Adicionar Google Analytics

### 1. Instale o módulo:

```bash
npm install @nuxtjs/google-analytics
```

### 2. Configure em `nuxt.config.ts`:

```typescript
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    ['@nuxtjs/google-analytics', {
      id: 'G-XXXXXXXXXX'  // Seu ID do GA
    }]
  ]
})
```

## 🔔 Adicionar Notificação de Cookie

### 1. Crie o componente (`app/components/CookieNotice.vue`):

```vue
<template>
  <div v-if="showNotice" class="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50">
    <div class="container mx-auto flex items-center justify-between">
      <p>Este site usa cookies para melhorar sua experiência.</p>
      <button @click="acceptCookies" class="bg-[var(--pet-success)] px-6 py-2 rounded">
        Aceitar
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showNotice = ref(false)

onMounted(() => {
  const accepted = localStorage.getItem('cookies-accepted')
  if (!accepted) {
    showNotice.value = true
  }
})

const acceptCookies = () => {
  localStorage.setItem('cookies-accepted', 'true')
  showNotice.value = false
}
</script>
```

### 2. Adicione no app.vue:

```vue
<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
    <CookieNotice />
  </div>
</template>
```

## 🎯 Adicionar Botão de Scroll to Top

### 1. Crie o componente (`app/components/ScrollToTop.vue`):

```vue
<template>
  <button
    v-if="showButton"
    @click="scrollToTop"
    class="fixed bottom-8 right-8 bg-[var(--pet-primary)] text-white p-4 rounded-full shadow-lg hover:bg-[var(--pet-secondary)] transition-all z-40"
    aria-label="Voltar ao topo"
  >
    ↑
  </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const showButton = ref(false)

const handleScroll = () => {
  showButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
```

### 2. Adicione na homepage:

```vue
<template>
  <div>
    <HeaderBar />
    <!-- ... outras seções ... -->
    <FooterBar />
    <ScrollToTop />
  </div>
</template>
```

## 📝 Adicionar Blog

### 1. Crie a estrutura:

```
app/
  pages/
    blog/
      index.vue          # Lista de posts
      [slug].vue         # Post individual
  content/
    blog/
      post-1.md
      post-2.md
```

### 2. Instale o módulo de conteúdo:

```bash
npm install @nuxt/content
```

### 3. Configure em `nuxt.config.ts`:

```typescript
modules: [
  '@nuxtjs/tailwindcss',
  '@nuxt/content'
]
```

---

**Dica**: Sempre teste localmente com `npm run dev` antes de fazer deploy!
