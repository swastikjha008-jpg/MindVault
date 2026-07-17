"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function WelcomeScreen({ onContinue }: { onContinue: (name: string) => void }) {
  const [name, setName] = useState("");

  const submit = () => {
    if (!name.trim()) return;
    onContinue(name.trim());
  };

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-soft text-center"
      >
        <div className="mx-auto mb-6 grid h-14 w-14 place-items-center rounded-2xl bg-brand text-xl font-bold text-white">M</div>
        <h1 className="text-2xl font-semibold text-ink">Welcome to MindVault</h1>
        <p className="mt-2 text-sm text-slate-500">What should we call you?</p>

        <div className="mt-6 space-y-3 text-left">
          <input
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Your name"
            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
          />
          <button
            onClick={submit}
            disabled={!name.trim()}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue <ArrowRight size={16} />
          </button>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          No accounts. No passwords. Everything you save stays in this browser.
        </p>
      </motion.div>
    </main>
  );
}
