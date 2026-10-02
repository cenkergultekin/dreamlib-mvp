# Dreamlib

Rüya günlüğü ve bilinçaltı platformu: kullanıcı rüyasını yazar ya da sesle anlatır, yapay zekâ tabir eder ve duygularını çıkarır, rüya manga sayfasına çevrilir, kütüphanede saklanır; benzer rüya görenler eşleşir. Kullanıcı için **basit** olmalı: çok özellik var ama her biri sade ve az adımla sunulur.

## Çalışma sırası

1. **Faz 1 – sayfalar (şimdi):** önce uygulamanın nasıl görüneceği yazılır. Tüm ekranlar ve akışlar `frontend/` içinde mock veriyle, istenen akışta mı diye gezilerek kurulur. MVP özellikleri ve sonradan gelecekler (eşleşme, mesajlaşma, keşfet akışı, avatar, bilgi alanı, abonelik) arayüzde şimdiden hazırlanır; henüz açılmayacak olanlar tek bir özellik bayrağı dosyasıyla gizlenir.
2. **Faz 2 – arka plan:** sayfalar tamamlanınca `supabase/` kurulur: şema, RLS, Edge Functions, AI çağrıları. Mock'lar gerçek servislere bağlanır.

Cenker söylemeden Faz 2 işine (şema, Supabase istemcisi, API çağrısı) başlama. Faz 1'de bile veri ekranlara doğrudan gömülmez: ekranlar `services/` katmanından okur, bu katman şimdilik mock döner; Faz 2'de yalnız bu katman değişir.

## Stack

| Klasör | İçerik |
| --- | --- |
| `frontend/` | Expo (React Native) + TypeScript + Expo Router; tek kod tabanı iOS, Android, web |
| `supabase/` | Faz 2: Postgres migration'ları, RLS, Edge Functions, Auth (e-posta, Apple, Google, misafir) |

- Her servis kendi klasöründe. Firebase yok.
- Geliştirme Windows'ta; test Cenker'in iPhone'unda Expo Go ve tarayıcıda Expo web. iOS build EAS Build ile.
- Expo SDK 57. Expo her sürümde API değiştirir; ezberden yazma, `https://docs.expo.dev/versions/v57.0.0/` ve `https://docs.expo.dev/llms.txt`'ten doğrula.
- Paketleri `npx expo install` ile ekle (SDK uyumu). Expo Go'da olmayan native modül ekleme (Faz 1 Expo Go ile test edilir). Ağır UI kütüphanesi yerine kendi küçük bileşenlerimiz.
- Rotalar `frontend/src/app/` (Expo Router); rota olmayan kod onun dışında. `ios/` ve `android/` elle yazılmaz.

## Komutlar

`frontend/` içinde:

- `npx expo start`: iPhone'da Expo Go ile QR kodundan aç
- `npx expo start --web`: tarayıcıda
- `npx tsc --noEmit` ve `npx expo lint`: her değişiklikten sonra

## Ürün kararları

- MVP çekirdeği: rüyayı yazma (metin + ses), analiz (tabir, duygu yüzdeleri, nesneler ve anlamları), görselleştirme (manga paneli).
- Tabir türünü kullanıcı seçer: evrensel, kültürel/dini, psikanalitik.
- Ruh hali ve uyku gibi ek bilgiler isteğe bağlı.
- Yatmadan önce o günün duygusunu yazıp rüyada ne görebileceğini öğrenme.
- Rüyalar varsayılan özel, istenirse herkese açık; açıkken kullanıcı adıyla görünür. Eşleşen kullanıcılar mesajlaşabilir.
- Anonim verilerle araştırma yapılacak: kayıtta açık rıza ekranı olur.
- Gelir: freemium + abonelik (sunumda Basic ve Premium; günlük manga ve mesaj kotası, premium'da psikanalitik analiz).
- Açık, sorulmadan karar verme: orijinal mi düzeltilmiş metin mi saklanacak, AI sağlayıcısı, hassas içerik (kâbus, travma, intihar) politikası.

## Tasarım

- Kaynak: `dreamlib-v1-design-type/1. Dreamlib -1.dc.html` (tıklanabilir prototip; okunur, git'e girmez). Ekran ve akış fikirleri oradan: onboarding (giriş, gizlilik, hatırlatma), Anlat (ses/yazı) → metin onayı → analiz → stil ve panel sayısı → manga kitapçığı → kütüphane (kitapçıklar, metinler, takvim, tekrar eden semboller); Keşfet, Profil, seri ve rozetler.
- Prototip yön gösterir, birebir kopyalanmaz; sadeleştir. Tasarımı biz yapıyoruz.
- Renk, yazı, boşluk ve köşe değerleri tek tema dosyasında token olarak durur; palet henüz seçilmedi, değişimi tek dosyadan olmalı. Prototipteki varsayılan: Indigo `#0C10E3`, Olive `#D1D17C`, Nunito; açık ve koyu tema.
- Arayüz Türkçe; metinler tek dosyada toplanır (ileride İngilizce gelecek). Kod, değişken ve dosya adları İngilizce.

## Sınırlar

- `belgeler/` ve `dreamlib-v1-design-type/` git dışı; repoya ekleme. `belgeler/db pass.txt`'i açma.
- `.env*` okuma/yazma yok; anahtarlar uygulamaya gömülmez, Faz 2'de Edge Functions'ta durur.
- Konu başına küçük commit. `main`'e push Cenker'in onayıyla; force push yok.
- Commit ve PR yazarı yalnız Cenker; co-author ya da "Generated with" satırı yok.

## Hafıza ve dosya boyu

- İşe başlamadan `memory.md`'yi oku: Cenker'in daha önce düzelttiği hatalar ve doğru yaklaşım orada. Cenker bir hatayı düzelttiğinde kalıbını oraya tek satır yaz.
- Proje uzun sürecek: her `.md` en fazla 160 satır. Uzatma; yeni bilgi eskisinin yerine geçer, tekrar eden budanır.

Günlük: `C:/Users/gulte/Documents/Obsidian Vault/kayitlar/dreamlib-log.md`; proje notu aynı kasada `projeler/dreamlib/dreamlib.md`. İş bitince günlüğe sonuç ve açık işleri yaz.
