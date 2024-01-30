import conn from "@/lib/db";
import { Movie } from "@/lib/types";
import {
  listCommentsQuery,
  listMoviesQuery,
  listRatingsQuery,
} from "@/lib/queries";

export async function GET() {
  try {
    const result = await conn!.query(listMoviesQuery);
    let movies: Movie[] = [];
    const comments = await conn!.query(listCommentsQuery);
    const ratings = await conn!.query(listRatingsQuery);
    result.rows.forEach((movie) => {
      console.log("movie", movie);
      const movieComment = comments.rows.filter((comment) => {
        return comment.movie_id === movie.id;
      });
      let totalRating = 0;
      const movieRating = ratings.rows.filter((rating) => {
        if (rating.movie_id === movie.id) {
          totalRating += rating.value;
        }
        return rating.movie_id === movie.id;
      });

      movies.push({
        id: movie.id,
        title: movie.name,
        description: movie.description,
        releaseDate: movie.date_of_release,
        releaseYear: movie.year_of_release,
        comments: movieComment,
        rating:
          movieRating.length === 0 ? 0 : totalRating / movieRating.length / 10,
      });
    });
    console.log("movies to be returned", movies);
    return new Response(JSON.stringify(movies), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify(`Failed to list movies; Error:${error}`),
      {
        status: 500,
      }
    );
  }
}
