"use client";

import { useState } from "react";

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
      <section className="mx-auto max-w-3xl rounded-[32px] border border-black/5 bg-white px-6 py-14 text-center shadow-[0_10px_35px_rgba(0,0,0,0.05)] sm:px-10">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-primary">
          {state === "error" ? "Temporarily unavailable" : "Coming soon"}
        </p>
        <h3 className="mt-4 text-3xl font-bold text-dark">
          Builder options are not available yet
        </h3>
        <p className="mx-auto mt-4 max-w-lg leading-7 text-text">
          {state === "error"
            ? "Please try again shortly."
            : "Published Create Your Own options will appear here when ready."}
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-12 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[6px] text-primary">
          ALVETO
        </p>
        <h3 className="text-5xl font-bold">Create Your Own</h3>
        <p className="mt-4 text-lg text-neutral-500">
          Choose the creation you&apos;d like to build.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {builders.map((builder) => (
          <button
            key={builder.id}
            type="button"
            onClick={() => setSelectedBuilderId(builder.id)}
            className="group min-w-0 rounded-[36px] border border-neutral-200 bg-white p-8 text-left shadow-lg transition hover:-translate-y-2 hover:border-primary hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:p-12 motion-reduce:transform-none motion-reduce:transition-none"
          >
            <div className="text-6xl" aria-hidden="true">
              {builder.slug === "sweet"
                ? "🍓"
                : builder.slug === "savory"
                  ? "🥓"
                  : "🍽️"}
            </div>
            <h4 className="mt-8 break-words text-3xl font-bold">
              {builder.name}
            </h4>
            {builder.description ? (
              <p className="mt-4 break-words text-neutral-500">
                {builder.description}
              </p>
            ) : null}
          </button>
        ))}
      </div>
    </section>
  );
}
