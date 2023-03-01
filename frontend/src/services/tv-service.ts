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

export const addTvToNotion = async (tvInfo: TvInfo) => {
  await fetch(`${backendUrl}/tv/add-to-shelf`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addNextTvToNotion = async (tvInfo: TvInfo) => {
  await fetch(`${backendUrl}/tv/watch-next`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo }),
  });

  return CallStatus.SUCCESS;
};

export const addFinishedTvToNotion = async (tvInfo: TvInfo, rating: number) => {
  await fetch(`${backendUrl}/tv/finished`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo, rating: (rating * 2).toString() }),
  });

  return CallStatus.SUCCESS;
};

export const addCurrentTvToNotion = async (tvInfo: TvInfo) => {
  await fetch(`${backendUrl}/tv/currently-watching`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tvInfo }),
  });

  return CallStatus.SUCCESS;
};
