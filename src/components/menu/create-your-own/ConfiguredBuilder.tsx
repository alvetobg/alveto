"use client";

import { useMemo, useState } from "react";

import type { PublicBuilder } from "@/features/builders/types";
import BuilderOption from "./BuilderOption";
import BuilderSection from "./BuilderSection";
import SummaryCard from "./SummaryCard";

interface ConfiguredBuilderProps {
  builder: PublicBuilder;
  onBack: () => void;
  autoAdvance: boolean;
  showHeader: boolean;
  stickySummary: boolean;
}

export default function ConfiguredBuilder({
  builder,
  onBack,
  autoAdvance,
  showHeader,
  stickySummary,
}: ConfiguredBuilderProps) {
  const baseGroup =
    builder.groups.find((group) => group.isRequired) ??
    builder.groups[0] ??
    null;
  const [openGroupId, setOpenGroupId] = useState(baseGroup?.id ?? "");
  const [selectedByGroup, setSelectedByGroup] = useState<
    Record<string, string[]>
  >({});

  const selectedOptions = useMemo(
    () =>
      builder.groups.flatMap((group) => {
        const selectedIds = selectedByGroup[group.id] ?? [];
        return group.options.filter((option) =>
          selectedIds.includes(option.id),
        );
      }),
    [builder.groups, selectedByGroup],
  );

  function select(groupId: string, optionId: string) {
    const group = builder.groups.find((candidate) => candidate.id === groupId);
    if (!group) return;

    const current = selectedByGroup[groupId] ?? [];
    const selected = current.includes(optionId);
    let nextSelection: string[];

    if (selected) {
      nextSelection =
        group.isRequired && current.length <= group.minimumSelections
          ? current
          : current.filter((id) => id !== optionId);
    } else if (group.maximumSelections === 1) {
      nextSelection = [optionId];
    } else if (current.length >= group.maximumSelections) {
      nextSelection = current;
    } else {
      nextSelection = [...current, optionId];
    }

    setSelectedByGroup((previous) => ({
      ...previous,
      [groupId]: nextSelection,
    }));

    if (autoAdvance) {
      const currentIndex = builder.groups.findIndex(
        (candidate) => candidate.id === groupId,
      );
      const nextGroup = builder.groups[currentIndex + 1];
      if (nextGroup) setOpenGroupId(nextGroup.id);
    }
  }

  function reset() {
    setSelectedByGroup({});
    setOpenGroupId(baseGroup?.id ?? "");
  }

  const totalMinor = selectedOptions.reduce(
    (total, option) => total + option.priceAdjustmentMinor,
    builder.basePriceMinor,
  );
  const baseSelections = baseGroup
    ? baseGroup.options
        .filter((option) =>
          (selectedByGroup[baseGroup.id] ?? []).includes(option.id),
        )
        .map((option) => option.name)
    : [];
  const summary = builder.groups
    .filter((group) => group.id !== baseGroup?.id)
    .map((group) => ({
      title: group.name,
      items: group.options
        .filter((option) =>
          (selectedByGroup[group.id] ?? []).includes(option.id),
        )
        .map((option) => option.name),
    }));

  return (
    <section className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-2xl border border-neutral-300 bg-white px-6 py-3 font-semibold transition hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          ← Back
        </button>

        {showHeader ? (
          <div>
            <h3 className="text-3xl font-bold">
              {builder.slug === "sweet" ? "🍓 " : ""}
              {builder.title}
            </h3>
            {builder.description ? (
              <p className="mt-1 text-neutral-500">{builder.description}</p>
            ) : null}
          </div>
        ) : (
          <h3 className="sr-only">{builder.title}</h3>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
        <div className="min-w-0 space-y-6">
          {builder.groups.map((group) => {
            const selectedIds = selectedByGroup[group.id] ?? [];
            const selectedCount = selectedIds.length;
            const isSingleRequired =
              group.isRequired && group.maximumSelections === 1;
            return (
              <BuilderSection
                key={group.id}
                title={group.name}
                subtitle={
                  isSingleRequired
                    ? "Choose one"
                    : `Choose up to ${group.maximumSelections}`
                }
                open={openGroupId === group.id}
                onToggle={() => setOpenGroupId(group.id)}
                selectedCount={selectedCount}
                limit={isSingleRequired ? undefined : group.maximumSelections}
              >
                {group.options.map((option) => (
                  <BuilderOption
                    key={option.id}
                    name={option.name}
                    description={option.description}
                    price={option.priceAdjustmentMinor / 100}
                    selected={selectedIds.includes(option.id)}
                    disabled={
                      !selectedIds.includes(option.id) &&
                      selectedCount >= group.maximumSelections
                    }
                    onClick={() => select(group.id, option.id)}
                  />
                ))}
              </BuilderSection>
            );
          })}
        </div>

        <div
          className={
            stickySummary ? "lg:sticky lg:top-28 lg:self-start" : undefined
          }
        >
          <SummaryCard
            title={builder.name}
            base={baseSelections.join(", ")}
            sections={summary}
            total={totalMinor / 100}
            onReset={reset}
          />
        </div>
      </div>
    </section>
  );
}
