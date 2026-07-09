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
      className={`text-5xl font-extrabold tracking-[-0.03em] text-dark md:text-6xl xl:text-7xl ${className}`}
    >
      {children}
    </h2>
  );
}