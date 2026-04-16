# 🚀 Guia de Deploy - Pets Almeida

## Deploy na Vercel

### 1. Preparação

Certifique-se de que o projeto está funcionando localmente:

```bash
npm install
npm run dev
```

Acesse http://localhost:3000 e verifique se tudo está funcionando.

### 2. Conectar ao GitHub

1. Crie um repositório no GitHub
2. Faça push do código:

```bash
git init
git add .
git commit -m "Initial commit - Pets Almeida website"
git branch -M main
git remote add origin https://github.com/seu-usuario/pets-almeida.git
git push -u origin main
```

### 3. Deploy na Vercel

#### Opção A: Via Dashboard

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Add New Project"
3. Importe seu repositório do GitHub
4. Configure:
   - **Framework Preset**: Nuxt.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.output`
   - **Install Command**: `npm install`
5. Clique em "Deploy"

#### Opção B: Via CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### 4. Configurar Domínio Customizado

1. No dashboard da Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio: `www.petsalmeida.com.br`
3. Configure os DNS conforme instruções da Vercel

### 5. Variáveis de Ambiente (Opcional)

Se necessário, adicione variáveis de ambiente no dashboard:

```env
NUXT_PUBLIC_SITE_URL=https://www.petsalmeida.com.br
```

## ✅ Checklist Pré-Deploy

- [ ] Todas as imagens estão otimizadas
- [ ] Links do WhatsApp estão corretos
- [ ] Endereço e informações de contato estão corretos
- [ ] Meta tags e SEO configurados
- [ ] Testado em diferentes navegadores
- [ ] Testado em dispositivos móveis
- [ ] Sitemap.xml acessível
- [ ] Robots.txt configurado

## 🔍 Testes Pós-Deploy

Após o deploy, verifique:

1. **Performance**: Teste no [PageSpeed Insights](https://pagespeed.web.dev/)
2. **SEO**: Verifique no [Google Search Console](https://search.google.com/search-console)
3. **Links**: Teste todos os botões de WhatsApp
4. **Responsividade**: Teste em diferentes dispositivos
5. **Mapa**: Verifique se o Google Maps está carregando
6. **Sitemap**: Acesse `/sitemap.xml`

## 📊 Monitoramento

### Google Analytics (Opcional)

Adicione o Google Analytics no `nuxt.config.ts`:

```typescript
app: {
  head: {
    script: [
      {
        src: 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX',
        async: true
      }
    ]
  }
}
```

### Google Search Console

1. Acesse [Google Search Console](https://search.google.com/search-console)
2. Adicione sua propriedade
3. Envie o sitemap: `https://www.petsalmeida.com.br/sitemap.xml`

## 🔄 Atualizações

Para atualizar o site:

```bash
# Faça suas alterações
git add .
git commit -m "Descrição das alterações"
git push

# A Vercel fará deploy automático
```

## 🆘 Troubleshooting

### Build falhou

- Verifique os logs no dashboard da Vercel
- Certifique-se de que `npm run build` funciona localmente

### Imagens não carregam

- Verifique se as imagens estão na pasta `public/`
- Caminhos devem começar com `/` (ex: `/images/dog.jpg`)

### Rotas 404

- Verifique se os arquivos estão em `app/pages/`
- Limpe o cache da Vercel e faça redeploy

## 📞 Suporte

Para problemas com o deploy, consulte:
- [Documentação Nuxt](https://nuxt.com/docs)
- [Documentação Vercel](https://vercel.com/docs)
- [Suporte Vercel](https://vercel.com/support)
