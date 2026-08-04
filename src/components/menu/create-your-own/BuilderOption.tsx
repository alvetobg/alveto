"use client";

type BuilderOptionProps = {
  name: string;
  description?: string | null;
  price: number;
  selected: boolean;
  disabled?: boolean;
  onClick: () => void;
};

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
      disabled={disabled}
      onClick={onClick}
      className={`group flex w-full items-center justify-between rounded-2xl border p-5 transition-all duration-300 motion-reduce:transform-none motion-reduce:transition-none ${
        disabled
          ? "cursor-not-allowed border-neutral-200 bg-neutral-100 opacity-40"
          : selected
          ? "border-primary bg-primary/5 shadow-lg ring-2 ring-primary/20"
          : "border-neutral-200 bg-white hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-4">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
            selected
              ? "border-primary bg-primary text-white"
              : "border-neutral-300 text-transparent group-hover:border-primary"
          }`}
        >
          ✓
        </div>

        <div>
          <h5
            className={`text-left text-base font-semibold ${
              selected ? "text-primary" : "text-dark"
            }`}
          >
            {name}
          </h5>

          <p className="mt-1 text-sm text-neutral-500">
            {description || "Premium ingredient"}
          </p>
        </div>
      </div>

      <div
        className={`rounded-full px-4 py-2 text-sm font-bold transition ${
          selected
            ? "bg-primary text-white"
            : "bg-neutral-100 text-neutral-700"
        }`}
      >
        +{price.toLocaleString("sr-RS")} RSD
      </div>
    </button>
  );
}
