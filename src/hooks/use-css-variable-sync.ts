"use client";

import { useEffect } from "react";
import { setupCSSVariableListener } from "canvas-ui-sdk";

/**
 * Hook that listens for CSS variable, branding, and image updates from parent window.
 * Use this in page layouts that might be rendered in iframes.
 *
 * @example
 * ```tsx
 * export function MyPageLayout() {
 *   useCSSVariableSync();
 *   return <div>...</div>;
 * }
 * ```
 */
export function useCSSVariableSync(options?: {
  onBrandingUpdate?: (branding: Record<string, string> | null) => void;
  onImagesUpdate?: (images: Record<string, string> | null) => void;
}) {
  useEffect(() => {
    const cleanup = setupCSSVariableListener(options);
    return cleanup;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
