import { NextResponse } from 'next/server';
import { getHostUrl } from '@/utils/getHostUrl';

// Sitemap configuration - centralized
const TMDB_API_KEY = 'fecb69b9d0ad64dbe0802939fafc338d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const PAGES_PER_BATCH = 25;

interface TVShow {
  id: number;
  title?: string;
  name?: string;
}

async function getTVShowsBatch(startPage: number, endPage: number): Promise<TVShow[]> {
  try {
    const allShows: TVShow[] = [];
    
    for (let page = startPage; page <= endPage; page++) {
      const res = await fetch(`${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=vi&page=${page}&sort_by=popularity.desc`, {
        next: { revalidate: 3600 } 
      });
      
      if (!res.ok) break;
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        allShows.push(...data.results);
      } else {
        break;
      }
    }
    
    return allShows;
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const baseUrl = await getHostUrl();
    const batchNumber = 1; // Static batch 1
    
    // Mỗi batch có PAGES_PER_BATCH trang
    const startPage = (batchNumber - 1) * PAGES_PER_BATCH + 1;
    const endPage = batchNumber * PAGES_PER_BATCH;
  
    // Lấy TV shows cho batch này
    const shows = await getTVShowsBatch(startPage, endPage);

    // Nếu không có data, trả về sitemap trống
    if (shows.length === 0) {
      const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
      
      return new NextResponse(emptySitemap, {
        status: 200,
        headers: { 
          'Content-Type': 'application/xml',
          'Cache-Control': 'public, max-age=3600'
        }
      });
    }

    const showUrls = shows.map((show: TVShow) => ({
      url: `${baseUrl}/phim-bo/${show.id}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.8',
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${showUrls.map(item => `  <url>
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
  } catch {
    // Return empty sitemap on error
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;
    
    return new NextResponse(emptySitemap, {
      status: 200,
      headers: { 
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600'
      }
    });
  }
}
