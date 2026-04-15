---
inclusion: always
---

# Padrões do Projeto - Pets Almeida

## Stack Tecnológica
- **Framework**: Nuxt 4 (Vue 3)
- **Styling**: Tailwind CSS
- **Deploy**: Vercel
- **TypeScript**: Habilitado para type safety

## Estrutura de Arquivos
- Componentes Vue em `app/components/`
- Páginas em `app/pages/`
- Assets CSS em `app/assets/css/` e `assets/css/`
- Imagens públicas em `public/images/`
- Testes de segurança em `security-tests/`

## Convenções de Código

### Vue/Nuxt
- Use Composition API com `<script setup>`
- Componentes devem ser PascalCase (ex: `ServiceCard.vue`)
- Props devem ter tipos definidos com TypeScript
- Emits devem ser declarados explicitamente
- Use `definePageMeta` para configuração de páginas

### CSS/Tailwind
- Prefira classes Tailwind sobre CSS customizado
- CSS customizado em `app/assets/css/theme.css`
- Use variáveis CSS para temas quando necessário
- Mantenha responsividade mobile-first

### TypeScript
- Sempre defina tipos para props, emits e funções
- Evite `any`, use tipos específicos
- Use interfaces para objetos complexos

## Segurança
- Headers de segurança configurados no `nuxt.config.ts`
- CSP (Content Security Policy) ativo em produção
- Testes de segurança disponíveis via `npm run security-test`
- Sempre validar inputs do usuário
- Sanitizar dados antes de renderizar

## Performance
- Imagens otimizadas e com lazy loading
- Preload de recursos críticos configurado
- Fonts do Google carregadas com preconnect
- PurgeCSS configurado para remover CSS não utilizado

## Comandos Úteis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run generate` - Gerar site estático
- `npm run lint` - Verificar código
- `npm run typecheck` - Verificar tipos TypeScript
- `npm run security-test` - Executar testes de segurança
