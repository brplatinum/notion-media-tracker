import { components } from "@backend/types/api";
import { CallStatus } from "../types/util";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

type Book = components["schemas"]["Book"];
type BookResults = components["schemas"]["BookResults"];

export const searchBooks = async (searchQuery: string) => {
  const response = (await (
    await fetch(`${backendUrl}/books/search?search_query=${searchQuery}`, {
      method: "GET",
    })
  ).json()) as BookResults;

  return response;
};

export const addBookToNotion = async (bookInfo: Book) => {
  await fetch(`${backendUrl}/books/add-to-shelf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addNextBookToNotion = async (bookInfo: Book) => {
  await fetch(`${backendUrl}/books/read-next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addFinishedBookToNotion = async (
  bookInfo: Book,
  rating: number
) => {
  await fetch(`${backendUrl}/books/finished`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo, rating: (rating * 2).toString() }),
  });

  return CallStatus.SUCCESS;
};

export const addCurrentBookToNotion = async (bookInfo: Book) => {
  await fetch(`${backendUrl}/books/currently-reading`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo }),
  });

  return CallStatus.SUCCESS;
};
