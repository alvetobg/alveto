import { ReactNode } from "react";

type HeadingProps = {
  children: ReactNode;
  className?: string;
};

export default function Heading({
  children,
  className = "",
}: HeadingProps) {
  return (
    <h2
      className={`text-[2.125rem] font-bold leading-[1.05] tracking-[-0.035em] text-dark min-[375px]:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl ${className}`}
    >
      {children}
    </h2>
  );
}
