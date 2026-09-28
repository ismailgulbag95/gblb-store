import { MONEY_ATOMS } from './catalog.js';

export class InsufficientBalanceError extends Error {
  constructor(requiredAtoms, balanceAtoms) {
    super(`Yetersiz bakiye: ${requiredAtoms} atom gerekiyor, ${balanceAtoms} atom var.`);
    this.name = 'InsufficientBalanceError';
    this.requiredAtoms = requiredAtoms;
    this.balanceAtoms = balanceAtoms;
  }
}

export class TransactionIdConflictError extends Error {
  constructor(transactionId) {
    super(`Transaction ID tekrar kullanıldı: ${transactionId}`);
    this.name = 'TransactionIdConflictError';
  }
}

export class EconomyLedger {
  constructor(economy) {
    this.economy = economy;
  }

  getBalance() {
    return this.economy.balanceAtoms / MONEY_ATOMS;
  }

  #findTransaction(transactionId) {
    return this.economy.entries.find((entry) => entry.id === transactionId);
  }

  debit(transactionId, amount, reason) {
    if (typeof transactionId !== 'string' || !transactionId) throw new TypeError('Transaction ID gerekir.');
    const atoms = this.#amountToAtoms(amount);
    const existing = this.#findTransaction(transactionId);
    if (existing) {
      if (existing.type === 'DEBIT' && existing.amountAtoms === atoms && existing.reason === reason) return { duplicate: true, balance: this.getBalance() };
      throw new TransactionIdConflictError(transactionId);
    }
    if (this.economy.balanceAtoms < atoms) throw new InsufficientBalanceError(atoms, this.economy.balanceAtoms);
    this.#append({ id: transactionId, type: 'DEBIT', amountAtoms: atoms, reason });
    return { duplicate: false, balance: this.getBalance() };
  }

  credit(transactionId, amount, reason) {
    if (typeof transactionId !== 'string' || !transactionId) throw new TypeError('Transaction ID gerekir.');
    const atoms = this.#amountToAtoms(amount);
    const existing = this.#findTransaction(transactionId);
    if (existing) {
      if (existing.type === 'CREDIT' && existing.amountAtoms === atoms && existing.reason === reason) return { duplicate: true, balance: this.getBalance() };
      throw new TransactionIdConflictError(transactionId);
    }
    this.#append({ id: transactionId, type: 'CREDIT', amountAtoms: atoms, reason });
    return { duplicate: false, balance: this.getBalance() };
  }

  #amountToAtoms(amount) {
    if (!Number.isFinite(amount) || amount <= 0) throw new RangeError('İşlem tutarı sıfırdan büyük olmalı.');
    const atoms = Math.round(amount * MONEY_ATOMS);
    if (!Number.isSafeInteger(atoms) || atoms <= 0) throw new RangeError('İşlem tutarı güvenli sayı sınırını aşıyor.');
    return atoms;
  }

  #append(entry) {
    const balance = this.economy.balanceAtoms + (entry.type === 'CREDIT' ? entry.amountAtoms : -entry.amountAtoms);
    if (!Number.isSafeInteger(balance) || balance < 0) throw new RangeError('İşlem bakiyeyi güvenli sınırın dışına çıkarıyor.');
    this.economy.balanceAtoms = balance;
    this.economy.entries.push({ ...entry, balanceAtoms: this.economy.balanceAtoms });
    if (this.economy.entries.length > 2_000) this.economy.entries.splice(0, 1);
  }
}
