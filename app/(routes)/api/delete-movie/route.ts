import conn from "@/lib/db";
import { deleteMovieQuery, insertCommentQuery } from "@/lib/queries";

export async function DELETE(request: Request) {
  const id = request.url.split("?")[1].split("=")[1];

  try {
    console.log("add comment request body", id);
    const result = await conn!.query(deleteMovieQuery, [id]);
    console.log("add commnet query result", result);

    return new Response(
      JSON.stringify({ message: "Successfully deleted movie" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: `Failed to delete movie; Error:${error}` }),
      {
        status: 500,
      }
    );
  }
}
