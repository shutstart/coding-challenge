import conn from "@/lib/db";
import { insertWishlistQuery } from "@/lib/queries";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    console.log("add wishlist movie request body", body);
    const result = await conn!.query(insertWishlistQuery, [body.movieId]);
    console.log("add wishlist movie query result", result);

    return new Response(
      JSON.stringify({ message: "Successfully added wishlist movie" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `Failed to add wishlist movie; Error:${error}`,
      }),
      {
        status: 500,
      }
    );
  }
}
