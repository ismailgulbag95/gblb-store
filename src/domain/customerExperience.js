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

export function tipForMood(customer) {
  return customerMood(customer) < 85 ? 10 : 12;
}
