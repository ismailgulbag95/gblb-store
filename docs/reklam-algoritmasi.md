# GBLB Store reklam gösterim algoritması

**Durum:** Oyun içi rewarded altyapısı uygulandı. AdMob SDK'sı, reklam birimleri ve platform kurulumu daha sonra yapılacak. Production derlemesinde AdMob köprüsü yapılandırılana kadar sağlayıcı hazır değildir ve ödül vermez. Geliştirme sunucusunda, köprü henüz yapılandırılmadıysa reklam teklifleri 3 saniye bekleyip yalnızca yerel test için işaretli simülasyon ödülü verir; AdMob yapılandırıldığında bu yol otomatik kapanır.

## Projeye göre karar

GBLB Store tarayıcıda çalışan Three.js oyunu. `package.json` içinde reklam SDK'sı yok; bu uygulama oyun içi teklif, ödül doğrulama ve sağlayıcı köprüsünü kurar ama reklam SDK'sı yüklemez. AdMob bağlantısı `window.GBLB_ADMOB` üzerinden daha sonra native kabuk tarafından sağlanır. Production derlemesinde köprü kurulana ve placement hazır bildirilene kadar oyun reklamı başlatmaz ve ödül vermez. Geliştirme sunucusundaki yerel simülasyon yalnızca test kolaylığıdır; production sağlayıcısına dahil edilmez ve yapılandırılmış AdMob köprüsünü asla geçersiz kılmaz. README'ye göre oyun arka plandayken simülasyon duruyor, dolayısıyla henüz offline kazanç sistemi yok.

My Mini Mart'ın mağaza kayıtları reklam ve uygulama içi satın alımı birlikte kullandığını, ayrıca reklamı ve açılır reklamları kaldıran ayrı ürünler sunduğunu doğruluyor. Kayıtlarda nakit paketleri de yer alıyor. Bu, hibrit modeli destekleyen gözlemlenebilir kanıt; oyunun özel reklam tetikleme kodu kamuya açık değil. Kullanıcı yorumlarında sık ve oyun ortasında çıkan reklamlar ile ödülün bazen verilmemesi şikâyetleri görülüyor. Bu nedenle burada **gönüllü ödüllü reklam + ileride isteğe bağlı satın alma** yaklaşımını alıyor, zorunlu reklam sıklığını kopyalamıyoruz. [App Store kaydı](https://apps.apple.com/us/app/my-mini-mart/id1592004814), [Google Play kaydı ve kullanıcı yorumları](https://play.google.com/store/apps/details?id=com.KisekiGames.smart)

## İlk sürüm reklam yerleşimleri

| Yerleşim | Ne zaman sunulur? | Reklam tamamlanınca verilecek ödül | Sınır |
| --- | --- | --- | --- |
| Sipariş kazancını ikiye katla | Oyuncu siparişi başarıyla teslim ettikten sonra, sonuç satırında isteğe bağlı düğme | O siparişin temel nakit ödülü kadar ek nakit; toplam sipariş kazancı en fazla `x2` olur | En fazla 3 kez/yerel gün |
| Sponsorlu tedarik aracı | Açık bir makine gerekli girdiler yüzünden en az 20 oyun saniyesi durmuşsa ve tek tariflik girdi/çıktı kapasitesi varsa, makine panelinde | Tarifin **bir partisi** için gereken eksik girdiler; ürün normal makine süresinde üretilir | En fazla 2 kez/yerel gün; aynı yerleşimde 15 dakika bekleme |
| İkinci tarla | Uygun tarla ilerlemesi açıldıktan sonra tarla kartında | İkinci tarla ve ona ait bağımsız bitki zamanlayıcıları kalıcı olarak açılır | Her uygun tarla için bir kez |
| Personel alımı | Rolün ilerleme koşulu açılınca personel kartındaki reklam teklifiyle alınır | Reklamla rolü açar; açık rollere ek personel ekler. Şef/garson rolü ikisini birlikte ekler | Oyuncu başlatır; genel reklam kotalarına uyar |
| Sürpriz bonus | İlk teklif 3 dakika etkin oyundan sonra; devamı her 5–8 etkin dakikada rastgele bir bonus modalı olarak | Ya yürüyüş hızını 5 dakika boyunca x2 yapar ya da çanta kapasitesini kalıcı +1 artırır | Oyuncu videoyu başlatır; toplam 6/gün ve 2/15 dakika sınırına uyar. Çanta 20 slota kadar tekrarlanabilir; hız reklamı kalan süreye 5 dakika ekler ve gerçek zamanlı süre oyun kapalıyken de azalır |

