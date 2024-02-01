import { useModalStore, useSelectedModalStore } from "@/lib/store/state";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { CloseModal } from "@/lib/util/setters";
import AddMovieComponent from "./addMovieComponent";
import { ModalType } from "@/lib/types";
import CommentComponent from "./commentComponent";

export default function Modal() {
  const isOpen = useModalStore((state) => state.open);
  const selectedModal = useSelectedModalStore((state) => state.type);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog className="relative z-10" onClose={CloseModal}>
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

          <div className="fixed inset-0 overflow-y-auto w-screen">
            <div className="flex min-h-full items-center justify-center p-4 text-center ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-lg max-h-[calc(100vh-74px)] transform overflow-scroll no-scrollbar  rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  {selectedModal === ModalType.ADDMOVIE ? (
                    <AddMovieComponent />
                  ) : (
                    <CommentComponent />
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
