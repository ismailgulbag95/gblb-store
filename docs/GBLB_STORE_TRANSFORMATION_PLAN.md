# GBLB Store: 3D İzometrik Dönüşüm ve Varlık Üretim Planı
*Orvant Ontolojisi & img2threejs Prosedürel Three.js Yol Haritası*

---

## 1. Vizyon ve Hedef Analizi

Bu plan, **Tohumdan Sofraya: GBLB Store** oyununun mevcut prototip görünümünü (Görsel 2), tasarım referans panosundaki (Görsel 1) zengin, detaylı ve canlı izometrik süpermarket simülasyonuna dönüştürmek için hazırlanmıştır.

| Alan | Mevcut Durum (Görsel 2) | Hedef Durum (Görsel 1 Referansı) |
| :--- | :--- | :--- |
| **Market İçi** | Boş kahverengi zemin, sınırlı kasa alanı | Cilalı açık renk porselen karo zemin, cam kapaklı içecek dolapları, ahşap manav tezgâhları, gondol reyonlar, ada tipi dondurucu havuzları, konveyörlü kasa hattı |
| **Ürünler** | Temel birkaç ikon ve primitif küp/silindir | 6 ana kategoride 25+ düşük poligonlu 3D ürün varlığı (meyve/sebze, paketli gıdalar, içecekler, unlu mamüller, et/süt, temizlik) |
| **Otopark & Yol** | Sade asfalt ve birkaç araba | Beyaz şeritli otopark cepleri, 5 farklı renkte otomobil, kargo kamyonu, van, pickup, scooter, bisiklet |
| **Dış Peyzaj** | Temel çim ve ağaçlar | Giriş totemi, sokak lambaları, yeşil/ahşap banklar, modern çöp kovaları, çiçek tarhları, otobüs durağı |
| **Tarım Alanı** | Küçük toprak yatakları | Çitlerle çevrili buğday tarlası, cam sera (greenhouse), kırmızı ahır, su kulesi, inek ve tavuklar |
| **Lojistik & Depo** | Henüz yok | Arka yükleme rampası, sarı forklift, transpalet, ahşap paletler, koli kuleleri, depo hangarı, geri dönüşüm üniteleri |
| **Karakterler** | Temel humanoid karakter | 10 farklı personel meslek üniforması ve 20+ çeşitli müşteri arketipi (çocuk, yaşlı, araba itenler) |
| **Yan Bölümler** | Boş alanlar | Yönetici ofisi, personel dinlenme odası (otomat, koltuk), WC ve teknik bakım odası |

---

## 2. Referans Varlık Envanteri (16 Kategori)

Görsel 1'de yer alan tüm varlıklar modüler kategorilere ayrılmıştır:

1. **Ana Sahne (Supermarket + Otopark + Çevre)**: Geniş cam cepheli market binası, kırmızı-beyaz tenteli giriş, ışıklı GBLB STORE tabelası, çevre yolları ve yaya geçitleri.
2. **İç Mekan Ekipmanları**:
   - Ahşap meyve/sebze tezgâhları (tekli, çiftli, eğimli kasalar)
   - Metal gondol süpermarket reyonları
   - Cam kapaklı dikey içecek/süt soğutucuları
   - Ada tipi açık yatay derin dondurucu havuzları
   - Konveyör bantlı ve monitörlü kasa bankosu
   - İç içe geçmiş metal alışveriş arabaları ve kırmızı el sepetleri istifi
3. **Ürün Varlıkları**:
   - *Meyve & Sebze*: Domates, havuç, marul, elma, muz, portakal, çilek, karpuz, patates.
   - *Paketli Ürünler*: Kutu süt, mısır gevreği, cips, bisküvi, konserve, salça kavanozu, reçel.
   - *Et & Süt*: Biftek eti, bütün tavuk, peynir kalıbı, yumurta viyolü.
   - *Temizlik & Bakım*: Sıvı deterjan şişesi, şampuan, sprey temizleyici, diş macunu.
   - *İçecekler*: Kola şişesi, portakallı gazoz, su şişesi, meyve suyu kutusu.
   - *Fırın & Unlu Mamüller*: Somun ekmek, baget ekmek, çikolatalı donut, çilekli donut, muffin.
