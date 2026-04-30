// candies.js
// ─────────────────────────────────────────────────────────────────────────────
// HALLOWEEN CANDY CATALOG
// Each entry needs one image in /images/ named exactly as the id field.
// Example: images/reeses-peanut-butter-cups.jpg
//
// Recommended image size: 400×400px square (product shot on white/transparent bg)
// Good sources: manufacturer websites, Open Food Facts, Google Images
// ─────────────────────────────────────────────────────────────────────────────

window.CANDIES = [

  // ── CHOCOLATE / PEANUT BUTTER ──────────────────────────────────────────────
  { id: 'reeses-peanut-butter-cups',  name: "Reese's Peanut Butter Cups",  category: 'Chocolate' },
  { id: 'reeses-pieces',              name: "Reese's Pieces",               category: 'Chocolate' },
  { id: 'snickers',                   name: 'Snickers',                     category: 'Chocolate' },
  { id: 'kit-kat',                    name: 'Kit Kat',                      category: 'Chocolate' },
  { id: 'twix',                       name: 'Twix',                         category: 'Chocolate' },
  { id: 'butterfinger',               name: 'Butterfinger',                 category: 'Chocolate' },
  { id: 'milky-way',                  name: 'Milky Way',                    category: 'Chocolate' },
  { id: '3-musketeers',               name: '3 Musketeers',                 category: 'Chocolate' },
  { id: 'baby-ruth',                  name: 'Baby Ruth',                    category: 'Chocolate' },
  { id: 'almond-joy',                 name: 'Almond Joy',                   category: 'Chocolate' },
  { id: 'mounds',                     name: 'Mounds',                       category: 'Chocolate' },
  { id: 'mr-goodbar',                 name: 'Mr. Goodbar',                  category: 'Chocolate' },
  { id: '100-grand',                  name: '100 Grand',                    category: 'Chocolate' },
  { id: 'hersheys-bar',               name: "Hershey's Milk Chocolate Bar", category: 'Chocolate' },
  { id: 'hersheys-kisses',            name: "Hershey's Kisses",             category: 'Chocolate' },
  { id: 'york-peppermint-patty',      name: 'York Peppermint Patty',        category: 'Chocolate' },
  { id: 'whoppers',                   name: 'Whoppers',                     category: 'Chocolate' },
  { id: 'milk-duds',                  name: 'Milk Duds',                    category: 'Chocolate' },

  // ── FRUITY / CHEWY ─────────────────────────────────────────────────────────
  { id: 'starburst',                  name: 'Starburst',                    category: 'Fruity' },
  { id: 'skittles',                   name: 'Skittles',                     category: 'Fruity' },
  { id: 'swedish-fish',               name: 'Swedish Fish',                 category: 'Fruity' },
  { id: 'sour-patch-kids',            name: 'Sour Patch Kids',              category: 'Fruity' },
  { id: 'airheads',                   name: 'Airheads',                     category: 'Fruity' },
  { id: 'laffy-taffy',                name: 'Laffy Taffy',                  category: 'Fruity' },
  { id: 'mike-and-ike',               name: 'Mike and Ike',                 category: 'Fruity' },
  { id: 'jolly-ranchers',             name: 'Jolly Ranchers',               category: 'Fruity' },
  { id: 'now-and-later',              name: 'Now and Later',                category: 'Fruity' },
  { id: 'dots',                       name: 'Dots',                         category: 'Fruity' },

  // ── GUMMY ──────────────────────────────────────────────────────────────────
  { id: 'haribo-gold-bears',          name: 'Haribo Gold-Bears',            category: 'Gummy' },
  { id: 'trolli-sour-worms',          name: 'Trolli Sour Worms',            category: 'Gummy' },
  { id: 'gummy-worms',                name: 'Gummy Worms',                  category: 'Gummy' },

  // ── NERDS ──────────────────────────────────────────────────────────────────
  { id: 'nerds',                      name: 'Nerds',                        category: 'Candy' },
  { id: 'nerds-clusters',             name: 'Nerds Clusters',               category: 'Candy' },

  // ── CHEWY / CARAMEL ────────────────────────────────────────────────────────
  { id: 'tootsie-roll',               name: 'Tootsie Roll',                 category: 'Chewy' },
  { id: 'tootsie-pop',                name: 'Tootsie Pop',                  category: 'Chewy' },

  // ── HARD CANDY ─────────────────────────────────────────────────────────────
  { id: 'dum-dums',                   name: 'Dum Dums',                     category: 'Hard Candy' },
  { id: 'blow-pops',                  name: 'Blow Pops',                    category: 'Hard Candy' },
  { id: 'smarties',                   name: 'Smarties',                     category: 'Hard Candy' },
  { id: 'sweetarts',                  name: 'SweeTarts',                    category: 'Hard Candy' },
  { id: 'gobstopper',                 name: 'Gobstopper',                   category: 'Hard Candy' },
  { id: 'werthers',                   name: "Werther's Originals",          category: 'Hard Candy' },

  // ── THE DEBATE STARTERS ────────────────────────────────────────────────────
  { id: 'candy-corn',                 name: 'Candy Corn',                   category: 'Divisive' },
  { id: 'peanut-butter-kisses',       name: 'Peanut Butter Kisses',         category: 'Divisive' },
  { id: 'circus-peanuts',             name: 'Circus Peanuts',               category: 'Divisive' },
  { id: 'necco-wafers',               name: 'Necco Wafers',                 category: 'Divisive' },

  // ── WILDCARD ───────────────────────────────────────────────────────────────
  { id: 'twizzlers',                  name: 'Twizzlers',                    category: 'Chewy' },
  { id: 'red-vines',                  name: 'Red Vines',                    category: 'Chewy' },
  { id: 'pop-rocks',                  name: 'Pop Rocks',                    category: 'Candy' },
  { id: 'pixie-stix',                 name: 'Pixie Stix',                   category: 'Candy' },

];
