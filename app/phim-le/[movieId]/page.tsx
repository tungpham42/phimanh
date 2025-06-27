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
  Badge,
} from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faClock,
  faCalendarAlt,
  faHome,
  faFilm,
} from "@fortawesome/free-solid-svg-icons";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  runtime: number;
  vote_average: number;
}

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";
const EMBED_URL = "https://seplayer.netlify.app";

const MovieInfo: React.FC<{ movie: Movie }> = ({ movie }) => (
  <div className="bg-dark rounded p-4 mb-4 shadow">
    <h4 className="text-danger mb-3">Thông Tin Phim</h4>
    <ListGroup variant="flush">
      <ListGroup.Item className="bg-dark text-white border-secondary">
        <FontAwesomeIcon icon={faCalendarAlt} className="me-2 text-danger" />
        <strong>Ngày phát hành:</strong> {movie.release_date || "N/A"}
      </ListGroup.Item>
      <ListGroup.Item className="bg-dark text-white border-secondary">
        <FontAwesomeIcon icon={faClock} className="me-2 text-danger" />
        <strong>Thời lượng:</strong>{" "}
        {movie.runtime ? `${movie.runtime} phút` : "N/A"}
      </ListGroup.Item>
      <ListGroup.Item className="bg-dark text-white border-secondary">
        <FontAwesomeIcon icon={faStar} className="me-2 text-warning" />
        <strong>Điểm đánh giá:</strong>{" "}
        {movie.vote_average ? `${movie.vote_average.toFixed(1)} / 10` : "N/A"}
      </ListGroup.Item>
    </ListGroup>
  </div>
);

const MoviePlayer: React.FC<{ movieId: string; title: string }> = ({
  movieId,
  title,
}) => (
  <div className="bg-dark rounded p-4 shadow mb-4">
    <h4 className="text-danger mb-3">Xem Phim</h4>
    <div className="ratio ratio-16x9">
      <iframe
        src={`${EMBED_URL}?video_id=${movieId}&tmdb=1`}
        allowFullScreen
        title={title}
        className="rounded shadow"
      />
    </div>
  </div>
);

const MovieDetails: React.FC = () => {
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
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  if (!movie) {
    return null;
  }

  return (
    <Container className="mt-4 col-lg-8">
      <div className="d-flex flex-column flex-md-row gap-4 mb-4">
        {movie.poster_path && (
          <div className="flex-shrink-0">
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fluid
              className="rounded shadow-lg"
              style={{ maxHeight: "500px", objectFit: "cover" }}
            />
          </div>
        )}

        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-3 mb-3">
            <h1 className="mb-0">{movie.title || "Không có tiêu đề"}</h1>
            <Badge bg="danger" className="fs-6">
              <FontAwesomeIcon icon={faFilm} className="me-2" />
              Phim lẻ
            </Badge>
          </div>

          <p className="text-muted">{movie.overview || "Không có mô tả."}</p>
        </div>
      </div>

      <MovieInfo movie={movie} />
      <MoviePlayer movieId={movieId} title={movie.title} />

      <div className="text-center">
        <Link href="/phim-le" passHref>
          <Button variant="outline-secondary" className="px-4">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Quay về trang chủ
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default MovieDetails;
