import conn from "@/lib/db";
import { Movie } from "@/lib/types";
import { listMoviesQuery, listWishlistQuery } from "@/lib/queries";

export async function GET() {
  try {
    const result = await conn!.query(listWishlistQuery);
    let movies: Movie[] = [];

    result.rows.forEach((movie) => {
      console.log("movie", movie);
      movies.push({
        id: movie.id,
        title: movie.name,
        description: movie.description,
        releaseYear: movie.release_year,
        image: "data:image/png;base64," + movie.encode,
      });
    });

    return new Response(JSON.stringify(movies), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify(
        JSON.stringify({ message: `Failed to list movies; Error:${error}` })
      ),
      {
        status: 500,
      }
    );
  }
}
