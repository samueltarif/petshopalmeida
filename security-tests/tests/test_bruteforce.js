/**
 * Tentativas de força bruta em sistemas de autenticação
 * - Envia combos usuário/senha com pausas e caps
 * - Mede respostas (429, 401, lockout)
 */
import { safeFetch, writeReport } from '../utils.js'

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const bf = cfg.bruteforce || {}
  const findings = []
  if (!bf.loginPath) {
    const report = { target: base, skipped: true, reason: 'Sem loginPath configurado' }
    const file = writeReport('bruteforce', report)
    return { file, ...report }
  }

  let attempts = 0
  for (const u of bf.users) {
    for (const p of bf.passwords) {
      if (attempts++ >= bf.maxAttempts) break
      const res = await safeFetch(`${base}${bf.loginPath}`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ [bf.userField]: u, [bf.passField]: p })
      })
      if (res.status === 200) findings.push({ severity: 'high', msg: 'Login indevido obtido', user: u, pass: p })
      if (res.status === 429) findings.push({ severity: 'low', msg: 'Rate-limit presente' })
      await new Promise(r => setTimeout(r, bf.delayMs || 200))
    }
  }

  const report = { target: base, findings }
  const file = writeReport('bruteforce', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}