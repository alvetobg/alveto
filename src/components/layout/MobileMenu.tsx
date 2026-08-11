"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import type { RefObject } from "react";
import { createPortal } from "react-dom";

import Button from "@/components/ui/Button";
import type { PublicReservationSettings } from "@/features/reservations/types";
import {
  formatAddress,
  groupBusinessHours,
} from "@/features/site-settings/presentation";
import type { BusinessHoursGroup } from "@/features/site-settings/presentation";
import type { PublicSiteSettings } from "@/features/site-settings/types";

type MobileMenuProps = Readonly<{
  appearance?: "classic" | "atelier";
  open: boolean;
  onClose: () => void;
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

const classicLinks = [
  { href: "/#experience", label: "Experience" },
  { href: "/menu", label: "Menu" },
] as const;

const atelierLinks = [
  { href: "/", label: "Home", number: "01" },
  { href: "/#experience", label: "Experience", number: "02" },
  { href: "/menu", label: "Menu", number: "03" },
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
  const menuSessionCleanupRef = useRef<(() => void) | null>(null);
  const exitPendingRef = useRef(false);
  const reduceMotion = useReducedMotion();
  const isAtelier = appearance === "atelier";
  const address = formatAddress(siteSettings);
  const hours = groupBusinessHours(siteSettings);

  useEffect(() => {
    if (!open) return;

    if (menuSessionCleanupRef.current) {
      exitPendingRef.current = false;
      closeButtonRef.current?.focus();

      return () => {
        if (isAtelier) {
          exitPendingRef.current = true;
        } else {
          menuSessionCleanupRef.current?.();
        }
      };
    }

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    const breakpointQuery = window.matchMedia(
      isAtelier ? "(min-width: 1024px)" : "(min-width: 768px)",
    );

    document.body.style.overflow = "hidden";
    if (isAtelier) {
      document.documentElement.style.overflow = "hidden";
    }
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

    const cleanupMenuSession = () => {
      document.body.style.overflow = previousOverflow;
      if (isAtelier) {
        document.documentElement.style.overflow = previousRootOverflow;
      }
      document.removeEventListener("keydown", handleKeyDown);
      breakpointQuery.removeEventListener("change", handleBreakpointChange);
      previouslyFocused?.focus();
      exitPendingRef.current = false;
      menuSessionCleanupRef.current = null;
    };

    menuSessionCleanupRef.current = cleanupMenuSession;

    return () => {
      if (isAtelier) {
        exitPendingRef.current = true;
      } else {
        cleanupMenuSession();
      }
    };
  }, [isAtelier, onClose, open]);

  useEffect(
    () => () => {
      menuSessionCleanupRef.current?.();
    },
    [],
  );

  if (typeof document === "undefined") {
    return null;
  }

  const portalTarget = isAtelier
    ? document.querySelector<HTMLElement>(".homepage-v2") ?? document.body
    : document.body;

  return createPortal(
    <AnimatePresence
      onExitComplete={() => {
        if (isAtelier && exitPendingRef.current) {
          menuSessionCleanupRef.current?.();
        }
      }}
    >
      {open ? (
        <motion.div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : isAtelier ? 0.2 : 0.22,
          }}
          className={
            "fixed inset-0 z-[60] " + (isAtelier ? "lg:hidden" : "md:hidden")
          }
        >
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={onClose}
            className={
              "absolute inset-0 backdrop-blur-sm " +
              (isAtelier ? "bg-black/62" : "bg-black/58")
            }
          />

          <motion.div
            ref={panelRef}
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? { x: 0 } : { x: "100%" }}
            transition={{
              duration: reduceMotion ? 0 : isAtelier ? 0.34 : 0.35,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              paddingTop: isAtelier
                ? "max(1.25rem, env(safe-area-inset-top))"
                : "max(1.5rem, env(safe-area-inset-top))",
              paddingBottom: isAtelier
                ? "max(1.5rem, env(safe-area-inset-bottom))"
                : "max(2rem, env(safe-area-inset-bottom))",
            }}
            className={
              "absolute inset-y-0 right-0 flex max-w-full flex-col overflow-y-auto overscroll-contain shadow-[-20px_0_60px_rgba(0,0,0,0.2)] " +
              (isAtelier
                ? "w-full bg-[var(--atelier-ink-deep)] px-6 text-[var(--atelier-ivory)] sm:w-[min(94vw,460px)] sm:px-8"
                : "w-[min(88vw,380px)] bg-cream px-7")
            }
          >
            {isAtelier ? (
              <AtelierMenuContent
                address={address}
                closeButtonRef={closeButtonRef}
                hours={hours}
                onClose={onClose}
                pathname={pathname}
                reservationSettings={reservationSettings}
                siteSettings={siteSettings}
              />
            ) : (
              <ClassicMenuContent
                address={address}
                closeButtonRef={closeButtonRef}
                onClose={onClose}
                pathname={pathname}
                reservationSettings={reservationSettings}
                siteSettings={siteSettings}
              />
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    portalTarget,
  );
}

type SharedMenuContentProps = Readonly<{
  address: string;
  closeButtonRef: RefObject<HTMLButtonElement | null>;
  onClose: () => void;
  pathname: string;
  reservationSettings: PublicReservationSettings | null;
  siteSettings: PublicSiteSettings;
}>;

function AtelierMenuContent({
  address,
  closeButtonRef,
  hours,
  onClose,
  pathname,
  reservationSettings,
  siteSettings,
}: SharedMenuContentProps & Readonly<{ hours: BusinessHoursGroup[] }>) {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-1 bg-[var(--atelier-coral)]"
      />

      <div className="relative flex items-center justify-between border-b border-white/14 pb-5">
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
            width={148}
            height={36}
            sizes="148px"
            className="h-auto w-[148px]"
          />
        </Link>

        <button
          ref={closeButtonRef}
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-white/24 bg-white/[0.04] text-2xl text-[var(--atelier-ivory)] transition-colors hover:border-[var(--atelier-coral)] hover:text-[var(--atelier-coral)]"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>

      <nav aria-label="Mobile navigation" className="relative mt-7">
        <ul className="divide-y divide-white/12 border-y border-white/12">
          {atelierLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={
                  (link.href === "/" && pathname === "/") ||
                  (link.href === "/menu" && pathname === "/menu")
                    ? "page"
                    : undefined
                }
                onClick={onClose}
                className="group grid min-h-[4.75rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 text-[var(--atelier-ivory)]"
              >
                <span
                  aria-hidden="true"
                  className="text-[0.62rem] font-semibold tracking-[0.2em] text-[var(--atelier-coral)]"
                >
                  {link.number}
                </span>
                <span className="font-[family-name:var(--font-display)] text-[clamp(2.15rem,10vw,3.25rem)] font-medium leading-none tracking-[-0.055em]">
                  {link.label}
                </span>
                <span
                  aria-hidden="true"
                  className="text-lg text-[var(--atelier-ivory)]/46 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transform-none"
                >
                  ↗
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <p className="relative mt-7 border-l border-[var(--atelier-coral)] pl-5 text-sm leading-7 text-[var(--atelier-ivory)]/66">
        {siteSettings.shortBrandDescription}
      </p>

      <div className="relative mt-auto pt-8">
        <div className="grid grid-cols-2 gap-5 border-t border-white/14 pt-6">
          <section className="min-w-0">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/58">
              Visit
            </h2>
            {address ? (
              siteSettings.googleMapsUrl ? (
                <a
                  href={siteSettings.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block break-words text-xs leading-6 text-[var(--atelier-ivory)]/76 transition-colors hover:text-[var(--atelier-coral)]"
                >
                  {address}
                </a>
              ) : (
                <p className="mt-3 break-words text-xs leading-6 text-[var(--atelier-ivory)]/76">
                  {address}
                </p>
              )
            ) : null}
          </section>

          <section className="min-w-0">
            <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--atelier-ivory)]/58">
              Hours
            </h2>
            <div className="mt-3 space-y-2 text-xs leading-5 text-[var(--atelier-ivory)]/76">
              {hours.slice(0, 2).map((group) => (
                <p key={group.days + "-" + group.hours}>
                  <span className="block">{group.days}</span>
                  <span className="block">{group.hours}</span>
                </p>
              ))}
            </div>
          </section>
        </div>

        {reservationSettings?.reservationsEnabled &&
        reservationSettings.reservationUrl ? (
          <Button
            href={reservationSettings.reservationUrl}
            variant="atelier"
            className="mt-6 min-h-12 w-full rounded-full px-7"
          >
            {reservationSettings.primaryCtaLabel}
          </Button>
        ) : null}

        {siteSettings.socialLinks.length > 0 ? (
          <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2">
            {siteSettings.socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--atelier-ivory)]/58 transition-colors hover:text-[var(--atelier-coral)]"
              >
                {link.platform}
              </a>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
}

function ClassicMenuContent({
  address,
  closeButtonRef,
  onClose,
  pathname,
  reservationSettings,
  siteSettings,
}: SharedMenuContentProps) {
  return (
    <>
      <div className="flex items-center justify-between border-b border-black/10 pb-6">
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
          {classicLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={
                  link.href === "/menu" && pathname === "/menu"
                    ? "page"
                    : undefined
                }
                onClick={onClose}
                className="block rounded-2xl px-4 py-4 text-2xl font-bold tracking-tight text-dark transition-colors hover:bg-white hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto border-t border-black/10 pt-6">
        {reservationSettings?.reservationsEnabled &&
        reservationSettings.reservationUrl ? (
          <Button
            href={reservationSettings.reservationUrl}
            variant="primary"
            className="w-full py-4"
          >
            {reservationSettings.primaryCtaLabel}
          </Button>
        ) : null}

        {address ? (
          <p className="mt-5 text-center text-sm leading-6 text-text">
            {address}
          </p>
        ) : null}
      </div>
    </>
  );
}
