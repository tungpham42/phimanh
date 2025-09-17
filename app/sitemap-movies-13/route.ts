import { NextResponse } from 'next/server';
import { getHostUrl } from '@/utils/getHostUrl';

// Sitemap configuration - centralized
const TMDB_API_KEY = 'fecb69b9d0ad64dbe0802939fafc338d';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const PAGES_PER_BATCH = 25;

interface Movie {
  id: number;
  title?: string;
  name?: string;
}

async function getMoviesBatch(startPage: number, endPage: number): Promise<Movie[]> {
  try {
    const allMovies: Movie[] = [];
    
    for (let page = startPage; page <= endPage; page++) {
      const res = await fetch(`${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=vi&page=${page}&sort_by=popularity.desc`, { 
        next: { revalidate: 3600 } 
      });
      
      if (!res.ok) break;
      const data = await res.json();
      
      if (data.results && data.results.length > 0) {
        allMovies.push(...data.results);
      } else {
        break;
      }
    }
    
    return allMovies;
  } catch {
    return [];
  }
}

export async function GET() {
  try {
    const baseUrl = await getHostUrl();
    const batchNumber = 13; // Static batch 13
    
    // Mỗi batch có PAGES_PER_BATCH trang
    const startPage = (batchNumber - 1) * PAGES_PER_BATCH + 1;
    const endPage = batchNumber * PAGES_PER_BATCH;
  
    // Lấy movies cho batch này
    const movies = await getMoviesBatch(startPage, endPage);

    // Nếu không có data, trả về sitemap trống
    if (movies.length === 0) {
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

    const movieUrls = movies.map((movie: Movie) => ({
      url: `${baseUrl}/phim-le/${movie.id}`,
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: '0.8',
    }));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${movieUrls.map(item => `  <url>
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
