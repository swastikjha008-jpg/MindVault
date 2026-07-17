import {
  Activity,
  BookOpen,
  CheckSquare,
  FileText,
  Globe,
  Grid2X2,
  LayoutDashboard,
  Lightbulb,
  Share2,
  Tag,
  type LucideIcon
} from "lucide-react";

export type Page =
  | "dashboard"
  | "notes"
  | "ideas"
  | "tasks"
  | "links"
  | "reading"
  | "collections"
  | "tags"
  | "activity"
  | "share";

export const nav: { section: string; items: [Page, string, LucideIcon][] }[] = [
  {
    section: "WORKSPACE",
    items: [
      ["dashboard", "Dashboard", LayoutDashboard],
      ["notes", "Notes", FileText],
      ["ideas", "Ideas", Lightbulb],
      ["tasks", "Tasks", CheckSquare]
    ]
  },
  {
    section: "CAPTURE",
    items: [
      ["links", "Web Clips", Globe],
      ["reading", "Reading List", BookOpen],
      ["collections", "Collections", Grid2X2],
      ["tags", "Tags", Tag]
    ]
  },
  {
    section: "MORE",
    items: [
      ["activity", "Activity History", Activity],
      ["share", "Share & Export", Share2]
    ]
  }
];

export const pageTitles: Record<Page, string> = {
  dashboard: "Dashboard",
  notes: "Notes",
  ideas: "Ideas",
  tasks: "Tasks",
  links: "Web Clips",
  reading: "Reading List",
  collections: "Collections",
  tags: "Tags",
  activity: "Activity History",
  share: "Share & Export"
};

export const tagColors: Record<string, string> = {
  Books: "#3b82f6",
  Design: "#10b981",
  Work: "#f59e0b",
  Ideas: "#8b5cf6",
  Personal: "#ec4899",
  Reading: "#4f7ef8"
};

export function colorForTag(tag: string) {
  if (tagColors[tag]) return tagColors[tag];
  let hash = 0;
  for (let i = 0; i < tag.length; i++) hash = tag.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 60%, 50%)`;
}
