import type { Metadata } from "next";
import { ReactNode } from "react";
import axios from "axios";
import { getHostUrl } from "@/utils/getHostUrl";

// Environment variables
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";

// TypeScript interface for TMDB TV show response
interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
}

// Generate dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ showId: string }>;
}): Promise<Metadata> {
  const { showId } = await params; // Directly await params to get showId
  const hostUrl = await getHostUrl();

  try {
    const response = await axios.get(`${BASE_URL}/tv/${showId}`, {
      params: { api_key: API_KEY, language: "vi" },
    });
    const show: TvShow = response.data;

    const title = `${show.name} | Phim Bộ Mới Nhất`;
    const description = show.overview
      ? `${show.overview.substring(0, 160)}...`
      : "Xem phim bộ chất lượng cao, cập nhật liên tục. Thưởng thức phim bộ có phụ đề tiếng Việt.";
    const imageUrl = show.poster_path
      ? `https://image.tmdb.org/t/p/w1280${show.poster_path}`
      : `${hostUrl}/1200x630.jpg`;

    return {
      title,
      description,
      keywords: [
        "phim bộ",
        show.name,
        "phim dài tập",
        "xem phim bộ",
        "phim bộ mới nhất",
        "phim truyền hình",
      ],
      openGraph: {
        title,
        description,
        type: "website",
        url: `${hostUrl}/phim-bo/${showId}`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: show.name,
          },
        ],
      },
    };
  } catch (error: unknown) {
    console.log("Error fetching TV show metadata:", error);
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
}

export default function ShowDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
