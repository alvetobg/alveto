"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { ArrowUpRightIcon, CloseIcon } from "@/components/ui/Icons";
import type { PublicReservationSettings } from "@/features/reservations/types";
import {
  formatAddress,
  groupBusinessHours,
} from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type HomepageMobileMenuProps = Readonly<{
  open: boolean;
  onClose: () => void;
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

export default function HomepageMobileMenu(
  props: HomepageMobileMenuProps,
) {
  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <AnimatePresence>{props.open ? <MobileMenuLayer {...props} /> : null}</AnimatePresence>,
    document.body,
  );
}

function MobileMenuLayer({
  onClose,
  reservationSettings,
  siteSettings,
}: HomepageMobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const address = formatAddress(siteSettings);
  const hours = groupBusinessHours(siteSettings);
  const canReserve = Boolean(
    reservationSettings?.reservationsEnabled &&
      reservationSettings.reservationUrl,
  );

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const previousRootOverflow = root.style.overflow;
    const previousRootOverscroll = root.style.overscrollBehavior;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyOverscroll = document.body.style.overscrollBehavior;
    const previousBodyPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    const isolatedElements = Array.from(
      document.querySelectorAll<HTMLElement>(
        '[data-homepage-header-shell], main, footer, body > a[href="#main-content"]',
      ),
    ).map((element) => ({
      element,
      inert: element.inert,
      ariaHidden: element.getAttribute("aria-hidden"),
    }));

    root.style.overflow = "hidden";
    root.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    isolatedElements.forEach(({ element }) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
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
      window.cancelAnimationFrame(focusFrame);
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscroll;
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.overscrollBehavior = previousBodyOverscroll;
      document.body.style.paddingRight = previousBodyPaddingRight;
      isolatedElements.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      id="homepage-mobile-navigation"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="fixed inset-0 z-[80] flex items-center justify-end p-2 md:hidden"
    >
      <motion.button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
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
        exit={reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0.98, x: 16 }}
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
            className="rounded-sm"
          >
            <Image
              src="/logos/alveto-wordmark.png"
              alt={siteSettings.businessName}
              width={128}
              height={31}
              sizes="128px"
              className="h-auto w-32"
            />
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            aria-label="Close navigation menu"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-[13px] border border-dark/14 text-dark transition-[color,border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary hover:text-primary active:translate-y-px"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <nav aria-label="Mobile navigation" className="mt-5">
          <ul className="space-y-1">
            {[
              { label: "Home", href: "/" },
              { label: "Experience", href: "/#experience" },
              { label: "Menu", href: "/menu" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="group flex min-h-12 items-center justify-between rounded-[12px] px-3 text-xl font-semibold tracking-[-0.025em] text-dark transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/80 hover:text-primary"
                >
                  {item.label}
                  <ArrowUpRightIcon className="h-[18px] w-[18px] transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {canReserve ? (
          <a
            href={reservationSettings?.reservationUrl ?? "#reservation"}
            target={reservationSettings?.reservationUrl?.startsWith("http") ? "_blank" : undefined}
            rel={reservationSettings?.reservationUrl?.startsWith("http") ? "noopener noreferrer" : undefined}
            onClick={onClose}
            className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-[14px] border border-primary bg-primary px-5 text-[15px] font-semibold text-dark transition-[background-color,border-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-[#d17b7b] hover:bg-[#d17b7b] active:translate-y-px"
          >
            {reservationSettings?.primaryCtaLabel}
          </a>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-dark/10 pt-5 text-xs leading-5 text-text">
          {address ? (
            <div>
              <p className="mb-1.5 font-semibold uppercase tracking-[0.2em] text-dark/70">
                Visit
              </p>
              <p>{address}</p>
            </div>
          ) : null}
          {hours.length > 0 ? (
            <div>
              <p className="mb-1.5 font-semibold uppercase tracking-[0.2em] text-dark/70">
                Hours
              </p>
              {hours.map((group) => (
                <p key={`${group.days}-${group.hours}`}>
                  <span className="block">{group.days}</span>
                  <span className="block">{group.hours}</span>
                </p>
              ))}
            </div>
          ) : null}
        </div>

        {siteSettings.socialLinks.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-dark/10 pt-5 text-xs font-semibold uppercase tracking-[0.16em] text-dark/65">
            {siteSettings.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="capitalize transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary"
              >
                {link.platform}
              </a>
            ))}
          </div>
        ) : null}
      </motion.div>
    </div>
  );
}
