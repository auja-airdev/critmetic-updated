import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

// Base button styles (layout and structure only, colors applied via CSS variables)
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-all cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  {
    variants: {
      variant: {
        // Custom Canvas variants (styled via CSS variables in component)
        primary: "",
        "primary-outline": "border",
        "primary-neutral": "",
        neutral: "border",
        "neutral-delete": "border",
        delete: "",
        // Legacy shadcn variants (for backwards compatibility)
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        // Custom Canvas sizes (styled via CSS variables in component)
        mini: "",
        sm: "",
        default: "",
        lg: "",
        // Legacy shadcn sizes
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// CSS variable mappings for Canvas design system variants
const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--btn-primary-bg)",
    color: "var(--btn-primary-text)",
    borderColor: "var(--btn-primary-border)",
  },
  "primary-outline": {
    backgroundColor: "var(--btn-primary-outline-bg)",
    color: "var(--btn-primary-outline-text)",
    borderColor: "var(--btn-primary-outline-border)",
    borderWidth: "1px",
    borderStyle: "solid",
  },
  "primary-neutral": {
    backgroundColor: "var(--btn-primary-neutral-bg)",
    color: "var(--btn-primary-neutral-text)",
    borderColor: "var(--btn-primary-neutral-border)",
  },
  neutral: {
    backgroundColor: "var(--btn-neutral-bg)",
    color: "var(--btn-neutral-text)",
    borderColor: "var(--btn-neutral-border)",
    borderWidth: "1px",
    borderStyle: "solid",
  },
  "neutral-delete": {
    backgroundColor: "var(--btn-neutral-delete-bg)",
    color: "var(--btn-neutral-delete-text)",
    borderColor: "var(--btn-neutral-delete-border)",
    borderWidth: "1px",
    borderStyle: "solid",
  },
  delete: {
    backgroundColor: "var(--btn-delete-bg)",
    color: "var(--btn-delete-text)",
    borderColor: "var(--btn-delete-border)",
  },
}

// CSS variable mappings for Canvas design system hover states
const variantHoverStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: "var(--btn-primary-bg-hover)",
    color: "var(--btn-primary-text-hover)",
    borderColor: "var(--btn-primary-border-hover)",
  },
  "primary-outline": {
    backgroundColor: "var(--btn-primary-outline-bg-hover)",
    color: "var(--btn-primary-outline-text-hover)",
    borderColor: "var(--btn-primary-outline-border-hover)",
  },
  "primary-neutral": {
    backgroundColor: "var(--btn-primary-neutral-bg-hover)",
    color: "var(--btn-primary-neutral-text-hover)",
    borderColor: "var(--btn-primary-neutral-border-hover)",
  },
  neutral: {
    backgroundColor: "var(--btn-neutral-bg-hover)",
    color: "var(--btn-neutral-text-hover)",
    borderColor: "var(--btn-neutral-border-hover)",
  },
  "neutral-delete": {
    backgroundColor: "var(--btn-neutral-delete-bg-hover)",
    color: "var(--btn-neutral-delete-text-hover)",
    borderColor: "var(--btn-neutral-delete-border-hover)",
  },
  delete: {
    backgroundColor: "var(--btn-delete-bg-hover)",
    color: "var(--btn-delete-text-hover)",
    borderColor: "var(--btn-delete-border-hover)",
  },
}

// CSS variable mappings for Canvas design system sizes
const sizeStyles: Record<string, React.CSSProperties> = {
  mini: {
    height: "var(--btn-mini-height)",
    paddingLeft: "var(--btn-mini-px)",
    paddingRight: "var(--btn-mini-px)",
    fontSize: "var(--btn-mini-font-size)",
    borderRadius: "var(--btn-mini-radius)",
    fontWeight: "var(--btn-mini-font-weight)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--btn-mini-letter-spacing)",
    fontFamily: "var(--btn-mini-font-family, var(--typo-button-font, var(--typo-global-font)))",
  },
  sm: {
    height: "var(--btn-small-height)",
    paddingLeft: "var(--btn-small-px)",
    paddingRight: "var(--btn-small-px)",
    fontSize: "var(--btn-small-font-size)",
    borderRadius: "var(--btn-small-radius)",
    fontWeight: "var(--btn-small-font-weight)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--btn-small-letter-spacing)",
    fontFamily: "var(--btn-small-font-family, var(--typo-button-font, var(--typo-global-font)))",
  },
  default: {
    height: "var(--btn-standard-height)",
    paddingLeft: "var(--btn-standard-px)",
    paddingRight: "var(--btn-standard-px)",
    fontSize: "var(--btn-standard-font-size)",
    borderRadius: "var(--btn-standard-radius)",
    fontWeight: "var(--btn-standard-font-weight)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--btn-standard-letter-spacing)",
    fontFamily: "var(--btn-standard-font-family, var(--typo-button-font, var(--typo-global-font)))",
  },
  lg: {
    height: "var(--btn-large-height)",
    paddingLeft: "var(--btn-large-px)",
    paddingRight: "var(--btn-large-px)",
    fontSize: "var(--btn-large-font-size)",
    borderRadius: "var(--btn-large-radius)",
    fontWeight: "var(--btn-large-font-weight)" as React.CSSProperties["fontWeight"],
    letterSpacing: "var(--btn-large-letter-spacing)",
    fontFamily: "var(--btn-large-font-family, var(--typo-button-font, var(--typo-global-font)))",
  },
}

// Custom Canvas variants that use CSS variables
const canvasVariants = ["primary", "primary-outline", "primary-neutral", "neutral", "neutral-delete", "delete"]
const canvasSizes = ["mini", "sm", "default", "lg"]

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  style,
  onMouseEnter,
  onMouseLeave,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const [isHovered, setIsHovered] = React.useState(false)
  const Comp = asChild ? Slot : "button"
  const isCanvasVariant = variant && canvasVariants.includes(variant)

  // Build style object with CSS variables for Canvas variants/sizes
  const computedStyle: React.CSSProperties = { ...style }

  if (isCanvasVariant) {
    Object.assign(computedStyle, variantStyles[variant!])
    if (isHovered && !props.disabled) {
      Object.assign(computedStyle, variantHoverStyles[variant!])
    }
  }

  if (size && canvasSizes.includes(size)) {
    Object.assign(computedStyle, sizeStyles[size])
  }

  const handleMouseEnter = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(true)
    onMouseEnter?.(e)
  }, [onMouseEnter])

  const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    setIsHovered(false)
    onMouseLeave?.(e)
  }, [onMouseLeave])

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      style={Object.keys(computedStyle).length > 0 ? computedStyle : undefined}
      onMouseEnter={isCanvasVariant ? handleMouseEnter : onMouseEnter}
      onMouseLeave={isCanvasVariant ? handleMouseLeave : onMouseLeave}
      {...props}
    />
  )
}

export { Button, buttonVariants }
