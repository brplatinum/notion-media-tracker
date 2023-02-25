export interface TmdbMovieSearch {
  page: number | null;
  results: TmdbResult[] | null;
  totalResults: number | null;
  total_pages: number | null;
}

export interface TmdbResult {
  poster_path: string | null;
  adult: boolean | null;
  overview: string | null;
  release_date: string | null;
  genre_ids: number[] | null;
  id: number | null;
  original_title: string | null;
  original_language: string | null;
  title: string | null;
  backdrop_path: string | null;
  popularity: number | null;
  vote_count: number | null;
  video: boolean | null;
  vote_average: number | null;
}

export interface TmdbMovieCredits {
  id: number | null;
  crew: TmdbMovieCrew[] | null;
}

export interface TmdbMovieCrew {
  adult: boolean | null;
  gender: number | null;
  id: number | null;
  known_for_department: string | null;
  name: string | null;
  original_name: string | null;
  popularity: number | null;
  profile_path: string | null;
  credit_id: string | null;
  department: string | null;
  job: string | null;
}
