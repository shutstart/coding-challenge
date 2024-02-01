import {
  useSelectedModalStore,
  useSelectedMovieStore,
} from "@/lib/store/state";
import { Movie } from "../../lib/types";
import staticImage from "../../public/preview-1.jpg";
import { FaStar } from "react-icons/fa";

import { useEffect, useState } from "react";
import {
  AddRating,
  DeleteComment,
  DeleteMovie,
  PostComment,
} from "@/lib/util/apiCall";
import { GetAndSetMovieList, GetNumericMovieRating } from "@/lib/util/helper";
import Image from "next/image";
import { MessageSquareText, Trash2 } from "lucide-react";
import { OpenModal } from "@/lib/util/setters";
import Rating from "./ratingComponent";

export default function Card({ movie }: { movie: Movie }) {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    GetNumericMovieRating(movie.id!).then((rating) => {
      setRating(rating ?? 0);
    });
  });

  const handleRating = async (rate: number) => {
    // other logic
    const data = await AddRating(rate, movie.id!);
    console.log(data);
    if (!data) {
      // TODO: Handle error
    }
    GetNumericMovieRating(movie.id!).then((rating) => {
      setRating(rating ?? 0);
    });
  };
  function selectMovie() {
    useSelectedMovieStore.setState({ id: movie.id });
  }

  async function addComment(formData: FormData) {
    const comment = formData.get("comment");
    const data = await PostComment(String(comment), movie.id!);
    if (!data) return alert("Something went wrong");
  }

  async function handleDeleteMovie() {
    const data = await DeleteMovie(movie.id!);
    if (!data) return alert("Something went wrong");
    GetAndSetMovieList();
  }
  return (
    <>
      {/* <div
        className={`rounded overflow-hidden shadow-lg w-full col-span-4`}
        onClick={selectMovie}
      > */}
      {/* <img
          className="w-full"
          src={movie.image}
          alt="Sunset in the mountains"
        /> */}
      {/* <div className="px-6 py-4">
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
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteMovie();
            }}
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
                  onClick={() => handleDeleteComment(comment.id!)}
                  className="inline-block bg-red-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  DELETE COMMENT
                </button>
              </div>
            );
          })}
        </div>
      </div> */}

      <div className="col-span-12 md:col-span-6  flex flex-col  bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-50/50 ">
        <Image
          priority
          className="object-cover w-full rounded-t-lg h-64 md:w-48 md:rounded-none md:rounded-s-lg"
          src={staticImage}
          alt=""
        />
        <div className="flex flex-col p-4 leading-normal w-full">
          <div className="text-2xl font-bold tracking-tight text-gray-900 ">
            {movie.title}
          </div>

          <p className="text-sm font-medium text-gray-500">
            {movie.releaseYear}
          </p>
          <div className="mt-3 font-normal text-gray-700">
            {movie.description}
          </div>
          <div className="mt-auto flex w-full ">
            {/* <div className=" bg-gray-300/20">
              <div
                className="flex py-1 px-1 cursor-default"
                onMouseEnter={() => {
                  setTotalStars(5);
                  setRating(movie.rating ?? 0);
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
                            setRating(currentRating);
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

                <div className="ml-auto">{movie.rating ?? 0}</div>
              </div>
            </div> */}
            <Rating movieRating={rating} handleRating={handleRating} />

            <div className="ml-auto flex">
              <MessageSquareText
                className="mr-6 hover:text-blue-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  selectMovie();
                  useSelectedModalStore.getState().setViewMovie();
                  OpenModal();
                }}
              />
              <Trash2
                className="hover:text-red-600 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMovie();
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
