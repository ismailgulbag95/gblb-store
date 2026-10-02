import { SAVE_VERSION, hydrateState } from '../domain/state.js';

const KEYS = {
  current: 'gblb.orbit.save.current',
  backup: 'gblb.orbit.save.backup',
  journal: 'gblb.orbit.save.journal',
};

function checksum(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function wrap(payload, sequence, transactionId = 'checkpoint', preStringifiedPayload = null) {
  const payloadStr = preStringifiedPayload ?? JSON.stringify(payload);
  const body = `{"payload":${payloadStr},"sequence":${sequence},"transactionId":${JSON.stringify(transactionId)},"saveVersion":${SAVE_VERSION}}`;
  return JSON.stringify({ body, checksum: checksum(body) });
}

function unwrap(raw) {
  if (!raw) return null;
  const outer = JSON.parse(raw);
  if (!outer || typeof outer.body !== 'string' || checksum(outer.body) !== outer.checksum) return null;
  const envelope = JSON.parse(outer.body);
  if (!Number.isSafeInteger(envelope.sequence) || envelope.sequence < 0) return null;
  return envelope;
}

export class SaveRecoveryError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SaveRecoveryError';
  }
}

export class SaveService {
  constructor(storage = globalThis.localStorage) {
    this.storage = storage;
    this.sequence = 0;
    this.lastTransactionId = null;
    this.lastPayloadChecksum = null;
  }

  load() {
    const rawValues = Object.values(KEYS).map((key) => this.storage.getItem(key));
    if (rawValues.every((value) => value === null)) return { state: null, recovered: false };
    const candidates = rawValues.map((raw) => {
      try { return unwrap(raw); } catch { return null; }
    }).filter(Boolean).sort((a, b) => b.sequence - a.sequence);
    if (!candidates.length) throw new SaveRecoveryError('Kayıt, yedek ve işlem günlüğü doğrulanamadı.');
    const current = this.#readCurrent();
    let validationError = null;
    for (const selected of candidates) {
      try {
        const state = hydrateState(selected.payload);
        this.sequence = selected.sequence;
        this.lastTransactionId = selected.transactionId;
        this.lastPayloadChecksum = checksum(JSON.stringify(selected.payload));
        return {
          state,
          recovered: !current || selected.sequence !== current.sequence,
          migrated: selected.payload.saveVersion !== SAVE_VERSION || Boolean(selected.payload.ads?.pending)
            || !Array.isArray(selected.payload.decorations)
            || !selected.payload.decorations.some((entry) => entry?.type === 'trashBin'),
          sequence: this.sequence,
        };
      } catch (error) {
        validationError = error;
      }
    }
    throw new SaveRecoveryError(`Kayıt doğrulaması başarısız: ${validationError?.message ?? 'geçerli yedek bulunamadı'}`);
  }

  #readCurrent() {
    try { return unwrap(this.storage.getItem(KEYS.current)); } catch { return null; }
  }

  commit(state, transactionId) {
    if (!transactionId) throw new TypeError('Kalıcı işlem için transactionId gerekir.');
    const payloadJson = JSON.stringify(state);
    const payloadHash = checksum(payloadJson);
    if (transactionId === this.lastTransactionId) {
      if (payloadHash === this.lastPayloadChecksum) return { duplicate: true, sequence: this.sequence };
      throw new SaveRecoveryError(`Transaction ID farklı içerikle tekrar kullanıldı: ${transactionId}`);
    }
    const nextSequence = this.sequence + 1;
    const nextRecord = wrap(state, nextSequence, transactionId, payloadJson);
    const current = this.storage.getItem(KEYS.current);
    if (current) {
      try { this.storage.setItem(KEYS.backup, current); } catch { /* current remains authoritative */ }
    }
    try {
      this.storage.setItem(KEYS.current, nextRecord);
    } catch (error) {
      throw new SaveRecoveryError(`Kayıt yazılamadı: ${error.message}`);
    }
    this.sequence = nextSequence;
    this.lastTransactionId = transactionId;
    this.lastPayloadChecksum = payloadHash;
    try { this.storage.setItem(KEYS.journal, nextRecord); } catch { /* current already committed */ }
    return { duplicate: false, sequence: nextSequence };
  }

  checkpoint(state) {
    return this.commit(state, `checkpoint:${state.tick}`);
  }

  clear() {
    for (const key of Object.values(KEYS)) this.storage.removeItem(key);
    this.sequence = 0;
    this.lastTransactionId = null;
    this.lastPayloadChecksum = null;
  }
}
