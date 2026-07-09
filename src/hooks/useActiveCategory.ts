"use client";

import { useEffect, useState } from "react";

export default function useActiveCategory() {
  const [active, setActive] = useState("breakfast");

  useEffect(() => {
    const sections = document.querySelectorAll("[data-category]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        threshold: 0.35,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return active;
}