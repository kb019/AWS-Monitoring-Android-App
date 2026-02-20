export const API_URL = "Test_URL";

let apiBaseUrl = API_URL;

export function setApiBaseUrl(url: string) {
  apiBaseUrl = url.replace(/\/+$/, "");
}

export function getApiBaseUrl() {
  return apiBaseUrl;
}
