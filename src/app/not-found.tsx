import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main-content"
      tabIndex={-1}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#F7F4EF] px-6 focus:outline-none"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="select-none text-[12rem] opacity-[0.06] md:text-[18rem] xl:text-[24rem]">
          🧇
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <Image
          src="/logos/alveto-logo.png"
          alt="ALVETO"
          width={240}
          height={90}
          priority
          className="mx-auto mb-10"
        />

        <p className="mb-4 text-sm font-semibold uppercase tracking-[8px] text-primary">
          404
        </p>

        <h1 className="text-5xl font-extrabold tracking-[-0.04em] text-dark md:text-7xl">
          Looks Like This
          <br />
          Waffle Got Lost.
        </h1>

        <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-text">
          Don&apos;t worry — our coffee is still hot, our brunch is still fresh and
          our desserts are waiting for you.
        </p>

        <div className="mt-12 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center rounded-full bg-primary px-8 py-4 text-sm font-semibold tracking-wide text-white transition-all duration-300 hover:-translate-y-1 hover:bg-primary-hover hover:shadow-xl motion-reduce:transform-none motion-reduce:transition-none"
          >
            ← Back Home
          </Link>
        </div>
      </div>
    </main>
  );
}
