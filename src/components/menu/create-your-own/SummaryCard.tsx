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
    <aside className="sticky top-28 overflow-hidden rounded-[36px] border border-neutral-200 bg-white shadow-2xl">

      {/* HEADER */}

      <div className="bg-gradient-to-r from-primary to-[#d79b5c] p-8 text-white">

        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/80">
          Create Your Own
        </p>

        <h2 className="mt-3 text-3xl font-bold">
          {title}
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-4">

          <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[2px] text-white/70">
              Ingredients
            </p>

            <p className="mt-2 text-4xl font-bold">
              {ingredientCount}
            </p>
          </div>

          <div className="rounded-2xl bg-white/15 p-5 backdrop-blur">
            <p className="text-xs uppercase tracking-[2px] text-white/70">
              Total
            </p>

            <p className="mt-2 text-3xl font-bold">
              {total.toLocaleString("sr-RS")} RSD
            </p>
          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="space-y-8 p-8">

        <div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-neutral-400">
            Base
          </p>

          <div className="inline-flex rounded-full bg-primary/10 px-5 py-2 font-semibold text-primary">
            {base || "Choose your base"}
          </div>

        </div>

        {sections.map(
          (section) =>
            section.items.length > 0 && (
              <div key={section.title}>

                <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-neutral-400">
                  {section.title}
                </p>

                <div className="flex flex-wrap gap-2">
                  {section.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary transition hover:bg-primary hover:text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>

              </div>
            )
        )}

        {!base && ingredientCount === 0 && (
          <div className="rounded-3xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">

            <div className="text-5xl">
              🍽️
            </div>

            <p className="mt-4 font-semibold">
              Start building your creation
            </p>

            <p className="mt-2 text-sm text-neutral-500">
              Choose your base and customize it with your favorite ingredients.
            </p>

          </div>
        )}

        <div className="rounded-2xl bg-neutral-100 px-6 py-5">

          <div className="flex items-center justify-between">

            <span className="text-lg font-semibold">
              Total
            </span>

            <span className="text-4xl font-extrabold text-primary">
              {total.toLocaleString("sr-RS")} RSD
            </span>

          </div>

        </div>

        <button
          className="w-full rounded-2xl bg-primary py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Save Selection
        </button>

        <button
          onClick={onReset}
          className="w-full rounded-2xl border border-neutral-300 py-4 font-semibold transition hover:bg-neutral-100"
        >
          ↺ Reset Selection
        </button>

      </div>

    </aside>
  );
}