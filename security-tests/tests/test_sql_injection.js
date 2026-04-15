/**
 * Testes de Injeção SQL
 * - Envia payloads clássicos em query e body para endpoints configurados
 * - Detecta erros e comportamento anômalo (500, mensagens de driver, delays)
 */
import { safeFetch, writeReport } from '../utils.js'

const PAYLOADS = [
  "' OR '1'='1",
  '" OR "1"="1',
  "' UNION SELECT NULL--",
  '1; DROP TABLE users; --',
  "' OR 1=1--",
  'admin\'--'
]

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const targets = cfg.endpoints?.sqli || []
  const findings = []

  if (targets.length === 0) {
    const report = { target: base, skipped: true, reason: 'Sem endpoints configurados' }
    const file = writeReport('sql_injection', report)
    return { file, ...report }
  }

  for (const ep of targets) {
    for (const p of PAYLOADS) {
      const url = `${base}${ep}?q=${encodeURIComponent(p)}`
      const t0 = Date.now()
      const res = await safeFetch(url, { method: 'GET' })
      const dt = Date.now() - t0
      const body = await res.text()
      const errorHints = /(SQL|sqlite|pg_|syntax|ORA-)/i.test(body)
      if (res.status >= 500 || errorHints || dt > 3000) {
        findings.push({ severity: 'high', endpoint: ep, payload: p, status: res.status, delayMs: dt, hint: errorHints })
      }
    }
  }

  const report = { target: base, endpoints: targets, findings }
  const file = writeReport('sql_injection', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}