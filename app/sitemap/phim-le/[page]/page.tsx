import Link from "next/link";

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";

interface Movie {
  id: number;
  title: string;
}

interface TMDBResponse {
  results: Movie[];
}

interface Show {
  id: number;
  title: string;
}

async function fetchMovies(page: number): Promise<Show[]> {
  const res = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=vi&page=${page}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) return [];
  const data: TMDBResponse = await res.json();
  return (data.results || []).map((movie: Movie) => ({
    id: movie.id,
    title: movie.title,
  }));
}

export default async function SitemapPhimLePage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const resolvedParams = await params;
  const pageNum = Number(resolvedParams.page) || 1;
  const movies = await fetchMovies(pageNum);
  return (
    <main
      style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>
        Sitemap Phim Lẻ - Trang {pageNum}
      </h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {movies.map((movie) => (
          <li
            key={movie.id}
            style={{
              margin: "12px 0",
              background: "#f9f9f9",
              borderRadius: 8,
              padding: "10px 16px",
              boxShadow: "0 1px 4px #eee",
            }}
          >
            <Link
              href={`/phim-le/${movie.id}`}
              style={{
                color: "#0070f3",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: "center", marginTop: 32 }}>
        <Link href="/sitemap" style={{ color: "#0070f3" }}>
          Quay lại Sitemap Index
        </Link>
      </div>
    </main>
  );
}
