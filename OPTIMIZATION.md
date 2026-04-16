# 🎯 Guia de Otimização - Pets Almeida

## 📸 Otimização de Imagens

### Imagens Atuais

As imagens na pasta `public/images/` devem ser otimizadas para melhor performance.

### Ferramentas Recomendadas

1. **TinyPNG** (https://tinypng.com/)
   - Compressão com perda mínima de qualidade
   - Reduz até 70% do tamanho

2. **Squoosh** (https://squoosh.app/)
   - Ferramenta do Google
   - Conversão para WebP

3. **ImageOptim** (Mac) ou **FileOptimizer** (Windows)
   - Otimização em lote

### Processo de Otimização

```bash
# 1. Redimensionar imagens grandes
# Largura máxima recomendada: 1920px para hero, 800px para cards

# 2. Converter para WebP (melhor compressão)
# Use Squoosh ou comando:
cwebp input.jpg -q 80 -o output.webp

# 3. Manter fallback JPG para compatibilidade
```

### Implementação no Código

Para usar WebP com fallback:

```vue
<picture>
  <source srcset="/images/dog.webp" type="image/webp">
  <img src="/images/dog.jpg" alt="Pet feliz" loading="lazy">
</picture>
```

## ⚡ Performance

### Lighthouse Score Alvo

- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

### Otimizações Implementadas

✅ Lazy loading de imagens
✅ Scroll suave com CSS
✅ Animações otimizadas
✅ CSS minificado
✅ Fontes otimizadas (Google Fonts)
✅ Headers de segurança

### Melhorias Adicionais (Opcional)

1. **Adicionar Service Worker**
```bash
npm install @vite-pwa/nuxt
```

2. **Implementar Cache de Imagens**
```typescript
// nuxt.config.ts
nitro: {
  routeRules: {
    '/images/**': { 
      headers: { 
        'cache-control': 'public, max-age=31536000, immutable' 
      } 
    }
  }
}
```

3. **Preload de Fontes Críticas**
```typescript
app: {
  head: {
    link: [
      {
        rel: 'preload',
        href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap',
        as: 'style'
      }
    ]
  }
}
```

## 🔍 SEO

### Checklist SEO

✅ Meta tags configuradas
✅ Schema.org markup (LocalBusiness)
✅ Sitemap.xml
✅ Robots.txt
✅ URLs amigáveis
✅ Alt text em imagens
✅ Títulos hierárquicos (H1, H2, H3)
✅ Open Graph tags

### Melhorias SEO Locais

1. **Google My Business**
   - Cadastre o negócio
   - Adicione fotos
   - Colete avaliações

2. **Backlinks Locais**
   - Diretórios de pet shops
   - Blogs sobre pets
   - Parcerias locais

3. **Conteúdo Local**
   - Blog com dicas de cuidados
   - Artigos sobre raças
   - Guias por bairro

## 📱 Mobile

### Otimizações Mobile

✅ Design mobile-first
✅ Touch targets > 48px
✅ Texto legível (min 16px)
✅ Viewport configurado
✅ Menu hambúrguer

### Testes Mobile

Teste em:
- iPhone (Safari)
- Android (Chrome)
- Tablets
- Diferentes orientações

## 🎨 Acessibilidade

### WCAG 2.1 AA

✅ Contraste de cores adequado
✅ Navegação por teclado
✅ Alt text em imagens
✅ Labels em formulários
✅ ARIA labels em botões

### Ferramentas de Teste

- [WAVE](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- Lighthouse (Chrome DevTools)

## 🔒 Segurança

### Headers Implementados

✅ X-Frame-Options: DENY
✅ X-Content-Type-Options: nosniff
✅ Referrer-Policy: no-referrer
✅ Strict-Transport-Security
✅ Cross-Origin-Opener-Policy

### Recomendações Adicionais

1. **SSL/HTTPS**
   - Vercel fornece automaticamente
   - Force HTTPS redirect

2. **Content Security Policy**
```typescript
headers: {
  'Content-Security-Policy': "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline'"
}
```

## 📊 Analytics

### Métricas Importantes

- Taxa de conversão (cliques no WhatsApp)
- Tempo na página
- Taxa de rejeição
- Páginas mais visitadas
- Dispositivos mais usados

### Implementar Google Analytics

```bash
npm install @nuxtjs/google-analytics
```

```typescript
// nuxt.config.ts
modules: [
  ['@nuxtjs/google-analytics', {
    id: 'G-XXXXXXXXXX'
  }]
]
```

## 🧪 Testes

### Checklist de Testes

- [ ] Todos os links funcionam
- [ ] WhatsApp abre corretamente
- [ ] Mapa carrega
- [ ] Scroll suave funciona
- [ ] Menu mobile funciona
- [ ] Imagens carregam
- [ ] Formulários validam
- [ ] Responsivo em todos os tamanhos
- [ ] Performance > 90 no Lighthouse
- [ ] Sem erros no console

### Ferramentas de Teste

1. **Chrome DevTools**
   - Lighthouse
   - Network
   - Performance

2. **BrowserStack** (teste cross-browser)
3. **GTmetrix** (performance)
4. **Google PageSpeed Insights**

## 🚀 Próximos Passos

1. Otimizar todas as imagens
2. Implementar Google Analytics
3. Cadastrar no Google My Business
4. Criar blog de conteúdo
5. Implementar chat online
6. Adicionar sistema de agendamento online
7. Criar programa de fidelidade
8. Implementar avaliações de clientes
