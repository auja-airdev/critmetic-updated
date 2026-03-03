"use client";

import { cn } from "@/lib/utils";
import { LucideIcon, Home, Users, Calendar, MessageSquare, PieChart, FileText, ShoppingBag } from "lucide-react";
import { useThemeImages, useThemeBranding } from "canvas-ui-sdk";

// Phosphor Icons for Logo
import { Buildings, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Diamond, Hexagon, Star, Lightning, Sparkle, Infinity, Code, Terminal, Cpu,
  Database, Globe, Cloud, WifiHigh, Briefcase, Storefront, Handshake, ChartLine,
  Palette as PaletteIcon, PencilSimple, Camera, MusicNote, Lightbulb, Leaf, Tree,
  Sun, Moon, Fire, Drop, ChatCircle, Envelope, Phone, Megaphone, Heart, Shield,
  Trophy, Rocket, Target, Flag,
} from "@phosphor-icons/react";

// ============================================
// Icon Shape Presets for Logo Creator
// ============================================

type IconShapeId = "rounded" | "circle" | "square";

interface IconShape {
  id: IconShapeId;
  renderBackground: (bgColor: string) => React.ReactNode;
}

const iconShapes: IconShape[] = [
  {
    id: "rounded",
    renderBackground: (bgColor: string) => (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full absolute inset-0">
        <rect width="32" height="32" rx="10" style={{ fill: bgColor }} />
      </svg>
    ),
  },
  {
    id: "circle",
    renderBackground: (bgColor: string) => (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full absolute inset-0">
        <circle cx="16" cy="16" r="16" style={{ fill: bgColor }} />
      </svg>
    ),
  },
  {
    id: "square",
    renderBackground: (bgColor: string) => (
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full absolute inset-0">
        <rect width="32" height="32" style={{ fill: bgColor }} />
      </svg>
    ),
  },
];

// Map icon names to components
const iconMap: Record<string, PhosphorIcon> = {
  Diamond, Hexagon, Star, Lightning, Sparkle, Infinity, Code, Terminal, Cpu,
  Database, Globe, Cloud, WifiHigh, Briefcase, Buildings, Storefront, Handshake,
  ChartLine, Palette: PaletteIcon, PencilSimple, Camera, MusicNote, Lightbulb,
  Leaf, Tree, Sun, Moon, Fire, Drop, ChatCircle, Envelope, Phone, Megaphone,
  Heart, Shield, Trophy, Rocket, Target, Flag,
};

// Helper to resolve CSS variable references to actual hex colors
function resolveBrandingColor(value: string): string {
  if (!value) return "#ffffff";
  if (value.startsWith("var(")) {
    const varName = value.replace("var(", "").replace(")", "");
    if (typeof window !== "undefined") {
      const computed = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
      return computed || "#ffffff";
    }
    return "#ffffff";
  }
  return value;
}

// ============================================
// Icon Nav Item
// ============================================

export interface IconNavItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  href?: string;
  isActive?: boolean;
  hasNotification?: boolean;
}

interface IconNavItemProps {
  item: IconNavItemConfig;
  variant?: "dark" | "light";
  onClick?: () => void;
}

function IconNavItem({ item, variant = "dark", onClick }: IconNavItemProps) {
  const Icon = item.icon;
  const isDark = variant === "dark";
  const isActive = item.isActive;

  return (
    <button
      onClick={onClick}
      className={cn(
        "cursor-pointer relative flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-[var(--radius-nav)] transition-colors",
        // Dark variant
        isDark && isActive && "bg-[var(--canvas-sidebar-dark-active-bg)]",
        isDark && !isActive && "hover:bg-[var(--canvas-sidebar-dark-active-bg)]/50",
        // Light variant
        !isDark && isActive && "bg-[var(--canvas-sidebar-light-active-bg)]",
        !isDark && !isActive && "hover:bg-[var(--canvas-sidebar-light-active-bg)]/50"
      )}
    >
      <Icon
        className={cn(
          "size-4",
          isDark && isActive && "text-[var(--canvas-sidebar-dark-active-text)]",
          isDark && !isActive && "text-[var(--canvas-sidebar-dark-text)]",
          !isDark && isActive && "text-[var(--canvas-sidebar-light-active-text)]",
          !isDark && !isActive && "text-[var(--canvas-sidebar-light-text)]"
        )}
      />
      <span
        className={cn(
          isDark && isActive && "text-[var(--canvas-sidebar-dark-active-text)]",
          isDark && !isActive && "text-[var(--canvas-sidebar-dark-text)]",
          !isDark && isActive && "text-[var(--canvas-sidebar-light-active-text)]",
          !isDark && !isActive && "text-[var(--canvas-sidebar-light-text)]"
        )}
        style={{
          fontFamily: "var(--typo-sidebar-tab-font, var(--typo-global-font))",
          fontSize: "var(--typo-body-xs-size)",
          fontWeight: "var(--typo-sidebar-tab-weight)",
          letterSpacing: "var(--typo-sidebar-tab-spacing)",
          lineHeight: "var(--typo-sidebar-tab-line-height)",
        }}
      >
        {item.label}
      </span>

      {/* Notification Badge */}
      {item.hasNotification && (
        <div className="absolute top-2 right-4 size-1.5 rounded-full bg-[var(--canvas-destructive)]" />
      )}
    </button>
  );
}

