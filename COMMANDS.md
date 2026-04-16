# 📝 Comandos Úteis - Pets Almeida

## 🚀 Desenvolvimento

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
# Acesse: http://localhost:3000

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Gerar site estático
npm run generate
```

## 🧹 Limpeza

```bash
# Limpar cache do Nuxt
rm -rf .nuxt

# Limpar node_modules e reinstalar
rm -rf node_modules
npm install

# Limpar tudo e recomeçar
rm -rf .nuxt .output node_modules
npm install
```

## 🔍 Verificações

```bash
# Verificar versões
node --version
npm --version

# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências
npm update
```

## 📦 Git

```bash
# Inicializar repositório
git init

# Adicionar todos os arquivos
git add .

# Commit
git commit -m "Mensagem do commit"

# Adicionar remote
git remote add origin https://github.com/seu-usuario/pets-almeida.git

# Push
git push -u origin main

# Ver status
git status

# Ver histórico
git log --oneline
```

## 🌐 Vercel CLI

```bash
# Instalar Vercel CLI globalmente
npm i -g vercel

# Login na Vercel
vercel login

# Deploy de desenvolvimento
vercel

# Deploy de produção
vercel --prod

# Ver logs
vercel logs

# Ver lista de deploys
vercel ls

# Remover projeto
vercel remove
```

## 🎨 Tailwind

```bash
# Adicionar Tailwind (já instalado)
npx nuxt@latest module add tailwindcss

# Gerar arquivo de configuração
npx tailwindcss init
```

## 🖼️ Otimização de Imagens

```bash
# Instalar Sharp (otimização de imagens)
npm install sharp

# Converter imagem para WebP (requer cwebp instalado)
cwebp -q 80 input.jpg -o output.webp

# Redimensionar imagem (usando ImageMagick)
convert input.jpg -resize 1920x output.jpg
```

## 🧪 Testes

```bash
# Instalar Vitest (opcional)
npm install -D vitest @vue/test-utils

# Rodar testes
npm run test

# Testes com coverage
npm run test:coverage
```

## 📊 Performance

```bash
# Analisar bundle size
npm run build
npx vite-bundle-visualizer

# Lighthouse CI (requer instalação)
npm install -g @lhci/cli
lhci autorun
```

## 🔧 Troubleshooting

```bash
# Erro de porta em uso
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Erro de permissões
npm cache clean --force
rm -rf node_modules package-lock.json
npm install

# Erro de TypeScript
npm run postinstall
```

## 📱 Testes Mobile

```bash
# Expor servidor local na rede
npm run dev -- --host

# Acesse pelo IP local no celular
# Ex: http://192.168.1.100:3000
```

## 🔐 Variáveis de Ambiente

```bash
# Criar arquivo .env
echo "NUXT_PUBLIC_SITE_URL=https://www.petsalmeida.com.br" > .env

# Usar variável no código
# const siteUrl = useRuntimeConfig().public.siteUrl
```

## 📝 Logs

```bash
# Ver logs do Nuxt
npm run dev -- --debug

# Ver logs da Vercel
vercel logs [deployment-url]
```

## 🎯 Atalhos Úteis

```bash
# Abrir no navegador
npm run dev
# Ctrl + Click no link do terminal

# Parar servidor
# Ctrl + C

# Limpar terminal
# Windows: cls
# Mac/Linux: clear
```

## 🚀 Deploy Rápido

```bash
# Sequência completa de deploy
git add .
git commit -m "Update: descrição"
git push
# Vercel faz deploy automático!
```

## 📚 Documentação

- [Nuxt 3 Docs](https://nuxt.com/docs)
- [Vue 3 Docs](https://vuejs.org/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Docs](https://vercel.com/docs)
