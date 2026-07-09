"use client";

type BuilderSectionProps = {
  title: string;
  subtitle?: string;
  open: boolean;
  children: React.ReactNode;
  onToggle: () => void;
  selectedCount?: number;
  limit?: number;
};

export default function BuilderSection({
  title,
  subtitle,
  open,
  children,
  onToggle,
  selectedCount = 0,
  limit,
}: BuilderSectionProps) {
  return (
    <section className="overflow-hidden rounded-[28px] border border-neutral-200 bg-white shadow-sm">

      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between p-7 text-left transition hover:bg-neutral-50"
      >
        <div>

          <h2 className="text-2xl font-bold">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-1 text-sm text-neutral-500">
              {subtitle}
            </p>
          )}

        </div>

        <div className="flex items-center gap-4">

          {limit && (
            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
              {selectedCount}/{limit}
            </span>
          )}

          <span
            className={`text-3xl transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          >
            ⌃
          </span>

        </div>

      </button>

      {open && (
        <div className="space-y-3 border-t border-neutral-200 p-6">
          {children}
        </div>
      )}

    </section>
  );
}