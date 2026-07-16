import Image from "next/image";

import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

export default function Experience() {
  return (
    <Section id="experience" className="bg-[#F7F4EF]">
      <Container>
        <p className="mb-4 text-center uppercase tracking-[6px] text-primary">
          ALVETO MOMENTS
        </p>

        <Heading>
          Every Moment Has a Flavor
        </Heading>

        <p className="mx-auto mt-6 mb-16 max-w-2xl text-center text-lg leading-8 text-gray-600 md:mb-20">
          From your first coffee of the morning to the last cocktail of the
          evening.
        </p>

        <div className="space-y-8 md:space-y-12">
          <FadeIn>
            <Moment
              image="/images/experience/morning.jpg"
              title="Morning"
              text="Fresh coffee, artisan breakfast and slow mornings made to be enjoyed."
            />
          </FadeIn>

          <FadeIn delay={0.15}>
            <Moment
              image="/images/experience/afternoon.jpg"
              title="Afternoon"
              text="Brunch favorites, waffles and signature creations for every taste."
            />
          </FadeIn>

          <FadeIn delay={0.3}>
            <Moment
              image="/images/experience/evening.jpg"
              title="Evening"
              text="Cocktails, desserts and warm conversations as the day comes to an end."
            />
          </FadeIn>
        </div>
      </Container>
    </Section>
  );
}

function Moment({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) {
  return (
    <article className="group relative h-[460px] overflow-hidden rounded-[28px] sm:h-[560px] sm:rounded-[36px] lg:h-[650px] lg:rounded-[42px] shadow-[0_20px_60px_rgba(0,0,0,0.08)]">

      <Image
        src={image}
        alt={title}
        fill
        quality={90}
        sizes="(max-width:768px) 100vw, 1280px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent transition-opacity duration-500 group-hover:opacity-90" />

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 lg:p-10">

        <div className="max-w-xl rounded-[28px] border border-white/15 bg-white/10 p-6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-500 group-hover:bg-white/15 sm:p-8">

          <p className="mb-3 text-xs font-semibold uppercase tracking-[4px] text-white/70">
            ALVETO MOMENT
          </p>

          <h3 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h3>

          <p className="mt-5 text-base leading-7 text-white/90 sm:text-lg sm:leading-8">
            {text}
          </p>

        </div>

      </div>

    </article>
  );
}