export type GoogleBook = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
};

export type VolumeInfo = {
  title: string;
  subtitle?: string;
  authors?: string[];
  imageLinks?: ImageLinks;
  categories?: string[];
  industryIdentifiers?: { type: string; identifier: string }[];
  publishedDate?: string;
};

export type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
};
