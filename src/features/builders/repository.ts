import "server-only";

import type { SupabaseServerClient } from "@/lib/supabase/server";
import type {
  PublicBuilder,
  PublicBuilderGroup,
  PublicBuilderOption,
} from "@/features/builders/types";

type PublicBuilderRow = Awaited<
  ReturnType<SupabaseServerClient["getPublishedBuilderRows"]>
>[number];

type MutableGroup = Omit<PublicBuilderGroup, "options"> & {
  options: PublicBuilderOption[];
};

type MutableBuilder = Omit<PublicBuilder, "groups"> & {
  groups: MutableGroup[];
};

export class PublishedBuildersRepositoryError extends Error {
  constructor() {
    super("The published builders could not be loaded.");
    this.name = "PublishedBuildersRepositoryError";
  }
}

function nonEmpty(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function nullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

function order(value: unknown): value is number {
  return Number.isInteger(value) && Number(value) >= 0;
}

function validRow(row: PublicBuilderRow) {
  return (
    nonEmpty(row.builder_id) &&
    nonEmpty(row.builder_slug) &&
    nonEmpty(row.builder_name) &&
    nonEmpty(row.builder_title) &&
    nullableString(row.builder_description) &&
    order(row.builder_base_price_minor) &&
    order(row.builder_display_order) &&
    nonEmpty(row.group_id) &&
    nonEmpty(row.group_name) &&
    nullableString(row.group_description) &&
    typeof row.group_is_required === "boolean" &&
    order(row.group_minimum_selections) &&
    Number.isInteger(row.group_maximum_selections) &&
    row.group_maximum_selections >= 1 &&
    row.group_minimum_selections <= row.group_maximum_selections &&
    order(row.group_display_order) &&
    nonEmpty(row.option_id) &&
    nonEmpty(row.option_name) &&
    nullableString(row.option_description) &&
    order(row.option_price_adjustment_minor) &&
    order(row.option_display_order)
  );
}

export function createPublishedBuildersRepository(
  supabase: SupabaseServerClient,
) {
  return {
    async list(): Promise<readonly PublicBuilder[]> {
      const rows = await supabase.getPublishedBuilderRows();
      const builders = new Map<string, MutableBuilder>();
      const groups = new Map<string, MutableGroup>();
      const groupBuilderIds = new Map<string, string>();
      const optionIds = new Set<string>();

      for (const row of rows) {
        if (!validRow(row) || optionIds.has(row.option_id)) {
          throw new PublishedBuildersRepositoryError();
        }
        optionIds.add(row.option_id);

        let builder = builders.get(row.builder_id);
        if (!builder) {
          builder = {
            id: row.builder_id,
            slug: row.builder_slug,
            name: row.builder_name,
            title: row.builder_title,
            description: row.builder_description,
            basePriceMinor: row.builder_base_price_minor,
            displayOrder: row.builder_display_order,
            groups: [],
          };
          builders.set(row.builder_id, builder);
        } else if (
          builder.slug !== row.builder_slug ||
          builder.name !== row.builder_name ||
          builder.title !== row.builder_title ||
          builder.description !== row.builder_description ||
          builder.basePriceMinor !== row.builder_base_price_minor ||
          builder.displayOrder !== row.builder_display_order
        ) {
          throw new PublishedBuildersRepositoryError();
        }

        let group = groups.get(row.group_id);
        if (!group) {
          group = {
            id: row.group_id,
            name: row.group_name,
            description: row.group_description,
            isRequired: row.group_is_required,
            minimumSelections: row.group_minimum_selections,
            maximumSelections: row.group_maximum_selections,
            displayOrder: row.group_display_order,
            options: [],
          };
          groups.set(row.group_id, group);
          groupBuilderIds.set(row.group_id, row.builder_id);
          builder.groups.push(group);
        } else if (
          groupBuilderIds.get(row.group_id) !== row.builder_id ||
          group.name !== row.group_name ||
          group.description !== row.group_description ||
          group.isRequired !== row.group_is_required ||
          group.minimumSelections !== row.group_minimum_selections ||
          group.maximumSelections !== row.group_maximum_selections ||
          group.displayOrder !== row.group_display_order
        ) {
          throw new PublishedBuildersRepositoryError();
        }

        group.options.push({
          id: row.option_id,
          name: row.option_name,
          description: row.option_description,
          priceAdjustmentMinor: row.option_price_adjustment_minor,
          displayOrder: row.option_display_order,
        });
      }

      return [...builders.values()]
        .sort(
          (left, right) =>
            left.displayOrder - right.displayOrder ||
            left.id.localeCompare(right.id),
        )
        .map((builder) => ({
          ...builder,
          groups: builder.groups
            .sort(
              (left, right) =>
                left.displayOrder - right.displayOrder ||
                left.id.localeCompare(right.id),
            )
            .map((group) => ({
              ...group,
              options: group.options.sort(
                (left, right) =>
                  left.displayOrder - right.displayOrder ||
                  left.id.localeCompare(right.id),
              ),
            })),
        }));
    },
  };
}
