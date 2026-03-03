"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer size-4 shrink-0 rounded-[var(--radius-xs)] border border-[var(--canvas-border-input)]",
      "bg-[var(--canvas-background)] transition-colors cursor-pointer",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--canvas-border-input-focus)]",
      "disabled:cursor-not-allowed disabled:bg-[var(--canvas-input-disabled-bg)] disabled:border-[var(--canvas-input-disabled-border)]",
      "data-[state=checked]:bg-[var(--canvas-primary)] data-[state=checked]:border-[var(--canvas-primary)]",
      "data-[state=checked]:disabled:bg-[var(--canvas-input-disabled-text)] data-[state=checked]:disabled:border-[var(--canvas-input-disabled-border)]",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-[var(--canvas-primary-foreground)]")}
    >
      <Check className="size-3" strokeWidth={2.5} />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

interface CheckboxWithLabelProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  children: React.ReactNode;
  size?: "default" | "sm";
}

const CheckboxWithLabel = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  CheckboxWithLabelProps
>(({ children, className, id, size = "default", ...props }, ref) => {
  const generatedId = React.useId();
  const checkboxId = id || generatedId;

  const isSmall = size === "sm";

  return (
    <div className={cn("flex items-center", isSmall ? "gap-1.5" : "gap-2")}>
      <Checkbox 
        ref={ref} 
        id={checkboxId} 
        className={cn(isSmall && "size-3.5", className)} 
        {...props} 
      />
      <label
        htmlFor={checkboxId}
        className={cn(
          "cursor-pointer select-none",
          isSmall ? "text-xs text-[var(--canvas-text-muted)]" : "text-[var(--canvas-text)]"
        )}
        style={!isSmall ? { fontSize: "var(--input-standard-font-size)", fontFamily: "var(--typo-global-font)" } : { fontFamily: "var(--typo-global-font)" }}
      >
        {children}
      </label>
    </div>
  );
});
CheckboxWithLabel.displayName = "CheckboxWithLabel";

export { Checkbox, CheckboxWithLabel };

