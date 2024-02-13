import React from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";

const StarRating = ({ reviewCount }) => {
  const maxStars = 5;
  const roundedCount = Math.round(reviewCount * 2) / 2;
  const starArray = Array.from({ length: maxStars }, (_, index) => {
    if (index < roundedCount) {
      if (index + 1 < roundedCount) {
        return <FaStar key={index} className="text-yellow-500" />; // Full star
      } else if (roundedCount % 1 !== 0) {
        return <FaStarHalf key={index} className="text-yellow-500" />; // Half star for non-whole numbers
      } else {
        return <FaStar key={index} className="text-yellow-500" />; // Full star for whole numbers
      }
    } else {
      return null; // Empty star
    }
  });

  return <div className="flex items-center justify-center w-full h-auto gap-2">{starArray}</div>;
};

export default StarRating;