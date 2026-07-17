import type { Profile } from "@mindvault/types";
import { readJSON, removeKey, writeJSON, STORAGE_KEYS } from "./storage";

export function getProfile(): Profile | null {
  return readJSON<Profile | null>(STORAGE_KEYS.profile, null);
}

export function saveProfile(profile: Profile): Profile {
  writeJSON(STORAGE_KEYS.profile, profile);
  return profile;
}

export function createProfile(name: string): Profile {
  return saveProfile({ name: name.trim(), theme: "light", createdAt: new Date().toISOString() });
}

export function updateProfile(patch: Partial<Profile>): Profile | null {
  const current = getProfile();
  if (!current) return null;
  const next = { ...current, ...patch };
  writeJSON(STORAGE_KEYS.profile, next);
  return next;
}

export function clearProfile(): void {
  removeKey(STORAGE_KEYS.profile);
}
