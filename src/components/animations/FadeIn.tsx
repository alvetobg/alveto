"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
  distance?: number;
};

export default function FadeIn({
  children,
  delay = 0,
  className = "",
  direction = "up",
  distance = 40,
}: FadeInProps) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -distance }
      : direction === "right"
      ? { opacity: 0, x: distance }
      : { opacity: 0, y: distance };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}