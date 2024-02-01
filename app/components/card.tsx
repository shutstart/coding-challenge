import {
  useSelectedModalStore,
  useSelectedMovieStore,
} from "@/lib/store/state";
import { Movie } from "../../lib/types";
import staticImage from "../../public/preview-1.jpg";
import { useEffect, useState } from "react";
import {
  AddRating,
  AddWishlistItem,
  DeleteMovie,
  GetWishlist,
  RemoveWishlistItem,
} from "@/lib/util/apiCall";
import {
  GetAndSetMovieList,
  GetNumericMovieRating,
  IsInWishlist,
} from "@/lib/util/helper";
import Image from "next/image";
import { MessageSquareText, Trash2, Heart } from "lucide-react";
import { OpenModal } from "@/lib/util/setters";
import Rating from "./ratingComponent";

export default function Card({
  movie,
  isWishList = false,
}: {
  movie: Movie;
  isWishList?: boolean;
}) {
  const [rating, setRating] = useState(0);

  const [isWishListed, setIsWishListed] = useState(false);
  useEffect(() => {
    GetNumericMovieRating(movie.id!).then((rating) => {
      setRating(rating ?? 0);
      GetWishlist().then((data: Movie[]) => {
        console.log("wishlist", data);
        setIsWishListed(IsInWishlist(data, movie.id!));
      });
    });
  }, []);

  const handleHeartClick = async () => {
    if (isWishListed) {
      const data = await RemoveWishlistItem(movie.id!);
      if (!data) {
        // TODO: Handle error
      }
    } else {
      const data = await AddWishlistItem(movie.id!);
      if (!data) {
        // TODO: Handle error
      }
    }
    GetWishlist().then((d) => {
      setIsWishListed(IsInWishlist(d, movie.id!));
    });
  };

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

  async function handleDeleteMovie() {
    const data = await DeleteMovie(movie.id!);
    if (!data) return alert("Something went wrong");
    GetAndSetMovieList();
  }
  return (
    <>
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
            <Rating movieRating={rating} handleRating={handleRating} />

            <div className="ml-auto flex">
              <Heart
                className={`mr-6 hover:fill-black cursor-pointer ${
                  isWishListed ? "fill-black" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleHeartClick();
                }}
              />

              <MessageSquareText
                className={`mr-6 hover:text-blue-600 cursor-pointer ${
                  isWishList ? "hidden" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  selectMovie();
                  useSelectedModalStore.getState().setViewMovie();
                  OpenModal();
                }}
              />
              <Trash2
                className={`hover:text-red-600 cursor-pointer ${
                  isWishList ? "hidden" : ""
                }`}
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
