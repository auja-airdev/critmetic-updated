"use client";

import { useState } from "react";
import { Search, Bell, ShoppingCart, Menu, User, LogOut, MessageSquare, X, Home, Info, LayoutGrid, type LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useThemeBranding } from "canvas-ui-sdk";
import { AVATAR_ETHAN_BROOKS, AVATAR_SARAH_CHEN, AVATAR_JASON_MORALES, AVATAR_MARCUS_WEBB, AVATAR_ALEX_REEVES, AVATAR_MAYA_JOHNSON, AVATAR_HANNAH_KIM } from "@/components/blocks/demo-avatars";

// ============================================
// Cart Types
// ============================================

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

// Sample cart items for demo
const defaultCartItems: CartItem[] = [
  {
    id: "1",
    name: "Julian Bag",
    price: 120,
    image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=150&h=150&fit=crop",
  },
  {
    id: "2",
    name: "Davis Keychain",
    price: 60,
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=150&h=150&fit=crop&crop=center",
  },
];

// ============================================
// Message Types
// ============================================

export interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  timestamp: string;
}

// Sample messages for demo
const defaultMessages: Message[] = [
  {
    id: "1",
    senderName: "Ethan Brooks",
    senderAvatar: AVATAR_ETHAN_BROOKS,
    timestamp: "Jun 5, 2023 8:13 AM",
  },
  {
    id: "2",
    senderName: "Sarah Chen",
    senderAvatar: AVATAR_SARAH_CHEN,
    timestamp: "May 2, 2023 11:54 AM",
  },
  {
    id: "3",
    senderName: "Jason Morales",
    senderAvatar: AVATAR_JASON_MORALES,
    timestamp: "Jan 10, 2023 5:22 PM",
  },
  {
    id: "4",
    senderName: "Marcus Webb",
    senderAvatar: AVATAR_MARCUS_WEBB,
    timestamp: "Dec 20, 2022 2:22 PM",
  },
];

// ============================================
// Notification Types
// ============================================

export interface Notification {
  id: string;
  userName: string;
  userAvatar: string;
  action: string;
  timestamp: string;
}

// Sample notifications for demo
const defaultNotifications: Notification[] = [
  {
    id: "1",
    userName: "Sarah Chen",
    userAvatar: AVATAR_SARAH_CHEN,
    action: "liked your photo",
    timestamp: "Apr 15, 2023 6:21 AM",
  },
  {
    id: "2",
    userName: "Alex Reeves",
    userAvatar: AVATAR_ALEX_REEVES,
    action: "liked your photo",
    timestamp: "Jun 10, 2023 5:45 PM",
  },
  {
    id: "3",
    userName: "Maya Johnson",
    userAvatar: AVATAR_MAYA_JOHNSON,
    action: "liked your photo",
    timestamp: "May 9, 2023 2:00 AM",
  },
  {
    id: "4",
    userName: "Hannah Kim",
    userAvatar: AVATAR_HANNAH_KIM,
    action: "liked your photo",
    timestamp: "Apr 8, 2023 8:55 PM",
  },
];

// ============================================
// Navigation Types
// ============================================

export interface NavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
}

// Default navigation items
const defaultNavItems: NavItem[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: Info },
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
];

// Phosphor Icons for Logo
import { Buildings, type Icon as PhosphorIcon } from "@phosphor-icons/react";
import {
  Diamond, Hexagon, Star, Lightning, Sparkle, Infinity, Code, Terminal, Cpu,
  Database, Globe, Cloud, WifiHigh, Briefcase, Storefront, Handshake, ChartLine,
  Palette as PaletteIcon, PencilSimple, Camera, MusicNote, Lightbulb, Leaf, Tree,
  Sun, Moon, Fire, Drop, ChatCircle, Envelope, Phone, Megaphone, Heart, Shield,
  Trophy, Rocket, Target, Flag,
} from "@phosphor-icons/react";

