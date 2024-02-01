// Function to fetch the list of movies
export const GetMovieList = async () => {
  const data = await fetch("/api/list-movies");
  const result = await data.json();
  return result;
};

// Function to fetch comments for a specific movie
export const GetMovieComments = async (movieId: number) => {
  const data = await fetch(`/api/list-comments?id=${movieId}`);
  const result = await data.json();
  return result;
};

// Function to fetch ratings for a specific movie
export const GetMovieRatings = async (movieId: number) => {
  const data = await fetch(`/api/list-ratings?id=${movieId}`);
  const result = await data.json();
  return result;
};

// Function to post a comment for a specific movie
export const PostComment = async (comment: string, movieId: number) => {
  const data = await fetch("/api/post-comment", {
    method: "POST",
    body: JSON.stringify({ comment: comment, movieId: movieId }),
  });
  const result = await data.json();
  return result;
};

// Function to delete a comment by its ID
export const DeleteComment = async (commentId: number) => {
  const data = await fetch(`/api/delete-comment?id=${commentId}`, {
    method: "DELETE",
  });
  const result = await data.json();
  return result;
};

// Function to add a rating for a specific movie
export const AddRating = async (rating: number, movieId: number) => {
  const res = await fetch(`/api/add-rating`, {
    method: "POST",
    body: JSON.stringify({ rating: rating * 10, movieId: movieId }),
  });
  const data = await res.json();
  return data;
};

// Function to delete a movie by its ID
export const DeleteMovie = async (movieId: number) => {
  const res = await fetch(`/api/delete-movie?id=${movieId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

// Function to add a new movie with form data
export const AddMovie = async (movie: FormData) => {
  const res = await fetch(`/api/add-movie`, {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: JSON.stringify(movie),
  });
  const data = await res.json();
  return data;
};

// Function to add a movie to the wishlist
export const AddWishlistItem = async (movieId: number) => {
  const res = await fetch(`/api/add-wishlist-item`, {
    method: "POST",
    body: JSON.stringify({ movieId: movieId }),
  });
  const data = await res.json();
  return data;
};

// Function to remove a movie from the wishlist by its ID
export const RemoveWishlistItem = async (movieId: number) => {
  const res = await fetch(`/api/delete-wishlist-item?id=${movieId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};

// Function to fetch the wishlist
export const GetWishlist = async () => {
  const res = await fetch(`/api/list-wishlist`);
  const data = await res.json();
  return data;
};
