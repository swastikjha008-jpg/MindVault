import type { ActivityEntry, VaultItem } from "@mindvault/types";
import { newId, readJSON, writeJSON, STORAGE_KEYS } from "./storage";

const MAX_ACTIVITY = 50;

export function getItems(): VaultItem[] {
  return readJSON<VaultItem[]>(STORAGE_KEYS.items, []);
}

function saveItems(items: VaultItem[]): VaultItem[] {
  writeJSON(STORAGE_KEYS.items, items);
  return items;
}

function logActivity(entry: Omit<ActivityEntry, "id" | "at">) {
  const activity = readJSON<ActivityEntry[]>(STORAGE_KEYS.activity, []);
  const next = [{ ...entry, id: newId(), at: new Date().toISOString() }, ...activity].slice(0, MAX_ACTIVITY);
  writeJSON(STORAGE_KEYS.activity, next);
}

export function getActivity(): ActivityEntry[] {
  return readJSON<ActivityEntry[]>(STORAGE_KEYS.activity, []);
}

export type NewVaultItem = Partial<VaultItem> & { kind: VaultItem["kind"]; title: string };

export function createItem(input: NewVaultItem): VaultItem {
  const now = new Date().toISOString();
  const item: VaultItem = {
    id: newId(),
    content: "",
    tags: [],
    favorite: false,
    pinned: false,
    archived: false,
    public: false,
    createdAt: now,
    updatedAt: now,
    ...input
  };
  const items = [item, ...getItems()];
  saveItems(items);
  logActivity({ itemId: item.id, itemTitle: item.title, action: "created" });
  return item;
}

export function updateItem(id: string, patch: Partial<VaultItem>): VaultItem | null {
  const items = getItems();
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return null;
  const updated: VaultItem = { ...items[index], ...patch, updatedAt: new Date().toISOString() };
  items[index] = updated;
  saveItems(items);
  logActivity({ itemId: updated.id, itemTitle: updated.title, action: "updated" });
  return updated;
}

/** Soft delete — archives the item so it disappears from view but stays recoverable. */
export function archiveItem(id: string): void {
  const item = updateItem(id, { archived: true });
  if (item) logActivity({ itemId: item.id, itemTitle: item.title, action: "deleted" });
}

export function deleteItemPermanently(id: string): void {
  const items = getItems().filter((i) => i.id !== id);
  saveItems(items);
}

export function seedItems(seeds: NewVaultItem[]): VaultItem[] {
  return seeds.map((seed) => createItem(seed));
}
