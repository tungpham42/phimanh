"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Form,
  Badge,
} from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faStar } from "@fortawesome/free-solid-svg-icons";
import DefaultPagination from "@/components/DefaultPagination";
import ShowSearch from "@/components/ShowSearch";

// Define TypeScript interfaces for the show data
interface Show {
  id: number;
  title: string;
  overview: string;
  poster_path?: string;
  vote_average: number;
  release_date?: string;
}

interface ApiResponse {
  results: Show[];
  total_pages: number;
}

// Environment variables
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/500x750/333333/555555?text=No+Poster";

const MovieList: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [originalLanguage, setOriginalLanguage] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const fetchMovies = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = originalLanguage
        ? "/discover/tv"
        : searchQuery
        ? "/search/movie"
        : "/trending/movie/day";
      const { data } = await axios.get<ApiResponse>(`${BASE_URL}${endpoint}`, {
        params: {
          api_key: API_KEY,
          page: currentPage,
          language: "vi",
          with_original_language: originalLanguage || "",
          query: searchQuery || "",
        },
      });
      setShows(data.results);
      setTotalPages(data.total_pages);
    } catch (err: unknown) {
      // Handle error with type checking
      const errorMessage =
        err instanceof Error ? err.message : "Lỗi không xác định";
      setError(`Lỗi tải dữ liệu: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  }, [currentPage, originalLanguage, searchQuery]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  }, []);

  const handleReset = useCallback(() => {
    setSearchQuery("");
    setOriginalLanguage("");
    setCurrentPage(1);
  }, []);

  return (
    <div className="bg-dark text-light py-4">
      <Container>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <FontAwesomeIcon icon={faFilm} className="me-2 text-danger" />
            Phim lẻ
          </h2>
        </div>

        <ShowSearch
          onSearch={handleSearch}
          onReset={handleReset}
          originalLanguage={originalLanguage}
        />

        <Form.Group className="mb-4">
          <Form.Label className="text-light">Chọn ngôn ngữ gốc</Form.Label>
          <Form.Select
            value={originalLanguage}
            onChange={(e) => {
              setOriginalLanguage(e.target.value);
              setSearchQuery("");
            }}
            className="bg-secondary text-light border-dark"
          >
            <option value="">Tất cả</option>
            <option value="vi">Tiếng Việt</option>
            <option value="zh">Tiếng Trung</option>
            <option value="en">Tiếng Anh</option>
            <option value="ja">Tiếng Nhật</option>
            <option value="ko">Tiếng Hàn</option>
            <option value="th">Tiếng Thái</option>
          </Form.Select>
        </Form.Group>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
          </div>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <Row className="g-4">
            {shows.map((show) => (
              <Col key={show.id} xl={3} lg={3} md={6}>
                <Card className="h-100 shadow-lg bg-secondary text-light">
                  <div
                    className="position-relative"
                    style={{
                      paddingTop: "150%",
                      backgroundImage: `url(${
                        show.poster_path
                          ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                          : PLACEHOLDER_IMAGE
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="position-absolute top-0 end-0 m-2">
                      <Badge bg="danger" pill>
                        <FontAwesomeIcon icon={faStar} className="me-1" />
                        {show.vote_average.toFixed(1)}
                      </Badge>
                    </div>
                  </div>
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="text-truncate">
                      {show.title}
                    </Card.Title>
                    <Card.Text className="text-muted small">
                      {show.release_date?.split("-")[0] || "N/A"}
                    </Card.Text>
                    <Card.Text className="mb-3">
                      {show.overview
                        ? `${show.overview.substring(0, 80)}...`
                        : "Không có mô tả."}
                    </Card.Text>
                    <Link
                      href={`/phim-le/xem/${show.id}`}
                      passHref
                      className="mt-auto"
                    >
                      <Button variant="danger" className="w-100">
                        <FontAwesomeIcon icon={faFilm} className="me-2" />
                        Xem chi tiết
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <DefaultPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
    </div>
  );
};

export default MovieList;
