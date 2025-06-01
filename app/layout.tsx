import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Thế giới Phim | Phim Mới Nhất",
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
    title: "Thế giới Phim | Phim Mới Nhất",
    description:
      "Xem phim chất lượng cao, cập nhật liên tục. Thưởng thức phim Hàn Quốc, Trung Quốc, Âu Mỹ,... có phụ đề Việt.",
    type: "website",
    url: "https://thegioiphim.netlify.app",
    images: [
      {
        url: "https://thegioiphim.netlify.app/1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phim Mới Nhất",
      },
    ],
  },
};

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
    </html>
  );
}
