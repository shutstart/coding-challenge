import {
  useModalStore,
  useMovieListStore,
  useWishlistStore,
} from "../store/state";
import { Movie } from "../types";

export const SetMovieList = (movieList: Movie[]) => {
  useMovieListStore.setState({ movieList: movieList });
};

export const SetWishlist = (wishlist: Movie[]) => {
  useWishlistStore.setState({ wishlist: wishlist });
};

export function CloseModal() {
  useModalStore.getState().closeModal();
}

export function OpenModal() {
  useModalStore.getState().openModal();
}
