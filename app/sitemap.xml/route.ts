import { NextResponse } from 'next/server';
import { getHostUrl } from '@/utils/getHostUrl';

// Sitemap configuration - centralized
const MOVIE_BATCHES = 15;
const TV_BATCHES = 5;

export async function GET() {
  const baseUrl = await getHostUrl();

  // Sitemap ch�nh ch? d?n d?n c�c sitemap con, kh�ng ch?a URLs c?a pages
  const childSitemaps = [
    // Movie sitemaps
    ...Array.from({ length: MOVIE_BATCHES }, (_, i) => ({
      url: `${baseUrl}/sitemap-movies-${i + 1}.xml`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9'
    })),
    
    // TV show sitemaps  
    ...Array.from({ length: TV_BATCHES }, (_, i) => ({
      url: `${baseUrl}/sitemap-tv-${i + 1}.xml`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.9'
    })),

    // Static pages sitemap
    {
      url: `${baseUrl}/sitemap-static.xml`,
      lastmod: new Date().toISOString(),
      changefreq: 'daily',
      priority: '1.0'
    }
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${childSitemaps.map(item => `  <url>
    <loc>${item.url}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(sitemap, {
    status: 200,
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' }
  });
}
