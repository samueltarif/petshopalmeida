## Estado Atual
- Deploy alvo: Vercel (preset Nitro ativo) em `nuxt-app/nuxt.config.ts:10-12`.
- Headers de segurança já presentes: `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` em `nuxt-app/nuxt.config.ts:12-21`.
- Bloqueio de arquivos ocultos: middleware `block-dotfiles` em `nuxt-app/server/middleware/block-dotfiles.ts:3-10`.
- Variáveis `.env` ignoradas no subprojeto: `nuxt-app/.gitignore:21-24`.
- Consentimento antes de analytics: `@vercel/analytics` com banner de consentimento em `nuxt-app/app/app.vue:5,21-34`.
- Sem API própria detectada: nenhum arquivo em `nuxt-app/server/api/**`.
- Sem upload de arquivos: nenhum uso de `input type="file"`/`FormData` detectado.
- Sem `v-html` e sem HTML não-sanitizado: busca sem ocorrências.
- Dependências atualizadas recentemente; auditoria local previa 0 vulnerabilidades, mas propomos auditoria contínua.

## Riscos por Item
1. Deploy mal configurado
- Vercel atende reverse proxy + HTTPS, mas falta HSTS e CSP. 
2. Variáveis de ambiente vazando
- `.env` ignorado em `nuxt-app`, mas não há `.gitignore` na raiz — risco baixo, porém convém padronizar.
3. API sem proteção
- Não há API; se for adicionada, requer autenticação, rate-limit e CORS restrito.
4. Upload de arquivos
- Não há upload; se for adicionado, aplicar whitelist de MIME, limite de tamanho e armazenamento externo.
5. XSS
- Sem `v-html`; conteúdo é interpolado (escapado). CSP ainda ausente.
6. Dependências vulneráveis
- Necessário automatizar auditoria e updates.
7. Hospedagem mal protegida
- Vercel oferece WAF/DDoS básico; reforçar com headers e, se necessário, Cloudflare.
8. DNS vulnerável
- Recomendado habilitar DNSSEC e 2FA no registrador.

## Plano de Hardening
### Headers e Políticas
1. Adicionar `Content-Security-Policy` via `routeRules` para:
   - `default-src 'self'`;
   - `img-src 'self' data: https:`;
   - `font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai`;
   - `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`;
   - `script-src 'self' 'wasm-unsafe-eval' 'inline-speculation-rules'` (Nuxt/Vite compat);
   - `connect-src 'self'`;
   - Ajustar conforme origens usadas.
2. Adicionar `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`.
3. Adicionar `Cross-Origin-Opener-Policy: same-origin` e `Cross-Origin-Embedder-Policy: require-corp` (testar com Vite/Nuxt).
4. Opcional: `X-Robots-Tag: noindex` em preview branches.

### Variáveis de Ambiente
5. Criar `.gitignore` na raiz para ignorar `.env*` globalmente.
6. Padronizar segredos em `runtimeConfig` (privado) e somente expor o necessário em `runtimeConfig.public`.
7. No Vercel, usar Environment Variables (Production/Preview/Development) em vez de arquivos `.env` no repo.

### API (para futuras integrações)
8. Caso seja adicionada API:
   - Autenticação (JWT/Session) e autorização por rota;
   - Rate limiting (Nitro middleware) e logging;
   - CORS estrito (`Access-Control-Allow-Origin` com domínio específico);
   - Validação de payload (zod/yup) e IDs não previsíveis.

### Upload de Arquivos (se vier a existir)
9. Whitelist de MIME (ex.: `image/png`, `image/jpeg`), validar magic bytes.
10. Limitar tamanho e número de arquivos.
11. Armazenar em bucket (S3/R2) com presigned URLs; não executar uploads no server.
12. Sanitizar nomes e remover metadados sensíveis.

### XSS
13. Manter proibição de `v-html`; se precisar, sanitizar com DOMPurify apenas no client.
14. CSP com `script-src` adequado mitigará XSS refletido/armazenado.

### Dependências e Build
15. Ativar Dependabot no GitHub.
16. Adicionar CI com `npm ci && npm audit --production` e relatório; opcional Snyk.
17. Fixar versões críticas e manter `package-lock.json` no repo.

### Hospedagem e DNS
18. Confirmar Vercel como origem; opcionalmente colocar Cloudflare na frente para WAF/DNS.
19. Ativar DNSSEC no registrador; 2FA e bloqueio de transferência de domínio.

## Entregáveis Propostos
- Atualização de `nuxt.config.ts` com CSP, HSTS e COOP/COEP.
- `.gitignore` na raiz do repo para `.env*` e artefatos comuns.
- Pipeline GitHub Actions para auditoria e lint.
- Orientação de configuração no Vercel (variáveis e policies) e DNSSEC.

Confirma executar estas alterações e automações? Podemos aplicar tudo em seguida e validar no ambiente de preview do Vercel.