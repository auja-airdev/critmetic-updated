# Canvas Consumer App

This is a Next.js app that uses the Canvas UI SDK component library.

## Adding Components

This project uses a **shadcn-style CLI** to copy component source files from `canvas-ui-sdk` into the project for full customization.

### Available commands

```bash
# See all available components (145 total: layouts, blocks, UI primitives, hooks)
npx canvas-ui list

# Copy components into the project (auto-resolves dependencies)
npx canvas-ui add <component-name> [component-name...]

# Examples:
npx canvas-ui add button                 # Copies button + utils
npx canvas-ui add dashboard-shell        # Copies shell + sidebar + header + 15 deps
npx canvas-ui add standard-data-table    # Copies table + pagination + deps
```

### How it works

- Components are copied as **editable source files** into `src/components/`
- UI primitives go to `src/components/ui/`
- Layout shells go to `src/components/layout/`
- Block components go to `src/components/blocks/<category>/`
- Hooks go to `src/hooks/`
- Utilities go to `src/lib/`
- Import paths use `@/` aliases (e.g. `@/components/ui/button`, `@/lib/utils`)
- npm dependencies (like `@radix-ui/*`, `class-variance-authority`) are auto-installed

### Default Page Templates

When building common app pages, use these Canvas base templates by default:
- **Account settings / user preferences** → `page-account` (AccountSettingsShell)
- **Admin portal / admin dashboard** → `page-admin-portal` (DashboardShell)
- **Login** → `page-login` (split layout with LoginBrandingPanel)
- **Signup** → `page-login` (same template, adjust form fields)
- **Password reset** → `page-reset-password` (split layout)

Only deviate from these defaults when the user explicitly specifies a different template, provides a reference design that significantly differs, or describes requirements incompatible with the base templates.

### When building a page

1. Decide which layout shell fits (run `npx canvas-ui list` to see options)
2. Add the layout: `npx canvas-ui add <shell-name>`
3. Add any blocks needed: `npx canvas-ui add <block-name> [block-name...]`
4. Import components from their local paths (e.g. `import { Button } from "@/components/ui/button"`)
5. Customize the copied source files as needed

### What stays in the npm package (do NOT copy these)

- Design tokens / CSS variables (`canvas-ui-sdk/styles`)
- Tailwind theme mappings (`canvas-ui-sdk/tailwind`)
- Theme context and providers (`canvas-ui-sdk`)

These are imported directly from the npm package, not copied.

## Design Tokens

When creating or modifying components, always use the canvas design token CSS variables. Never use raw Tailwind color classes (`bg-white`, `text-gray-500`, `border-gray-200`) or hardcoded pixel values for font sizes. Use the token system instead:

- **Colors**: `var(--canvas-background)`, `var(--canvas-text)`, `var(--canvas-primary)`, `var(--canvas-border)`, etc.
- **Typography**: `var(--typo-body-s-size)`, `var(--typo-body-m-size)`, `var(--typo-h4-size)`, `var(--typo-global-font)`, etc.
- **Spacing**: `var(--spacing-sm)`, `var(--spacing-md)`, `var(--spacing-lg)`, etc.
- **Radii**: `var(--radius-xs)`, `var(--radius-sm)`, `var(--radius-md)`, etc.
- **Inputs**: `var(--canvas-border-input)`, `var(--input-standard-height)`, `var(--input-standard-radius)`, etc.
- **Buttons**: `var(--btn-primary-bg)`, `var(--btn-standard-height)`, etc.

Reference the SDK's `styles/tokens.reference.css` for the full list of available tokens.

## Design Best Practices

- **Prefer SDK components over hand-rolled layouts** for common UI patterns (stats, metrics, reviews, profile cards, data tables). Always check `npx canvas-ui list` or the MCP `list_components` tool before writing custom markup — the SDK likely has a component that handles it with proper spacing, alignment, and responsive behavior built in.
- **Numeric displays need visual structure** — never render large numbers in a bare flex row without containment. Use `StatsCard` for profile/sidebar stats, `MetricCardsRow` for dashboard KPIs with change indicators, or `MetricsSection` for marketing hero stats. If none fits exactly, at minimum wrap numbers in a card container with dividers or border separators.
- **Use Typography for text** — use the `Typography` component with heading variants (`h4`–`h6`) for stat values and `body-s` muted for labels. Avoid raw `fontSize`/`fontWeight` inline styles when Typography already handles token-correct sizing, font family, and line height.
- **Customize components, don't rebuild them** — when a component is close but not perfect for a use case, import it and make small modifications (remove the card wrapper via className, adjust padding, hide a section) rather than rebuilding from scratch. Components encode spacing, alignment, typography scale, and responsive breakpoints that are easy to get wrong when hand-rolling.
- **Use the MCP `review_design` tool** before finalizing layouts — it checks for common anti-patterns like uncontained numbers, missing visual hierarchy, or hand-rolled patterns that have SDK component equivalents.
- **Block-first for content sections** — before writing custom JSX for any content section, check if the SDK has a block for it. Common mappings: Reviews → `ReviewsTable`, Image galleries → `TileImageGallery`, Activity feeds → `ActivityFeed`, Chat → `BottomInputChatWidget`, Data listings → `StandardDataTable` / `GridTilesList`, FAQ → `FaqsTable`, Social feeds → `SocialFeed`, Calendar → `MonthlyCalendarWidget`, Comments → `NestedCommentsTable`. The SDK has 119 blocks — hand-rolling what already exists wastes time and produces worse results.
- **Always provide images** — components that accept image props (`TileImageGallery`, `LoginBrandingPanel`, `HeroSection`, `ProfileCard`, `DestinationCards`, etc.) should always receive relevant images. First check if the user has saved brand assets in the ThemeDrawer's Images panel — if available, use those. Otherwise, use high-quality Unsplash images that match the content context. Never leave image props empty when the component has a visual placeholder or broken default.
- **Choose the right data format** — use `GridTilesList` (tile cards with images) when each item has a prominent visual (property photos, product images, portfolio pieces). Use `StandardDataTable` (tabular rows) for text-heavy data like user lists, transactions, or logs. When items have large images, the tile format is always more appropriate than squeezing them into small row avatars.

## CSS Setup

The app's `src/app/globals.css` imports:
```css
@import "tailwindcss";
@import "canvas-ui-sdk/tailwind";
@import "canvas-ui-sdk/styles";
@source "../../node_modules/canvas-ui-sdk/dist";
```

## Project Structure

```
src/
  app/           # Next.js app router pages
  components/    # Copied Canvas UI components (editable)
    ui/          # Primitives (button, input, dialog, etc.)
    layout/      # Layout shells (dashboard-shell, sidebar, etc.)
    blocks/      # Feature blocks (data-tables, forms, cards, etc.)
  hooks/         # Copied hooks
  lib/           # Utilities (utils.ts with cn() helper)
```
