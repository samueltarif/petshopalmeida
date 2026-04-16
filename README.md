# Pets Almeida - Site Institucional

Site institucional moderno para serviços de banho, tosa e transporte de pets na Zona Norte de São Paulo.

## 🚀 Stack Tecnológica

- **Framework**: Nuxt 4
- **UI**: Vue 3 (Composition API com `<script setup>`)
- **Styling**: Tailwind CSS v6
- **Language**: TypeScript
- **Deploy**: Vercel

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 🎨 Estrutura do Projeto

```
project/
├── app/
│   ├── components/          # Componentes Vue
│   │   ├── HeaderBar.vue
│   │   ├── HeroSection.vue
│   │   ├── AboutSection.vue
│   │   ├── ServicesSection.vue
│   │   ├── ServiceCard.vue
│   │   ├── PaymentsSection.vue
│   │   ├── ContactSection.vue
│   │   └── FooterBar.vue
│   ├── pages/               # Páginas (file-based routing)
│   │   ├── index.vue        # Homepage
│   │   ├── bairros.vue      # Lista de bairros
│   │   └── bairro/
│   │       └── [slug].vue   # Páginas dinâmicas por bairro
│   └── app.vue              # App principal
├── assets/css/              # CSS customizado
│   ├── theme.css            # Variáveis CSS e estilos globais
│   └── tailwind.css         # Tailwind imports
├── composables/             # Composables Vue
│   ├── useScroll.ts
│   └── useScrollAnimation.ts
├── utils/                   # Utilitários
│   └── whatsapp.ts
├── server/
│   └── routes/
│       └── sitemap.xml.ts   # Sitemap dinâmico
├── public/                  # Arquivos estáticos
│   ├── images/
│   └── robots.txt
└── nuxt.config.ts           # Configuração do Nuxt
```

## 🎯 Funcionalidades

- ✅ Design responsivo (mobile-first)
- ✅ Integração com WhatsApp
- ✅ Google Maps integrado
- ✅ Scroll suave entre seções
- ✅ Animações ao scroll
- ✅ SEO otimizado
- ✅ Schema.org markup
- ✅ Sitemap dinâmico
- ✅ Páginas por bairro
- ✅ Performance otimizada

## 📱 Contato

- **WhatsApp**: (11) 99360-2794
- **Instagram**: @_pets_almeida
- **Endereço**: Av. Inajar de Souza, 3823 - Cachoeirinha, São Paulo - SP

## 🌐 Deploy na Vercel

1. Conecte seu repositório no Vercel
2. Configure:
   - Framework: Nuxt.js
   - Build Command: `npm run build`
   - Output Directory: `.output`
3. Deploy!

## 📄 Licença

© 2026 Pets Almeida. Todos os direitos reservados.
