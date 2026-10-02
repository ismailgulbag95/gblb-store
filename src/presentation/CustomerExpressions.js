export function customerHasPaid(customer, items = {}) {
  return customer.kind === 'shopper' && customer.phase === 'leaving'
    && (customer.basket?.length ?? 0) > 0
    && !Object.values(items).some(count => count > 0);
}

export function customerExpression(customer, action) {
  if (customer.reaction) return customer.reaction === 'happy' ? 'happy' : 'unhappy';
  if (action?.type === 'shop' && action.elapsed >= 1.4) return 'happy';
  if (['queueing', 'paying'].includes(customer.phase) && (customer.checkoutWaitTicks ?? 0) > 30) return 'waiting';
  if (customer.phase === 'waiting-stock') return 'missing';
  return null;
}
