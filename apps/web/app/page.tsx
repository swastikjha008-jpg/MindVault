"use client";

import { useMemo, useState } from "react";
import type { VaultItem, VaultKind } from "@mindvault/types";
import { useProfile } from "@/hooks/useProfile";
import { useVault } from "@/hooks/useVault";
import { useSearch } from "@/hooks/useSearch";
import { getActivity } from "@/lib/storage/items";
import { WelcomeScreen } from "@/components/WelcomeScreen";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { QuickAdd, type Draft } from "@/components/QuickAdd";
import { Dashboard } from "@/components/Dashboard";
import { CollectionGrid } from "@/components/CollectionGrid";
import { TagsView } from "@/components/TagsView";
import { CollectionsView } from "@/components/CollectionsView";
import { ActivityView } from "@/components/ActivityView";
import { ShareView } from "@/components/ShareView";
import { EmptyState } from "@/components/EmptyState";
import type { Page } from "@/lib/nav";

const seedItems: Array<Partial<VaultItem> & { kind: VaultKind; title: string }> = [
  { kind: "note", title: "Deep work framework - Cal Newport", content: "Key insight: deep work is the ability to focus without distraction on a cognitively demanding task.", tags: ["Books"], pinned: true, public: true },
  { kind: "idea", title: "Second brain share feed", content: "A public link where anyone can view curated notes, links, and reading resources.", tags: ["Ideas"], public: true },
  { kind: "task", title: "Write weekly reflection note", tags: ["Work"], priority: "high", status: "pending" },
  { kind: "link", title: "10 usability heuristics for interface design", url: "https://www.nngroup.com/articles/ten-usability-heuristics/", description: "Nielsen Norman Group's classic usability principles.", tags: ["Design"], public: true },
  { kind: "reading", title: "How to do great work", url: "https://paulgraham.com/greatwork.html", status: "reading", tags: ["Reading"] }
];

export default function Home() {
  const { profile, ready: profileReady, start } = useProfile();
  const { items, allItems, ready: vaultReady, add, update, remove, seed } = useVault();

  const [page, setPage] = useState<Page>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft>({ kind: "note", title: "", url: "", tag: "" });

  const byKind = (kind: VaultKind) => items.filter((i) => i.kind === kind);
  const publicItems = items.filter((i) => i.public || i.pinned);
  const tags = [...new Set(items.flatMap((i) => i.tags || []))];
  const activity = useMemo(() => getActivity(), [items]);

  const pageItems = useMemo(() => {
    if (selectedTag) return items.filter((i) => i.tags.includes(selectedTag));
    if (page === "notes") return byKind("note");
    if (page === "ideas") return byKind("idea");
    if (page === "tasks") return byKind("task");
    if (page === "links") return byKind("link");
    if (page === "reading") return byKind("reading");
    return items;
  }, [page, items, selectedTag]);

  const searched = useSearch(pageItems, query);

  if (!profileReady || !vaultReady) {
    return <EmptyState title="Opening your vault..." />;
  }

  if (!profile) {
    return <WelcomeScreen onContinue={start} />;
  }

  const addDraft = () => {
    if (!draft.title.trim()) return;
    add({
      kind: draft.kind,
      title: draft.title,
      tags: draft.tag ? [draft.tag] : [],
      url: draft.kind === "link" || draft.kind === "reading" ? draft.url : undefined,
      description: draft.kind !== "link" && draft.kind !== "reading" ? draft.url : undefined,
      priority: draft.kind === "task" ? "medium" : undefined,
      status: draft.kind === "task" ? "pending" : draft.kind === "reading" ? "unread" : undefined,
      public: draft.kind === "link" || draft.kind === "note"
    });
    setDraft({ kind: draft.kind, title: "", url: "", tag: "" });
  };

  const uploadFile = (file: { title: string; content: string; thumbnail?: string }) => {
    add({ kind: "file", title: file.title, content: file.content, thumbnail: file.thumbnail, tags: [] });
  };

  const runSeed = () => seed(seedItems);

  const changePage = (next: Page) => {
    setSelectedTag(null);
    setPage(next);
    setMenuOpen(false);
  };

  const collectionPages: Page[] = ["notes", "ideas", "tasks", "links", "reading"];

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className={`${menuOpen ? "fixed inset-y-0 left-0 z-40" : "hidden"} w-64 flex-col bg-ink text-white md:flex`}>
        <Sidebar page={page} setPage={changePage} noteCount={byKind("note").length} profile={profile} onReset={() => window.location.reload()} />
      </aside>
      {menuOpen && <button className="fixed inset-0 z-30 bg-black/30 md:hidden" onClick={() => setMenuOpen(false)} aria-label="Close menu" />}

      <main className="min-w-0 flex-1">
        <Header page={page} setPage={changePage} query={query} setQuery={setQuery} onOpenMenu={() => setMenuOpen(true)} />

        <div className="mx-auto max-w-7xl p-4 md:p-8">
          {page !== "share" && page !== "activity" && <QuickAdd draft={draft} setDraft={setDraft} onAdd={addDraft} onUploadFile={uploadFile} />}

          {items.length === 0 && page !== "share" && page !== "activity" && (
            <div className="mb-6 rounded-xl border border-dashed border-blue-200 bg-blue-50/40 p-5 text-sm text-slate-600">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                <span>Your vault is empty. Add sample items to preview the full app.</span>
                <button onClick={runSeed} className="rounded-lg bg-ink px-4 py-2 font-semibold text-white">
                  Add starter items
                </button>
              </div>
            </div>
          )}

          {selectedTag && (
            <div className="mb-4 flex items-center gap-2 text-sm text-slate-500">
              Filtering by tag <span className="rounded-full bg-slate-100 px-2 py-0.5 font-semibold text-ink">{selectedTag}</span>
              <button onClick={() => setSelectedTag(null)} className="text-brand hover:underline">
                Clear
              </button>
            </div>
          )}

          {page === "dashboard" && !selectedTag && <Dashboard profile={profile} vault={items} setPage={changePage} onUpdate={update} />}
          {(collectionPages.includes(page) || selectedTag) && <CollectionGrid items={searched} onUpdate={update} onDelete={remove} />}
          {page === "collections" && !selectedTag && <CollectionsView vault={items} onUpdate={update} onDelete={remove} />}
          {page === "tags" && !selectedTag && <TagsView tags={tags} vault={items} onSelectTag={setSelectedTag} />}
          {page === "activity" && <ActivityView activity={activity} />}
          {page === "share" && <ShareView profile={profile} publicItems={publicItems} allItems={allItems} onUpdate={update} />}
        </div>
      </main>
    </div>
  );
}
