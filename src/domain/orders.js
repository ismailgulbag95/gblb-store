import { ITEMS, SHELVES } from './catalog.js';

export function nextOrder(state) {
  if ((state.stats.tomatoSold ?? 0) === 0) return null;
  const products = state.unlockedProducts.filter((id) => SHELVES[id]);
  if (!products.length) return null;
  // Ekrana gelen müşteri siparişleri her seferinde mevcut üretilebilir ürünlerden rastgele seçilir
  const salt = (state.ordersCompleted * 1664525 + 1013904223) >>> 0;
  const item = products[salt % products.length];
  const quantity = Math.min(3, state.player.capacity);
  return { item, quantity, reward: ITEMS[item].price * quantity + 5 };
}

export function orderProgress(state) {
  const order = state.activeOrder;
  if (!order) return 0;
  return Math.min(order.quantity, state.stock.player.items[order.item] ?? 0);
}

export function decorationPrice(state, basePrice) {
  return Math.max(0, basePrice - ((state.decorVouchers ?? 0) > 0 ? 20 : 0));
}
