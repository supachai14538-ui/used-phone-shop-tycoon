/* =========================================================================
   CUSTOMER APPEARANCE — asset manifest + recipe generator
   -------------------------------------------------------------------------
   Real layered character assets (source: "All asset v.1.zip") live under
   assets/characters/layers/<layer>/<n>.png — all 444x700, pre-aligned so
   they can be stacked directly with no per-layer offset math.

   This file owns:
     1) CHARACTER_ASSET_PATH   — single base path for every layer image
     2) CHARACTER_LAYER_COUNTS — how many numbered variants exist per layer
     3) Gender + color system — see below
     4) generateCustomerAppearance() — builds ONE immutable appearance
        recipe for a customer. Must be called exactly once per customer,
        at creation time, and the result stored on the customer object.
        Never call this again during that customer's lifecycle (that would
        make them re-randomize on every re-render).

   GENDER: asset filenames carry no gender metadata (verified against every
   file in the package). Visual inspection found exactly two layers that
   are actually gender-restricted by what they depict:
     - dress  → female-presenting garment (skirt/wrap silhouettes only)
     - beard  → male-only (facial hair)
   Every other layer, including "body" (which only varies skin tone, not
   body shape), is unisex and shared by both genders. That is the entire
   compatibility table — see GENDER_LOCKED_LAYERS below.

   COLOR: hair/clothing layers are uncolored black-outline line art with
   real alpha transparency (verified: RGBA, alpha 0-255). They are tinted
   at render time by character-renderer.js using CSS mask-image, which
   recolors via the alpha channel only — the source PNGs are never touched.
   This file just owns the curated color palettes and picks a color key per
   customer; character-renderer.js maps the key to a hex value and applies it.
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

// Layers restricted to one gender, keyed by the gender allowed to wear them.
// Every layer NOT listed here is unisex — drawn from the same pool for both
// genders. This is the full compatibility table (see file header for how
// it was derived); do not guess additional restrictions beyond this.
const GENDER_LOCKED_LAYERS = {
  dress: 'female',
  beard: 'male',
};

/* -------------------------------------------------------------------------
   Color palettes. Both are curated, fixed hex sets — never random RGB — so
   every combination stays inside the game's warm/soft/natural/pastel style
   (per docs/Bibles/04_CHARACTER_BIBLE.md). character-renderer.js is the only
   other place these are read (to resolve a key to its hex value for tinting).
   ------------------------------------------------------------------------- */
const HAIR_COLORS = {
  black:      '#2b211d',
  darkBrown:  '#4a2f22',
  brown:      '#6b4226',
  lightBrown: '#8a5a34',
  darkBlonde: '#a9793f',
  blonde:     '#d9b878',
  gray:       '#9a958c',
  dustyRose:  '#b98a82', // the one small "fashion" tone — stays soft/pastel
};

const CLOTHING_COLORS = {
  cream:       '#f2e9d8',
  beige:       '#e0c9a6',
  pink:        '#eab8c0',
  pastelBlue:  '#b9d6e0',
  pastelGreen: '#bcd9b8',
  yellow:      '#f0d879',
  brown:       '#8a6349',
  mutedRed:    '#c17b6f',
  mutedPurple: '#b79bc4',
};

// Minimal compatibility guard, not a fashion engine (per spec): every color
// in both palettes is already warm/soft/pastel, so almost any pairing works.
// This only blocks the couple of pairings that read as flat/washed-out.
const HAIR_CLOTHING_AVOID = {
  blonde: ['yellow'],
  gray:   ['brown'],
};

function randInt1(max){ return 1 + Math.floor(Math.random() * max); }
function pickKey(obj){ const keys = Object.keys(obj); return keys[Math.floor(Math.random() * keys.length)]; }

function randomGender(){ return Math.random() < 0.5 ? 'male' : 'female'; }

function pickHairColor(){ return pickKey(HAIR_COLORS); }

function pickClothingColor(hairColorKey){
  const avoid = HAIR_CLOTHING_AVOID[hairColorKey] || [];
  const keys = Object.keys(CLOTHING_COLORS).filter(k => !avoid.includes(k));
  return keys[Math.floor(Math.random() * keys.length)];
}

