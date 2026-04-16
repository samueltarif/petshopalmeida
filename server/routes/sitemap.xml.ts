export default defineEventHandler(() => {
  const baseUrl = 'https://www.petsalmeida.com.br'
  const pages = [
    '',
    '/bairros',
    '/bairro/cachoeirinha',
    '/bairro/casa-verde',
    '/bairro/limao',
    '/bairro/vila-penteado',
    '/bairro/brasilandia',
    '/bairro/eliza-maria'
  ]
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${baseUrl}${page}</loc>
          <changefreq>weekly</changefreq>
          <priority>${page === '' ? '1.0' : '0.8'}</priority>
        </url>
      `).join('')}
    </urlset>`
  
  return sitemap
})
