# AdMob rewarded bridge

The game now owns rewarded-ad eligibility, placement limits, pending reward IDs,
callback de-duplication, reward delivery, and analytics. The browser build does
not include an ad SDK and intentionally reports every placement as not ready.
No browser callback can grant a reward by itself.

When a native Android/iOS shell and AdMob SDK are configured, expose this bridge
before the game starts (or attach it later; the adapter checks it dynamically):

```js
window.GBLB_ADMOB = {
  isRewardedReady(placement) {},
  showRewarded(placement, callbacks, context) {},
  getCompletedRewardReceipts() {},
};
```

`showRewarded` may invoke `callbacks.onLoaded()`, `callbacks.onStarted()`,
`callbacks.onFailed(error)`, or `callbacks.onClosed()`. It must invoke
`callbacks.onCompleted(receipt)` only after the AdMob rewarded completion
signal, never for a load, show, close, or error callback. The game processes
only the first terminal callback for each reward ID. The `context` includes a
unique `rewardId` and the placement payload so a native host can persist an
earned receipt across process shutdown.

If the process exits while an ad is active, the game keeps the pending reward
ID. On the next launch it asks `getCompletedRewardReceipts()` for entries shaped
like `{ rewardId, rewarded: true }`. It grants only a matching receipt and drops
an interrupted ad otherwise. An unconfigured bridge has no readiness, show, or
receipt methods and therefore cannot grant anything.

Placement IDs currently used by the game are `order-double`, `supplier-drop`,
`farm-unlock`, and `staff-hire`. Ad unit IDs, consent flow, SDK initialization,
and Android/iOS plugin selection are intentionally left for the native setup
stage.
