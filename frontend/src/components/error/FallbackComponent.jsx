import React from "react";
import PropTypes from "prop-types";
import "./FallbackComponent.scss";

const FallbackComponent = ({ error, resetErrorBoundary }) => {
  return (
    <div className="fallback">
      <h1 className="fallback__title">Oops! Something went wrong.</h1>
      <p className="fallback__message">{error.message}</p>
      <button className="fallback__button" onClick={resetErrorBoundary}>
        Try Again
      </button>
    </div>
  );
};

FallbackComponent.propTypes = {
  error: PropTypes.object.isRequired,
  resetErrorBoundary: PropTypes.func.isRequired,
};

export default FallbackComponent;
