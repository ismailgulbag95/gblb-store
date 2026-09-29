export const DECORATIONS = Object.freeze({
  petalPlanter: { name: { tr: 'Lüks seramik salon saksısı', en: 'Luxury ceramic planter' }, price: 120, score: 4, model: 'gblb_petal_planter', scale: 1 },
  farmhouseSign: { name: { tr: 'İndirim & kampanya panosu', en: 'Promotional A-frame sign' }, price: 175, score: 6, model: 'gblb_farmhouse_sign', scale: 1 },
  orchardLantern: { name: { tr: 'Modern mağaza feneri', en: 'Modern retail floor lantern' }, price: 240, score: 8, model: 'gblb_orchard_lantern', scale: 1 },
  welcomeMat: { name: { tr: 'Süpermarket giriş paspası', en: 'Supermarket entrance mat' }, price: 85, score: 3, model: 'gblb_welcome_mat', scale: 1 },
  pennantBanner: { name: { tr: 'Renkli kampanya flaması', en: 'Store promotional bunting' }, price: 145, score: 5, model: 'gblb_orchard_pennant', scale: 1 },
  harvestBasket: { name: { tr: 'Teşhir promosyon sepeti', en: 'Retail promo basket' }, price: 110, score: 4, model: 'gblb_harvest_basket', scale: 1 },
  citrusTopiary: { name: { tr: 'Minyatür narenciye ağacı', en: 'Mini citrus topiary' }, price: 195, score: 7, model: 'gblb_citrus_topiary', scale: 1 },
  windowDisplay: { name: { tr: 'Görkemli vitrin çiçekliği', en: 'Grand floral window display' }, price: 165, score: 6, model: 'gblb_floral_window_sculpture', scale: 1 },
  cardboardBoxes: { name: { tr: 'Depo koli & palet seti', en: 'Warehouse shipping pallets' }, price: 45, score: 0, model: 'gblb_shipping_boxes', scale: 1 },
});

export const decorScore = (state) => (state.decorations ?? []).reduce((total, entry) => total + (DECORATIONS[entry.type]?.score ?? 0), 0);
export const decorBonus = (state) => Math.min(0.2, decorScore(state) * 0.004);
