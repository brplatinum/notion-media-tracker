export interface BookInfo {
  title: string;
  subtitle: string | null;
  authors: string[] | null;
  imgSrc: string | null;
  genres: string[] | null;
  ids: string[];
  year: string | null;
}

export interface AddBookRequest {
  bookInfo: BookInfo;
}

export interface FinishedBookRequest {
  bookInfo: BookInfo;
  rating: string;
}
