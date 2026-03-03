"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-xl"
  | "body-l"
  | "body-m"
  | "body-s"
  | "body-xs";

type TypographyColor = "default" | "muted";

type TypographyElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div" | "label";

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  /** Typography style variant */
  variant?: TypographyVariant;
  /** Color variant */
  color?: TypographyColor;
  /** Override the rendered HTML element */
  as?: TypographyElement;
  /** Additional CSS classes */
  className?: string;
  /** Content */
  children?: React.ReactNode;
}

/**
 * Get the default HTML element for a typography variant
 */
function getDefaultElement(variant: TypographyVariant): TypographyElement {
  if (variant.startsWith("h")) {
    return variant as TypographyElement;
  }
  return "p";
}

/**
 * Typography component that renders text with design system styling.
 * 
 * @example
 * // Headings
 * <Typography variant="h1">Page Title</Typography>
 * <Typography variant="h2" color="muted">Subtitle</Typography>
 * 
 * // Body text
 * <Typography variant="body-m">Paragraph text</Typography>
 * <Typography variant="body-s" color="muted">Caption</Typography>
 * 
 * // Override element
 * <Typography variant="body-m" as="span">Inline text</Typography>
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ variant = "body-m", color = "default", as, className, children, style, ...props }, ref) => {
    const Component = as || getDefaultElement(variant);
    const varPrefix = `--typo-${variant}`;

    return React.createElement(
      Component,
      {
        ref,
        className: cn(className),
        style: {
          fontFamily: `var(${varPrefix}-font, var(--typo-global-font))`,
          fontSize: `var(${varPrefix}-size)`,
          fontWeight: `var(${varPrefix}-weight)`,
          letterSpacing: `var(${varPrefix}-spacing)`,
          lineHeight: `var(${varPrefix}-line-height)`,
          color: color === "muted"
            ? `var(${varPrefix}-color-muted)`
            : `var(${varPrefix}-color)`,
          ...style,
        },
        ...props,
      },
      children
    );
  }
);
Typography.displayName = "Typography";

export { Typography };







