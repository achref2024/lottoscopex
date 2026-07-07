"use client";

import { motion } from "framer-motion";
import { getBallGradient, getBallTextColor, BONUS_BALL, BALL_TEXT } from "@/lib/colors";
import { BonusShape } from "@/lib/types";
import clsx from "clsx";

interface LotteryBallProps {
  number: number;
  variant?: "main" | "bonus";
  shape?: BonusShape;
  size?: "xs" | "sm" | "md" | "lg";
  delay?: number;
  animate?: boolean;
  lotteryId?: string;
}

const SIZE_MAP = {
  xs: "h-9 w-9 text-sm",
  sm: "h-12 w-12 text-base",
  md: "h-16 w-16 text-xl",
  lg: "h-24 w-24 text-3xl",
};

export default function LotteryBall({
  number,
  variant = "main",
  shape = "circle",
  size = "md",
  delay = 0,
  animate = true,
  lotteryId,
}: LotteryBallProps) {
  const colors = variant === "bonus" ? BONUS_BALL : getBallGradient(number, lotteryId);
  const textColor = variant === "bonus" ? BALL_TEXT : getBallTextColor(lotteryId);
  const shapeClass =
    variant === "bonus" && shape === "diamond"
      ? "rounded-lg rotate-45"
      : "rounded-full";

  const inner = (
    <div
      className={clsx(
        "flex items-center justify-center font-display font-bold shadow-soft ring-2 ring-inset ring-black/10",
        SIZE_MAP[size],
        shapeClass
      )}
      style={{
        background: `linear-gradient(145deg, ${colors.from}, ${colors.to})`,
        boxShadow: `0 4px 10px -3px ${colors.to}66`,
        color: textColor,
      }}
    >
      <span className={shape === "diamond" && variant === "bonus" ? "-rotate-45" : ""}>
        {number}
      </span>
      {variant === "bonus" && shape === "star" && (
        <svg
          className={clsx(
            "pointer-events-none absolute opacity-20",
            SIZE_MAP[size]
          )}
          viewBox="0 0 24 24"
          fill={BALL_TEXT}
        >
          <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.7 7-6.3-3.9-6.3 3.9 1.7-7L2 9.2l7.1-.6z" />
        </svg>
      )}
    </div>
  );

  if (!animate) return <div className="relative inline-flex">{inner}</div>;

  return (
    <motion.div
      className="relative inline-flex"
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 260, damping: 16 }}
    >
      {inner}
    </motion.div>
  );
}
