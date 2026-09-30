# GBLB Store reklam gösterim algoritması

**Durum:** Uygulamaya hazır ürün/teknik taslak. Bu doküman reklam SDK'sı eklemez ve gerçek reklam göstermeye başlamaz.

## Projeye göre karar

GBLB Store tarayıcıda çalışan Three.js oyunu. `package.json` içinde reklam SDK'sı yok; uygulamada reklam gösterme veya rewarded-ad ödülü işleme kodu da bulunmuyor. README'ye göre oyun arka plandayken simülasyon duruyor, dolayısıyla henüz offline kazanç sistemi yok. Bu yüzden ilk sürüm çevrimdışı kazanç reklamı veya gerçek reklam varmış gibi ödül veren sahte bir sağlayıcı kullanmamalı.

My Mini Mart'ın mağaza kayıtları reklam ve uygulama içi satın alımı birlikte kullandığını, ayrıca reklamı ve açılır reklamları kaldıran ayrı ürünler sunduğunu doğruluyor. Kayıtlarda nakit paketleri de yer alıyor. Bu, hibrit modeli destekleyen gözlemlenebilir kanıt; oyunun özel reklam tetikleme kodu kamuya açık değil. Kullanıcı yorumlarında sık ve oyun ortasında çıkan reklamlar ile ödülün bazen verilmemesi şikâyetleri görülüyor. Bu nedenle burada **gönüllü ödüllü reklam + ileride isteğe bağlı satın alma** yaklaşımını alıyor, zorunlu reklam sıklığını kopyalamıyoruz. [App Store kaydı](https://apps.apple.com/us/app/my-mini-mart/id1592004814), [Google Play kaydı ve kullanıcı yorumları](https://play.google.com/store/apps/details?id=com.KisekiGames.smart)

## İlk sürüm reklam yerleşimleri

| Yerleşim | Ne zaman sunulur? | Reklam tamamlanınca verilecek ödül | Sınır |
| --- | --- | --- | --- |
| Sipariş kazancını ikiye katla | Oyuncu siparişi başarıyla teslim ettikten sonra, sonuç satırında isteğe bağlı düğme | O siparişin temel nakit ödülü kadar ek nakit; toplam sipariş kazancı en fazla `x2` olur | En fazla 3 kez/yerel gün |
| Sponsorlu tedarik aracı | Açık bir makine gerekli girdiler yüzünden en az 20 oyun saniyesi durmuşsa ve tek tariflik girdi/çıktı kapasitesi varsa, makine panelinde | Tarifin **bir partisi** için gereken eksik girdiler; ürün normal makine süresinde üretilir | En fazla 2 kez/yerel gün; aynı yerleşimde 15 dakika bekleme |

Her iki teklif de düğmeyle başlatılır. Teklif, ödülü sayısal ve anlaşılır biçimde yazar: “Reklamı izle, bu siparişten **+$14** daha kazan” veya “Reklamı izle, fırına **2 buğday + 1 yumurta** teslim et”. Teklifin yanında “Şimdi değil” seçeneği bulunur. Reddedilmesi oyunun normal akışını değiştirmez.

Bu seçim GBLB Store'un mevcut ekonomisine bağlanır: sipariş ödülü `ürün fiyatı × miktar + 5` olarak hesaplanıyor; makine tarifleri belirli girdi miktarlarıyla çalışıyor. Reklam nakdi temel sipariş ödülünü geçmez. Tedarik aracı nakit veya bitmiş ürün vermez; stok sınırlarını aşmaz ve üretim süresini atlamaz.

## Teklif seçme algoritması

Teklif değerlendirmesi yalnızca anlamlı oyun olaylarından sonra yapılır; sabit aralıklarla modal açılmaz.

```text
canOffer(state, placement, session):
  reklam sağlayıcısı hazır değilse -> false
  oyun görünür değilse veya duraklatılmışsa -> false
  öğretici/ilk sipariş akışı bitmediyse -> false
  bu oturumda etkin oyun süresi 180 saniyeden azsa -> false
  bugün toplam 6 reklam hakkı kullanıldıysa -> false
  son reklam başlangıcından beri 90 saniye geçmediyse -> false
  bu yerleşimin kendi kotası/dolum şartı sağlanmıyorsa -> false
  aksi halde -> true

onOrderDelivered(order):
  sipariş bu kayıt kimliği için daha önce reklam ödülü almadıysa
  ve canOffer(..., "order-double", ...) doğruysa sonuç satırında teklif göster

onMachineBlocked(machine):
  makine açık, 20 oyun saniyesi girdisiz durmuş,
  reçetenin tüm eksikleri tek partide teslim edilebilir,
  girişte yeterli ve çıkışta en az bir ürünlük yer varsa
  ve canOffer(..., "supplier-drop", ...) doğruysa makine panelinde teklif göster

Aynı anda yalnızca bir teklif görünür. Sipariş teslimi varsa öncelik sipariş teklifindedir.
Teklif reddedilince aynı yerleşim 5 dakika saklanır; başka bir teklif hemen açılmaz.
```

