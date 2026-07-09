import Image from "next/image";

import FadeIn from "@/components/animations/FadeIn";

import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

export default function About() {
  return (
    <Section id="about" className="bg-white">
      <Container>

        <div className="grid items-center gap-24 lg:grid-cols-2">

          <FadeIn direction="left">

            <div className="relative">

              <div className="relative h-[620px] overflow-hidden rounded-[56px] shadow-2xl lg:h-[720px]">

                <Image
                  src="/images/about/interior-1.jpg"
                  alt="Alveto Interior"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                />

              </div>

              <div className="absolute -bottom-14 -right-10 hidden h-72 w-56 overflow-hidden rounded-[36px] border-8 border-white shadow-2xl lg:block">

                <Image
                  src="/images/about/interior-2.jpg"
                  alt="Alveto Interior"
                  fill
                  sizes="300px"
                  className="object-cover"
                />

              </div>

            </div>

          </FadeIn>

          <FadeIn direction="right">

            <div className="lg:pl-8">

              <p className="mb-4 uppercase tracking-[6px] text-primary">
                ABOUT ALVETO
              </p>

              <Heading className="text-left">
                More Than
                <br />
                Just Coffee.
              </Heading>

              <p className="mt-10 text-lg leading-9 text-text">
                Alveto is a place where specialty coffee, thoughtfully crafted
                brunch and signature desserts come together in a warm,
                carefully designed atmosphere.
              </p>

              <p className="mt-8 text-lg leading-9 text-text">
                Every detail, from the ingredients we choose to the interior we
                created, exists for one reason: to make every visit feel worth
                remembering.
              </p>

              <div className="mt-16 flex flex-wrap gap-5">
                <Button href="#reservation">
                  Reserve Your Table
                </Button>
                <Button
  href="/menu"
  variant="secondary"
>
  Explore Menu
</Button>
              </div>

            </div>

          </FadeIn>

        </div>

      </Container>
    </Section>
  );
}