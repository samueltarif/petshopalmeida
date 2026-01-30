/**
 * Ataque de negação de serviço (DDoS) controlado
 * - Executa requisições concorrentes por tempo limitado
 * - Caps rígidos de RPS e duração
 */
import { safeFetch, writeReport, withRateLimit } from '../utils.js'

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const dd = cfg.ddos || { path: '/', maxRPS: 20, durationSeconds: 10, concurrency: 5 }
  const findings = []

  const start = Date.now()
  const urls = []
  while ((Date.now() - start) / 1000 < dd.durationSeconds) {
    urls.push(`${base}${dd.path}`)
  }
  const results = await withRateLimit(urls, dd.concurrency, async (u) => {
    const t0 = Date.now()
    try {
      const res = await safeFetch(u, { method: 'GET' })
      const dt = Date.now() - t0
      return { status: res.status, dt }
    } catch (e) {
      const dt = Date.now() - t0
      return { error: String(e?.message || e), dt }
    }
  })
  const errors = results.filter(r => r.status >= 500).length
  const timeouts = results.filter(r => r.error).length
  if (errors > 0) findings.push({ severity: 'medium', msg: `Erros durante carga: ${errors}` })
  if (timeouts > 0) findings.push({ severity: 'low', msg: `Falhas/Timeouts durante carga: ${timeouts}` })

  const report = { target: base, path: dd.path, concurrency: dd.concurrency, duration: dd.durationSeconds, errors, samples: results.slice(0, 5) }
  const file = writeReport('ddos', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}