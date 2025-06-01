"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Container,
  Button,
  Spinner,
  Alert,
  Image,
  ListGroup,
} from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faCalendarAlt,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

// Define TypeScript interface for movie data
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
}

// Environment variables with type assertion
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d"!;
const BASE_URL = "https://api.themoviedb.org/3"!;
const EMBED_URL = "https://thegioiphim.netlify.app/player.js"!;

// Reusable component for movie information
const MovieInfo: React.FC<{ movie: Movie }> = ({ movie }) => (
  <>
    <h4 className="mt-4">Thông Tin Phim</h4>
    <ListGroup className="mb-3">
      <ListGroup.Item>
        <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
        <strong>Ngày phát hành:</strong> {movie.release_date || "N/A"}
      </ListGroup.Item>
      <ListGroup.Item>
        <FontAwesomeIcon icon={faClock} className="me-2" />
        <strong>Thời lượng:</strong>{" "}
        {movie.runtime ? `${movie.runtime} phút` : "N/A"}
      </ListGroup.Item>
      <ListGroup.Item>
        <FontAwesomeIcon icon={faStar} className="me-2 text-warning" />
        <strong>Điểm đánh giá:</strong>{" "}
        {movie.vote_average ? `${movie.vote_average} / 10` : "N/A"}
      </ListGroup.Item>
    </ListGroup>
  </>
);

// Reusable component for movie player
const MoviePlayer: React.FC<{ movieId: string; title: string }> = ({
  movieId,
  title,
}) => (
  <div className="mb-4">
    <h4>Xem Phim</h4>
    <iframe
      src={`${EMBED_URL}?video_id=${movieId}&tmdb=1`}
      width="100%"
      height="500px"
      allowFullScreen
      title={title}
      className="rounded"
    ></iframe>
  </div>
);

const ShowDetails: React.FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovieDetails = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<Movie>(`${BASE_URL}/movie/${movieId}`, {
        params: { api_key: API_KEY, language: "vi" },
        timeout: 10000,
      });
      setMovie(response.data);
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.status === 404
          ? "Phim không được tìm thấy."
          : "Lỗi tải chi tiết phim. Vui lòng thử lại sau."
        : "Lỗi không xác định.";
      setError(errorMessage);
      console.error("Error fetching movie details:", err);
    } finally {
      setLoading(false);
    }
  }, [movieId]);

  useEffect(() => {
    if (movieId) {
      fetchMovieDetails();
    }
  }, [fetchMovieDetails, movieId]);

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Container className="mt-4 col-md-8">
      <h2 className="mb-3">{movie.title || "Không có tiêu đề"}</h2>
      <p>{movie.overview || "Không có mô tả."}</p>
      {movie.poster_path && (
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          fluid
          rounded
          className="mb-3"
        />
      )}

      <MovieInfo movie={movie} />
      <MoviePlayer movieId={movieId} title={movie.title} />

      <Link href="/phim-le">
        <Button variant="secondary" className="mb-5">
          <FontAwesomeIcon icon={faHome} className="me-2" />
          Quay về trang chủ
        </Button>
      </Link>
    </Container>
  );
};

export default ShowDetails;
