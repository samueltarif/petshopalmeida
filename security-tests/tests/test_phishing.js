/**
 * Simulações de ataques de phishing
 * - Coleta links externos e verifica `rel="noopener noreferrer"`
 * - Verifica proteção contra clickjacking (XFO)
 */
import { safeFetch, writeReport } from '../utils.js'

function extractLinks(html) {
  const regex = /<a\s+[^>]*href="([^"]+)"[^>]*>/gi
  const links = []
  let m
  while ((m = regex.exec(html))) links.push(m[1])
  return links
}

export async function main(cfg) {
  const base = cfg.host.replace(/\/$/, '')
  const res = await safeFetch(`${base}/`, { method: 'GET' })
  const html = await res.text()
  const links = extractLinks(html)

  const findings = []
  for (const href of links) {
    const isExternal = /^https?:\/\//.test(href) && !href.includes(base)
    if (isExternal) {
      const tagRegex = new RegExp(`<a[^>]*href="${href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`, 'i')
      const tagMatch = html.match(tagRegex)?.[0] || ''
      const hasRel = /rel="[^"]*noopener[^"]*"/i.test(tagMatch) && /rel="[^"]*noreferrer[^"]*"/i.test(tagMatch)
      if (!hasRel) findings.push({ severity: 'low', msg: 'Link externo sem noopener/noreferrer', href })
    }
  }
  const xfo = res.headers.get('x-frame-options')
  if (xfo !== 'DENY') findings.push({ severity: 'medium', msg: `X-Frame-Options inesperado: ${xfo}` })

  const report = { target: base, externalLinks: links.filter(l => /^https?:\/\//.test(l)), findings }
  const file = writeReport('phishing', report)
  return { file, ...report }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const { loadConfig, ensureSafeEnvironment } = await import('../utils.js')
  const cfg = loadConfig(); ensureSafeEnvironment(cfg)
  main(cfg).then((r) => console.log(JSON.stringify(r, null, 2)))
}