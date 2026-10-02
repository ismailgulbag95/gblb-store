# Dinamik olaylar

Kullanıcının olay raporu doğrultusunda beş fırsat ve beş müdahale edilebilir kriz uygulandı.

| Olay | Oyun etkisi / çözüm |
| --- | --- |
| Turist otobüsü | 90 sn, toplam 10 gerçek turist, en pahalı açık ürünlerden alışveriş, turist ödemeleri 2× hızlı. Normal müşterilerle birlikte üst sınır 18. |
| VIP gurme | Restoranda gerçek yemek siparişi; restoran uygun değilse açık fırın reyonundan alışveriş. 60 sn içinde servis/ödeme: normal bahşişin 10 katı ve 3 dk +%50 müşteri gelişi. |
| Altın hasat | 60 sn, tarlalarda 3× olgunlaşma ve 2× gerçek ürün. Dört olgun bitki/alan kapasitesi korunur; dolu tarlalar ürün çoğaltmaz. |
| Toptancı fırsatı | Lojistik ofisi açıkken iki farklı ithal ürünün birim alış fiyatı 2 dk %50 azalır. Terminal, sepet ve ödeme aynı fiyatı kullanır; verilmiş sipariş sonradan yeniden fiyatlanmaz. |
| Milyarder | Gerçek alışveriş ve kasa işlemi sonrası aynı kasanın sıradaki gerçek sepetlerini öder; ayrıca kasada $500 bırakır. Para normal yerden toplama döngüsüne girer. |
| Hırsız | En pahalı, rezervasyon dışında kalan tek ürün alınır. Oyuncu yakına koşarak veya görevdeki güvenlik kapıda yakalayarak ürünü kurtarır; tek seferlik $50 ödül. Kaçış kaybı tek ürünle sınırlı. |
| Makine sıkışması | Malzemesi ve çıkış alanı olan yerleşmiş makine durur; yanında kesintisiz 1,5 sn beklemek onarır. O makine 2 dk +%25 üretim hızı alır. |
| Hijyen denetimi | Yerleşmiş tüm reyonlarda en az bir ürün ve tüm çalışanlarda >%50 enerji gerekir. 60 sn toparlanma süresi; başarıda A+ ve 3 dk +%25 bahşiş. Ceza kesilmez. |
| Kasa kesintisi | Kasa işlemleri ve ilgili sabırsızlık sayaçları durur. Kasanın güncel yerindeki kırmızı şalter yanında 1 sn: normal işleyiş ve +3 memnuniyet. |
| Yaramaz kedi | Ürün çalmaz. Yanında 1 sn sevmek maskotu kalıcı açar, +5 memnuniyet ve 3 dk her 10 sn +1 memnuniyet sağlar. |

## Yönetmen ve kayıt

- 3,5–5 dakika aktif oyun aralığı; ilk 10 dakikada kriz yok; peş peşe iki kötü olay yok; aynı anda tek olay.
- Yalnızca koşulları sağlanan olaylar seçilir. Yerleştirme kuyruğundaki makineler ve tarlalar aday olmaz.
- Saat 10 Hz aktif oyun zamanıdır; 2×/5× geliştirici hızı koruma süresini ve tamir süresini kısaltmaz. Duraklatma ve arka plan duruşunda ilerlemez; çevrimdışı kriz çalışmaz.
- Kayıt sürümü 13; sürüm 2–12 kayıtları göç eder. Aktif olay, saat kalanı, aktör rotası, indirimler, bonuslar ve maskot korunur. Geçersiz aktif olay kaydı görünür yükleme hatası üretir.
- Para ödülleri mevcut muhasebe defteriyle tek işlem kimliği kullanır. Milyarderin para çantası yalnızca bir kez mevcut kasa bakiyesine eklenir.
- Kurtarılan ürünün reyonu dolmuşsa depoya döner; depo da doluysa güvenli kurtarma paketi olarak korunur ve yer açılınca aktarılır. Bekleyen paket varken ikinci hırsız olayı seçilmez.
- Çözülmeyen arıza ve kesinti 60 sn sonunda otomatik kalkar; sınırsız üretim/kasa kilidi veya ilave para cezası yoktur.

## Görsel ve arayüz

Üst kart Türkçe/İngilizce başlık, geri sayım, açıklama, müdahale ilerlemesi ve yürüyüş hedefi içerir. Duraklatmada hedef düğmesi kapanır. Kart dünya hareketini engelleyen bir modal değildir.

Sarı otobüs, fırsat kamyonu, çizgili bereli hırsız, panolu müfettiş, makine anahtarı/kara duman, kırmızı şalter, VIP yıldızı, beyaz takım/şapka, altın para çantası, A+ belgesi ve altın tarla yıldızları prosedüreldir. Kedi mevcut çevre modelini kullanır. Mesh bütçesi sabittir; yeni ışık veya navigasyon engeli eklenmez. Duraklatma ve azaltılmış hareket animasyonları dondurur. Ses mevcut ses ayarına uyar.

Güvenlik görevlisi lojistik hattı sonrasında mevcut aday seçimi, maaş, ihtiyaç ve mola sisteminden işe alınabilir ($150 taban işe alım). Molada, maaş beklerken veya hırsızdan uzakken otomatik yakalama yapmaz.

## Doğrulama

`tests/world-events.test.js`: yönetmen korumaları, deterministik devam, duraklatma, 2× saat, üretim arızası/onarma/sona erme, gerçek hasat kapasitesi, rezervasyon güvenliği, kaçış, dolu reyon/depo kurtarması, kalıcı sipariş fiyatları, gerçek kasa sepetleri, tek ödül, VIP süresi, bahşiş çarpanı, turist bütçesi, güvenlik işe alımı ve sabit görsel bütçe.

`/.project/event-preview.html` bellekte ayrı kayıtla olayları tek tek gösterir; gerçek oyuncu kaydına yazmaz. Önizleme butonları olayı duraklatılmış açar; alt Duraklat düğmesiyle devam edilir. Tarayıcıda otobüs/kart yerleşimi, makine kartından yürüyüş → onarım → +%25 bonus geçişi ve altın hasat görünümü kontrol edildi. 220 test ve üretim derlemesi geçti. Tam oyuna ait FPS veya retention ölçümü yapılmadı. Önizlemede mevcut `gblb_shipping_boxes` dekorasyon varlığının yükleme uyarısı görüldü; yeni olay modelleri prosedürel ve bu dosyaya bağımlı değil.

Mevcut oyunda yerde kir/çöp simülasyonu olmadığı için denetim gerçek stok ve çalışan enerjisini inceler. Yeni çöp ekonomisi veya işlevsel otobüs/kamyon sürüş fiziği eklenmedi. Kullanıcı kabulü bekleniyor.
