import { useModalStore } from "@/lib/store/state";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { AddMovieForm } from "./addMovieForm";

export default function Modal() {
  const isOpen = useModalStore((state) => state.open);

  function closeModal() {
    useModalStore.setState({ open: false });
  }

  async function addMovie(formData: FormData) {
    const title = formData.get("title");
    const description = formData.get("description");
    const releaseYear = formData.get("releaseYear");
    const releaseDate = formData.get("releaseDate");
    const res = await fetch("/api/add-movie", {
      method: "POST",
      body: JSON.stringify({ title, description, releaseYear, releaseDate }),
    });
    const data = await res.json();
    if (!data) return alert("Something went wrong");
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add Movie
                  </Dialog.Title>
                  <div className="mt-2">
                    <AddMovieForm handleClick={addMovie} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
