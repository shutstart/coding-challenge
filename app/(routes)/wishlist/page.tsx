"use client";
import Card from "@/app/components/card";
import { useSearchStore, useWishlistStore } from "@/lib/store/state";
import { Movie } from "@/lib/types";
import { GetWishlist } from "@/lib/util/apiCall";
import { useEffect, useState } from "react";

export default function Wishlist() {
  const data = useWishlistStore((state) => state.wishlist);
  const searchString = useSearchStore((state) => state.searchString);

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    GetWishlist().then((data: Movie[]) => {
      console.log("wishlist", data);
      useWishlistStore.setState({ wishlist: data });
      setLoading(false);
    });
  }, []);
  if (isLoading)
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <p>Loading...</p>
      </div>
    );
  if (!data) return <p>No Movies data</p>;
  if (data.length === 0)
    return (
      <>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex-col w-full">
            <p className="text-gray-400 max-auto">No Movies Added Yet..</p>
          </div>
        </div>
      </>
    );

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col items-center mt-8 sm:flex-row">
          <div className="w-1/2 mr-auto">
            <h2 className="text-lg font-medium  ">Movies</h2>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          {data.map((movie) => {
            if (movie.title.toLowerCase().includes(searchString.toLowerCase()))
              return <Card isWishList={true} movie={movie} key={movie.id} />;
          })}
        </div>
      </div>
    </>
  );
}
