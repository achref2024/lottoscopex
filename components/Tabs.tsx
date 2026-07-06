"use client";

import { ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

export interface TabSection {
  id: string;
  label: string;
  icon: ReactNode;
  content: ReactNode;
}

export default function Tabs({ sections }: { sections: TabSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  // Deep-link support: /lottery/euromillions#probability opens straight on
  // that tab instead of always defaulting to the first one.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash && sections.some((s) => s.id === hash)) {
      setActive(hash);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="sticky top-[81px] z-30 -mx-5 mb-8 border-b border-felt-800 bg-felt-950/95 px-5 backdrop-blur-xl sm:-mx-8 sm:top-[89px] sm:px-8">
        <div className="scrollbar-none flex gap-1 overflow-x-auto py-3">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActive(s.id)}
              className={clsx(
                "relative flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                active === s.id
                  ? "text-black"
                  : "text-mist-400 hover:text-white"
              )}
            >
              {active === s.id && (
                <motion.span
                  layoutId="tab-pill"
                  className="absolute inset-0 rounded-full bg-gold"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                {s.icon}
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {sections.map((s) => (
        <div
          key={s.id}
          className={s.id === active ? "block animate-[fade-up_0.35s_ease-out]" : "hidden"}
        >
          {s.content}
        </div>
      ))}
    </div>
  );
}
