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
        <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
          <FadeIn direction="left">
            <div className="relative">
              <div className="group relative h-[500px] overflow-hidden rounded-[40px] shadow-[0_25px_60px_rgba(0,0,0,0.08)] sm:h-[580px] lg:h-[720px] lg:rounded-[56px]">
                <Image
                  src="/images/about/interior-1.jpg"
                  alt="Alveto Interior"
                  fill
                  quality={90}
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
              </div>

              <div className="absolute -bottom-12 -right-8 hidden h-60 w-48 overflow-hidden rounded-[28px] border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.12)] lg:block xl:h-72 xl:w-56 xl:rounded-[36px]">
                <Image
                  src="/images/about/interior-2.jpg"
                  alt="Alveto Interior"
                  fill
                  quality={90}
                  sizes="300px"
                  className="object-cover transition-transform duration-700 hover:scale-105"
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

              <p className="mt-8 text-lg leading-9 text-text">
                Alveto is a place where specialty coffee, thoughtfully crafted
                brunch and signature desserts come together in a warm,
                carefully designed atmosphere.
              </p>

              <p className="mt-8 text-lg leading-9 text-text">
                Every detail, from the ingredients we choose to the interior we
                created, exists for one reason: to make every visit feel worth
                remembering.
              </p>

              <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:gap-5 lg:mt-16">
                <Button href="#reservation" className="w-full sm:w-auto">
                  Reserve Your Table
                </Button>

                <Button
                  href="/menu"
                  variant="secondary"
                  className="w-full sm:w-auto"
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