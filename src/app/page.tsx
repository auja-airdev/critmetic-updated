"use client";

import { IconSidebarShell } from "@/components/layout/icon-sidebar-shell";
import { Typography } from "@/components/ui/typography";
import { ModuleCards } from "@/components/blocks/module-cards";
import { AssignmentsList } from "@/components/blocks/assignments-list";
import { AnnouncementsCard } from "@/components/blocks/announcements-card";
import { StudentFeed } from "@/components/blocks/student-feed";
import {
  Home,
  LayoutGrid,
  List,
  CalendarDays,
  BookOpen,
  Link2,
  FolderOpen,
  User,
  Heart,
  Settings,
} from "lucide-react";
import type { IconNavItemConfig } from "@/components/layout/icon-sidebar-shell";

const navItems: IconNavItemConfig[] = [
  { id: "home", label: "Home", icon: Home, isActive: true },
  { id: "modules", label: "Modules", icon: LayoutGrid },
  { id: "list", label: "List", icon: List },
  { id: "calendar", label: "Calendar", icon: CalendarDays },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "links", label: "Links", icon: Link2 },
  { id: "files", label: "Files", icon: FolderOpen },
  { id: "profile", label: "Profile", icon: User },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "settings", label: "Settings", icon: Settings },
];

export default function StudentPortal() {
  return (
    <IconSidebarShell navigation={navItems}>
      {/* Greeting */}
      <Typography variant="h3">
        {"👋"} Hey there, Mark!
      </Typography>

      {/* Main Content Grid: Left (modules + assignments) / Right (announcements + feed) */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-[var(--spacing-4xl)]">
        {/* Left Column */}
        <div className="flex flex-col gap-[var(--spacing-4xl)]">
          <ModuleCards onSeeAll={() => {}} />
          <AssignmentsList onSeeAll={() => {}} />
        </div>

        {/* Right Sidebar */}
        <aside className="flex flex-col gap-[var(--spacing-4xl)]">
          <AnnouncementsCard
            onDismiss={(id) => console.log("Dismiss:", id)}
            onDismissAll={() => console.log("Dismiss all")}
          />
          <StudentFeed
            onLike={(id) => console.log("Like:", id)}
            onComment={(id) => console.log("Comment:", id)}
            onShare={(id) => console.log("Share:", id)}
            onSeeMore={() => console.log("See more")}
          />
        </aside>
      </div>
    </IconSidebarShell>
  );
}
