"use client";

import { useEffect, useState } from "react";

type MenuNavigationProps = {
  categories: {
    id: string;
    title: string;
  }[];
};

const getScrollBehavior = (): ScrollBehavior =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";

export default function MenuNavigation({
  categories,
}: MenuNavigationProps) {
  const [active, setActive] = useState(categories[0]?.id);
  const activeCategory = categories.some((category) => category.id === active)
    ? active
    : categories[0]?.id;

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
              behavior: getScrollBehavior(),
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
  }, [categories]);

  return (
    <nav aria-label="Menu categories" className="sticky top-28 z-40 mb-10">
      <div className="rounded-full border border-black/5 bg-white/90 shadow-xl backdrop-blur-xl">
        <div className="hide-scrollbar flex overflow-x-auto px-2 py-2">
          {categories.map((category) => (
            <button
              type="button"
              key={category.id}
              id={`menu-nav-${category.id}`}
              aria-current={
                activeCategory === category.id ? "location" : undefined
              }
              onClick={() => {
                document.getElementById(category.id)?.scrollIntoView({
                  behavior: getScrollBehavior(),
                  block: "start",
                });
              }}
              className={`flex-shrink-0 whitespace-nowrap rounded-full px-5 py-3 text-xs font-semibold transition-all duration-300 md:px-6 md:text-sm ${
                activeCategory === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "text-neutral-600 hover:bg-neutral-100 hover:text-dark"
              }`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
