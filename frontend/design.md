# Dreamlib tasarım denemesi

## App ikon denemeleri

Son düzeltme: manga panelleri kaldırıldı, iki sayfa tamamen beyaz/boş. Gece moru güncel dosya assets/perest/perest-defter-01-gece.png. Diğer dört renk bu düzeltmeyle henüz yeniden üretilmedi.

Tam edit promptu (referans perest-manga-01-gece.png): Precise local edit of provided Perest koala artwork. Change ONLY the open notebook pages: erase ALL manga illustrations, ALL panel borders, all little faces, comic marks and interior graphics on BOTH pages. Both page surfaces must be completely blank PURE WHITE #FFFFFF, not cream, with NO markings, NO lines, NO panels, NO text. Preserve ONLY the outer black silhouette contours of open notebook, central black fold seam, and minimal outer page-edge contours so it remains readable as an open white notebook held in one hand. Keep notebook exact position, shape and scale. Preserve the entire koala and composition unchanged: melted lavender body, giant ears, cream inner ears, long black nose, sleepy eyes, paw holding left page edge, other resting paw, puddle crescent, detached drip, thick black outlines. Preserve same dark purple background and all other colors. No red annotation marks, no new detail, no other edits. Square image sharp clean, same framing.

2026-10-03. Erimiş Perest (08-eriyen-ruya) beğenildi. İki parmak işareti kaldırıldı; tek elle açık manga dergisini okuyan poz hazırlandı. Beş zemin: gece moru, krem, asit yeşili, petrol ve mercan. Dosyalar assets/perest/perest-manga-01-gece.png ile 02-krem, 03-asit, 04-petrol, 05-mercan (aynı perest-manga- öneki). Medya git dışı; ikon henüz uygulamaya alınmadı.

### Manga master promptu
Referans: perest-app-icon-08-eriyen-ruya.png.
```text
Identity-preserving edit for Dreamlib app icon. Keep EXACT original melted lavender koala Perest from supplied image: same giant tilted head, unequal big cream-centered ears, long black nose, thick clean black contours, half-lidded unimpressed expression, puddle body with cream crescent-shaped inset, bare figure no clothes. Modify raised hand at LEFT: REMOVE two-finger peace sign completely and replace with a single paw grasping the bottom outer edge of an OPEN MANGA MAGAZINE held at left/front of face. Only ONE hand holds magazine. Other paw remains resting in puddle. Magazine has two clearly open ivory pages, central fold, few bold black sequential comic panels with original tiny graphic faces/action marks; NO letters, no words, no title, no readable typography. Open spread tilted toward Perest so it visibly reads INSIDE, not holding closed cover to camera. Eyes pupils glance down-left at open pages, expression still deadpan and cool. Paw grips lower edge with curled digits, no raised gesture, no extra arms. Magazine should be roughly 28% image width, not obscure nose/eyes, not dwarf mascot, sit within safe margins. Keep original strong melted silhouette and unusual editorial vibe, not cute baby. Square full composition all ears and magazine visible with modest margins. Solid uniform deep midnight plum background #29243D. Perfectly clean flat fills, NO texture/noise/grain, no gradients, no glow, no 3D. No floating moon/stars, no text, watermark, rounded icon boundary or mockup. Maximum native resolution.
```

### Arka plan varyantları
Referans her seferinde perest-manga-01-gece.png; COLOR aşağıdaki renkle değiştirilir.
```text
Strict background-only color edit of supplied Perest manga-reader icon. Preserve the EXACT character geometry, all contour lines, lavender and cream character colors, posture, ears, eyes, nose, expression, puddle crescent, detached drip, single hand holding OPEN magazine, manga panels and framing. Do not redraw or reinterpret subject. Change ONLY surrounding background including every negative-space gap around the silhouette to one completely UNIFORM SOLID color: COLOR. No vignette, gradients, noise, texture, light or shadow. Keep clean sharp flat editorial illustration. One square icon, same resolution, no text, no border, no mockup. Magazine still in one hand, no peace gesture.
```

Renkler: 01 gece #29243D, 02 krem #F5EEDC, 03 asit #DDF541, 04 petrol #3F8E91, 05 mercan #EF896A. Bunlar istenen prompt renkleri; üretici renk kodlarını birebir garanti etmez. Gerçek PNG çözünürlüğü 1254 × 1254.

