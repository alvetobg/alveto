import "server-only";

import type { PublicReservationSettings } from "@/features/reservations/types";
import type { Database } from "@/lib/supabase/database.types";
import type { SupabaseServerClient } from "@/lib/supabase/server";

type GeneratedReservationSettingsRow =
  Database["public"]["Functions"]["get_alveto_public_reservation_settings"]["Returns"][number];

type RuntimeReservationSettingsRow = Omit<
  GeneratedReservationSettingsRow,
  | "advance_booking_notice_minutes"
  | "booking_instructions"
  | "email"
  | "maximum_party_size"
  | "minimum_party_size"
  | "phone_number"
  | "reservation_url"
  | "secondary_message"
  | "whatsapp_contact"
> & {
  advance_booking_notice_minutes: number | null;
  booking_instructions: string | null;
  email: string | null;
  maximum_party_size: number | null;
  minimum_party_size: number | null;
  phone_number: string | null;
  reservation_url: string | null;
  secondary_message: string | null;
  whatsapp_contact: string | null;
};

const approvedWhatsAppHosts = new Set([
  "wa.me",
  "api.whatsapp.com",
  "www.whatsapp.com",
]);

export class PublicReservationSettingsRepositoryError extends Error {
  constructor() {
    super("The public reservation settings could not be loaded.");
    this.name = "PublicReservationSettingsRepositoryError";
  }
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isOptionalString(value: unknown): value is string | null {
  return value === null || isNonEmptyString(value);
}

function isOptionalInteger(value: unknown): value is number | null {
  return value === null || Number.isInteger(value);
}

function isHttpsUrl(value: string) {
  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isReservationSettingsRow(
  value: unknown,
): value is RuntimeReservationSettingsRow {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const row = value as Record<string, unknown>;

  return (
    typeof row.reservations_enabled === "boolean" &&
    isNonEmptyString(row.primary_cta_label) &&
    isOptionalString(row.reservation_url) &&
    (row.reservation_url === null || isHttpsUrl(row.reservation_url)) &&
    (!row.reservations_enabled || row.reservation_url !== null) &&
    isOptionalString(row.secondary_message) &&
    isOptionalString(row.phone_number) &&
    isOptionalString(row.email) &&
    isOptionalString(row.whatsapp_contact) &&
    isOptionalInteger(row.minimum_party_size) &&
    isOptionalInteger(row.maximum_party_size) &&
    isOptionalInteger(row.advance_booking_notice_minutes) &&
    isOptionalString(row.booking_instructions)
  );
}

function normalizePhoneHref(phoneNumber: string | null) {
  if (!phoneNumber) {
    return null;
  }

  const digits = phoneNumber.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15 ? `tel:+${digits}` : null;
}

function normalizeWhatsAppHref(contact: string | null) {
  if (!contact) {
    return null;
  }

  const trimmed = contact.trim();

  if (trimmed.startsWith("http")) {
    try {
      const url = new URL(trimmed);
      return url.protocol === "https:" && approvedWhatsAppHosts.has(url.hostname)
        ? url.toString()
        : null;
    } catch {
      return null;
    }
  }

  const digits = trimmed.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15
    ? `https://wa.me/${digits}`
    : null;
}

export function createPublicReservationSettingsRepository(
  supabase: SupabaseServerClient,
) {
  return {
    async get(): Promise<PublicReservationSettings | null> {
      const rawRows = await supabase.getPublicReservationSettingsRows();

      if (rawRows.length === 0) {
        return null;
      }

      if (rawRows.length !== 1 || !isReservationSettingsRow(rawRows[0])) {
        throw new PublicReservationSettingsRepositoryError();
      }

      const row = rawRows[0];
      const phoneNumber = row.phone_number?.trim() ?? null;
      const whatsappContact = row.whatsapp_contact?.trim() ?? null;

      return {
        reservationsEnabled: row.reservations_enabled,
        reservationUrl: row.reservation_url?.trim() ?? null,
        primaryCtaLabel: row.primary_cta_label.trim(),
        secondaryMessage: row.secondary_message?.trim() ?? null,
        phoneNumber,
        phoneHref: normalizePhoneHref(phoneNumber),
        email: row.email?.trim() ?? null,
        whatsappContact,
        whatsappHref: normalizeWhatsAppHref(whatsappContact),
        minimumPartySize: row.minimum_party_size,
        maximumPartySize: row.maximum_party_size,
        advanceBookingNoticeMinutes: row.advance_booking_notice_minutes,
        bookingInstructions: row.booking_instructions?.trim() ?? null,
      };
    },
  };
}
