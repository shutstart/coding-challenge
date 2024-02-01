import { create } from "zustand";
import { ModalType, Movie } from "../types";

// Defining the interface for the ModalState, representing the state of the modal
interface ModalState {
  open: boolean;
  openModal: () => void; // Function to open the modal
  closeModal: () => void; // Function to close the modal
}

// Creating a Zustand store for managing modal state
export const useModalStore = create<ModalState>()((set) => ({
  open: false, // Initial state: modal is closed
  openModal: () => set((state) => ({ open: true })), // Setting state to open the modal
  closeModal: () => set((state) => ({ open: false })), // Setting state to close the modal
}));

// Defining the interface for the SelectedModalState, representing the selected modal type
interface SelectedModalState {
  type: ModalType; // Type of the modal (e.g., ADDMOVIE, VIEWMOVIE)
  setAddMovie: () => void; // Function to set the modal type to ADDMOVIE
  setViewMovie: () => void; // Function to set the modal type to VIEWMOVIE
}

// Creating a Zustand store for managing selected modal state
export const useSelectedModalStore = create<SelectedModalState>((set) => ({
  type: ModalType.ADDMOVIE, // Initial state: default to ADDMOVIE
  setAddMovie: () => set((state) => ({ type: ModalType.ADDMOVIE })), // Setting state to ADDMOVIE
  setViewMovie: () => set((state) => ({ type: ModalType.VIEWMOVIE })), // Setting state to VIEWMOVIE
}));

// Defining the interface for the SelectedMovieState, representing the selected movie ID
interface SelectedMovieState {
  id: number; // ID of the selected movie
  selectMovie: (id: number) => void; // Function to set the selected movie ID
}

// Creating a Zustand store for managing selected movie state
export const useSelectedMovieStore = create<SelectedMovieState>((set) => ({
  id: 0, // Initial state: no movie selected
  selectMovie: (id: number) => set((state) => ({ id: id })), // Setting state to select a movie by ID
}));

// Defining the interface for the MovieListState, representing the list of movies
interface MovieListState {
  movieList: Movie[]; // Array of movies
  setMovieList: (movieList: []) => void; // Function to set the movie list
}

// Creating a Zustand store for managing movie list state
export const useMovieListStore = create<MovieListState>((set) => ({
  movieList: [], // Initial state: empty movie list
  setMovieList: (
    movieList: Movie[] // Setting state to update the movie list
  ) => set((state) => ({ movieList: movieList })),
}));

// Defining the interface for the WishlistState, representing the wishlist of movies
interface WishlistState {
  wishlist: Movie[]; // Array of movies in the wishlist
  setWishlist: (wishlist: Movie[]) => void; // Function to set the wishlist
}

// Creating a Zustand store for managing wishlist state
export const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: [], // Initial state: empty wishlist
  setWishlist: (
    wishlist: Movie[] // Setting state to update the wishlist
  ) => set((state) => ({ wishlist: wishlist })),
}));

// Defining the interface for the SearchState, representing the search string
interface SearchState {
  searchString: string; // String used for searching movies
  setSearch: (search: string) => void; // Function to set the search string
}

// Creating a Zustand store for managing search state
export const useSearchStore = create<SearchState>((set) => ({
  searchString: "", // Initial state: empty search string
  setSearch: (
    search: string // Setting state to update the search string
  ) => set((state) => ({ searchString: search })),
}));
