"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef } from "react";
import { getOptionalImageSource } from "@/lib/images";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    price: number;
    image?: string;
    badge?: string;
  } | null;
};

export default function ProductModal({
  open,
  onClose,
  product,
}: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalRootRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open || !product) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const modalRoot = modalRootRef.current;
    const backgroundElements = Array.from(document.body.children)
      .filter(
        (element): element is HTMLElement =>
          element instanceof HTMLElement && element !== modalRoot,
      )
      .map((element) => ({
        element,
        inert: element.inert,
        ariaHidden: element.getAttribute("aria-hidden"),
      }));

    backgroundElements.forEach(({ element }) => {
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    });

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (!focusableElements?.length) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!dialogRef.current?.contains(document.activeElement)) {
        event.preventDefault();
        firstElement.focus();
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;
      document.removeEventListener("keydown", onKeyDown);

      backgroundElements.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;

        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [onClose, open, product]);

  if (!product || typeof document === "undefined") return null;

  const imageSource = getOptionalImageSource(product.image);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          ref={modalRootRef}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.25 }}
          className="fixed inset-0 z-[90]"
        >
          <motion.button
            type="button"
            tabIndex={-1}
            aria-label="Close product details"
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-lg"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 0.96, y: 40 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.35,
              ease: "easeOut",
            }}
            className="fixed left-1/2 top-1/2 z-10 flex max-h-[calc(100dvh-1.5rem)] w-[calc(100%-1.5rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)] sm:max-h-[calc(100dvh-3rem)] sm:w-[calc(100%-3rem)] sm:rounded-[32px] md:rounded-[36px]"
          >
            <div className="min-h-0 overflow-y-auto overscroll-contain">
              {imageSource ? (
                <div className="group relative h-56 overflow-hidden sm:h-72 md:h-[420px]">
                  <Image
                    src={imageSource}
                    alt={product.name}
                    fill
                    quality={85}
                    sizes="(max-width: 639px) calc(100vw - 24px), (max-width: 767px) calc(100vw - 48px), 896px"
                    className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {product.badge && (
                    <span className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-2 text-[11px] font-bold uppercase tracking-[3px] text-primary backdrop-blur sm:left-8 sm:top-8 sm:px-5 sm:text-xs">
                      {product.badge}
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex h-56 items-center justify-center bg-gradient-to-br from-[#D9A066] to-[#8B5A2B] px-6 sm:h-72 md:h-[420px]">
                  <p className="text-center text-3xl font-bold text-white sm:text-4xl md:text-5xl">
                    {product.name}
                  </p>
                </div>
              )}

              <div className="p-6 sm:p-8 md:p-10">
                <h2
                  id={titleId}
                  className="pr-12 text-3xl font-extrabold text-dark sm:text-4xl md:pr-0 md:text-5xl"
                >
                  {product.name}
                </h2>

                <p
                  id={descriptionId}
                  className="mt-5 text-base leading-8 text-text sm:mt-6 sm:text-lg sm:leading-9"
                >
                  {product.description}
                </p>

                <div className="mt-8 flex flex-col gap-6 border-t border-neutral-200 pt-6 sm:mt-10 sm:pt-8 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[4px] text-neutral-400">
                      Your Selection
                    </p>

                    <h3 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">
                      {product.price.toLocaleString("sr-RS")} RSD
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={onClose}
                    className="rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-2xl motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-3 top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg backdrop-blur transition-all duration-300 hover:rotate-90 hover:bg-primary hover:text-white motion-reduce:transform-none motion-reduce:transition-none sm:right-5 sm:top-5 md:right-6 md:top-6"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
