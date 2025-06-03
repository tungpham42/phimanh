import type { Metadata } from "next";
import { ReactNode } from "react";
import { getHostUrl } from "@/utils/getHostUrl";

export async function generateMetadata(): Promise<Metadata> {
  const hostUrl = await getHostUrl();
  return {
    title: "Phim Bộ | Xem Phim Bộ Mới Nhất",
    description:
      "Tổng hợp phim bộ hay, phim bộ mới nhất, chất lượng HD, có phụ đề tiếng Việt. Cập nhật liên tục các bộ phim hấp dẫn từ Hàn Quốc, Trung Quốc, Mỹ và nhiều quốc gia khác.",
    keywords: [
      "phim bộ",
      "phim dài tập",
      "xem phim bộ",
      "phim bộ mới nhất",
      "phim truyền hình",
    ],
    openGraph: {
      title: "Phim Bộ | Xem Phim Bộ Mới Nhất",
      description:
        "Xem phim bộ chất lượng cao, cập nhật liên tục. Thưởng thức phim bộ Hàn Quốc, Trung Quốc, Âu Mỹ,... có phụ đề Việt.",
      type: "website",
      url: `${hostUrl}/phim-bo`,
      images: [
        {
          url: `${hostUrl}/1200x630.jpg`,
          width: 1200,
          height: 630,
          alt: "Phim Bộ Mới Nhất",
        },
      ],
    },
  };
}

export default function ShowListLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