/* Builds one immutable appearance recipe. Call once per customer. */
function generateCustomerAppearance(){
  const gender = randomGender();
  const isFemale = gender === 'female';
  const wearsDress = isFemale && Math.random() < 0.35; // dress OR top+bottom, never both; males never wear dress

  const hairColor = pickHairColor();
  const clothingColor = pickClothingColor(hairColor);

  const appearance = {
    gender,
    body:      `${randInt1(CHARACTER_LAYER_COUNTS.body)}.png`,
    hairBack:  `${randInt1(CHARACTER_LAYER_COUNTS.hairBack)}.png`,
    hair:      `${randInt1(CHARACTER_LAYER_COUNTS.hair)}.png`,
    hairColor,
    bangs:     `${randInt1(CHARACTER_LAYER_COUNTS.bangs)}.png`,
    eyebrows:  `${randInt1(CHARACTER_LAYER_COUNTS.eyebrows)}.png`,
    eyelashes: `${randInt1(CHARACTER_LAYER_COUNTS.eyelashes)}.png`,
    pupils:    `${randInt1(CHARACTER_LAYER_COUNTS.pupils)}.png`,
    mouth:     `${randInt1(CHARACTER_LAYER_COUNTS.mouth)}.png`,
    beard:     (!isFemale && Math.random() < 0.15) ? `${randInt1(CHARACTER_LAYER_COUNTS.beard)}.png` : null,
    dress:     wearsDress ? `${randInt1(CHARACTER_LAYER_COUNTS.dress)}.png` : null,
    top:       wearsDress ? null : `${randInt1(CHARACTER_LAYER_COUNTS.top)}.png`,
    bottom:    wearsDress ? null : `${randInt1(CHARACTER_LAYER_COUNTS.bottom)}.png`,
    clothingColor,
    gloves:    Math.random() < 0.4 ? `${randInt1(CHARACTER_LAYER_COUNTS.gloves)}.png` : null,
    shoes:     `${randInt1(CHARACTER_LAYER_COUNTS.shoes)}.png`,
    hairBonus: Math.random() < 0.3 ? `${randInt1(CHARACTER_LAYER_COUNTS.hairBonus)}.png` : null,
  };

  const { valid, issues } = validateAppearance(appearance);
  if(!valid) repairAppearance(appearance, issues);

  return appearance;
}

/* -------------------------------------------------------------------------
   Validation. Checks gender compatibility, asset-index bounds, required
   layers, and color availability. Never used to reject a whole customer —
   generateCustomerAppearance() always builds a gender-consistent recipe on
   its own, so this should not fire in normal play. It exists as a safety
   net (per spec) for future edits to the generation logic above.
   ------------------------------------------------------------------------- */
const REQUIRED_LAYERS = ['body', 'hairBack', 'hair', 'bangs', 'eyebrows', 'eyelashes', 'pupils', 'mouth', 'shoes'];

function validateAppearance(appearance){
  const issues = [];
  if(!appearance) return { valid: false, issues: [{ code: 'missing' }] };

  if(appearance.gender !== 'male' && appearance.gender !== 'female'){
    issues.push({ code: 'badGender' });
  }

  REQUIRED_LAYERS.forEach(key => {
    if(!appearance[key]) issues.push({ code: 'missingLayer', key });
  });

  CHARACTER_LAYER_ORDER.forEach(key => {
    const val = appearance[key];
    if(val == null) return;
    const n = parseInt(val, 10);
    if(!Number.isInteger(n) || n < 1 || n > CHARACTER_LAYER_COUNTS[key]){
      issues.push({ code: 'badAssetIndex', key });
    }
  });

  const hasDress = !!appearance.dress;
  const hasTopBottom = !!appearance.top && !!appearance.bottom;
  if(hasDress === hasTopBottom) issues.push({ code: 'clothingConflict' });

  Object.keys(GENDER_LOCKED_LAYERS).forEach(key => {
    const allowedGender = GENDER_LOCKED_LAYERS[key];
    if(appearance[key] && appearance.gender !== allowedGender){
      issues.push({ code: 'genderLockViolation', key });
    }
  });

  if(!(appearance.hairColor in HAIR_COLORS)) issues.push({ code: 'badHairColor' });
  if(!(appearance.clothingColor in CLOTHING_COLORS)) issues.push({ code: 'badClothingColor' });

  return { valid: issues.length === 0, issues };
}

/* Fixes only the flagged pieces of an appearance recipe in place — never
   discards a whole customer over one bad layer. */
function repairAppearance(appearance, issues){
  issues.forEach(({ code, key }) => {
    switch(code){
      case 'badGender':
        appearance.gender = randomGender();
        break;
      case 'missingLayer':
      case 'badAssetIndex':
        appearance[key] = `${randInt1(CHARACTER_LAYER_COUNTS[key])}.png`;
        break;
      case 'clothingConflict':
        appearance.dress = null;
        appearance.top = `${randInt1(CHARACTER_LAYER_COUNTS.top)}.png`;
        appearance.bottom = `${randInt1(CHARACTER_LAYER_COUNTS.bottom)}.png`;
        break;
      case 'genderLockViolation':
        appearance[key] = null;
        if(key === 'dress' && !(appearance.top && appearance.bottom)){
          appearance.top = `${randInt1(CHARACTER_LAYER_COUNTS.top)}.png`;
          appearance.bottom = `${randInt1(CHARACTER_LAYER_COUNTS.bottom)}.png`;
        }
        break;
      case 'badHairColor':
        appearance.hairColor = pickHairColor();
        break;
      case 'badClothingColor':
        appearance.clothingColor = pickClothingColor(appearance.hairColor);
        break;
    }
  });
}
