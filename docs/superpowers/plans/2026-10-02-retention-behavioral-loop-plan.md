# Oyuncu Tutunması ve İleri Düzey Davranışsal Manipülasyon Uygulama Planı

> **Ajan uygulayıcılar için:** GEREKLİ ALT BECERİ: Bu planı görev görev uygulamak için `superpowers:subagent-driven-development` (önerilen) veya `superpowers:executing-plans` kullanın. Adımlar takip için onay kutusu (`- [ ]`) sözdizimini kullanır.

**Hedef:** Sıfır yeni varlık veya harici kütüphane kullanarak; Ludic Loop, Post-Reinforcement Pause (PRP) imhası, Near-Miss dopamin sömürüsü, Tension-Release ritmikliği ve batık maliyet kancalarıyla oyuncu tutunmasını ve oturum süresini maksimize etmek.

**Mimari:** Test ortamı hatalarını giderdikten sonra, alan mantığındaki zamanlayıcıları asenkron harmoniklere çekiyoruz; bahşiş ve müşteri memnuniyeti mekanizmalarına değişken oranlı ödül ve kayıp görünürlüğü ekliyoruz; HUD üzerinde hedef eğimi ve near-miss görsel nabızlarını devreye alıyoruz.

**Teknoloji Yığını:** JavaScript (ES modülleri), Three.js, Node.js test koşucusu (`node --test`), Vite.

## Genel Kısıtlamalar
- Sıfır yeni 3D model, ses dosyası, doku veya paket bağımlılığı.
- v1-v12 kayıt şemalarının tamamıyla geriye dönük uyumluluk.
- `node --test` altındaki tüm testlerin firesiz geçmesi.
- Ponytail sadeliği: minimum kod satırı, temiz ve doğrudan mantık.

---

### Görev 1: Test Paketi Sağlığını Geri Kazanma (Node/SSR Koruması ve Durum Sürümü Uyumu)

**Dosyalar:**
- Değiştirilecek: `src/presentation/SurfaceTextures.js`
- Değiştirilecek: `src/presentation/WorldScene.js`
- Değiştirilecek: `tests/procurement-catalog.test.js`

**Arayüzler:**
- Kullandıkları: `createGrassMaterial`, `hangingSignAtScreen`, `migrateEmptyLogistics`
- Ürettikleri: `npm test` üzerinde 167/167 yeşil temel hat

- [ ] **Adım 1: SurfaceTextures.js içinde document varlığını denetle**
DOM bulunmayan başsız Node ortamında testler koşulduğunda `ReferenceError: document is not defined` hatası almamak için `getGrassCanvas()` içine ortam denetimi ekleyin.
```javascript
function getGrassCanvas() {
  if (typeof document === 'undefined') return null;
  // mevcut canvas üretimi
}
```
Ve `createGrassMaterial()` içinde canvas null ise standart bir MeshStandardMaterial döndürün.

- [ ] **Adım 2: WorldScene.hangingSignAtScreen içine güvenlik koruması ekle**
Düzenleme modunda tabelalar sorgulanırken tanımsız mesh koleksiyonlarına karşı koruma sağlayın:
```javascript
hangingSignAtScreen(screenX, screenY) {
  if (!this.hangingSigns) return null;
  // mevcut gezinme mantığı
}
```

- [ ] **Adım 3: tests/procurement-catalog.test.js içinde sürüm beklentisini güncelle**
`tests/procurement-catalog.test.js` içindeki sürüm beklentisini 11 yerine güncel şema sürümü olan 12 ile eşitleyin.

- [ ] **Adım 4: Tüm testlerin geçtiğini doğrulamak için npm test çalıştır**
Komut: `npm test`
Beklenen: 167 başarılı, 0 başarısız.

---

### Görev 2: Ludic Loop ve Zeigarnik Zamanlayıcı Asenkronizasyonu

**Dosyalar:**
- Değiştirilecek: `src/domain/farm.js`
- Değiştirilecek: `src/domain/dayCycle.js`
- Değiştirilecek: `src/domain/progression.js`
- Test: `tests/farm-cycle.test.js`

**Arayüzler:**
- Kullandıkları: `FARM_CYCLE_TICKS`, `FARM_PHASE_OFFSETS`, `RECIPES`
- Ürettikleri: Oyuncuya "temiz bir duraklama anı" bırakmayan irrasyonel faz kaydırmaları

