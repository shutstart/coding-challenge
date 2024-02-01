import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function Rating({
  movieRating,
  handleRating,
}: {
  movieRating: number;
  handleRating: (rating: number) => void;
}) {
  const [rating, setRating] = useState(1);
  const [hover, setHover] = useState(0);
  const [totalStars, setTotalStars] = useState(1);
  return (
    <div className=" bg-gray-300/20">
      <div
        className="flex py-1 px-1 cursor-default"
        onMouseEnter={() => {
          setTotalStars(5);
          setRating(movieRating ?? 0);
        }}
        onMouseLeave={() => {
          setTotalStars(1);
          setRating(1);
        }}
      >
        {[...Array(totalStars)].map((star, index) => {
          const currentRating = index + 1;

          return (
            <div className="my-auto " key={index}>
              <label key={index}>
                <input
                  key={star}
                  type="radio"
                  name="rating"
                  className="hidden "
                  value={currentRating}
                  onChange={() => {
                    handleRating(currentRating);
                  }}
                />
                <span
                  className="star cursor-pointer"
                  style={{
                    color:
                      currentRating <= (hover || rating)
                        ? "#ffc107"
                        : "#e4e5e9",
                  }}
                  onMouseEnter={() => setHover(currentRating)}
                  onMouseLeave={() => setHover(0)}
                >
                  <FaStar className="flex my-auto mr-2" />
                </span>
              </label>
            </div>
          );
        })}

        <div className="ml-auto">{movieRating ?? 0}</div>
      </div>
    </div>
  );
}
