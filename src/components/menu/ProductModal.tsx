"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, useId, useRef } from "react";

import { CloseIcon } from "@/components/menu/MenuIcons";
import { getOptionalImageSource } from "@/lib/images";

type ProductModalProps = Readonly<{
  open: boolean;
  onClose: () => void;
  onExited: () => void;
  product: {
    name: string;
    description: string;
    price: number;
    image?: string;
    imageAlt?: string;
  } | null;
}>;

export default function ProductModal({
  open,
  onClose,
  onExited,
  product,
}: ProductModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const modalRootRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!product) return;

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
  }, [onClose, product]);

  if (!product || typeof document === "undefined") return null;

  const imageSource = getOptionalImageSource(product.image);

  return createPortal(
    <AnimatePresence onExitComplete={onExited}>
      {open ? (
        <motion.div
          ref={modalRootRef}
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="fixed inset-0 z-[90] flex items-end justify-center p-1 sm:p-3 md:items-center md:p-6"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close product details"
            onClick={onClose}
            className="absolute inset-0 bg-dark/72"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0.98, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              reduceMotion
                ? { opacity: 1, y: 0 }
                : {
                    opacity: 0.98,
                    y: 8,
                    transition: {
                      duration: 0.18,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.24,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative z-10 max-h-[calc(100dvh-0.25rem)] w-full overflow-hidden rounded-t-[24px] border border-dark/10 bg-cream shadow-[0_24px_80px_rgba(34,34,34,0.24)] sm:max-h-[calc(100dvh-1.5rem)] sm:rounded-[24px] md:max-h-[min(760px,calc(100dvh-3rem))] ${
              imageSource ? "max-w-5xl" : "max-w-xl"
            }`}
          >
            <div
              className={`min-h-0 overflow-y-auto overscroll-contain ${
                imageSource
                  ? "md:grid md:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]"
                  : ""
              }`}
            >
              {imageSource ? (
                <div className="relative aspect-[3/2] overflow-hidden bg-[#ece5db] md:aspect-auto md:min-h-[430px]">
                  <Image
                    src={imageSource}
                    alt={product.imageAlt ?? product.name}
                    fill
                    quality={85}
                    sizes="(max-width: 767px) calc(100vw - 8px), 440px"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div
                className="flex min-h-full flex-col justify-between p-6 pr-16 sm:p-8 sm:pr-20 md:p-10 md:pr-16"
                style={{
                  paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
                }}
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                    Menu details
                  </p>
                  <h2
                    id={titleId}
                    className="mt-3 text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] text-dark sm:text-4xl md:text-[42px]"
                  >
                    {product.name}
                  </h2>
                  <p
                    id={descriptionId}
                    className="mt-4 text-[15px] leading-7 text-text sm:mt-5 sm:text-base sm:leading-8"
                  >
                    {product.description}
                  </p>
                </div>

                <div className="mt-8 border-t border-dark/12 pt-5 md:mt-10 md:pt-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-dark/55">
                    Price
                  </p>
                  <p className="mt-2 whitespace-nowrap text-3xl font-bold tracking-[-0.035em] text-primary md:text-4xl">
                    {product.price.toLocaleString("sr-RS")} RSD
                  </p>
                </div>
              </div>
            </div>

            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-20 flex h-11 w-11 items-center justify-center rounded-[13px] border border-dark/12 bg-cream text-dark transition-[color,border-color,background-color] duration-150 hover:border-primary hover:text-primary sm:right-4 sm:top-4"
            >
              <CloseIcon />
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
