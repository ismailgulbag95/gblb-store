import { ITEMS } from './catalog.js';

export const DEFAULT_CUSTOMER_SATISFACTION = 50;

export function normalizeCustomerSatisfaction(value, fallback = DEFAULT_CUSTOMER_SATISFACTION) {
  const score = Number.isFinite(value) ? value : fallback;
  return Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : DEFAULT_CUSTOMER_SATISFACTION)));
}

export function adjustCustomerSatisfaction(state, amount) {
  state.customerSatisfaction = normalizeCustomerSatisfaction(state.customerSatisfaction) + amount;
  state.customerSatisfaction = normalizeCustomerSatisfaction(state.customerSatisfaction);
  return state.customerSatisfaction;
}

export function customerSpawnIntervalTicks(satisfaction) {
  const score = normalizeCustomerSatisfaction(satisfaction);
  return 60 - Math.round(score * 0.4);
}

export function customerMood(customer) {
  const missed = customer.missedItems ?? 0;
  const wait = customer.checkoutWaitTicks ?? 0;
  const mealWait = customer.mealWaitTicks ?? 0;
  const score = 100 - missed * 25 - Math.floor(wait / 50) * 5 - Math.floor(mealWait / 60) * 5;
  return Math.max(40, Math.min(100, score));
}

export function saleMoodMultiplier(customer) {
  return customerMood(customer) < 85 ? 0.95 : 1;
}

// ponytail: değişken oranlı pekiştirme (jackpot bahşiş) oyuncu bağlılığını maksimize eder
export function tipForMood(customer, roll = null) {
  if (customerMood(customer) < 85) return 10;
  if (roll === null) return 12;
  if (roll < 0.10) return 30;
  if (roll < 0.25) return 18;
  return 12;
}

// ponytail: müşterinin mağazada bulamadığı sepet tutarını fırsat maliyeti olarak hesaplar
export function missedOpportunityAmount(customer) {
  if (!customer) return 0;
  if (Array.isArray(customer.shoppingList) && customer.shoppingList.length) {
    const remainingItems = customer.shoppingList.slice(customer.shoppingIndex ?? 0);
    return remainingItems.reduce((total, item) => total + (ITEMS[item]?.price ?? 5), 0);
  }
  return customer.demand && ITEMS[customer.demand]?.price ? ITEMS[customer.demand].price : 5;
}
