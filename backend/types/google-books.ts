export interface GoogleBook {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
}

export interface VolumeInfo {
  title: string;
  subtitle: string | null;
  authors: string[] | null;
  imageLinks: ImageLinks | null;
  categories: string[] | null;
  industryIdentifiers: { type: string; identifier: string }[] | null;
  publishedDate: string | null;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
