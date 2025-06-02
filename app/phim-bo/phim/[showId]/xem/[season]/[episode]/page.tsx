"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Container, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUndo,
  faHome,
  faTv,
} from "@fortawesome/free-solid-svg-icons";

const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";
const EMBED_URL = "https://seplayer.netlify.app";

interface Show {
  name?: string;
  number_of_seasons?: number;
}

const StreamPlayer: React.FC = () => {
  const params = useParams();
  const showId = params.showId as string;
  const season = params.season as string;
  const episode = params.episode as string;

  const [show, setShow] = useState<Show>({});
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0);
  const [totalSeasons, setTotalSeasons] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const embedUrl = `${EMBED_URL}?video_id=${showId}&tmdb=1&s=${season}&e=${episode}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [showRes, seasonRes] = await Promise.all([
          axios.get(`${BASE_URL}/tv/${showId}`, {
            params: { api_key: API_KEY, language: "vi" },
          }),
          axios.get(`${BASE_URL}/tv/${showId}/season/${season}`, {
            params: { api_key: API_KEY, language: "vi" },
          }),
        ]);

        setShow(showRes.data);
        setTotalSeasons(showRes.data.number_of_seasons || 0);
        setTotalEpisodes(seasonRes.data.episodes?.length || 0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [showId, season]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="danger" />
      </div>
    );
  }

  return (
    <Container className="mt-4">
      <div className="bg-dark rounded p-4 shadow-lg mb-4">
        <h2 className="text-center mb-4">
          <FontAwesomeIcon icon={faTv} className="me-2 text-danger" />
          {show.name || "Loading..."} - Tập {episode} (Mùa {season})
        </h2>

        <div className="ratio ratio-16x9 mb-4">
          <iframe
            src={embedUrl}
            allowFullScreen
            title={`Tập ${episode} Mùa ${season}`}
            className="rounded shadow"
          />
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3 mb-2">
          {Number(episode) > 1 && (
            <Link
              href={`/phim-bo/phim/${showId}/xem/${season}/${Number(episode) - 1}`}
              passHref
            >
              <Button variant="outline-danger">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Tập trước
              </Button>
            </Link>
          )}
          {Number(episode) < totalEpisodes && (
            <Link
              href={`/phim-bo/phim/${showId}/xem/${season}/${Number(episode) + 1}`}
              passHref
            >
              <Button variant="danger">
                Tập sau
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </Link>
          )}
          {Number(season) > 1 && (
            <Link
              href={`/phim-bo/phim/${showId}/xem/${Number(season) - 1}/1`}
              passHref
            >
              <Button variant="outline-warning">
                <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
                Mùa trước
              </Button>
            </Link>
          )}
          {Number(season) < totalSeasons && (
            <Link
              href={`/phim-bo/phim/${showId}/xem/${Number(season) + 1}/1`}
              passHref
            >
              <Button variant="warning">
                Mùa sau
                <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
              </Button>
            </Link>
          )}
        </div>

        <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
          <Link href={`/phim-bo/phim/${showId}`} passHref>
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faUndo} className="me-2" />
              Quay về phim
            </Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="outline-secondary">
              <FontAwesomeIcon icon={faHome} className="me-2" />
              Trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default StreamPlayer;
