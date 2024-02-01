// SQL queries for inserting movie, rating, comment, and wishlist data into the database
export const insertMovieQuery = `INSERT INTO movie(name, description, image, release_year) VALUES($1, $2, $3, $4) RETURNING *`;
export const insertRatingQuery = `INSERT INTO rating(movie_id, value) VALUES($1, $2) RETURNING *`;
export const insertCommentQuery = `INSERT INTO comment(movie_id, value) VALUES($1, $2) RETURNING *`;
export const insertWishlistQuery = `INSERT INTO wish_list(movie_id) VALUES($1) RETURNING *`;

// SQL query for retrieving a list of movies from the database
export const listMoviesQuery = `SELECT id, name, description, encode(image, 'base64'), release_year FROM movie`;

// SQL query for retrieving a list of ratings for a specific movie from the database
export const listRatingsQuery = `SELECT * FROM rating WHERE movie_id = $1`;

// SQL query for retrieving a list of comments for a specific movie from the database, ordered by ID in descending order
export const listCommentsQuery = `SELECT * FROM comment WHERE movie_id = $1 ORDER BY id DESC`;

// SQL query for retrieving a list of wishlist items with corresponding movie details from the database
export const listWishlistQuery = `SELECT m.id, m.name, encode(image, 'base64'), m.release_year, m.description FROM movie m JOIN wish_list w ON m.id = w.movie_id;`;

// SQL query for retrieving details of a specific movie from the database
export const getMovieQuery = `SELECT * FROM movie WHERE id = $1`;

// SQL query for deleting a movie from the database based on its ID
export const deleteMovieQuery = `DELETE FROM movie WHERE id = $1`;

// SQL query for deleting a comment from the database based on its ID
export const deleteCommentQuery = `DELETE FROM comment WHERE id = $1`;

// SQL query for deleting a movie from the wishlist based on movie ID
export const deleteWishlistQuery = `DELETE FROM wish_list WHERE movie_id = $1`;
