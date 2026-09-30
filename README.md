# Tohumdan Sofraya — Market ve Restoran Oyunu

Three.js ile çalışan, tek oyunculu 3B market ve restoran oyunu. Oyuncu tarladan ürün toplar, üretim hatlarını besler, reyonları doldurur, müşterilere hizmet eder ve kazancını yeni aşamalara yatırır.

## Oynanış

- Hareket: `WASD` / ok tuşları, ekrandaki joystick veya dünyaya dokunma.
- İstasyon etkileşimi: `E` / `Space` veya sağ alttaki işlem düğmesi.
- Ana ürün zinciri: domates → salça → portakal ve meyve suyu → mısır, popcorn ve tavuk yemi → yumurta ve ekmek → restoran yemekleri.
- Para ve ürün stokları oyun durumunun tek kaynağında tutulur. Müşteri satışı ile yükseltme ödemesi tek işlem olarak kaydedilir.
- İlerleme tarayıcı depolamasına otomatik yazılır; uygulama arka plana geçince simülasyon durur.

## Üretim adımları

1. Tarladan ürün al, makineye yaklaş ve etkileşim düğmesiyle çantandaki uygun malzemeleri giriş stoğuna yükle.
   Her tarla bir olgun hasat partisi taşır; ürün toplandığında meyveler görünmez olur ve yeni parti büyüdüğünde geri gelir.
2. Makine tarifteki tüm malzemeler ve çıkışta boş yer varsa işlemeye başlar. İlerleme yüzdesi etkileşim etiketinde görünür. Eksik malzeme veya dolu çıkış üretimi bekletir.
3. Hazır ürünü aynı makineden al. Reyona götürerek sat veya sonraki tarifte kullan. Çıkışta ürün varken makine etkileşimi önce ürünü toplar.
4. Personel işe alındığında kendi görevini yapar: hasat işçisi tarladan reyonlara, fabrika lojistikçisi tarladan ve önceki makinelerden üretim girişlerine veya bitmiş ürünü reyonlara, bakıcı yemi kümese ve yumurtaları reyona, şef mutfağa, garson da masalara ürün taşır. Stoklar taşıma sırasında rezerve edilir.

| Makine | Bir parti için giriş | Çıkış | Süre |
| --- | --- | --- | --- |
| Salça kazanı | 2 domates | 1 salça | 3 sn |
| Meyve sıkacağı | 2 portakal | 1 portakal suyu | 3,5 sn |
| Popcorn makinesi | 1 mısır | 1 popcorn | 2,5 sn |
| Yem değirmeni | 1 mısır | 1 tavuk yemi | 2,2 sn |
| Taş fırın | 2 buğday, 1 yumurta | 1 ekmek | 4 sn |
| Burger mutfağı | 1 ekmek, 1 domates | 1 burger | 4,5 sn |
| Pizza fırını | 1 buğday, 2 domates | 1 pizza | 5 sn |

Salça için önce bir domates satıp kazanı aç; sonra iki domates yükle, üç saniye bekle, çıkan salçayı alıp salça reyonuna koy. Hasat işçisi ilk salça satışından, fabrika lojistikçisi ilk meyve suyu satışından sonra açılır.

## Çalıştırma

```bash
npm install
npm run dev
```

Production çıktısı:

```bash
npm run build
```

## Yapı

- `src/domain`: ürün kataloğu, sabit adımlı simülasyon, stok rezervasyonu, işlem günlüğü ve oyun durumu.
- `src/application`: stok aktarma, satış, personel ve yükseltme komutları; değişiklikleri kayda yazdıktan sonra uygular.
- `src/infrastructure/SaveService.js`: sürümlü kayıt, checksum, önceki kopya ve kurtarma akışı.
- `src/presentation`: Three.js dünyası, dokunmatik/klavye girdisi ve DOM tabanlı HUD.
- `src/environment`: ortak dünya zemini, binalar, yollar ve çevre varlıkları.

Ürün içeriği ve oyun ekonomisi `src/domain/catalog.js` dosyasında tutulur. Arayüz renk ve bileşen kuralları `DESIGN.md` içindedir.
