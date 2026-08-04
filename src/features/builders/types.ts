export type PublicBuilderOption = Readonly<{
  id: string;
  name: string;
  description: string | null;
  priceAdjustmentMinor: number;
  displayOrder: number;
}>;

export type PublicBuilderGroup = Readonly<{
  id: string;
  name: string;
  description: string | null;
  isRequired: boolean;
  minimumSelections: number;
  maximumSelections: number;
  displayOrder: number;
  options: readonly PublicBuilderOption[];
}>;

export type PublicBuilder = Readonly<{
  id: string;
  slug: string;
  name: string;
  title: string;
  description: string | null;
  basePriceMinor: number;
  displayOrder: number;
  groups: readonly PublicBuilderGroup[];
}>;

export type PublishedBuildersResult = Readonly<{
  builders: readonly PublicBuilder[];
  state: "ready" | "empty" | "error";
}>;
