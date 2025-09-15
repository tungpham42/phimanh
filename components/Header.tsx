"use client";

import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const pathname = usePathname();

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="border-bottom border-danger"
    >
      <Container>
        <Link
          href="/"
          className="d-flex align-items-center"
          style={{ textDecoration: "none" }}
        >
          <Navbar.Brand as="div">
            <span className="text-danger fw-bold">PHIM</span>
            <span className="text-light ms-1">ẢNH</span>
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link href="/" style={{ textDecoration: "none" }}>
              <Nav.Link
                as="span"
                active={pathname === "/"}
                className={`mx-2 ${
                  pathname === "/" ? "text-danger fw-bold" : "text-light"
                }`}
              >
                Trang chủ
              </Nav.Link>
            </Link>
            <Link href="/phim-le" style={{ textDecoration: "none" }}>
              <Nav.Link
                as="span"
                active={pathname === "/phim-le"}
                className={`mx-2 ${
                  pathname === "/phim-le" ? "text-danger fw-bold" : "text-light"
                }`}
              >
                Phim lẻ
              </Nav.Link>
            </Link>
            <Link href="/phim-bo" style={{ textDecoration: "none" }}>
              <Nav.Link
                as="span"
                active={pathname === "/phim-bo"}
                className={`mx-2 ${
                  pathname === "/phim-bo" ? "text-danger fw-bold" : "text-light"
                }`}
              >
                Phim bộ
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
