import { components } from "@backend/types/api";

const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

type KeysNeeded = components["schemas"]["KeysNeeded"];

export const getSetupInfo = async () => {
  const response = (await (
    await fetch(`${backendUrl}/setup`, {
      method: "GET",
    })
  ).json()) as KeysNeeded;

  return response.keysNeeded;
};

export const submitSetupInfo = async (keySubmissions: {
  notionToken: string;
  notionDbId: string;
  tmdbToken: string;
}) => {
  const requestBody = {
    notionIntegrationToken: keySubmissions.notionToken
      ? keySubmissions.notionToken
      : null,
    notionDatabaseId: keySubmissions.notionDbId
      ? keySubmissions.notionDbId
      : null,
    tmdbToken: keySubmissions.tmdbToken ? keySubmissions.tmdbToken : null,
  };
  const response = (await (
    await fetch(`${backendUrl}/setup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    })
  ).json()) as KeysNeeded;

  return response.keysNeeded;
};
