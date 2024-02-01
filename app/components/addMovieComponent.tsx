import { Dialog } from "@headlessui/react";
import { AddMovieForm } from "./addMovieForm";

export default function AddMovieComponent() {
  return (
    <>
      <Dialog.Title
        as="h3"
        className="text-lg font-medium leading-6 text-gray-900"
      >
        Add Movie
      </Dialog.Title>
      <div className="mt-2">
        <AddMovieForm />
      </div>
    </>
  );
}
