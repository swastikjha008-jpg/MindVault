"use client";

import { useCallback, useEffect, useState } from "react";
import type { Profile } from "@mindvault/types";
import { clearProfile, createProfile, getProfile, updateProfile } from "@/lib/storage/profile";
import { subscribe } from "@/lib/storage/storage";

export function useProfile() {
  const [profile, setProfileState] = useState<Profile | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setProfileState(getProfile());
    setReady(true);
    return subscribe(() => setProfileState(getProfile()));
  }, []);

  const start = useCallback((name: string) => {
    const profile = createProfile(name);
    setProfileState(profile);
    return profile;
  }, []);

  const update = useCallback((patch: Partial<Profile>) => {
    const next = updateProfile(patch);
    if (next) setProfileState(next);
    return next;
  }, []);

  const reset = useCallback(() => {
    clearProfile();
    setProfileState(null);
  }, []);

  return { profile, ready, start, update, reset };
}
