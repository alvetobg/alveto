"use client";

import type { PublicBuilder } from "@/features/builders/types";
import ConfiguredBuilder from "./ConfiguredBuilder";

export default function SavoryBuilder({
  builder,
  onBack,
}: {
  builder: PublicBuilder;
  onBack: () => void;
}) {
  return (
    <ConfiguredBuilder
      builder={builder}
      onBack={onBack}
      autoAdvance={false}
      showHeader={false}
      stickySummary={false}
    />
  );
}
