import fs from 'node:fs'
import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// Public pages listed in sitemap.xml (admin/login pages are excluded and blocked in robots.txt).
const SITEMAP = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/project', priority: '0.9', changefreq: 'weekly' },
  { path: '/refer-and-earn', priority: '0.7', changefreq: 'monthly' },
  { path: '/loan-assistance', priority: '0.7', changefreq: 'monthly' },
  { path: '/contact', priority: '0.8', changefreq: 'monthly' },
  { path: '/terms', priority: '0.3', changefreq: 'yearly' },
]

// Build step: SEO files + copy the PHP backend so dist/ can be uploaded to public_html as-is.
function deployBundle(siteUrl, { withApi = true } = {}) {
  let outDir
  return {
    name: 'ikgs-deploy-bundle',
    apply: 'build',
    configResolved(cfg) {
      outDir = path.resolve(cfg.root, cfg.build.outDir)
    },
    closeBundle() {
      const today = new Date().toISOString().slice(0, 10)
      const urls = SITEMAP.map(
        (p) =>
          `  <url>\n    <loc>${siteUrl}${p.path}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`,
      ).join('\n')
      fs.writeFileSync(
        path.join(outDir, 'sitemap.xml'),
        `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
      )
      fs.writeFileSync(
        path.join(outDir, 'robots.txt'),
        `User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /login\nDisallow: /api/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      )

      // Copy ../server/api → dist/api, but never a local config.php (it lives only on the server).
      const src = path.resolve(__dirname, '../server/api')
      if (withApi && fs.existsSync(src)) {
        fs.cpSync(src, path.join(outDir, 'api'), {
          recursive: true,
          filter: (f) => path.basename(f) !== 'config.php',
        })
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  // Vercel hosts the client-review preview only: it can't run PHP, so use demo data and don't ship the API.
  // (process.env wins over .env files in Vite, so this applies to import.meta.env too.)
  if (process.env.VERCEL) {
    process.env.VITE_USE_MOCK = 'true'
    process.env.VITE_SITE_URL ||= `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL}`
  }
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || 'http://localhost:5173').replace(/\/$/, '')
  return {
    // Demo/preview builds (mock data) don't ship the PHP backend.
    plugins: [react(), deployBundle(siteUrl, { withApi: env.VITE_USE_MOCK !== 'true' })],
    server: env.VITE_API_PROXY
      ? { proxy: { '/api': { target: env.VITE_API_PROXY, changeOrigin: true } } } // e.g. local PHP in Docker
      : undefined,
  }
})
