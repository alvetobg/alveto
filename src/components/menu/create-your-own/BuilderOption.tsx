"use client";

import { CheckIcon } from "@/components/menu/MenuIcons";

type BuilderOptionProps = Readonly<{
  name: string;
  description?: string | null;
  price: number;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
}>;

export default function BuilderOption({
  name,
  description,
  price,
  selected,
  disabled = false,
  onClick,
}: BuilderOptionProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      disabled={disabled}
      onClick={onClick}
      className={`group grid min-h-[72px] w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-[14px] border p-3.5 text-left transition-[color,border-color,background-color,transform] duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transform-none motion-reduce:transition-none sm:p-4 ${
        disabled
          ? "cursor-not-allowed border-dark/8 bg-dark/[0.035] text-dark/55"
          : selected
            ? "border-primary bg-primary/10 text-dark"
            : "border-dark/10 bg-white text-dark hover:border-primary active:translate-y-px"
      }`}
    >
      <span className="flex min-w-0 items-start gap-3">
        <span
          aria-hidden="true"
          className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-[color,border-color,background-color] duration-[180ms] ${
            selected
              ? "border-primary bg-primary text-dark"
              : "border-dark/25 bg-white text-transparent group-hover:border-primary"
          }`}
        >
          <CheckIcon className="h-3.5 w-3.5" />
        </span>

        <span className="min-w-0">
          <span className="block break-words text-[15px] font-semibold leading-5">
            {name}
          </span>
          {description ? (
            <span className="mt-1 block break-words text-xs leading-5 text-text">
              {description}
            </span>
          ) : null}
          {selected ? (
            <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-hover">
              Selected
            </span>
          ) : null}
        </span>
      </span>

      <span className="whitespace-nowrap rounded-full border border-dark/10 bg-cream px-2.5 py-1.5 text-xs font-bold tabular-nums text-dark">
        +{price.toLocaleString("sr-RS")} RSD
      </span>
    </button>
  );
}
