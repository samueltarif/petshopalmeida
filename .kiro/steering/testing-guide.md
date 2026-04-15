---
inclusion: manual
---

# Guia de Testes

## Comandos de Teste Disponíveis

```bash
# Todos os testes
npm run test

# Verificação rápida do sistema
npm run test:quick

# Testes de saúde do sistema
npm run test:health

# Testes funcionais
npm run test:functional

# Testes de performance
npm run test:performance

# Testes de segurança
npm run security-test

# Verificação de tipos TypeScript
npm run typecheck

# Linting
npm run lint
```

## Estrutura de Testes

### Testes Funcionais
Localizados em `tests/`:
- `system-health-check.js` - Verifica saúde geral
- `functional-tests.js` - Testa funcionalidades
- `performance-tests.js` - Mede performance
- `quick-check.js` - Verificação rápida

### Testes de Segurança
Localizados em `security-tests/tests/`:
- `test_xss.js` - Cross-Site Scripting
- `test_sql_injection.js` - SQL Injection
- `test_csrf.js` - CSRF
- `test_bruteforce.js` - Ataques de força bruta
- `test_ddos.js` - DDoS
- `test_api_security.js` - Segurança de API
- `test_info_leakage.js` - Vazamento de informações
- `test_param_tampering.js` - Manipulação de parâmetros
- `test_deserialization.js` - Desserialização insegura
- `test_phishing.js` - Phishing

## Quando Executar Testes

### Durante Desenvolvimento
- Execute `npm run test:quick` frequentemente
- Execute `npm run typecheck` antes de commits
- Execute `npm run lint` para manter código limpo

### Antes de Commits
- Execute `npm run typecheck`
- Execute `npm run lint`
- Corrija todos os erros encontrados

### Antes de Deploy
- Execute `npm run test` (todos os testes)
- Execute `npm run security-test`
- Verifique que todos passam
- Execute `npm run build` para garantir build sem erros

### Após Mudanças de Segurança
- Execute `npm run security-test`
- Revise relatórios em `security-tests/reports/`
- Corrija vulnerabilidades encontradas

## Interpretando Resultados

### Testes de Segurança
Relatórios salvos em `security-tests/reports/`:
- `security_audit_summary.md` - Resumo geral
- `*.json` - Resultados detalhados por teste

### TypeScript
- Erros de tipo devem ser corrigidos antes de commit
- Use tipos específicos, evite `any`

### Linting
- Siga as regras do ESLint configuradas
- Corrija warnings quando possível
- Não desabilite regras sem justificativa
