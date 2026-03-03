"use client";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { LayoutGrid, ChevronRight, BookOpen, Calendar } from "lucide-react";

// ============================================
// Types
// ============================================

export interface AssignmentItem {
  id: string;
  title: string;
  moduleName: string;
  courseName: string;
  dueDate: string;
}

export interface AssignmentsListProps {
  title?: string;
  assignments?: AssignmentItem[];
  onSeeAll?: () => void;
  onAssignmentClick?: (assignmentId: string) => void;
}

// ============================================
// Default Data
// ============================================

const defaultAssignments: AssignmentItem[] = [
  {
    id: "1",
    title: "Assignment One",
    moduleName: "Module Name",
    courseName: "AI is the Future",
    dueDate: "Due on 10 October 2024",
  },
  {
    id: "2",
    title: "Assignment Two",
    moduleName: "Module Name",
    courseName: "AI is the Future",
    dueDate: "Due on 10 October 2024",
  },
];

// ============================================
// Assignment Row
// ============================================

function AssignmentRow({
  assignment,
  onClick,
}: {
  assignment: AssignmentItem;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer w-full flex items-center justify-between",
        "rounded-[var(--radius-md)] border border-[var(--canvas-border)]",
        "p-[var(--spacing-xl)]",
        "bg-[var(--canvas-surface)] hover:bg-[var(--canvas-neutral-surface)]",
        "transition-colors text-left"
      )}
    >
      <div className="flex flex-col gap-[var(--spacing-sm)]">
        <Typography variant="body-m" style={{ fontWeight: 600 }}>
          {assignment.title}
        </Typography>
        <div className="flex flex-col gap-[var(--spacing-xs)]">
          <span
            className="flex items-center gap-[var(--spacing-sm)]"
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 400,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-neutral-text)",
            }}
          >
            <LayoutGrid className="size-3.5" />
            {assignment.moduleName}
          </span>
          <span
            className="flex items-center gap-[var(--spacing-sm)]"
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 400,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-neutral-text)",
            }}
          >
            <BookOpen className="size-3.5" />
            {assignment.courseName}
          </span>
          <span
            className="flex items-center gap-[var(--spacing-sm)]"
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 400,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-neutral-text)",
            }}
          >
            <Calendar className="size-3.5" />
            {assignment.dueDate}
          </span>
        </div>
      </div>
      <ChevronRight className="size-5 shrink-0" style={{ color: "var(--canvas-neutral-text)" }} />
    </button>
  );
}

// ============================================
// Assignments List
// ============================================

export function AssignmentsList({
  title = "Assignments",
  assignments = defaultAssignments,
  onSeeAll,
  onAssignmentClick,
}: AssignmentsListProps) {
  return (
    <div className="flex flex-col gap-[var(--spacing-xl)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-[var(--spacing-md)]">
          <LayoutGrid className="size-5" style={{ color: "var(--canvas-text)" }} />
          <Typography variant="h5">{title}</Typography>
        </div>
        {onSeeAll && (
          <Button variant="outline" size="sm" onClick={onSeeAll}>
            See all
          </Button>
        )}
      </div>

      {/* Assignment Rows */}
      <div className="flex flex-col gap-[var(--spacing-md)]">
        {assignments.map((assignment) => (
          <AssignmentRow
            key={assignment.id}
            assignment={assignment}
            onClick={() => onAssignmentClick?.(assignment.id)}
          />
        ))}
      </div>
    </div>
  );
}
