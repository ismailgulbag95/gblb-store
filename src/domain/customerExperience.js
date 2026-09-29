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
