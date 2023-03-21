import { components } from "@backend/types/api";
import { CallStatus } from "../types/util";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

type TvShow = components["schemas"]["TvShow"];
type TvShowResults = components["schemas"]["TvShowResults"];

export const searchTv = async (searchQuery: string) => {
  const response = (await (
    await fetch(`${backendUrl}/tv/search?search_query=${searchQuery}`, {
      method: "GET",
    })
  ).json()) as TvShowResults;

  return response;
};

export const addTvToNotion = async (tvInfo: TvShow) => {
  await fetch(`${backendUrl}/tv/add-to-shelf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addNextTvToNotion = async (tvInfo: TvShow) => {
  await fetch(`${backendUrl}/tv/watch-next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addFinishedTvToNotion = async (tvInfo: TvShow, rating: number) => {
  await fetch(`${backendUrl}/tv/finished`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo, rating: (rating * 2).toString() }),
  });

  return CallStatus.SUCCESS;
};

export const addCurrentTvToNotion = async (tvInfo: TvShow) => {
  await fetch(`${backendUrl}/tv/currently-watching`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo }),
  });

  return CallStatus.SUCCESS;
};
