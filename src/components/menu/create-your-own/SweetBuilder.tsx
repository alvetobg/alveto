"use client";

import { useMemo, useState } from "react";
import { menu } from "@/data/menu";

import BuilderSection from "./BuilderSection";
import BuilderOption from "./BuilderOption";
import SummaryCard from "./SummaryCard";

type SweetBuilderProps = {
  onBack: () => void;
};

export default function SweetBuilder({
  onBack,
}: SweetBuilderProps) {
  const sweetMenu = useMemo(() => {
    return menu.find(
      (section) => section.id === "create-your-own"
    );
  }, []);

  if (!sweetMenu) return null;

  const groups = useMemo(() => {
    const map = new Map<
      string,
      typeof sweetMenu.products
    >();

    sweetMenu.products
      .filter(
        (item) =>
          ![
            "Cheese",
            "Meat",
            "Vegetables",
            "Sauces",
            "Extras",
          ].includes(item.description)
      )
      .forEach((item) => {
        if (!map.has(item.description)) {
          map.set(item.description, []);
        }

        map.get(item.description)!.push(item);
      });

    return [...map.entries()].map(([title, items]) => ({
      title,
      items,
    }));
  }, [sweetMenu]);

  const baseSection =
    groups.find((g) => g.title === "Base") || null;

  const otherSections = groups.filter(
    (g) => g.title !== "Base"
  );

  const [openSection, setOpenSection] =
    useState("Base");

  const [base, setBase] = useState("");

  const [selected, setSelected] =
    useState<string[]>([]);

  const limits: Record<string, number> = {
    "Cream & Chocolate": 2,
    "Fresh Fruit": 3,
    "Fruit Filling": 2,
    Topping: 4,
    "Ice Cream": 2,
    Sorbet: 1,
  };

  const toggle = (
    sectionTitle: string,
    name: string
  ) => {
    const limit = limits[sectionTitle];

    setSelected((prev) => {
      const exists = prev.includes(name);

      if (exists) {
        return prev.filter((i) => i !== name);
      }

      const count =
        otherSections
          .find(
            (section) =>
              section.title === sectionTitle
          )
          ?.items.filter((item) =>
            prev.includes(item.name)
          ).length ?? 0;

      if (limit && count >= limit) {
        return prev;
      }

      return [...prev, name];
    });

    const currentIndex = otherSections.findIndex(
      (section) => section.title === sectionTitle
    );

    if (currentIndex !== -1) {
      const next = otherSections[currentIndex + 1];

      if (next) {
        setOpenSection(next.title);
      }
    }
  };

  const reset = () => {
    setBase("");
    setSelected([]);
    setOpenSection("Base");
  };

  const baseItem =
    baseSection?.items.find(
      (item) => item.name === base
    ) || null;

  const total = useMemo(() => {
    let sum = baseItem?.price ?? 0;

    otherSections.forEach((section) => {
      section.items.forEach((item) => {
        if (selected.includes(item.name)) {
          sum += item.price;
        }
      });
    });

    return sum;
  }, [baseItem, selected, otherSections]);

  const summary = otherSections
    .map((section) => ({
      title: section.title,
      items: section.items
        .filter((item) =>
          selected.includes(item.name)
        )
        .map((item) => item.name),
    }))
    .filter(
      (section) => section.items.length > 0
    );
      return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex flex-wrap items-center justify-between gap-4">

        <button
          onClick={onBack}
          className="rounded-2xl border border-neutral-300 bg-white px-6 py-3 font-semibold transition hover:bg-neutral-100"
        >
          ← Back
        </button>

        <div>
          <h1 className="text-3xl font-bold">
            🍓 Sweet Builder
          </h1>

          <p className="mt-1 text-neutral-500">
            Build your perfect dessert.
          </p>
        </div>

      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">

        {/* LEFT */}

        <div className="space-y-6">

          {baseSection && (
            <BuilderSection
              title="Base"
              subtitle="Choose one"
              open={openSection === "Base"}
              onToggle={() => setOpenSection("Base")}
            >
              {baseSection.items.map((item) => (
                <BuilderOption
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  selected={base === item.name}
                  onClick={() => {
                    setBase(item.name);

                    if (otherSections.length > 0) {
                      setOpenSection(otherSections[0].title);
                    }
                  }}
                />
              ))}
            </BuilderSection>
          )}

          {otherSections.map((section) => {

            const selectedCount = section.items.filter((item) =>
              selected.includes(item.name)
            ).length;

            return (
              <BuilderSection
                key={section.title}
                title={section.title}
                subtitle={`Choose up to ${
                  limits[section.title] ??
                  section.items.length
                }`}
                open={openSection === section.title}
                onToggle={() =>
                  setOpenSection(section.title)
                }
                selectedCount={selectedCount}
                limit={limits[section.title]}
              >
                {section.items.map((item) => (
                  <BuilderOption
                    key={item.name}
                    name={item.name}
                    price={item.price}
                    selected={selected.includes(item.name)}
                    disabled={
                      !!limits[section.title] &&
                      selectedCount >=
                        limits[section.title] &&
                      !selected.includes(item.name)
                    }
                    onClick={() =>
                      toggle(section.title, item.name)
                    }
                  />
                ))}
              </BuilderSection>
            );
          })}

        </div>

        {/* RIGHT */}

        <div className="lg:sticky lg:top-28 lg:self-start">
          <SummaryCard
            title="Sweet Builder"
            base={base}
            sections={summary}
            total={total}
            onReset={reset}
          />
        </div>

      </div>

    </section>
  );
}