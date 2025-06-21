import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { getHostUrl } from "@/utils/getHostUrl";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Phim Ảnh | Phim Mới Nhất",
    description:
      "Xem phim chất lượng cao, cập nhật liên tục. Thưởng thức phim Hàn Quốc, Trung Quốc, Âu Mỹ,... có phụ đề Việt.",
    keywords: [
      "phim lẻ",
      "phim bộ",
      "phim dài tập",
      "xem phim lẻ",
      "phim lẻ mới nhất",
      "phim truyền hình",
    ],
    openGraph: {
      title: "Phim Ảnh | Phim Mới Nhất",
      description:
        "Xem phim chất lượng cao, cập nhật liên tục. Thưởng thức phim Hàn Quốc, Trung Quốc, Âu Mỹ,... có phụ đề Việt.",
      type: "website",
      url: hostUrl,
      images: [
        {
          url: `${hostUrl}/1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: "Phim Mới Nhất",
        },
      ],
      siteName: "Phim Ảnh",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>
        <Header />
        {children}
      </body>
      <Footer />
      <GoogleAnalytics ga_id="G-HHXZSNQ65X" />
    </html>
  );
}
