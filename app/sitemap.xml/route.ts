import { NextResponse } from 'next/server';

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";

async function getMovies() {
  try {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=vi&page=1`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

async function getTVShows() {
  try {
    const res = await fetch(`${BASE_URL}/discover/tv?api_key=${API_KEY}&language=vi&page=1`, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch {
    return [];
  }
}

export async function GET() {
  const baseUrl = 'https://phim.soft.io.vn';
  const [movies, shows] = await Promise.all([getMovies(), getTVShows()]);

  const staticUrls = [
    { url: baseUrl, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '1.0' },
    { url: `${baseUrl}/phim-le`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/phim-bo`, lastmod: new Date().toISOString(), changefreq: 'daily', priority: '0.9' },
    { url: `${baseUrl}/site-map`, lastmod: new Date().toISOString(), changefreq: 'weekly', priority: '0.8' }
  ];

  const movieUrls = movies.map((movie) => ({
    url: `${baseUrl}/phim-le/${movie.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.8'
  }));

  const showUrls = shows.map((show) => ({
    url: `${baseUrl}/phim-bo/${show.id}`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: '0.8'
  }));

  const allUrls = [...staticUrls, ...movieUrls, ...showUrls];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(item => `  <url>
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
