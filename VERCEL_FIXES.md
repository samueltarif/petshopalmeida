# Correções para Deploy no Vercel

## Problemas Identificados e Soluções

### 1. Imagem de Fundo da Seção Hero
**Problema**: A imagem `foto_capa.png` não aparecia no Vercel
**Solução**: 
- Adicionado configuração específica no `nuxt.config.ts` para garantir que assets sejam copiados
- Criado arquivo `vercel-fixes.css` com fallbacks CSS
- Configurado headers de cache no `vercel.json`

### 2. Ícones 3D Desconfigurados
**Problema**: Ícones das seções de pagamento e contato não apareciam
**Solução**:
- Criado componente `IconFallback.vue` com emojis como fallback
- Adicionado CSS para garantir visibilidade dos ícones
- Implementado fallbacks automáticos via CSS `::before`

### 3. Configurações de Build
**Problema**: Build não otimizado para Vercel
**Solução**:
- Atualizado `nuxt.config.ts` com configurações específicas do Vercel
- Adicionado script `build:vercel` no `package.json`
- Configurado `vercel.json` com headers e cache otimizados

## Arquivos Modificados

1. **nuxt.config.ts**
   - Adicionado configurações Vite para assets
   - Configurado hooks para copiar imagens
   - Incluído arquivo de correções CSS

2. **vercel.json**
   - Comando de build otimizado
   - Headers de cache para imagens
   - Configurações de segurança

3. **package.json**
   - Script `build:vercel` adicionado
   - Script `clean` para limpeza

4. **Novos Arquivos**
   - `app/assets/css/vercel-fixes.css` - Correções CSS específicas
   - `app/components/IconFallback.vue` - Componente de fallback
   - `VERCEL_FIXES.md` - Esta documentação

## Como Fazer o Deploy

1. Commit todas as alterações:
```bash
git add .
git commit -m "fix: correções para deploy no Vercel"
git push origin main
```

2. No Vercel, configure:
   - Build Command: `npm run build:vercel`
   - Output Directory: `.output/public`
   - Install Command: `npm install`

3. Redeploy o projeto no Vercel

## Verificações Pós-Deploy

- [ ] Imagem de fundo da seção hero aparece
- [ ] Ícones de pagamento (cartão, pix, dinheiro) aparecem
- [ ] Ícones de contato (WhatsApp, Instagram) aparecem
- [ ] Site responsivo funciona em mobile
- [ ] Performance mantida

## Fallbacks Implementados

### CSS Fallbacks
- Imagem de fundo: gradiente azul se a imagem não carregar
- Ícones de pagamento: emojis (💳, 💰, 💵)
- Ícones de contato: emojis (💬, 📷)

### Componente Fallbacks
- `IconFallback.vue` para ícones que não carregarem
- Detecção automática de ícones não carregados
- Substituição por emojis coloridos

## Monitoramento

Após o deploy, monitore:
1. Console do navegador para erros
2. Network tab para assets não carregados
3. Performance com Lighthouse
4. Funcionalidade em diferentes dispositivos