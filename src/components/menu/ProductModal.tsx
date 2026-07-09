"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type ProductModalProps = {
  open: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    price: number;
    image: string;
    badge?: string;
  } | null;
};

export default function ProductModal({
  open,
  onClose,
  product,
}: ProductModalProps) {
  if (!product) return null;

  const hasImage =
    !!product.image && product.image.trim().length > 0;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            onClick={onClose}
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 40 }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            className="fixed left-1/2 top-1/2 z-[100] max-h-[92vh] w-[94%] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[40px] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
          >
            {/* IMAGE */}

            {hasImage ? (
              <div className="relative h-[420px] overflow-hidden">

                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {product.badge && (
                  <span className="absolute left-8 top-8 rounded-full bg-white/90 px-5 py-2 text-xs font-bold uppercase tracking-[3px] text-primary backdrop-blur">
                    {product.badge}
                  </span>
                )}

              </div>
            ) : (
              <div className="flex h-[420px] items-center justify-center bg-gradient-to-br from-[#D9A066] to-[#8B5A2B]">

                <h2 className="text-center text-5xl font-bold text-white">
                  {product.name}
                </h2>

              </div>
            )}

            {/* CONTENT */}

            <div className="p-10">

              <h2 className="text-5xl font-extrabold text-dark">
                {product.name}
              </h2>

              <p className="mt-6 text-lg leading-9 text-text">
                {product.description}
              </p>

              <div className="mt-10 flex flex-col gap-6 border-t border-neutral-200 pt-8 md:flex-row md:items-center md:justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[4px] text-neutral-400">
                    Price
                  </p>

                  <h3 className="mt-2 text-4xl font-extrabold text-primary">
                    {product.price.toLocaleString("sr-RS")} RSD
                  </h3>

                </div>

                <button
                  onClick={onClose}
                  className="rounded-2xl bg-primary px-8 py-4 text-lg font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  Close
                </button>

              </div>

            </div>

            {/* CLOSE ICON */}

            <button
              onClick={onClose}
              className="absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-2xl shadow-lg backdrop-blur transition hover:rotate-90"
            >
              ✕
            </button>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}