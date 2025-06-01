"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faUndo,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

// Define environment variables as constants
const API_KEY = "fecb69b9d0ad64dbe0802939fafc338d";
const BASE_URL = "https://api.themoviedb.org/3";
const EMBED_URL = "https://thegioiphim.netlify.app/player.php";

// Define TypeScript interfaces for the API response data
interface Show {
  name?: string;
  number_of_seasons?: number;
}

const StreamPlayer: React.FC = () => {
  // Get dynamic route parameters using useParams from next/navigation
  const params = useParams();
  const showId = params.showId as string;
  const season = params.season as string;
  const episode = params.episode as string;

  // State with TypeScript types
  const [show, setShow] = useState<Show>({});
  const [totalEpisodes, setTotalEpisodes] = useState<number>(0);
  const [totalSeasons, setTotalSeasons] = useState<number>(0);

  // Construct embed URL
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
      }
    };

    fetchData();
  }, [showId, season]);

  return (
    <Container className="mt-4 text-center">
      <h2 className="mb-3">
        Phim &ldquo;{show.name || "Loading..."}&rdquo; - Tập {episode} (Mùa{" "}
        {season})
      </h2>

      <iframe
        src={embedUrl}
        width="100%"
        height="500px"
        allowFullScreen
        title={`Tập ${episode} Mùa ${season}`}
        style={{ border: "none" }}
      />

      {/* Navigation Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-3 mb-2">
        {Number(episode) > 1 && (
          <Link
            href={`/phim-bo/${showId}/xem/${season}/${Number(episode) - 1}`}
          >
            <Button variant="warning">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Tập trước
            </Button>
          </Link>
        )}
        {Number(episode) < totalEpisodes && (
          <Link
            href={`/phim-bo/${showId}/xem/${season}/${Number(episode) + 1}`}
          >
            <Button variant="primary">
              Tập sau
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Button>
          </Link>
        )}
        {Number(season) > 1 && (
          <Link href={`/phim-bo/${showId}/xem/${Number(season) - 1}/1`}>
            <Button variant="danger">
              <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
              Mùa trước
            </Button>
          </Link>
        )}
        {Number(season) < totalSeasons && (
          <Link href={`/phim-bo/${showId}/xem/${Number(season) + 1}/1`}>
            <Button variant="success">
              Mùa sau
              <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
            </Button>
          </Link>
        )}
      </div>

      {/* Back to Movie & Home Buttons */}
      <div className="d-flex justify-content-center gap-3 mt-3 mb-5">
        <Link href={`/phim-bo/${showId}`}>
          <Button variant="secondary">
            <FontAwesomeIcon icon={faUndo} className="me-2" />
            Quay về phim
          </Button>
        </Link>
        <Link href="/">
          <Button variant="secondary">
            <FontAwesomeIcon icon={faHome} className="me-2" />
            Quay về trang chủ
          </Button>
        </Link>
      </div>
    </Container>
  );
};

export default StreamPlayer;
