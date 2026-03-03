"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { CircleIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-8", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "cursor-pointer aspect-square size-4 shrink-0 rounded-full border border-[var(--canvas-border-input)] bg-[var(--canvas-background)] transition-colors",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--canvas-border-input-focus)]",
        "aria-invalid:border-[var(--canvas-border-input-invalid)] aria-invalid:ring-[var(--canvas-border-input-invalid)]/20",
        "disabled:cursor-not-allowed disabled:bg-[var(--canvas-input-disabled-bg)] disabled:border-[var(--canvas-input-disabled-border)]",
        "data-[state=checked]:border-[var(--canvas-primary)]",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 fill-[var(--canvas-primary)] text-[var(--canvas-primary)]" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
