export type VaultKind = "note" | "task" | "idea" | "link" | "reading" | "file";

export type Profile = {
  name: string;
  theme: "light" | "dark";
  createdAt: string;
};

export type VaultItem = {
  id: string;
  kind: VaultKind;
  title: string;
  content?: string;
  url?: string;
  description?: string;
  thumbnail?: string;
  siteName?: string;
  favicon?: string;
  tags: string[];
  collection?: string;
  favorite: boolean;
  pinned: boolean;
  archived: boolean;
  public: boolean;
  priority?: "low" | "medium" | "high";
  status?: "pending" | "completed" | "unread" | "reading" | "read";
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
};

export type ActivityEntry = {
  id: string;
  itemId: string;
  itemTitle: string;
  action: "created" | "updated" | "deleted" | "shared";
  at: string;
};

export type SharePayload = {
  name: string;
  exportedAt: string;
  items: VaultItem[];
};
