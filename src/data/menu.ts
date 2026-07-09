export type MenuProduct = {
  name: string;
  description: string;
  price: number;
  image: string;

  badge?: string;

  popular?: boolean;
  spicy?: boolean;
 vegan?: boolean;
  glutenFree?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  image: string;
  products: MenuProduct[];
};

export const menu: MenuCategory[] = [
  {
  id: "breakfast",
  title: "Breakfast",
  image: "/images/categories/breakfast.jpg",
  products: [
    {
      name: "Waffle Benedict",
      description:
        "Waffle, prosciutto, baby spinach, poached egg, hollandaise sauce.",
      price: 1030,
      image: "/images/menu/breakfast/waffle-benedict.jpg",
      badge: "Signature",
      popular: true,
    },

    {
      name: "Pistacchio Mortadella Brioche",
      description:
        "Brioche bread, pesto cream cheese, mortadella, mini mozzarella, pistachio cream, crushed pistachios.",
      price: 980,
      image: "/images/menu/breakfast/pistacchio-mortadella-brioche.jpg",
      badge: "New",
    },

    {
      name: "Avo & Prosciutto Toast",
      description:
        "Sourdough bread, avocado spread, cherry tomatoes, parmesan cheese, prosciutto, poached egg.",
      price: 1190,
      image: "/images/menu/breakfast/avo-prosciutto-toast.jpg",
      popular: true,
    },

    {
      name: "Avo & Salmon Toast",
      description:
        "Sourdough bread, flavoured cream cheese, smoked salmon, sliced avocado, cherry tomatoes, dill.",
      price: 1290,
      image: "/images/menu/breakfast/avo-salmon-toast.jpg",
      badge: "Premium",
    },

    {
      name: "Caprese Toast",
      description:
        "Sourdough bread, pesto, mozzarella, cherry tomatoes, basil, balsamic glaze.",
      price: 790,
      image: "/images/menu/breakfast/caprese-toast.jpg",
    },

    {
      name: "Maple Pancakes",
      description:
        "American pancakes, maple syrup, butter, powdered sugar, seasonal fruit.",
      price: 860,
      image: "/images/menu/breakfast/maple-pancakes.jpg",
    },
  ],
},

  {
  id: "sweet-selection",
  title: "Sweet Selection",
  image: "/images/categories/sweet.jpg",
  products: [
    {
      name: "Alveto Classic",
      description:
        "Nutella, banana, Oreo crumbs, chocolate chips, vanilla ice cream.",
      price: 980,
      image: "/images/menu/sweet/alveto-classic.jpg",
      badge: "Signature",
      popular: true,
    },

    {
      name: "Bueno Strawberry",
      description:
        "Bueno chocolate, strawberries, Oreo crumbs.",
      price: 910,
      image: "/images/menu/sweet/bueno-strawberry.jpg",
    },

    {
      name: "Raspberry Caramel",
      description:
        "Caramel, white chocolate, raspberries, Plazma biscuit, vanilla ice cream.",
      price: 1080,
      image: "/images/menu/sweet/raspberry-caramel.jpg",
      popular: true,
    },

    {
      name: "Dubai Pistachio",
      description:
        "Pistachio chocolate, milk chocolate, kadaif, crushed pistachio.",
      price: 1110,
      image: "/images/menu/sweet/dubai-pistachio.jpg",
      badge: "New",
    },


    {
      name: "Strawberry Milk Choco",
      description:
        "Strawberry filling, milk chocolate, Oreo crumbs, chocolate chips, vanilla ice cream.",
      price: 980,
      image: "/images/menu/sweet/strawberry-milk-choco.jpg",
    },

    {
      name: "Bueno Berry",
      description:
        "Raspberry filling, Bueno chocolate, white chocolate, Oreo crumbs, Bueno ice cream.",
      price: 1090,
      image: "/images/menu/sweet/bueno-berry.jpg",
    },

    {
      name: "Mango Vanilla White",
      description:
        "Mango filling, vanilla cream, white chocolate, Plazma biscuit, white chocolate chips.",
      price: 1290,
      image: "/images/menu/sweet/mango-vanilla-white.jpg",
      badge: "Premium",
    },

    {
      name: "Cherry Vanilla White",
      description:
        "Sour cherry filling, vanilla cream, white chocolate, Plazma biscuit.",
      price: 1190,
      image: "/images/menu/sweet/cherry-vanilla-white.jpg",
    },

    {
      name: "Ferrero Hazelnut",
      description:
        "Ferrero chocolate, milk chocolate, strawberries, crushed hazelnut, chocolate ice cream.",
      price: 1180,
      image: "/images/menu/sweet/ferrero-hazelnut.jpg",
    },

    {
      name: "Raffaello Raspberry",
      description:
        "Raffaello chocolate, white chocolate, raspberries, coconut.",
      price: 1140,
      image: "/images/menu/sweet/raffaello-raspberry.jpg",
    },

    {
      name: "Pistachio Raspberry",
      description:
        "Pistachio chocolate, white chocolate, Plazma biscuit, white chocolate chips, raspberries.",
      price: 1140,
      image: "/images/menu/sweet/pistachio-raspberry.jpg",
    },

    {
      name: "White Cherry Crunch",
      description:
        "Sour cherry filling, white chocolate, white chocolate chips, Oreo crumbs, vanilla ice cream.",
      price: 1130,
      image: "/images/menu/sweet/white-cherry-crunch.jpg",
    },
  ],
},

  {
  id: "vegan-selection",
  title: "Vegan Flavor Selection",
  image: "/images/categories/vegan.jpg",
  products: [
    {
      name: "Dark Pear",
      description:
        "Pear filling, dark chocolate, crushed hazelnuts.",
      price: 910,
      image: "/images/menu/vegan/dark-pear.jpg",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Dark Raspberry Sorbet",
      description:
        "Dark chocolate, raspberries, crushed hazelnuts, raspberry sorbet.",
      price: 1090,
      image: "/images/menu/vegan/dark-raspberry-sorbet.jpg",
      badge: "Vegan",
      vegan: true,
      popular: true,
    },

    {
      name: "Dark Strawberry",
      description:
        "Dark chocolate, strawberries, vegan Plazma biscuit.",
      price: 890,
      image: "/images/menu/vegan/dark-strawberry.jpg",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Dark Cherry",
      description:
        "Dark chocolate, sour cherry filling, vegan Plazma biscuit.",
      price: 910,
      image: "/images/menu/vegan/dark-cherry.jpg",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Maple Fruit Crunch",
      description:
        "Maple syrup, seasonal fruit, crushed hazelnuts, powdered sugar.",
      price: 980,
      image: "/images/menu/vegan/maple-fruit-crunch.jpg",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Dark Mango",
      description:
        "Mango filling, dark chocolate, vegan Plazma biscuit.",
      price: 960,
      image: "/images/menu/vegan/dark-mango.jpg",
      badge: "Vegan",
      vegan: true,
    },
  ],
},

  {
  id: "savory-selection",
  title: "Savory Selection",
  image: "/images/categories/savory.jpg",
  products: [
    {
      name: "Italian Prosciutto",
      description:
        "Prosciutto, mozzarella, pesto cream cheese, arugula, cherry tomatoes, balsamic glaze.",
      price: 1170,
      image: "/images/menu/savory/italian-prosciutto.jpg",
      badge: "Popular",
      popular: true,
    },

    {
      name: "Smoky Forest",
      description:
        "Smoked pork loin, mushrooms, gouda, cream cheese, cherry tomatoes.",
      price: 910,
      image: "/images/menu/savory/smoky-forest.jpg",
    },

    {
      name: "The Spicy One",
      description:
        "Kulen sausage, gouda, chili sauce, pickles, sweet corn, tartar sauce.",
      price: 930,
      image: "/images/menu/savory/the-spicy-one.jpg",
      badge: "Spicy",
      spicy: true,
    },

    {
      name: "Taste of Greece",
      description:
        "Smoked pork loin, feta cheese, cream cheese, olives, cherry tomatoes, baby spinach, oregano.",
      price: 940,
      image: "/images/menu/savory/taste-of-greece.jpg",
    },

    {
      name: "Taste of Italy",
      description:
        "Mortadella, mozzarella, pesto cream cheese, arugula, crushed pistachios, cherry tomatoes.",
      price: 1090,
      image: "/images/menu/savory/taste-of-italy.jpg",
      badge: "Signature",
    },

    {
      name: "Smoked Salmon",
      description:
        "Smoked salmon, cream cheese, dill, cherry tomatoes.",
      price: 1170,
      image: "/images/menu/savory/smoked-salmon.jpg",
      badge: "Premium",
      popular: true,
    },

    {
      name: "Pesto Prosciutto",
      description:
        "Prosciutto, arugula, baby spinach, pesto cream cheese, parmesan, cherry tomatoes.",
      price: 1090,
      image: "/images/menu/savory/pesto-prosciutto.jpg",
    },
  ],
},

  {
  id: "create-your-own",
  title: "Create Your Own",
  image: "/images/categories/create.jpg",
  products: [
    // BASE
    {
      name: "Waffle",
      description: "Base",
      price: 250,
      image: "/images/menu/create/waffle.jpg",
    },
    {
      name: "Crepe",
      description: "Base",
      price: 250,
      image: "/images/menu/create/crepe.jpg",
    },
    {
      name: "American Pancakes",
      description: "Base",
      price: 250,
      image: "/images/menu/create/american-pancakes.jpg",
    },
    {
      name: "Mini Pancakes",
      description: "Base",
      price: 170,
      image: "/images/menu/create/mini-pancakes.jpg",
    },

    // CREAMS & CHOCOLATES
    {
      name: "Nutella",
      description: "Cream & Chocolate",
      price: 340,
      image: "/images/menu/create/nutella.jpg",
    },
    {
      name: "Bueno Chocolate",
      description: "Cream & Chocolate",
      price: 240,
      image: "/images/menu/create/bueno.jpg",
    },
    {
      name: "Pistachio Chocolate",
      description: "Cream & Chocolate",
      price: 360,
      image: "/images/menu/create/pistachio.jpg",
    },
    {
      name: "Ferrero Chocolate",
      description: "Cream & Chocolate",
      price: 290,
      image: "/images/menu/create/ferrero.jpg",
    },
    {
      name: "White Chocolate",
      description: "Cream & Chocolate",
      price: 240,
      image: "/images/menu/create/white-chocolate.jpg",
    },
    {
      name: "Milk Chocolate",
      description: "Cream & Chocolate",
      price: 230,
      image: "/images/menu/create/milk-chocolate.jpg",
    },
    {
      name: "Dark Chocolate",
      description: "Cream & Chocolate",
      price: 290,
      image: "/images/menu/create/dark-chocolate.jpg",
    },
    {
      name: "Crunchy White Chocolate",
      description: "Cream & Chocolate",
      price: 280,
      image: "/images/menu/create/crunchy-white.jpg",
    },
    {
      name: "Caramel",
      description: "Cream & Chocolate",
      price: 340,
      image: "/images/menu/create/caramel.jpg",
    },
    {
      name: "Vanilla Cream",
      description: "Cream & Chocolate",
      price: 290,
      image: "/images/menu/create/vanilla-cream.jpg",
    },
    {
      name: "Whipped Cream",
      description: "Cream & Chocolate",
      price: 140,
      image: "/images/menu/create/whipped-cream.jpg",
    },

    // FRESH FRUIT
    {
      name: "Strawberries",
      description: "Fresh Fruit",
      price: 280,
      image: "/images/menu/create/strawberries.jpg",
    },
    {
      name: "Raspberries",
      description: "Fresh Fruit",
      price: 310,
      image: "/images/menu/create/raspberries.jpg",
    },
    {
      name: "Banana",
      description: "Fresh Fruit",
      price: 120,
      image: "/images/menu/create/banana.jpg",
    },

    // FRUIT FILLINGS
    {
      name: "Sour Cherry Filling",
      description: "Fruit Filling",
      price: 310,
      image: "/images/menu/create/sour-cherry.jpg",
    },
    {
      name: "Pear Filling",
      description: "Fruit Filling",
      price: 370,
      image: "/images/menu/create/pear.jpg",
    },
    {
      name: "Mango Filling",
      description: "Fruit Filling",
      price: 380,
      image: "/images/menu/create/mango.jpg",
    },
    {
      name: "Strawberry Filling",
      description: "Fruit Filling",
      price: 210,
      image: "/images/menu/create/strawberry-filling.jpg",
    },
    {
      name: "Raspberry Filling",
      description: "Fruit Filling",
      price: 210,
      image: "/images/menu/create/raspberry-filling.jpg",
    },
    {
      name: "Maple Syrup",
      description: "Fruit Filling",
      price: 320,
      image: "/images/menu/create/maple-syrup.jpg",
    },
    {
      name: "Honey",
      description: "Fruit Filling",
      price: 190,
      image: "/images/menu/create/honey.jpg",
    },

    // TOPPINGS
    {
      name: "Plazma Biscuit",
      description: "Topping",
      price: 130,
      image: "/images/menu/create/plazma.jpg",
    },
    {
      name: "Oreo Crumbs",
      description: "Topping",
      price: 120,
      image: "/images/menu/create/oreo.jpg",
    },
    {
      name: "Chocolate Chips",
      description: "Topping",
      price: 150,
      image: "/images/menu/create/choco-chips.jpg",
    },
    {
      name: "White Chocolate Chips",
      description: "Topping",
      price: 150,
      image: "/images/menu/create/white-chips.jpg",
    },
    {
      name: "Crushed Pistachios",
      description: "Topping",
      price: 150,
      image: "/images/menu/create/pistachios.jpg",
    },
    {
      name: "Crushed Hazelnuts",
      description: "Topping",
      price: 130,
      image: "/images/menu/create/hazelnuts.jpg",
    },
    {
      name: "Crushed Walnuts",
      description: "Topping",
      price: 110,
      image: "/images/menu/create/walnuts.jpg",
    },
    {
      name: "Kadaif",
      description: "Topping",
      price: 130,
      image: "/images/menu/create/kadaif.jpg",
    },
    {
      name: "Coconut",
      description: "Topping",
      price: 110,
      image: "/images/menu/create/coconut.jpg",
    },
    {
      name: "Vegan Plazma Biscuit",
      description: "Topping",
      price: 130,
      image: "/images/menu/create/vegan-plazma.jpg",
    },

    // ICE CREAM
    {
      name: "Vanilla Ice Cream",
      description: "Ice Cream",
      price: 180,
      image: "/images/menu/create/vanilla-ice-cream.jpg",
    },
    {
      name: "Chocolate Ice Cream",
      description: "Ice Cream",
      price: 180,
      image: "/images/menu/create/chocolate-ice-cream.jpg",
    },
    {
      name: "Bueno Ice Cream",
      description: "Ice Cream",
      price: 180,
      image: "/images/menu/create/bueno-ice-cream.jpg",
    },
    {
      name: "Raspberry Sorbet",
      description: "Sorbet",
      price: 220,
      image: "/images/menu/create/raspberry-sorbet.jpg",
    },
    {
      name: "Strawberries with Whipped Cream",
      description: "Dessert",
      price: 490,
      image: "/images/menu/create/strawberries-whipped.jpg",
    },
  // --------------------
// SAVORY BUILDER
// --------------------

{
  name: "Mozzarella",
  description: "Cheese",
  price: 260,
  image: "",
},
{
  name: "Gouda",
  description: "Cheese",
  price: 220,
  image: "",
},
{
  name: "Feta",
  description: "Cheese",
  price: 240,
  image: "",
},
{
  name: "Parmesan",
  description: "Cheese",
  price: 290,
  image: "",
},
{
  name: "Cream Cheese",
  description: "Cheese",
  price: 220,
  image: "",
},

{
  name: "Prosciutto",
  description: "Meat",
  price: 390,
  image: "",
},
{
  name: "Mortadella",
  description: "Meat",
  price: 360,
  image: "",
},
{
  name: "Smoked Ham",
  description: "Meat",
  price: 320,
  image: "",
},
{
  name: "Smoked Salmon",
  description: "Meat",
  price: 520,
  image: "",
},

{
  name: "Baby Spinach",
  description: "Vegetables",
  price: 120,
  image: "",
},
{
  name: "Arugula",
  description: "Vegetables",
  price: 140,
  image: "",
},
{
  name: "Cherry Tomatoes",
  description: "Vegetables",
  price: 140,
  image: "",
},
{
  name: "Corn",
  description: "Vegetables",
  price: 110,
  image: "",
},
{
  name: "Mushrooms",
  description: "Vegetables",
  price: 150,
  image: "",
},
{
  name: "Pickles",
  description: "Vegetables",
  price: 120,
  image: "",
},

{
  name: "Pesto",
  description: "Sauces",
  price: 140,
  image: "",
},
{
  name: "Hollandaise",
  description: "Sauces",
  price: 160,
  image: "",
},
{
  name: "Tartar",
  description: "Sauces",
  price: 120,
  image: "",
},
{
  name: "Chili",
  description: "Sauces",
  price: 120,
  image: "",
},

{
  name: "Poached Egg",
  description: "Extras",
  price: 180,
  image: "",
},
{
  name: "Mini Mozzarella",
  description: "Extras",
  price: 190,
  image: "",
},
{
  name: "Crushed Pistachio",
  description: "Extras",
  price: 160,
  image: "",
},],
},

  

 {
  id: "coffee-beverages",
  title: "Coffee & Beverages",
  image: "/images/categories/coffee.jpg",
  products: [
    {
      name: "Espresso",
      description: "Classic Italian espresso.",
      price: 270,
      image: "",
    },
    {
      name: "Espresso Doppio",
      description: "Double espresso.",
      price: 330,
      image: "",
    },
    {
      name: "Espresso Macchiato",
      description: "Espresso with milk foam.",
      price: 310,
      image: "",
    },
    {
      name: "Americano",
      description: "Espresso with hot water.",
      price: 270,
      image: "",
    },
    {
      name: "Cappuccino",
      description: "Espresso, steamed milk and milk foam.",
      price: 340,
      image: "",
    },
    {
      name: "Latte Macchiato",
      description: "Espresso with steamed milk.",
      price: 390,
      image: "",
    },
    {
      name: "Mocha",
      description: "Espresso, chocolate and milk.",
      price: 390,
      image: "",
    },
    {
      name: "Espresso Freddo",
      description: "Iced espresso.",
      price: 350,
      image: "",
    },
    {
      name: "Cappuccino Freddo",
      description: "Iced cappuccino.",
      price: 420,
      image: "",
    },
    {
      name: "Iced Latte",
      description: "Espresso with cold milk and ice.",
      price: 390,
      image: "",
    },
    {
      name: "Iced Coffee",
      description: "Cold coffee with ice.",
      price: 480,
      image: "",
    },
    {
      name: "Matcha",
      description: "Japanese matcha tea.",
      price: 435,
      image: "",
    },
    {
      name: "Matcha + Flavor",
      description: "Strawberry, Mango, Passion Fruit, Peach or Raspberry.",
      price: 485,
      image: "",
    },
    {
      name: "Matcha Affogato",
      description: "Matcha served with vanilla ice cream.",
      price: 475,
      image: "",
    },
    {
      name: "Affogato",
      description: "Espresso with vanilla ice cream.",
      price: 440,
      image: "",
    },
    {
      name: "Black Coffee",
      description: "Traditional domestic coffee.",
      price: 265,
      image: "",
    },
    {
      name: "Hot Chocolate",
      description: "Rich hot chocolate.",
      price: 390,
      image: "",
    },
    {
      name: "Hot Chocolate + Plazma / Whipped Cream",
      description: "Add Plazma biscuit or whipped cream.",
      price: 440,
      image: "",
    },
    {
      name: "Tea",
      description: "Selection of premium teas.",
      price: 280,
      image: "",
    },
  ],
},

  {
  id: "water",
  title: "Water",
  image: "/images/categories/water.jpg",
  products: [
    {
      name: "Rosa",
      description: "0.33L",
      price: 290,
      image: "",
    },
    {
      name: "Rosa",
      description: "0.75L",
      price: 490,
      image: "",
    },
    {
      name: "Knjaz Miloš",
      description: "0.25L",
      price: 290,
      image: "",
    },
    {
      name: "Knjaz Miloš",
      description: "0.75L",
      price: 490,
      image: "",
    },
    {
      name: "San Pellegrino",
      description: "0.25L",
      price: 390,
      image: "",
    },
    {
      name: "San Pellegrino",
      description: "0.75L",
      price: 690,
      image: "",
    },
    {
      name: "Acqua Panna",
      description: "0.25L",
      price: 390,
      image: "",
    },
    {
      name: "Acqua Panna",
      description: "0.75L",
      price: 690,
      image: "",
    },
  ],
},

  {
  id: "soft-drinks",
  title: "Soft Drinks",
  image: "/images/categories/soft-drinks.jpg",
  products: [
    {
      name: "Coca-Cola",
      description: "0.25L",
      price: 340,
      image: "",
    },
    {
      name: "Coca-Cola Zero",
      description: "0.25L",
      price: 340,
      image: "",
    },
    {
      name: "Fanta Orange",
      description: "0.25L",
      price: 340,
      image: "",
    },
    {
      name: "Sprite",
      description: "0.25L",
      price: 340,
      image: "",
    },
    {
      name: "Schweppes Tonic",
      description: "0.25L",
      price: 340,
      image: "",
    },
    {
      name: "Schweppes Bitter Lemon",
      description: "0.25L",
      price: 340,
      image: "",
    },
    {
      name: "Schweppes Tangerine",
      description: "0.25L",
      price: 340,
      image: "",
    },
    {
      name: "Fuze Tea Peach",
      description: "0.25L",
      price: 360,
      image: "",
    },
    {
      name: "Fuze Tea Lemon",
      description: "0.25L",
      price: 360,
      image: "",
    },
    {
      name: "Next Orange",
      description: "0.20L",
      price: 360,
      image: "",
    },
    {
      name: "Next Apple",
      description: "0.20L",
      price: 360,
      image: "",
    },
    {
      name: "Next Peach",
      description: "0.20L",
      price: 360,
      image: "",
    },
  ],
},

  {
  id: "fresh-juices",
  title: "Fresh Juices",
  image: "/images/categories/fresh-juices.jpg",
  products: [
    {
      name: "Orange",
      description: "Freshly squeezed orange juice.",
      price: 520,
      image: "",
    },
    {
      name: "Apple",
      description: "Freshly pressed apple juice.",
      price: 520,
      image: "",
    },
    {
      name: "Carrot",
      description: "Fresh carrot juice.",
      price: 490,
      image: "",
    },
    {
      name: "Orange & Apple",
      description: "Fresh juice blend.",
      price: 540,
      image: "",
    },
    {
      name: "Orange & Carrot",
      description: "Fresh juice blend.",
      price: 540,
      image: "",
    },
    {
      name: "Apple & Carrot",
      description: "Fresh juice blend.",
      price: 540,
      image: "",
    },
    {
      name: "Orange, Apple & Carrot",
      description: "Fresh juice blend.",
      price: 560,
      image: "",
    },
  ],
},

  {
  id: "beer",
  title: "Beer",
  image: "/images/categories/beer.jpg",
  products: [
    {
      name: "Heineken",
      description: "0.33L",
      price: 430,
      image: "",
    },
    {
      name: "Corona Extra",
      description: "0.35L",
      price: 490,
      image: "",
    },
    {
      name: "Budweiser Budvar",
      description: "0.33L",
      price: 430,
      image: "",
    },
    {
      name: "Hoegaarden",
      description: "0.33L",
      price: 490,
      image: "",
    },
    {
      name: "Guinness",
      description: "0.44L",
      price: 590,
      image: "",
    },
    {
      name: "Heineken 0.0",
      description: "Non-alcoholic · 0.33L",
      price: 430,
      image: "",
    },
  ],
},

  {
  id: "spirits",
  title: "Spirits",
  image: "/images/categories/spirits.jpg",
  products: [
    {
      name: "Jack Daniel's",
      description: "Whisky • 0.03L",
      price: 460,
      image: "",
    },
    {
      name: "Jameson",
      description: "Whisky • 0.03L",
      price: 420,
      image: "",
    },
    {
      name: "Johnnie Walker Black Label",
      description: "Whisky • 0.03L",
      price: 480,
      image: "",
    },
    {
      name: "Chivas Regal",
      description: "Whisky • 0.03L",
      price: 490,
      image: "",
    },
    {
      name: "Martell VS",
      description: "Cognac • 0.03L",
      price: 480,
      image: "",
    },
    {
      name: "Bombay Sapphire",
      description: "Gin • 0.03L",
      price: 340,
      image: "",
    },
    {
      name: "Hendrick's",
      description: "Gin • 0.03L",
      price: 460,
      image: "",
    },
    {
      name: "Finlandia",
      description: "Vodka • 0.03L",
      price: 360,
      image: "",
    },
    {
      name: "Absolut Blue",
      description: "Vodka • 0.03L",
      price: 280,
      image: "",
    },
    {
      name: "Olmeca Blanco",
      description: "Tequila • 0.03L",
      price: 340,
      image: "",
    },
    {
      name: "Olmeca Gold Añejo",
      description: "Tequila • 0.03L",
      price: 340,
      image: "",
    },
    {
      name: "Jägermeister",
      description: "Liqueur • 0.03L",
      price: 390,
      image: "",
    },
    {
      name: "Gorki List",
      description: "Aperitif • 0.03L",
      price: 340,
      image: "",
    },
    {
      name: "Bacardi Carta Blanca",
      description: "Rum • 0.03L",
      price: 380,
      image: "",
    },
    {
      name: "Baileys",
      description: "Cream Liqueur • 0.05L",
      price: 430,
      image: "",
    },
    {
      name: "Amaretto",
      description: "Liqueur • 0.05L",
      price: 360,
      image: "",
    },
    {
      name: "Martini Bianco",
      description: "Vermouth • 0.05L",
      price: 340,
      image: "",
    },
    {
      name: "Martini Rosso",
      description: "Vermouth • 0.05L",
      price: 450,
      image: "",
    },
    {
      name: "Šljiva Bojkovčanka 5g",
      description: "Plum Brandy 5YO • 0.03L",
      price: 360,
      image: "",
    },
    {
      name: "Šljiva Bojkovčanka 10g",
      description: "Plum Brandy 10YO • 0.03L",
      price: 590,
      image: "",
    },
    {
      name: "Dunja Bojkovčanka",
      description: "Quince Brandy • 0.03L",
      price: 360,
      image: "",
    },
    {
      name: "Vilijamovka Bojkovčanka",
      description: "Williams Pear Brandy • 0.03L",
      price: 380,
      image: "",
    },
    {
      name: "Višnja",
      description: "Sour Cherry Brandy • 0.03L",
      price: 320,
      image: "",
    },
    {
      name: "Meduška",
      description: "Honey Brandy • 0.03L",
      price: 320,
      image: "",
    },
  ],
},
{
  id: "wine",
  title: "Wine",
  image: "/images/categories/wine.jpg",
  products: [
    {
      name: "Matali Terasa Chardonnay",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 580,
      image: "",
    },
    {
      name: "Matali Kremen",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 720,
      image: "",
    },
    {
      name: "Matali Sauvignon Blanc",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 540,
      image: "",
    },
    {
      name: "Matali Rose Dušica",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 450,
      image: "",
    },
    {
      name: "Matali Bukovski Rosé",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 780,
      image: "",
    },
    {
      name: "Matali Crna Tamjanika Rosé",
      description: "Glass 0.125L / Bottle 0.50L",
      price: 720,
      image: "",
    },
    {
      name: "Prosecco Borgoluce Lampo",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 520,
      image: "",
    },
  ],
},


 {
  id: "cocktails",
  title: "Cocktails",
  image: "/images/categories/cocktails.jpg",
  products: [
    {
      name: "Aperol Spritz",
      description: "Aperol, Prosecco, Sparkling Water",
      price: 790,
      image: "",
      popular: true,
    },
    {
      name: "Hugo Spritz",
      description: "St. Germain, Prosecco, Sparkling Water, Mint",
      price: 790,
      image: "",
    },
    {
      name: "Negroni",
      description: "Gin, Campari, Martini Rosso",
      price: 790,
      image: "",
    },
    {
      name: "Whiskey Sour",
      description: "Whiskey, Lemon Juice, Sugar Syrup",
      price: 790,
      image: "",
    },
    {
      name: "Mojito",
      description: "White Rum, Lime, Mint, Sugar, Soda",
      price: 790,
      image: "",
    },
    {
      name: "Pornstar Martini",
      description: "Vanilla Vodka, Passion Fruit, Lime",
      price: 850,
      image: "",
      badge: "Signature",
    },
    {
      name: "Espresso Martini",
      description: "Vodka, Espresso, Coffee Liqueur",
      price: 850,
      image: "",
      popular: true,
    },
    {
      name: "Gin Basil Smash",
      description: "Gin, Basil, Lemon, Sugar",
      price: 820,
      image: "",
    },
    {
      name: "Margarita",
      description: "Tequila, Triple Sec, Lime",
      price: 790,
      image: "",
    },
    {
      name: "Paloma",
      description: "Tequila, Grapefruit, Lime, Soda",
      price: 790,
      image: "",
    },
    {
      name: "Cosmopolitan",
      description: "Vodka, Triple Sec, Cranberry",
      price: 790,
      image: "",
    },
    {
      name: "Old Fashioned",
      description: "Bourbon, Sugar, Angostura Bitters",
      price: 850,
      image: "",
    },
  ],
},
];