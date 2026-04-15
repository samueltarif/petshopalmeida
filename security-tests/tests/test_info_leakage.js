/**
 * Verificação de vazamento de informações sensíveis
 * - Checa headers de segurança (HSTS, CSP, XFO, XCTO)
 * - Tenta acessar caminhos sensíveis: /.env, /.git, /.nuxt, /node_modules
 * - Valida bloqueio de dotfiles
 */
import { safeFetch, writeReport } from '../utils.js'

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const findings = []

  const res = await safeFetch(`${base}/`, { method: 'GET' })
  const hdr = {
    hsts: res.headers.get('strict-transport-security'),
    csp: res.headers.get('content-security-policy'),
    xfo: res.headers.get('x-frame-options'),
    xcto: res.headers.get('x-content-type-options')
  }
  if (!hdr.hsts) findings.push({ severity: 'low', msg: 'HSTS ausente' })
  if (!hdr.csp) findings.push({ severity: 'medium', msg: 'CSP ausente' })
  if (hdr.xfo !== 'DENY') findings.push({ severity: 'medium', msg: `X-Frame-Options inesperado: ${hdr.xfo}` })
  if (hdr.xcto !== 'nosniff') findings.push({ severity: 'low', msg: `X-Content-Type-Options inesperado: ${hdr.xcto}` })

  const sensitive = ['/.env', '/.git', '/.nuxt', '/node_modules']
  for (const p of sensitive) {
    const r = await safeFetch(`${base}${p}`, { method: 'GET' })
    const ok = r.status >= 200 && r.status < 300
    if (ok) findings.push({ severity: 'high', msg: `Acesso indevido permitido: ${p}`, status: r.status })
    if (p.startsWith('/.')) {
      if (r.status !== 404) findings.push({ severity: 'medium', msg: `Dotfile não bloqueado: ${p}`, status: r.status })
    }
  }

  const report = { target: base, headers: hdr, findings }
  const file = writeReport('info_leakage', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}