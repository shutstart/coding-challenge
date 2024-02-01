import { Movie } from "../types";

export const GetMovieList = async () => {
  const data = await fetch("/api/list-movies");
  const result = await data.json();
  return result;
};

export const GetMovieComments = async (movieId: number) => {
  const data = await fetch(`/api/list-comments?id=${movieId}`);
  const result = await data.json();
  return result;
};

export const GetMovieRatings = async (movieId: number) => {
  const data = await fetch(`/api/list-ratings?id=${movieId}`);
  const result = await data.json();
  return result;
};

export const PostComment = async (comment: string, movieId: number) => {
  const data = await fetch("/api/post-comment", {
    method: "POST",
    body: JSON.stringify({ comment: comment, movieId: movieId }),
  });
  const result = await data.json();
  return result;
};

export const DeleteComment = async (commentId: number) => {
  const data = await fetch(`/api/delete-comment?id=${commentId}`, {
    method: "DELETE",
  });
  const result = await data.json();
  return result;
};

export const AddRating = async (rating: number, movieId: number) => {
  const res = await fetch(`/api/add-rating`, {
    method: "POST",
    body: JSON.stringify({ rating: rating * 10, movieId: movieId }),
  });
  const data = await res.json();
  return data;
};

export const DeleteMovie = async (movieId: number) => {
  const res = await fetch(`/api/delete-movie?id=${movieId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

export const AddMovie = async (movie: Movie) => {
  const res = await fetch(`/api/add-movie`, {
    method: "POST",
    body: JSON.stringify(movie),
  });
  const data = await res.json();
  return data;
};
