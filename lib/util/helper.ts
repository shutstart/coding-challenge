import { useWishlistStore } from "../store/state";
import { Movie } from "../types";
import { GetMovieList, GetMovieRatings, GetWishlist } from "./apiCall";
import { SetMovieList, SetWishlist } from "./setters";

// gets the movie list from the database and sets it in the store
export const GetAndSetMovieList = async () => {
  const res = await GetMovieList().then((result) => SetMovieList(result));
  return res;
};

// gets the wishlist form the database and sets it in the store
export const GetAndSetWishList = async () => {
  const res = await GetWishlist().then((result) => SetWishlist(result));
  return res;
};

// helper for getting the numeric rating of a movie
export const GetNumericMovieRating = async (movieId: number) => {
  const movieRatings = await GetMovieRatings(movieId);
  let total = 0;
  movieRatings.forEach((rating: any) => {
    total += rating.value;
  });
  const numericMovieRating =
    movieRatings.length === 0 ? 0 : total / movieRatings.length / 10;
  const precisionMovieRating = numericMovieRating.toPrecision(2);
  const numericPrecisionMovieRating = parseFloat(precisionMovieRating);
  return numericPrecisionMovieRating;
};

// helper for checking if a movie is in the wishlist
export const IsInWishlist = (movieId: number) => {
  const wishlist = useWishlistStore.getState().wishlist;
  const movieIds = wishlist.map((movie) => {
    console.log(movie);
    return movie.id;
  });
  console.log(movieIds);
  return movieIds.includes(movieId);
};