Her iki teklif de düğmeyle başlatılır. Teklif, ödülü sayısal ve anlaşılır biçimde yazar: “Reklamı izle, bu siparişten **+$14** daha kazan” veya “Reklamı izle, fırına **2 buğday + 1 yumurta** teslim et”. Teklifin yanında “Şimdi değil” seçeneği bulunur. Reddedilmesi oyunun normal akışını değiştirmez.

Bu seçim GBLB Store'un mevcut ekonomisine bağlanır: sipariş ödülü `ürün fiyatı × miktar + 5` olarak hesaplanıyor; makine tarifleri belirli girdi miktarlarıyla çalışıyor. Reklam nakdi temel sipariş ödülünü geçmez. Tedarik aracı nakit veya bitmiş ürün vermez; stok sınırlarını aşmaz ve üretim süresini atlamaz. Her personel ilk kez reklamla işe alınır; açık rollere ek personel alımı da reklam kullanır. Kullanıcı kararıyla sipariş katlama ve sponsorlu tedarik ilk oyun içi kapsamda açık istisnalardır. Makine/personel hız geliştirmeleri yalnızca oyun parası kullanır.

## Teklif seçme algoritması

İşletme reklamları anlamlı oyun olaylarından sonra gösterilir. Sürpriz bonus teklifi ayrı bir modal istisnasıdır; bu modal oyun aktifken zamanlanır, başka modal/reklam/kayıt kurtarma ekranı açıkken çıkmaz. Modal yalnızca bonus teklifini gösterir; oyuncu “Reklamı izle” düğmesine basmadan video başlamaz.

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

onEligibleFarmOrStaffUnlock(target):
  ilerleme koşulu sağlandıysa ve canOffer(..., ilgili yerleşim, ...) doğruysa
  mevcut geliştirme/personel panelinde reklamla açma teklifini göster

onActiveGameplay(delta):
  etkin süreyi kayıtlı bonus sayacına ekle
  sayaç ilk 180 saniyeye veya sonraki kayıtlı rastgele 300–480 saniyeye geldiyse
  reklam hazır, kota uygun ve başka modal kapalıysa rastgele tek bonus modalı aç
  video yalnızca oyuncu açıkça kabul ederse başlatılır

