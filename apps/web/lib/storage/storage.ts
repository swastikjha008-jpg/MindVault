/**
 * Local Storage abstraction.
 *
 * Every read/write to the browser goes through this file. If MindVault ever
 * moves to a real backend (MongoDB, Supabase, etc.) only this file — and the
 * thin wrappers in this folder that call it — need to change. Nothing above
 * this layer (hooks, components) should touch `window.localStorage` directly.
 */

const NAMESPACE = "mindvault";

function isBrowser() {
  return typeof window !== "undefined";
}

function fullKey(key: string) {
  return `${NAMESPACE}:${key}`;
}

export function readJSON<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(fullKey(key));
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(fullKey(key), JSON.stringify(value));
    window.dispatchEvent(new CustomEvent("mindvault:storage", { detail: { key } }));
  } catch {
    // Storage can throw (quota exceeded, private mode). Fail silently —
    // the UI keeps working in-memory for the rest of the session.
  }
}

export function removeKey(key: string): void {
  if (!isBrowser()) return;
  window.localStorage.removeItem(fullKey(key));
  window.dispatchEvent(new CustomEvent("mindvault:storage", { detail: { key } }));
}

export function clearAll(): void {
  if (!isBrowser()) return;
  Object.keys(window.localStorage)
    .filter((k) => k.startsWith(`${NAMESPACE}:`))
    .forEach((k) => window.localStorage.removeItem(k));
  window.dispatchEvent(new CustomEvent("mindvault:storage", { detail: { key: "*" } }));
}

/** Subscribe to any change made through this storage layer (same tab or other tabs). */
export function subscribe(callback: () => void): () => void {
  if (!isBrowser()) return () => {};
  const onCustom = () => callback();
  const onStorage = (e: StorageEvent) => {
    if (e.key?.startsWith(`${NAMESPACE}:`)) callback();
  };
  window.addEventListener("mindvault:storage", onCustom);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener("mindvault:storage", onCustom);
    window.removeEventListener("storage", onStorage);
  };
}

export function newId(): string {
  if (isBrowser() && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export const STORAGE_KEYS = {
  profile: "profile",
  items: "items",
  activity: "activity",
  settings: "settings"
} as const;
