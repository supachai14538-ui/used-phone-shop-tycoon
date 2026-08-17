/* =========================================================================
   CUSTOMER APPEARANCE — asset manifest + recipe generator
   -------------------------------------------------------------------------
   Real layered character assets (source: "All asset v.1.zip") live under
   assets/characters/layers/<layer>/<n>.png — all 444x700, pre-aligned so
   they can be stacked directly with no per-layer offset math.

   This file owns:
     1) CHARACTER_ASSET_PATH   — single base path for every layer image
     2) CHARACTER_LAYER_COUNTS — how many numbered variants exist per layer
     3) generateCustomerAppearance() — builds ONE immutable appearance
        recipe for a customer. Must be called exactly once per customer,
        at creation time, and the result stored on the customer object.
        Never call this again during that customer's lifecycle (that would
        make them re-randomize on every re-render).
   ========================================================================= */

const CHARACTER_ASSET_PATH = 'assets/characters/layers/';

// Counts verified directly against the supplied asset package (root-level
// numbered files only — COLOR/ variant subfolders and the body part-decomposition
// files (arm_left.png, body_layered.png, full.png, etc.) were left out of scope;
// see BEFORE/AFTER report).
const CHARACTER_LAYER_COUNTS = {
  hairBack: 12,
  body: 29,
  bottom: 8,
  dress: 7,
  top: 12,
  shoes: 4,
  gloves: 6,
  hair: 12,
  bangs: 13,
  eyebrows: 5,
  eyelashes: 5,
  pupils: 16,
  mouth: 20,
  beard: 5,
  hairBonus: 5,
};

// Folder name on disk for each recipe key (kept separate from the recipe
// key so the JS naming can stay camelCase while folders stay snake_case).
const CHARACTER_LAYER_FOLDER = {
  hairBack: 'hair_back',
  body: 'body',
  bottom: 'bottom',
  dress: 'dress',
  top: 'top',
  shoes: 'shoes',
  gloves: 'gloves',
  hair: 'hair',
  bangs: 'bangs',
  eyebrows: 'eyebrows',
  eyelashes: 'eyelashes',
  pupils: 'pupils',
  mouth: 'mouth',
  beard: 'beard',
  hairBonus: 'hair_bonus',
};

// Draw order, back to front. Verified visually against the real assets
// (chest/limbs align across body+clothing+accessory layers).
const CHARACTER_LAYER_ORDER = [
  'hairBack', 'body', 'bottom', 'dress', 'top', 'shoes', 'gloves',
  'hair', 'bangs', 'eyebrows', 'eyelashes', 'pupils', 'mouth',
  'beard', 'hairBonus',
];

function randInt1(max){ return 1 + Math.floor(Math.random() * max); }

/* Builds one immutable appearance recipe. Call once per customer. */
function generateCustomerAppearance(){
  const wearsDress = Math.random() < 0.35; // dress OR top+bottom, never both
  const appearance = {
    body:      `${randInt1(CHARACTER_LAYER_COUNTS.body)}.png`,
    hairBack:  `${randInt1(CHARACTER_LAYER_COUNTS.hairBack)}.png`,
    hair:      `${randInt1(CHARACTER_LAYER_COUNTS.hair)}.png`,
    bangs:     `${randInt1(CHARACTER_LAYER_COUNTS.bangs)}.png`,
    eyebrows:  `${randInt1(CHARACTER_LAYER_COUNTS.eyebrows)}.png`,
    eyelashes: `${randInt1(CHARACTER_LAYER_COUNTS.eyelashes)}.png`,
    pupils:    `${randInt1(CHARACTER_LAYER_COUNTS.pupils)}.png`,
    mouth:     `${randInt1(CHARACTER_LAYER_COUNTS.mouth)}.png`,
    beard:     Math.random() < 0.15 ? `${randInt1(CHARACTER_LAYER_COUNTS.beard)}.png` : null,
    dress:     wearsDress ? `${randInt1(CHARACTER_LAYER_COUNTS.dress)}.png` : null,
    top:       wearsDress ? null : `${randInt1(CHARACTER_LAYER_COUNTS.top)}.png`,
    bottom:    wearsDress ? null : `${randInt1(CHARACTER_LAYER_COUNTS.bottom)}.png`,
    gloves:    Math.random() < 0.4 ? `${randInt1(CHARACTER_LAYER_COUNTS.gloves)}.png` : null,
    shoes:     `${randInt1(CHARACTER_LAYER_COUNTS.shoes)}.png`,
    hairBonus: Math.random() < 0.3 ? `${randInt1(CHARACTER_LAYER_COUNTS.hairBonus)}.png` : null,
  };
  return appearance;
}
