export const insertMovieQuery = `INSERT INTO movie(name, description, image, release_year) VALUES($1, $2, $3, $4) RETURNING *`;
export const insertRatingQuery = `INSERT INTO rating(movie_id, value) VALUES($1, $2) RETURNING *`;
export const insertCommentQuery = `INSERT INTO comment(movie_id, value) VALUES($1, $2) RETURNING *`;
export const listMoviesQuery = `SELECT id,name,description,encode(image, 'base64'),release_year FROM movie`;
export const listRatingsQuery = `SELECT * FROM rating WHERE movie_id = $1`;
export const listCommentsQuery = `SELECT * FROM comment WHERE movie_id = $1 ORDER BY id DESC`;
export const getMovieQuery = `SELECT * FROM movie WHERE id = $1`;
export const deleteMovieQuery = `DELETE FROM movie WHERE id = $1`;
export const deleteCommentQuery = `DELETE FROM comment WHERE id = $1`;
