"use client";

import { Icons } from "./icons";
import { useState } from "react";

interface Props {
  totalStars?: number;
  onRate?: (rating: number) => void;
}

export const Rating = ({ totalStars = 5, onRate }: Props) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);

  const handleClick = (rating: number) => {
    setRating(rating);
    if (onRate) {
      onRate(rating);
    }
  };

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <button
            key={i}
            className="focus:outline-none ml-[2px]"
            onClick={() => handleClick(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
          >
            <Icons.star
              fill={
                ratingValue <= rating
                  ? "#D78B07"
                  : ratingValue <= hover
                  ? "#EAC482"
                  : "#CCCCCC"
              }
            />
          </button>
        );
      })}
    </div>
  );
};
