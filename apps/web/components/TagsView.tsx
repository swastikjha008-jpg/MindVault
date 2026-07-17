"use client";

import type { VaultItem } from "@mindvault/types";
import { colorForTag } from "@/lib/nav";
import { EmptyState } from "./EmptyState";

export function TagsView({ tags, vault, onSelectTag }: { tags: string[]; vault: VaultItem[]; onSelectTag: (tag: string) => void }) {
  if (tags.length === 0) return <EmptyState title="No tags yet" subtitle="Add a tag when you save something to see it here." compact />;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onSelectTag(tag)}
          className="rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
        >
          <div className="mb-4 h-2 rounded-full" style={{ backgroundColor: colorForTag(tag) }} />
          <p className="font-semibold text-ink">{tag}</p>
          <p className="text-sm text-slate-500">{vault.filter((i) => i.tags.includes(tag)).length} items</p>
        </button>
      ))}
    </div>
  );
}
