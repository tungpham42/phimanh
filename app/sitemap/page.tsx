import Link from "next/link";

interface Show {
  id: number;
  title: string;
}

async function fetchMovies(): Promise<Show[]> {
  const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
  const BASE_URL = "https://api.themoviedb.org/3";
  const res = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=vi&page=1`,
    {
      next: { revalidate: 3600 }, // cache 1h
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return (data.results || []).map((m: any) => ({ id: m.id, title: m.title }));
}

export default async function SitemapPage() {
  const movies = await fetchMovies();
  return (
    <main
      style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>Sitemap Phim Lẻ</h1>
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
    </main>
  );
}
