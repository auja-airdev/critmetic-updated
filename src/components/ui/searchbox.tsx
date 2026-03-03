"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "onChange"> {
  inputSize?: "sm" | "default" | "lg";
  value?: string;
  onChange?: (value: string) => void;
}

const Searchbox = React.forwardRef<HTMLInputElement, SearchboxProps>(
  ({ className, inputSize = "default", placeholder = "Search...", disabled, value, onChange, ...props }, ref) => {
    const sizeVar = inputSize === "default" ? "standard" : inputSize === "sm" ? "small" : "large";

    return (
      <div
        className={cn(
          "flex items-center gap-2 bg-[var(--canvas-background)] border border-[var(--canvas-border-input)]",
          "focus-within:border-[var(--canvas-border-input-focus)] focus-within:ring-2 focus-within:ring-[var(--canvas-border-input-focus)]",
          "has-[:disabled]:cursor-not-allowed has-[:disabled]:bg-[var(--canvas-input-disabled-bg)] has-[:disabled]:border-[var(--canvas-input-disabled-border)]",
          className
        )}
        style={{
          height: `var(--input-${sizeVar}-height)`,
          paddingLeft: `var(--input-${sizeVar}-px)`,
          paddingRight: `var(--input-${sizeVar}-px)`,
          borderRadius: `var(--input-${sizeVar}-radius)`,
        }}
      >
        <Search className="size-4 shrink-0 text-[var(--canvas-text-muted)]" />
        <input
          type="text"
          ref={ref}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className={cn(
            "flex-1 bg-transparent outline-none",
            "text-[var(--canvas-text)] placeholder:text-[var(--canvas-text-placeholder)]",
            "disabled:text-[var(--canvas-input-disabled-text)] disabled:cursor-not-allowed"
          )}
          style={{
            fontSize: `var(--input-${sizeVar}-font-size)`,
            fontFamily: "var(--typo-global-font)",
          }}
          {...props}
        />
      </div>
    );
  }
);
Searchbox.displayName = "Searchbox";

export { Searchbox };