## Perest character sheet

Cenker character sheet'i beğendi; karakterin adı artık **Perest**. Güncel Perest görselleri `assets/perest/`, önceki denemeler `assets/test/` altında korunur. Güncel master: `perest-02-ayakta-master.png`.

2026-10-03. Seçilen çizim: dalgın koala (`referans/lib-style-master.png`); renk referansı: sokak koalası (`referans/lib-palette-master.png`). Çizim ve renk ayrı referans rolleriyle kullanıldı. Dil içeride, mimik duruma göre değişir. Yerleşik image_gen; kaynaklar ve PNG çıktılar yerel, git dışı. İlk dili dışarıda denemeler master değildir.

**Dosyalar:** `assets/perest/perest-02-ayakta-master.png`, `perest-03-donus-sheet.png`, `perest-04-yakin-cekim.png`, `perest-05-oturan.png`, `perest-06-mimik-sheet.png`, `perest-07-uyuyan.png` (son beş dosya da aynı klasörde).

Dönüş sheet'i dört görünüşü tek görselde; mimik sheet'i nötr, mutlu, uyuyan, meraklı, şaşkın ve huysuz ifadeleri gösterir. Görseller henüz UI'ya yerleştirilmedi.

### Ayakta master düzeltme promptu

Girdi: ilk ayakta deneme. Çıktı: `perest-02-ayakta-master.png`.

```text
Use case: identity-preserve edit. Edit the supplied full-body Dreamlib koala illustration. Change ONLY its mouth: REMOVE the protruding lime tongue COMPLETELY, close the mouth and draw a very small relaxed charcoal curved smile. There must be absolutely no tongue, no lime patch, no open mouth and no lip color. Keep the SAME koala identity, giant broad lavender head, giant round ivory inner ears, large long black nose, half-lidded ivory eyes, freckles, head/body ratio, arms, paws, legs, ivory shoes, charcoal shorts and exact charcoal sweater with two ivory stripes down each sleeve. Keep standing front pose, framing, thin imperfect contours, flat lavender/ivory/charcoal fills and rough printed pencil grain unchanged. Warm ivory paper background. Full body from ears to shoes, no cropping, no text, no logo, no gradients, no 3D. This corrected tongue-free standing view will be the character sheet identity master.
```

### Ortak üretim promptu

Her aşağıdaki görselin tam promptu = bu ortak gövde + ilgili varyantın metni. Tek görsel referansı: `perest-02-ayakta-master.png`.

```text
Use case: identity-preserve character sheet. The supplied corrected Dreamlib KOALA image is the EXACT identity, wardrobe, proportions and drawing master. Invariants: enormous broad flattened lavender head, giant round slightly ragged ears with ivory centers, prominent long black oval koala nose, small cheek freckles, tiny stout body under huge head, short lavender legs and big paws. Exact wardrobe: charcoal crewneck sweater with TWO ivory stripes down each sleeve, ribbed cuffs/collar/hem, charcoal knee-length shorts, ivory low shoes with black soles. Flat lavender #B3A2CC, charcoal #27262B, ivory #F7EFDC; thin imperfect drawn contours, matte dry screenprint grain and pencil texture. Warm ivory fine-grained paper background. IMPORTANT: TONGUE IS ALWAYS INSIDE; NEVER draw a protruding tongue or lime mouth patch. Expression MUST suit the requested pose; don't repeat a fixed sleepy face. Same head shape/ear size/nose size for every expression. No hats, glasses or new accessories, no logo, no text, no labels, no watermark, no 3D, gradients or glossy vector finish.
```

### 03-donus-sheet

```text
ONE wide landscape turnaround sheet, FOUR FULL BODY standing views evenly spaced on same baseline, same scale, all complete head-to-shoes with margins. Reading order FRONT, true LEFT SIDE PROFILE facing left, REAR, front THREE-QUARTER facing right. Front has calm neutral half-lidded eyes and a tiny closed-mouth smile. Side shows correct large nose projection, visible nearer round ear and depth of head; its mouth is closed. Rear truly faces away with NO eyes, nose or mouth visible; plain back of charcoal sweater, aligned sleeve stripes. Three-quarter has mildly curious eyes with one brow slightly raised and a small closed mouth. No furniture, props or ground shadows. Consistent model turnaround, not separate character identities.
```

