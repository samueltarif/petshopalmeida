/**
 * Orquestrador: executa todos os testes e consolida relatórios
 */
import { loadConfig, ensureSafeEnvironment, writeReport } from './utils.js'
import { main as sqli } from './tests/test_sql_injection.js'
import { main as xss } from './tests/test_xss.js'
import { main as bruteforce } from './tests/test_bruteforce.js'
import { main as ddos } from './tests/test_ddos.js'
import { main as csrf } from './tests/test_csrf.js'
import { main as tamper } from './tests/test_param_tampering.js'
import { main as phishing } from './tests/test_phishing.js'
import { main as deser } from './tests/test_deserialization.js'
import { main as api } from './tests/test_api_security.js'
import { main as info } from './tests/test_info_leakage.js'

async function run() {
  const cfg = loadConfig()
  ensureSafeEnvironment(cfg)
  const results = []
  for (const [name, fn] of [
    ['sql_injection', sqli],
    ['xss', xss],
    ['bruteforce', bruteforce],
    ['ddos', ddos],
    ['csrf', csrf],
    ['param_tampering', tamper],
    ['phishing', phishing],
    ['deserialization', deser],
    ['api_security', api],
    ['info_leakage', info]
  ]) {
    try {
      const res = await fn(cfg)
      results.push({ name, ok: true, report: res })
    } catch (e) {
      results.push({ name, ok: false, error: String(e?.message || e) })
    }
  }
  writeReport('summary', { results })
  console.log('Resumo salvo em security-tests/reports/summary.json')
}

run().catch((e) => { console.error(e); process.exit(1) })