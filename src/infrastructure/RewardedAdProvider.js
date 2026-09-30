/**
 * The native shell can expose this contract as `window.GBLB_ADMOB` once its
 * AdMob SDK/plugin is configured. The browser build deliberately has no
 * fallback that pretends an ad completed.
 */
export class AdMobRewardedProvider {
  constructor(bridge = null) {
    this.bridge = bridge;
  }

  getBridge() {
    return this.bridge ?? globalThis.GBLB_ADMOB ?? null;
  }

  isReady(placement) {
    try {
      return this.getBridge()?.isRewardedReady?.(placement) === true;
    } catch {
      return false;
    }
  }

  async show(placement, callbacks, context = {}) {
    const bridge = this.getBridge();
    if (!this.isReady(placement) || typeof bridge?.showRewarded !== 'function') return false;
    try {
      return await bridge.showRewarded(placement, callbacks, context);
    } catch (error) {
      callbacks.onFailed?.(error);
      return false;
    }
  }

  async getCompletedRewardReceipts() {
    const bridge = this.getBridge();
    if (typeof bridge?.getCompletedRewardReceipts !== 'function') return [];
    try {
      const receipts = await bridge.getCompletedRewardReceipts();
      return Array.isArray(receipts) ? receipts.filter((entry) => typeof entry?.rewardId === 'string') : [];
    } catch {
      return [];
    }
  }
}

export class RewardedAdService {
  constructor(provider) {
    this.provider = provider;
  }

  isReady(placement) {
    try {
      return this.provider?.isReady?.(placement) === true;
    } catch {
      return false;
    }
  }

  async show(placement, callbacks, context = {}) {
    if (!this.isReady(placement)) return false;
    return new Promise((resolve) => {
      let terminal = false;
      let loaded = false;
      let started = false;
      let completed = false;
      const finish = async (kind, detail) => {
        if (terminal) return;
        terminal = true;
        if (kind === 'onCompleted') completed = true;
        try { await callbacks[kind]?.(detail); } finally { resolve(completed); }
      };
      const providerCallbacks = {
        onLoaded: () => {
          if (terminal || loaded) return;
          loaded = true;
          callbacks.onLoaded?.();
        },
        onStarted: () => {
          if (terminal || started) return;
          started = true;
          callbacks.onStarted?.();
        },
        // The provider must call this only after its rewarded-completion signal.
        onCompleted: (receipt) => finish('onCompleted', receipt),
        onFailed: (error) => finish('onFailed', error),
        onClosed: () => finish('onClosed'),
      };

      Promise.resolve().then(() => this.provider.show(placement, providerCallbacks, context)).then((result) => {
        if (result === false) return finish('onFailed', new Error('Rewarded ad could not be shown.'));
        // Providers may return a promise that resolves with an explicit earned receipt.
        if (result && typeof result === 'object' && result.rewarded === true) {
          return finish('onCompleted', result);
        }
        if (result && typeof result === 'object' && result.error) {
          return finish('onFailed', result.error);
        }
        return undefined;
      }).catch((error) => finish('onFailed', error));
    });
  }

  async getCompletedRewardReceipts() {
    try {
      const receipts = await this.provider?.getCompletedRewardReceipts?.();
      return Array.isArray(receipts) ? receipts : [];
    } catch {
      return [];
    }
  }
}
