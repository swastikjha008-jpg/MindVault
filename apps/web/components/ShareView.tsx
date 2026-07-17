"use client";

import { useState } from "react";
import { Copy, Download, Share2 } from "lucide-react";
import type { Profile, VaultItem } from "@mindvault/types";
import { buildShareUrl, buildSharePayload, downloadShareFile } from "@/lib/share";
import { CollectionGrid } from "./CollectionGrid";

export function ShareView({
  profile,
  publicItems,
  allItems,
  onUpdate
}: {
  profile: Profile;
  publicItems: VaultItem[];
  allItems: VaultItem[];
  onUpdate: (id: string, patch: Partial<VaultItem>) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");

  const generateLink = () => {
    const url = buildShareUrl(buildSharePayload(profile.name, publicItems));
    setShareUrl(url);
  };

  const copy = async () => {
    if (!shareUrl) return;
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const exportAll = () => downloadShareFile(buildSharePayload(profile.name, allItems));

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-1 flex items-center gap-2 font-semibold text-ink">
          <Share2 size={17} className="text-brand" /> Shareable link
        </p>
        <p className="mb-4 text-sm text-slate-500">
          Mark items as public from any card, then generate a link. The link encodes your public items directly —
          no account or server required, so anyone with the link can view them.
        </p>
        {shareUrl ? (
          <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
              {shareUrl}
            </div>
            <button onClick={copy} className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 font-semibold text-white">
              <Copy size={15} /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
        ) : (
          <button onClick={generateLink} className="rounded-lg bg-brand px-4 py-3 font-semibold text-white" disabled={publicItems.length === 0}>
            {publicItems.length === 0 ? "Mark something as public first" : "Generate share link"}
          </button>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <p className="mb-1 flex items-center gap-2 font-semibold text-ink">
          <Download size={17} className="text-brand" /> Export a JSON backup
        </p>
        <p className="mb-4 text-sm text-slate-500">
          Download everything in your vault ({allItems.length} item{allItems.length === 1 ? "" : "s"}) as a JSON file
          you can keep, move to another browser, or use to migrate to a real database later.
        </p>
        <button onClick={exportAll} className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-50">
          <Download size={15} /> Export JSON
        </button>
      </section>

      <div>
        <h3 className="mb-3 font-semibold text-ink">Public items ({publicItems.length})</h3>
        <CollectionGrid
          items={publicItems}
          onUpdate={onUpdate}
          emptyTitle="Nothing shared yet"
          emptySubtitle="Tap the share icon on any card to add it to your public feed."
        />
      </div>
    </div>
  );
}