4. **Depo & Lojistik**: Tahta paletler, mukavva koli yığınları, sarı depo forklifti, hidrolik transpalet, endüstriyel mavi-turuncu metal raflar, teslimat kamyonu.
5. **Üretim & İşleme Makineleri**: Sanayi tipi fırın, hamur yoğurma kazanı, paslanmaz çelik depolama silosu, işleme tezgâhı, un elek ünitesi.
6. **Ofis & Yönetim**: Ahşap yönetici masası, PC monitörü ve klavyesi, döner ofis koltuğu, su sebili, çelik dosya dolapları, analitik grafik panosu.
7. **Dinlenme Odası (Personel)**: İçecek otomatı, L biçimli modern kanepe, orta sehpa, mikrodalga fırın ve tezgâh, mini buzdolabı, duvar saati, saksı bitkisi.
8. **WC & Teknik**: Lavabo ve ayna, yeşil kapılı WC kabinleri, temizlik arabası ve sıkma kovası, paspas, sarı "kaygan zemin" levhası, teknik elektrik panosu.
9. **10 Personel Karakteri**:
   - Kasiyer (kırmızı önlük/şapka)
   - Reyon Görevlisi (yeşil tulum)
   - Depocu (sarı ikaz yeleği)
   - Müdür (lacivert takım elbise, kırmızı kravat)
   - Temizlikçi (mavi tulum, sarı şapka)
   - Güvenlik (polis mavisi üniforma, kasket)
   - Aşçı/Fırıncı (beyaz şef kepi ve önlük)
   - Teknik Görevli (alet kemerli mavi tulum)
   - Teslimatçı (kurye montu ve şapka)
   - Bahçıvan (hasır şapkalı yeşil bahçe tulumu)
10. **20+ Müşteri Tipi**: Erkek, kadın, yaşlı çift, takım elbiseli iş insanı, spor giyimli genç, çocuk, bebek arabalı ebeveyn, sepetli ve arabalı müşteriler.
11. **Dış Mekan Varlıkları**: Modern sokak lambaları, yeşil ve ahşap oturma bankları, çöp kutuları, GBLB STORE totem tabelası, otobüs durağı, gazete/büfe standı, otopark yön tabelası.
12. **Araçlar**: Sedan arabalar (kırmızı, mavi, sarı, mor, gümüş), beyaz kargo vanı, kırmızı teslimat kamyonu, mavi pickup, kırmızı retro scooter, bisiklet.
13. **Doğa & Çevre**: Küre formlu meşe ağaçları, piramit çam ağaçları, dekoratif çalılar, çiçek tarhları, doğal taşlar, ahşap sınır çitleri.
14. **Tarım Bölgesi (Üretim)**: Altın buğday tarlası, sebze parselleri, şeffaf panelli sera, kırmızı ahşap çiftlik ahırı, çelik ayaklı su kulesi, inek ve tavuklar.
15. **Arka Alan Gelişim Yapıları**: Mal kabul hangarı, soğuk hava deposu, atık yönetim merkezi, geri dönüşüm konteynerleri, yedek jeneratör/enerji ünitesi, personel lojmanı.
16. **Arayüz & İkonlar**: 3D stile uygun sepet, para, fatura, ayar ve profil göstergeleri.

---

## 3. Mimari ve Teknik Standartlar (`img2threejs` + `Ponytail`)

- **Saf Prosedürel Üretim (Code-Only Three.js)**: Dışarıdan devasa `.gltf` / `.fbx` dosyaları indirilmez. Tüm modeller `THREE.BoxGeometry`, `THREE.CylinderGeometry`, `RoundedBoxGeometry`, `THREE.ExtrudeGeometry` (2D shape extrude) ve parametrik parçalarla kodlanır. Bu sayede sıfır yükleme süresi, tam renk kontrolü ve anında dinamik değişim sağlanır.
- **PBR Malzeme Standartları**:
  - Cilalı yüzeyler (fayans, cam, metal): `MeshStandardMaterial` / `MeshPhysicalMaterial` ile düşük roughness (0.15 - 0.25), dengeli metalness.
  - Ahşap ve doğal yüzeyler: Sıcak tonlar, orta-yüksek roughness (0.7 - 0.85).
  - Yeşillikler ve organik formlar: Hafif `flatShading: true` ile arcade low-poly tarzı vurgulanır.