// ============================================
// Default Navigation Items
// ============================================

export const defaultIconNavItems: IconNavItemConfig[] = [
  { id: "home", label: "Home", icon: Home, isActive: true },
  { id: "teams", label: "Teams", icon: Users },
  { id: "calendar", label: "Calendar", icon: Calendar },
  { id: "messages", label: "Messages", icon: MessageSquare, hasNotification: true },
  { id: "reports", label: "Reports", icon: PieChart },
  { id: "docs", label: "Docs", icon: FileText },
  { id: "orders", label: "Orders", icon: ShoppingBag },
];

// ============================================
// Icon Sidebar
// ============================================

interface IconSidebarProps {
  /** Navigation items to display */
  items?: IconNavItemConfig[];
  /** Visual variant - dark for desktop, light for mobile sheet */
  variant?: "dark" | "light";
  /** Callback when a nav item is clicked */
  onItemClick?: (item: IconNavItemConfig) => void;
  /** Additional class names */
  className?: string;
}

/**
 * Canvas Design System - Icon Sidebar Component
 * 
 * A narrow sidebar (96px) with vertically stacked icon navigation.
 * Desktop: Fixed dark sidebar on the left
 * Mobile: Light theme sidebar rendered inside a Sheet
 */
export function IconSidebar({
  items = defaultIconNavItems,
  variant = "dark",
  onItemClick,
  className
}: IconSidebarProps) {
  const isDark = variant === "dark";
  const themeImages = useThemeImages();
  const { branding, isMounted } = useThemeBranding();

  // Get the appropriate logo based on variant
  const logoUrl = isDark ? themeImages.logoDark : themeImages.logoLight;

  // Get the icon shape renderer
  const iconShape = iconShapes.find(s => s.id === branding.iconShape) || iconShapes[0];

  return (
    <aside
      className={cn(
        "flex flex-col items-center h-full w-[var(--icon-sidebar-width)]",
        isDark && "bg-[var(--canvas-sidebar-dark-bg)] border-r border-[var(--canvas-sidebar-dark-border)]",
        !isDark && "bg-[var(--canvas-background)] border-r border-[var(--canvas-border)]",
        className
      )}
    >
      {/* Logo Section - Just the icon, no wordmark */}
      {/* Hidden until mounted to prevent hydration flash */}
      <div className={`flex items-center justify-center shrink-0 py-5 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
        {logoUrl ? (
          // Custom logo
          <img
            src={logoUrl}
            alt="Logo"
            className="size-8 object-contain"
          />
        ) : (
          // Logo creator: dynamic icon shape + Phosphor icon (no wordmark for narrow sidebar)
          // Uses CSS variables directly - no JavaScript resolution needed
          <div className="relative size-8 shrink-0">
            {iconShape.renderBackground(branding.bgColor || "var(--canvas-primary)")}
            <div className="absolute inset-0 flex items-center justify-center z-10">
              {(() => {
                const IconComponent = iconMap[branding.iconName || "Buildings"] || Buildings;
                return <IconComponent weight="bold" size={18} color={branding.iconColor || "var(--canvas-primary-foreground)"} />;
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col items-center gap-1 flex-1 px-4 pb-5">
        {items.map((item) => (
          <IconNavItem
            key={item.id}
            item={item}
            variant={variant}
            onClick={() => onItemClick?.(item)}
          />
        ))}
      </nav>
    </aside>
  );
}

