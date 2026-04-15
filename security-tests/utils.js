/**
 * Suporte comum para os testes de segurança
 * - Carrega config
 * - Garante ambiente seguro (allowlist)
 * - Wrapper de fetch com correlação e tempo limite
 * - Escrita de relatórios JSON
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { setTimeout as delay } from 'node:timers/promises'

const here = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(here)
const reportsDir = path.join(root, 'reports')

export function loadConfig() {
  const cfgPath = path.join(root, 'config.json')
  const raw = fs.readFileSync(cfgPath, 'utf-8')
  return JSON.parse(raw)
}

export function ensureSafeEnvironment(cfg) {
  const url = new URL(cfg.host)
  const isLocal = ['localhost', '127.0.0.1'].includes(url.hostname)
  if (!isLocal && !cfg.allowNonLocal) {
    throw new Error(`Ambiente não permitido: ${url.hostname}. Habilite allowNonLocal para prosseguir conscientemente.`)
  }
}

export async function safeFetch(url, opts = {}) {
  const runId = process.env.TEST_RUN_ID || `run-${Date.now()}`
  const controller = new AbortController()
  const timeoutMs = opts.timeoutMs ?? 8000
  const headers = { 'X-Test-Run-Id': runId, ...(opts.headers || {}) }

  const t = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { ...opts, headers, signal: controller.signal })
    return res
  } finally {
    clearTimeout(t)
  }
}

export function writeReport(name, data) {
  fs.mkdirSync(reportsDir, { recursive: true })
  const file = path.join(reportsDir, `${name}.json`)
  fs.writeFileSync(file, JSON.stringify({ timestamp: new Date().toISOString(), ...data }, null, 2))
  return file
}

export async function withRateLimit(items, concurrency, fn) {
  const queue = [...items]
  const running = new Set()
  const results = []
  async function launch(item) {
    const p = fn(item).then((r) => results.push(r)).finally(() => running.delete(p))
    running.add(p)
  }
  while (queue.length > 0 || running.size > 0) {
    while (running.size < concurrency && queue.length > 0) {
      await launch(queue.shift())
    }
    await delay(10)
  }
  return results
}

export function summarizeFindings(findings) {
  const critical = findings.filter(f => f.severity === 'critical').length
  const high = findings.filter(f => f.severity === 'high').length
  const medium = findings.filter(f => f.severity === 'medium').length
  const low = findings.filter(f => f.severity === 'low').length
  return { counts: { critical, high, medium, low } }
}