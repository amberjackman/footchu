import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${rating >= star ? "filled" : ""} ${
            hover >= star ? "hover" : ""
          }`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
