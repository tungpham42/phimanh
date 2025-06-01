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
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTv, faListUl } from "@fortawesome/free-solid-svg-icons";

// Environment variables
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";

// TypeScript interfaces for TMDB API response
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
    return <Spinner animation="border" className="d-block mx-auto mt-4" />;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!show) {
    return null;
  }

  return (
    <Container className="mt-4 col-md-6">
      <h2 className="mb-3">
        <FontAwesomeIcon icon={faTv} className="me-2" />
        {show.name}
      </h2>
      <p>{show.overview || "Không có mô tả."}</p>
      <Image
        src={
          show.poster_path
            ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : "https://dummyimage.com/260x200/cccccc/555555.png"
        }
        alt={show.name}
        fluid
        rounded
        className="mb-3"
      />

      {/* Seasons and Episodes Info */}
      <h4 className="mt-4">
        <FontAwesomeIcon icon={faListUl} className="me-2" /> Mùa & Tập
      </h4>
      <ListGroup className="mb-3">
        <ListGroup.Item>
          <strong>Số Mùa:</strong> {show.number_of_seasons}
        </ListGroup.Item>
        <ListGroup.Item>
          <strong>Số Tập:</strong> {show.number_of_episodes}
        </ListGroup.Item>
      </ListGroup>

      {/* Accordion to Show All Seasons and Episodes */}
      <Accordion className="mb-4">
        {seasons.map((season) => (
          <Accordion.Item
            eventKey={season.season_number.toString()}
            key={season.id}
          >
            <Accordion.Header>
              <strong>Mùa {season.season_number}</strong> (
              {season.episodes.length} Tập)
            </Accordion.Header>
            <Accordion.Body>
              <ListGroup>
                {season.episodes.map((episode) => (
                  <ListGroup.Item key={episode.id}>
                    <Link
                      href={`/phim-bo/${showId}/xem/${season.season_number}/${episode.episode_number}`}
                      passHref
                    >
                      <Button variant="outline-primary" size="sm">
                        <FontAwesomeIcon icon={faTv} className="me-2" />
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

      {/* Back to Home Button */}
      <Link href="/phim-bo">
        <Button variant="secondary" className="mb-5">
          <FontAwesomeIcon icon={faHome} className="me-2" /> Quay về danh sách
          phim
        </Button>
      </Link>
    </Container>
  );
};

export default ShowDetails;
