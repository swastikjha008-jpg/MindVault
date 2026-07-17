"use client";

import { Grid2X2 } from "lucide-react";

export function EmptyState({ title, subtitle, compact = false }: { title: string; subtitle?: string; compact?: boolean }) {
  return (
    <div className={`grid ${compact ? "min-h-64" : "min-h-screen"} place-items-center rounded-xl border border-dashed border-slate-200 bg-white/60 p-6 text-center`}>
      <div>
        <Grid2X2 className="mx-auto mb-3 text-brand" />
        <h2 className="text-xl font-semibold text-ink">{title}</h2>
        {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}
