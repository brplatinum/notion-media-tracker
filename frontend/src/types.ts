export interface SearchResultInfo {
  title: string;
  subtitle: string;
  authors: string[] | undefined;
  imgSrc: string | undefined;
}

export interface GoogleBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  subtitle: string;
  authors: string[];
  imageLinks: ImageLinks;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
