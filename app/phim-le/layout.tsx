import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Phim Lẻ | Xem Phim Lẻ Mới Nhất",
  description:
    "Tổng hợp phim lẻ hay, phim lẻ mới nhất, chất lượng HD, có phụ đề tiếng Việt. Cập nhật liên tục các lẻ phim hấp dẫn từ Hàn Quốc, Trung Quốc, Mỹ và nhiều quốc gia khác.",
  keywords: [
    "phim lẻ",
    "phim dài tập",
    "xem phim lẻ",
    "phim lẻ mới nhất",
    "phim truyền hình",
  ],
  openGraph: {
    title: "Phim Lẻ | Xem Phim Lẻ Mới Nhất",
    description:
      "Xem phim lẻ chất lượng cao, cập nhật liên tục. Thưởng thức phim lẻ Hàn Quốc, Trung Quốc, Âu Mỹ,... có phụ đề Việt.",
    type: "website",
    url: "https://thegioiphim.netlify.app/phim-bo",
    images: [
      {
        url: "https://thegioiphim.netlify.app/1200x630.jpg",
        width: 1200,
        height: 630,
        alt: "Phim Lẻ Mới Nhất",
      },
    ],
  },
};

export default function MovieListLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
