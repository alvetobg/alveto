import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  className,
  disabled = false,
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-7 py-3 text-sm font-semibold tracking-wide transition-all duration-300 ease-out";

  const variants = {
    primary:
      "bg-primary text-white shadow-lg hover:-translate-y-0.5 hover:bg-primary-hover hover:shadow-xl active:translate-y-0",

    secondary:
      "border border-white/70 bg-transparent text-white hover:bg-white hover:text-dark hover:border-white",

    ghost:
      "bg-transparent text-dark hover:bg-black/5",
  };

  return (
    <Link
      href={disabled ? "#" : href}
      aria-disabled={disabled}
      className={cn(
        base,
        variants[variant],
        disabled && "pointer-events-none opacity-50",
        className
      )}
    >
      {children}
    </Link>
  );
}