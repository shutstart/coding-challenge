import { useSelectedMovieStore } from "@/lib/store/state";
import { Movie } from "../../lib/types";
import StarRatings from "react-star-ratings";

import { useState } from "react";

export default function Card({ movie }: { movie: Movie }) {
  const isSelected = useSelectedMovieStore((state) => state.id === movie.id);
  const [rating, setRating] = useState(0);
  const deleteComment = async (id: number) => {
    const res = await fetch(`/api/delete-comment?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data) return alert("Something went wrong");
  };
  const handleRating = async (rate: number) => {
    setRating(rate);
    console.log(rate);
    // other logic
    const res = await fetch(`/api/add-rating`, {
      method: "POST",
      body: JSON.stringify({ rating: rate * 10, movieId: movie.id }),
    });
    const data = await res.json();
    console.log(data);
  };
  function selectMovie() {
    useSelectedMovieStore.setState({ id: movie.id });
  }

  async function addComment(formData: FormData) {
    const comment = formData.get("comment");
    const res = await fetch(`/api/post-comment`, {
      method: "POST",
      body: JSON.stringify({ comment, movieId: movie.id }),
    });
    const data = await res.json();
    if (!data) return alert("Something went wrong");
  }
  async function deleteMovie(id: number) {
    const res = await fetch(`/api/delete-movie?id=${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data) return alert("Something went wrong");
  }
  return (
    <>
      <div
        className={`rounded overflow-hidden shadow-lg w-full ${
          isSelected ? "col-span-12" : "col-span-3"
        }`}
        onClick={selectMovie}
      >
        {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{movie.title}</div>
          <p className="text-gray-700 text-base">{movie.description}</p>
        </div>
        <div className="px-6 pt-4 pb-2">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            {movie.releaseYear}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Comments: {movie.comments?.length ?? 0}
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            Rating: {movie.rating ?? 0} / 5
          </span>
          <button
            onClick={() => deleteMovie(movie.id!)}
            className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            Delete Movie
          </button>
        </div>
        <div className={`${isSelected ? "block" : "hidden"}`}>
          <div className="flex flex-row">
            <StarRatings
              rating={rating}
              starRatedColor="blue"
              changeRating={handleRating}
              name="rating"
            />
          </div>

          <h1 className="text-3xl font-bold">Comments</h1>
          <form action={addComment}>
            <input type="text" placeholder="Add Comment" name="comment" />
            <button type="submit" className="bg-gray-400 p-2">
              Add Comment
            </button>
          </form>
          {movie.comments?.map((comment) => {
            return (
              <div className="flex" key={comment.id}>
                <li> {String(comment.value)} </li>
                <button
                  onClick={() => deleteComment(comment.id!)}
                  className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  DELETE COMMENT
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
