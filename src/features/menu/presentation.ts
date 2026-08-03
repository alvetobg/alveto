const categoryHeroImages: Readonly<Record<string, string>> = {
  breakfast: "/images/menu-hero.webp",
  "sweet-selection": "/images/categories/sweet.webp",
  "vegan-selection": "/images/categories/vegan.webp",
  "savory-selection": "/images/categories/savory.webp",
  "create-your-own": "/images/categories/create.webp",
  "coffee-beverages": "/images/categories/coffee.webp",
  "fresh-juices": "/images/categories/fresh-juices.webp",
  beer: "/images/categories/beer.webp",
  spirits: "/images/categories/cocktails.webp",
  cocktails: "/images/categories/cocktails.webp",
};

const productImageFallbacks: Readonly<Record<string, string>> = {
  "waffle-benedict": "/images/menu/breakfast/waffle-benedict.webp",
  "pistacchio-mortadella-brioche":
    "/images/menu/breakfast/pistacchio-mortadella-brioche.webp",
  "avo-prosciutto-toast":
    "/images/menu/breakfast/avo-prosciutto-toast.webp",
  "avo-salmon-toast": "/images/menu/breakfast/avo-salmon-toast.webp",
  "caprese-toast": "/images/menu/breakfast/caprese-toast.webp",
  "maple-pancakes": "/images/menu/breakfast/maple-pancakes.webp",
  "alveto-classic": "/images/menu/sweet/alveto-classic.webp",
  "bueno-strawberry": "/images/menu/sweet/bueno-strawberry.webp",
  "raspberry-caramel": "/images/menu/sweet/raspberry-caramel.webp",
  "dubai-pistachio": "/images/menu/sweet/dubai-pistachio.webp",
  "strawberry-milk-choco":
    "/images/menu/sweet/strawberry-milk-choco.webp",
  "bueno-berry": "/images/menu/sweet/bueno-berry.webp",
  "mango-vanilla-white": "/images/menu/sweet/mango-vanilla-white.webp",
  "cherry-vanilla-white":
    "/images/menu/sweet/cherry-vanilla-white.webp",
  "white-cherry-crunch":
    "/images/menu/sweet/cherry-vanilla-white.webp",
  "ferrero-hazelnut": "/images/menu/sweet/ferrero-hazelnut.webp",
  "raffaello-raspberry": "/images/menu/sweet/raffaello-raspberry.webp",
  "pistachio-raspberry":
    "/images/menu/sweet/pistachio-raspberry.webp",
  "dark-pear": "/images/menu/vegan/dark-cherry.webp",
  "dark-raspberry-sorbet": "/images/menu/vegan/dark-cherry.webp",
  "dark-strawberry": "/images/menu/sweet/strawberry-milk-choco.webp",
  "dark-cherry": "/images/menu/vegan/dark-cherry.webp",
  "maple-fruit-crunch": "/images/menu/breakfast/maple-pancakes.webp",
  "dark-mango": "/images/menu/sweet/mango-vanilla-white.webp",
  "italian-prosciutto":
    "/images/menu/savory/italian-prosciutto.webp",
  "smoky-forest": "/images/menu/savory/smoky-forest.webp",
  "the-spicy-one": "/images/menu/savory/smoky-forest.webp",
  "taste-of-greece": "/images/menu/savory/smoky-forest.webp",
  "taste-of-italy": "/images/menu/savory/taste-of-italy.webp",
  "smoked-salmon": "/images/menu/breakfast/avo-salmon-toast.webp",
  "pesto-prosciutto":
    "/images/menu/breakfast/avo-prosciutto-toast.webp",
};

export function getCategoryHeroImage(slug: string) {
  return categoryHeroImages[slug];
}

export function getProductImageFallback(slug: string) {
  return productImageFallbacks[slug];
}
