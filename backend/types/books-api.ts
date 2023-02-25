export interface BookInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  imgSrc?: string;
  genres?: string[];
  ids: string[];
  year?: string;
}

export interface AddBookRequest {
  bookInfo: BookInfo;
}

export interface FinishedBookRequest {
  bookInfo: BookInfo;
  rating: string;
}