// Icon shape renderers - use style attribute for CSS variable support
const iconShapes = {
  rounded: (bgColor: string) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full absolute inset-0">
      <rect width="32" height="32" rx="10" style={{ fill: bgColor }} />
    </svg>
  ),
  circle: (bgColor: string) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full absolute inset-0">
      <circle cx="16" cy="16" r="16" style={{ fill: bgColor }} />
    </svg>
  ),
  square: (bgColor: string) => (
    <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-full absolute inset-0">
      <rect width="32" height="32" style={{ fill: bgColor }} />
    </svg>
  ),
};

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

interface HeaderProps {
  /** Callback when mobile menu button is clicked */
  onMenuClick?: () => void;
  /** Whether to show the logo on desktop (for no-sidebar pages) */
  showDesktopLogo?: boolean;
  /** Visual variant - light (default) or dark mode */
  variant?: "light" | "dark";
  /** Callback when "My Account" is clicked */
  onAccountClick?: () => void;
  /** Callback when "Logout" is clicked */
  onLogout?: () => void;
  /** Avatar image URL */
  avatarUrl?: string;
  /** Cart items to display */
  cartItems?: CartItem[];
  /** Callback when checkout button is clicked */
  onCheckout?: () => void;
  /** Callback when remove item is clicked */
  onRemoveCartItem?: (id: string) => void;
  /** Messages to display */
  messages?: Message[];
  /** Callback when "Mark as read" is clicked for messages */
  onMarkAsRead?: () => void;
  /** Callback when "view more" is clicked for messages */
  onViewMoreMessages?: () => void;
  /** Notifications to display */
  notifications?: Notification[];
  /** Callback when "Mark as read" is clicked for notifications */
  onMarkNotificationsAsRead?: () => void;
  /** Callback when "view more" is clicked for notifications */
  onViewMoreNotifications?: () => void;
  /** Navigation items for header and mobile menu */
  navItems?: NavItem[];
  /** Callback when Login button is clicked */
  onLogin?: () => void;
  /** Callback when Sign up button is clicked */
  onSignUp?: () => void;
  /** Whether to show auth buttons (Login/Sign up) */
  showAuthButtons?: boolean;
}

/**
 * Canvas Design System - Header/Navbar Component
 * 
 * Desktop (lg+): Full logo with wordmark, icon cluster, avatar
 * Mobile/Tablet: Favicon only, avatar, hamburger menu
 * 
 * For pages without a sidebar, set showDesktopLogo={true} to display
 * the logo in the header on desktop.
 * 
 * Set variant="dark" for a dark themed header that matches the sidebar.
 */
