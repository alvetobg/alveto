"use client";

import { useState } from "react";
import { menu, type MenuProduct } from "@/data/menu";

import BuilderSection from "./BuilderSection";
import BuilderOption from "./BuilderOption";
import SummaryCard from "./SummaryCard";

type SavoryBuilderProps = {
  onBack: () => void;
};

const createYourOwnMenu = menu.find(
  (section) => section.id === "create-your-own"
);

const savoryGroups = (() => {
  const groups = new Map<string, MenuProduct[]>();

  createYourOwnMenu?.products
    .filter((item) =>
      [
        "Base",
        "Cheese",
        "Meat",
        "Vegetables",
        "Sauces",
        "Extras",
      ].includes(item.description)
    )
    .forEach((item) => {
      if (!groups.has(item.description)) {
        groups.set(item.description, []);
      }

      groups.get(item.description)!.push(item);
    });

  return [...groups.entries()].map(([title, items]) => ({
    title,
    items:
      title === "Base"
        ? items.filter(
            (item) =>
              item.name !== "Mini Pancakes" &&
              item.name !== "American Pancakes"
          )
        : items,
  }));
})();

const savoryBaseSection =
  savoryGroups.find((group) => group.title === "Base") ?? null;
const savoryOtherSections = savoryGroups.filter(
  (group) => group.title !== "Base"
);

const limits: Record<string, number> = {
  Cheese: 2,
  Meat: 2,
  Vegetables: 4,
  Sauces: 2,
  Extras: 2,
};

export default function SavoryBuilder({
  onBack,
}: SavoryBuilderProps) {
  const [openSection, setOpenSection] =
    useState("Base");

  const [base, setBase] = useState("");

  const [selected, setSelected] =
    useState<string[]>([]);

  if (!createYourOwnMenu) return null;

  const toggle = (
    sectionTitle: string,
    name: string
  ) => {
    const limit = limits[sectionTitle];

    setSelected((prev) => {
      const already = prev.includes(name);

      if (already) {
        return prev.filter((i) => i !== name);
      }

      const count =
        savoryOtherSections
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
  };

  const reset = () => {
    setBase("");
    setSelected([]);
    setOpenSection("Base");
  };

  const baseItem =
    savoryBaseSection?.items.find(
      (item) => item.name === base
    ) || null;

  let total = baseItem?.price ?? 0;

  savoryOtherSections.forEach((section) => {
    section.items.forEach((item) => {
      if (selected.includes(item.name)) {
        total += item.price;
      }
    });
  });

  const summary = savoryOtherSections
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
    <section className="space-y-10">

      <button
        onClick={onBack}
        className="rounded-2xl border px-6 py-3 font-semibold transition hover:bg-neutral-100"
      >
        ← Back
      </button>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

        <div className="space-y-6">

          {savoryBaseSection && (
            <BuilderSection
              title="Base"
              subtitle="Choose one"
              open={openSection === "Base"}
              onToggle={() => setOpenSection("Base")}
            >
              {savoryBaseSection.items.map((item) => (
                <BuilderOption
                  key={item.name}
                  name={item.name}
                  price={item.price}
                  selected={base === item.name}
                  onClick={() => setBase(item.name)}
                />
              ))}
            </BuilderSection>
          )}

          {savoryOtherSections.map((section) => (
            <BuilderSection
              key={section.title}
              title={section.title}
              subtitle={`Choose up to ${
                limits[section.title] ?? section.items.length
              }`}
              open={openSection === section.title}
              onToggle={() =>
                setOpenSection(section.title)
              }
              selectedCount={
                section.items.filter((item) =>
                  selected.includes(item.name)
                ).length
              }
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
                    section.items.filter((i) =>
                      selected.includes(i.name)
                    ).length >= limits[section.title] &&
                    !selected.includes(item.name)
                  }
                  onClick={() =>
                    toggle(section.title, item.name)
                  }
                />
              ))}
            </BuilderSection>
          ))}

        </div>

        <SummaryCard
          title="Savory Builder"
          base={base}
          sections={summary}
          total={total}
          onReset={reset}
        />

      </div>

    </section>
  );
}