### 04-yakin-cekim

```text
ONE square close-up three-quarter head-and-shoulders portrait facing slightly left (30 degrees), all enormous ears fully within frame. CURIOUS expression: one brow raised, eyes open a little more than reference and pupils looking slightly upward, small closed-mouth asymmetric smile. Paw lightly touches cheek, striped sweater at bottom. Preserve broad head proportions, long nose and freckles. Fine visible paper grain. No tabletop, no inset panels.
```

### 05-oturan

```text
ONE square full-body seated three-quarter pose, sitting on floor with knees loosely apart and short legs forward, full ivory shoes visible. One paw rests on knee and other gently supports cheek with elbow on knee. PENSIVE expression: pupils looking to the side, one slightly lowered brow, small closed straight mouth, no smile and NO tongue. Same enormous head and little body, same outfit, entire figure uncut. One faint flat charcoal contact shadow, no furniture, no scene.
```

### 06-mimik-sheet

```text
ONE landscape expression sheet, clean 3 columns x 2 rows of six large head-and-upper-shoulder portraits. Reading order: calm neutral half-lidded eyes and small closed-mouth smile; HAPPY squinting crescent eyes with wide CLOSED smile; SLEEPING fully closed eyes and relaxed closed mouth; CURIOUS asymmetric raised brow and upward pupils with small closed mouth; SURPRISED enlarged ivory eyes and tiny hollow black O mouth (NO tongue); mildly GRUMPY side-eye with brows sloped downward and small closed frown. Each expression clearly DIFFERENT in eyes, brows and mouth, not six similar sleepy faces. Identity geometry is identical across portraits: wide head, massive round ears, large oval nose, freckles. Generous even spacing, ears never overlap. No borders, labels, text, stars or decorations.
```

### 07-uyuyan

```text
ONE landscape full-body sleeping illustration. Curled on side on floor, knees gently bent, one lavender paw tucked beneath cheek, other resting across torso. Peaceful face with eyes entirely closed and a small CLOSED relaxed mouth, NO tongue. Entire giant head, both ears and complete shoes visible. Maintain head/body ratio and sweater's two cream sleeve stripes, shorts and shoes. Flat thin charcoal contact oval below. No bed, pillow, blanket, moon or symbols. Gentle drawn paper texture.
```

## Kullanıcı referanslarıyla ikinci tur

2026-10-03. Cenker dört editorial illüstrasyon paylaştı: ince düzensiz kontur, düz baskı renkleri, abartılı anatomi, dalgın/şaşkın ifade ve kâğıt dokusu. Dört ayrı koala üretildi; seçim henüz yapılmadı. Yerleşik image_gen kullanıldı. Referanslar git dışı `referans/editorial-01-sokak.png`–`editorial-04-uykulu.png`.

### 01-sokak

Yerel çıktı: `assets/test/koala-01-sokak.png`.

```text
Create ONE original KOALA character concept for Dreamlib. The attached images are STYLE REFERENCES: transfer their eccentric adult editorial cartoon language, thin irregular black drawn lines, flat ink color areas, intentionally awkward anatomy and deadpan expressions; do not reproduce their people or cat. Clearly a KOALA with two large round ears and a prominent tall black oval nose. Not a teddy bear. Do not use polished kawaii app mascots, glossy vector stickers, rubber hose cartoon gloves, nightcaps, cute plush toys, 3D, gradients or lighting. A single character fills a square artwork with comfortable margins, no text, no logo, no UI, no watermark. Primary direction: the full-body streetwear person reference. An anthropomorphic koala standing casually in three-quarter view, one paw in a pocket. Tall slightly gangly torso with a broad pear-shaped lavender head, very big round ears, long drooping black nose, narrow sleepy eyes behind simple dark oval sunglasses. Oversized charcoal jacket over a cream T-shirt, baggy charcoal cropped trousers, plain cream trainers with no brand marks. Lavender paws with a few fine finger lines. Face has two uneven little cheek creases, understated attitude and slouch. Flat graphic drawing with sparse fine hand-drawn details; slight printed paper tooth. Solid acid yellow-green background, no scene or props. Original designer editorial mascot, amusing and cool rather than cute.
```

### 02-saskin

Yerel çıktı: `assets/test/koala-02-saskin.png`.

