"use client";

import { cn } from "@/lib/utils";
import { Typography } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { LayoutGrid } from "lucide-react";

// ============================================
// Types
// ============================================

type ModuleStatus = "to-be-done" | "in-progress" | "completed";

export interface ModuleCardItem {
  id: string;
  number: number;
  name: string;
  lessonsCount: number;
  assignmentsCount: number;
  status: ModuleStatus;
  /** Background color for the card */
  bgColor: string;
}

export interface ModuleCardsProps {
  title?: string;
  modules?: ModuleCardItem[];
  onSeeAll?: () => void;
  onModuleClick?: (moduleId: string) => void;
}

// ============================================
// Status Badge
// ============================================

const statusConfig: Record<ModuleStatus, { label: string; bg: string; text: string }> = {
  "to-be-done": { label: "To be done", bg: "rgba(0,0,0,0.5)", text: "#ffffff" },
  "in-progress": { label: "In progress", bg: "rgba(0,0,0,0.5)", text: "#ffffff" },
  "completed": { label: "Completed", bg: "rgba(0,0,0,0.5)", text: "#ffffff" },
};

function StatusBadge({ status }: { status: ModuleStatus }) {
  const config = statusConfig[status];
  return (
    <span
      className="inline-flex items-center px-[var(--spacing-md)] py-[var(--spacing-xs)] rounded-[var(--radius-xs)]"
      style={{
        backgroundColor: config.bg,
        color: config.text,
        fontFamily: "var(--typo-body-xs-font, var(--typo-global-font))",
        fontSize: "var(--typo-body-xs-size)",
        fontWeight: 600,
        lineHeight: "var(--typo-body-xs-line-height)",
      }}
    >
      {config.label}
    </span>
  );
}

// ============================================
// Decorative Pattern SVG
// ============================================

function DecoPattern({ variant }: { variant: number }) {
  const patterns = [
    // Concentric circles
    <svg key="circles" viewBox="0 0 120 120" className="w-full h-full opacity-30">
      <circle cx="80" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="80" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>,
    // Diagonal lines
    <svg key="lines" viewBox="0 0 120 120" className="w-full h-full opacity-30">
      {Array.from({ length: 8 }).map((_, i) => (
        <line key={i} x1={i * 18} y1="0" x2={i * 18 + 60} y2="120" stroke="currentColor" strokeWidth="2" />
      ))}
    </svg>,
    // Zigzag
    <svg key="zigzag" viewBox="0 0 120 120" className="w-full h-full opacity-30">
      {Array.from({ length: 6 }).map((_, i) => (
        <polyline key={i} points={`0,${i * 20 + 10} 20,${i * 20} 40,${i * 20 + 10} 60,${i * 20} 80,${i * 20 + 10} 100,${i * 20} 120,${i * 20 + 10}`} fill="none" stroke="currentColor" strokeWidth="2" />
      ))}
    </svg>,
    // Grid of crosses
    <svg key="crosses" viewBox="0 0 120 120" className="w-full h-full opacity-30">
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 3 }).map((_, col) => (
          <g key={`${row}-${col}`} transform={`translate(${col * 40 + 20}, ${row * 30 + 15})`}>
            <line x1="-6" y1="0" x2="6" y2="0" stroke="currentColor" strokeWidth="2" />
            <line x1="0" y1="-6" x2="0" y2="6" stroke="currentColor" strokeWidth="2" />
          </g>
        ))
      )}
    </svg>,
    // Dots grid
    <svg key="dots" viewBox="0 0 120 120" className="w-full h-full opacity-30">
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle key={`${row}-${col}`} cx={col * 20 + 10} cy={row * 20 + 10} r="3" fill="currentColor" />
        ))
      )}
    </svg>,
  ];
  return patterns[variant % patterns.length];
}

// ============================================
// Module Card
// ============================================

function ModuleCard({ module, onClick }: { module: ModuleCardItem; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer relative overflow-hidden rounded-[var(--radius-md)] p-[var(--spacing-xl)]",
        "flex flex-col justify-between min-h-[160px]",
        "text-left transition-transform hover:scale-[1.02]"
      )}
      style={{ backgroundColor: module.bgColor, color: "#1a1a2e" }}
    >
      {/* Content */}
      <div className="relative z-10 flex flex-col gap-[var(--spacing-sm)]">
        <div className="flex items-center gap-[var(--spacing-md)]">
          <span
            className="inline-flex items-center justify-center size-7 rounded-full"
            style={{
              backgroundColor: "rgba(0,0,0,0.15)",
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 700,
              color: "#1a1a2e",
            }}
          >
            {module.number}
          </span>
          <span
            style={{
              fontFamily: "var(--typo-body-m-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-m-size)",
              fontWeight: 600,
              lineHeight: "var(--typo-body-m-line-height)",
            }}
          >
            {module.name}
          </span>
        </div>

        <div className="flex flex-col gap-[var(--spacing-xs)] ml-[calc(1.75rem+var(--spacing-md))]">
          <span
            className="flex items-center gap-[var(--spacing-sm)]"
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 400,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "rgba(26,26,46,0.7)",
            }}
          >
            <LayoutGrid className="size-3.5" />
            {module.lessonsCount} lessons
          </span>
          <span
            className="flex items-center gap-[var(--spacing-sm)]"
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: 400,
              lineHeight: "var(--typo-body-s-line-height)",
              color: "rgba(26,26,46,0.7)",
            }}
          >
            <LayoutGrid className="size-3.5" />
            {module.assignmentsCount} assignments
          </span>
        </div>
      </div>

      <div className="relative z-10 mt-[var(--spacing-lg)]">
        <StatusBadge status={module.status} />
      </div>

      {/* Decorative Pattern */}
      <div className="absolute top-0 right-0 bottom-0 w-2/5" style={{ color: "rgba(0,0,0,0.15)" }}>
        <DecoPattern variant={module.number - 1} />
      </div>
    </button>
  );
}

// ============================================
// Default Data
// ============================================

const defaultModules: ModuleCardItem[] = [
  { id: "1", number: 1, name: "Module Name", lessonsCount: 3, assignmentsCount: 5, status: "to-be-done", bgColor: "#f87171" },
  { id: "2", number: 2, name: "Module Name", lessonsCount: 3, assignmentsCount: 5, status: "in-progress", bgColor: "#4ade80" },
  { id: "3", number: 3, name: "Module Name", lessonsCount: 3, assignmentsCount: 5, status: "in-progress", bgColor: "#a3e635" },
  { id: "4", number: 4, name: "Module Name", lessonsCount: 3, assignmentsCount: 5, status: "completed", bgColor: "#6ee7b7" },
  { id: "5", number: 5, name: "Module Name", lessonsCount: 3, assignmentsCount: 5, status: "completed", bgColor: "#facc15" },
];

// ============================================
// Module Cards Section
// ============================================

export function ModuleCards({
  title = "Modules",
  modules = defaultModules,
  onSeeAll,
  onModuleClick,
}: ModuleCardsProps) {
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-lg)]">
        {modules.map((mod) => (
          <ModuleCard
            key={mod.id}
            module={mod}
            onClick={() => onModuleClick?.(mod.id)}
          />
        ))}
      </div>
    </div>
  );
}
