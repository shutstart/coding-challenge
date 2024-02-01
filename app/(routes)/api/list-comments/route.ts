import conn from "@/lib/db";
import { Comment } from "@/lib/types";
import { listCommentsQuery } from "@/lib/queries";

export async function GET(request: Request) {
  try {
    const id = request.url.split("?")[1].split("=")[1];
    let comments: Comment[] = [];
    const result = await conn!.query(listCommentsQuery, [id]);

    result.rows.forEach((comment) => {
      comments.push({
        id: comment.id,
        movieId: comment.movie_id,
        value: comment.value,
      });
    });
    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Failed to list comments; Error:${error}` }),
      {
        status: 500,
      }
    );
  }
}
