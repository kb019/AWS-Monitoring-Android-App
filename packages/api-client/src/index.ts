import { API_URL, getApiBaseUrl, setApiBaseUrl } from "./constants";

export { API_URL, getApiBaseUrl, setApiBaseUrl };

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl().replace(/\/+$/, "");
  const endpoint = path.startsWith("/") ? path : `/${path}`;

  const res = await fetch(`${baseUrl}${endpoint}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status}: ${text || res.statusText}`);
  }

  return (await res.json()) as T;
}

export { createApiClient } from "./openapi/client";
export type { ApiClient } from "./openapi/client";
export type { paths as OpenApiPaths } from "./openapi/schema";
