import React from "react";

interface PaginationPropsM {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function PaginationC(props: PaginationPropsM): JSX.Element {
  const { page, totalPages, onPageChange } = props;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return <div className="pagination">
    {pages.map(p => (
      <button
        key={p}
        className={`page-button ${p === page ? "active" : ""}`}
        onClick={() => onPageChange(p)}
      >
        {p}
      </button>
    ))}
  </div>;
}
