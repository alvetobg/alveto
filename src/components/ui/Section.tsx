import { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
};

export default function Section({
  children,
  id,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative scroll-mt-[96px] py-20 md:scroll-mt-[104px] md:py-24 lg:py-28 ${className}`}
    >
      {children}
    </section>
  );
}
