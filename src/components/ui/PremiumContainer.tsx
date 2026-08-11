import type { ReactNode } from "react";

type PremiumContainerProps = Readonly<{
  children: ReactNode;
  className?: string;
}>;

export default function PremiumContainer({
  children,
  className = "",
}: PremiumContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1280px] px-5 min-[375px]:px-6 md:px-8 lg:px-12 xl:px-16 ${className}`}
    >
      {children}
    </div>
  );
}
