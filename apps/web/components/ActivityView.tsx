"use client";

import type { ActivityEntry } from "@mindvault/types";
import { CheckSquare, FilePlus, PenLine, Share2, Trash2 } from "lucide-react";
import { EmptyState } from "./EmptyState";

const actionIcon = {
  created: FilePlus,
  updated: PenLine,
  deleted: Trash2,
  shared: Share2
} as const;

const actionLabel: Record<ActivityEntry["action"], string> = {
  created: "created",
  updated: "updated",
  deleted: "archived",
  shared: "shared"
};

export function ActivityView({ activity }: { activity: ActivityEntry[] }) {
  if (activity.length === 0) {
    return <EmptyState title="No activity yet" subtitle="Every save, edit, and share you make will show up here." compact />;
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <ul className="divide-y divide-slate-100">
        {activity.map((entry) => {
          const Icon = actionIcon[entry.action] || CheckSquare;
          return (
            <li key={entry.id} className="flex items-center gap-3 py-3">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-brand">
                <Icon size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-ink">
                  <span className="font-semibold">{entry.itemTitle || "Untitled"}</span>{" "}
                  <span className="text-slate-500">was {actionLabel[entry.action]}</span>
                </p>
                <p className="text-xs text-slate-400">{new Date(entry.at).toLocaleString()}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
