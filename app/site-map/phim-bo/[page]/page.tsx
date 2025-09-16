import Link from "next/link";

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";

interface TVShow {
  id: number;
  name: string;
}

interface TMDBResponse {
  results: TVShow[];
}

interface Show {
  id: number;
  name: string;
}

async function fetchShows(page: number): Promise<Show[]> {
  const res = await fetch(
    `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=vi&page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return [];
  const data: TMDBResponse = await res.json();
  return (data.results || []).map((show: TVShow) => ({
    id: show.id,
    name: show.name,
  }));
}

export default async function SitemapPhimBoPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const resolvedParams = await params;
  const pageNum = Number(resolvedParams.page) || 1;
  const shows = await fetchShows(pageNum);
  return (
    <main
      style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>
        Sitemap Phim Bộ - Trang {pageNum}
      </h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {shows.map((show) => (
          <li
            key={show.id}
            style={{
              margin: "12px 0",
              background: "#f9f9f9",
              borderRadius: 8,
              padding: "10px 16px",
              boxShadow: "0 1px 4px #eee",
            }}
          >
            <Link
              href={`/phim-bo/${show.id}`}
              style={{
                color: "#0070f3",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {show.name}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link href="/site-map/phim-bo" style={{ color: "#0070f3" }}>
          Quay lại Sitemap Phim Bộ
        </Link>
      </div>
    </main>
  );
}
