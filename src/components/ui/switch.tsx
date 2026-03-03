"use client"

import * as React from "react"
import * as SwitchPrimitive from "@radix-ui/react-switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors",
        "data-[state=checked]:bg-[var(--canvas-primary)] data-[state=unchecked]:bg-[var(--canvas-border)]",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--canvas-border-input-focus)]",
        "disabled:cursor-not-allowed disabled:data-[state=checked]:bg-[var(--canvas-input-disabled-text)] disabled:data-[state=unchecked]:bg-[var(--canvas-input-disabled-border)]",
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block size-4 rounded-full bg-[var(--canvas-background)] ring-0 transition-transform",
          "data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
