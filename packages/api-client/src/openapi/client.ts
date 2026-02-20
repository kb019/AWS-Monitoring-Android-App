import createClient from "openapi-fetch";
import type { paths } from "./schema";

export type ApiClient = ReturnType<typeof createClient<paths>>;

export function createApiClient(baseUrl: string): ApiClient {
  if (!baseUrl) {
    throw new Error("Missing API base URL for OpenAPI client");
  }

  return createClient<paths>({ baseUrl });
}
