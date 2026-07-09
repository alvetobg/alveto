"use client";

import { useEffect, useRef, useState } from "react";

type MenuNavigationProps = {
  categories: {
    id: string;
    title: string;
  }[];
};

export default function MenuNavigation({
  categories,
}: MenuNavigationProps) {
  const [active, setActive] = useState(categories[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-category]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          setActive(entry.target.id);

          const button = document.getElementById(
            `menu-nav-${entry.target.id}`
          );

          button?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
          });
        });
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((section) =>
      observer.observe(section)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-24 z-40 mb-12">

      <div className="rounded-full bg-white/90 shadow-2xl backdrop-blur-xl">

        <div
          ref={containerRef}
          className="hide-scrollbar flex overflow-x-auto px-2 py-2"
        >
          {categories.map((category) => (
            <button
              id={`menu-nav-${category.id}`}
              key={category.id}
              onClick={() =>
                document
                  .getElementById(category.id)
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-4 py-3 text-xs font-semibold transition-all duration-300 md:px-6 md:text-sm ${
                active === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>

      </div>

    </div>
  );
}