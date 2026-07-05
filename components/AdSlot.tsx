"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT_ID } from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

interface AdSlotProps {
  /** The AdSense ad unit ID for this placement, created once the account exists. */
  slot: string;
  className?: string;
  /** Text shown in the placeholder box before a real ad unit is wired in. */
  label?: string;
  minHeight?: number;
}

/**
 * A single ad placement. Renders a plain placeholder box (matching the site's
 * theme) until lib/ads.ts's ADSENSE_CLIENT_ID is filled in, at which point it
 * automatically renders a real Google AdSense unit instead — no other code
 * needs to change.
 */
export default function AdSlot({ slot, className = "", label = "Advertisement", minHeight = 250 }: AdSlotProps) {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_CLIENT_ID || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense script not loaded yet (or blocked by the visitor) — safe to ignore.
    }
  }, []);

  if (!ADSENSE_CLIENT_ID) {
    return (
      <div
        className={`flex items-center justify-center rounded-2xl border border-dashed border-felt-700 bg-felt-900/40 text-xs font-medium uppercase tracking-wide text-mist-600 ${className}`}
        style={{ minHeight }}
      >
        {label}
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle block ${className}`}
      style={{ display: "block", minHeight }}
      data-ad-client={ADSENSE_CLIENT_ID}
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}
