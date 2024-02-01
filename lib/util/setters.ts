import { useModalStore, useMovieListStore } from "../store/state";
import { Movie } from "../types";

export const SetMovieList = (movieList: Movie[]) => {
  useMovieListStore.setState({ movieList: movieList });
};

export function CloseModal() {
  useModalStore.getState().closeModal();
}

export function OpenModal() {
  useModalStore.getState().openModal();
}
