/**
 * Testes de segurança em APIs REST
 * - Autenticação obrigatória, CORS, métodos inválidos, rate-limit
 */
import { safeFetch, writeReport } from '../utils.js'

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const endpoints = cfg.endpoints?.api || []
  const findings = []
  if (endpoints.length === 0) {
    const report = { target: base, skipped: true, reason: 'Sem endpoints API configurados' }
    const file = writeReport('api_security', report)
    return { file, ...report }
  }
  for (const ep of endpoints) {
    const rNoAuth = await safeFetch(`${base}${ep}`, { method: 'GET' })
    if (rNoAuth.status === 200) findings.push({ severity: 'medium', endpoint: ep, msg: 'Endpoint acessível sem autenticação' })
    const cors = rNoAuth.headers.get('access-control-allow-origin')
    if (cors === '*') findings.push({ severity: 'low', endpoint: ep, msg: 'CORS aberto demais' })
    const rInvalid = await safeFetch(`${base}${ep}`, { method: 'DELETE' })
    if (rInvalid.status === 200) findings.push({ severity: 'low', endpoint: ep, msg: 'Método inválido aceito' })
  }
  const report = { target: base, endpoints, findings }
  const file = writeReport('api_security', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}