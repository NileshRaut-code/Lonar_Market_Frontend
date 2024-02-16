import React from "react";

const StarRating = ({ rating }) => {
  const stars = [];

  // Fill stars array based on rating value
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      // Fill yellow stars for rated values
      stars.push(
        <span key={i} style={{ color: "gold" }}>
          ★
        </span>
      );
    } else {
      // Fill empty stars for unrated values
      stars.push(<span key={i}>★</span>);
    }
  }

  return <div>{stars}</div>;
};

export default StarRating;
