/* =========================================================================
   CHARACTER RENDERER — turns an appearance recipe into markup
   -------------------------------------------------------------------------
   Pure rendering: takes the (already-generated, immutable) appearance
   recipe stored on a customer and returns an HTML string of stacked
   layer <img> tags. Does not generate or mutate appearance data — that is
   customer-appearance.js's job. Callers just drop the returned markup into
   a container that has real size (see .char-sprite / .char-sprite-lg CSS).
   ========================================================================= */

function characterSpriteHTML(appearance, extraClass){
  if(!appearance) return '';
  const layers = CHARACTER_LAYER_ORDER
    .filter(key => appearance[key])
    .map(key => {
      const folder = CHARACTER_LAYER_FOLDER[key];
      const src = `${CHARACTER_ASSET_PATH}${folder}/${appearance[key]}`;
      return `<img class="char-layer" src="${src}" alt="" draggable="false">`;
    })
    .join('');
  const cls = extraClass ? `char-sprite ${extraClass}` : 'char-sprite';
  return `<div class="${cls}">${layers}</div>`;
}
