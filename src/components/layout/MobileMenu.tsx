"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  reservationSettings: PublicReservationSettings | null;
};

export default function MobileMenu({
  open,
  onClose,
  reservationSettings,
}: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

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

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[60] md:hidden"
        >
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="absolute inset-0 bg-black/55 backdrop-blur-sm"
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
            className="absolute inset-y-0 right-0 flex w-[min(88vw,380px)] flex-col bg-cream px-7 pb-8 pt-6 shadow-[-20px_0_60px_rgba(0,0,0,0.2)]"
          >
            <div className="flex items-center justify-between border-b border-black/10 pb-6">
              <Link href="/" aria-label="ALVETO Home" onClick={onClose}>
                <Image
                  src="/logos/alveto-wordmark.png"
                  alt="Alveto"
                  width={120}
                  height={29}
                  sizes="120px"
                  className="h-auto w-[120px]"
                />
              </Link>

              <button
                ref={closeButtonRef}
                type="button"
                aria-label="Close navigation menu"
                onClick={onClose}
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-black/10 bg-white text-2xl text-dark transition-colors hover:border-primary/30 hover:text-primary"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <nav aria-label="Mobile navigation" className="mt-10">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/#experience"
                    onClick={onClose}
                    className="block rounded-2xl px-4 py-4 text-2xl font-bold tracking-tight text-dark transition-colors hover:bg-white hover:text-primary"
                  >
                    Experience
                  </Link>
                </li>
                <li>
                  <Link
                    href="/menu"
                    onClick={onClose}
                    className="block rounded-2xl px-4 py-4 text-2xl font-bold tracking-tight text-dark transition-colors hover:bg-white hover:text-primary"
                  >
                    Menu
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="mt-auto border-t border-black/10 pt-6">
              {reservationSettings?.reservationsEnabled &&
              reservationSettings.reservationUrl ? (
                <Button
                  href={reservationSettings.reservationUrl}
                  className="w-full py-4"
                >
                  {reservationSettings.primaryCtaLabel}
                </Button>
              ) : null}
              <p className="mt-5 text-center text-sm leading-6 text-text">
                Sokolska 4, Belgrade
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
