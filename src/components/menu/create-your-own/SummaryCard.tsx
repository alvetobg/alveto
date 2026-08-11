"use client";

import { useId, useState } from "react";

import { CheckIcon } from "@/components/menu/MenuIcons";

type SummaryCardProps = Readonly<{
  title: string;
  base: string;
  sections: readonly {
    title: string;
    items: readonly string[];
  }[];
  total: number;
  requiredComplete: number;
  requiredTotal: number;
  onReset: () => void;
}>;

type CopyFeedback = {
  selection: string;
  status: "success" | "error";
};

export default function SummaryCard({
  title,
  base,
  sections,
  total,
  requiredComplete,
  requiredTotal,
  onReset,
}: SummaryCardProps) {
  const summaryTitleId = useId();
  const feedbackId = useId();
  const [copyFeedback, setCopyFeedback] = useState<CopyFeedback | null>(null);
  const ingredientCount = sections.reduce(
    (sum, section) => sum + section.items.length,
    0,
  );
  const selectionDetails = sections.flatMap((section) =>
    section.items.length > 0
      ? [`${section.title}: ${section.items.join(", ")}`]
      : [],
  );
  const selectionText = [
    `ALVETO - ${title}`,
    `Base: ${base || "Not selected"}`,
    ...(selectionDetails.length > 0
      ? selectionDetails
      : ["Ingredients: None selected"]),
    `Total: ${total.toLocaleString("sr-RS")} RSD`,
  ].join("\n");
  const currentFeedback =
    copyFeedback?.selection === selectionText ? copyFeedback.status : null;
  const selectionComplete =
    requiredTotal === 0 || requiredComplete === requiredTotal;

  const copySelection = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(selectionText);
      setCopyFeedback({ selection: selectionText, status: "success" });
    } catch {
      setCopyFeedback({ selection: selectionText, status: "error" });
    }
  };

  const resetSelection = () => {
    setCopyFeedback(null);
    onReset();
  };

  return (
    <aside
      aria-labelledby={summaryTitleId}
      className="overflow-hidden rounded-[20px] border border-dark/12 bg-white"
    >
      <div className="border-t-[3px] border-primary p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Your composition
        </p>
        <h4
          id={summaryTitleId}
          className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-dark"
        >
          {title}
        </h4>

        <div className="mt-5 flex items-end justify-between gap-4 border-t border-dark/10 pt-5">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/55">
              Selections
            </p>
            <p className="mt-1 text-xl font-semibold tabular-nums text-dark">
              {ingredientCount + (base ? 1 : 0)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/55">
              Total
            </p>
            <p className="mt-1 whitespace-nowrap text-[28px] font-bold tracking-[-0.035em] text-primary">
              {total.toLocaleString("sr-RS")} RSD
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6 border-t border-dark/10 bg-cream/45 p-5 sm:p-6">
        {requiredTotal > 0 ? (
          <div
            role="status"
            className={`flex items-center gap-2 text-sm font-semibold ${
              selectionComplete ? "text-dark" : "text-primary-hover"
            }`}
          >
            <span
              aria-hidden="true"
              className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                selectionComplete
                  ? "border-primary bg-primary text-dark"
                  : "border-primary bg-white text-transparent"
              }`}
            >
              <CheckIcon className="h-3.5 w-3.5" />
            </span>
            {selectionComplete
              ? "Required choices complete"
              : `${requiredComplete} of ${requiredTotal} required groups complete`}
          </div>
        ) : null}

        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/55">
            Base
          </p>
          <p className="rounded-[12px] border border-dark/10 bg-white px-4 py-3 text-sm font-semibold leading-5 text-dark">
            {base || "Choose your base"}
          </p>
        </div>

        {sections.map((section) =>
          section.items.length > 0 ? (
            <div key={section.title}>
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/55">
                {section.title}
              </p>
              <ul className="space-y-1.5">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 rounded-[10px] bg-white px-3.5 py-2.5 text-sm font-medium leading-5 text-dark"
                  >
                    <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-primary-hover" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null,
        )}

        {!base && ingredientCount === 0 ? (
          <p className="rounded-[14px] border border-dashed border-dark/18 bg-white px-4 py-5 text-sm leading-6 text-text">
            Start with the first required group. Your selections and total will
            stay visible here as you build.
          </p>
        ) : null}

        <div className="space-y-2.5 border-t border-dark/10 pt-5">
          <button
            type="button"
            onClick={copySelection}
            aria-describedby={feedbackId}
            className="min-h-12 w-full scroll-mb-[calc(5rem+env(safe-area-inset-bottom))] rounded-[14px] border border-primary bg-primary px-5 text-[15px] font-semibold text-dark transition-[background-color,border-color,transform] duration-150 hover:border-primary-hover hover:bg-primary-hover active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 motion-reduce:transform-none"
          >
            Copy selection
          </button>

          <p
            id={feedbackId}
            role="status"
            aria-live="polite"
            className={`min-h-5 text-center text-xs leading-5 ${
              currentFeedback === "error" ? "text-red-700" : "text-text"
            }`}
          >
            {currentFeedback === "success"
              ? "Selection copied. Paste it into a message when you are ready."
              : null}
            {currentFeedback === "error"
              ? "The selection could not be copied. Please try again."
              : null}
          </p>

          <button
            type="button"
            onClick={resetSelection}
            className="min-h-11 w-full scroll-mb-[calc(5rem+env(safe-area-inset-bottom))] rounded-[13px] border border-dark/14 bg-white px-5 text-sm font-semibold text-dark transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Reset selection
          </button>
        </div>
      </div>
    </aside>
  );
}