export function Header({ 
  onMenuClick, 
  showDesktopLogo = false, 
  variant = "light",
  onAccountClick,
  onLogout,
  avatarUrl = AVATAR_SARAH_CHEN,
  cartItems = defaultCartItems,
  onCheckout,
  onRemoveCartItem,
  messages = defaultMessages,
  onMarkAsRead,
  onViewMoreMessages,
  notifications = defaultNotifications,
  onMarkNotificationsAsRead,
  onViewMoreNotifications,
  navItems = defaultNavItems,
  onLogin,
  onSignUp,
  showAuthButtons = false,
}: HeaderProps) {
  const { branding, isMounted } = useThemeBranding();
  const isDark = variant === "dark";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price, 0);

  // Cart popover content component
  const CartPopoverContent = () => (
    <div className="w-[320px]">
      {/* Header */}
      <div 
        className="flex items-center justify-between pb-[var(--spacing-xl)] border-b border-[var(--canvas-neutral-border)]"
      >
        <span
          style={{
            fontFamily: "var(--typo-body-m-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-m-size)",
            fontWeight: 600,
            lineHeight: "var(--typo-body-m-line-height)",
            color: "var(--canvas-text)",
          }}
        >
          Your cart
        </span>
        <span
          style={{
            fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-s-size)",
            fontWeight: 400,
            lineHeight: "var(--typo-body-s-line-height)",
            color: "var(--canvas-neutral-text)",
          }}
        >
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
        </span>
      </div>

      {/* Cart Items */}
      <div className="py-[var(--spacing-xl)] space-y-[var(--spacing-xl)]">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-[var(--spacing-lg)]">
            {/* Product Image */}
            <div 
              className="size-16 rounded-[var(--radius-md)] overflow-hidden shrink-0 bg-[var(--canvas-neutral-surface)]"
            >
              <img 
                src={item.image} 
                alt={item.name}
                className="size-full object-cover"
              />
            </div>
            
            {/* Product Details */}
            <div className="flex flex-col justify-center min-w-0">
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 600,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-text)",
                }}
              >
                {item.name}
              </span>
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 400,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-text)",
                }}
              >
                ${item.price}
              </span>
              <button
                onClick={() => onRemoveCartItem?.(item.id)}
                className="cursor-pointer text-left mt-[var(--spacing-xs)] hover:underline"
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 400,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-primary)",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div 
        className="flex items-center justify-between py-[var(--spacing-xl)] border-t border-[var(--canvas-neutral-border)]"
      >
        <span
          style={{
            fontFamily: "var(--typo-body-m-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-m-size)",
            fontWeight: 500,
            lineHeight: "var(--typo-body-m-line-height)",
            color: "var(--canvas-text)",
          }}
        >
          Total
        </span>
        <span
          style={{
            fontFamily: "var(--typo-body-m-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-m-size)",
            fontWeight: 600,
            lineHeight: "var(--typo-body-m-line-height)",
            color: "var(--canvas-text)",
          }}
        >
          ${cartTotal}
        </span>
      </div>

      {/* Checkout Button */}
      <Button
        variant="primary"
        className="w-full"
        size="default"
        onClick={onCheckout}
      >
        Checkout
      </Button>
    </div>
  );

  // Messages popover content component
  const MessagesPopoverContent = () => (
    <div className="w-[320px]">
      {/* Header */}
      <div 
        className="flex items-center justify-between pb-[var(--spacing-xl)] border-b border-[var(--canvas-neutral-border)]"
      >
        <span
          style={{
            fontFamily: "var(--typo-body-m-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-m-size)",
            fontWeight: 600,
            lineHeight: "var(--typo-body-m-line-height)",
            color: "var(--canvas-text)",
          }}
        >
          Messages
        </span>
        <button
          onClick={onMarkAsRead}
          className="cursor-pointer hover:underline"
          style={{
            fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-s-size)",
            fontWeight: 500,
            lineHeight: "var(--typo-body-s-line-height)",
            color: "var(--canvas-primary)",
          }}
        >
          Mark as read
        </button>
      </div>

      {/* Messages List */}
      <div className="py-[var(--spacing-lg)]">
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`flex gap-[var(--spacing-lg)] py-[var(--spacing-lg)] ${
              index < messages.length - 1 ? "border-b border-[var(--canvas-neutral-border)]" : ""
            }`}
          >
            {/* Sender Avatar */}
            <Avatar className="size-10 shrink-0">
              <AvatarImage src={message.senderAvatar} alt={message.senderName} />
              <AvatarFallback 
                className="bg-[var(--canvas-neutral-surface)] text-[var(--canvas-neutral-text)]"
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                }}
              >
                {message.senderName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            {/* Message Details */}
            <div className="flex flex-col justify-center min-w-0">
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 400,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-text)",
                }}
              >
                <span style={{ fontWeight: 600 }}>{message.senderName}</span> sent you a message
              </span>
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 400,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-neutral-text)",
                }}
              >
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div 
        className="pt-[var(--spacing-lg)] border-t border-[var(--canvas-neutral-border)] text-center"
      >
        <button
          onClick={onViewMoreMessages}
          className="cursor-pointer hover:underline"
          style={{
            fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-s-size)",
            fontWeight: 500,
            lineHeight: "var(--typo-body-s-line-height)",
            color: "var(--canvas-primary)",
          }}
        >
          view more
        </button>
      </div>
    </div>
  );

  // Notifications popover content component
  const NotificationsPopoverContent = () => (
    <div className="w-[320px]">
      {/* Header */}
      <div 
        className="flex items-center justify-between pb-[var(--spacing-xl)] border-b border-[var(--canvas-neutral-border)]"
      >
        <span
          style={{
            fontFamily: "var(--typo-body-m-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-m-size)",
            fontWeight: 600,
            lineHeight: "var(--typo-body-m-line-height)",
            color: "var(--canvas-text)",
          }}
        >
          Notifications
        </span>
        <button
          onClick={onMarkNotificationsAsRead}
          className="cursor-pointer hover:underline"
          style={{
            fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-s-size)",
            fontWeight: 500,
            lineHeight: "var(--typo-body-s-line-height)",
            color: "var(--canvas-primary)",
          }}
        >
          Mark as read
        </button>
      </div>

      {/* Notifications List */}
      <div className="py-[var(--spacing-lg)]">
        {notifications.map((notification, index) => (
          <div 
            key={notification.id} 
            className={`flex gap-[var(--spacing-lg)] py-[var(--spacing-lg)] ${
              index < notifications.length - 1 ? "border-b border-[var(--canvas-neutral-border)]" : ""
            }`}
          >
            {/* User Avatar */}
            <Avatar className="size-10 shrink-0">
              <AvatarImage src={notification.userAvatar} alt={notification.userName} />
              <AvatarFallback 
                className="bg-[var(--canvas-neutral-surface)] text-[var(--canvas-neutral-text)]"
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                }}
              >
                {notification.userName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            
            {/* Notification Details */}
            <div className="flex flex-col justify-center min-w-0">
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 400,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-text)",
                }}
              >
                <span style={{ fontWeight: 600 }}>{notification.userName}</span> {notification.action}
              </span>
              <span
                style={{
                  fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                  fontSize: "var(--typo-body-s-size)",
                  fontWeight: 400,
                  lineHeight: "var(--typo-body-s-line-height)",
                  color: "var(--canvas-neutral-text)",
                }}
              >
                {notification.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* View More */}
      <div 
        className="pt-[var(--spacing-lg)] border-t border-[var(--canvas-neutral-border)] text-center"
      >
        <button
          onClick={onViewMoreNotifications}
          className="cursor-pointer hover:underline"
          style={{
            fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
            fontSize: "var(--typo-body-s-size)",
            fontWeight: 500,
            lineHeight: "var(--typo-body-s-line-height)",
            color: "var(--canvas-primary)",
          }}
        >
          view more
        </button>
      </div>
    </div>
  );

  // Get the icon shape renderer
  const shapeRenderer = iconShapes[branding.iconShape as keyof typeof iconShapes] || iconShapes.rounded;

  // Logo component used for both mobile and desktop (when showDesktopLogo is true)
  // Uses CSS variables directly - no JavaScript resolution needed
  const LogoIcon = () => {
    // Use CSS variables directly - the browser handles resolution
    const bgColor = branding.bgColor || "var(--canvas-primary)";
    const iconColor = branding.iconColor || "var(--canvas-primary-foreground)";
    const IconComponent = iconMap[branding.iconName || "Buildings"] || Buildings;
    
    return (
      <div className="relative size-8 shrink-0">
        {shapeRenderer(bgColor)}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <IconComponent weight="bold" size={18} color={iconColor} />
        </div>
      </div>
    );
  };

  return (
    <header 
      className={`h-[var(--header-height)] w-full border-b ${
        isDark 
          ? "bg-[var(--canvas-sidebar-dark-bg)] border-[var(--canvas-sidebar-dark-border)]" 
          : "bg-[var(--canvas-background)] border-[var(--canvas-neutral-border)]"
      }`}
    >
      <div className="flex items-center h-full px-4 lg:px-[var(--spacing-5xl)]">
        {/* Logo - Visible on mobile, and on desktop when showDesktopLogo is true */}
        <div className={`flex items-center gap-[var(--spacing-md)] h-8 shrink-0 ${showDesktopLogo ? '' : 'lg:hidden'}`}>
          <LogoIcon />
          {/* Wordmark - only on desktop when showDesktopLogo is true */}
          {showDesktopLogo && (
            <span 
              className={`hidden lg:block ${isDark ? "text-[var(--canvas-sidebar-dark-active-text)]" : "text-[var(--canvas-text)]"}`}
              style={{
                fontFamily: "var(--typo-header-font, var(--typo-global-font))",
                fontSize: "var(--typo-body-xl-size)",
                fontWeight: 600,
                letterSpacing: "var(--typo-header-spacing)",
                lineHeight: "var(--typo-header-line-height)",
              }}
            >
              {branding.wordmark || "canvas"}
            </span>
          )}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Navigation Links - Desktop Only */}
        <nav className="hidden lg:flex items-center gap-[var(--spacing-2xl)] h-full">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                item.onClick?.();
                if (item.href) {
                  window.location.href = item.href;
                }
              }}
              className={`cursor-pointer transition-colors ${
                isDark 
                  ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]" 
                  : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
              }`}
              style={{
                fontFamily: "var(--typo-header-font, var(--typo-global-font))",
                fontSize: "var(--typo-header-size)",
                fontWeight: "var(--typo-header-weight)",
                letterSpacing: "var(--typo-header-spacing)",
                lineHeight: "var(--typo-header-line-height)",
              }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Icons - Always Visible */}
        <div className="flex items-center gap-[var(--spacing-2xl)] ml-[var(--spacing-2xl)]">
          <button
            className={`cursor-pointer transition-colors ${
              isDark
                ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]"
                : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
            }`}
            aria-label="Search"
          >
            <Search className="size-4" />
          </button>
          
          {isMounted ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`cursor-pointer transition-colors ${
                    isDark
                      ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]"
                      : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
                  }`}
                  aria-label="Notifications"
                >
                  <Bell className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={16} className="w-auto p-[var(--spacing-xl)]">
                <NotificationsPopoverContent />
              </PopoverContent>
            </Popover>
          ) : (
            <button
              className={`cursor-pointer transition-colors ${
                isDark
                  ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]"
                  : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
              }`}
              aria-label="Notifications"
            >
              <Bell className="size-4" />
            </button>
          )}

          {isMounted ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`cursor-pointer transition-colors ${
                    isDark
                      ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]"
                      : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
                  }`}
                  aria-label="Messages"
                >
                  <MessageSquare className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={16} className="w-auto p-[var(--spacing-xl)]">
                <MessagesPopoverContent />
              </PopoverContent>
            </Popover>
          ) : (
            <button
              className={`cursor-pointer transition-colors ${
                isDark
                  ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]"
                  : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
              }`}
              aria-label="Messages"
            >
              <MessageSquare className="size-4" />
            </button>
          )}

          {isMounted ? (
            <Popover>
              <PopoverTrigger asChild>
                <button
                  className={`cursor-pointer transition-colors ${
                    isDark
                      ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]"
                      : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
                  }`}
                  aria-label="Cart"
                >
                  <ShoppingCart className="size-4" />
                </button>
              </PopoverTrigger>
              <PopoverContent align="end" sideOffset={16} className="w-auto p-[var(--spacing-xl)]">
                <CartPopoverContent />
              </PopoverContent>
            </Popover>
          ) : (
            <button
              className={`cursor-pointer transition-colors ${
                isDark
                  ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)]"
                  : "text-[var(--canvas-neutral-text)] hover:text-[var(--canvas-text)]"
              }`}
              aria-label="Cart"
            >
              <ShoppingCart className="size-4" />
            </button>
          )}
          
          {/* Auth Buttons - Desktop Only */}
          {showAuthButtons && (
            <div className="hidden lg:flex items-center gap-[var(--spacing-lg)]">
              <Button
                variant="primary-outline"
                size="default"
                onClick={onLogin}
              >
                Log in
              </Button>
              <Button
                variant="primary"
                size="default"
                onClick={onSignUp}
              >
                Sign up
              </Button>
            </div>
          )}
          
          {/* Avatar with Dropdown */}
          {isMounted ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--canvas-primary)] focus:ring-offset-2">
                  <Avatar className={`size-10 border cursor-pointer ${
                    isDark
                      ? "border-[var(--canvas-sidebar-dark-border)]"
                      : "border-[var(--canvas-neutral-border)]"
                  }`}>
                    <AvatarImage src={avatarUrl} alt="User avatar" />
                    <AvatarFallback
                      className={
                        isDark
                          ? "bg-[var(--canvas-sidebar-dark-active-bg)] text-[var(--canvas-sidebar-dark-text)]"
                          : "bg-[var(--canvas-neutral-surface)] text-[var(--canvas-neutral-text)]"
                      }
                      style={{
                        fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                        fontSize: "var(--typo-body-s-size)",
                      }}
                    >
                      JC
                    </AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" sideOffset={8}>
                <DropdownMenuItem onClick={onAccountClick}>
                  <User className="size-4 mr-2" />
                  My Account
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onLogout}>
                  <LogOut className="size-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="cursor-pointer rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--canvas-primary)] focus:ring-offset-2">
              <Avatar className={`size-10 border cursor-pointer ${
                isDark
                  ? "border-[var(--canvas-sidebar-dark-border)]"
                  : "border-[var(--canvas-neutral-border)]"
              }`}>
                <AvatarImage src={avatarUrl} alt="User avatar" />
                <AvatarFallback
                  className={
                    isDark
                      ? "bg-[var(--canvas-sidebar-dark-active-bg)] text-[var(--canvas-sidebar-dark-text)]"
                      : "bg-[var(--canvas-neutral-surface)] text-[var(--canvas-neutral-text)]"
                  }
                  style={{
                    fontFamily: "var(--typo-body-s-font, var(--typo-global-font))",
                    fontSize: "var(--typo-body-s-size)",
                  }}
                >
                  JC
                </AvatarFallback>
              </Avatar>
            </button>
          )}

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => {
              setIsMobileMenuOpen(true);
              onMenuClick?.();
            }}
            aria-label="Open menu"
            className={`lg:hidden -ml-[var(--spacing-md)] ${isDark ? "text-[var(--canvas-sidebar-dark-text)] hover:text-[var(--canvas-sidebar-dark-active-text)] hover:bg-[var(--canvas-sidebar-dark-active-bg)]" : "text-[var(--canvas-neutral-text)]"}`}
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[var(--canvas-overlay-bg)]"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-[var(--canvas-background)] shadow-xl">
            {/* Close Button */}
            <div className="flex justify-end p-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="size-5" />
              </Button>
            </div>
            
            {/* Navigation Items */}
            <nav className="px-6 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        item.onClick?.();
                        if (item.href) {
                          window.location.href = item.href;
                        }
                        setIsMobileMenuOpen(false);
                      }}
                      className="cursor-pointer flex items-center gap-[var(--spacing-lg)] w-full py-[var(--spacing-lg)] text-left hover:bg-[var(--canvas-neutral-surface)] rounded-[var(--radius-md)] transition-colors"
                    >
                      {Icon && (
                        <div 
                          className="size-12 rounded-[var(--radius-md)] flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: "color-mix(in srgb, var(--canvas-primary) 10%, transparent)",
                          }}
                        >
                          <Icon 
                            className="size-5"
                            style={{ color: "var(--canvas-primary)" }}
                          />
                        </div>
                      )}
                      <span
                        style={{
                          fontFamily: "var(--typo-body-m-font, var(--typo-global-font))",
                          fontSize: "var(--typo-body-m-size)",
                          fontWeight: 400,
                          lineHeight: "var(--typo-body-m-line-height)",
                          color: "var(--canvas-text)",
                        }}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </nav>
            
            {/* Auth Buttons */}
            {showAuthButtons && (
              <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3 border-t border-[var(--canvas-neutral-border)]">
                <Button
                  variant="primary-outline"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    onLogin?.();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Log in
                </Button>
                <Button
                  variant="primary"
                  className="w-full"
                  size="lg"
                  onClick={() => {
                    onSignUp?.();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

