"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
import { formatAddress } from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type MobileMenuProps = Readonly<{
  appearance?: "classic" | "atelier";
  open: boolean;
  onClose: () => void;
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

const mobileLinks = [
  { href: "/#experience", label: "Experience", number: "01" },
  { href: "/menu", label: "Menu", number: "02" },
] as const;

export default function MobileMenu({
  appearance = "classic",
  open,
  onClose,
  reservationSettings,
  siteSettings,
}: MobileMenuProps) {
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const isAtelier = appearance === "atelier";
  const address = formatAddress(siteSettings);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const breakpointQuery = window.matchMedia(
      isAtelier ? "(min-width: 1024px)" : "(min-width: 768px)",
    );

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );

      if (!focusableElements?.length) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    breakpointQuery.addEventListener("change", handleBreakpointChange);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      breakpointQuery.removeEventListener("change", handleBreakpointChange);
      previouslyFocused?.focus();
    };
  }, [isAtelier, onClose, open]);

  if (typeof document === "undefined") {
    return null;
  }

  const portalTarget = isAtelier
    ? document.querySelector<HTMLElement>(".homepage-v2") ?? document.body
    : document.body;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.22 }}
          className={
            "fixed inset-0 z-[60] " + (isAtelier ? "lg:hidden" : "md:hidden")
          }
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            className="absolute inset-0 bg-black/58 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { x: 0 } : { x: "100%" }}
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              paddingTop: "max(1.5rem, env(safe-area-inset-top))",
              paddingBottom: "max(2rem, env(safe-area-inset-bottom))",
            }}
            className={
              "absolute inset-y-0 right-0 flex max-w-full flex-col overflow-y-auto overscroll-contain shadow-[-20px_0_60px_rgba(0,0,0,0.2)] " +
              (isAtelier
                ? "w-[min(92vw,400px)] bg-[var(--atelier-ivory)] px-6 text-[var(--atelier-ink-deep)] sm:px-8"
                : "w-[min(88vw,380px)] bg-cream px-7")
            }
          >
            <div
              className={
                "flex items-center justify-between border-b pb-6 " +
                (isAtelier
                  ? "border-[var(--atelier-line)]"
                  : "border-black/10")
              }
            >
              <Link
                href="/"
                aria-label={siteSettings.businessName + " Home"}
                aria-current={pathname === "/" ? "page" : undefined}
                onClick={onClose}
                className="flex min-h-11 items-center"
              >
                <Image
                  src="/logos/alveto-wordmark.png"
                  alt={siteSettings.businessName}
                  width={isAtelier ? 136 : 120}
                  height={isAtelier ? 33 : 29}
                  sizes={isAtelier ? "136px" : "120px"}
                  className={isAtelier ? "h-auto w-[136px]" : "h-auto w-[120px]"}
                />
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={onClose}
                className={
                  "flex h-12 w-12 items-center justify-center border text-2xl transition-colors " +
                  (isAtelier
                    ? "rounded-full border-[var(--atelier-line)] bg-transparent text-[var(--atelier-ink-deep)] hover:border-[var(--atelier-coral)]"
                    : "rounded-2xl border-black/10 bg-white text-dark hover:border-primary/30 hover:text-primary")
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <nav aria-label="Mobile navigation" className={isAtelier ? "mt-12" : "mt-10"}>
              <ul className={isAtelier ? "divide-y divide-[var(--atelier-line)]" : "space-y-2"}>
                {mobileLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={
                        link.href === "/menu" && pathname === "/menu"
                          ? "page"
                          : undefined
                      }
                      onClick={onClose}
                      className={
                        isAtelier
                          ? "group grid min-h-20 grid-cols-[auto_minmax(0,1fr)] items-center gap-5 py-5 text-[var(--atelier-ink-deep)]"
                          : "block rounded-2xl px-4 py-4 text-2xl font-bold tracking-tight text-dark transition-colors hover:bg-white hover:text-primary"
                      }
                    >
                      {isAtelier ? (
                        <>
                          <span
                            aria-hidden="true"
                            className="text-xs font-semibold tracking-[0.18em] text-[var(--atelier-ink-soft)]"
                          >
                            {link.number}
                          </span>
                          <span className="font-[family-name:var(--font-display)] text-4xl font-semibold leading-none tracking-[-0.05em] transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none">
                            {link.label}
                          </span>
                        </>
                      ) : (
                        link.label
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className={
                "mt-auto border-t pt-6 " +
                (isAtelier
                  ? "border-[var(--atelier-line)]"
                  : "border-black/10")
              }
            >
              {reservationSettings?.reservationsEnabled &&
              reservationSettings.reservationUrl ? (
                <Button
                  href={reservationSettings.reservationUrl}
                  variant={isAtelier ? "atelier" : "primary"}
                  className={
                    isAtelier
                      ? "min-h-12 w-full rounded-full px-7"
                      : "w-full py-4"
                  }
                >
                  {reservationSettings.primaryCtaLabel}
                </Button>
              ) : null}

              {address ? (
                <p
                  className={
                    "mt-5 text-center text-sm leading-6 " +
                    (isAtelier
                      ? "text-[var(--atelier-ink-soft)]"
                      : "text-text")
                  }
                >
                  {address}
                </p>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalTarget,
  );
}
