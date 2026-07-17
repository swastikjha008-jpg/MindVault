"use client";

import { useCallback, useEffect, useState } from "react";
import type { VaultItem } from "@mindvault/types";
import { archiveItem, createItem, getItems, seedItems, updateItem, type NewVaultItem } from "@/lib/storage/items";
import { subscribe } from "@/lib/storage/storage";

export function useVault() {
  const [items, setItems] = useState<VaultItem[]>([]);
  const [ready, setReady] = useState(false);

  const refresh = useCallback(() => setItems(getItems()), []);

  useEffect(() => {
    refresh();
    setReady(true);
    return subscribe(refresh);
  }, [refresh]);

  const add = useCallback(
    (input: NewVaultItem) => {
      const item = createItem(input);
      refresh();
      return item;
    },
    [refresh]
  );

  const update = useCallback(
    (id: string, patch: Partial<VaultItem>) => {
      const item = updateItem(id, patch);
      refresh();
      return item;
    },
    [refresh]
  );

  const remove = useCallback(
    (id: string) => {
      archiveItem(id);
      refresh();
    },
    [refresh]
  );

  const seed = useCallback(
    (seeds: NewVaultItem[]) => {
      const created = seedItems(seeds);
      refresh();
      return created;
    },
    [refresh]
  );

  const active = items.filter((i) => !i.archived);

  return { items: active, allItems: items, ready, add, update, remove, seed, refresh };
}
