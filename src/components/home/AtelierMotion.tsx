"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AtelierMotionProps = Readonly<{
  children: ReactNode;
  className?: string;
  delay?: number;
  eager?: boolean;
}>;

export default function AtelierMotion({
  children,
  className,
  delay = 0,
  eager = false,
}: AtelierMotionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion
    ? false
    : {
        opacity: 0.96,
        y: eager ? 0 : 18,
      };
  const visible = { opacity: 1, y: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      animate={eager ? visible : undefined}
      whileInView={eager ? undefined : visible}
      viewport={eager ? undefined : { once: true, amount: 0.12 }}
      transition={{
        duration: reduceMotion ? 0 : eager ? 0.7 : 0.6,
        delay: reduceMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
