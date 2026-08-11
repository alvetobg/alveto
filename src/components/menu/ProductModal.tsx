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
    const scrollbarWidth = window.innerWidth - root.clientWidth;
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

    const focusFrame = window.requestAnimationFrame(() => {
      closeButtonRef.current?.focus({ preventScroll: true });
    });

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
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", onKeyDown);
      root.style.overflow = previousRootOverflow;
      root.style.overscrollBehavior = previousRootOverscrollBehavior;
      body.style.overflow = previousBodyOverflow;
      body.style.overscrollBehavior = previousBodyOverscrollBehavior;
      body.style.paddingRight = previousBodyPaddingRight;
      body.style.position = previousBodyPosition;
      body.style.top = previousBodyTop;
      body.style.left = previousBodyLeft;
      body.style.width = previousBodyWidth;

      backgroundElements.forEach(({ element, inert, ariaHidden }) => {
        element.inert = inert;
        if (ariaHidden === null) {
          element.removeAttribute("aria-hidden");
        } else {
          element.setAttribute("aria-hidden", ariaHidden);
        }
      });

      if (previouslyFocused?.isConnected) {
        previouslyFocused.focus({ preventScroll: true });
      }

      window.scrollTo({
        left: scrollPosition.x,
        top: scrollPosition.y,
        behavior: "instant",
      });
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
          className="fixed inset-x-0 top-0 z-[90] box-border flex h-[100dvh] min-h-[100svh] items-end justify-center px-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-[calc(0.75rem+env(safe-area-inset-top))] md:items-center md:px-6 md:pb-[calc(1.5rem+env(safe-area-inset-bottom))] md:pt-[calc(1.5rem+env(safe-area-inset-top))]"
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Close product details"
            onClick={onClose}
            className="fixed inset-x-0 top-0 h-[100lvh] min-h-full bg-dark/80"
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            initial={reduceMotion ? false : { opacity: 0.98 }}
            animate={{ opacity: 1 }}
            exit={
              reduceMotion
                ? { opacity: 1 }
                : {
                    opacity: 0.98,
                    transition: {
                      duration: 0.15,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`relative z-10 flex min-h-0 max-h-[min(760px,calc(100svh-1.5rem))] w-full flex-col overflow-hidden rounded-[24px] border border-dark/10 bg-cream shadow-[0_24px_80px_rgba(34,34,34,0.24)] ${
              imageSource ? "max-w-5xl" : "max-w-xl"
            }`}
          >
            <div
              className={`min-h-0 flex-1 touch-pan-y overflow-y-auto overscroll-contain ${
                imageSource
                  ? "md:grid md:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]"
                  : ""
              }`}
            >
              {imageSource ? (
                <div className="relative h-[clamp(9rem,34svh,14rem)] shrink-0 overflow-hidden bg-[#ece5db] md:h-auto md:min-h-[430px]">
                  <Image
                    src={imageSource}
                    alt={product.imageAlt ?? product.name}
                    fill
                    quality={85}
                    sizes="(max-width: 767px) calc(100vw - 16px), 440px"
                    className="object-cover"
                  />
                </div>
              ) : null}

              <div
                className={`flex flex-col justify-between pr-16 md:min-h-full md:p-10 md:pr-16 ${
                  imageSource
                    ? "min-h-80 p-5"
                    : "min-h-full p-6 sm:p-8 sm:pr-20"
                }`}
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
                    className={`text-[15px] text-text sm:text-base sm:leading-8 ${
                      imageSource
                        ? "mt-3 leading-6 md:mt-5"
                        : "mt-4 leading-7 sm:mt-5"
                    }`}
                  >
                    {product.description}
                  </p>
                </div>

                <div
                  className={`border-t border-dark/12 md:mt-10 md:pt-6 ${
                    imageSource ? "mt-5 pt-4" : "mt-8 pt-5"
                  }`}
                >
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
