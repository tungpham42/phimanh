import { NextResponse } from 'next/server';

// Giả sử có hàm lấy danh sách phim bộ và phim lẻ
// Thay thế bằng truy vấn DB hoặc import file JSON thực tế nếu có
const getShows = async () => [
  { type: 'phim-bo', id: '123', seasons: [1, 2], episodes: { '1': [1,2], '2': [1] } as Record<string, number[]> },
  { type: 'phim-le', id: '456' },
];

export async function GET() {
  const baseUrl = 'https://your-domain.com'; // Thay bằng domain thực tế
  const shows = await getShows();
  let urls = [];

  for (const show of shows) {
    if (show.type === 'phim-bo' && Array.isArray(show.seasons) && show.episodes) {
      urls.push(`${baseUrl}/phim-bo/${show.id}/`);
      for (const season of show.seasons) {
  const episodes: number[] = (show.episodes as Record<string, number[]>)[String(season)] || [];
        for (const episode of episodes) {
          urls.push(`${baseUrl}/phim-bo/${show.id}/${season}/${episode}/`);
        }
      }
    } else if (show.type === 'phim-le') {
      urls.push(`${baseUrl}/phim-le/${show.id}/`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
