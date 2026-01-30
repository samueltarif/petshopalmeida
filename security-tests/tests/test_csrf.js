/**
 * Exploração de vulnerabilidades CSRF
 * - Envia requisições sem token/cabeçalhos esperados
 * - Mede se o servidor bloqueia ou aceita
 */
import { safeFetch, writeReport } from '../utils.js'

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const endpoints = cfg.endpoints?.csrf || []
  const findings = []
  if (endpoints.length === 0) {
    const report = { target: base, skipped: true, reason: 'Sem endpoints CSRF configurados' }
    const file = writeReport('csrf', report)
    return { file, ...report }
  }

  for (const ep of endpoints) {
    const res = await safeFetch(`${base}${ep}`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' })
    if (res.status === 200) findings.push({ severity: 'high', endpoint: ep, msg: 'Possível ausência de proteção CSRF' })
  }

  const report = { target: base, endpoints, findings }
  const file = writeReport('csrf', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}