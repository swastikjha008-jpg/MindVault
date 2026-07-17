"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BookOpen, FileText, Globe, Lightbulb, CheckSquare } from "lucide-react";
import type { SharePayload } from "@mindvault/types";
import { decodeShareCode } from "@/lib/share";

export default function SharedFeedPage() {
  const params = useParams<{ code: string }>();
  const [payload, setPayload] = useState<SharePayload | null | undefined>(undefined);

  useEffect(() => {
    const code = Array.isArray(params.code) ? params.code[0] : params.code;
    setPayload(code ? decodeShareCode(code) : null);
  }, [params.code]);

  if (payload === undefined) {
    return <main className="grid min-h-screen place-items-center bg-slate-50" />;
  }

  if (!payload) {
    return (
      <main className="grid min-h-screen place-items-center bg-slate-50 p-6 text-center">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Feed not found</h1>
          <p className="mt-2 text-slate-500">This share link is invalid or has been corrupted.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-ink px-5 py-12 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 grid h-12 w-12 place-items-center rounded-xl bg-brand font-bold">M</div>
          <p className="text-sm font-medium text-blue-200">MindVault shared feed</p>
          <h1 className="mt-2 text-3xl font-semibold">{payload.name}&apos;s Second Brain</h1>
          <p className="mt-3 max-w-2xl text-blue-100">
            Curated notes, links, reading resources, and ideas shared from MindVault. Shared on{" "}
            {new Date(payload.exportedAt).toLocaleDateString()}.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-4 px-5 py-8 sm:grid-cols-2 lg:grid-cols-3">
        {payload.items.map((item) => {
          const Icon = item.kind === "link" ? Globe : item.kind === "reading" ? BookOpen : item.kind === "idea" ? Lightbulb : item.kind === "task" ? CheckSquare : FileText;
          return (
            <article key={item.id} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-brand">
                <Icon size={18} />
              </div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">{item.kind}</p>
              <h2 className="text-lg font-semibold leading-snug text-ink">{item.title}</h2>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">{item.description || item.content || item.url}</p>
              {item.url && (
                <a className="mt-4 inline-block text-sm font-semibold text-brand" href={item.url} target="_blank" rel="noreferrer">
                  Open resource
                </a>
              )}
            </article>
          );
        })}
        {payload.items.length === 0 && <p className="text-slate-500">No public items were included in this share.</p>}
      </section>
    </main>
  );
}
