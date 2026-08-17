/* =========================================================================
   CHARACTER RENDERER — turns an appearance recipe into markup
   -------------------------------------------------------------------------
   Pure rendering: takes the (already-generated, immutable) appearance
   recipe stored on a customer and returns an HTML string of stacked
   layer <img>/<div> tags. Does not generate or mutate appearance data —
   that is customer-appearance.js's job. Callers just drop the returned
   markup into a container that has real size (see .char-sprite /
   .char-sprite-lg CSS).

   COLOR TINTING: hair-family and clothing-family layers are uncolored
   black-outline PNGs (verified alpha transparency, no fill). They are
   recolored here via CSS mask-image — the image supplies the shape (through
   its alpha channel) and a plain background-color supplies the color. This
   is non-destructive: the source PNGs are only ever read, never modified.
   Everything else (body, face, shoes, gloves) renders exactly as before.
   ========================================================================= */

// Layers tinted with the customer's hairColor / clothingColor. Any layer
// not listed here renders as a plain, untinted <img> (unchanged behavior).
const HAIR_TINT_LAYERS = new Set(['hairBack', 'hair', 'bangs', 'hairBonus', 'beard']);
const CLOTHING_TINT_LAYERS = new Set(['top', 'bottom', 'dress']);

function characterLayerHTML(key, src, appearance){
  if(HAIR_TINT_LAYERS.has(key)){
    return tintedLayerHTML(src, HAIR_COLORS[appearance.hairColor] || HAIR_COLORS.black);
  }
  if(CLOTHING_TINT_LAYERS.has(key)){
    return tintedLayerHTML(src, CLOTHING_COLORS[appearance.clothingColor] || CLOTHING_COLORS.cream);
  }
  return `<img class="char-layer" src="${src}" alt="" draggable="false">`;
}

function tintedLayerHTML(src, colorHex){
  return `<div class="char-layer char-layer-tint" style="background-color:${colorHex}; -webkit-mask-image:url('${src}'); mask-image:url('${src}')"></div>`;
}

function characterSpriteHTML(appearance, extraClass){
  if(!appearance) return '';
  const layers = CHARACTER_LAYER_ORDER
    .filter(key => appearance[key])
    .map(key => {
      const folder = CHARACTER_LAYER_FOLDER[key];
      const src = `${CHARACTER_ASSET_PATH}${folder}/${appearance[key]}`;
      return characterLayerHTML(key, src, appearance);
    })
    .join('');
  const cls = extraClass ? `char-sprite ${extraClass}` : 'char-sprite';
  return `<div class="${cls}">${layers}</div>`;
}
