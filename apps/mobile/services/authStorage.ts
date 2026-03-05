import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "auth.accessToken";
const REFRESH_TOKEN_KEY = "auth.refreshToken";

const STORE_OPTIONS: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.WHEN_UNLOCKED,
};

const memoryStore: Record<string, string | null> = {};
let secureStoreAvailable: Promise<boolean> | null = null;

async function canUseSecureStore(): Promise<boolean> {
  if (Platform.OS === "web") {
    return false;
  }

  if (!secureStoreAvailable) {
    secureStoreAvailable = SecureStore.isAvailableAsync().catch(() => false);
  }

  return secureStoreAvailable;
}

async function setItem(key: string, value: string | null): Promise<void> {
  const normalized = value?.trim() ? value : null;

  if (await canUseSecureStore()) {
    if (!normalized) {
      await SecureStore.deleteItemAsync(key);
      return;
    }

    await SecureStore.setItemAsync(key, normalized, STORE_OPTIONS);
    return;
  }

  memoryStore[key] = normalized;
}

async function getItem(key: string): Promise<string | null> {
  if (await canUseSecureStore()) {
    return SecureStore.getItemAsync(key);
  }

  return memoryStore[key] ?? null;
}

async function deleteItem(key: string): Promise<void> {
  if (await canUseSecureStore()) {
    await SecureStore.deleteItemAsync(key);
    return;
  }

  delete memoryStore[key];
}

export async function setAccessToken(token: string | null): Promise<void> {
  await setItem(ACCESS_TOKEN_KEY, token);
}

export async function getAccessToken(): Promise<string | null> {
  return getItem(ACCESS_TOKEN_KEY);
}

export async function setRefreshToken(token: string | null): Promise<void> {
  await setItem(REFRESH_TOKEN_KEY, token);
}

export async function getRefreshToken(): Promise<string | null> {
  return getItem(REFRESH_TOKEN_KEY);
}

export async function setTokens(params: {
  accessToken: string | null;
  refreshToken?: string | null;
}): Promise<void> {
  await Promise.all([
    setAccessToken(params.accessToken),
    params.refreshToken !== undefined
      ? setRefreshToken(params.refreshToken)
      : Promise.resolve(),
  ]);
}

export async function clearTokens(): Promise<void> {
  await Promise.all([
    deleteItem(ACCESS_TOKEN_KEY),
    deleteItem(REFRESH_TOKEN_KEY),
  ]);
}
