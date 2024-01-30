import conn from "@/lib/db";
import { insertCommentQuery } from "@/lib/queries";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    console.log("add comment request body", body);
    const result = await conn!.query(insertCommentQuery, [
      body.movieId,
      body.comment,
    ]);
    console.log("add commnet query result", result);

    return new Response(
      JSON.stringify({ message: "Successfully added comment" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Failed to add comment; Error:${error}` }),
      {
        status: 500,
      }
    );
  }
}
