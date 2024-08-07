import React from "react";
import "./StarRating.scss";

const StarRating = ({ rating, onRate }) => {
  const handleClick = (newRating) => {
    onRate(newRating * 2);
  };

  return (
    <div className="star-rating">
      {[...Array(5)].map((_, index) => {
        const starRating = index + 1;
        return (
          <span
            key={index}
            className={`star ${rating >= starRating * 2 ? "filled" : ""}`}
            onClick={() => handleClick(starRating)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
