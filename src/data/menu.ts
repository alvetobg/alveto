export type MenuProduct = {
  name: string;
  description: string;
  price: number;
  image?: string;

  badge?: string;

  popular?: boolean;
  spicy?: boolean;
 vegan?: boolean;
  glutenFree?: boolean;
};

export type MenuCategory = {
  id: string;
  title: string;
  image?: string;
  products: MenuProduct[];
};

export const menu: MenuCategory[] = [
  {
  id: "breakfast",
  title: "Breakfast",
  image: "/images/menu-hero.webp",
  products: [
    {
      name: "Waffle Benedict",
      description:
        "Waffle, prosciutto, baby spinach, poached egg, hollandaise sauce.",
      price: 1030,
      image: "/images/menu/breakfast/waffle-benedict.webp",
      badge: "Signature",
      popular: true,
    },

    {
      name: "Pistacchio Mortadella Brioche",
      description:
        "Brioche bread, pesto cream cheese, mortadella, mini mozzarella, pistachio cream, crushed pistachios.",
      price: 980,
      image: "/images/menu/breakfast/pistacchio-mortadella-brioche.webp",
      badge: "New",
    },

    {
      name: "Avo & Prosciutto Toast",
      description:
        "Sourdough bread, avocado spread, cherry tomatoes, parmesan cheese, prosciutto, poached egg.",
      price: 1190,
      image: "/images/menu/breakfast/avo-prosciutto-toast.webp",
      popular: true,
    },

    {
      name: "Avo & Salmon Toast",
      description:
        "Sourdough bread, flavoured cream cheese, smoked salmon, sliced avocado, cherry tomatoes, dill.",
      price: 1290,
      image: "/images/menu/breakfast/avo-salmon-toast.webp",
      badge: "Premium",
    },

    {
      name: "Caprese Toast",
      description:
        "Sourdough bread, pesto, mozzarella, cherry tomatoes, basil, balsamic glaze.",
      price: 790,
      image: "/images/menu/breakfast/caprese-toast.webp",
    },

    {
      name: "Maple Pancakes",
      description:
        "American pancakes, maple syrup, butter, powdered sugar, seasonal fruit.",
      price: 860,
      image: "/images/menu/breakfast/maple-pancakes.webp",
    },
  ],
},

  {
  id: "sweet-selection",
  title: "Sweet Selection",
  image: "/images/categories/sweet.webp",
  products: [
    {
      name: "Alveto Classic",
      description:
        "Nutella, banana, Oreo crumbs, chocolate chips, vanilla ice cream.",
      price: 980,
      image: "/images/menu/sweet/alveto-classic.webp",
      badge: "Signature",
      popular: true,
    },

    {
      name: "Bueno Strawberry",
      description:
        "Bueno chocolate, strawberries, Oreo crumbs.",
      price: 910,
      image: "/images/menu/sweet/bueno-strawberry.webp",
    },

    {
      name: "Raspberry Caramel",
      description:
        "Caramel, white chocolate, raspberries, Plazma biscuit, vanilla ice cream.",
      price: 1080,
      image: "/images/menu/sweet/raspberry-caramel.webp",
      popular: true,
    },

    {
      name: "Dubai Pistachio",
      description:
        "Pistachio chocolate, milk chocolate, kadaif, crushed pistachio.",
      price: 1110,
      image: "/images/menu/sweet/dubai-pistachio.webp",
      badge: "New",
    },


    {
      name: "Strawberry Milk Choco",
      description:
        "Strawberry filling, milk chocolate, Oreo crumbs, chocolate chips, vanilla ice cream.",
      price: 980,
      image: "/images/menu/sweet/strawberry-milk-choco.webp",
    },

    {
      name: "Bueno Berry",
      description:
        "Raspberry filling, Bueno chocolate, white chocolate, Oreo crumbs, Bueno ice cream.",
      price: 1090,
      image: "/images/menu/sweet/bueno-berry.webp",
    },

    {
      name: "Mango Vanilla White",
      description:
        "Mango filling, vanilla cream, white chocolate, Plazma biscuit, white chocolate chips.",
      price: 1290,
      image: "/images/menu/sweet/mango-vanilla-white.webp",
      badge: "Premium",
    },

    {
      name: "Cherry Vanilla White",
      description:
        "Sour cherry filling, vanilla cream, white chocolate, Plazma biscuit.",
      price: 1190,
      image: "/images/menu/sweet/cherry-vanilla-white.webp",
    },

    {
      name: "Ferrero Hazelnut",
      description:
        "Ferrero chocolate, milk chocolate, strawberries, crushed hazelnut, chocolate ice cream.",
      price: 1180,
      image: "/images/menu/sweet/ferrero-hazelnut.webp",
    },

    {
      name: "Raffaello Raspberry",
      description:
        "Raffaello chocolate, white chocolate, raspberries, coconut.",
      price: 1140,
      image: "/images/menu/sweet/raffaello-raspberry.webp",
    },

    {
      name: "Pistachio Raspberry",
      description:
        "Pistachio chocolate, white chocolate, Plazma biscuit, white chocolate chips, raspberries.",
      price: 1140,
      image: "/images/menu/sweet/pistachio-raspberry.webp",
    },

    {
      name: "White Cherry Crunch",
      description:
        "Sour cherry filling, white chocolate, white chocolate chips, Oreo crumbs, vanilla ice cream.",
      price: 1130,
      image: "/images/menu/sweet/cherry-vanilla-white.webp",
    },
  ],
},

  {
  id: "vegan-selection",
  title: "Vegan Flavor Selection",
  image: "/images/categories/vegan.webp",
  products: [
    {
      name: "Dark Pear",
      description:
        "Pear filling, dark chocolate, crushed hazelnuts.",
      price: 910,
      image: "/images/menu/vegan/dark-cherry.webp",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Dark Raspberry Sorbet",
      description:
        "Dark chocolate, raspberries, crushed hazelnuts, raspberry sorbet.",
      price: 1090,
      image: "/images/menu/vegan/dark-cherry.webp",
      badge: "Vegan",
      vegan: true,
      popular: true,
    },

    {
      name: "Dark Strawberry",
      description:
        "Dark chocolate, strawberries, vegan Plazma biscuit.",
      price: 890,
      image: "/images/menu/sweet/strawberry-milk-choco.webp",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Dark Cherry",
      description:
        "Dark chocolate, sour cherry filling, vegan Plazma biscuit.",
      price: 910,
      image: "/images/menu/vegan/dark-cherry.webp",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Maple Fruit Crunch",
      description:
        "Maple syrup, seasonal fruit, crushed hazelnuts, powdered sugar.",
      price: 980,
      image: "/images/menu/breakfast/maple-pancakes.webp",
      badge: "Vegan",
      vegan: true,
    },

    {
      name: "Dark Mango",
      description:
        "Mango filling, dark chocolate, vegan Plazma biscuit.",
      price: 960,
      image: "/images/menu/sweet/mango-vanilla-white.webp",
      badge: "Vegan",
      vegan: true,
    },
  ],
},

  {
  id: "savory-selection",
  title: "Savory Selection",
  image: "/images/categories/savory.webp",
  products: [
    {
      name: "Italian Prosciutto",
      description:
        "Prosciutto, mozzarella, pesto cream cheese, arugula, cherry tomatoes, balsamic glaze.",
      price: 1170,
      image: "/images/menu/savory/italian-prosciutto.webp",
      badge: "Popular",
      popular: true,
    },

    {
      name: "Smoky Forest",
      description:
        "Smoked pork loin, mushrooms, gouda, cream cheese, cherry tomatoes.",
      price: 910,
      image: "/images/menu/savory/smoky-forest.webp",
    },

    {
      name: "The Spicy One",
      description:
        "Kulen sausage, gouda, chili sauce, pickles, sweet corn, tartar sauce.",
      price: 930,
      image: "/images/menu/savory/smoky-forest.webp",
      badge: "Spicy",
      spicy: true,
    },

    {
      name: "Taste of Greece",
      description:
        "Smoked pork loin, feta cheese, cream cheese, olives, cherry tomatoes, baby spinach, oregano.",
      price: 940,
      image: "/images/menu/savory/smoky-forest.webp",
    },

    {
      name: "Taste of Italy",
      description:
        "Mortadella, mozzarella, pesto cream cheese, arugula, crushed pistachios, cherry tomatoes.",
      price: 1090,
      image: "/images/menu/savory/taste-of-italy.webp",
      badge: "Signature",
    },

    {
      name: "Smoked Salmon",
      description:
        "Smoked salmon, cream cheese, dill, cherry tomatoes.",
      price: 1170,
      image: "/images/menu/breakfast/avo-salmon-toast.webp",
      badge: "Premium",
      popular: true,
    },

    {
      name: "Pesto Prosciutto",
      description:
        "Prosciutto, arugula, baby spinach, pesto cream cheese, parmesan, cherry tomatoes.",
      price: 1090,
      image: "/images/menu/breakfast/avo-prosciutto-toast.webp",
    },
  ],
},

  {
  id: "create-your-own",
  title: "Create Your Own",
  image: "/images/categories/create.webp",
  products: [
    // BASE
    {
      name: "Waffle",
      description: "Base",
      price: 250,
      image: undefined,
    },
    {
      name: "Crepe",
      description: "Base",
      price: 250,
      image: undefined,
    },
    {
      name: "American Pancakes",
      description: "Base",
      price: 250,
      image: undefined,
    },
    {
      name: "Mini Pancakes",
      description: "Base",
      price: 170,
      image: undefined,
    },

    // CREAMS & CHOCOLATES
    {
      name: "Nutella",
      description: "Cream & Chocolate",
      price: 340,
      image: undefined,
    },
    {
      name: "Bueno Chocolate",
      description: "Cream & Chocolate",
      price: 240,
      image: undefined,
    },
    {
      name: "Pistachio Chocolate",
      description: "Cream & Chocolate",
      price: 360,
      image: undefined,
    },
    {
      name: "Ferrero Chocolate",
      description: "Cream & Chocolate",
      price: 290,
      image: undefined,
    },
    {
      name: "White Chocolate",
      description: "Cream & Chocolate",
      price: 240,
      image: undefined,
    },
    {
      name: "Milk Chocolate",
      description: "Cream & Chocolate",
      price: 230,
      image: undefined,
    },
    {
      name: "Dark Chocolate",
      description: "Cream & Chocolate",
      price: 290,
      image: undefined,
    },
    {
      name: "Crunchy White Chocolate",
      description: "Cream & Chocolate",
      price: 280,
      image: undefined,
    },
    {
      name: "Caramel",
      description: "Cream & Chocolate",
      price: 340,
      image: undefined,
    },
    {
      name: "Vanilla Cream",
      description: "Cream & Chocolate",
      price: 290,
      image: undefined,
    },
    {
      name: "Whipped Cream",
      description: "Cream & Chocolate",
      price: 140,
      image: undefined,
    },

    // FRESH FRUIT
    {
      name: "Strawberries",
      description: "Fresh Fruit",
      price: 280,
      image: undefined,
    },
    {
      name: "Raspberries",
      description: "Fresh Fruit",
      price: 310,
      image: undefined,
    },
    {
      name: "Banana",
      description: "Fresh Fruit",
      price: 120,
      image: undefined,
    },

    // FRUIT FILLINGS
    {
      name: "Sour Cherry Filling",
      description: "Fruit Filling",
      price: 310,
      image: undefined,
    },
    {
      name: "Pear Filling",
      description: "Fruit Filling",
      price: 370,
      image: undefined,
    },
    {
      name: "Mango Filling",
      description: "Fruit Filling",
      price: 380,
      image: undefined,
    },
    {
      name: "Strawberry Filling",
      description: "Fruit Filling",
      price: 210,
      image: undefined,
    },
    {
      name: "Raspberry Filling",
      description: "Fruit Filling",
      price: 210,
      image: undefined,
    },
    {
      name: "Maple Syrup",
      description: "Fruit Filling",
      price: 320,
      image: undefined,
    },
    {
      name: "Honey",
      description: "Fruit Filling",
      price: 190,
      image: undefined,
    },

    // TOPPINGS
    {
      name: "Plazma Biscuit",
      description: "Topping",
      price: 130,
      image: undefined,
    },
    {
      name: "Oreo Crumbs",
      description: "Topping",
      price: 120,
      image: undefined,
    },
    {
      name: "Chocolate Chips",
      description: "Topping",
      price: 150,
      image: undefined,
    },
    {
      name: "White Chocolate Chips",
      description: "Topping",
      price: 150,
      image: undefined,
    },
    {
      name: "Crushed Pistachios",
      description: "Topping",
      price: 150,
      image: undefined,
    },
    {
      name: "Crushed Hazelnuts",
      description: "Topping",
      price: 130,
      image: undefined,
    },
    {
      name: "Crushed Walnuts",
      description: "Topping",
      price: 110,
      image: undefined,
    },
    {
      name: "Kadaif",
      description: "Topping",
      price: 130,
      image: undefined,
    },
    {
      name: "Coconut",
      description: "Topping",
      price: 110,
      image: undefined,
    },
    {
      name: "Vegan Plazma Biscuit",
      description: "Topping",
      price: 130,
      image: undefined,
    },

    // ICE CREAM
    {
      name: "Vanilla Ice Cream",
      description: "Ice Cream",
      price: 180,
      image: undefined,
    },
    {
      name: "Chocolate Ice Cream",
      description: "Ice Cream",
      price: 180,
      image: undefined,
    },
    {
      name: "Bueno Ice Cream",
      description: "Ice Cream",
      price: 180,
      image: undefined,
    },
    {
      name: "Raspberry Sorbet",
      description: "Sorbet",
      price: 220,
      image: undefined,
    },
    {
      name: "Strawberries with Whipped Cream",
      description: "Dessert",
      price: 490,
      image: undefined,
    },
  // --------------------
// SAVORY BUILDER
// --------------------

{
  name: "Mozzarella",
  description: "Cheese",
  price: 260,
  image: undefined,
},
{
  name: "Gouda",
  description: "Cheese",
  price: 220,
  image: undefined,
},
{
  name: "Feta",
  description: "Cheese",
  price: 240,
  image: undefined,
},
{
  name: "Parmesan",
  description: "Cheese",
  price: 290,
  image: undefined,
},
{
  name: "Cream Cheese",
  description: "Cheese",
  price: 220,
  image: undefined,
},

{
  name: "Prosciutto",
  description: "Meat",
  price: 390,
  image: undefined,
},
{
  name: "Mortadella",
  description: "Meat",
  price: 360,
  image: undefined,
},
{
  name: "Smoked Ham",
  description: "Meat",
  price: 320,
  image: undefined,
},
{
  name: "Smoked Salmon",
  description: "Meat",
  price: 520,
  image: undefined,
},

{
  name: "Baby Spinach",
  description: "Vegetables",
  price: 120,
  image: undefined,
},
{
  name: "Arugula",
  description: "Vegetables",
  price: 140,
  image: undefined,
},
{
  name: "Cherry Tomatoes",
  description: "Vegetables",
  price: 140,
  image: undefined,
},
{
  name: "Corn",
  description: "Vegetables",
  price: 110,
  image: undefined,
},
{
  name: "Mushrooms",
  description: "Vegetables",
  price: 150,
  image: undefined,
},
{
  name: "Pickles",
  description: "Vegetables",
  price: 120,
  image: undefined,
},

{
  name: "Pesto",
  description: "Sauces",
  price: 140,
  image: undefined,
},
{
  name: "Hollandaise",
  description: "Sauces",
  price: 160,
  image: undefined,
},
{
  name: "Tartar",
  description: "Sauces",
  price: 120,
  image: undefined,
},
{
  name: "Chili",
  description: "Sauces",
  price: 120,
  image: undefined,
},

{
  name: "Poached Egg",
  description: "Extras",
  price: 180,
  image: undefined,
},
{
  name: "Mini Mozzarella",
  description: "Extras",
  price: 190,
  image: undefined,
},
{
  name: "Crushed Pistachio",
  description: "Extras",
  price: 160,
  image: undefined,
},],
},

  

 {
  id: "coffee-beverages",
  title: "Coffee & Beverages",
  image: "/images/categories/coffee.webp",
  products: [
    {
      name: "Espresso",
      description: "Classic Italian espresso.",
      price: 270,
      image: undefined,
    },
    {
      name: "Espresso Doppio",
      description: "Double espresso.",
      price: 330,
      image: undefined,
    },
    {
      name: "Espresso Macchiato",
      description: "Espresso with milk foam.",
      price: 310,
      image: undefined,
    },
    {
      name: "Americano",
      description: "Espresso with hot water.",
      price: 270,
      image: undefined,
    },
    {
      name: "Cappuccino",
      description: "Espresso, steamed milk and milk foam.",
      price: 340,
      image: undefined,
    },
    {
      name: "Latte Macchiato",
      description: "Espresso with steamed milk.",
      price: 390,
      image: undefined,
    },
    {
      name: "Mocha",
      description: "Espresso, chocolate and milk.",
      price: 390,
      image: undefined,
    },
    {
      name: "Espresso Freddo",
      description: "Iced espresso.",
      price: 350,
      image: undefined,
    },
    {
      name: "Cappuccino Freddo",
      description: "Iced cappuccino.",
      price: 420,
      image: undefined,
    },
    {
      name: "Iced Latte",
      description: "Espresso with cold milk and ice.",
      price: 390,
      image: undefined,
    },
    {
      name: "Iced Coffee",
      description: "Cold coffee with ice.",
      price: 480,
      image: undefined,
    },
    {
      name: "Matcha",
      description: "Japanese matcha tea.",
      price: 435,
      image: undefined,
    },
    {
      name: "Matcha + Flavor",
      description: "Strawberry, Mango, Passion Fruit, Peach or Raspberry.",
      price: 485,
      image: undefined,
    },
    {
      name: "Matcha Affogato",
      description: "Matcha served with vanilla ice cream.",
      price: 475,
      image: undefined,
    },
    {
      name: "Affogato",
      description: "Espresso with vanilla ice cream.",
      price: 440,
      image: undefined,
    },
    {
      name: "Black Coffee",
      description: "Traditional domestic coffee.",
      price: 265,
      image: undefined,
    },
    {
      name: "Hot Chocolate",
      description: "Rich hot chocolate.",
      price: 390,
      image: undefined,
    },
    {
      name: "Hot Chocolate + Plazma / Whipped Cream",
      description: "Add Plazma biscuit or whipped cream.",
      price: 440,
      image: undefined,
    },
    {
      name: "Tea",
      description: "Selection of premium teas.",
      price: 280,
      image: undefined,
    },
  ],
},

  {
  id: "water",
  title: "Water",
  image: undefined,
  products: [
    {
      name: "Rosa",
      description: "0.33L",
      price: 290,
      image: undefined,
    },
    {
      name: "Rosa",
      description: "0.75L",
      price: 490,
      image: undefined,
    },
    {
      name: "Knjaz Miloš",
      description: "0.25L",
      price: 290,
      image: undefined,
    },
    {
      name: "Knjaz Miloš",
      description: "0.75L",
      price: 490,
      image: undefined,
    },
    {
      name: "San Pellegrino",
      description: "0.25L",
      price: 390,
      image: undefined,
    },
    {
      name: "San Pellegrino",
      description: "0.75L",
      price: 690,
      image: undefined,
    },
    {
      name: "Acqua Panna",
      description: "0.25L",
      price: 390,
      image: undefined,
    },
    {
      name: "Acqua Panna",
      description: "0.75L",
      price: 690,
      image: undefined,
    },
  ],
},

  {
  id: "soft-drinks",
  title: "Soft Drinks",
  image: undefined,
  products: [
    {
      name: "Coca-Cola",
      description: "0.25L",
      price: 340,
      image: undefined,
    },
    {
      name: "Coca-Cola Zero",
      description: "0.25L",
      price: 340,
      image: undefined,
    },
    {
      name: "Fanta Orange",
      description: "0.25L",
      price: 340,
      image: undefined,
    },
    {
      name: "Sprite",
      description: "0.25L",
      price: 340,
      image: undefined,
    },
    {
      name: "Schweppes Tonic",
      description: "0.25L",
      price: 340,
      image: undefined,
    },
    {
      name: "Schweppes Bitter Lemon",
      description: "0.25L",
      price: 340,
      image: undefined,
    },
    {
      name: "Schweppes Tangerine",
      description: "0.25L",
      price: 340,
      image: undefined,
    },
    {
      name: "Fuze Tea Peach",
      description: "0.25L",
      price: 360,
      image: undefined,
    },
    {
      name: "Fuze Tea Lemon",
      description: "0.25L",
      price: 360,
      image: undefined,
    },
    {
      name: "Next Orange",
      description: "0.20L",
      price: 360,
      image: undefined,
    },
    {
      name: "Next Apple",
      description: "0.20L",
      price: 360,
      image: undefined,
    },
    {
      name: "Next Peach",
      description: "0.20L",
      price: 360,
      image: undefined,
    },
  ],
},

  {
  id: "fresh-juices",
  title: "Fresh Juices",
  image: "/images/categories/fresh-juices.webp",
  products: [
    {
      name: "Orange",
      description: "Freshly squeezed orange juice.",
      price: 520,
      image: undefined,
    },
    {
      name: "Apple",
      description: "Freshly pressed apple juice.",
      price: 520,
      image: undefined,
    },
    {
      name: "Carrot",
      description: "Fresh carrot juice.",
      price: 490,
      image: undefined,
    },
    {
      name: "Orange & Apple",
      description: "Fresh juice blend.",
      price: 540,
      image: undefined,
    },
    {
      name: "Orange & Carrot",
      description: "Fresh juice blend.",
      price: 540,
      image: undefined,
    },
    {
      name: "Apple & Carrot",
      description: "Fresh juice blend.",
      price: 540,
      image: undefined,
    },
    {
      name: "Orange, Apple & Carrot",
      description: "Fresh juice blend.",
      price: 560,
      image: undefined,
    },
  ],
},

  {
  id: "beer",
  title: "Beer",
  image: "/images/categories/beer.webp",
  products: [
    {
      name: "Heineken",
      description: "0.33L",
      price: 430,
      image: undefined,
    },
    {
      name: "Corona Extra",
      description: "0.35L",
      price: 490,
      image: undefined,
    },
    {
      name: "Budweiser Budvar",
      description: "0.33L",
      price: 430,
      image: undefined,
    },
    {
      name: "Hoegaarden",
      description: "0.33L",
      price: 490,
      image: undefined,
    },
    {
      name: "Guinness",
      description: "0.44L",
      price: 590,
      image: undefined,
    },
    {
      name: "Heineken 0.0",
      description: "Non-alcoholic · 0.33L",
      price: 430,
      image: undefined,
    },
  ],
},

  {
  id: "spirits",
  title: "Spirits",
  image: "/images/categories/cocktails.webp",
  products: [
    {
      name: "Jack Daniel's",
      description: "Whisky • 0.03L",
      price: 460,
      image: undefined,
    },
    {
      name: "Jameson",
      description: "Whisky • 0.03L",
      price: 420,
      image: undefined,
    },
    {
      name: "Johnnie Walker Black Label",
      description: "Whisky • 0.03L",
      price: 480,
      image: undefined,
    },
    {
      name: "Chivas Regal",
      description: "Whisky • 0.03L",
      price: 490,
      image: undefined,
    },
    {
      name: "Martell VS",
      description: "Cognac • 0.03L",
      price: 480,
      image: undefined,
    },
    {
      name: "Bombay Sapphire",
      description: "Gin • 0.03L",
      price: 340,
      image: undefined,
    },
    {
      name: "Hendrick's",
      description: "Gin • 0.03L",
      price: 460,
      image: undefined,
    },
    {
      name: "Finlandia",
      description: "Vodka • 0.03L",
      price: 360,
      image: undefined,
    },
    {
      name: "Absolut Blue",
      description: "Vodka • 0.03L",
      price: 280,
      image: undefined,
    },
    {
      name: "Olmeca Blanco",
      description: "Tequila • 0.03L",
      price: 340,
      image: undefined,
    },
    {
      name: "Olmeca Gold Añejo",
      description: "Tequila • 0.03L",
      price: 340,
      image: undefined,
    },
    {
      name: "Jägermeister",
      description: "Liqueur • 0.03L",
      price: 390,
      image: undefined,
    },
    {
      name: "Gorki List",
      description: "Aperitif • 0.03L",
      price: 340,
      image: undefined,
    },
    {
      name: "Bacardi Carta Blanca",
      description: "Rum • 0.03L",
      price: 380,
      image: undefined,
    },
    {
      name: "Baileys",
      description: "Cream Liqueur • 0.05L",
      price: 430,
      image: undefined,
    },
    {
      name: "Amaretto",
      description: "Liqueur • 0.05L",
      price: 360,
      image: undefined,
    },
    {
      name: "Martini Bianco",
      description: "Vermouth • 0.05L",
      price: 340,
      image: undefined,
    },
    {
      name: "Martini Rosso",
      description: "Vermouth • 0.05L",
      price: 450,
      image: undefined,
    },
    {
      name: "Šljiva Bojkovčanka 5g",
      description: "Plum Brandy 5YO • 0.03L",
      price: 360,
      image: undefined,
    },
    {
      name: "Šljiva Bojkovčanka 10g",
      description: "Plum Brandy 10YO • 0.03L",
      price: 590,
      image: undefined,
    },
    {
      name: "Dunja Bojkovčanka",
      description: "Quince Brandy • 0.03L",
      price: 360,
      image: undefined,
    },
    {
      name: "Vilijamovka Bojkovčanka",
      description: "Williams Pear Brandy • 0.03L",
      price: 380,
      image: undefined,
    },
    {
      name: "Višnja",
      description: "Sour Cherry Brandy • 0.03L",
      price: 320,
      image: undefined,
    },
    {
      name: "Meduška",
      description: "Honey Brandy • 0.03L",
      price: 320,
      image: undefined,
    },
  ],
},
{
  id: "wine",
  title: "Wine",
  image: undefined,
  products: [
    {
      name: "Matali Terasa Chardonnay",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 580,
      image: undefined,
    },
    {
      name: "Matali Kremen",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 720,
      image: undefined,
    },
    {
      name: "Matali Sauvignon Blanc",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 540,
      image: undefined,
    },
    {
      name: "Matali Rose Dušica",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 450,
      image: undefined,
    },
    {
      name: "Matali Bukovski Rosé",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 780,
      image: undefined,
    },
    {
      name: "Matali Crna Tamjanika Rosé",
      description: "Glass 0.125L / Bottle 0.50L",
      price: 720,
      image: undefined,
    },
    {
      name: "Prosecco Borgoluce Lampo",
      description: "Glass 0.125L / Bottle 0.75L",
      price: 520,
      image: undefined,
    },
  ],
},


 {
  id: "cocktails",
  title: "Cocktails",
  image: "/images/categories/cocktails.webp",
  products: [
    {
      name: "Aperol Spritz",
      description: "Aperol, Prosecco, Sparkling Water",
      price: 790,
      image: undefined,
      popular: true,
    },
    {
      name: "Hugo Spritz",
      description: "St. Germain, Prosecco, Sparkling Water, Mint",
      price: 790,
      image: undefined,
    },
    {
      name: "Negroni",
      description: "Gin, Campari, Martini Rosso",
      price: 790,
      image: undefined,
    },
    {
      name: "Whiskey Sour",
      description: "Whiskey, Lemon Juice, Sugar Syrup",
      price: 790,
      image: undefined,
    },
    {
      name: "Mojito",
      description: "White Rum, Lime, Mint, Sugar, Soda",
      price: 790,
      image: undefined,
    },
    {
      name: "Pornstar Martini",
      description: "Vanilla Vodka, Passion Fruit, Lime",
      price: 850,
      image: undefined,
      badge: "Signature",
    },
    {
      name: "Espresso Martini",
      description: "Vodka, Espresso, Coffee Liqueur",
      price: 850,
      image: undefined,
      popular: true,
    },
    {
      name: "Gin Basil Smash",
      description: "Gin, Basil, Lemon, Sugar",
      price: 820,
      image: undefined,
    },
    {
      name: "Margarita",
      description: "Tequila, Triple Sec, Lime",
      price: 790,
      image: undefined,
    },
    {
      name: "Paloma",
      description: "Tequila, Grapefruit, Lime, Soda",
      price: 790,
      image: undefined,
    },
    {
      name: "Cosmopolitan",
      description: "Vodka, Triple Sec, Cranberry",
      price: 790,
      image: undefined,
    },
    {
      name: "Old Fashioned",
      description: "Bourbon, Sugar, Angostura Bitters",
      price: 850,
      image: undefined,
    },
  ],
},
];
