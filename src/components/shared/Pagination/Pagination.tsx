import React, { useEffect } from "react";
import "./Pagination.scss";

interface PaginationPropsM {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
interface PaginationItemM {
  label: string;
  value: number;
  active: boolean;
}

export function PaginationC({ page, totalPages, onPageChange }: PaginationPropsM): JSX.Element {
  useEffect(() => {
    if (page > totalPages && totalPages > 0) onPageChange(totalPages);
  }, [totalPages]);

  function pages(): PaginationItemM[] {
    const pages: PaginationItemM[] = [{ label: "1", value: 1, active: page === 1 }];
    const from: number = page - 2 > 1 ? page - 2 : 2, to: number = page + 2 < totalPages ? page + 2 : totalPages - 1;
    if (from > 2) {
      pages.push({ label: "...", value: from - 1, active: false });
    }
    for (let i = from; i <= to; i++) {
      pages.push({ label: i.toString(), value: i, active: page === i });
    }
    if (to < totalPages - 1) {
      pages.push({ label: "...", value: to + 1, active: false });
    }
    if (totalPages > 1) {
      pages.push({ label: totalPages.toString(), value: totalPages, active: page === totalPages });
    }
    return pages;
  }

  return (
    <div className="pagination">
      {page > 0 && pages().map(p => (
        <button
          key={"pagination-" + p.value}
          className={p.active ? "active" : ""}
          onClick={() => onPageChange(p.value)}
        >
          {p.label}
        </button>
      ))}
    </div>
  );
}
