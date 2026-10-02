# Personel low poly tasarımı

Personeller müşteri karakterleriyle aynı köşeli kafa, kompakt gövde, blok el/bacak ve sade göz stiline geçirildi. Ortak model `src/presentation/HumanoidFactory.js` içinde oluşturulur; kayıt veya ekonomi değişikliği gerekmez.

Tüm personel meslekleri ve simülasyon takma adları kapsanır. Meslek renkleri, önlük/yelek, şapkalar ve mevcut ekipman korunur. İş şapkaları yeni geniş kafaya uyarlanır; yelekler gövde önünde görünür kalır. Küçük personel yüz ayrıntıları faceted geometriler kullanır. Enerji göstergesi şapka üzerinde konumlanır.

Omuz, dirsek, bilek ve diz bağlantıları aynı konumdadır. Tarayıcıda katalog görünümü ve yürüyüş kontrolü incelendi. Elde taşıma, raf doldurma, tarama, kasa, duraklatma ve ekipman bağlantıları test edildi. Toplam 222 test ve üretim derlemesi geçti. FPS ölçümü yapılmadı; kullanıcı kabulü bekleniyor.

Önizleme: `http://localhost:5173/tests/fixtures/staff-design.html`. Meslekler, müşteri stil referansı ve yürüyüş düğmesi içerir; oyuncu kaydını değiştirmez.
