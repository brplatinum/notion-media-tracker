export enum CallStatus {
  PROCESSING,
  SUCCESS,
  FAILURE,
}

export interface MediaInfo {
  title: string;
  subtitle?: string;
  creators?: string[];
  starring?: string[];
  imgSrc?: string;
  genres?: string[];
  ids: string[];
  year?: string;
}
