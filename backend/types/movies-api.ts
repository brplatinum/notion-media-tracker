export interface MovieInfo {
  title: string;
  directors?: string[];
  starring?: string[];
  imgSrc?: string;
  ids: string[];
  year?: string;
}

export interface AddMovieRequest {
  movieInfo: MovieInfo;
}

export interface FinishedMovieRequest {
  movieInfo: MovieInfo;
  rating: string;
}
