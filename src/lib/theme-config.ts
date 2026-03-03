import type { BrandingState, ImageKey } from "canvas-ui-sdk";

export const savedBranding: BrandingState = {
  iconShape: "rounded",
  iconName: "",
  bgColor: "",
  iconColor: "",
  wordmark: "",
  sidebarMode: "light",
};

export const savedImages: Record<ImageKey, string> = {
  logoLight: "",
  logoDark: "",
  faviconLight: "",
  faviconDark: "",
};
