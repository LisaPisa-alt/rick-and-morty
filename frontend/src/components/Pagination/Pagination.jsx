import React from "react";
import "./pagination.scss";

const Pagination = ({ pageNumber, setPageNumber, totalPages }) => {
  const goPrevious = () => {
    if (pageNumber > 1) setPageNumber((page) => page - 1);
  };
  const goNext = () => {
    if (pageNumber < totalPages) {
      setPageNumber((page) => page + 1);
    }
  };

  return (
    <div className="pagination-container">
      <button className="button" onClick={goPrevious}>
        Prev
      </button>
      <span className="page-info">
        Page {pageNumber} of {totalPages}
      </span>
      <button className="button" onClick={goNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
