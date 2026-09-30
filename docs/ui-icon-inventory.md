# Oyun UI ikon envanteri

Arayüzdeki emoji ikonları, ekli görselden alınan illüstrasyon atlasına taşındı: `public/assets/ui-icon-atlas.png`. Sprite kırpımları ve çizim yardımcıları `src/ui/AssetIcons.js` içinde; statik ikonlar `index.html`, durumla değişen ikonlar `src/presentation/HUD.js` ve `src/presentation/WorldScene.js` tarafından gösteriliyor.

## HUD ve sistem

| Eski emoji | Atlas ikonu | Kullanıldığı yer | Amaç |
| --- | --- | --- | --- |
| 🎯 | `goal` | Görev kartı | Aktif hedefi belirtir. |
| 💵 | `money`, `tip` | Bakiye, ödül, bahşiş ve para bildirimleri | Para durumunu / kazancı gösterir. |
| 🎒 | `capacity` | Taşıma kapasitesi ve çanta geliştirmesi | Oyuncunun taşıma sınırını belirtir. |
| 📋 | `orders` | Müşteri sipariş paneli | Sipariş alanını tanımlar. |
| 🏗️ | `upgrade` | Geliştirme düğmesi ve eylemi | İşletme geliştirmelerine erişim sağlar. |
| 🎨 | `decoration` | Dekor mağazası düğmeleri | Dekorasyon alanını tanımlar. |
| ⚙️ | `settings`, `machine` | Ayarlar, makine kartı ve makine etkileşimi | Ayarları ve üretim makinesini belirtir. |
| 🏪 | `business` | İşletme özeti | İşletme panelini açar ve başlığını tanımlar. |
| 🧑‍🤝‍🧑 | `customers` | İşletme özeti | Müşteri sayısını belirtir. |
| 🧑‍🔧 | `staff` | İşletme özeti ve personel kartları | Çalışan sayısını ve personel türünü belirtir. |
| 📦 | `stock`, `shelf`, `pallet` | Reyon stoğu, raf etkileşimi, depo geliştirmesi | Stok ve depolama alanlarını tanımlar. |
| 😊 / 😕 | `satisfied` / `unhappy` | Memnuniyet özeti ve müşteri balonları | Müşteri memnuniyet durumunu gösterir. |
| ✨ | `decorScore` | Dekor puanı ve dekor kartları | Dekorların sağladığı puanı gösterir. |
| ✋ | `interact` | Yakındaki istasyon eylem düğmesi | Etkileşim yapılabileceğini belirtir. |
| ⚠️ | `warning` | Kayıt / başlatma hata panelleri | Uyarı veya hata durumunu belirtir. |
| 🌱 / 🐔 / 🍽️ / 💵 / 🗑️ | `farm` / `coop` / `table` / `register` / `trashBin` | Tarla, kümes, restoran masası, kasa ve çöp kutusu eylemleri | Eylemin hangi istasyonla ilgili olduğunu gösterir. |
| — | `clock` | Oyun günü ve süre kontrolleri | Gün / zaman bilgisini gösterir. |

## Ürün ikonları

Ürün sprite'ları sipariş, çanta/envanter, üretim bildirimi ve müşteri istek balonlarında kullanılır. `src/domain/catalog.js` her ürünü bir atlas anahtarına bağlar.

| Eski emoji | Atlas ikonu | Ürün |
| --- | --- | --- |
| 🍅 | `tomato` | Domates |
| 🥫 | `tomatoPaste` | Salça |
| 🍊 | `orange` | Portakal |
| 🧃 | `orangeJuice` | Portakal suyu |
| 🌽 | `corn` | Mısır |
| 🍿 | `popcorn` | Popcorn |
| 🌾 | `chickenFeed` / `wheat` | Tavuk yemi / buğday |
| 🥚 | `egg` | Yumurta |
| 🛍️ | `flour` | Un |
| 🍞 | `bread` | Ekmek |
| 🥧 | `orangeTart` | Portakallı tart |
| 🍔 | `burger` | Gurme burger |
| 🍕 | `pizza` | Pizza |

## Personel, geliştirme ve dekorasyon

| Eski ikon grubu | Atlas ikonu | Kullanıldığı yer / amaç |
| --- | --- | --- |
| 🧑‍💼 | `cashier` | Kasiyer işe alım ve geliştirme kartı. |
| 🧑‍🌾 | `workerAvatar` | Hasat işçisi ve çiftlik bakıcısı kartları. |
| 🧑‍🔧 | `courierAvatar` | Fabrika lojistik personeli kartı. |
| 🧑‍🍳 | `chef` | Şef / garson kartı. |
| 🍅, 🌽, 🌾, 🍊, 🥫, 🍿, 🍞, 🥧 | Ürünün karşılık gelen atlas ikonu | Üretim ve çiftlik geliştirme kartları. |
| 🪴 | `planter` | Saksı dekoru. |
| 🪧 | `farmSign` | Tabela dekoru. |
| 💡 | `lamp` | Fener dekoru. |
| 🚪 | `welcomeMat` | Giriş paspası dekoru. |
| 🚩 | `pennant` | Flama dekoru. |
| 🛒 | `shoppingCart` | Teşhir sepeti dekor kartı. |
| 🍊 | `orange` | Narenciye ağacı dekor kartı. |
| 💐 | `flowers` | Vitrin çiçekliği dekoru. |
| 📦 | `pallet` | Koli / palet dekoru. |

## Diğer ekranlar ve dünya yazıları

- Karakter seçimi: Marketçi atlasındaki oyuncu avatarıyla gösterilir. Atlas kedi, robot, panda ve penguen için eşleşen çizimler içermediğinden bu seçeneklerde emoji yerine `K`, `R`, `Pa`, `Pe` harf rozetleri kullanılır.
- Dil seçimi: 🇹🇷 / 🇬🇧 bayrak emojileri `TR` ve `EN` metin rozetlerine çevrildi.
- Debug kontrolleri: 💵 para, ♾️ sınırsız kredi ve 🎒 kapasite atlas ikonlarına bağlandı; ⚡ 2× ve 🚀 5× hız kontrolleri saat ikonunu kullanıyor.
- Müşteri istek balonları: Ürün ve memnuniyet sprite'ları Canvas üzerine çizilir.
- 3B mağaza tabelaları: 🛒 mağaza tabelası, 🌿 organik bahçe tabelası, 🍕 bistro tabelası ve 🛒 kampanya posteri emoji süsleri kaldırıldı; metinler sadeleştirildi.
- Ürün levhaları: 🥫 salça görselindeki emoji `EV YAPIMI` yazısıyla, 🌾 yem levhasındaki emoji `TAVUK YEMİ` yazısıyla değiştirildi.
- Geri dönüşüm işareti ♻ emoji yerine Canvas vektör çizimiyle oluşturuluyor.

## Kalan emoji taraması

Kaynak dosyalarında Unicode emoji / pictograph taraması yapıldı; arayüz kodunda eşleşme kalmadı. Ekli atlasın içindeki yazılı görsel etiketleri bu envanterde kod içi talimat olarak değerlendirilmedi; yalnızca sprite kaynağı olarak kullanıldı.
