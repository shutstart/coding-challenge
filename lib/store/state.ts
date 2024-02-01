import { create } from "zustand";
import { ModalType, Movie } from "../types";

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

interface SelectedModalState {
  type: ModalType;
  setAddMovie: () => void;
  setViewMovie: () => void;
}

export const useSelectedModalStore = create<SelectedModalState>((set) => ({
  type: ModalType.ADDMOVIE,
  setAddMovie: () => set((state) => ({ type: ModalType.ADDMOVIE })),
  setViewMovie: () => set((state) => ({ type: ModalType.VIEWMOVIE })),
}));

interface SelectedMovieState {
  id: number;
  selectMovie: (id: number) => void;
}

export const useSelectedMovieStore = create<SelectedMovieState>((set) => ({
  id: 0,
  selectMovie: (id: number) => set((state) => ({ id: id })),
}));

interface MovieListState {
  movieList: Movie[];
  setMovieList: (movieList: []) => void;
}

export const useMovieListStore = create<MovieListState>((set) => ({
  movieList: [],
  setMovieList: (movieList: Movie[]) =>
    set((state) => ({ movieList: movieList })),
}));

interface WishlistState {
  wishlist: Movie[];
  setWishlist: (wishlist: Movie[]) => void;
}

export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [],
  setWishlist: (wishlist: Movie[]) => set((state) => ({ wishlist: wishlist })),
}));

interface SearchState {
  searchString: string;
  setSearch: (search: string) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  searchString: "",
  setSearch: (search: string) => set((state) => ({ searchString: search })),
}));
