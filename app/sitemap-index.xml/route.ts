import { NextResponse } from 'next/server';
import { getHostUrl } from '@/utils/getHostUrl';

export async function GET() {
  const baseUrl = await getHostUrl();
  
  // Configuration
  const MOVIE_BATCHES = 15;
  const TV_BATCHES = 5;
  
  // Tạo movie batches
  const movieBatches = Array.from({ length: MOVIE_BATCHES }, (_, i) => i + 1);
  
  // Tạo TV show batches
  const tvBatches = Array.from({ length: TV_BATCHES }, (_, i) => i + 1);

  const sitemaps = [
    // Sitemap chính với content quan trọng nhất
    { 
      url: `${baseUrl}/sitemap.xml`, 
      lastmod: new Date().toISOString() 
    },
    
    // Movie sitemaps
    ...movieBatches.map(batch => ({
      url: `${baseUrl}/sitemap-movies-${batch}.xml`,
      lastmod: new Date().toISOString()
    })),
    
    // TV show sitemaps  
    ...tvBatches.map(batch => ({
      url: `${baseUrl}/sitemap-tv-${batch}.xml`,
      lastmod: new Date().toISOString()
    }))
  ];

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap-index.xsl"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.map(sitemap => `  <sitemap>
    <loc>${sitemap.url}</loc>
    <lastmod>${sitemap.lastmod}</lastmod>
  </sitemap>`).join('\n')}
</sitemapindex>`;

  return new NextResponse(sitemapIndex, {
    status: 200,
    headers: { 
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
