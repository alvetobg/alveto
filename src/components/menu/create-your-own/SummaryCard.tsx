type SummaryCardProps = {
  title: string;
  base: string;
  sections: {
    title: string;
    items: string[];
  }[];
  total: number;
  onReset: () => void;
};

export default function SummaryCard({
  title,
  base,
  sections,
  total,
  onReset,
}: SummaryCardProps) {
  const ingredientCount = sections.reduce(
    (sum, section) => sum + section.items.length,
    0
  );

  return (
    <aside className="overflow-hidden rounded-[36px] border border-neutral-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
      {/* Header */}

      <div className="border-b border-neutral-200 bg-gradient-to-r from-primary to-[#d79b5c] p-8 text-white">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
          CREATE YOUR OWN
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {title}
        </h2>

        <div className="mt-8 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[3px] text-white/70">
              Ingredients
            </p>

            <p className="mt-2 text-4xl font-extrabold">
              {ingredientCount}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs uppercase tracking-[3px] text-white/70">
              Total
            </p>

            <p className="mt-2 text-4xl font-extrabold">
              {total.toLocaleString("sr-RS")} RSD
            </p>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="space-y-8 p-8">
        {/* Base */}

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-neutral-400">
            Base
          </p>

          <div className="rounded-2xl border border-primary/15 bg-primary/10 px-5 py-4 font-semibold text-primary">
            {base || "Choose your base"}
          </div>
        </div>

        {/* Selected Ingredients */}

        {sections.map(
          (section) =>
            section.items.length > 0 && (
              <div key={section.title}>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-neutral-400">
                  {section.title}
                </p>

                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl bg-neutral-50 px-4 py-3 transition-colors hover:bg-primary/5"
                    >
                      <span className="text-primary">✓</span>

                      <span className="font-medium text-dark">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )
        )}

        {/* Empty */}

        {!base && ingredientCount === 0 && (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
            <div className="text-5xl">🍽️</div>

            <p className="mt-4 text-lg font-semibold">
              Start Building
            </p>

            <p className="mt-2 text-sm leading-7 text-neutral-500">
              Select your base and add your favorite ingredients to create your perfect meal.
            </p>
          </div>
        )}

        {/* Total */}

        <div className="rounded-3xl bg-neutral-100 p-6">
          <p className="text-sm uppercase tracking-[3px] text-neutral-500">
            Final Price
          </p>

          <div className="mt-3 flex items-end justify-between">
            <span className="text-lg font-semibold text-dark">
              Total
            </span>

            <span className="text-5xl font-black tracking-tight text-primary">
              {total.toLocaleString("sr-RS")}
            </span>
          </div>

          <p className="mt-1 text-right text-sm text-neutral-500">
            RSD
          </p>
        </div>

        {/* Buttons */}

        <div className="space-y-3">
          <button className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-2xl">
            Save Selection
          </button>

          <button
            onClick={onReset}
            className="w-full rounded-2xl border border-neutral-300 py-4 font-semibold transition-colors hover:bg-neutral-100"
          >
            Reset Selection
          </button>
        </div>
      </div>
    </aside>
  );
}