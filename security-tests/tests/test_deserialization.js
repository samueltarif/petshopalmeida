/**
 * Exploração de vulnerabilidades de deserialização
 * - Envia JSON malformado/prototype pollution
 * - Verifica tratamento seguro
 */
import { safeFetch, writeReport } from '../utils.js'

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const endpoints = cfg.endpoints?.api || []
  const findings = []
  if (endpoints.length === 0) {
    const report = { target: base, skipped: true, reason: 'Sem endpoints JSON configurados' }
    const file = writeReport('deserialization', report)
    return { file, ...report }
  }
  const payloads = [
    { a: 1, b: 2 },
    { __proto__: { admin: true } },
    { toString: { __proto__: null } }
  ]
  for (const ep of endpoints) {
    for (const p of payloads) {
      const res = await safeFetch(`${base}${ep}`, {
        method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(p)
      })
      if (res.status >= 500) findings.push({ severity: 'medium', endpoint: ep, msg: 'Erro do servidor ao deserializar', payload: p })
    }
  }
  const report = { target: base, endpoints, findings }
  const file = writeReport('deserialization', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}