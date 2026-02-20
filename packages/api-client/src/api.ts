import { getApiBaseUrl } from "./constants";

export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  const baseUrl = getApiBaseUrl();

  const response = await fetch(`${baseUrl}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
