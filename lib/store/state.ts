import { create } from "zustand";

interface ModalState {
  open: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>()((set) => ({
  open: false,
  openModal: () => set((state) => ({ open: true })),
  closeModal: () => set((state) => ({ open: false })),
}));

interface SelectedMovieState {
  id: number;
  selectMovie: (id: number) => void;
}

export const useSelectedMovieStore = create<SelectedMovieState>((set) => ({
  id: 0,
  selectMovie: (id: number) => set((state) => ({ id: id })),
}));
