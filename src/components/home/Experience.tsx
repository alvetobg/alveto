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

        <p className="mx-auto mt-6 mb-20 max-w-2xl text-center text-lg text-gray-600">
          From your first coffee of the morning to the last cocktail of the evening.
        </p>

        <div className="space-y-12">

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
    <div className="group relative h-[650px] overflow-hidden rounded-[40px]">

      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/50" />

      <div className="absolute bottom-0 left-0 p-12 text-white">

        <p className="mb-3 uppercase tracking-[5px] text-white/70">
          ALVETO
        </p>

        <h3 className="text-5xl font-bold">
          {title}
        </h3>

        <p className="mt-6 max-w-lg text-lg leading-8 text-white/90">
          {text}
        </p>

      </div>

    </div>
  );
}