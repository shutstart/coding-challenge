import conn from "@/lib/db";
import { insertRatingQuery } from "@/lib/queries";

// add rating to a movie

export async function POST(request: Request) {
  const body = await request.json();

  try {
    console.log("add rating request body", body);
    const result = await conn!.query(insertRatingQuery, [
      body.movieId,
      body.rating,
    ]);
    console.log("add movie query result", result);

    return new Response(
      JSON.stringify({ message: "Successfully added rating" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Failed to add movie; Error:${error}` }),
      {
        status: 500,
      }
    );
  }
}
