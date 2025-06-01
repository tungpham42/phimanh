import type { Metadata } from "next";
import { ReactNode } from "react";
import axios from "axios";

// Define TypeScript interface for movie data
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

// Environment variables with type assertion
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d"!;
const BASE_URL = "https://api.themoviedb.org/3"!;
const BASE_DOMAIN = "https://thegioiphim.netlify.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ movieId: string }>;
}): Promise<Metadata> {
  const { movieId } = await params; // Await params to get movieId
  try {
    const response = await axios.get<Movie>(`${BASE_URL}/movie/${movieId}`, {
      params: { api_key: API_KEY, language: "vi" },
      timeout: 10000, // Add timeout for better error handling
    });
    const movie = response.data;

    const title = `${movie.title} | Xem Phim Lẻ Mới Nhất`;
    const description = movie.overview
      ? `${movie.overview.substring(0, 160)}...`
      : "Xem phim lẻ chất lượng cao, cập nhật liên tục. Thưởng thức phim lẻ từ nhiều quốc gia với phụ đề tiếng Việt.";

    return {
      title,
      description,
      keywords: [
        "phim lẻ",
        movie.title.toLowerCase(),
        "xem phim lẻ",
        "phim lẻ mới nhất",
        "phim truyền hình",
      ],
      openGraph: {
        title,
        description,
        type: "website",
        url: `${BASE_DOMAIN}/phim-le/xem/${movieId}`,
        images: [
          {
            url: `https://image.tmdb.org/t/p/w1280${
              movie.poster_path || "/1200x630.jpg"
            }`,
            width: 1200,
            height: 630,
            alt: `${movie.title} Poster`,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Error fetching movie metadata:", error);
    return {
      title: "Phim Lẻ | Xem Phim Lẻ Mới Nhất",
      description:
        "Tổng hợp phim lẻ hay, phim lẻ mới nhất, chất lượng HD, có phụ đề tiếng Việt.",
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
        url: `${BASE_DOMAIN}/phim-le`,
        images: [
          {
            url: `${BASE_DOMAIN}/1200x630.jpg`,
            width: 1200,
            height: 630,
            alt: "Phim Lẻ Mới Nhất",
          },
        ],
      },
    };
  }
}

export default function MovieDetailsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}