Aynı anda yalnızca bir teklif görünür. Sipariş teslimi varsa öncelik sipariş teklifindedir.
Teklif reddedilince aynı yerleşim 5 dakika saklanır; başka bir teklif hemen açılmaz.
```

Geliştirme sunucusunda, AdMob köprüsü henüz yapılandırılmadıysa reklam düğmeleri yerel deneme için hazır sayılır. Mevcut progression reklamlarında ortak etkin oyun süresi, günlük kotalar ve cooldown atlanır; sürpriz bonus yerleşimi ise 6/gün, 2/15 dakika ve cooldown sınırlarını korur. Tıklama üç saniye sonra `source: development-simulation` işaretli, etkin `rewardId` ile eşleşen bir tamamlanma fişi üretir. AdMob köprüsü yapılandırılmışsa reklam hazır değil durumunda dahi simülasyon fallback'i yapılmaz; düğme gerçek sağlayıcının readiness sonucunu izler. Bu istisna production build'e alınmaz.

Başlangıç kotaları: toplam **en fazla 2 tamamlanmış reklam/15 dakika**, **6/gün**; sipariş katlaması **3/gün**, tedarik aracı **2/gün**. İlk reklam teklifi en erken 3 dakika etkin oyundan sonra çıkar. Bunlar başlangıç parametreleridir; oyuncu başına reklam izleme, oturum süresi ve ertesi gün dönüş verileriyle ayarlanır. Günlük sayaç kayıt içinde tutulur; yalnızca yerel depolamaya dayanan web sürümünde cihaz saatini değiştirmeye karşı güvenlik garantisi verilmez.

## Reklamı açma ve ödülü teslim etme

1. Sağlayıcıdan reklamın hazır olduğu doğrulanmadan “Reklam izle” teklifi gösterilmez.
2. Oyuncu düğmeye bastığında benzersiz `rewardId`, yerleşim kimliği, hedef sipariş/makine kimliği ve son kullanma zamanı kaydedilir. Simülasyon reklam boyunca duraklatılır.
3. Reklam normal tamamlanırsa ödül, oyun komutu olarak ve tek işlem içinde uygulanır. `rewardId` kayıtlı kazanımlar listesinde varsa ikinci kez verilmez.
   Geliştirme simülasyonunda aynı kural, üç saniye bekleyen ve etkin `rewardId` ile eşleşen işaretli fiş için uygulanır; bu yol production build'de bulunmaz.
4. Ödül kaydı/oyun kaydı kalıcı olarak yazıldıktan sonra başarı bildirimi gösterilir.
5. Oyuncu reklamı kapatır, reklam yüklenmez veya sağlayıcı hata verirse ödül verilmez; oyun kaldığı yerden sürer. Teklif tekrar tekrar açılmaz.
6. Uygulama reklam sırasında kapanırsa yarım kalan işlem ödül sayılmaz. Sağlayıcı tamamlanma sinyali geldiyse, uygulama yeniden açıldığında aynı `rewardId` ile tek kez uzlaştırılır.

Ödüllü reklam için açık kullanıcı tercihi, reklam başlamadan önce kesin ödül açıklaması ve tamamlanmış reklamdan sonra ödülün gerçekten verilmesi gerekir. “Oyunu desteklemek için izle” gibi yönlendirme kullanılmaz. [Google ödüllü reklam politikası](https://support.google.com/admob/answer/7313578?hl=en-GB)

## Gösterilmeyecek reklamlar

- Kullanıcı kabul etmeden başlayan video/interstitial reklam. Etkin oyun sırasında bonus teklif modalı açılabilir; video yalnızca oyuncu düğmeye bastıktan sonra başlar.
- Sürekli ekran kaplayan banner; bu oyun küçük ekranda 3B kontrol kullandığından oynanış alanı ve performans etkilenebilir.
- Ürün toplama, makine başlatma veya upgrade satın alma işlemini reklam izlemeye bağlayan kilit.
- Reklam tamamlanmadan ödül vaadi; rastgele veya gizli olasılıklı nakit ödülü.
- Mevcut sistem offline simülasyonu durdurduğu için “çevrimdışı kazancını ikiye katla” teklifi.

My Mini Mart'ın mağaza kayıtları reklamın nasıl yerleştirildiğini açıklamıyor; buradaki teklifler oyunun kendi sipariş/üretim olaylarına göre tasarlanmış uyarlamadır. AdMob SDK'sı ve reklam birimleri ayrı bir platform kurulum adımıdır. Oyun tarafındaki callback sözleşmesi ve entegrasyon örneği [`docs/admob-integration.md`](./admob-integration.md) dosyasındadır.

## Ölçüm ve ekonomi korumaları

Ölçülecek olaylar: `offer_shown`, `offer_accepted`, `ad_loaded`, `ad_started`, `ad_completed`, `ad_failed`, `reward_granted`, `offer_declined`. Her kayıt yerleşim ve ödül miktarını içerir; `reward_granted` ayrıca sipariş kimliğini, tedarik edilen makine/girdileri, açılan tarlayı/personel rolünü veya bonus türü, süre ve çanta kapasitesini kaydeder. Reklam dışı kişisel veri eklenmez.

Temel doğruluk ölçüleri:

- Tamamlanmış ve doğrulanmış reklam için verilen ödül: **%100**.
- Başarısız/yarım reklam için verilen ödül: **0**.
- Aynı `rewardId` ile mükerrer ödül: **0**.
- Başlangıç sürümünde zorunlu reklam: **0**.
- Reklam teklifi nedeniyle oturumdan çıkma ve sonraki gün dönüş, reklam görmeyen kontrol grubuyla karşılaştırılır.
- Reklam kaynaklı ek nakit ve tedarik girdilerinin, toplam gelir/üretim içindeki payı izlenir; ekonomi aşırı hızlanırsa önce ödül kotası azaltılır, satış fiyatları değiştirilmez.

## Sağlayıcı bağlantısı

Oyun `RewardedAdService` üzerinden `isReady(placement)`, `show(placement, callbacks)` ve tamamlanma fişi uzlaştırmasını kullanır. AdMob native kabuğu `window.GBLB_ADMOB` köprüsünü sağlar. `onCompleted` yalnızca AdMob ödülün tamamlandığını bildirdiğinde çağrılmalıdır; yükleme, gösterme, kapatma veya hata callback'i ödül vermez. Aynı işlem kimliği için yalnızca ilk sonuç işlenir. AdMob SDK'sı, reklam birimleri, consent akışı ve Android/iOS kurulumu sonraki platform adımına bırakılmıştır.

İlk oyun içi kapsam sipariş kazancını ikiye katlama, sponsorlu tedarik, ikinci tarla açma ve reklamla personel alımını içerir. Sponsorlu tedarik para veya bitmiş ürün vermez; tarla reklamları kalıcı kapasite açar, personel reklamları rolü açar veya ek personel verir. Makine/personel geliştirmeleri para sink'idir ve reklam kullanmaz.
