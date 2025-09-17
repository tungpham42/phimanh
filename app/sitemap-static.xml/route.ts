import { NextResponse } from 'next/server';
import { getHostUrl } from '@/utils/getHostUrl';

export async function GET() {
  const baseUrl = await getHostUrl();

  const staticUrls = [
    { url: baseUrl, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
    { url: `${baseUrl}/phim-le`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/phim-bo`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/site-map`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 
      'Content-Type': 'application/xml', 
      'Cache-Control': 'public, max-age=3600' 
    }
  });
}
