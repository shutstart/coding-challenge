import conn from "@/lib/db";
import { Rating } from "@/lib/types";
import { listRatingsQuery } from "@/lib/queries";

export async function GET(request: Request) {
  try {
    const id = request.url.split("?")[1].split("=")[1];
    let ratings: Rating[] = [];
    const result = await conn!.query(listRatingsQuery, [id]);
    result.rows.forEach((rating) => {
      ratings.push({
        id: rating.id,
        movieId: rating.movie_id,
        value: rating.value,
      });
    });

    return new Response(JSON.stringify(ratings), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify(
        JSON.stringify({
          message: `Failed to list movie ratings; Error:${error}`,
        })
      ),
      {
        status: 500,
      }
    );
  }
}
