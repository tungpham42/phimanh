"use client";

import Image from "next/image";
import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="py-3 text-white" style={{ backgroundColor: "#0a0a0a" }}>
      <Container>
        <Row className="text-center justify-content-center">
          <Col md="auto">
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/tmdb.svg" // Place this file in your /public folder
                alt="TMDB Logo"
                width={130}
                height={20}
                priority
              />
            </Link>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
