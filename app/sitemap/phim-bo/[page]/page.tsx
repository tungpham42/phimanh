import Link from "next/link";

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";

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
  const data = await res.json();
  return (data.results || []).map((m: any) => ({ id: m.id, name: m.name }));
}

export default async function SitemapPhimBoPage({
  params,
}: {
  params: { page: string };
}) {
  const pageNum = Number(params.page) || 1;
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
        <Link href="/sitemap/phim-bo" style={{ color: "#0070f3" }}>
          Quay lại Sitemap Phim Bộ
        </Link>
      </div>
    </main>
  );
}
