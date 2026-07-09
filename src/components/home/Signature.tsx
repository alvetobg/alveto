import FadeIn from "@/components/animations/FadeIn";
import Image from "next/image";
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

        <div className="mt-32 space-y-48">

          {signatureProducts.map((product, index) => (

            <FadeIn key={product.name} delay={index * 0.15}>
  <article className="mx-auto max-w-5xl">

    <div className="relative aspect-[16/9] overflow-hidden rounded-[48px] shadow-2xl">

      <Image
        src={product.image}
        alt={product.name}
        fill
        className="object-cover transition-transform duration-700 hover:scale-[1.03]"
      />

    </div>

    <div className="mx-auto mt-16 max-w-3xl text-center">

      <h3 className="text-5xl font-bold tracking-tight text-dark md:text-6xl">
        {product.name}
      </h3>

      <p className="mt-10 text-xl leading-9 text-text md:text-2xl">
        {product.description}
      </p>

      <p className="mt-12 text-4xl font-bold text-primary">
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