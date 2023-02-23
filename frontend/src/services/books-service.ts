import { BookInfo } from "@backend/types/books-api";
import { CallStatus } from "../types/services";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

export const searchBooks = async (searchQuery: string): Promise<BookInfo[]> => {
  const response = (await (
    await fetch(`${backendUrl}/books/search?search_query=${searchQuery}`, {
      method: "GET",
    })
  ).json()) as BookInfo[];

  return response;
};

export const addBookToNotion = async (bookInfo: BookInfo) => {
  await fetch(`${backendUrl}/books/add-to-notion`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo }),
  });

  return CallStatus.SUCCESS;
};
