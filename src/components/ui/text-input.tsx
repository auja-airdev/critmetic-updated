"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  inputSize?: "sm" | "default" | "lg";
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ className, inputSize = "default", disabled, ...props }, ref) => {
    const sizeVar = inputSize === "default" ? "standard" : inputSize === "sm" ? "small" : "large";

    return (
      <input
        type="text"
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full bg-[var(--canvas-background)] border border-[var(--canvas-border-input)]",
          "text-[var(--canvas-text)] placeholder:text-[var(--canvas-text-placeholder)]",
          "focus:outline-none focus:border-[var(--canvas-border-input-focus)] focus:ring-2 focus:ring-[var(--canvas-border-input-focus)]",
          "disabled:cursor-not-allowed disabled:bg-[var(--canvas-input-disabled-bg)] disabled:border-[var(--canvas-input-disabled-border)] disabled:text-[var(--canvas-input-disabled-text)]",
          className
        )}
        style={{
          height: `var(--input-${sizeVar}-height)`,
          paddingLeft: `var(--input-${sizeVar}-px)`,
          paddingRight: `var(--input-${sizeVar}-px)`,
          borderRadius: `var(--input-${sizeVar}-radius)`,
          fontSize: `var(--input-${sizeVar}-font-size)`,
          fontFamily: "var(--typo-global-font)",
        }}
        {...props}
      />
    );
  }
);
TextInput.displayName = "TextInput";

export { TextInput };







