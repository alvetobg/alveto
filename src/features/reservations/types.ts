export interface PublicReservationSettings {
  reservationsEnabled: boolean;
  reservationUrl: string | null;
  primaryCtaLabel: string;
  secondaryMessage: string | null;
  phoneNumber: string | null;
  phoneHref: string | null;
  email: string | null;
  whatsappContact: string | null;
  whatsappHref: string | null;
  minimumPartySize: number | null;
  maximumPartySize: number | null;
  advanceBookingNoticeMinutes: number | null;
  bookingInstructions: string | null;
}

export type PublicReservationSettingsResult = Readonly<{
  settings: PublicReservationSettings | null;
  state: "ready" | "empty" | "error";
}>;
