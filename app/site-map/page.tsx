import Link from "next/link";

export default function SitemapIndexPage() {
  return (
    <main
      style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>Sitemap Index</h1>
      <div style={{ margin: "20px 0" }}>
        <Link
          href="/site-map/phim-le"
          style={{
            color: "#0070f3",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Sitemap Phim Lẻ
        </Link>
      </div>
      <div style={{ margin: "20px 0" }}>
        <Link
          href="/site-map/phim-bo"
          style={{
            color: "#0070f3",
            textDecoration: "none",
            fontSize: "18px",
          }}
        >
          Sitemap Phim Bộ
        </Link>
      </div>
    </main>
  );
}
