"use client";

import type { PublicBuilder } from "@/features/builders/types";
import ConfiguredBuilder from "./ConfiguredBuilder";

export default function SweetBuilder({
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
      autoAdvance
      showHeader
      stickySummary
    />
  );
}
