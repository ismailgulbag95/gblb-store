# AdMob rewarded bridge

The game owns rewarded-ad eligibility, placement limits, pending reward IDs,
callback de-duplication, reward delivery, and analytics. The production build
does not include an ad SDK and reports placements as not ready until the native
AdMob bridge is configured.

In Vite development mode only, when no configured bridge exists, an explicit
development provider makes eligible ad buttons usable. It waits three seconds
and emits a marked simulated completion receipt. Progression unlock placements
bypass ad session and frequency limits for testing; `bonus-offer` still obeys
the daily and recent frequency limits. A configured bridge always takes
precedence, including when its ad is not ready; it never falls back to a
simulated reward. The development provider is disabled in production builds.

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
signal, never for a load, show, close, or error callback. The receipt must be
shaped like `{ rewardId: context.rewardId, rewarded: true }`. The game processes
only the first terminal callback for each reward ID and rejects receipts that
do not match the active request. The `context` includes a unique `rewardId` and
the placement payload so a native host can persist an earned receipt across
process shutdown.

If the process exits while an ad is active, the game keeps the pending reward
ID. On the next launch it asks `getCompletedRewardReceipts()` for entries shaped
like `{ rewardId, rewarded: true }`. It grants only a matching receipt and drops
an interrupted ad otherwise. In development, an interrupted simulation has no
persisted completion receipt and grants nothing after reload. An unconfigured
bridge cannot grant anything on its own.

Placement IDs currently used by the game are `order-double`, `supplier-drop`,
`farm-unlock`, `staff-hire`, `character-unlock`, and `bonus-offer`. The bonus
placement is shown in a surprise offer modal after active-play timing; the
video starts only after the player taps its accept button. Its payload identifies
a five-minute walking speed boost, a permanent bag-capacity increase, or an
unlockable character. Locked character cards use `character-unlock` directly;
surprise offers can grant that same character reward too.
Ad unit IDs, consent flow, SDK initialization, and Android/iOS plugin selection
are intentionally left for the native setup stage.
