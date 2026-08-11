"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type PremiumRevealProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export default function PremiumReveal({
  children,
  className,
}: PremiumRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0.96, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.22, once: true }}
      transition={{
        duration: reduceMotion ? 0 : 0.52,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
