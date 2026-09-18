# Duolingo Design System for GBLB STORE 3D (DESIGN.md)

> Bu belge, oyunun arayüz mimarisi, görsel kimliği ve bileşen tasarım standardını belirler. Tüm UI, HUD, modal, tipografi ve efekt geliştirmelerinde bağlayıcıdır.

---

## 1. Felsefe & Kimlik: Duolingo Taktil & Claymorphic Standardı

Duolingo arayüz dili; **neşeli, canlı, tombul (chunky), 3D basılabilir (pushable bevels)** ve son derece tatmin edici **dokunsal geri bildirimler (tactile feedback)** üzerine kuruludur.

Karanlık/kasvetli çizgiler yerine; enerjik, neşeli, kalın alt gölgeli ve parmakla basıldığında içeri çöken oyuncak gibi bir arayüz esastır.

---

## 2. Renk Paleti (Duolingo Palette)

### Ana Canlı Renkler
- **Duo Green (Ana Başarı/Kabul)**: `#58CC02` (Üst yüzey) | `#46A302` (3D Alt gölge)
- **Fox Orange (Süper Hız & Seri)**: `#FF9600` (Üst yüzey) | `#E58500` (3D Alt gölge)
- **Cardinal Red (Kalp & Vurgu)**: `#FF4B4B` (Üst yüzey) | `#E53238` (3D Alt gölge)
- **Bee Gold (Para & Altın Taç)**: `#FFC800` (Üst yüzey) | `#E5B200` (3D Alt gölge)
- **Sky Blue (Elmas & Bilgi)**: `#1CB0F6` (Üst yüzey) | `#1899D6` (3D Alt gölge)
- **Lilac Purple (Özel XP & Karakterler)**: `#CE82FF` (Üst yüzey) | `#A559D9` (3D Alt gölge)

### Zeminler & Nötr Tonlar
- **Clean White (Kart & Modal Yüzeyi)**: `#FFFFFF`
- **Soft Cloud (Açık Gri Alanlar)**: `#F7F7F7`
- **Border & Shadow Gray (Çerçeve & Alt Taban)**: `#E5E5E5` | `#D7D7D7`
- **Text Dark (Ana Metin)**: `#4B4B4B`
- **Text Muted (Açıklamalar)**: `#777777` | `#AFAFAF`

---

## 3. Tipografi & Hiyerarşi
- **Font Ailesi**: `'Fredoka', 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Başlıklar & Butonlar**: `font-weight: 800 - 900`, yuvarlak harf uçları.
- **Etiketler & Sayaçlar**: `text-transform: uppercase`, `letter-spacing: 0.8px`, kalın ve net sayılar.

---

## 4. Bileşen Standartları

### A. Duolingo 3D Chunky Butonları (The Bevel Button)
- Üst yüzey parlak canlı renk, altta **4px - 6px kalınlığında aynı rengin koyu tonu**.
- Kenarlık: `border-radius: 16px - 20px`.
- Etkileşim: `:active` durumunda `transform: translateY(4px); box-shadow: 0 0 0;` (Fiziksel butona tam basılma hissi).

### B. HUD & Stat Kapsülleri (Duolingo Header Status)
- Beyaz pufidik kapsüller (`#FFFFFF`), `border: 2px solid #E5E5E5`, `box-shadow: 0 4px 0 #E5E5E5`.
- İçinde canlı emojiler, altın sarısı kalın para sayaçları.

### C. Modallar & Pencereler (Duolingo Dialogs)
- Pufidik büyük beyaz kartlar (`#FFFFFF`), `border-radius: 28px`.
- Kalın dış çerçeve: `border: 3px solid #E5E5E5`, `box-shadow: 0 10px 0 #D7D7D7, 0 20px 40px rgba(0,0,0,0.15)`.
- Kapat butonu: Kalın kırmızı daire (`#FF4B4B`, `box-shadow: 0 3px 0 #E53238`).

### D. Karakter & Seçim Kartları
- Normal durum: `#FFFFFF` zemin, `border: 2px solid #E5E5E5`, `box-shadow: 0 4px 0 #E5E5E5`.
- Aktif durum: `#E8F8D6` (Açık Duo Yeşil), `border: 2px solid #58CC02`, `box-shadow: 0 4px 0 #46A302`.
- Seçildi rozeti: `#58CC02` yeşil taktil buton.

---

## 5. Doğrulama ve Sürdürülebilirlik
Her yeni UI bileşeni bu `DESIGN.md` sözleşmesine göre üretilir.
