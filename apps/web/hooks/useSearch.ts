"use client";

import { useMemo } from "react";
import type { VaultItem } from "@mindvault/types";

/** Simple, fast, entirely client-side search across title/content/url/tags. */
export function useSearch(items: VaultItem[], query: string): VaultItem[] {
  return useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => {
      const haystack = [item.title, item.content, item.description, item.url, item.kind, ...(item.tags || [])]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query]);
}
