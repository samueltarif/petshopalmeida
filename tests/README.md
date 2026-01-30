# 🧪 Suite de Testes - Banho e Tosa Almeida

Esta pasta contém uma suite completa de testes para verificar se o sistema está funcionando corretamente.

## 📋 Tipos de Teste

### 1. 🔍 Verificação Rápida (`quick-check.js`)
**Comando:** `npm run test:quick`

Verificação rápida dos aspectos mais críticos:
- ✅ Arquivos essenciais existem
- ✅ Dependências instaladas
- ✅ Sintaxe básica válida
- ✅ Configuração Nuxt

**Use quando:** Quiser uma verificação rápida antes de começar a trabalhar.

### 2. 🏥 Testes de Saúde do Sistema (`system-health-check.js`)
**Comando:** `npm run test:health`

Verifica a integridade técnica do sistema:
- 📁 Estrutura de arquivos
- 📦 Dependências do package.json
- ⚙️ Configuração do Nuxt
- 🎨 Sintaxe dos componentes Vue
- 📚 Instalação de node_modules
- 🔧 Scripts disponíveis
- 🖼️ Assets e imagens
- 📝 TypeScript

### 3. ⚙️ Testes Funcionais (`functional-tests.js`)
**Comando:** `npm run test:functional`

Verifica funcionalidades específicas do negócio:
- 🧭 Estrutura de navegação
- 🐕 Componentes de serviços
- 📞 Informações de contato
- 🏘️ Páginas de bairros
- 🖼️ Imagens e assets
- 🔍 SEO e meta tags
- 📱 Responsividade
- ⚡ Funcionalidades JavaScript

### 4. ⚡ Testes de Performance (`performance-tests.js`)
**Comando:** `npm run test:performance`

Verifica otimizações e performance:
- 🖼️ Otimização de imagens
- 🎨 Otimização de CSS
- 🔄 Lazy loading
- 💾 Configurações de cache
- 📦 Tamanho do bundle
- 📊 Web Vitals
- ⚡ Otimizações JavaScript
- 🔒 Configurações de segurança

### 5. 🎯 Suite Completa (`run-all-tests.js`)
**Comando:** `npm run test`

Executa todos os testes em sequência e gera um relatório consolidado.

## 🚀 Como Usar

### Verificação Rápida (Recomendado para início)
```bash
npm run test:quick
```

### Teste Completo
```bash
npm run test
```

### Testes Específicos
```bash
npm run test:health      # Apenas saúde do sistema
npm run test:functional  # Apenas funcionalidades
npm run test:performance # Apenas performance
```

### Testes de Segurança
```bash
npm run security-test    # Executa testes de segurança
```

## 📊 Interpretando os Resultados

### ✅ Verde (Sucesso)
- Tudo funcionando corretamente
- Nenhuma ação necessária

### ⚠️ Amarelo (Aviso)
- Funciona, mas pode ser melhorado
- Otimizações recomendadas

### ❌ Vermelho (Erro)
- Problema que precisa ser corrigido
- Sistema pode não funcionar corretamente

## 🔧 Soluções Comuns

### "node_modules não encontrado"
```bash
npm install
```

### "Arquivo não encontrado"
- Verifique se está no diretório correto (`nuxt-app`)
- Verifique se o arquivo existe no local esperado

### "Nuxt CLI não funcionando"
```bash
npm install -g nuxt
# ou
npx nuxt --version
```

### "Erro de sintaxe"
- Verifique os arquivos Vue mencionados no erro
- Use um editor com syntax highlighting

## 📈 Score de Performance

- **90-100%**: 🚀 Excelente
- **70-89%**: 👍 Boa
- **50-69%**: ⚠️ Média
- **0-49%**: ❌ Ruim

## 🎯 Próximos Passos Após os Testes

1. **Se todos os testes passaram:**
   ```bash
   npm run dev          # Testar localmente
   npm run build        # Build de produção
   npm run preview      # Testar build
   ```

2. **Se há problemas:**
   - Corrigir os erros listados
   - Executar `npm run test:quick` novamente
   - Repetir até todos os testes passarem

3. **Para deploy:**
   - Todos os testes devem passar
   - Score de performance > 70%
   - Testes de segurança executados

## 🆘 Suporte

Se encontrar problemas:

1. Execute `npm run test:quick` primeiro
2. Leia as mensagens de erro cuidadosamente
3. Verifique se está no diretório correto
4. Certifique-se que `npm install` foi executado
5. Verifique se o Node.js está instalado (`node --version`)

## 📝 Adicionando Novos Testes

Para adicionar novos testes:

1. Crie um novo arquivo `.js` na pasta `tests/`
2. Siga o padrão dos testes existentes
3. Adicione o script no `package.json`
4. Documente no README

## 🔄 Automação

Estes testes podem ser integrados em:
- CI/CD pipelines
- Git hooks (pre-commit)
- Monitoramento contínuo
- Deploy automático

---

**💡 Dica:** Execute `npm run test:quick` regularmente durante o desenvolvimento para detectar problemas cedo!