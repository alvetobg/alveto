# Remaining image requirements

The website keeps the existing neutral Alveto gradient whenever a verified
production image is unavailable. No generated or stock food imagery was added.

## Category heroes

Verified category photography is still required from the owner for:

- Water
- Soft Drinks
- Wine

## Optional Create Your Own ingredient photography

The following optional image slots are intentionally unset. Builders currently
use text controls, so these missing images do not affect the live experience.

- Base: Waffle, Crepe, American Pancakes, Mini Pancakes
- Cream & Chocolate: Nutella, Bueno Chocolate, Pistachio Chocolate, Ferrero
  Chocolate, White Chocolate, Milk Chocolate, Dark Chocolate, Crunchy White
  Chocolate, Caramel, Vanilla Cream, Whipped Cream
- Fresh Fruit: Strawberries, Raspberries, Banana
- Fruit Filling: Sour Cherry Filling, Pear Filling, Mango Filling, Strawberry
  Filling, Raspberry Filling, Maple Syrup, Honey
- Topping: Plazma Biscuit, Oreo Crumbs, Chocolate Chips, White Chocolate Chips,
  Crushed Pistachios, Crushed Hazelnuts, Crushed Walnuts, Kadaif, Coconut,
  Vegan Plazma Biscuit
- Ice Cream and dessert: Vanilla Ice Cream, Chocolate Ice Cream, Bueno Ice
  Cream, Raspberry Sorbet, Strawberries with Whipped Cream

Other products without verified photography continue to use the existing
text-only card and neutral modal fallback. New files should only be connected
after `npm run check:images` validates their public paths.
