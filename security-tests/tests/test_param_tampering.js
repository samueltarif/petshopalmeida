/**
 * Testes de manipulação de parâmetros HTTP
 * - Modifica IDs e flags em rotas
 * - Espera 4xx/validação server-side
 */
import { safeFetch, writeReport } from '../utils.js'

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const targets = cfg.endpoints?.paramTampering || []
  const findings = []
  if (targets.length === 0) {
    const report = { target: base, skipped: true, reason: 'Sem rotas configuradas' }
    const file = writeReport('param_tampering', report)
    return { file, ...report }
  }
  for (const ep of targets) {
    const res = await safeFetch(`${base}${ep}?id=999999&role=admin`, { method: 'GET' })
    if (res.status === 200) findings.push({ severity: 'medium', endpoint: ep, msg: 'Possível ausência de validação de parâmetros' })
  }
  const report = { target: base, endpoints: targets, findings }
  const file = writeReport('param_tampering', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}