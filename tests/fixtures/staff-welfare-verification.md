# Personel sistemi doğrulaması — 1 Ekim 2026

Uygulanan sistem: beş arketipten aynı kayıt/tohumla üretilen üç aday; ücretli seçim ve kişi bazında maaş; enerji, tokluk, moral ve rahatlık; kuzey arsa açma ve WC/dinlenme/mutfak. Eski reklam ödülü API'si korunur. SAVE_VERSION 10, sürüm 2–9 kayıtlarını da yükler. Kullanıcı kabulü verilmiş sayılmaz.

## Değişen dosyalar

- Domain: `src/domain/staff.js` (yeni), `catalog.js`, `state.js`, `simulation.js`, `layout.js`.
- Komut/persistans: `src/application/GameApplication.js`.
- Görsel: `src/environment/MarketGrid.js`, `src/presentation/StaffFacilityModel.js` (yeni), `WorldScene.js`, `HumanoidFactory.js`, `CharacterAnimator.js`.
- UI: `src/presentation/HUD.js`, `index.html`, `src/style.css`.
- Test: `tests/staff-welfare.test.js` (12), `staff-hud.test.js` (9), `staff-facilities-visual.test.js` (6); `orbit-core.test.js` sürüm beklentileri SAVE_VERSION sabitine bağlandı.
- QA: `staff-welfare.html`, `staff-welfare-scene.js`, `staff-welfare-visual.jpg`; `character-animation-scene.js` için kalabalığı belirli tick'te durduran `captureTick` seçeneği.
- Proje kaydı: yalnızca `project.py apply --expected-revision` ile `.project/state.json` ve türetilen görünümler.

## Otomatik sonuçlar

- Testler uygulamadan önce RED çalıştırıldı; eksik domain/görsel export'larını yakaladı.
- `npm test`: **123/123 geçti**. Önceki müşteri, reyon, kasa, reklam ve animasyon testleri de dahildir.
- `node --test --experimental-test-coverage tests/staff-welfare.test.js`: yeni `staff.js` satır %100, dal %86.25, fonksiyon %100.
- `npm run build`: Vite 5.4.21, 99 modül; başarılı. Yeni paket eklenmedi.
- Hedefli kontroller: ödeme ve paket işe alımının tek ücret kesmesi; kişisel günlük maaş tahsilatı; v9 stok/maaş göçü; kayıt sonrası tesis koordinatı ve mola slotunun korunması; taşıyıcının teslimi bitirmesi; alınmamış rezervasyonun iptali; erişilemeyen/kaldırılmış tesiste mola serbest bırakma; tesis yokken düşük hızla çalışmaya devam etme; HUD kapatma/yetersiz bakiye/duraklatma; gerçek mola pozları ve görsel kaynak temizliği.
- Bağımsız incelemede kasiyerin `paying` sırasında boşta sayılması yakalandı, düzeltildi ve regresyon testi eklendi.

## Tarayıcı ve performans

İzole `staff-welfare.html` MemoryStorage kullanır; oyuncunun kaydını okumaz veya değiştirmez. Aynı HUD ve WorldScene çalışır.

- Üç aday popup'ı tarayıcıda görüntülendi. Can ($31.50 alım / $2.975 günlük ücret) seçimi bakiyeyi $5000 → $4968.50 yaptı, çalışan sayısı 1 → 2 oldu.
- Arsa $500, WC $220, dinlenme $400, mutfak $350 satın alındı; bakiye $3498.50 oldu. Üç model marketin arkasında göründü, plot ağaçları kalktı.
- Hızlandırılmış 500 tick döngüsü gerçek domain rotasını kullandı; `seenRest=true` ve personel enerji 12 → 85 ile işe dönüş tamamlandı. Tesis kullanımı pozları ayrıca görüntülendi: bankta oturma, mutfakta kupa, WC girişinde bekleme. Görüntü: `staff-welfare-visual.jpg`.
- Mevcut alışveriş/raf doldurma kalabalık sahnesi çalıştırıldı: pickup/shop/deliver makbuzları ve animasyonları, 7 satış, bitişte 0 bekleyen animasyon / 0 ürün claim'i; sonlu pozlar.
- 40 karakter / tick 20 örneği: sonlu pozlar, 0 bekleyen animasyon, 0 ürün claim'i. IAB tam sahne render medyanı **39.4 ms**, p95 **62.1 ms**. Bu ortamda 60 FPS doğrulanmadı; önceki sürüm için karşılaştırılabilir GPU ölçümü yok.
- Aynı 40 karakterlik 539 kare Node CPU karşılaştırması, önceki animator (1534a6e) ve yeni animator: medyan **0.683 → 0.749 ms**, p95 **2.513 → 2.481 ms**. Artış yaklaşık 0.066 ms/kare. Bu ölçüm GPU veya tam sahne maliyeti değildir.

## Sınırlar ve proje kaydı

WC ve mutfak içerisine yürümek yerine dış erişim noktasında ihtiyaç yenileme temsil edilir; dinlenme bankı güney girişindedir. Binalar tam ayak iziyle çarpışma sınırlarına katılır. Personel terminal/mola/kupa pozları mevcut prosedürel rig'i kullanır; yeni iskelet veya dış varlık yoktur.

Proje CLI çalışır ve yeni görevin yapısal sorun listesi boştur. Genel `project.py check` **ok=false**: daha önceki görevlerin WorldScene kanıtları zaten eskiydi; bu değişikliklerin dokunduğu HUD stil/HTML ve karakter dosyalarının önceki kanıt hash'leri de yeniden inceleme gerektiriyor. Eski görevlerin insan kabulleri otomatik yenilenmedi. Yeni görev kanıtları `review` olarak sunulur.

`py -3` bulunmadığından doğrulanmış Python 3.12.14 çalışma zamanı kullanıldı: `C:/Users/YSR_MONSTER/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe`. Korunan `.project` dizini ilk sandbox okumasında erişimi reddetti; yetkili CLI erişimiyle işlemler tamamlandı.
