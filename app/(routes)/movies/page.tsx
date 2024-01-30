"use client";
import Card from "@/app/components/card";
import Modal from "@/app/components/modal";
import { useModalStore } from "@/lib/store/state";
import { Movie } from "@/lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(new Array<Movie>());
  const [isLoading, setLoading] = useState(true);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  function openModal() {
    useModalStore.setState({ open: true });
  }
  useEffect(() => {
    fetch("/api/list-movies").then(async (res) => {
      const result = await res.json();
      console.log(result);
      setData(result);
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
      <Modal />
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Movies</h1>
        <button
          onClick={() => openModal()}
          className="flex button bg-[#5cffcd] hover:bg-[#49eebd] p-4 rounded-lg"
        >
          Add Movie
        </button>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-5">
        {data.map((movie) => {
          return <Card movie={movie} key={movie.id} />;
        })}
      </div>
    </>
  );
}
