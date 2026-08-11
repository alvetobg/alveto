"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { CloseIcon } from "@/components/menu/MenuIcons";
import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
import { formatAddress } from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
};

type MobileMenuLayerProps = Omit<MobileMenuProps, "open">;

function MobileMenuLayer({
  onClose,
  reservationSettings,
  siteSettings,
}: MobileMenuLayerProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverscrollBehavior = root.style.overscrollBehavior;
    const previousBodyOverflow = body.style.overflow;
    const previousBodyOverscrollBehavior = body.style.overscrollBehavior;
    const previousBodyPaddingRight = body.style.paddingRight;
    const previousBodyPosition = body.style.position;
    const previousBodyTop = body.style.top;
    const previousBodyLeft = body.style.left;
    const previousBodyWidth = body.style.width;
    const scrollPosition = { x: window.scrollX, y: window.scrollY };
    const openedLocation = window.location.href;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const backgroundElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        "body > header, body > main, body > footer, body > a[href='#main-content']",
      ),
    );
    const backgroundState = backgroundElements.map((element) => ({
      element,
      ariaHidden: element.getAttribute("aria-hidden"),
      inert: element.inert,
    }));

    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";
    body.style.position = "fixed";
    body.style.top = `-${scrollPosition.y}px`;
    body.style.left = `-${scrollPosition.x}px`;
    body.style.width = "100%";

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    backgroundElements.forEach((element) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

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

    const desktopMediaQuery = window.matchMedia("(min-width: 768px)");
    const handleDesktopBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    desktopMediaQuery.addEventListener("change", handleDesktopBreakpoint);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", handleKeyDown);
      desktopMediaQuery.removeEventListener("change", handleDesktopBreakpoint);
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscrollBehavior;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      body.style.paddingRight = previousBodyPaddingRight;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.width = previousBodyWidth;

      backgroundState.forEach(({ element, ariaHidden, inert }) => {
        element.inert = inert;

        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });

      if (window.location.href === openedLocation) {
        previouslyFocused?.focus({ preventScroll: true });
        window.scrollTo({
          left: scrollPosition.x,
          top: scrollPosition.y,
          behavior: "instant",
        });
      } else if (window.location.hash) {
        const targetId = window.location.hash.slice(1);

        window.requestAnimationFrame(() => {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "instant",
            block: "start",
          });
        });
      }
    };
  }, [onClose]);

  return (
    <div
      id="mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-[80] flex items-center justify-end p-2 md:hidden"
    >
      <motion.button
        type="button"
        aria-label="Close navigation menu"
        onClick={onClose}
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: reduceMotion ? 0 : 0.15,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0 bg-dark/55"
      />

      <motion.div
        ref={panelRef}
        initial={reduceMotion ? false : { opacity: 0.98, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={
          reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0.98, x: 16 }
        }
        transition={{
          duration: reduceMotion ? 0 : 0.28,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative flex max-h-[min(720px,calc(100dvh-1rem))] w-[90vw] max-w-[380px] flex-col overflow-y-auto overscroll-contain rounded-[22px] bg-cream px-5 shadow-[-16px_16px_48px_rgba(0,0,0,0.18)] min-[375px]:px-6"
        style={{
          paddingTop: "max(1.25rem, env(safe-area-inset-top))",
          paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))",
        }}
      >
        <div className="flex items-center justify-between border-b border-dark/10 pb-5">
          <Link
            href="/"
            aria-label={`${siteSettings.businessName} Home`}
            onClick={onClose}
          >
            <Image
              src="/logos/alveto-wordmark.png"
              alt={siteSettings.businessName}
              width={120}
              height={29}
              sizes="120px"
              className="h-auto w-32"
            />
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-dark/14 text-dark transition-[color,border-color,background-color,transform] duration-200 hover:border-primary hover:text-primary active:translate-y-px motion-reduce:transform-none"
          >
            <CloseIcon />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="mt-5">
          <ul className="space-y-1">
            <li>
              <Link
                href="/"
                onClick={onClose}
                className="flex min-h-12 items-center rounded-[12px] px-3 text-xl font-semibold tracking-[-0.025em] text-dark transition-colors duration-200 hover:bg-white/80 hover:text-primary"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/#experience"
                onClick={onClose}
                className="flex min-h-12 items-center rounded-[12px] px-3 text-xl font-semibold tracking-[-0.025em] text-dark transition-colors duration-200 hover:bg-white/80 hover:text-primary"
              >
                Experience
              </Link>
            </li>
            <li>
              <Link
                href="/menu"
                onClick={onClose}
                aria-current="page"
                className="flex min-h-12 items-center rounded-[12px] bg-white/80 px-3 text-xl font-semibold tracking-[-0.025em] text-primary transition-colors duration-200"
              >
                Menu
              </Link>
            </li>
          </ul>
        </nav>

        <div className="mt-6 border-t border-dark/10 pt-5">
          {reservationSettings?.reservationsEnabled &&
          reservationSettings.reservationUrl ? (
            <Button
              href={reservationSettings.reservationUrl}
              className="w-full"
            >
              {reservationSettings.primaryCtaLabel}
            </Button>
          ) : null}
          {formatAddress(siteSettings) ? (
            <p className="mt-5 text-sm leading-6 text-text">
              {formatAddress(siteSettings)}
            </p>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}

export default function MobileMenu({
  open,
  onClose,
  reservationSettings,
  siteSettings,
}: MobileMenuProps) {
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <MobileMenuLayer
          onClose={onClose}
          reservationSettings={reservationSettings}
          siteSettings={siteSettings}
        />
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
