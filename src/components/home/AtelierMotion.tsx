"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AtelierMotionProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  eager?: boolean;
}>;

export default function AtelierMotion({
  children,
  className,
  delay = 0,
  direction = "up",
  eager = false,
}: AtelierMotionProps) {
  const reduceMotion = useReducedMotion();
  const offset = direction === "left" ? -24 : direction === "right" ? 24 : 0;
  const initial = reduceMotion
    ? false
    : {
        opacity: eager ? 0.72 : 0.84,
        scale: eager ? 1.025 : 1.015,
        x: offset,
        y: direction === "up" ? 24 : 0,
      };
  const visible = {
    opacity: 1,
    scale: 1,
    x: 0,
    y: 0,
  };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={eager ? visible : undefined}
      whileInView={eager ? undefined : visible}
      viewport={eager ? undefined : { once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : eager ? 0.85 : 0.7,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
