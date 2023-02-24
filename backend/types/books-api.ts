export interface BookInfo {
  title: string;
  subtitle: string;
  authors: string[] | undefined;
  imgSrc: string | undefined;
  genres: string[];
  ids: string[];
  year: string;
}

export interface AddBookRequest {
  bookInfo: BookInfo;
}
