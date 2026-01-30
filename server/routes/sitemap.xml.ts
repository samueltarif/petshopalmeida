export default defineEventHandler(async (event) => {
  const baseUrl = 'https://seu-dominio.com' // Substitua pelo seu domínio
  
  const bairros = [
    'cachoeirinha',
    'vila-penteado', 
    'brasilandia',
    'eliza-maria',
    'pinheiros',
    'vila-madalena',
    'perdizes',
    'santana'
  ]

  const staticPages = [
    '',
    '/bairros'
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages.map(page => `
  <url>
    <loc>${baseUrl}${page}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${page === '' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
  ${bairros.map(bairro => `
  <url>
    <loc>${baseUrl}/bairro/${bairro}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`).join('')}
</urlset>`

  setHeader(event, 'Content-Type', 'application/xml')
  return sitemap
})