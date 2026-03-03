"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterPopover } from "@/components/blocks/filter-popover";
import type { FilterPopoverProps } from "@/components/blocks/filter-popover";

// ============================================
// Types
// ============================================

export interface SortOption {
  id: string;
  label: string;
}

export interface TitleGroupProps {
  /** Main heading text */
  title: string;
  /** Subtitle / description text shown below the title */
  subtitle?: string;

  // --- Sort ---
  /** Sort dropdown options. If omitted or empty, sort dropdown is hidden. */
  sortOptions?: SortOption[];
  /** Placeholder text for sort dropdown */
  sortPlaceholder?: string;
  /** Callback when sort selection changes */
  onSort?: (value: string) => void;

  // --- Filter (FilterPopover with dropdown trigger by default) ---
  /** Whether to show the filter control. Defaults to true when sortOptions are provided. */
  showFilter?: boolean;
  /** Props forwarded to FilterPopover. triggerVariant defaults to "dropdown". */
  filterPopoverProps?: Partial<Omit<FilterPopoverProps, "triggerVariant">> & {
    triggerVariant?: "button" | "dropdown";
  };
  /** Placeholder text for the filter trigger */
  filterPlaceholder?: string;

  // --- Action Button ---
  /** Action button label. If omitted, no action button is rendered. */
  actionButtonText?: string;
  /** Callback when action button is clicked */
  onAction?: () => void;

  /** Additional CSS class names for the root wrapper */
  className?: string;
}

// ============================================
// Main Component
// ============================================

/**
 * Canvas Design System - Title Group Component
 *
 * A reusable header section for block components with title, subtitle,
 * sort dropdown, filter popover (dropdown variant by default), and
 * optional action button.
 *
 * @example
 * ```tsx
 * // With sort + filter + action button
 * <TitleGroup
 *   title="Teammates"
 *   subtitle="12 results"
 *   sortOptions={[{ id: "name-asc", label: "Name (A-Z)" }]}
 *   onSort={(value) => console.log(value)}
 *   actionButtonText="Add new"
 *   onAction={() => console.log("Add new")}
 * />
 *
 * // Title only
 * <TitleGroup title="Activity" subtitle="Recent updates" />
 * ```
 */
export function TitleGroup({
  title,
  subtitle,
  sortOptions,
  sortPlaceholder = "Sort",
  onSort,
  showFilter,
  filterPopoverProps,
  filterPlaceholder = "Filter",
  actionButtonText,
  onAction,
  className,
}: TitleGroupProps) {
  const [sortValue, setSortValue] = useState<string>("");

  const handleSortChange = (value: string) => {
    setSortValue(value);
    onSort?.(value);
  };

  // Show filter by default when sortOptions are provided
  const shouldShowFilter = showFilter ?? (sortOptions != null && sortOptions.length > 0);

  const hasSortOptions = sortOptions != null && sortOptions.length > 0;
  const hasControls = hasSortOptions || shouldShowFilter || actionButtonText;

  return (
    <div
      className={cn("flex flex-wrap items-end w-full", className)}
      style={{ gap: "var(--spacing-xl)" }}
    >
      {/* Title and Subtitle */}
      <div
        className="flex flex-col flex-1 min-w-[200px]"
        style={{ gap: "var(--spacing-xs)" }}
      >
        <h2
          style={{
            fontFamily: "var(--typo-h6-font, var(--typo-global-font))",
            fontSize: "var(--typo-h6-size)",
            fontWeight: "var(--typo-h6-weight)",
            letterSpacing: "var(--typo-h6-spacing)",
            lineHeight: "var(--typo-h6-line-height)",
            color: "var(--canvas-text)",
            margin: 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
              fontSize: "var(--typo-body-s-size)",
              fontWeight: "var(--typo-body-s-weight)",
              lineHeight: "var(--typo-body-s-line-height)",
              color: "var(--canvas-text-muted)",
              margin: 0,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {/* Controls */}
      {hasControls && (
        <div className="flex items-end justify-end shrink-0 gap-3 max-sm:w-full max-sm:flex-wrap">
          {/* Sort Dropdown */}
          {hasSortOptions && (
            <div className="w-[120px] max-sm:flex-1 max-sm:min-w-[120px]">
              <Select value={sortValue || undefined} onValueChange={handleSortChange}>
                <SelectTrigger inputSize="sm">
                  <SelectValue placeholder={sortPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions!.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Filter - FilterPopover with dropdown variant by default */}
          {shouldShowFilter && (
            <FilterPopover
              triggerVariant="dropdown"
              triggerPlaceholder={filterPlaceholder}
              {...filterPopoverProps}
            />
          )}

          {/* Action Button */}
          {actionButtonText && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAction}
              style={{
                height: "var(--btn-small-height)",
                paddingLeft: "var(--btn-small-px)",
                paddingRight: "var(--btn-small-px)",
                fontSize: "var(--btn-small-font-size)",
                borderRadius: "var(--btn-small-radius)",
              }}
            >
              {actionButtonText}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
