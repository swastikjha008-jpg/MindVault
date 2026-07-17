"use client";

import { motion } from "framer-motion";
import { Share2, Star, Trash2 } from "lucide-react";
import type { VaultItem } from "@mindvault/types";
import { colorForTag } from "@/lib/nav";

export function ItemCard({
  item,
  onUpdate,
  onDelete
}: {
  item: VaultItem;
  onUpdate: (id: string, patch: Partial<VaultItem>) => void;
  onDelete?: (id: string) => void;
}) {
  const color = colorForTag(item.tags?.[0] || item.kind);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-soft"
    >
      {item.thumbnail && (
        <img src={item.thumbnail} alt="" className="mb-3 h-32 w-full rounded-lg object-cover" />
      )}
      <div className="mb-3 flex items-center justify-between gap-3">
        <span className="rounded-md px-2 py-1 text-xs font-semibold text-white" style={{ backgroundColor: color }}>
          {item.tags?.[0] || item.kind}
        </span>
        <div className="flex gap-1">
          <button
            onClick={() => onUpdate(item.id, { favorite: !item.favorite })}
            className={`rounded-lg p-2 ${item.favorite ? "bg-amber-50 text-amber-500" : "text-slate-400 hover:bg-slate-50"}`}
            aria-label="Toggle favorite"
          >
            <Star size={15} fill={item.favorite ? "currentColor" : "none"} />
          </button>
          <button
            onClick={() => onUpdate(item.id, { public: !item.public, pinned: !item.public })}
            className={`rounded-lg p-2 ${item.public ? "bg-blue-50 text-brand" : "text-slate-400 hover:bg-slate-50"}`}
            aria-label="Toggle public"
            title={item.public ? "Included in your shared feed" : "Add to shared feed"}
          >
            <Share2 size={15} />
          </button>
          {onDelete && (
            <button
              onClick={() => onDelete(item.id)}
              className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-500"
              aria-label="Archive"
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
      <h3 className="mb-2 text-base font-semibold leading-snug text-ink">{item.title}</h3>
      <p className="line-clamp-3 text-sm leading-6 text-slate-500">
        {item.description || item.content || item.url || "No extra details yet."}
      </p>
      {item.kind === "task" && (
        <button
          onClick={() => onUpdate(item.id, { status: item.status === "completed" ? "pending" : "completed" })}
          className={`mt-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            item.status === "completed" ? "bg-green-50 text-green-600" : "bg-slate-100 text-slate-500"
          }`}
        >
          {item.status === "completed" ? "Completed" : "Mark complete"}
        </button>
      )}
      <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
        <span>{item.kind}</span>
        <span>{new Date(item.updatedAt).toLocaleDateString()}</span>
      </div>
    </motion.article>
  );
}