- [ ] **Adım 1: Tarla faz kaydırmalarını asenkron harmoniklere dağıt**
`FARM_PHASE_OFFSETS` dizisini [0, 14, 27, 41] gibi aralıklara ayarlayarak tarladaki bitkilerin aynı anda değil, birbirini kovalayan ritimlerle olgunlaşmasını sağlayın.

- [ ] **Adım 2: Makine tarifeleri ile tarla sürelerini birbirine kenetle**
Makinelerin üretim saniyeleri ile tarlanın hasat süreleri arasındaki zaman farkını oyuncunun bir istasyondan diğerine koşmasını gerektiren akıcı bir Ludic Loop haline getirin.

- [ ] **Adım 3: Regresyon testlerini doğrula**
Komut: `npm test`
Beklenen: BAŞARILI

---

### Görev 3: Değişken Oranlı Pekiştirme (Jackpot Bahşiş) ve Near-Miss Kayıp Sinyalleri

**Dosyalar:**
- Değiştirilecek: `src/domain/customerExperience.js`
- Test: `tests/customer-experience.test.js`

**Arayüzler:**
- Kullandıkları: `customerMood(customer)`, `saleMoodMultiplier(customer)`
- Ürettikleri: `tipForMood(customer, rngState)` değişken ödül fonksiyonu ve `missedOpportunityAmount(customer)`

- [ ] **Adım 1: Değişken oranlı bahşiş fonksiyonunu uygula**
Sabit 10/12 bahşişi, mutlu müşterilerde (%85+ memnuniyet) rastlantısal olarak 10 ile 18 arasında değişen, %10 olasılıkla 30 veren bir "Jackpot Bahşiş" fonksiyonuna dönüştürün; deterministik test çağrıları için varsayılanı koruyun.

- [ ] **Adım 2: Kaçan ciro ve fırsat maliyeti fonksiyonunu ekle**
Müşterinin bulamadığı her ürün için kaçan potansiyel kazancı hesaplayan `missedOpportunityAmount(customer)` fonksiyonunu dışa aktarın.

- [ ] **Adım 3: Birim testlerini koş**
Komut: `npm test`
Beklenen: BAŞARILI

---

### Görev 4: HUD Üzerinde Post-Reinforcement Pause (PRP) İmhası ve Hedef Eğimi

**Dosyalar:**
- Değiştirilecek: `src/presentation/HUD.js`
- Değiştirilecek: `src/domain/progression.js`

**Arayüzler:**
- Kullandıkları: `walletAtoms`, `machineUpgradeCost`, `staffUpgradeCost`
- Ürettikleri: Kartlarda Near-Miss görsel uyarısı ("%92 Tamamlandı!"), hediye başlangıç ilerlemesi ve fırsat alarmları

- [ ] **Adım 1: progression.js içerisine hedefe yakınlık ve near-miss tespiti ekle**
`goalProximityPercent(currentAtoms, targetCostAtoms)` ve `isNearMissGoal(currentAtoms, targetCostAtoms)` (örneğin %85-99 arası) fonksiyonlarını dışa aktarın.

- [ ] **Adım 2: HUD yükseltme kartlarına yakınlık ve PRP önleme mantığını bağla**
Bir yükseltme eşiğine yaklaşıldığında kartı görsel olarak öne çıkarın; yükseltme satın alındığı anda bir sonraki kademenin ilerleme çubuğunu sıfır yerine %15-20 başlangıç fonlamasıyla gösterin.

- [ ] **Adım 3: Müşteri kaçtığında kırmızı kayıp uyarısını tetikle**
Müşteri ürün bulamadan çıktığında arayüzde kaçan geliri gösteren mikro göstergeyi tetikleyin.

- [ ] **Adım 4: Test ve derlemeyi doğrula**
Komut: `npm test && npm run build`
Beklenen: BAŞARILI

---

### Görev 5: Uçtan Uca Doğrulama ve Git Kontrol Noktası

- [ ] **Adım 1: Tam test paketi kontrolü**
Komut: `npm test`
Beklenen: 167+ testin tamamı firesiz geçmeli.

- [ ] **Adım 2: Vite üretim derlemesi**
Komut: `npm run build`
Beklenen: Hatasız ve uyarısız temiz derleme çıktısı.
