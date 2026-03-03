"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Megaphone } from "lucide-react";

// ============================================
// Types
// ============================================

export interface Announcement {
  id: string;
  title: string;
  description: string;
}

export interface AnnouncementsCardProps {
  title?: string;
  announcements?: Announcement[];
  onDismiss?: (announcementId: string) => void;
  onDismissAll?: () => void;
}

// ============================================
// Default Data
// ============================================

const defaultAnnouncements: Announcement[] = [
  {
    id: "1",
    title: "Assignments Due Early",
    description: "Remember that Module 5 assignments must be submitted before the deadline.",
  },
  {
    id: "2",
    title: "New Course Material",
    description: "New reading materials have been added to Module 3. Please review before next class.",
  },
  {
    id: "3",
    title: "Office Hours Change",
    description: "Office hours for this week have been moved to Thursday 2-4pm.",
  },
];

// ============================================
// Announcements Card
// ============================================

export function AnnouncementsCard({
  title = "Announcements",
  announcements = defaultAnnouncements,
  onDismiss,
  onDismissAll,
}: AnnouncementsCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (announcements.length === 0) return null;

  const current = announcements[currentIndex];
  const total = announcements.length;

  const goNext = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const goPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      {/* Header */}
      <div className="flex items-center gap-[var(--spacing-md)]">
        <Megaphone className="size-5" style={{ color: "var(--canvas-text)" }} />
        <Typography variant="h5">{title}</Typography>
      </div>

      {/* Card */}
      <div
        className={cn(
          "rounded-[var(--radius-md)] border border-[var(--canvas-border)]",
          "bg-[var(--canvas-surface)]",
          "p-[var(--spacing-xl)]",
          "flex flex-col gap-[var(--spacing-lg)]"
        )}
      >
        {/* Announcement Content */}
        <div className="flex flex-col gap-[var(--spacing-sm)]">
          <Typography variant="body-m" style={{ fontWeight: 600, color: "var(--canvas-primary)" }}>
            {current.title}
          </Typography>
          <Typography variant="body-s" color="muted">
            {current.description}
          </Typography>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => onDismiss?.(current.id)}
            className="cursor-pointer hover:underline"
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 500,
              color: "var(--canvas-neutral-text)",
            }}
          >
            Dismiss
          </button>
          <div className="flex items-center gap-[var(--spacing-md)]">
            <span
              style={{
                fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                fontSize: "var(--typo-body-s-size)",
                fontWeight: 400,
                color: "var(--canvas-neutral-text)",
              }}
            >
              <span style={{ fontWeight: 600, color: "var(--canvas-text)" }}>{currentIndex + 1}</span>
              /{total}
            </span>
            <button
              onClick={goPrev}
              className="cursor-pointer p-1 hover:bg-[var(--canvas-neutral-surface)] rounded-[var(--radius-xs)] transition-colors"
              aria-label="Previous announcement"
            >
              <ChevronLeft className="size-4" style={{ color: "var(--canvas-text)" }} />
            </button>
            <button
              onClick={goNext}
              className="cursor-pointer p-1 hover:bg-[var(--canvas-neutral-surface)] rounded-[var(--radius-xs)] transition-colors"
              aria-label="Next announcement"
            >
              <ChevronRight className="size-4" style={{ color: "var(--canvas-text)" }} />
            </button>
          </div>
        </div>

        {/* Dismiss All */}
        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={onDismissAll}
        >
          Dismiss all
        </Button>
      </div>
    </div>
  );
}
