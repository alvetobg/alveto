"use client";

import { useState } from "react";

import SweetBuilder from "./SweetBuilder";
import SavoryBuilder from "./SavoryBuilder";

export default function CreateYourOwn() {
  const [builder, setBuilder] = useState<"sweet" | "savory" | null>(null);

  if (builder === "sweet") {
  return <SweetBuilder onBack={() => setBuilder(null)} />;
}

if (builder === "savory") {
  return <SavoryBuilder onBack={() => setBuilder(null)} />;
}

  return (
    <section className="mx-auto max-w-5xl">

      <div className="mb-12 text-center">

        <p className="mb-3 text-sm font-semibold uppercase tracking-[6px] text-primary">
          ALVETO
        </p>

        <h2 className="text-5xl font-bold">
          Create Your Own
        </h2>

        <p className="mt-4 text-lg text-neutral-500">
          Choose whether you&apos;d like to build a sweet or savory creation.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2">

        <button
          onClick={() => setBuilder("sweet")}
          className="group rounded-[36px] border border-neutral-200 bg-white p-12 text-left shadow-lg transition hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
        >
          <div className="text-6xl">🍓</div>

          <h3 className="mt-8 text-3xl font-bold">
            Sweet Builder
          </h3>

          <p className="mt-4 text-neutral-500">
            Waffles, crepes, pancakes, chocolates, fruit, toppings,
            ice cream and more.
          </p>
        </button>

        <button
          onClick={() => setBuilder("savory")}
          className="group rounded-[36px] border border-neutral-200 bg-white p-12 text-left shadow-lg transition hover:-translate-y-2 hover:border-primary hover:shadow-2xl"
        >
          <div className="text-6xl">🥓</div>

          <h3 className="mt-8 text-3xl font-bold">
            Savory Builder
          </h3>

          <p className="mt-4 text-neutral-500">
            Cheese, meat, vegetables, sauces, eggs and premium savory ingredients.
          </p>
        </button>

      </div>

    </section>
  );
}
