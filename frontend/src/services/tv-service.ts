import { MovieInfo } from "@backend/types/movies-api";
import { TvInfo } from "@backend/types/tv-api";
import { CallStatus } from "../types/util";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

export const searchTv = async (searchQuery: string) => {
  const response = (await (
    await fetch(`${backendUrl}/tv/search?search_query=${searchQuery}`, {
      method: "GET",
    })
  ).json()) as TvInfo[];

  return response;
};

export const addMovieToNotion = async (movieInfo: MovieInfo) => {
  await fetch(`${backendUrl}/movies/add-to-shelf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addNextMovieToNotion = async (movieInfo: MovieInfo) => {
  await fetch(`${backendUrl}/movies/watch-next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addFinishedMovieToNotion = async (
  movieInfo: MovieInfo,
  rating: number
) => {
  await fetch(`${backendUrl}/movies/finished`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo, rating: (rating * 2).toString() }),
  });

  return CallStatus.SUCCESS;
};

export const addCurrentMovieToNotion = async (movieInfo: MovieInfo) => {
  await fetch(`${backendUrl}/movies/currently-watching`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ movieInfo }),
  });

  return CallStatus.SUCCESS;
};
