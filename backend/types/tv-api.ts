export interface TvInfo {
  title: string;
  creators?: string[];
  starring?: string[];
  imgSrc?: string;
  ids: string[];
  year?: string;
  genres?: string[];
}

export interface AddTvRequest {
  tvInfo: TvInfo;
}

export interface FinishedTvRequest {
  tvInfo: TvInfo;
  rating: string;
}
