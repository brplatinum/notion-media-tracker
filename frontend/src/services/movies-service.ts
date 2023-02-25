import { BookInfo } from "@backend/types/books-api";
import { MovieInfo } from "@backend/types/movies-api";
import { CallStatus } from "../types/services";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

export const searchMovies = async (searchQuery: string) => {
  const response = (await (
    await fetch(`${backendUrl}/movies/search?search_query=${searchQuery}`, {
      method: "GET",
    })
  ).json()) as MovieInfo[];

  return response;
};

export const addBookToNotion = async (bookInfo: BookInfo) => {
  await fetch(`${backendUrl}/books/add-to-shelf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addNextBookToNotion = async (bookInfo: BookInfo) => {
  await fetch(`${backendUrl}/books/read-next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addFinishedBookToNotion = async (
  bookInfo: BookInfo,
  rating: number
) => {
  await fetch(`${backendUrl}/books/finished`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo, rating: (rating * 2).toString() }),
  });

  return CallStatus.SUCCESS;
};

export const addCurrentBookToNotion = async (bookInfo: BookInfo) => {
  await fetch(`${backendUrl}/books/currently-reading`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookInfo }),
  });

  return CallStatus.SUCCESS;
};