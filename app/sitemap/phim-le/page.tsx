import Link from "next/link";

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";
const PAGE_SIZE = 20;

async function getTotalPages(): Promise<number> {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=vi&page=1`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return 1;
  const data = await res.json();
  return data.total_pages || 1;
}

export default async function SitemapPhimLeIndex() {
  const totalPages = await getTotalPages();
  const maxPages = Math.min(totalPages, 1000);
  return (
    <main
      style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>Sitemap Phim Lẻ</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {Array.from({ length: maxPages }).map((_, i) => (
          <li key={i} style={{ margin: "8px 0" }}>
            <Link
              href={`/sitemap/phim-le/${i + 1}`}
              style={{
                color: "#0070f3",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Trang {i + 1}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link href="/sitemap/index" style={{ color: "#0070f3" }}>
          Quay lại Sitemap Index
        </Link>
      </div>
    </main>
  );
}
