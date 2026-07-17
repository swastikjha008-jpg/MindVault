import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindVault",
  description: "A lightweight, offline-first personal second brain — no accounts, no servers."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
