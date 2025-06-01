"use client";

import React, { useMemo } from "react";
import { Pagination } from "react-bootstrap";

interface DefaultPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const DefaultPagination: React.FC<DefaultPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const visiblePages = 5;

  const pages = useMemo(() => {
    const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const endPage = Math.min(totalPages, startPage + visiblePages - 1);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <Pagination className="mt-5 justify-content-center">
      <Pagination.First
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="bg-dark border-dark text-light"
      />
      <Pagination.Prev
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="bg-dark border-dark text-light"
      />
      {pages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => onPageChange(page)}
          className={
            page === currentPage
              ? "bg-danger border-danger"
              : "bg-dark border-dark text-light"
          }
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="bg-dark border-dark text-light"
      />
      <Pagination.Last
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="bg-dark border-dark text-light"
      />
    </Pagination>
  );
};

export default DefaultPagination;