- **Performans & Optimizasyon Bütçesi**:
  - Tekrarlanan öğeler (ürün kutuları, meyveler, çit direkleri) gerektiğinde `THREE.InstancedMesh` ile tek draw call'a indirgenir.
  - Toplam sahne poligon sayısı tarayıcıda 60 FPS garantisi için optimize tutulur.
  - Gereksiz soyutlama ve karmaşık wrapper'lar yazılmaz; doğrudan Three.js standart yapısı kullanılır.

---

## 4. Orvant Alan Modeli ve İş Takibi

Proje kökünde `.project/` dizini altında Orvant v3 kayıt sistemi başlatılmıştır:
- Canlı durum kontrolü: `py -3 .project/scripts/project.py context .`
- Ontoloji görünümü: `py -3 .project/scripts/project.py ontology .`
- Yapı kontrolü: `py -3 .project/scripts/project.py check .`

Görevler birbirine bağımlılıklarla (`depends_on`) bağlıdır; her aşama tamamlandığında doğrulanıp bir sonraki aşama açılır.

---

## 5. Aşamalı Uygulama Yol Haritası (Fazlar)

```
[Faz 1: Market İçi & Reyonlar] ──> [Faz 2: 3D Ürün Varlıkları]
         │
         ├──> [Faz 3: Otopark, Yollar & Araçlar] ──> [Faz 5: Depo & Lojistik Üssü]
         │
         ├──> [Faz 4: Tarım, Sera & Hayvanlar]
         │
         ├──> [Faz 6: 10 Personel & 20+ Müşteri]
         │
         ├──> [Faz 7: Ofis, Dinlenme Odası & WC]
         │
         └──> [Faz 8: Işıklandırma, Atmosfer & Cila]
```

### FAZ 1: Süpermarket İç Mekan ve Ekipman Mimarisinin Kurulması (Şu Anki Öncelik)
- **Hedef**: Görsel 2'deki boş mağaza tabanını Görsel 1'deki cıvıl cıvıl, cilalı porselen fayanslı, geniş camlı ve reyonlarla donatılmış markete çevirmek.
- **Somut İşler**:
  1. `MarketGrid.js`: Mağaza zeminini açık krem/bej porselen fayans ızgara dokusuyla kaplama; mağaza duvarlarını ve cam vitrin pencerelerini yerleştirme.
  2. `ShelfModel.js`: Ahşap eğimli manav tezgâhları (kasa istifli), çift taraflı gondol reyonlar, cam kapaklı içecek dolapları ve yatay derin dondurucu havuzlarını oluşturma.
  3. `RegisterModel.js`: Konveyör bantlı, barkod okuyuculu ve ödeme terminalli modern kasa bankosu.
  4. Giriş alanına iç içe geçmiş metal market arabaları dizisi ve kırmızı el sepetleri yerleştirme.
- **Kabul Ölçütü**: Markete girildiğinde tüm reyon düzeni ve porselen zemin referans görseldeki gibi eksiksiz ve ferah görünecek.

### FAZ 2: 3D Düşük Poligonlu Ürün Varlıklarının Geliştirilmesi & Reyon Yerleşimi
- **Hedef**: Reyonları boş bırakmayıp Görsel 1'deki canlı renkli 3D ürünlerle doldurmak.
- **Somut İşler**:
  1. `Item3DFactory.js`: 6 kategoride 25+ ürün modeli (elma, muz, karpuz, süt kutusu, mısır gevreği, kola, baget ekmek, donut, peynir tekeri vb.).
  2. Her ürün için optimize low-poly geometri ve canlı malzeme tanımları.
  3. Ürünlerin reyon raflarına otomatik düzenle istiflenmesi.
- **Kabul Ölçütü**: Raflarda ve dolaplarda ürünler canlı ve kategorisine uygun olarak dizilmiş olacak.

### FAZ 3: Dış Mekan, Otopark, Yollar ve Araç Filosu
- **Hedef**: Market önündeki cadde ve otoparkı canlandırmak.
- **Somut İşler**:
  1. Beyaz çizgili otopark cepleri, engelli park alanı, yaya geçidi.
  2. 5 farklı renk ve modelde sedan otomobil.
  3. Beyaz kargo vanı, kırmızı teslimat kamyonu, mavi pickup, kırmızı scooter.
  4. Modern sokak lambaları, yeşil/ahşap oturma bankları, modern çöp kovaları, otobüs durağı ve GBLB STORE totem tabelası.
