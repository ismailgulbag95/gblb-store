import { ITEMS, MONEY_ATOMS } from '../domain/catalog.js';
import { assetIconMarkup } from '../ui/AssetIcons.js';

export class ToastManager {
  constructor(app) {
    this.app = app;
    this.lastEventSoundTime = 0;
    this.audioContext = null;
  }

  toast(message, tone = 'success', iconId = null) {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast-msg${tone === 'error' ? ' error' : ''}`;
    if (iconId) toast.innerHTML = assetIconMarkup(iconId, 30);
    toast.append(document.createTextNode(message));
    container.appendChild(toast);
    while (container.children.length > 3) {
      container.firstElementChild.remove();
    }
    window.setTimeout(() => toast.remove(), 2600);
  }

  showEvent(event) {
    if (event.type === 'production') return;
    let message = event.message;
    let iconId = null;
    const tone = event.tone ?? (event.type === 'customer-lost' ? 'error' : 'success');
    if (event.type === 'world-event') this.playEventSound(event.eventType === 'strayCat' && event.success ? 'ambient-cat' : event.tone === 'error' || event.success === false ? 'world-crisis' : 'world-event');
    if (event.type === 'sale' || event.type === 'cash-collected' || event.type === 'tip-ready' || event.type === 'customer-lost') {
      this.playEventSound(event.isJackpot ? 'jackpot' : event.type);
    }
    if (event.type === 'payroll') {
      const english = this.app.getState().settings.language === 'en';
      const locale = english ? 'en-US' : 'tr-TR';
      const paid = `$${(event.paidAtoms / MONEY_ATOMS).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      if (english) {
        message = event.resumedCount && !event.dayStarted
          ? `${event.resumedCount} staff member(s) received overdue pay and returned to work.`
          : `Day ${event.day} payroll: ${paid} paid${event.waitingCount ? ` · ${event.waitingCount} waiting for salary` : ''}.`;
      } else {
        message = event.resumedCount && !event.dayStarted
          ? `${event.resumedCount} personelin gecikmiş maaşı ödendi; işe döndü.`
          : `Gün ${event.day} maaş ödemesi: ${paid}${event.waitingCount ? ` · ${event.waitingCount} personel bekliyor` : ''}.`;
      }
    }
    if (event.type === 'cash-collected') {
      const english = this.app.getState().settings.language === 'en';
      const locale = english ? 'en-US' : 'tr-TR';
      const collected = `$${(event.amountAtoms / MONEY_ATOMS).toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      message = english ? `${collected} collected from the register.` : `Kasadan ${collected} toplandı.`;
    }
    if (this.app.getState().settings.language === 'en') {
      if (event.type === 'sale') {
        const itemIds = event.items ?? [event.item];
        iconId = ITEMS[itemIds[0]]?.icon ?? 'stock';
        const sold = itemIds.map((itemId) => this.itemNameEnglish(itemId, ITEMS[itemId]?.name ?? itemId));
        message = `Checkout cash $${event.amount.toFixed(2)} · ${sold.join(', ')} sold${event.decorationBonus ? ` · +${(event.decorationBonus * 100).toFixed(1)}% decor bonus` : ''}.`;
      }
      if (event.type === 'tip-ready') {
        iconId = 'tip';
        message = event.isJackpot
          ? `🔥 JACKPOT TIP! A customer left $${Number(event.tipAmount ?? 0).toFixed(2)}!`
          : ((event.tipAmount ?? 0) >= 18 ? `⭐ Generous Customer! Left $${Number(event.tipAmount ?? 0).toFixed(2)} tip!` : 'A customer left a tip.');
      }
      if (event.type === 'customer-lost') {
        iconId = 'stock';
        message = `⚠️ Customer left empty-handed! Lost revenue: -$${Number(event.lostAmount ?? 0).toFixed(2)}`;
      }
      if (message === 'Yedek kayıttan devam edildi.') message = 'Recovered from the backup save.';
      if (message === 'Yeni oyun hazır.') message = 'A new game is ready.';
      if (message === 'Müşteriler kasada ödeme yapıyor.') message = 'Customers are paying at the register.';
      if (message.includes('ürün alındı.')) message = 'Products collected.';
      if (message.includes('Reyon dolduruldu.')) message = 'Shelf restocked.';
      if (message.includes('Ürün makineye aktarıldı')) message = 'Ingredients moved to the machine.';
      if (message.includes('Bahşiş alındı.')) message = 'Tip collected.';
      if (message.includes('Yemek servis edildi.')) message = 'Meal served.';
      if (message.includes('eklendi.')) message = 'Credits added.';
    }
    if (event.type === 'sale') iconId ??= ITEMS[(event.items ?? [event.item])[0]]?.icon ?? 'stock';
    if (event.type === 'production') iconId ??= ITEMS[event.item]?.icon ?? 'stock';
    if (event.type === 'tip-ready') iconId ??= 'tip';
    if (event.type === 'customer-lost') iconId ??= 'stock';
    this.toast(message, tone, iconId);
  }

  itemNameEnglish(itemId, fallback) {
    return ({
      TOMATO: 'Tomato', TOMATO_PASTE: 'Tomato paste', ORANGE: 'Orange', ORANGE_JUICE: 'Orange juice',
      CORN: 'Corn', POPCORN: 'Popcorn', CHICKEN_FEED: 'Chicken feed', EGG: 'Egg', WHEAT: 'Wheat',
      FLOUR: 'Flour', BREAD: 'Bread', ORANGE_TART: 'Orange tart', BURGER: 'Gourmet burger', PIZZA: 'Pizza',
    })[itemId] ?? fallback;
  }

  playEventSound(type) {
    if (!this.app.getState().settings.sound) return;
    const now = performance.now();
    if (now - (this.lastEventSoundTime ?? 0) < 180) return;
    this.lastEventSoundTime = now;
    const AudioContextType = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextType) return;
    try {
      this.audioContext ??= new AudioContextType();
      if (this.audioContext.state === 'suspended') this.audioContext.resume();
      const frequencies = {
        'world-event': [523, 659, 784],
        'world-crisis': [440, 330, 440],
        'ambient-cat': [540],
        'cash-collected': [740, 980],
        sale: [620, 840],
        production: [450, 580],
        'tip-ready': [740, 980],
        jackpot: [587, 740, 880, 1175],
        'customer-lost': [370, 247],
      };
      const tones = frequencies[type] ?? [600];
      tones.forEach((frequency, index) => {
        const oscillator = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();
        const start = this.audioContext.currentTime + index * 0.075;
        oscillator.type = type === 'ambient-cat' ? 'triangle' : 'sine';
        oscillator.frequency.value = frequency;
        if (type === 'ambient-cat') { oscillator.frequency.setValueAtTime(frequency, start); oscillator.frequency.exponentialRampToValueAtTime(360, start + 0.12); }
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.025, start + 0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
        oscillator.connect(gain);
        gain.connect(this.audioContext.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.12);
      });
    } catch {
      /* sound is optional */
    }
  }
}
