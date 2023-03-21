import { components } from "@backend/types/api";
import { CallStatus } from "../types/util";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

type Movie = components["schemas"]["Movie"];
type MovieResults = components["schemas"]["MovieResults"];

export const searchMovies = async (searchQuery: string) => {
  const response = (await (
    await fetch(`${backendUrl}/movies/search?search_query=${searchQuery}`, {
      method: "GET",
    })
  ).json()) as MovieResults;

  return response;
};

export const addMovieToNotion = async (movieInfo: Movie) => {
  await fetch(`${backendUrl}/movies/add-to-shelf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addNextMovieToNotion = async (movieInfo: Movie) => {
  await fetch(`${backendUrl}/movies/watch-next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addFinishedMovieToNotion = async (
  movieInfo: Movie,
  rating: number
) => {
  await fetch(`${backendUrl}/movies/finished`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo, rating: (rating * 2).toString() }),
  });

  return CallStatus.SUCCESS;
};

export const addCurrentMovieToNotion = async (movieInfo: Movie) => {
  await fetch(`${backendUrl}/movies/currently-watching`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo }),
  });

  return CallStatus.SUCCESS;
};
