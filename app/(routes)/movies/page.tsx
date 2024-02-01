"use client";
import Button from "@/app/components/button";
import Card from "@/app/components/card";
import Modal from "@/app/components/modal";
import {
  useModalStore,
  useMovieListStore,
  useSearchStore,
  useSelectedModalStore,
} from "@/lib/store/state";
import { ModalType } from "@/lib/types";
import { GetAndSetMovieList } from "@/lib/util/helper";
import { Plus } from "lucide-react";
import { use, useEffect, useState } from "react";

export default function Home() {
  const data = useMovieListStore((state) => state.movieList);
  const searchString = useSearchStore((state) => state.searchString);

  const [isLoading, setLoading] = useState(true);

  function openModal() {
    useSelectedModalStore.setState({ type: ModalType.ADDMOVIE });
    useModalStore.setState({ open: true });
  }
  useEffect(() => {
    GetAndSetMovieList().then((data) => {
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
        <div className="p-4">
          <div className="flex flex-col items-center mt-8 sm:flex-row">
            <div className="w-1/2 mr-auto">
              <h2 className="text-lg font-medium  ">Movies</h2>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-6 mt-5">
            <button
              className="min-h-48 col-span-12 md:col-span-4  flex flex-col  bg-gray-400/40 border border-dashed border-gray-400 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-500/30 cursor-pointer"
              onClick={openModal}
            >
              <Plus size={96} className="text-gray-400 mx-auto my-auto" />
            </button>
          </div>
        </div>

        <Modal />
      </>
    );

  return (
    <>
      <div className="p-4">
        <div className="flex flex-col items-center mt-8 sm:flex-row">
          <div className="w-1/2 mr-auto">
            <h2 className="text-lg font-medium  ">Movies</h2>
          </div>

          <Button
            className="mr-2 shadow-md"
            handleClick={openModal}
            variant={"primary"}
            value={"Add Movie"}
          />
        </div>
        <div className="grid grid-cols-12 gap-6 mt-5">
          {data.map((movie) => {
            if (movie.title.toLowerCase().includes(searchString.toLowerCase()))
              return <Card movie={movie} key={movie.id} />;
          })}
        </div>
      </div>

      <Modal />
    </>
  );
}
