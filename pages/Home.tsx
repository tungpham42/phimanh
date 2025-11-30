"use client";

import { Container, Row, Col, Card, Button } from "react-bootstrap";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faFilm, faTv } from "@fortawesome/free-solid-svg-icons";

export default function HomePage() {
  return (
    <div className="bg-dark text-light">
      {/* Hero Section */}
      <div
        className="hero-section position-relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/banner.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "70vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Row>
            <Col lg={9} className="text-center text-lg-start">
              <h1 className="display-4 fw-bold mb-4">
                Khám phá thế giới điện ảnh
              </h1>
              <p className="lead mb-4 col-lg-9 col-md-12">
                Hàng ngàn bộ phim chất lượng cao đang chờ bạn khám phá. Xem mọi
                lúc, mọi nơi trên mọi thiết bị.
              </p>
              <Link href="/phim-le" passHref>
                <Button variant="danger" size="lg" className="me-3">
                  <FontAwesomeIcon icon={faPlay} className="me-2" />
                  Xem ngay
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Content Categories */}
      <Container className="py-5">
        <h2 className="text-center mb-5">Danh mục phim</h2>
        <Row className="justify-content-center g-4">
          <Col md={6} lg={4}>
            <Card className="h-100 shadow-lg bg-dark text-light">
              <Link href="/phim-le">
                <div
                  className="custom-card-image"
                  style={{
                    height: "200px",
                    backgroundImage: "url('/film.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </Link>
              <Card.Body className="d-flex flex-column">
                <Link href="/phim-le" passHref>
                  <Card.Title className="text-danger">
                    <FontAwesomeIcon icon={faFilm} className="me-2" />
                    Phim lẻ
                  </Card.Title>
                </Link>
                <Card.Text>
                  Tuyển tập các bộ phim lẻ hay nhất được cập nhật liên tục.
                </Card.Text>
                <Link href="/phim-le" passHref>
                  <Button variant="outline-danger" className="mt-auto">
                    Khám phá
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card className="h-100 shadow-lg bg-dark text-light">
              <Link href="/phim-bo" passHref>
                <div
                  className="custom-card-image"
                  style={{
                    height: "200px",
                    backgroundImage: "url('/tv.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </Link>
              <Card.Body className="d-flex flex-column">
                <Link href="/phim-bo" passHref>
                  <Card.Title className="text-danger">
                    <FontAwesomeIcon icon={faTv} className="me-2" />
                    Phim bộ
                  </Card.Title>
                </Link>
                <Card.Text>
                  Phim bộ đặc sắc từ Hàn Quốc, Trung Quốc, Việt Nam và hơn thế
                  nữa.
                </Card.Text>
                <Link href="/phim-bo" passHref>
                  <Button variant="outline-danger" className="mt-auto">
                    Khám phá
                  </Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
