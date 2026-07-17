"use client";

import type { VaultItem } from "@mindvault/types";
import { ItemCard } from "./ItemCard";
import { EmptyState } from "./EmptyState";

export function CollectionGrid({
  items,
  onUpdate,
  onDelete,
  emptyTitle = "Nothing here yet",
  emptySubtitle = "Use Quick Add above to create your first item."
}: {
  items: VaultItem[];
  onUpdate: (id: string, patch: Partial<VaultItem>) => void;
  onDelete?: (id: string) => void;
  emptyTitle?: string;
  emptySubtitle?: string;
}) {
  if (items.length === 0) return <EmptyState title={emptyTitle} subtitle={emptySubtitle} compact />;
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}
