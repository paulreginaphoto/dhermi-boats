"use client";

import { useEffect } from "react";

type GalleryViewerRuntimeProps = {
  code: string;
};

export function GalleryViewerRuntime({ code }: GalleryViewerRuntimeProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") return undefined;

    const timer = window.setTimeout(() => {
      try {
        new Function(code)();
      } catch (error) {
        console.error("Gallery viewer failed to initialise", error);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [code]);

  if (process.env.NODE_ENV === "production") {
    return <script id="gallery-viewer" dangerouslySetInnerHTML={{ __html: code }} />;
  }

  return null;
}
