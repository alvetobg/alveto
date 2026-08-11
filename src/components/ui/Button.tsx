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
    "inline-flex min-h-12 items-center justify-center rounded-[14px] px-6 py-3 text-sm font-semibold tracking-[-0.01em] transition-[color,background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] active:translate-y-px motion-reduce:transform-none";

  const variants = {
    primary:
      "border border-primary bg-primary text-dark hover:border-primary-hover hover:bg-primary-hover",

    secondary:
      "border border-white/70 bg-transparent text-white hover:border-white hover:bg-white hover:text-dark",

    ghost:
      "bg-transparent text-dark hover:bg-black/5",
  };

  const classes = cn(
    base,
    variants[variant],
    disabled && "pointer-events-none opacity-50",
    className
  );

  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return (
      <a
        href={disabled ? "#" : href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        aria-disabled={disabled}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={disabled ? "#" : href}
      aria-disabled={disabled}
      className={classes}
    >
      {children}
    </Link>
  );
}
