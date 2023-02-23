export interface BookInfo {
  title: string;
  subtitle: string;
  authors: string[] | undefined;
  imgSrc: string | undefined;
}

export interface AddBookRequest {
  bookInfo: BookInfo;
}
