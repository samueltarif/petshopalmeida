/**
 * Simulações de XSS (Cross-Site Scripting)
 * - Injeta payloads em query e valida se são refletidos sem escape
 * - Opcional: checa bloqueio pela CSP (presença de header)
 */
import { safeFetch, writeReport } from '../utils.js'

const VECTORS = [
  '<script>alert(1)</script>',
  '" onmouseover="alert(1)"',
  "'><img src=x onerror=alert(1)>",
  '<svg onload=alert(1)>'
]

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const targets = cfg.endpoints?.xss || ['/']
  const findings = []

  for (const ep of targets) {
    for (const v of VECTORS) {
      const url = `${base}${ep}?echo=${encodeURIComponent(v)}`
      const res = await safeFetch(url, { method: 'GET' })
      const text = await res.text()
      const reflected = text.includes(v)
      const csp = res.headers.get('content-security-policy')
      if (reflected) findings.push({ severity: 'high', endpoint: ep, vector: v, msg: 'Payload refletido sem sanitização' })
      if (!csp) findings.push({ severity: 'medium', endpoint: ep, msg: 'CSP ausente' })
    }
  }

  const report = { target: base, endpoints: targets, findings }
  const file = writeReport('xss', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}