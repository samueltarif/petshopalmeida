---
inclusion: manual
---

# Guia de Deploy - Vercel

## Configuração

O projeto está configurado para deploy na Vercel com:
- Preset Nitro: `vercel`
- Headers de segurança automáticos
- CSP ativo em produção
- Analytics da Vercel integrado

## Antes do Deploy

### Checklist Pré-Deploy
1. Execute todos os testes:
   ```bash
   npm run test
   npm run security-test
   npm run typecheck
   npm run lint
   ```

2. Verifique o build local:
   ```bash
   npm run build
   npm run preview
   ```

3. Teste em diferentes navegadores e dispositivos

4. Verifique imagens otimizadas

5. Confirme que não há credenciais hardcoded

### Variáveis de Ambiente

Se necessário, configure na Vercel:
- Vá em Project Settings > Environment Variables
- Adicione variáveis necessárias
- Separe por ambiente (Production, Preview, Development)

## Deploy

### Deploy Automático (Recomendado)
- Push para branch principal
- Vercel detecta e faz deploy automaticamente
- Preview deploys para PRs

### Deploy Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy para produção
vercel --prod
```

## Pós-Deploy

### Verificações
1. Acesse o site em produção
2. Teste funcionalidades principais
3. Verifique headers de segurança:
   ```bash
   curl -I https://seu-dominio.vercel.app
   ```

4. Teste performance com Lighthouse

5. Verifique Analytics da Vercel

### Monitoramento
- Monitore erros no dashboard da Vercel
- Verifique logs de função
- Acompanhe métricas de performance
- Configure alertas se necessário

## Troubleshooting

### Build Falha
- Verifique logs de build na Vercel
- Teste build local: `npm run build`
- Verifique dependências: `npm install`
- Confirme versão do Node (veja `.node-version`)

### Erros em Produção
- Verifique logs na Vercel
- Compare com ambiente local
- Verifique variáveis de ambiente
- Teste com `npm run preview` localmente

### Performance Issues
- Otimize imagens
- Verifique bundle size
- Use lazy loading
- Configure cache headers

### CSP Bloqueando Recursos
- Revise política CSP no `nuxt.config.ts`
- Adicione domínios necessários
- Teste localmente com CSP ativo

## Domínio Customizado

Para configurar domínio próprio:
1. Vá em Project Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções
4. Aguarde propagação (pode levar até 48h)
5. SSL é configurado automaticamente
