"use client";

import { useEffect } from "react";
import { captureUtmParams } from "@/lib/utm";

/** Invisible component that captures UTM params on mount. */
export function UtmCapture() {
  useEffect(() => {
    captureUtmParams();
  }, []);
  return null;
}
