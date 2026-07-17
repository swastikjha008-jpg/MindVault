"use client";

import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import type { Profile, VaultItem } from "@mindvault/types";
import type { Page } from "@/lib/nav";
import { ItemCard } from "./ItemCard";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export function Dashboard({
  profile,
  vault,
  setPage,
  onUpdate
}: {
  profile: Profile;
  vault: VaultItem[];
  setPage: (page: Page) => void;
  onUpdate: (id: string, patch: Partial<VaultItem>) => void;
}) {
  const byKind = (kind: VaultItem["kind"]) => vault.filter((i) => i.kind === kind);
  const openTasks = byKind("task").filter((i) => i.status !== "completed");
  const reading = byKind("reading").filter((i) => i.status !== "read");
  const favorites = vault.filter((i) => i.favorite);
  const publicItems = vault.filter((i) => i.public || i.pinned);
  const collections = [...new Set(vault.map((i) => i.collection).filter(Boolean))] as string[];

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-ink">
          {greeting()}, <span className="text-brand">{profile.name}</span> 👋
        </h2>
        <p className="text-slate-500">{openTasks.length} tasks open · everything saved locally in this browser</p>
      </div>

      <section className="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 font-semibold text-ink">
            <Share2 size={16} className="text-brand" /> Share & export
          </p>
          <span className="rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-600">
            {publicItems.length} public item{publicItems.length === 1 ? "" : "s"}
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500">
            Generate a share link or export a JSON backup of your vault
          </div>
          <button onClick={() => setPage("share")} className="rounded-lg bg-brand px-4 py-3 font-semibold text-white">
            Manage sharing
          </button>
        </div>
      </section>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {[
          ["Notes", byKind("note").length],
          ["Ideas", byKind("idea").length],
          ["Web Clips", byKind("link").length],
          ["Favorites", favorites.length]
        ].map(([label, count]) => (
          <Stat key={label as string} label={label as string} count={count as number} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Panel title="Recent notes" items={byKind("note").slice(0, 4)} onUpdate={onUpdate} />
        <Panel title="Recent web clips" items={byKind("link").slice(0, 4)} onUpdate={onUpdate} />
        <Panel title="Today's tasks" items={openTasks.slice(0, 4)} onUpdate={onUpdate} />
        <Panel title="Reading list" items={reading.slice(0, 4)} onUpdate={onUpdate} />
      </div>

      {collections.length > 0 && (
        <section className="mt-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <h3 className="mb-3 font-semibold text-ink">Collections</h3>
          <div className="flex flex-wrap gap-2">
            {collections.map((c) => (
              <span key={c} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-600">
                {c} · {vault.filter((i) => i.collection === c).length}
              </span>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}

function Panel({ title, items, onUpdate }: { title: string; items: VaultItem[]; onUpdate: (id: string, patch: Partial<VaultItem>) => void }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 font-semibold text-ink">{title}</h3>
      <div className="space-y-3">
        {items.length ? items.map((item) => <ItemCard key={item.id} item={item} onUpdate={onUpdate} />) : <p className="text-sm text-slate-400">No items yet.</p>}
      </div>
    </section>
  );
}

function Stat({ label, count }: { label: string; count: number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-3xl font-bold text-ink">{count}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </div>
  );
}
