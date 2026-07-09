"use client";

import Link from "next/link";

import Container from "@/components/ui/Container";
import useActiveCategory from "@/hooks/useActiveCategory";
import { cn } from "@/lib/utils";

const categories = [
  {
    name: "Breakfast",
    href: "#breakfast",
    id: "breakfast",
  },
  {
    name: "Desserts",
    href: "#desserts",
    id: "desserts",
  },
  {
    name: "Coffee",
    href: "#coffee",
    id: "coffee",
  },
];

export default function MenuCategories() {
  const active = useActiveCategory();

  return (
    <div className="sticky top-24 z-40 border-y border-black/5 bg-cream/90 backdrop-blur-xl">
      <Container>
        <div className="flex justify-center gap-4 py-5">

          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[3px] transition-all duration-300",
                active === category.id
                  ? "bg-primary text-white shadow-lg"
                  : "text-text hover:bg-white hover:text-primary"
              )}
            >
              {category.name}
            </Link>
          ))}

        </div>
      </Container>
    </div>
  );
}