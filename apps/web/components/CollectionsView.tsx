"use client";

import type { VaultItem } from "@mindvault/types";
import { EmptyState } from "./EmptyState";
import { CollectionGrid } from "./CollectionGrid";

export function CollectionsView({
  vault,
  onUpdate,
  onDelete
}: {
  vault: VaultItem[];
  onUpdate: (id: string, patch: Partial<VaultItem>) => void;
  onDelete: (id: string) => void;
}) {
  const names = [...new Set(vault.map((i) => i.collection).filter(Boolean))] as string[];

  if (names.length === 0) {
    return (
      <EmptyState
        title="No collections yet"
        subtitle="Set a collection name when editing an item to group related notes, links, and ideas together."
        compact
      />
    );
  }

  return (
    <div className="space-y-8">
      {names.map((name) => (
        <div key={name}>
          <h3 className="mb-3 font-semibold text-ink">{name}</h3>
          <CollectionGrid items={vault.filter((i) => i.collection === name)} onUpdate={onUpdate} onDelete={onDelete} />
        </div>
      ))}
    </div>
  );
}