```text
Create ONE original KOALA character concept for Dreamlib. The attached images are STYLE REFERENCES: transfer their eccentric adult editorial cartoon language, thin irregular black drawn lines, flat ink color areas, intentionally awkward anatomy and deadpan expressions; do not reproduce their people or cat. Clearly a KOALA with two large round ears and a prominent tall black oval nose. Not a teddy bear. Do not use polished kawaii app mascots, glossy vector stickers, rubber hose cartoon gloves, nightcaps, cute plush toys, 3D, gradients or lighting. A single character fills a square artwork with comfortable margins, no text, no logo, no UI, no watermark. Primary direction: the startled cat portrait reference. A squat upright KOALA with enormous asymmetrical circular white eyes, tiny black off-center pupils, giant round pale-blue ears with lavender centers, tall near-black oval nose and a little open mouth with one tiny tooth. Long skinny arms hang down from a short pear-shaped blue body, oversized lavender paws, feet point inward. Irregular few fur tick lines around outer ears, no sharp cat ears, no whiskers or tail. A block of dark royal blue flat offset shadow along the right side of head and body like reference 2; no modeled shading. Clear thin black ink contour. Startled, oddball and funny. Plain muted magenta background. Full body, no clothing, no accessories, no surrounding characters. Draw like an independent editorial illustrator.
```

### 03-dalgin

Yerel çıktı: `assets/test/koala-03-dalgin.png`.

```text
Create ONE original KOALA character concept for Dreamlib. The attached images are STYLE REFERENCES: transfer their eccentric adult editorial cartoon language, thin irregular black drawn lines, flat ink color areas, intentionally awkward anatomy and deadpan expressions; do not reproduce their people or cat. Clearly a KOALA with two large round ears and a prominent tall black oval nose. Not a teddy bear. Do not use polished kawaii app mascots, glossy vector stickers, rubber hose cartoon gloves, nightcaps, cute plush toys, 3D, gradients or lighting. A single character fills a square artwork with comfortable margins, no text, no logo, no UI, no watermark. Primary direction: the pink chess player reference's print texture and proportions. A massive squat rounded dusty-pink KOALA head with huge circular ears and small sleepy half-open white eyes, black oval nose and one tiny blue tongue sticking out at the side. Small barrel body in a butter-yellow sweater with two charcoal sleeve stripes. Seated at a very simple cream tabletop, chin propped in one large pink paw; other paw resting on table, expression lost in thought. Character is the only subject; no chess pieces, no human hair. Fine uneven coral and charcoal linework, matte colored pencil grain, handmade risograph paper texture. Background warm ivory with restrained tiny black stipple flecks like reference 3. Tight centered three-quarter portrait, deliberately strange proportions, contemporary editorial art.
```

### 04-uykulu

Yerel çıktı: `assets/test/koala-04-uykulu.png`.

```text
Create ONE original KOALA character concept for Dreamlib. The attached images are STYLE REFERENCES: transfer their eccentric adult editorial cartoon language, thin irregular black drawn lines, flat ink color areas, intentionally awkward anatomy and deadpan expressions; do not reproduce their people or cat. Clearly a KOALA with two large round ears and a prominent tall black oval nose. Not a teddy bear. Do not use polished kawaii app mascots, glossy vector stickers, rubber hose cartoon gloves, nightcaps, cute plush toys, 3D, gradients or lighting. A single character fills a square artwork with comfortable margins, no text, no logo, no UI, no watermark. Primary direction: the blue enormous-headed person reference. A sleepy blue KOALA standing full body with an absurdly enormous head tilted almost 75 degrees sideways into its own giant supporting paw. Tiny body and short legs below the head, cream short-sleeved shirt, muted purple shorts and simple white slippers. Two huge round ears, tall black oval nose, uneven droopy white almond-shaped eyes and a tiny flat mouth, two loose wrinkle lines on forehead. The outsized paw supports the head at the ear exactly as a weary daydreamer, anatomy intentionally exaggerated but readable. Blue-on-blue palette with dark navy drawn details, flat fills and subtle rough paper print grain, a single flat navy oval ground shadow. Solid dusty sky-blue background. No human haircut, no hats, no extra objects, no cute sparkle motifs. Offbeat restrained adult cartoon, not children's-book koala.
```

