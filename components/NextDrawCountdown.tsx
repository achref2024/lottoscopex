"use client";

import { useEffect, useState } from "react";

function pad(n: number): string {
  return String(Math.max(0, n)).padStart(2, "0");
}

interface NextDrawCountdownProps {
  targetMs: number;
  labels: { days: string; hours: string; minutes: string; seconds: string };
}

/**
 * Live-ticking countdown to a specific target timestamp. Renders nothing
 * until mounted client-side (targetMs is computed from real draw times/
 * timezones and would otherwise mismatch between server and client renders).
 */
export default function NextDrawCountdown({ targetMs, labels }: NextDrawCountdownProps) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) {
    return <div className="h-[52px]" aria-hidden />;
  }

  const diff = Math.max(0, targetMs - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);

  const units: { value: number; label: string }[] = [
    { value: days, label: labels.days },
    { value: hours, label: labels.hours },
    { value: minutes, label: labels.minutes },
    { value: seconds, label: labels.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-2">
      {units.map((u) => (
        <div key={u.label} className="rounded-lg bg-felt-800 py-2 text-center">
          <div className="font-display text-xl font-bold tabular-nums text-white">{pad(u.value)}</div>
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wide text-mist-500">
            {u.label}
          </div>
        </div>
      ))}
    </div>
  );
}
