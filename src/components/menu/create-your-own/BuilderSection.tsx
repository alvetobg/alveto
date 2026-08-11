"use client";

import { CheckIcon, ChevronDownIcon } from "@/components/menu/MenuIcons";

type BuilderSectionProps = Readonly<{
  id: string;
  step: number;
  title: string;
  subtitle?: string;
  open: boolean;
  children: React.ReactNode;
  onToggle: () => void;
  selectedCount?: number;
  limit?: number;
  required?: boolean;
  complete?: boolean;
}>;

export default function BuilderSection({
  id,
  step,
  title,
  subtitle,
  open,
  children,
  onToggle,
  selectedCount = 0,
  limit,
  required = false,
  complete = false,
}: BuilderSectionProps) {
  const contentId = `${id}-options`;

  return (
    <section className="overflow-hidden rounded-[18px] border border-dark/12 bg-white">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={onToggle}
        className="flex min-h-[84px] w-full items-center justify-between gap-4 p-5 text-left transition-colors duration-150 hover:bg-[#fffdf9] sm:p-6"
      >
        <span className="flex min-w-0 items-start gap-3.5">
          <span className="mt-0.5 text-[11px] font-semibold tabular-nums tracking-[0.16em] text-primary">
            {String(step).padStart(2, "0")}
          </span>
          <span className="min-w-0">
            <span className="block text-xl font-semibold leading-tight tracking-[-0.025em] text-dark">
              {title}
            </span>
            {subtitle ? (
              <span className="mt-1 block text-xs leading-5 text-text">
                {subtitle}
              </span>
            ) : null}
          </span>
        </span>

        <span className="flex shrink-0 items-center gap-2.5">
          {complete ? (
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-dark">
              <CheckIcon className="h-4 w-4" />
              <span className="sr-only">Required selection complete</span>
            </span>
          ) : null}
          {typeof limit === "number" ? (
            <span className="min-w-12 rounded-full border border-dark/10 bg-cream px-2.5 py-1 text-center text-xs font-semibold tabular-nums text-dark/70">
              {selectedCount}/{limit}
            </span>
          ) : null}
          <ChevronDownIcon
            className={`h-5 w-5 text-dark transition-transform duration-[180ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
          />
        </span>
      </button>

      {open ? (
        <div
          id={contentId}
          className="space-y-2.5 border-t border-dark/10 bg-cream/45 p-3 sm:p-4"
        >
          {required ? (
            <p className="sr-only">This group requires a selection.</p>
          ) : null}
          {children}
        </div>
      ) : null}
    </section>
  );
}
