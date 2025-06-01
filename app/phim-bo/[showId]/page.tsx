"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import {
  Container,
  Button,
  Spinner,
  Alert,
  Image,
  ListGroup,
  Accordion,
  Badge,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faListUl, faPlay } from "@fortawesome/free-solid-svg-icons";

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";

interface Episode {
  id: number;
  episode_number: number;
  name: string;
}

interface Season {
  id: number;
  season_number: number;
  episodes: Episode[];
}

interface TvShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  number_of_seasons: number;
  number_of_episodes: number;
  seasons: { season_number: number }[];
}

const ShowDetails = () => {
  const { showId } = useParams<{ showId: string }>();
  const [show, setShow] = useState<TvShow | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [seasons, setSeasons] = useState<Season[]>([]);

  const fetchShowDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${BASE_URL}/tv/${showId}`, {
        params: { api_key: API_KEY, language: "vi" },
      });
      setShow(response.data);

      const seasonPromises = response.data.seasons.map(
        (season: { season_number: number }) =>
          axios.get(`${BASE_URL}/tv/${showId}/season/${season.season_number}`, {
            params: { api_key: API_KEY, language: "vi" },
          })
      );

      const seasonResponses = await Promise.all(seasonPromises);
      setSeasons(seasonResponses.map((res: { data: Season }) => res.data));
    } catch (err: unknown) {
      setError("Lỗi tải chi tiết phim.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [showId]);

  useEffect(() => {
    fetchShowDetails();
  }, [fetchShowDetails]);

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

  if (!show) {
    return null;
  }

  return (
    <Container className="mt-4 col-lg-8">
      <div className="d-flex flex-column flex-md-row gap-4">
        <div className="flex-shrink-0">
          <Image
            src={
              show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : "/placeholder-poster.png"
            }
            alt={show.name}
            fluid
            className="rounded shadow-lg"
            style={{ maxHeight: "500px", objectFit: "cover" }}
          />
        </div>

        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-3 mb-3">
            <h1 className="mb-0">{show.name}</h1>
            <Badge bg="danger" className="fs-6">
              TV Series
            </Badge>
          </div>

          <p className="text-muted">{show.overview || "Không có mô tả."}</p>

          <div className="d-flex gap-3 mb-4">
            <Badge bg="secondary" className="fs-6">
              <FontAwesomeIcon icon={faListUl} className="me-2" />
              {show.number_of_seasons} Mùa
            </Badge>
            <Badge bg="secondary" className="fs-6">
              <FontAwesomeIcon icon={faPlay} className="me-2" />
              {show.number_of_episodes} Tập
            </Badge>
          </div>

          <Accordion className="mb-4" defaultActiveKey="0" alwaysOpen>
            {seasons.map((season) => (
              <Accordion.Item
                eventKey={season.season_number.toString()}
                key={season.id}
                className="bg-dark border-secondary"
              >
                <Accordion.Header className="bg-dark text-white">
                  <strong className="text-danger">
                    Mùa {season.season_number}
                  </strong>
                  <span className="ms-2 text-muted">
                    ({season.episodes.length} Tập)
                  </span>
                </Accordion.Header>
                <Accordion.Body className="p-0">
                  <ListGroup variant="flush">
                    {season.episodes.map((episode) => (
                      <ListGroup.Item
                        key={episode.id}
                        className="bg-dark border-secondary"
                      >
                        <Link
                          href={`/phim-bo/${showId}/xem/${season.season_number}/${episode.episode_number}`}
                          passHref
                          className="text-decoration-none"
                        >
                          <Button
                            variant="outline-danger"
                            className="w-100 text-start"
                          >
                            <FontAwesomeIcon icon={faPlay} className="me-2" />
                            Tập {episode.episode_number}: {episode.name}
                          </Button>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>

          <Link href="/phim-bo" passHref>
            <Button variant="outline-secondary" className="px-4">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Quay về danh sách phim
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default ShowDetails;
