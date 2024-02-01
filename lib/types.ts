export type Movie = {
  id?: number;
  title: string;
  description: string;
  releaseYear: string;
  image?: string;
};

export type Rating = {
  id: number;
  movieId: number;
  value: number;
};

export type Comment = {
  id: number;
  movieId: number;
  value: string;
};

export enum ModalType {
  ADDMOVIE,
  VIEWMOVIE,
}
