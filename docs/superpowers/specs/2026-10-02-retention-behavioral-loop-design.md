# Oyuncu Tutunması ve İleri Düzey Davranışsal Manipülasyon Şartnamesi (Sıfır Varlık Mimarisi)

- **Tarih:** 2026-10-02
- **Konu:** Sert Davranışsal Manipülasyon Kancaları, Ludic Loop ve Uç Psikolojik Mekanizmalar ile Maksimum Tutunma
- **Kapsam:** Sıfır yeni 3D model, sıfır yeni doku, sıfır yeni harici bağımlılık. Yalnızca mevcut alan mantığının ayarlanması, açık döngülerin sertleştirilmesi, anlık dopamin gerilimleri ve arayüz çerçevelemesi.

---

## 1. Problem Tanımı ve Uç Davranışsal Hedefler

Klasik yönetim oyunlarında oyuncunun oyundan kopmasının temel sebebi, hedefe ulaşıldığında beynin girdiği "tatmin durgunluğu" (Post-Reinforcement Pause) ve sistemde oyuncuyu anlık eyleme zorlayan bir gerilimin (tension) kalmamasıdır. Bu şartname, kumarhane matematiği ve bilişsel psikolojinin en agresif kaldıraçlarını sıfır varlık ilkesiyle birleştirir:

1. **Ludic Loop & Machine Zone:** Tarladan toplama, makinede işleme, rafa dizme ve kasada tahsilat arasındaki süreleri sıfır bilişsel boşluk bırakacak kesintisiz bir ritme bağlamak.
2. **Post-Reinforcement Pause (PRP) İmhası:** Bir yükseltme veya kilit açıldığı anda seansın terk edilmesini engellemek için anında yeni bir mikro hedefin ilk %20'sini hediye ederek açık döngüyü sürdürmek.
3. **Near-Miss (Kıl Payı Kaçırma) Dopamin Patlaması:** Hedeflenen yükseltmenin veya memnun müşterinin hemen kıyısında kalınan anları beynin bir "kayıp" değil, "neredeyse kazanma" olarak kodlamasını sağlamak.
4. **Bilişsel Gerilim ve Rahatlama Ritmikliği (Tension-Release):** Rafların ve enerjinin kritik seviyeye (%10) inmesiyle mikro panik yaratıp, oyuncunun anlık müdahalesiyle katartik bir rahatlama hissi yaşatmak.
5. **Batık Maliyet ve Peşin Taahhüt Tuzağı (Sunk Cost Escalation):** Peşin ödenen toptan siparişlerin ve peşin rezerve edilen işçi maaşlarının oyuncuyu kamyon gelene ve iş bitene kadar ekran başında rehin tutmasını sağlamak.
6. **Kontrol Yanılsaması (Illusion of Control):** Oyuncu bir makinenin veya tarlanın başında durduğunda eylemin daha hızlı ilerlediğini hissettiren mikro geri bildirimler sunmak.

---

## 2. Teknik Önkoşullar ve Test Sağlığı

Mevcut test paketindeki regresyonların giderilmesi:
- **[SurfaceTextures.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/presentation/SurfaceTextures.js):** Başsız Node ortamında `document.createElement` erişimine karşı `typeof document === 'undefined'` koruması.
- **[WorldScene.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/presentation/WorldScene.js):** `hangingSignAtScreen` içinde tanımsız mesh koleksiyonu sorgulamalarına karşı güvenli dönüş.
- **[procurement-catalog.test.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/tests/procurement-catalog.test.js):** Kayıt göç sürümü beklentisinin v12 ile eşitlenmesi.

---

## 3. Uç Davranışsal Bileşen Mimarisi

### 3.1. Ludic Loop ve Asenkron Zamanlayıcı Rezonansı
- **Hedef Dosyalar:** [farm.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/farm.js), [dayCycle.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/dayCycle.js), [progression.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/progression.js).
- **Tasarım:**
  - `FARM_PHASE_OFFSETS` ve makine üretim saniyeleri irrasyonel faz kaydırmalarına oturtulur. Oyuncu tarladaki 4 bitkiyi toplarken, fırın ekmeği tamamlar; ekmek taşınırken toptan kamyonu yanaşır; kargo açılırken kasa kuyruğu oluşur.
  - Sistemin "tüm sayaçlarının durduğu" sıfır noktası tamamen imha edilir.

### 3.2. Post-Reinforcement Pause (PRP) İmhası & Endowed Progress
- **Hedef Dosyalar:** [progression.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/progression.js), [HUD.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/presentation/HUD.js).
- **Tasarım:**
  - Bir istasyon veya makine yükseltmesi satın alındığı an, arayüz boşluğa düşmez. Bir sonraki kademenin ilerleme çubuğu anında "%20 Başlangıç Bonusu" ile açılır.
  - Hull'ın Hedef Eğimi kuralı: Hedefe olan mesafe salt rakam olarak değil, "Sonraki seviyeye %85 yaklaşıldı! Sadece 40 para kaldı!" şeklinde yakınlık alarmlarıyla vurgulanır.

### 3.3. Near-Miss ve Kayıptan Kaçınma Alarmları
- **Hedef Dosyalar:** [customerExperience.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/customerExperience.js), [HUD.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/presentation/HUD.js).
- **Tasarım:**
  - Yükseltme eşiği kıl payı kaçırıldığında (örneğin %90-99 arası fonlanma), kartın kenarları nabız gibi yanıp sönerek oyuncuyu son bir satış yapmaya kilitler.
  - Ürün bulamayan müşteri gittiğinde, sadece sessiz bir puan düşüşü değil, "Kaçan Süper Bahşiş: -35 Para!" şeklinde göze çarpan kırmızı bir fırsat maliyeti fırlatılır.

### 3.4. Değişken Oranlı Pekiştirme (Jackpot & Güç Dağılımı)
- **Hedef Dosyalar:** [customerExperience.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/customerExperience.js).
- **Tasarım:**
  - Sabit bahşişler (10 veya 12) yerine Pareto benzeri bir dağılım uygulanır: Müşterilerin %80'i normal bahşiş verirken, %15'i cömert bahşiş, %5'i ise "Gurme Müşteri / Jackpot Bahşişi" (3 katı) bırakır. Oyuncu her kasada barkod okuttuğunda bir slot kolu çekmiş gibi hisseder.

### 3.5. Batık Maliyet ve Taahhüt Kilidi
- **Hedef Dosyalar:** [procurement.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/procurement.js), [staff.js](file:///c:/Users/YSR_MONSTER/.antigravity/pico/src/domain/staff.js).
- **Tasarım:**
  - Toptan sipariş kuyruğunda para peşin kesilir ve kamyon rotası başlar. Oyuncuya açıkta bekleyen siparişin rampa doluluğu hatırlatılarak kargo rafa aktarılmadan seansı kapatması psikolojik olarak engellenir.
  - Personel dinlenme alanlarındaki mola süreleri (45-75 tik) ile işçinin masrafı görünür kılınır; işçi uyanır uyanmaz hazır hammadde bekler.

---

## 4. Doğrulama ve Sınırlar

- **Determinizm ve Test Güvenliği:** Rastlantısal varyanslar simülasyonun çekirdek determinizmini bozmayacak şekilde tohumlu (seeded) veya test ortamında sabit çarpanlı tutulur.
- **Sıfır Varlık Kuralı:** Hiçbir görsel varlık eklenmez, tüm sunum mevcut HUD katmanı, CSS sınıfları ve Three.js metin/rozet yapılarıyla çözülür.
- **Tam Test Başarısı:** `npm test` ve `npm run build` hatasız tamamlanır.
