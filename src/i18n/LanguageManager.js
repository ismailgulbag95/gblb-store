/**
 * LanguageManager handles i18n localization for both UI and 3D World Badges.
 */
export const TRANSLATIONS = {
  tr: {
    // Top Bar & Controls
    speed_boost: '2x HIZ',
    quest_title: '🎯 GÖREV',
    initial_quest: '🍅 Domates topla ve reyon rafına diz!',
    
    // Items
    item_tomato: 'Domates',
    item_tomato_paste: 'Salça Kavanozu',
    item_orange: 'Portakal',
    item_orange_juice: 'Taze Portakal Suyu',
    item_corn: 'Taze Mısır',
    item_popcorn: 'Sıcak Popcorn',
    item_egg: 'Çiftlik Yumurtası',
    item_wheat: 'Altın Buğday',
    item_bread: 'Taş Fırın Ekmek',
    item_burger: 'Gurme Burger',
    item_pizza: 'İtalyan Pizza',
    item_coffee: 'Kremalı Latte',

    // Upgrades & Zones
    hire_cashier: 'Kasiyer İşe Al',
    hire_harvester: 'Tarla İşçisi Al',
    hire_factory_worker: 'Fabrika İşçisi Al',
    hire_farm_caretaker: 'Çiftlik Bakıcısı Al',
    hire_chef: 'Restoran Şefi Al',
    hire_waiter: 'Garson İşe Al',

    unlock_paste: 'Salça Kazanı Aç',
    unlock_orange: 'Portakal Bahçesi Aç',
    unlock_juice: 'Meyve Sıkacağı Kur',
    unlock_corn: 'Mısır Tarlası Aç',
    unlock_coop: 'Tavuk Kümesi Kur',
    unlock_popcorn: 'Popcorn Makinesi Aç',
    unlock_wheat: 'Buğday Tarlası Aç',
    unlock_bakery: 'Taş Ekmek Fırını Aç',
    unlock_restaurant: 'Restoran Kompleksi Aç',
    unlock_burger: 'Burger Grill İstasyonu',
    unlock_pizza: 'Pizza Fırını İstasyonu',
    unlock_tables: 'Yemek Masaları Kur',
    upgrade_backpack: 'Sırt Çantası +4',

    // Toasts & Alerts
    sale_toast: 'Satış!',
    tip_toast: 'Yemek Bahşişi!',
    unlocked_toast: 'Açıldı!',

    // Settings & Modal
    settings_title: 'AYARLAR & DEBUG',
    tab_general: 'Genel',
    tab_character: '🐱 Karakter',
    tab_debug: '🛠️ Debug Modu',
    tab_language: '🌐 Dil / Language',
    char_select_title: 'OYUNCU KARAKTERİNİ SEÇ',
    char_shopkeeper: '👨‍🌾 Market Çalışanı',
    char_shopkeeper_desc: 'Klasik çalışkan süpermarket ve çiftlik yöneticisi',
    char_cat: '🐱 Maceracı Kedi',
    char_cat_desc: 'Zümrüt gözlü, sevimli kıvrık kuyruklu maceracı kedi',
    sfx: '🔊 Ses Efektleri',
    music: '🎵 Fon Müziği',
    haptics: '📳 Titreşim / Haptik',
    lang_turkish: '🇹🇷 Türkçe',
    lang_english: '🇬🇧 English',
    debug_badge: '⚡ GELİŞTİRİCİ TEST PANELİ',
    debug_money_1k: '💵 +1.000$ Para Ekle',
    debug_money_inf: '♾️ Sınırsız Para (99.999$)',
    debug_speed_2x: '⚡ 2x Oyun Hızı',
    debug_speed_5x: '🚀 5x Süper Hız',
    debug_capacity: '🎒 +50 Çanta Kapasitesi',
    debug_reset_money: '🧹 Parayı Sıfırla (0$)',

    // Machine Status
    status_input: 'Giriş',
    status_cooking: 'Pişiyor...',
    status_ready: 'Hazır!',
    shelf_stock: 'Stok'
  },
  en: {
    // Top Bar & Controls
    speed_boost: '2x SPEED',
    quest_title: '🎯 QUEST',
    initial_quest: '🍅 Harvest tomatoes and fill the shelf!',

    // Items
    item_tomato: 'Tomato',
    item_tomato_paste: 'Tomato Paste',
    item_orange: 'Orange',
    item_orange_juice: 'Fresh Orange Juice',
    item_corn: 'Fresh Corn',
    item_popcorn: 'Hot Popcorn',
    item_egg: 'Farm Egg',
    item_wheat: 'Golden Wheat',
    item_bread: 'Stone Oven Bread',
    item_burger: 'Gourmet Burger',
    item_pizza: 'Italian Pizza',
    item_coffee: 'Creamy Latte',

    // Upgrades & Zones
    hire_cashier: 'Hire Cashier',
    hire_harvester: 'Hire Harvester',
    hire_factory_worker: 'Hire Factory Worker',
    hire_farm_caretaker: 'Hire Farm Caretaker',
    hire_chef: 'Hire Restaurant Chef',
    hire_waiter: 'Hire Waiter',

    unlock_paste: 'Unlock Paste Vat',
    unlock_orange: 'Unlock Orange Orchard',
    unlock_juice: 'Build Juicer Station',
    unlock_corn: 'Unlock Corn Field',
    unlock_coop: 'Build Chicken Coop',
    unlock_popcorn: 'Unlock Popcorn Machine',
    unlock_wheat: 'Unlock Wheat Field',
    unlock_bakery: 'Unlock Bakery Oven',
    unlock_restaurant: 'Open Restaurant Complex',
    unlock_burger: 'Burger Grill Station',
    unlock_pizza: 'Pizza Oven Station',
    unlock_tables: 'Build Dining Tables',
    upgrade_backpack: 'Backpack +4',

    // Toasts & Alerts
    sale_toast: 'Sale!',
    tip_toast: 'Dining Tip!',
    unlocked_toast: 'Unlocked!',

    // Settings & Modal
    settings_title: 'SETTINGS & DEBUG',
    tab_general: 'General',
    tab_character: '🐱 Character',
    tab_debug: '🛠️ Debug Mode',
    tab_language: '🌐 Language',
    char_select_title: 'CHOOSE PLAYER CHARACTER',
    char_shopkeeper: '👨‍🌾 Market Clerk',
    char_shopkeeper_desc: 'Classic hardworking supermarket & farm manager',
    char_cat: '🐱 Adventurer Cat',
    char_cat_desc: 'Emerald-eyed ginger tabby adventurer with wagging tail',
    sfx: '🔊 Sound Effects',
    music: '🎵 Music',
    haptics: '📳 Haptic Feedback',
    lang_turkish: '🇹🇷 Türkçe',
    lang_english: '🇬🇧 English',
    debug_badge: '⚡ DEVELOPER CHEAT PANEL',
    debug_money_1k: '💵 Add +1.000$ Cash',
    debug_money_inf: '♾️ Infinite Cash (99.999$)',
    debug_speed_2x: '⚡ 2x Game Speed',
    debug_speed_5x: '🚀 5x Super Speed',
    debug_capacity: '🎒 +50 Backpack Slots',
    debug_reset_money: '🧹 Reset Cash (0$)',

    // Machine Status
    status_input: 'Input',
    status_cooking: 'Cooking...',
    status_ready: 'Ready!',
    shelf_stock: 'Stock'
  }
};

export class LanguageManager {
  constructor(defaultLang = 'tr') {
    this.currentLang = defaultLang;
    this.listeners = [];
  }

  setLanguage(lang) {
    if (TRANSLATIONS[lang]) {
      this.currentLang = lang;
      this.listeners.forEach(fn => fn(lang));
    }
  }

  getLanguage() {
    return this.currentLang;
  }

  getCurrentLanguage() {
    return this.currentLang;
  }

  t(key) {
    if (TRANSLATIONS[this.currentLang] && TRANSLATIONS[this.currentLang][key]) {
      return TRANSLATIONS[this.currentLang][key];
    }
    return TRANSLATIONS.tr[key] || key;
  }

  onChange(callback) {
    this.listeners.push(callback);
  }
}

export const i18n = new LanguageManager('tr');
