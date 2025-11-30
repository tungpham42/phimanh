"use client";

import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Link from "next/link";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTv, faStar, faPlay } from "@fortawesome/free-solid-svg-icons";
import DefaultPagination from "@/components/DefaultPagination";
import ShowSearch from "@/components/ShowSearch";

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/500x750/333333/555555?text=No+Poster";

interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  first_air_date?: string;
}

const ShowList = () => {
  const [shows, setShows] = useState<TvShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [originalLanguage, setOriginalLanguage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTvShows = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = originalLanguage
        ? "/discover/tv"
        : searchQuery
          ? "/search/tv"
          : "/trending/tv/day";
      const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
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
      setError(`Lỗi tải dữ liệu: ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  }, [currentPage, originalLanguage, searchQuery]);

  useEffect(() => {
    fetchTvShows();
  }, [fetchTvShows]);

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
        {/* Header Section */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <FontAwesomeIcon icon={faTv} className="me-2 text-danger" />
            Phim bộ
          </h2>
        </div>

        {/* Search and Filter Section */}
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" variant="danger" />
            <p className="mt-2">Đang tải dữ liệu...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <Alert variant="danger" className="text-center">
            {error}
          </Alert>
        )}

        {/* Show Grid */}
        {!loading && !error && (
          <Row className="g-4">
            {shows.map((show) => (
              <Col key={show.id} xl={3} lg={3} md={6}>
                <Card className="h-100 shadow bg-dark text-light transition-all hover-scale">
                  {/* Poster Image with Rating */}
                  <Link href={`/phim-bo/${show.id}`} passHref>
                    <div
                      className="position-relative overflow-hidden"
                      style={{ paddingTop: "150%" }}
                    >
                      <div
                        className="position-absolute top-0 start-0 w-100 h-100 bg-dark"
                        style={{
                          backgroundImage: `url(${show.poster_path
                            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                            : PLACEHOLDER_IMAGE
                            })`,
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                          transition: "transform 0.3s ease",
                        }}
                      />
                      <div className="position-absolute top-0 end-0 m-2">
                        <Badge bg="danger" pill>
                          <FontAwesomeIcon icon={faStar} className="me-1" />
                          {show.vote_average.toFixed(1)}
                        </Badge>
                      </div>
                    </div>
                  </Link>

                  {/* Show Info */}
                  <Card.Body className="d-flex flex-column">
                    <Link href={`/phim-bo/${show.id}`} passHref>
                      <Card.Title
                        className="text-truncate text-danger mb-2"
                        style={{ textDecoration: "none", fontSize: "1.5rem" }}
                      >
                        {show.name.substring(0, 80)}...
                      </Card.Title>
                    </Link>
                    <Card.Text className="text-muted small mb-2">
                      {show.first_air_date?.split("-")[0] || "N/A"}
                    </Card.Text>
                    <Card.Text className="small">
                      {show.overview
                        ? `${show.overview.substring(0, 80)}...`
                        : "Không có mô tả."}
                    </Card.Text>
                    <Link
                      href={`/phim-bo/${show.id}`}
                      className="mt-auto"
                      passHref
                    >
                      <Button variant="danger" size="sm" className="w-100">
                        <FontAwesomeIcon icon={faPlay} className="me-2" />
                        Xem chi tiết
                      </Button>
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* Pagination */}
        {!loading && !error && shows.length > 0 && (
          <div className="mt-5">
            <DefaultPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </Container>
    </div >
  );
};

export default ShowList;
