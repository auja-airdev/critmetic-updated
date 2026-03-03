"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MultiselectTagsProps {
  tags?: string[];
  placeholder?: string;
  inputSize?: "sm" | "default" | "lg";
  onAdd?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  disabled?: boolean;
  className?: string;
}

const MultiselectTags = React.forwardRef<HTMLInputElement, MultiselectTagsProps>(
  ({ 
    tags = [], 
    placeholder = "Add...", 
    inputSize = "default", 
    onAdd, 
    onRemove, 
    disabled,
    className 
  }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const sizeVar = inputSize === "default" ? "standard" : inputSize === "sm" ? "small" : "large";

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && inputValue.trim()) {
        e.preventDefault();
        onAdd?.(inputValue.trim());
        setInputValue("");
      }
    };

    return (
      <div
        className={cn(
          "flex flex-wrap items-center gap-1.5 bg-[var(--canvas-background)] border border-[var(--canvas-border-input)] p-1.5",
          "focus-within:border-[var(--canvas-border-input-focus)] focus-within:ring-2 focus-within:ring-[var(--canvas-border-input-focus)]",
          disabled && "cursor-not-allowed bg-[var(--canvas-input-disabled-bg)] border-[var(--canvas-input-disabled-border)]",
          className
        )}
        style={{
          minHeight: `var(--input-${sizeVar}-height)`,
          borderRadius: `var(--input-${sizeVar}-radius)`,
        }}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[var(--canvas-surface-brand)] text-[var(--canvas-primary)] rounded text-xs"
          >
            {tag}
            {!disabled && (
              <span
                role="button"
                tabIndex={0}
                onClick={() => onRemove?.(tag)}
                onKeyDown={(e) => e.key === "Enter" && onRemove?.(tag)}
                className="cursor-pointer hover:opacity-70"
              >
                <X className="size-3" />
              </span>
            )}
          </span>
        ))}
        <input
          type="text"
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex-1 min-w-[60px] bg-transparent outline-none",
            "text-[var(--canvas-text)] placeholder:text-[var(--canvas-text-placeholder)]",
            "disabled:text-[var(--canvas-input-disabled-text)] disabled:cursor-not-allowed"
          )}
          style={{
            fontSize: `var(--input-${sizeVar}-font-size)`,
            fontFamily: "var(--typo-global-font)",
          }}
        />
      </div>
    );
  }
);
MultiselectTags.displayName = "MultiselectTags";

export { MultiselectTags };







