## Objetivo
Criar uma suíte de testes de segurança, executável em ambiente isolado, que simule 10 tipos de ataques (SQLi, XSS, força bruta, DDoS controlado, CSRF, tampering de parâmetros, phishing, deserialização, API REST, vazamento de informações) com documentação, configuração, segurança operacional, relatórios e verificação de logs.

## Alcance e Suposições
- Aplicação atual: Nuxt 4 SSR sem endpoints próprios detectados (nenhum `server/api/**`).
- Os testes serão “black-box” sobre URLs configuradas (páginas, endpoints externos ou futuros), com mecanismos de skip quando a superfície não existir.
- Ambiente alvo: `localhost`/staging; produção bloqueada por padrão.

## Arquitetura da Suíte
- Linguagem: Python 3.11.
- Framework: `pytest` (organização, fixtures, marcações).
- HTTP: `requests` e `aiohttp` (assíncrono quando necessário).
- Browser: `playwright` (detecção real de XSS, clickjacking, links maliciosos).
- Carga/DDoS controlado: `locust` com limites rígidos.
- Configuração: `security-tests/config.yaml` (host, rotas, credenciais, limites, allowlist, tempos).
- Relatórios: JUnit XML (`pytest --junitxml`), JSON/HTML próprios; captura de evidências (códigos, headers, trechos de resposta, screenshots no XSS).
- Logs: correlação via header `X-Test-Run-Id`; coleta de console/local quando disponível; consolidação em `security-tests/reports/`.

## Estrutura de Pastas
- `security-tests/`
  - `config.yaml` (parâmetros por ambiente)
  - `common/` (utils: http, logger, correlation, rate-limit, parsing)
  - `tests/` (módulos por ataque)
  - `ddos/locustfile.py` (cenários de carga controlados)
  - `reports/` (saídas JUnit, JSON, HTML, screenshots)
  - `README.md` (uso, segurança, limites) 

## Mecanismos de Segurança Operacional
- Domínio allowlist: testes só rodam se `host` ∈ {localhost, staging}; aborta se detectar produção.
- Rate limiting local e caps de concorrência; timeouts baixos.
- Duração máxima por teste; “dry-run” opcional.
- Apenas requisições idempotentes por padrão; POST/PUT PATCH desativados salvo endpoints de teste controlados.
- Cleanup automático quando qualquer mutação for habilitada (ex.: desalocar sessão de teste).

## Módulos de Teste (10)
1. SQL Injection
- Envia payloads clássicos em query/POST para rotas configuradas; detecta erros SQL, delays (time-based), variação booleana.
- Parâmetros: lista de rotas/parametros, intensidade, payload sets.
- Relatório: evidências, latência, códigos, trechos de resposta.

2. XSS
- Injeta vetores (refletido/armazenado) em campos e query; valida com Playwright se scripts executam, verifica CSP e sanitização.
- Parâmetros: vetores, páginas, modos (DOM, atributo, evento).
- Relatório: screenshots, console messages, bloqueios CSP.

3. Força Bruta
- Simula tentativas sobre endpoint de login configurado; mede lockout, resposta, rate-limit.
- Segurança: caps estritos de tentativas; pausas; apenas credenciais de teste.

4. DDoS Controlado
- Locust ramp-up de usuários/RPS sobre rotas GET leves; duração curta; aborta fora de allowlist.
- Métricas: latência, erros, percentis.

5. CSRF
- Executa POSTs sem token/headers; tenta GET que muda estado (se existir). Mede bloqueio.
- Skip se não houver endpoints relevantes.

6. Tampering de Parâmetros
- Manipula IDs/preços/flags em rotas; verifica validações e respostas (403/422).
- Configurável por rotas e regras.

7. Phishing
- Verifica presença de `rel="noopener noreferrer"` em links externos; coleta instâncias; testa clickjacking via `<iframe>` com Playwright (espera bloqueio por `X-Frame-Options`).

8. Deserialização
- Envia JSON com estruturas maliciosas (`__proto__`, tipos inesperados); verifica tratamento e erros seguros.
- Skip se não houver endpoints.

9. API REST Security
- Autorização: valida que endpoints requerem token; CORS restrito; métodos não permitidos; rate-limit.
- Configurável por lista de endpoints.

10. Vazamento de Informações
- Varre caminhos sensíveis (`/.env`, `/.git`, `/node_modules`, `/.nuxt`, `/robots.txt`, `/public`), checa headers (HSTS, CSP, XFO, XCTO), verifica stack traces.
- Confere bloqueio de dotfiles.

## Execução
- Setup: `python -m venv venv && venv\Scripts\pip install -r requirements.txt`.
- Testes: `pytest -m security --config security-tests/config.yaml`.
- DDoS: `locust -f security-tests/ddos/locustfile.py --headless -u <users> -r <spawn_rate> -t <duration> -H http://localhost:3000`.
- Saídas em `security-tests/reports/`.

## Integração CI
- Job isolado que só roda em branches de preview/staging.
- Artefatos: JUnit, JSON, HTML, screenshots; falha do pipeline no caso de achados críticos.

## Entregáveis
- Diretório `security-tests/` com scripts e config.
- Documentação de uso e segurança.
- Exemplos de `config.yaml` para localhost e staging.

Deseja que eu implemente agora a suíte (criando `security-tests` com os 10 módulos, configs e scripts de execução) e adicionar uma pipeline básica no GitHub Actions?