Başlangıç kotaları: toplam **en fazla 2 tamamlanmış reklam/15 dakika**, **6/gün**; sipariş katlaması **3/gün**, tedarik aracı **2/gün**. İlk reklam teklifi en erken 3 dakika etkin oyundan sonra çıkar. Bunlar başlangıç parametreleridir; oyuncu başına reklam izleme, oturum süresi ve ertesi gün dönüş verileriyle ayarlanır. Günlük sayaç kayıt içinde tutulur; yalnızca yerel depolamaya dayanan web sürümünde cihaz saatini değiştirmeye karşı güvenlik garantisi verilmez.

## Reklamı açma ve ödülü teslim etme

1. Sağlayıcıdan reklamın hazır olduğu doğrulanmadan “Reklam izle” teklifi gösterilmez.
2. Oyuncu düğmeye bastığında benzersiz `rewardId`, yerleşim kimliği, hedef sipariş/makine kimliği ve son kullanma zamanı kaydedilir. Simülasyon reklam boyunca duraklatılır.
3. Reklam normal tamamlanırsa ödül, oyun komutu olarak ve tek işlem içinde uygulanır. `rewardId` kayıtlı kazanımlar listesinde varsa ikinci kez verilmez.
4. Ödül kaydı/oyun kaydı kalıcı olarak yazıldıktan sonra başarı bildirimi gösterilir.
5. Oyuncu reklamı kapatır, reklam yüklenmez veya sağlayıcı hata verirse ödül verilmez; oyun kaldığı yerden sürer. Teklif tekrar tekrar açılmaz.
6. Uygulama reklam sırasında kapanırsa yarım kalan işlem ödül sayılmaz. Sağlayıcı tamamlanma sinyali geldiyse, uygulama yeniden açıldığında aynı `rewardId` ile tek kez uzlaştırılır.

Ödüllü reklam için açık kullanıcı tercihi, reklam başlamadan önce kesin ödül açıklaması ve tamamlanmış reklamdan sonra ödülün gerçekten verilmesi gerekir. “Oyunu desteklemek için izle” gibi yönlendirme kullanılmaz. [Google ödüllü reklam politikası](https://support.google.com/admob/answer/7313578?hl=en-GB)

## Gösterilmeyecek reklamlar

- Oyun oynanırken kendiliğinden açılan tam ekran/interstitial reklam.
- Sürekli ekran kaplayan banner; bu oyun küçük ekranda 3B kontrol kullandığından oynanış alanı ve performans etkilenebilir.
- Ürün toplama, makine başlatma veya upgrade satın alma işlemini reklam izlemeye bağlayan kilit.
- Reklam tamamlanmadan ödül vaadi; rastgele veya gizli olasılıklı nakit ödülü.
- Mevcut sistem offline simülasyonu durdurduğu için “çevrimdışı kazancını ikiye katla” teklifi.

My Mini Mart'ın mağaza kayıtları web rewarded reklamın nasıl yerleştirildiğini açıklamıyor; buradaki teklifler oyunun kendi sipariş/üretim olaylarına göre tasarlanmış uyarlamadır. Google Ad Manager web envanterinde kullanıcı onayıyla başlayan rewarded biçimini destekliyor. [Rewarded ads for web](https://support.google.com/admanager/answer/9116812?hl=en)

## Ölçüm ve ekonomi korumaları

Ölçülecek olaylar: `offer_shown`, `offer_accepted`, `ad_loaded`, `ad_started`, `ad_completed`, `ad_failed`, `reward_granted`, `offer_declined`. Her kayıt yerleşim ve ödül miktarını içerir; reklam dışı kişisel veri eklenmez.

Temel doğruluk ölçüleri:

- Tamamlanmış ve doğrulanmış reklam için verilen ödül: **%100**.
- Başarısız/yarım reklam için verilen ödül: **0**.
- Aynı `rewardId` ile mükerrer ödül: **0**.
- Başlangıç sürümünde zorunlu reklam: **0**.
- Reklam teklifi nedeniyle oturumdan çıkma ve sonraki gün dönüş, reklam görmeyen kontrol grubuyla karşılaştırılır.
- Reklam kaynaklı ek nakit ve tedarik girdilerinin, toplam gelir/üretim içindeki payı izlenir; ekonomi aşırı hızlanırsa önce ödül kotası azaltılır, satış fiyatları değiştirilmez.

## Sağlayıcı bağlantısı

Kodda şu an reklam sağlayıcısı olmadığından arayüz `RewardedAdProvider` benzeri bir bağdaştırıcı üzerinden tasarlanmalı: `isReady(placement)`, `show(placement, callbacks)` ve `onCompleted/reward` callback'leri. Web dağıtımında Google Ad Manager veya seçilecek başka bir sağlayıcının rewarded-web entegrasyonu; mobil paket çıkarsa o platformun SDK'sı ayrıca bağlanır. Geliştirme sağlayıcısı gerçek sürümde ödül veremez.

İlk uygulanabilir sürüm yalnızca sipariş kazancını ikiye katlama ile başlamalı. Tedarik aracı ikinci adımda eklenmeli; ölçüm bu ilk yerleşimin oyuncu devamlılığını bozmadığını gösterdikten sonra kotalar yeniden ayarlanmalı.
