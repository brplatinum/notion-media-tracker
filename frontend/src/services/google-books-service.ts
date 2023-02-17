import { SearchResultInfo } from "@backend/types/books-api";
import { GoogleBook } from "@backend/types/google-books";

export const searchBooks = async (
  searchQuery: string
): Promise<SearchResultInfo[]> => {
  const response = (await (
    await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}`,
      {
        method: "GET",
      }
    )
  ).json()) as { items: GoogleBook[] };

  console.log(response);

  return response.items.map((bookItem: GoogleBook) => {
    return {
      title: bookItem.volumeInfo.title,
      subtitle: bookItem.volumeInfo.subtitle,
      authors: bookItem.volumeInfo.authors,
      imgSrc: bookItem.volumeInfo.imageLinks?.thumbnail,
    };
  });
};
