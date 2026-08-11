"use client";

import { useEffect, useState } from "react";

type MenuNavigationProps = Readonly<{
  categories: readonly {
    id: string;
    title: string;
  }[];
}>;

export default function MenuNavigation({
  categories,
}: MenuNavigationProps) {
  const [active, setActive] = useState(categories[0]?.id);
  const activeCategory = categories.some((category) => category.id === active)
    ? active
    : categories[0]?.id;
  const activeIndex = Math.max(
    0,
    categories.findIndex((category) => category.id === activeCategory),
  );

  useEffect(() => {
    const sections = categories
      .map((category) => document.getElementById(category.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(first.boundingClientRect.top) -
              Math.abs(second.boundingClientRect.top),
          )[0];

        if (!current) return;

        const nextId = current.target.id;
        setActive(nextId);
        document.getElementById(`menu-nav-${nextId}`)?.scrollIntoView({
          behavior: "auto",
          inline: "nearest",
          block: "nearest",
        });
      },
      {
        rootMargin: "-31% 0px -64% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [categories]);

  if (categories.length === 0) return null;

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-[calc(5rem+env(safe-area-inset-top))] z-40 -mx-6 border-y border-dark/10 bg-cream shadow-[0_8px_24px_rgba(34,34,34,0.045)] md:top-[88px] md:mx-0 md:rounded-[16px] md:border"
    >
      <div className="hide-scrollbar overflow-x-auto px-3 md:px-4">
        <ol className="flex min-w-max items-center gap-1">
          {categories.map((category, index) => {
            const selected = activeCategory === category.id;

            return (
              <li key={category.id}>
                <a
                  id={`menu-nav-${category.id}`}
                  href={`#${category.id}`}
                  aria-current={selected ? "location" : undefined}
                  aria-label={`${category.title}, category ${index + 1} of ${categories.length}`}
                  onClick={(event) => {
                    const target = document.getElementById(category.id);
                    if (!target) return;

                    event.preventDefault();
                    setActive(category.id);
                    target.scrollIntoView({
                      behavior: "instant",
                      block: "start",
                    });
                    window.history.replaceState(null, "", `#${category.id}`);
                  }}
                  className={`relative flex min-h-12 items-center whitespace-nowrap px-3.5 text-[13px] font-semibold tracking-[-0.01em] transition-colors duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] md:px-4 md:text-sm ${
                    selected
                      ? "text-dark after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:bg-primary md:after:inset-x-4"
                      : "text-text hover:text-dark"
                  }`}
                >
                  {category.title}
                </a>
              </li>
            );
          })}
        </ol>
      </div>

      <div aria-hidden="true" className="relative h-0.5 bg-dark/8">
        <div
          className="absolute inset-y-0 left-0 w-full origin-left bg-primary transition-transform duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] after:absolute after:-right-px after:top-[-2px] after:h-1.5 after:w-1 after:-skew-x-[18deg] after:bg-primary motion-reduce:transition-none"
          style={{
            transform: `scaleX(${(activeIndex + 1) / categories.length})`,
          }}
        />
      </div>
    </nav>
  );
}
