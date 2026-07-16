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

          document
            .getElementById(`menu-nav-${entry.target.id}`)
            ?.scrollIntoView({
              behavior: "smooth",
              inline: "center",
              block: "nearest",
            });
        });
      },
      {
        rootMargin: "-25% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="sticky top-28 z-40 mb-10">
      <div className="rounded-full border border-black/5 bg-white/90 shadow-xl backdrop-blur-xl">
        <div
          ref={containerRef}
          className="hide-scrollbar flex overflow-x-auto px-2 py-2"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              id={`menu-nav-${category.id}`}
              onClick={() => {
                document.getElementById(category.id)?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }}
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-xs font-semibold transition-all duration-300 md:px-6 md:text-sm ${
                active === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-dark"
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