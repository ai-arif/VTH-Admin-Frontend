import React from "react";

const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center h-100 pt-5">
      <div class="spinner-border text-success" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
