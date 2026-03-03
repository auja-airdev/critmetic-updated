"use client";

import { useEffect, useState } from "react";
import {
  ThemeProvider,
  ThemeDrawer,
  type BrandingState,
  type ImageKey,
  type BrandAssetData,
} from "canvas-ui-sdk";
import { savedBranding, savedImages } from "@/lib/theme-config";

interface ThemeData {
  branding?: BrandingState;
  images?: Record<ImageKey, string>;
  overrides?: Record<string, string>;
  brandAssets?: BrandAssetData[];
}

export default function ThemeDrawerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [themeData, setThemeData] = useState<ThemeData>({
    branding: savedBranding,
    images: savedImages,
  });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/theme")
      .then((res) => res.json())
      .then((data: ThemeData) => {
        if (data && Object.keys(data).length > 0) {
          setThemeData(data);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  if (!loaded) return null;

  return (
    <ThemeProvider
      branding={themeData.branding}
      images={themeData.images}
      brandAssets={themeData.brandAssets}
    >
      <ThemeDrawer
        initialBranding={themeData.branding}
        initialImages={themeData.images}
        initialOverrides={themeData.overrides}
        initialBrandAssets={themeData.brandAssets}
        onSave={(data) => {
          fetch("/api/theme", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          });
        }}
        onImageUpload={async (_key: ImageKey, file: File) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          const { url } = await res.json();
          return url;
        }}
        onBrandAssetUpload={async (file: File) => {
          const formData = new FormData();
          formData.append("file", file);
          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });
          return res.json();
        }}
        onBrandAssetSave={async (imageUrl: string, name: string) => {
          const res = await fetch("/api/upload/from-url", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: imageUrl, name }),
          });
          return res.json();
        }}
        onBrandAssetDelete={async (asset: BrandAssetData) => {
          await fetch("/api/upload", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: asset.url }),
          });
        }}
      />
      {children}
    </ThemeProvider>
  );
}
