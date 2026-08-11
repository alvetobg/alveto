import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowUpRightIcon } from "@/components/ui/Icons";
import { cn } from "@/lib/utils";

type PremiumButtonProps = Readonly<{
  children: ReactNode;
  href: string;
  variant?: "primary" | "image" | "outline" | "dark" | "ghost";
  className?: string;
  showArrow?: boolean;
}>;

export default function PremiumButton({
  children,
  href,
  variant = "primary",
  className,
  showArrow = false,
}: PremiumButtonProps) {
  const variants = {
    primary: "premium-button--primary",
    image: "premium-button--image",
    outline: "premium-button--outline",
    dark: "premium-button--dark",
    ghost: "premium-button--ghost",
  };
  const classes = cn(
    "premium-button",
    variants[variant],
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {showArrow ? (
        <ArrowUpRightIcon className="premium-button-icon" />
      ) : null}
    </>
  );

  if (
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return (
      <a
        href={href}
        className={classes}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
