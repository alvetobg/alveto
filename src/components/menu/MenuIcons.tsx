type IconProps = Readonly<{
  className?: string;
}>;

const iconProps = {
  "aria-hidden": true,
  fill: "none",
  focusable: false,
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  strokeWidth: 1.8,
  viewBox: "0 0 24 24",
};

export function SearchIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.5 15.5 4 4" />
    </svg>
  );
}

export function CloseIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

export function CheckIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg {...iconProps} className={className} strokeWidth={2.2}>
      <path d="m5 12 4.25 4.25L19 6.5" />
    </svg>
  );
}

export function ChevronDownIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="m6.5 9 5.5 5.5L17.5 9" />
    </svg>
  );
}

export function ArrowLeftIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M19 12H5" />
      <path d="m10 7-5 5 5 5" />
    </svg>
  );
}

export function MenuIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M5 8h14" />
      <path d="M5 16h14" />
    </svg>
  );
}

export function SweetIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M12 7.25c-4.35 0-7.25 3.2-7.25 6.75 0 3.25 2.7 5.25 7.25 5.25s7.25-2 7.25-5.25c0-3.55-2.9-6.75-7.25-6.75Z" />
      <path d="M9.4 7.55C8.65 5.2 9.65 3.7 12 4.8c2.35-1.1 3.35.4 2.6 2.75" />
      <path d="M9 12.25h.01M15 12.25h.01M12 15.75h.01" strokeWidth={2.4} />
    </svg>
  );
}

export function SavoryIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <path d="M4 15.5h16" />
      <path d="M5.5 15.5a6.5 6.5 0 0 1 13 0" />
      <path d="M12 6V4.5" />
      <path d="M3.5 19h17" />
    </svg>
  );
}

export function PlateIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg {...iconProps} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
    </svg>
  );
}
