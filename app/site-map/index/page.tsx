import Link from "next/link";

export default function SitemapIndexPage() {
  return (
    <main
      style={{ maxWidth: 800, margin: "40px auto", fontFamily: "sans-serif" }}
    >
      <h1 style={{ textAlign: "center", color: "#0070f3" }}>Sitemap Index</h1>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ margin: "16px 0" }}>
          <Link
            href="/sitemap/phim-le"
            style={{ color: "#0070f3", fontWeight: 600, fontSize: 20 }}
          >
            Sitemap Phim Lẻ
          </Link>
        </li>
        <li style={{ margin: "16px 0" }}>
          <Link
            href="/sitemap/phim-bo"
            style={{ color: "#0070f3", fontWeight: 600, fontSize: 20 }}
          >
            Sitemap Phim Bộ
          </Link>
        </li>
      </ul>
      <p style={{ textAlign: "center", color: "#888", marginTop: 32 }}>
        Chọn loại phim để xem danh sách chi tiết từng phim. Nếu số lượng lớn sẽ
        chia thành nhiều trang.
      </p>
    </main>
  );
}