- **Kabul Ölçütü**: Otopark ve cadde zengin bir dış mekan havasına kavuşacak.

### FAZ 4: Tarım, Sera ve Çiftlik Üretim Bölgesi
- **Hedef**: Sol taraftaki tarım alanını görseldeki gibi rustik ve modern tarım tesisine dönüştürmek.
- **Somut İşler**:
  1. Şeffaf panelli ve metal iskeletli cam sera (greenhouse).
  2. Altın sarısı buğday tarlaları ve muntazam sebze parselleri.
  3. Kırmızı ahşap çiftlik ahırı ve çelik su kulesi.
  4. Düşük poligonlu sevimli inek ve tavuk modelleri.
- **Kabul Ölçütü**: Tarladan sofraya döngüsünün tarım kısmı eksiksiz ve estetik görünecek.

### FAZ 5: Arka Alan, Depo ve Lojistik Tesisleri
- **Hedef**: Marketin arka/yan cephesine lojistik ve tedarik üssünü eklemek.
- **Somut İşler**:
  1. Yükleme iskelesi ve kepenkli mal kabul kapısı.
  2. Sarı depo forklifti ve hidrolik transpalet.
  3. Tahta palet kuleleri ve mukavva koli yığınları.
  4. Depo hangarı, soğuk hava deposu ve renkli geri dönüşüm konteynerleri.
- **Kabul Ölçütü**: Lojistik operasyon alanı profesyonel bir depo görünümü sunacak.

### FAZ 6: 10 Personel Mesleği ve 20+ Zengin Müşteri Tipi
- **Hedef**: Dünyayı yaşayan bir yere dönüştürmek.
- **Somut İşler**:
  1. `CharacterFactory.js` ve `HumanoidFactory.js` genişletmesi: Kasiyer, Reyon Görevlisi, Depocu, Müdür, Temizlikçi, Güvenlik, Aşçı, Teknik, Kurye ve Bahçıvan üniformaları.
  2. Çeşitli müşteri arketipleri (farklı saç, kıyafet renkleri, çocuk, yaşlı, sepet taşıyanlar, araba sürenler).
- **Kabul Ölçütü**: Mağaza ve çevresinde personeller ve müşteriler kimlikleriyle net ayırt edilecek.

### FAZ 7: İdari Ofis, Dinlenme Odası ve WC/Teknik Alanlar
- **Hedef**: Market binasının arka bölümlerine detay odaları kazandırmak.
- **Somut İşler**:
  1. Müdür ofisi: Masa, PC, koltuk, dosya dolabı, pano.
  2. Personel dinlenme odası: İçecek otomatı, L kanepe, sehpa, mikrodalga, mini buzdolabı.
  3. WC ve teknik oda: Lavabo, pisuvar, temizlik arabası, sarı kaygan zemin levhası.
- **Kabul Ölçütü**: Marketin iç planı gerçekçi bir süpermarket mimarisine sahip olacak.

### FAZ 8: Aydınlatma, Atmosfer, Gölgeler ve Son Entegrasyon
- **Hedef**: Sahneyi Görsel 1'deki izometrik sıcaklığa ve premium görüntü kalitesine ulaştırmak.
- **Somut İşler**:
  1. Güneş ışığı açısı, yumuşak gölgeler, sıcak ambiyans ışığı ayarı.
  2. Mağaza içi spot ve floresan aydınlatma vurguları.
  3. Kamera açısının ve zum seviyesinin izometrik açıyla kusursuz hizalanması.
- **Kabul Ölçütü**: Görsel 1'deki kalite ve zarafet canlı 3D sahnede yakalanmış olacak.

---

## 6. Başlangıç Adımı

Hazır olan ilk iş: **FAZ 1 (Süpermarket İç Mekan ve Ekipman Mimarisinin Kurulması)**.
Onayınızla birlikte doğrudan `MarketGrid.js`, `ShelfModel.js` ve `RegisterModel.js` üzerinde ilk inşaata başlayacağız.
