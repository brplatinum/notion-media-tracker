export interface TmdbMovie {
  adult?: boolean;
  backdrop_path?: string | null;
  belongs_to_collection?: object | null;
  budget?: number;
  genres?: { id?: number; name?: string }[];
  homepage?: string | null;
  id?: number;
  imdb_id?: string | null;
  original_language?: string;
  original_title?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
  }[];
  productionCountries?: { iso_3166_1?: string; name?: string }[];
  release_date?: string;
  revenue?: number;
  runtime?: number | null;
  spoken_languages?: { iso_369_1?: string; name?: string }[];
  status?: string;
  tagline?: string | null;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export interface TmdbTv {
  backdrop_path?: string | null;
  created_by?: {
    id?: number;
    credit_id?: string;
    name?: string;
    gender?: number;
    profile_path?: string | null;
  }[];
  episode_run_time?: number[];
  first_air_date?: string;
  belongs_to_collection?: object | null;
  genres?: { id?: number; name?: string }[];
  homepage?: string | null;
  id?: number;
  in_production?: boolean;
  languages?: string[];
  last_air_date?: string;
  last_episode_to_air?: {
    air_date?: string;
    episode_number?: number;
    id?: number;
    name?: string;
    overview?: string;
    production_code?: string;
    season_number?: number;
    still_path?: string | null;
    vote_average?: number;
    vote_count?: number;
  };
  name?: string;
  next_episode_to_air?: null;
  networks?: {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
  }[];
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language?: string;
  original_name?: string;
  overview?: string | null;
  popularity?: number;
  poster_path?: string | null;
  production_companies?: {
    name?: string;
    id?: number;
    logo_path?: string | null;
    origin_country?: string;
  }[];
  productionCountries?: { iso_3166_1?: string; name?: string }[];
  seasons?: {
    air_date?: string;
    episode_count?: number;
    id?: number;
    name?: string;
    overview?: string;
    poster_path?: string;
    season_number?: number;
  };
  spoken_languages?: { iso_369_1?: string; name?: string }[];
  status?: string;
  tagline?: string | null;
  type?: string;
  vote_average?: number;
  vote_count?: number;
}

export interface TmdbMovieSearchResult {
  poster_path?: string | null;
  adult?: boolean;
  overview?: string;
  release_date?: string;
  genre_ids?: number[];
  id?: number;
  original_title?: string;
  original_language?: string;
  title?: string;
  backdrop_path?: string | null;
  popularity?: number;
  vote_count?: number;
  video?: boolean;
  vote_average?: number;
}

export interface TmdbTvSearchResult {
  poster_path?: string | null;
  popularity?: number;
  id?: number;
  backdrop_path?: string | null;
  vote_average?: number;
  overview?: string;
  first_air_date?: string;
  origin_country?: string[];
  genre_ids?: number[];
  original_language?: string;
  vote_count?: number;
  name?: string;
  original_name?: string;
}

export interface TmdbMovieSearch {
  page?: number;
  results?: TmdbMovieSearchResult[];
  totalResults?: number;
  total_pages?: number;
}

export interface TmdbTvSearch {
  page?: number;
  results?: TmdbTvSearchResult[];
  totalResults?: number;
  total_pages?: number;
}

export interface TmdbMovieCredits {
  id?: number;
  cast?: TmdbMovieCast[];
  crew?: TmdbMovieCrew[];
}

export interface TmdbMovieCrew {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  credit_id?: string;
  department?: string;
  job?: string;
}

export interface TmdbMovieCast {
  adult?: boolean;
  gender?: number | null;
  id?: number;
  known_for_department?: string;
  name?: string;
  original_name?: string;
  popularity?: number;
  profile_path?: string | null;
  cast_id?: number;
  character?: string;
  credit_id?: string;
  order?: number;
}