2026-10-03. İlk retro çizim reddedildi; seçilen Perest yönü ve ikon denemeleri yukarıda.

UI revizesi: arka plansız erimiş Perest onboarding/ana sayfa ve diğer maskot alanlarında kullanılır; küçük yükleme alanlarında spinner. Krem/lavanta/mor paleti, Lexend, ince çizgiler, gölgesiz kartlar, sade alt menü ve kompakt rüya kartları; webde 520 px sınır. Uygulamanın kullandığı perest-cutout.png repoya girer; üretim denemeleri yerel kalır.

## Görsel seçenekler

İlk seçeneklerin yerel görselleri `assets/test/`; medya git dışıdır. Üretim: yerleşik image_gen. Yeni checkout bu görselleri gerektirmez; henüz uygulamadan import edilmezler.

### grafik

Dosya: `assets/test/koala-grafik.png`.

Referans: C:/Users/gulte/Desktop/Projects/dreamlib/referans/pin-20.jpg

Prompt:

```text
Use case: stylized-concept. Original koala mascot exploration for Dreamlib dream journal app. Input reference: purple NFT cat interface, use the simplicity and offbeat graphic personality of its character, NOT its species, accessories or exact shape. A modern minimalist 2D graphic KOALA with an oversized wide rounded head, two big smooth round ears, tall black oval koala nose, tiny glossy black eyes with single white pin highlights and sleepy eyelids, tiny asymmetric smile. Muted lavender body, warm cream ear centers, short chubby body, little paws, no fur spikes, no Disney eyes, no white gloves, no rubber hose legs, no sneakers, no hat, no props. A cool calm slightly peculiar character, not a conventional cute children's book koala. Crisp economical black lines and flat solid color planes. Bold designer vinyl-toy silhouette but entirely FLAT graphic illustration, no 3D rendering. Full body at left and simplified large head icon at right, same identity. Both balanced on a plain warm cream background, subtle small acid lime four-point star beside character. Minimal art direction, roomy negative space. No text, no UI, no wordmark, no gradients, no watermark.
```

### pixel

Dosya: `assets/test/koala-pixel.png`.

Referans: C:/Users/gulte/Desktop/Projects/dreamlib/referans/pin-14.jpg

Prompt:

```text
Use case: stylized-concept. Original PIXEL ART koala mascot for Dreamlib, a dream diary mobile app. Reference: supplied pixel cat mobile interface; transfer its readable chunky pixel grid and expressive simple face to a completely original KOALA. Large round blocky lavender ears with cream centers, squat grey-lavender head, a prominent tall black koala nose, sleepy acid lime half-lidded eyes, cream chest, small seated body and paws. Pixel outlines built from square pixels, palette restricted to 7 flat colors, authentic manually placed 32x32 or 48x48 sprite aesthetic upscaled with crisp hard nearest-neighbor edges. No smooth curves, no anti-aliasing, no gradients, no detailed fur, no clothes, no hats, no gloves. Show 3 large evenly spaced same-identity sprites: happy seated, sleepy curled with a small pixel crescent moon, curious standing with tiny pixel star. Warm cream background with faint pale lavender square grid. Strong retro game mascot suitable for mobile screens and icons. No text, no UI, no watermark. Landscape image.
```

### editorial

Dosya: `assets/test/koala-editorial.png`.

Referans: yok

Prompt:

```text
Use case: stylized-concept. Original Dreamlib koala mascot in tactile indie editorial print illustration. Distinct art direction from polished commercial cartoons. A flat compact ash-lavender koala with a large slightly uneven potato-shaped head, oversized soft round ears, huge charcoal oval nose, two tiny imperfect black dot eyes, very small neutral relaxed mouth, cream inner ears. Seated cross-legged hugging its own knees, sleepy calm contemplative expression. No hats, no clothes, no white gloves, no cartoon shoes, no eyelashes, no slick vector outline. Hand-cut paper silhouettes, rough wax pencil edges, dry brush and subtle risograph grain, 3 flat printed inks: lavender, charcoal, warm ivory, with one acid lime tiny crescent at side. Show large full body character left and two small expressive head variants right: sleepy closed eyes and curious eyes, exactly the same koala identity. Cream paper background, understated sophisticated independent design studio mascot, simple sparse composition. No dimensional lighting, no shadows, no gradients, no text, no watermark.
```
