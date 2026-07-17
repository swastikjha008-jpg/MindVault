"use client";

import { Menu, Search, Share2 } from "lucide-react";
import type { Page } from "@/lib/nav";
import { pageTitles } from "@/lib/nav";

export function Header({
  page,
  setPage,
  query,
  setQuery,
  onOpenMenu
}: {
  page: Page;
  setPage: (page: Page) => void;
  query: string;
  setQuery: (query: string) => void;
  onOpenMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-slate-50/90 px-4 py-4 backdrop-blur md:px-8">
      <div className="flex items-center gap-3">
        <button className="rounded-lg border border-slate-200 bg-white p-2 md:hidden" onClick={onOpenMenu} aria-label="Open menu">
          <Menu size={18} />
        </button>
        <h1 className="text-lg font-semibold text-ink">{pageTitles[page]}</h1>
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-64 rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
            placeholder="Search your vault..."
          />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setPage("share")}
          className="hidden items-center gap-2 rounded-xl bg-ink px-4 py-2 text-sm font-semibold text-white sm:flex"
        >
          <Share2 size={15} /> Share
        </button>
      </div>
    </header>
  );
}
