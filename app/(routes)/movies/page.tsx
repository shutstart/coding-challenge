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
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex-col w-full">
            <p className="text-gray-400 max-auto">No Movies Added Yet..</p>
            <button
              onClick={() => openModal()}
              className="mt-12 flex button bg-[#5cffcd] hover:bg-[#49eebd] p-4 mx-auto rounded-lg"
            >
              Add Movie
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
