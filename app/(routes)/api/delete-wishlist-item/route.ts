import conn from "@/lib/db";
import { deleteWishlistQuery } from "@/lib/queries";

export async function DELETE(request: Request) {
  const id = request.url.split("?")[1].split("=")[1];

  try {
    console.log("delete wishlist request body", id);
    const result = await conn!.query(deleteWishlistQuery, [id]);
    console.log("delete wishlist query result", result);

    return new Response(
      JSON.stringify({ message: "Successfully deleted wishlist movie" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: `Failed to delete wishlist movie; Error:${error}`,
      }),
      {
        status: 500,
      }
    );
  }
}
