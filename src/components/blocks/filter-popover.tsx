"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckboxWithLabel, Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { TextInput } from "@/components/ui/text-input";
import { Searchbox } from "@/components/ui/searchbox";
import { DateInput } from "@/components/ui/date-input";
import { MultiselectTags } from "@/components/ui/multiselect-tags";

// ============================================
// Filter Option Types
// ============================================

export interface FilterOption {
  id: string;
  label: string;
}

export interface FilterDropdownConfig {
  id: string;
  label: string;
  placeholder: string;
  options: FilterOption[];
}

export interface FilterCheckboxGroupConfig {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface FilterDateRangeConfig {
  id: string;
  label: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export interface FilterState {
  dropdowns: Record<string, string>;
  checkboxes: Record<string, boolean>;
  dateRange: { start: string; end: string };
}

// ============================================
// Default Filter Configuration
// ============================================

const defaultDropdowns: FilterDropdownConfig[] = [
  {
    id: "category",
    label: "Category",
    placeholder: "All categories",
    options: [
      { id: "all", label: "All categories" },
      { id: "restaurants", label: "Restaurants" },
      { id: "hotels", label: "Hotels" },
      { id: "attractions", label: "Attractions" },
    ],
  },
  {
    id: "location",
    label: "Location",
    placeholder: "All locations",
    options: [
      { id: "all", label: "All locations" },
      { id: "new-york", label: "New York" },
      { id: "los-angeles", label: "Los Angeles" },
      { id: "chicago", label: "Chicago" },
    ],
  },
];

const defaultCheckboxGroup: FilterCheckboxGroupConfig = {
  id: "status",
  label: "Status",
  options: [
    { id: "active", label: "Active" },
    { id: "pending", label: "Pending" },
    { id: "completed", label: "Completed" },
  ],
};

const defaultDateRange: FilterDateRangeConfig = {
  id: "dateRange",
  label: "Date Range",
  startPlaceholder: "Start date",
  endPlaceholder: "End date",
};

// Shared label style for filter section labels (input-label typography, sm size)
const filterLabelStyle: React.CSSProperties = {
  fontFamily: "var(--typo-input-label-font)",
  fontSize: "var(--typo-input-label-sm-size, 12px)",
  fontWeight: "var(--typo-input-label-weight)",
  letterSpacing: "var(--typo-input-label-spacing)",
  lineHeight: "var(--typo-input-label-line-height)",
};

// ============================================
// Filter Dropdown Component
// ============================================

interface FilterDropdownProps {
  config: FilterDropdownConfig;
  value: string;
  onChange: (value: string) => void;
}

function FilterDropdown({ config, value, onChange }: FilterDropdownProps) {
  return (
    <div className="space-y-2">
      <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
        {config.label}
      </label>
      <Select value={value || undefined} onValueChange={onChange}>
        <SelectTrigger inputSize="sm">
          <SelectValue placeholder={config.placeholder} />
        </SelectTrigger>
        <SelectContent position="popper" side="bottom" sideOffset={4}>
          {config.options.map((option) => (
            <SelectItem key={option.id} value={option.id}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

// ============================================
// Filter Popover Component
// ============================================

export interface FilterPopoverProps {
  /** Dropdown filter configurations */
  dropdowns?: FilterDropdownConfig[];
  /** Checkbox group configuration */
  checkboxGroup?: FilterCheckboxGroupConfig;
  /** Date range configuration */
  dateRange?: FilterDateRangeConfig;
  /** Current filter state */
  filterState?: FilterState;
  /** Callback when filters are applied */
  onApply?: (state: FilterState) => void;
  /** Callback when filters are cleared */
  onClear?: () => void;
  /** Trigger style variant - "button" for button style, "dropdown" for select-like style */
  triggerVariant?: "button" | "dropdown";
  /** Placeholder text shown in the trigger (used for both variants) */
  triggerPlaceholder?: string;
  /** Additional class names for the trigger */
  className?: string;
}

/**
 * Canvas Design System - Filter Popover Component
 * 
 * A filter button that opens a popover with various filter options.
 * Inspired by shadcnstudio Category Filter 6 structure.
 * 
 * @example
 * ```tsx
 * // Button variant (default)
 * <FilterPopover
 *   onApply={(filters) => console.log(filters)}
 *   onClear={() => console.log("Cleared")}
 * />
 * 
 * // Dropdown variant
 * <FilterPopover
 *   triggerVariant="dropdown"
 *   triggerPlaceholder="Filter"
 *   onApply={(filters) => console.log(filters)}
 * />
 * ```
 */
export function FilterPopover({
  dropdowns = defaultDropdowns,
  checkboxGroup = defaultCheckboxGroup,
  dateRange = defaultDateRange,
  filterState,
  onApply,
  onClear,
  triggerVariant = "button",
  triggerPlaceholder = "Filter",
  className,
}: FilterPopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure hydration consistency for Radix components
  useEffect(() => {
    setMounted(true);
  }, []);

  // Internal state for filter values
  const [localState, setLocalState] = useState<FilterState>(() => ({
    dropdowns: filterState?.dropdowns || {},
    checkboxes: filterState?.checkboxes || {},
    dateRange: filterState?.dateRange || { start: "", end: "" },
  }));

  const handleDropdownChange = (id: string, value: string) => {
    setLocalState((prev) => ({
      ...prev,
      dropdowns: { ...prev.dropdowns, [id]: value },
    }));
  };

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setLocalState((prev) => ({
      ...prev,
      checkboxes: { ...prev.checkboxes, [id]: checked },
    }));
  };

  const handleDateChange = (field: "start" | "end", value: string) => {
    setLocalState((prev) => ({
      ...prev,
      dateRange: { ...prev.dateRange, [field]: value },
    }));
  };

  const handleClear = () => {
    const clearedState: FilterState = {
      dropdowns: {},
      checkboxes: {},
      dateRange: { start: "", end: "" },
    };
    setLocalState(clearedState);
    onClear?.();
  };

  const handleApply = () => {
    onApply?.(localState);
    setIsOpen(false);
  };

  const handleCancel = () => {
    // Reset to initial state
    setLocalState({
      dropdowns: filterState?.dropdowns || {},
      checkboxes: filterState?.checkboxes || {},
      dateRange: filterState?.dateRange || { start: "", end: "" },
    });
    setIsOpen(false);
  };

  // Button trigger component
  const ButtonTrigger = (
    <Button
      variant="neutral"
      className={cn("gap-2", className)}
      style={{ 
        borderRadius: "var(--btn-standard-radius)",
        height: "var(--btn-standard-height)",
        paddingLeft: "var(--btn-standard-px)",
        paddingRight: "var(--btn-standard-px)",
        fontSize: "var(--btn-standard-font-size)",
      }}
    >
      <Filter className="size-4" />
      {triggerPlaceholder}
    </Button>
  );

  // Dropdown trigger component (styled like SelectTrigger)
  const DropdownTrigger = (
    <button
      className={cn(
        "cursor-pointer flex items-center justify-between gap-2 bg-[var(--canvas-background)] border text-[var(--canvas-text)] whitespace-nowrap transition-colors outline-none focus:border-[var(--canvas-border-input-focus)] focus:ring-2 focus:ring-[var(--canvas-border-input-focus)] data-[state=open]:border-[var(--canvas-border-input-focus)]",
        className
      )}
      style={{
        width: "120px",
        height: "var(--input-small-height)",
        paddingLeft: "var(--input-small-px)",
        paddingRight: "var(--input-small-px)",
        fontSize: "var(--input-small-font-size)",
        borderRadius: "var(--input-small-radius)",
        borderColor: "var(--canvas-border-input)",
      }}
    >
      <span className="text-[var(--canvas-text-placeholder)]">{triggerPlaceholder}</span>
      <ChevronDown className="size-4 opacity-50" />
    </button>
  );

  // Render placeholder during SSR to prevent hydration mismatch
  if (!mounted) {
    return triggerVariant === "dropdown" ? DropdownTrigger : ButtonTrigger;
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        {triggerVariant === "dropdown" ? DropdownTrigger : ButtonTrigger}
      </PopoverTrigger>

      <PopoverContent
        align="end"
        side="bottom"
        sideOffset={4}
        avoidCollisions={false}
        className="w-80 p-0 bg-[var(--canvas-background)] border border-[var(--canvas-border)] shadow-lg"
      >
        {/* Filter Content - All Input Types */}
        <div className="p-4 space-y-5 max-h-[480px] overflow-y-auto">
          {/* Text Input */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Text Input
            </label>
            <TextInput inputSize="sm" placeholder="Enter text..." />
          </div>

          {/* Searchbox */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Searchbox
            </label>
            <Searchbox inputSize="sm" placeholder="Search..." />
          </div>

          {/* Dropdown */}
          {dropdowns.slice(0, 1).map((dropdown) => (
            <FilterDropdown
              key={dropdown.id}
              config={dropdown}
              value={localState.dropdowns[dropdown.id] || ""}
              onChange={(value) => handleDropdownChange(dropdown.id, value)}
            />
          ))}

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Date Input
            </label>
            <DateInput inputSize="sm" />
          </div>


          {/* Radio Buttons */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Radio Buttons
            </label>
            <RadioGroup defaultValue="option1" className="flex">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option1" id="radio1" />
                <label 
                  htmlFor="radio1" 
                  className="text-[var(--canvas-text)] cursor-pointer"
                  style={{ fontSize: "var(--input-small-font-size)" }}
                >
                  Option 1
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="option2" id="radio2" />
                <label 
                  htmlFor="radio2" 
                  className="text-[var(--canvas-text)] cursor-pointer"
                  style={{ fontSize: "var(--input-small-font-size)" }}
                >
                  Option 2
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Radio Buttons List */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Radio Buttons List
            </label>
            <RadioGroup defaultValue="list-opt1" className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="list-opt1" id="radio-list-1" />
                <label 
                  htmlFor="radio-list-1" 
                  className="text-[var(--canvas-text)] cursor-pointer"
                  style={{ fontSize: "var(--input-small-font-size)" }}
                >
                  First option
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="list-opt2" id="radio-list-2" />
                <label 
                  htmlFor="radio-list-2" 
                  className="text-[var(--canvas-text)] cursor-pointer"
                  style={{ fontSize: "var(--input-small-font-size)" }}
                >
                  Second option
                </label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="list-opt3" id="radio-list-3" />
                <label 
                  htmlFor="radio-list-3" 
                  className="text-[var(--canvas-text)] cursor-pointer"
                  style={{ fontSize: "var(--input-small-font-size)" }}
                >
                  Third option
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* Checkbox */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Checkbox
            </label>
            <div className="flex items-center gap-2">
              <Checkbox id="single-checkbox" />
              <label 
                htmlFor="single-checkbox" 
                className="text-[var(--canvas-text)] cursor-pointer"
                style={{ fontSize: "var(--input-small-font-size)" }}
              >
                I agree to terms
              </label>
            </div>
          </div>

          {/* Checkbox List */}
          {checkboxGroup && (
            <div className="space-y-2">
              <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
                Checkbox List
              </label>
              <div className="space-y-2">
                {checkboxGroup.options.map((option) => (
                  <CheckboxWithLabel
                    key={option.id}
                    checked={localState.checkboxes[option.id] || false}
                    onCheckedChange={(checked) =>
                      handleCheckboxChange(option.id, checked === true)
                    }
                  >
                    {option.label}
                  </CheckboxWithLabel>
                ))}
              </div>
            </div>
          )}

          {/* Toggle */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Toggle
            </label>
            <div className="flex items-center gap-2">
              <Switch id="toggle-switch" />
              <label 
                htmlFor="toggle-switch" 
                className="text-[var(--canvas-text)] cursor-pointer"
                style={{ fontSize: "var(--input-small-font-size)" }}
              >
                Enable notifications
              </label>
            </div>
          </div>

          {/* Multiselect Tags */}
          <div className="space-y-2">
            <label className="text-[var(--canvas-text-muted)]" style={filterLabelStyle}>
              Multiselect Tags
            </label>
            <MultiselectTags inputSize="sm" tags={["Tag 1", "Tag 2"]} placeholder="Add..." />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[var(--canvas-border)]">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="text-[var(--canvas-text-muted)] hover:text-[var(--canvas-text)] hover:bg-transparent"
          >
            Reset
          </Button>
          <Button variant="primary" size="sm" onClick={handleApply}>
            Apply
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

