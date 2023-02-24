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
  categories: string[];
  industryIdentifiers: { type: string; identifier: string }[];
  publishedDate: string;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}
