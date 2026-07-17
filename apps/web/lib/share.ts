import type { SharePayload, VaultItem } from "@mindvault/types";

/** Builds the payload that gets encoded into a share link or export file. */
export function buildSharePayload(name: string, items: VaultItem[]): SharePayload {
  return { name, exportedAt: new Date().toISOString(), items };
}

/** Encodes a share payload into a compact, URL-safe base64 string. */
export function encodeShareCode(payload: SharePayload): string {
  const json = JSON.stringify(payload);
  const base64 =
    typeof window !== "undefined"
      ? window.btoa(unescape(encodeURIComponent(json)))
      : Buffer.from(json, "utf-8").toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Decodes a share code produced by {@link encodeShareCode}. Returns null if invalid. */
export function decodeShareCode(code: string): SharePayload | null {
  try {
    const base64 = code.replace(/-/g, "+").replace(/_/g, "/").padEnd(code.length + ((4 - (code.length % 4)) % 4), "=");
    const json =
      typeof window !== "undefined"
        ? decodeURIComponent(escape(window.atob(base64)))
        : Buffer.from(base64, "base64").toString("utf-8");
    const payload = JSON.parse(json) as SharePayload;
    if (!payload || !Array.isArray(payload.items)) return null;
    return payload;
  } catch {
    return null;
  }
}

export function buildShareUrl(payload: SharePayload): string {
  const code = encodeShareCode(payload);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/share/${code}`;
}

/** Triggers a browser download of the payload as a standalone JSON file. */
export function downloadShareFile(payload: SharePayload) {
  if (typeof window === "undefined") return;
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const slug = payload.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || "mindvault";
  link.href = url;
  link.download = `${slug}-mindvault-export.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
