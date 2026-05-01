// pizza/pizza.js
// Images go in pizza/images/ named exactly as the id field + .jpg
// Example: images/pepperoni.jpg

window.PIZZA = [

  // ── SAUCES ─────────────────────────────────────────────────────────────────
  { id: 'classic-tomato-sauce',   name: 'Classic Tomato Sauce',     category: 'Sauce' },
  { id: 'white-sauce',            name: 'White Sauce (Alfredo)',     category: 'Sauce' },
  { id: 'bbq-sauce',              name: 'BBQ Sauce',                 category: 'Sauce' },
  { id: 'pesto',                  name: 'Pesto',                     category: 'Sauce' },
  { id: 'olive-oil-garlic',       name: 'Olive Oil & Garlic',        category: 'Sauce' },
  { id: 'buffalo-sauce',          name: 'Buffalo Sauce',             category: 'Sauce' },
  { id: 'ranch',                  name: 'Ranch',                     category: 'Sauce' },
  { id: 'no-sauce',               name: 'No Sauce (Extra Cheese)',   category: 'Sauce' },

  // ── MEATS ──────────────────────────────────────────────────────────────────
  { id: 'pepperoni',              name: 'Pepperoni',                 category: 'Meat' },
  { id: 'sausage',                name: 'Sausage',                   category: 'Meat' },
  { id: 'bacon',                  name: 'Bacon',                     category: 'Meat' },
  { id: 'ham',                    name: 'Ham',                       category: 'Meat' },
  { id: 'chicken',                name: 'Chicken',                   category: 'Meat' },
  { id: 'meatballs',              name: 'Meatballs',                 category: 'Meat' },
  { id: 'anchovies',              name: 'Anchovies',                 category: 'Meat' },
  { id: 'salami',                 name: 'Salami',                    category: 'Meat' },
  { id: 'prosciutto',             name: 'Prosciutto',                category: 'Meat' },
  { id: 'ground-beef',            name: 'Ground Beef',               category: 'Meat' },

  // ── VEGETABLES ─────────────────────────────────────────────────────────────
  { id: 'mushrooms',              name: 'Mushrooms',                 category: 'Vegetable' },
  { id: 'green-peppers',          name: 'Green Peppers',             category: 'Vegetable' },
  { id: 'onions',                 name: 'Onions',                    category: 'Vegetable' },
  { id: 'black-olives',           name: 'Black Olives',              category: 'Vegetable' },
  { id: 'jalapenos',              name: 'Jalapeños',                 category: 'Vegetable' },
  { id: 'banana-peppers',         name: 'Banana Peppers',            category: 'Vegetable' },
  { id: 'pepperoncini',           name: 'Pepperoncini',              category: 'Vegetable' },
  { id: 'roasted-red-peppers',    name: 'Roasted Red Peppers',       category: 'Vegetable' },
  { id: 'spinach',                name: 'Spinach',                   category: 'Vegetable' },
  { id: 'artichoke-hearts',       name: 'Artichoke Hearts',          category: 'Vegetable' },
  { id: 'sun-dried-tomatoes',     name: 'Sun-Dried Tomatoes',        category: 'Vegetable' },
  { id: 'roasted-garlic',         name: 'Roasted Garlic',            category: 'Vegetable' },
  { id: 'fresh-tomatoes',         name: 'Fresh Tomatoes',            category: 'Vegetable' },
  { id: 'broccoli',               name: 'Broccoli',                  category: 'Vegetable' },
  { id: 'eggplant',               name: 'Eggplant',                  category: 'Vegetable' },
  { id: 'arugula',                name: 'Arugula',                   category: 'Vegetable' },
  { id: 'fresh-basil',            name: 'Fresh Basil',               category: 'Vegetable' },

  // ── CHEESE ─────────────────────────────────────────────────────────────────
  { id: 'extra-mozzarella',       name: 'Extra Mozzarella',          category: 'Cheese' },
  { id: 'ricotta',                name: 'Ricotta',                   category: 'Cheese' },
  { id: 'feta',                   name: 'Feta',                      category: 'Cheese' },
  { id: 'goat-cheese',            name: 'Goat Cheese',               category: 'Cheese' },
  { id: 'parmesan',               name: 'Parmesan',                  category: 'Cheese' },

  // ── FINISHERS ──────────────────────────────────────────────────────────────
  { id: 'hot-honey',              name: 'Hot Honey',                 category: 'Finisher' },
  { id: 'balsamic-glaze',         name: 'Balsamic Glaze',            category: 'Finisher' },
  { id: 'chili-flakes',           name: 'Chili Flakes',              category: 'Finisher' },
  { id: 'pickles',                name: 'Pickles',                   category: 'Finisher' },

  // ── WILDCARD ───────────────────────────────────────────────────────────────
  { id: 'pineapple',              name: 'Pineapple',                 category: 'Wildcard' },

];
