/**
 * The native shell can expose this contract as `window.GBLB_ADMOB` once its
 * AdMob SDK/plugin is configured. This provider never fabricates completion;
 * local simulation lives in the separate development-only wrapper below.
 */
export class AdMobRewardedProvider {
  constructor(bridge = null) {
    this.bridge = bridge;
  }

  getBridge() {
    return this.bridge ?? globalThis.GBLB_ADMOB ?? null;
  }

  isConfigured() {
    const bridge = this.getBridge();
    return typeof bridge?.isRewardedReady === 'function' && typeof bridge?.showRewarded === 'function';
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

/**
 * Local development only: simulates a completed opt-in ad when there is no
 * configured AdMob bridge. A configured bridge always takes precedence.
 */
export class DevelopmentRewardedProvider {
  constructor(nativeProvider, enabled = false, delayMs = 3_000) {
    this.nativeProvider = nativeProvider;
    this.enabled = enabled;
    this.delayMs = delayMs;
  }

  isSimulated() {
    return this.enabled && !this.nativeProvider?.isConfigured?.();
  }

  isReady(placement) {
    if (this.nativeProvider?.isConfigured?.()) return this.nativeProvider.isReady(placement);
    return this.enabled;
  }

  async show(placement, callbacks, context = {}) {
    if (this.nativeProvider?.isConfigured?.()) return this.nativeProvider.show(placement, callbacks, context);
    if (!this.enabled) return false;
    callbacks.onLoaded?.();
    callbacks.onStarted?.();
    await new Promise((resolve) => setTimeout(resolve, this.delayMs));
    const receipt = { rewardId: context.rewardId, rewarded: true, source: 'development-simulation' };
    callbacks.onCompleted?.(receipt);
    return receipt;
  }

  getCompletedRewardReceipts() {
    return this.nativeProvider?.getCompletedRewardReceipts?.() ?? [];
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

  isSimulated() {
    try {
      return this.provider?.isSimulated?.() === true;
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
        onCompleted: (receipt) => {
          if (receipt?.rewarded !== true || receipt.rewardId !== context.rewardId) {
            return finish('onFailed', new Error('Rewarded completion receipt is invalid.'));
          }
          return finish('onCompleted', receipt);
        },
        onFailed: (error) => finish('onFailed', error),
        onClosed: () => finish('onClosed'),
      };

      Promise.resolve().then(() => this.provider.show(placement, providerCallbacks, context)).then((result) => {
        if (result === false) return finish('onFailed', new Error('Rewarded ad could not be shown.'));
        // Providers may return a promise that resolves with an explicit earned receipt.
        if (result && typeof result === 'object' && result.rewarded === true) {
          return result.rewardId === context.rewardId
            ? finish('onCompleted', result)
            : finish('onFailed', new Error('Rewarded completion receipt does not match the active request.'));
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
