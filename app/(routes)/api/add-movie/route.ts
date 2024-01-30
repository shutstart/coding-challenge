import conn from "@/lib/db";
import { insertMovieQuery } from "@/lib/queries";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    console.log("add movie request body", body);
    const result = await conn!.query(insertMovieQuery, [
      body.title,
      body.description,
      body.releaseYear,
      body.releaseDate,
    ]);
    console.log("add movie query result", result);

    return new Response(
      JSON.stringify({ message: "Successfully added movie" }),
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
