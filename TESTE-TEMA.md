# 🎨 Guia de Teste - Temas Claro/Escuro

## ✅ Erro Corrigido
O erro do Vite sobre `<script>` tags foi corrigido - as funções de debug agora estão integradas no JavaScript.

## Como Testar no Computador

### 1. Limpar Cache Completo
1. Abra http://localhost:3001/
2. Pressione `Ctrl+Shift+R` (Windows) ou `Cmd+Shift+R` (Mac)
3. Ou: F12 → botão direito no refresh → "Esvaziar cache e recarregar forçadamente"

### 2. Usar Funções de Debug (Console)
1. Abra o Console (F12 → Console)
2. Digite um dos comandos:
   ```javascript
   clearThemeCache()  // Limpa tudo e recarrega
   forceLight()       // Força tema claro
   forceDark()        // Força tema escuro
   ```

### 3. Teste Manual
1. Clique no botão de tema (sol/lua) no header
2. Verifique se o fundo muda de claro para escuro
3. Recarregue a página - o tema deve persistir

### 4. Verificar no DevTools
1. Abra Elements (F12 → Elements)
2. Procure por `<html class="theme-light">` ou `<html class="theme-black">`
3. As classes devem mudar quando você clica no botão

## ✅ Soluções Aplicadas

- **Especificidade CSS**: `!important` para sobrescrever preferências do sistema
- **Color-scheme**: Forçado `light`/`dark` no navegador
- **Inicialização robusta**: Dupla inicialização com delays
- **Cache busting**: Meta tags para evitar cache
- **Debug integrado**: Funções no console para teste
- **Transições suaves**: Animações para mudança de tema
- **Erro Vite corrigido**: Script integrado no JavaScript

## Se Ainda Não Funcionar

1. **Modo incógnito** - elimina extensões e cache
2. **Outro navegador** - Chrome, Firefox, Edge
3. **Desabilitar extensões** - Dark Reader pode interferir
4. **Limpar localStorage**: `localStorage.clear()` no console

## URL de Teste
http://localhost:3001/

---
*Agora deve funcionar perfeitamente no computador!*