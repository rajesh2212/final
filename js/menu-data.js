/* Tandooriwala, Bhadrak — menu data
 * -------------------------------------------------------------------------
 * OWNER EDITING GUIDE
 *
 * The full menu on the website is generated from this file only — no dish is
 * hard-coded into the page markup. Categories below mirror what the outlet
 * is publicly listed for. Add dishes to each category as they are confirmed
 * from the outlet's own menu boards; do not add items copied from other
 * outlets or the brand website.
 *
 * Each item takes these fields:
 *   name   (required)  dish name exactly as it should appear
 *   price  (required)  price in rupees as a number, e.g. 180
 *                      (null while unconfirmed — shown as "—" until set)
 *   desc   (optional)   one short description line, grounded in the menu
 *   veg    (optional)   true  -> green veg marker is shown
 *                      false -> no marker (default: no marker)
 *   spicy  (optional)   "mild" | "medium" | "hot" — only if the menu states it
 *
 * Example item:
 *   { name: "Chicken Tandoori (Half)", price: 220, veg: false, spicy: "hot" }
 *
 * While every category is empty, the page shows a friendly
 * "menu card is being updated — call us" notice instead of the menu UI.
 * The menu UI (category filter + search) appears automatically once the
 * first item is added.
 * -------------------------------------------------------------------------
 */

const MENU = {
  // Notice shown to visitors while no items are entered above.
  emptyNote:
    "Our menu card is being updated. Call +91 89173 92926 to hear today's dishes and prices.",

  categories: [
    {
      id: "kebabs-starters",
      name: "Kebabs & Starters",
      items: [
        // { name: "...", price: 0, desc: "", veg: false, spicy: "medium" },
      ],
    },
    {
      id: "biryani-rice",
      name: "Biryani & Rice",
      items: [],
    },
    {
      id: "north-indian-mughlai",
      name: "North Indian & Mughlai",
      items: [],
    },
    {
      id: "indo-chinese",
      name: "Indo-Chinese",
      items: [],
    },
    {
      id: "seafood",
      name: "Seafood",
      items: [],
    },
    {
      id: "desserts-drinks",
      name: "Desserts, Shakes & Mocktails",
      items: [],
    },
  ],
};
