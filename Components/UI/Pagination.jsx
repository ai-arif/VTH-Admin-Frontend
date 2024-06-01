import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const delta = 2; // Number of pages to show around the current page
    const range = [];

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (range[0] > 2) {
      range.unshift("...");
    }
    if (range[range.length - 1] < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 && "disabled"}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            Previous
          </button>
        </li>
        {pageNumbers.map((number, index) =>
          number === "..." ? (
            <li key={index} className="page-item disabled">
              <span className="page-link">...</span>
            </li>
          ) : (
            <li key={index} className={`page-item ${currentPage === number && "active"}`}>
              <button className="page-link" onClick={() => onPageChange(number)}>
                {number}
              </button>
            </li>
          )
        )}
        <li className={`page-item ${currentPage === totalPages && "disabled"}`}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
