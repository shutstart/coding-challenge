export const insertMovieQuery = `INSERT INTO movie(name, description, year_of_release, date_of_release) VALUES($1, $2, $3, $4) RETURNING *`;
export const insertRatingQuery = `INSERT INTO rating(movie_id, value) VALUES($1, $2) RETURNING *`;
export const insertCommentQuery = `INSERT INTO comment(movie_id, value) VALUES($1, $2) RETURNING *`;
export const listMoviesQuery = `SELECT * FROM movie`;
export const listRatingsQuery = `SELECT * FROM rating`;
export const listCommentsQuery = `SELECT * FROM comment`;
export const getMovieQuery = `SELECT * FROM movie WHERE id = $1`;
export const deleteMovieQuery = `DELETE FROM movie WHERE id = $1`;
export const deleteCommentQuery = `DELETE FROM comment WHERE id = $1`;
