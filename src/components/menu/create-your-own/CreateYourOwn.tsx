"use client";

import { useState } from "react";

import {
  PlateIcon,
  SavoryIcon,
  SweetIcon,
} from "@/components/menu/MenuIcons";
import type {
  PublicBuilder,
  PublishedBuildersResult,
} from "@/features/builders/types";
import ConfiguredBuilder from "./ConfiguredBuilder";
import SavoryBuilder from "./SavoryBuilder";
import SweetBuilder from "./SweetBuilder";

interface CreateYourOwnProps {
  builders: readonly PublicBuilder[];
  state: PublishedBuildersResult["state"];
}

export default function CreateYourOwn({
  builders,
  state,
}: CreateYourOwnProps) {
  const [selectedBuilderId, setSelectedBuilderId] = useState<string | null>(
    null,
  );
  const selectedBuilder =
    builders.find((builder) => builder.id === selectedBuilderId) ?? null;

  if (selectedBuilder?.slug === "sweet") {
    return (
      <SweetBuilder
        builder={selectedBuilder}
        onBack={() => setSelectedBuilderId(null)}
      />
    );
  }

  if (selectedBuilder?.slug === "savory") {
    return (
      <SavoryBuilder
        builder={selectedBuilder}
        onBack={() => setSelectedBuilderId(null)}
      />
    );
  }

  if (selectedBuilder) {
    return (
      <ConfiguredBuilder
        builder={selectedBuilder}
        onBack={() => setSelectedBuilderId(null)}
        autoAdvance={false}
        showHeader
        stickySummary
      />
    );
  }

  if (builders.length === 0) {
    return (
      <section className="mx-auto max-w-2xl border-y border-dark/12 py-12 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          {state === "error" ? "Temporarily unavailable" : "Coming soon"}
        </p>
        <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] text-dark">
          Builder options are not available yet
        </h3>
        <p className="mx-auto mt-3 max-w-lg leading-7 text-text">
          {state === "error"
            ? "Please try again shortly."
            : "Published Create Your Own options will appear here when ready."}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl" aria-labelledby="builder-choice-title">
      <div className="mb-7 max-w-2xl md:mb-9">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-primary">
          Made by you
        </p>
        <h3
          id="builder-choice-title"
          className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-dark md:text-3xl"
        >
          Choose a sweet or savory starting point
        </h3>
        <p className="mt-3 text-sm leading-6 text-text md:text-base md:leading-7">
          Select a builder, then compose your order from the published options.
          Prices and the running total update with every choice.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {builders.map((builder) => (
          <button
            key={builder.id}
            type="button"
            onClick={() => setSelectedBuilderId(builder.id)}
            className="group min-h-[190px] min-w-0 rounded-[20px] border border-dark/12 bg-white p-6 text-left transition-[color,border-color,background-color,transform] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary hover:bg-[#fffdf9] active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:min-h-[220px] md:p-8 motion-reduce:transform-none"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-primary/35 bg-primary/8 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-dark">
              <BuilderChoiceIcon slug={builder.slug} />
            </span>
            <h4 className="mt-7 break-words text-2xl font-semibold tracking-[-0.03em] text-dark md:text-[28px]">
              {builder.name}
            </h4>
            {builder.description ? (
              <p className="mt-3 max-w-md break-words text-sm leading-6 text-text">
                {builder.description}
              </p>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}

function BuilderChoiceIcon({ slug }: Readonly<{ slug: string }>) {
  if (slug === "sweet") return <SweetIcon />;
  if (slug === "savory") return <SavoryIcon />;
  return <PlateIcon />;
}
