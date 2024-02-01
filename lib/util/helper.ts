import { GetMovieList, GetMovieRatings } from "./apiCall";
import { SetMovieList } from "./setters";

export const GetAndSetMovieList = async () => {
  const res = await GetMovieList().then((result) => SetMovieList(result));
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
