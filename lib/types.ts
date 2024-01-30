export type Movie = {
  id?: number;
  title: string;
  description: string;
  releaseDate: string;
  releaseYear: number;
  rating?: number;
  comments?: Comment[];
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
