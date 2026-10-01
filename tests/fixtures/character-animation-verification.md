# Karakter animasyon doğrulaması — 1 Ekim 2026

Uygulanan değişiklikler:

- Müşteri yürüyüşü gerçek kat edilen mesafeyi izliyor. Bekleme, engellenmiş rota, duruş, yön değiştirme ve oturma geçişleri tek prosedürel animasyon sahibi tarafından güncelleniyor.
- Başla iki yöne bakma ve çeneye el götürme; raftan uzanıp alma, göz hizasında inceleme ve sepete bırakma sonlanan alışveriş hareketine bağlandı. Sepet elin altında, arabanın tutamağı iki elin hedefinde kalıyor.
- Personelin kaynak noktasından alma, koli taşıma, koliden çıkarma, raf yüzeyine yerleştirme, bilekle hizalama ve eğilip alt rafı el terminaliyle kontrol etme hareketleri başarılı görev aktarımlarından tetikleniyor. Garson teslimi ve müşterinin teslim alma jesti mevcut servis işlemini izliyor; tepsi yatay kalıyor.
- Prosedürel modellere dirsek, bilek, diz ve üst gövde pivotları eklendi. Hedefler iki kemikli kol çözümüyle erişilebilir kol uzunluğuna sınırlandırılıyor.
- Etkileşim iptali, hedefin kaldırılması, karakterin kaldırılması ve duraklatma temizliği eklendi. Aynı raf ürünü personelin elindeyken müşteri hareketi bekliyor. Teslim hedefi, ürün elden ayrılana kadar gizleniyor; sepetin aynı ürün yuvası eldeki nesne bırakılana kadar gizleniyor.
- Stok, ekonomi, ödeme, görev seçimi, üretim süreleri, kamera ve oyun arayüzü kuralları değiştirilmedi. Simülasyona yalnızca sınırlı uzunlukta görsel işlem makbuzları ve rafa bakış yönü eklendi.

Koddan belirlenen sınırlar:

- İskelet/klip veya yüz deformasyon sistemi bulunmuyor. Hareketler mevcut Three.js gruplarıyla prosedürel; bakış ve mimik yerine baş/gövde hareketi kullanılıyor. Kollar erişilemeyen yüksek/derin raflar için uzatılmıyor; tam parmak kavraması ve genel raf/gövde çarpışma çözümü yok.
- Mevcut müşteri AI'sında ürünü reddedip stoğa geri koyma kararı yok. Yeni iade kuralı eklenmedi. İptal edilen başarılı alışveriş, yetkili stok durumuna göre ürünü sepete yerleştiriyor; raf teslimi iptalinde gizlenen raf nesnesi geri açılıyor.
- Görsel eylem kuyruğu simülasyonun önceden gerçekleşmiş stok işlemlerini takip ediyor; görsel gecikme bulunabilir. Raflar üzerindeki mevcut dekoratif ürün grupları korunuyor.

Doğrulama:

- `npm test`: **96/96 geçti**; bunların 21'i yeni animasyon/davranış/stok/iptal testi.
- `npm run build`: başarılı, 97 modül.
- Yeni `CharacterAnimator.js` kapsamı: satır **%92,42**, dal **%85,96**, fonksiyon **%96,30**.
- 40 karakter / 539 ölçülen kare CPU animasyon testi: medyan **0,601 ms**, p95 **1,820 ms**; sonunda açık veya kuyrukta eylem kalmadı. Bu sonuç GPU çizim performansı veya eski sürümle performans karşılaştırması değildir.
- Yerel Vite oyunu ve alışveriş doğrulama sahnesi tarayıcıda açıldı. Gerçek alışveriş makbuzu ile `shop:1.15` inceleme pozu tetiklendi; raf stoğu 8'den 7'ye indi, eldeki nesne aşaması çalıştı. İlk yakın görüntüde kontrol paneli karakterin üst kısmını örttü; bu nedenle tüm temaslar görsel olarak onaylanmadı.
- Sonraki sahne ve personel kontrolünde tarayıcı CDP komutları zaman aşımına uğradı. Tam müşteri döngüsü, personel raf/barkod döngüsü ve kalabalık sahne **görsel olarak tamamlanmış sayılmıyor**. Bunların durum geçişleri otomatik testlerde doğrulandı; kullanıcı kabulü alınmadı.

Tekrarlanabilir kontrol sayfası: Vite altında `/tests/fixtures/character-animation.html`; alışveriş, personel ve 40 karakter seçenekleri, adım/poz kontrolü içerir. Oyuncunun kayıt dosyasını okumaz/yazmaz. CPU testi: `node tests/fixtures/character-animation-benchmark.js`.
