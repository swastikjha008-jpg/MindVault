"use client";

import { RotateCcw } from "lucide-react";
import type { Profile } from "@mindvault/types";
import { nav, type Page } from "@/lib/nav";

export function Sidebar({
  page,
  setPage,
  noteCount,
  profile,
  onReset
}: {
  page: Page;
  setPage: (page: Page) => void;
  noteCount: number;
  profile: Profile;
  onReset: () => void;
}) {
  return (
    <>
      <div className="px-5 pb-5 pt-6">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-sm font-bold">M</div>
          <div>
            <p className="font-bold">MindVault</p>
            <p className="text-xs text-blue-300">Your Second Brain</p>
          </div>
        </div>
      </div>
      <nav className="flex-1 space-y-5 overflow-y-auto px-3">
        {nav.map(({ section, items }) => (
          <div key={section}>
            <p className="mb-2 px-2 text-xs font-bold tracking-widest text-blue-300">{section}</p>
            {items.map(([id, label, Icon]) => (
              <button
                key={id}
                onClick={() => setPage(id)}
                className={`mb-1 flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition ${
                  page === id ? "bg-brand text-white" : "text-blue-100 hover:bg-white/10"
                }`}
              >
                <span className="flex items-center gap-2">
                  <Icon size={16} /> {label}
                </span>
                {id === "notes" && noteCount > 0 && (
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-xs">{noteCount}</span>
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-blue-900/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-full bg-brand text-xs font-bold">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold">{profile.name}</p>
              <p className="text-xs text-blue-300">Local profile</p>
            </div>
          </div>
          <button
            onClick={onReset}
            className="rounded-lg p-2 text-blue-200 hover:bg-white/10"
            aria-label="Switch profile"
            title="Clear local profile and start over"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    </>
  );
}
