---
inclusion: manual
---

# Diretrizes de Segurança

## Headers de Segurança Configurados

O projeto já possui headers de segurança configurados no `nuxt.config.ts`:

- `X-Frame-Options: DENY` - Previne clickjacking
- `X-Content-Type-Options: nosniff` - Previne MIME sniffing
- `Referrer-Policy: no-referrer` - Protege privacidade
- `Permissions-Policy` - Restringe APIs do navegador
- `Strict-Transport-Security` - Força HTTPS
- `Cross-Origin-Opener-Policy: same-origin` - Isolamento de contexto
- `Content-Security-Policy` - Controla recursos carregados (produção)

## Práticas de Segurança

### Validação de Input
```typescript
// Sempre validar e sanitizar inputs
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

// Validar formato de dados
const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
```

### XSS Prevention
- Use `{{ }}` para interpolação (auto-escape)
- Evite `v-html` com dados não confiáveis
- Sanitize dados antes de renderizar HTML
- Use CSP para bloquear scripts inline maliciosos

### CSRF Protection
- Use tokens CSRF para formulários
- Valide origem das requisições
- Implemente SameSite cookies

### SQL Injection (se aplicável)
- Use prepared statements
- Nunca concatene SQL com input do usuário
- Valide e sanitize todos os inputs

### Dados Sensíveis
- Nunca exponha API keys no frontend
- Use variáveis de ambiente para secrets
- Não commite credenciais no Git
- Use `.env.local` para desenvolvimento

## Testes de Segurança

Execute regularmente:
```bash
npm run security-test
```

Testes disponíveis:
- XSS (Cross-Site Scripting)
- SQL Injection
- CSRF (Cross-Site Request Forgery)
- Brute Force
- DDoS
- API Security
- Information Leakage
- Parameter Tampering
- Deserialization
- Phishing

## Checklist de Segurança

Antes de fazer deploy:
- [ ] Headers de segurança configurados
- [ ] CSP ativo em produção
- [ ] Inputs validados e sanitizados
- [ ] Sem credenciais hardcoded
- [ ] HTTPS forçado
- [ ] Testes de segurança passando
- [ ] Dependências atualizadas (sem vulnerabilidades)
- [ ] Rate limiting implementado (se necessário)
- [ ] Logs não expõem dados sensíveis
