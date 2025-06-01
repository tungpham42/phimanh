"use client";

import { useState, useEffect, useCallback, FormEvent } from "react";
import { Col, Form, Button, Spinner, Row, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUndo } from "@fortawesome/free-solid-svg-icons";

interface ShowSearchProps {
  onSearch: (query: string) => void;
  onReset: () => void;
  originalLanguage: string;
}

const ShowSearch: React.FC<ShowSearchProps> = ({
  onSearch,
  onReset,
  originalLanguage,
}) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback(() => {
    if (query.trim()) {
      setLoading(true);
      onSearch(query.trim());
      setTimeout(() => setLoading(false), 1500);
    }
  }, [query, onSearch]);

  const handleReset = useCallback(() => {
    setQuery("");
    setLoading(false);
    onReset();
  }, [onReset]);

  useEffect(() => {
    setQuery("");
  }, [originalLanguage]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <Row className="align-items-center mb-4">
      <Col lg={10} md={9} sm={12} className="mb-2 mb-md-0">
        <Form onSubmit={handleSubmit}>
          <InputGroup className="shadow-sm">
            <Form.Control
              type="text"
              placeholder="Tìm kiếm phim bộ..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-secondary text-light border-dark"
            />
            <Button variant="danger" type="submit" disabled={loading}>
              <FontAwesomeIcon icon={faSearch} />
            </Button>
          </InputGroup>
        </Form>
      </Col>
      <Col lg={2} md={3} sm={12} className="d-flex justify-content-end">
        <Button
          variant="outline-secondary"
          onClick={handleReset}
          disabled={loading}
          className="shadow-sm"
        >
          {loading ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : (
            <FontAwesomeIcon icon={faUndo} className="me-2" />
          )}
          {loading ? "Đang xử lý" : "Làm mới"}
        </Button>
      </Col>
    </Row>
  );
};

export default ShowSearch;
