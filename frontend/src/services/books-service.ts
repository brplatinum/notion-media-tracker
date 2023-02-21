import { SearchResultInfo } from "@backend/types/books-api";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

export const searchBooks = async (
  searchQuery: string
): Promise<SearchResultInfo[]> => {
  const response = (await (
    await fetch(`${backendUrl}/books/search?search_query=${searchQuery}`, {
      method: "GET",
    })
  ).json()) as SearchResultInfo[];

  return response;
};
