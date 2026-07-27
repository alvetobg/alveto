import Image from "next/image";

import FadeIn from "@/components/animations/FadeIn";
import Container from "@/components/ui/Container";
import Heading from "@/components/ui/Heading";
import Section from "@/components/ui/Section";

import { signatureProducts } from "@/data/signature";

export default function Signature() {
  return (
    <Section id="signature" className="bg-cream">
      <Container>
        <p className="text-center uppercase tracking-[6px] text-primary">
          SIGNATURE COLLECTION
        </p>

        <div className="mt-4">
          <Heading>Our Favorites</Heading>
        </div>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-36 lg:mt-32 lg:space-y-48">
          {signatureProducts.map((product, index) => (
            <FadeIn key={product.name} delay={index * 0.15}>
              <article className="group mx-auto max-w-5xl">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[28px] shadow-2xl transition-transform duration-500 md:rounded-[40px] lg:rounded-[48px] group-hover:-translate-y-1">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    quality={85}
                    sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1023px) calc(100vw - 64px), 1024px"
                    className="object-cover transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.025]"
                  />
                </div>

                <div className="mx-auto mt-10 max-w-3xl text-center md:mt-14 lg:mt-16">
                  <h3 className="text-3xl font-bold tracking-tight text-dark sm:text-4xl md:text-5xl lg:text-6xl">
                    {product.name}
                  </h3>

                  <p className="mt-6 text-lg leading-8 text-text md:mt-8 md:text-xl md:leading-9 lg:mt-10 lg:text-2xl">
                    {product.description}
                  </p>

                  <p className="mt-8 text-3xl font-bold text-primary md:mt-10 md:text-4xl">
                    {product.price.toLocaleString("sr-RS")} RSD
                  </p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </Container>
    </Section>
  );
}
