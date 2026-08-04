import type {
  PublicBusinessHour,
  PublicSiteSettings,
} from "@/features/site-settings/types";

const weekdayNames = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
] as const;

export interface BusinessHoursGroup {
  days: string;
  hours: string;
}

function displayTime(value: string) {
  return value.slice(0, 5);
}

function hoursLabel(hours: PublicBusinessHour) {
  if (hours.closed) return "Closed";
  if (!hours.opensAt || !hours.closesAt) return null;
  return `${displayTime(hours.opensAt)} – ${displayTime(hours.closesAt)}`;
}

export function formatAddress(settings: PublicSiteSettings) {
  return [settings.addressLine, settings.city, settings.country]
    .filter((value): value is string => Boolean(value))
    .join(", ");
}

export function groupBusinessHours(
  settings: PublicSiteSettings,
): BusinessHoursGroup[] {
  if (settings.temporarilyClosed) {
    return [{ days: "Current status", hours: "Temporarily closed" }];
  }

  const sorted = [...settings.businessHours].sort(
    (left, right) => left.dayOfWeek - right.dayOfWeek,
  );
  const groups: Array<{
    startDay: number;
    endDay: number;
    hours: string;
  }> = [];

  for (const entry of sorted) {
    const label = hoursLabel(entry);
    if (!label || entry.dayOfWeek < 1 || entry.dayOfWeek > 7) continue;

    const previous = groups.at(-1);
    if (
      previous &&
      previous.hours === label &&
      previous.endDay + 1 === entry.dayOfWeek
    ) {
      previous.endDay = entry.dayOfWeek;
    } else {
      groups.push({
        startDay: entry.dayOfWeek,
        endDay: entry.dayOfWeek,
        hours: label,
      });
    }
  }

  return groups.map((group) => ({
    days:
      group.startDay === group.endDay
        ? weekdayNames[group.startDay - 1]
        : `${weekdayNames[group.startDay - 1]} – ${weekdayNames[group.endDay - 1]}`,
    hours: group.hours,
  }));
}

export function formatCopyright(text: string | null, businessName: string) {
  const fallback = `© {year} ${businessName}. All rights reserved.`;
  return (text || fallback).replaceAll("{year}", String(new Date().getFullYear()));
}
