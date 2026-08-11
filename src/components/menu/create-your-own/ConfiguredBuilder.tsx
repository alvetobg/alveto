"use client";

import { useMemo, useState } from "react";

import {
  ArrowLeftIcon,
  PlateIcon,
  SavoryIcon,
  SweetIcon,
} from "@/components/menu/MenuIcons";
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
  const requiredGroups = builder.groups.filter(
    (group) => group.isRequired || group.minimumSelections > 0,
  );
  const requiredComplete = requiredGroups.filter(
    (group) =>
      (selectedByGroup[group.id] ?? []).length >= group.minimumSelections,
  ).length;

  return (
    <section className="space-y-7 md:space-y-9" aria-labelledby="active-builder-title">
      <div className="flex flex-col gap-5 border-b border-dark/12 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border border-primary/35 bg-primary/8 text-primary">
            <BuilderIcon slug={builder.slug} />
          </span>
          {showHeader ? (
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
                Create your own
              </p>
              <h3
                id="active-builder-title"
                className="mt-1 break-words text-[28px] font-semibold leading-tight tracking-[-0.035em] text-dark md:text-4xl"
              >
                {builder.title}
              </h3>
              {builder.description ? (
                <p className="mt-2 max-w-2xl text-sm leading-6 text-text">
                  {builder.description}
                </p>
              ) : null}
            </div>
          ) : (
            <h3 id="active-builder-title" className="sr-only">
              {builder.title}
            </h3>
          )}
        </div>

        <button
          type="button"
          onClick={onBack}
          className="inline-flex min-h-11 w-fit items-center gap-2 rounded-[13px] border border-dark/14 bg-white px-4 text-sm font-semibold text-dark transition-colors duration-150 hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <ArrowLeftIcon />
          Change builder
        </button>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="min-w-0 space-y-4">
          {builder.groups.map((group, groupIndex) => {
            const selectedIds = selectedByGroup[group.id] ?? [];
            const selectedCount = selectedIds.length;
            const required = group.isRequired || group.minimumSelections > 0;
            const subtitle = required
              ? group.maximumSelections === 1
                ? "Choose one - required"
                : `Choose ${group.minimumSelections} to ${group.maximumSelections} - required`
              : `Choose up to ${group.maximumSelections}`;

            return (
              <BuilderSection
                key={group.id}
                id={`builder-group-${group.id}`}
                step={groupIndex + 1}
                title={group.name}
                subtitle={subtitle}
                open={openGroupId === group.id}
                onToggle={() =>
                  setOpenGroupId((current) =>
                    current === group.id ? "" : group.id,
                  )
                }
                selectedCount={selectedCount}
                limit={group.maximumSelections}
                required={required}
                complete={required && selectedCount >= group.minimumSelections}
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
            stickySummary
              ? "lg:sticky lg:top-[164px] lg:self-start"
              : undefined
          }
        >
          <SummaryCard
            title={builder.name}
            base={baseSelections.join(", ")}
            sections={summary}
            total={totalMinor / 100}
            requiredComplete={requiredComplete}
            requiredTotal={requiredGroups.length}
            onReset={reset}
          />
        </div>
      </div>
    </section>
  );
}

function BuilderIcon({ slug }: Readonly<{ slug: string }>) {
  if (slug === "sweet") return <SweetIcon />;
  if (slug === "savory") return <SavoryIcon />;
  return <PlateIcon />;
}
