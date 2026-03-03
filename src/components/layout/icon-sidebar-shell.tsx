"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/layout/header";
import { useCSSVariableSync } from "@/hooks/use-css-variable-sync";
import { IconSidebar, IconNavItemConfig, defaultIconNavItems } from "@/components/layout/icon-sidebar";
import { 
  Sheet, 
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useThemeBranding } from "canvas-ui-sdk";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";

interface IconSidebarShellProps {
  /** Navigation items for the icon sidebar */
  navigation?: IconNavItemConfig[];
  /** Optional page header content (e.g., breadcrumbs, page title) */
  pageHeader?: React.ReactNode;
  /** Main content - the modular blocks */
  children: React.ReactNode;
  /** Callback when a nav item is clicked */
  onNavItemClick?: (item: IconNavItemConfig) => void;
  /** Callback when app menu (hamburger) is clicked - for future app-level menu */
  onAppMenuClick?: () => void;
  /** Additional class name for the main content area */
  contentClassName?: string;
}

/**
 * Canvas Design System - Icon Sidebar Shell
 * 
 * A composable page layout with a narrow icon sidebar that provides:
 * - Fixed header (80px)
 * - Fixed narrow dark icon sidebar on desktop (96px, hidden on mobile)
 * - Floating sidebar toggle button on mobile (left edge)
 * - Mobile sheet navigation for icon sidebar
 * - Hamburger menu in header for app-level menu (future)
 * - Main content area with pageHeader slot and children slot for blocks
 * 
 * Uses the same styling and spacing as DashboardShell for non-sidebar content.
 * 
 * @example
 * ```tsx
 * <IconSidebarShell navigation={iconNavItems}>
 *   <ContentDropzone label="Main content area" />
 * </IconSidebarShell>
 * ```
 */
export function IconSidebarShell({
  navigation = defaultIconNavItems,
  pageHeader,
  children,
  onNavItemClick,
  onAppMenuClick,
  contentClassName,
}: IconSidebarShellProps) {
  useCSSVariableSync();
  const { branding } = useThemeBranding();
  const sidebarVariant = branding.sidebarMode ?? "dark";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavItemClick = (item: IconNavItemConfig) => {
    onNavItemClick?.(item);
    // Close sidebar when nav item is clicked
    setSidebarOpen(false);
  };

  const handleAppMenuClick = () => {
    // Placeholder for future app-level menu
    onAppMenuClick?.();
    console.log("App menu clicked - implement app-level mobile menu here");
  };

  return (
    <div className="min-h-screen bg-[var(--canvas-background)]">
      {/* Header - Fixed at top, offset on desktop to not overlap icon sidebar */}
      <div className="fixed top-0 left-0 right-0 lg:left-[var(--icon-sidebar-width)] z-40">
        <Header onMenuClick={handleAppMenuClick} />
      </div>

      {/* Desktop Icon Sidebar - Fixed on left, visible lg+ */}
      <div className="hidden lg:block fixed top-0 left-0 bottom-0 z-50 w-[var(--icon-sidebar-width)]">
        <IconSidebar
          items={navigation}
          variant={sidebarVariant}
          onItemClick={handleNavItemClick}
        />
      </div>

      {/* Mobile Sidebar Toggle Button - Floating on left edge */}
      <button
        onClick={() => setSidebarOpen(true)}
        className={cn(
          "lg:hidden fixed left-0 z-30",
          "top-[calc(var(--header-height)+4px)]",
          "flex items-center justify-center",
          "size-11",
          "bg-[var(--canvas-background)]",
          "border border-l-0 border-[var(--canvas-neutral-border)]",
          "rounded-r-[var(--radius-xs)]",
          "shadow-[var(--canvas-shadow-nav)]",
          "transition-opacity hover:opacity-80"
        )}
        aria-label="Open sidebar"
      >
        <ChevronRight className="size-6 text-[var(--canvas-primary)]" />
      </button>

      {/* Mobile Icon Sidebar Sheet */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="p-0 w-[var(--icon-sidebar-width)]">
          <VisuallyHidden.Root>
            <SheetTitle>Navigation</SheetTitle>
          </VisuallyHidden.Root>
          <IconSidebar
            items={navigation}
            variant={sidebarVariant}
            onItemClick={handleNavItemClick}
          />
        </SheetContent>
      </Sheet>

      {/* Main Content Area - Same styling as DashboardShell */}
      <main
        className={cn(
          "pt-[var(--header-height)]",
          "lg:pl-[var(--icon-sidebar-width)]",
          "min-h-screen"
        )}
      >
        <div 
          className={cn(
            "flex flex-col gap-[var(--spacing-xl)]",
            "px-[var(--spacing-xl)] lg:px-[var(--spacing-5xl)]",
            "pt-10 pb-[var(--spacing-5xl)]",
            contentClassName
          )}
        >
          {/* Page Header Slot */}
          {pageHeader && (
            <section className="pt-0">
              {pageHeader}
            </section>
          )}

          {/* Main Content Slot - Blocks go here */}
          <section className="flex flex-col gap-[var(--spacing-4xl)]">
            {children}
          </section>
        </div>
      </main>
    </div>
  );
}

// Re-export types for convenience
export type { IconNavItemConfig } from "@/components/layout/icon-sidebar";


