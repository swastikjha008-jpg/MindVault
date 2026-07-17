"use client";

import { useRef } from "react";
import { Paperclip, Plus } from "lucide-react";
import type { VaultKind } from "@mindvault/types";

export type Draft = { kind: VaultKind; title: string; url: string; tag: string };

const KINDS: { value: VaultKind; label: string }[] = [
  { value: "note", label: "Note" },
  { value: "task", label: "Task" },
  { value: "idea", label: "Idea" },
  { value: "link", label: "Web clip" },
  { value: "reading", label: "Reading" }
];

const MAX_INLINE_FILE_BYTES = 1_000_000;

export function QuickAdd({
  draft,
  setDraft,
  onAdd,
  onUploadFile
}: {
  draft: Draft;
  setDraft: (draft: Draft) => void;
  onAdd: () => void;
  onUploadFile: (file: { title: string; content: string; thumbnail?: string }) => void;
}) {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleFile = (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    const sizeLabel = file.size > 1024 * 1024 ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : `${Math.ceil(file.size / 1024)} KB`;
    const isImage = file.type.startsWith("image/");

    if (file.size > MAX_INLINE_FILE_BYTES) {
      onUploadFile({ title: file.name, content: `${file.type || "File"} · ${sizeLabel} · too large to store locally, showing reference only.` });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : undefined;
      onUploadFile({
        title: file.name,
        content: `${file.type || "File"} · ${sizeLabel}`,
        thumbnail: isImage ? dataUrl : undefined
      });
    };
    reader.readAsDataURL(file);
    if (fileInput.current) fileInput.current.value = "";
  };

  return (
    <div className="mb-6 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm md:grid-cols-[150px_1fr_1fr_120px_auto_auto]">
      <select
        value={draft.kind}
        onChange={(e) => setDraft({ ...draft, kind: e.target.value as VaultKind })}
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm"
      >
        {KINDS.map((k) => (
          <option key={k.value} value={k.value}>
            {k.label}
          </option>
        ))}
      </select>
      <input
        value={draft.title}
        onChange={(e) => setDraft({ ...draft, title: e.target.value })}
        onKeyDown={(e) => e.key === "Enter" && onAdd()}
        placeholder="Capture something important..."
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      />
      <input
        value={draft.url}
        onChange={(e) => setDraft({ ...draft, url: e.target.value })}
        placeholder="URL or context"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      />
      <input
        value={draft.tag}
        onChange={(e) => setDraft({ ...draft, tag: e.target.value })}
        placeholder="Tag"
        className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-100"
      />
      <button onClick={onAdd} className="flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-white">
        <Plus size={15} /> Save
      </button>
      <button
        onClick={() => fileInput.current?.click()}
        className="flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        title="Upload a file"
      >
        <Paperclip size={15} /> File
      </button>
      <input ref={fileInput} type="file" className="hidden" onChange={(e) => handleFile(e.target.files)} />
    </div>
  );
}
