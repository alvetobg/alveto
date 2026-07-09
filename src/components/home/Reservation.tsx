import Image from "next/image";

import FadeIn from "@/components/animations/FadeIn";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Heading from "@/components/ui/Heading";
import Button from "@/components/ui/Button";

export default function Reservation() {
  return (
    <Section
      id="reservation"
      className="relative overflow-hidden text-white"
    >
      {/* Background */}

      <Image
        src="/images/hero.jpg"
        alt="Alveto"
        fill
        priority={false}
        sizes="100vw"
        className="object-cover scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/65 to-black/85" />

      <Container>

        <FadeIn>

          <div className="relative z-10 mx-auto max-w-4xl py-24 text-center md:py-36">

            <p className="mb-5 text-sm font-semibold uppercase tracking-[8px] text-primary">
              RESERVATION
            </p>

            <Heading className="text-white">
              Reserve Your
              <br />
              Experience
            </Heading>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-9 text-white/75">
              Whether it's your morning coffee, weekend brunch
              or an evening cocktail, we'll make sure your
              table is waiting.
            </p>

            <div className="mt-14 flex flex-wrap justify-center gap-5">

              <Button href="tel:+381XXXXXXXXX">
                Call Us
              </Button>

              <Button
                href="https://instagram.com/alveto"
                variant="secondary"
              >
                Instagram
              </Button>

            </div>

          </div>

        </FadeIn>

      </Container>
    </Section>
  );
}