---
layout: page
title: Palette Preview
description: >
  Sidebar color candidates — click "Apply" to preview live, copy the
  YAML snippet, or tell me the number and I'll commit it.
permalink: /palette/
sitemap: false
---

# 사이드바 컬러 후보

각 카드 우하단 **Apply** 버튼을 누르면 사이드바 색이 즉시 바뀝니다 (이 브라우저에만, localStorage 기억). 마음에 들면 카드의 YAML을 복사해서 `_config.yml`에 붙여넣거나, 번호를 알려주시면 커밋해드립니다.

<div id="palette-toolbar" style="position:sticky;top:0;z-index:10;background:#fff;border:1px solid #ddd;border-radius:8px;padding:0.8em 1em;margin:1em 0;box-shadow:0 2px 6px rgba(0,0,0,0.05);">
  <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.5em;">
    <div>
      <strong>Current preview:</strong> <span id="preview-name" style="color:#36649B;">(none — click Apply on a card)</span>
    </div>
    <div>
      <button id="reset-btn" style="padding:0.3em 0.8em;border:1px solid #ccc;border-radius:4px;background:#fff;cursor:pointer;">↺ Reset</button>
    </div>
  </div>
  <details style="margin-top:0.6em;">
    <summary style="cursor:pointer;color:#555;font-size:0.9em;">YAML snippet (paste into `_config.yml`)</summary>
    <pre id="yaml-snippet" style="background:#f4f4f4;padding:0.8em;border-radius:4px;font-size:0.85em;margin:0.5em 0 0 0;overflow-x:auto;white-space:pre-wrap;">— Apply a palette to see the snippet —</pre>
  </details>
</div>

<style>
.swatch-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1em; margin: 1em 0; }
.swatch { border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); position: relative; }
.swatch-top { height: 120px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.1em; font-family: Georgia, serif; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
.swatch-body { padding: 0.8em 1em; background: #fff; font-size: 0.85em; }
.swatch-body code { background: #f4f4f4; padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.85em; }
.swatch-name { font-weight: 600; font-size: 1em; margin-bottom: 0.2em; }
.swatch-note { color: #666; margin-top: 0.3em; font-size: 0.85em; }
.apply-btn { display: inline-block; margin-top: 0.5em; padding: 0.3em 0.9em; background: #36649B; color: white; border: 0; border-radius: 4px; cursor: pointer; font-size: 0.85em; font-weight: 600; }
.apply-btn:hover { background: #244162; }
</style>

<script>
(function () {
  function applyPalette(name, c1, c2) {
    // Inject CSS overrides for sidebar gradient
    var styleId = 'palette-override';
    var existing = document.getElementById(styleId);
    if (existing) existing.remove();
    var style = document.createElement('style');
    style.id = styleId;
    style.textContent =
      '#_sidebar, .sidebar, aside { background: linear-gradient(to bottom, ' + c1 + ', ' + c2 + ') !important; } ' +
      ':root { --accent-color: ' + c2 + '; }';
    document.head.appendChild(style);

    document.getElementById('preview-name').textContent = name + ' (' + c2 + ')';
    document.getElementById('yaml-snippet').textContent =
      'accent_image:\n' +
      '  background: linear-gradient(to bottom, ' + c1 + ', ' + c2 + ')\n' +
      '  overlay: false\n' +
      'accent_color: ' + c2 + '\n' +
      'theme_color: ' + c1;
    localStorage.setItem('palette-preview', JSON.stringify({ name: name, c1: c1, c2: c2 }));
  }
  function resetPalette() {
    var existing = document.getElementById('palette-override');
    if (existing) existing.remove();
    document.getElementById('preview-name').textContent = '(none — click Apply on a card)';
    document.getElementById('yaml-snippet').textContent = '— Apply a palette to see the snippet —';
    localStorage.removeItem('palette-preview');
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.apply-btn');
    if (btn) {
      applyPalette(btn.dataset.name, btn.dataset.c1, btn.dataset.c2);
      return;
    }
    if (e.target.id === 'reset-btn') resetPalette();
  });
  // Restore last preview on page load
  try {
    var saved = JSON.parse(localStorage.getItem('palette-preview') || 'null');
    if (saved) applyPalette(saved.name, saved.c1, saved.c2);
  } catch (e) {}
})();
</script>

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(36,65,98), rgb(54,100,139));">1. Slate Blue (현재)</div>
  <div class="swatch-body">
    <div class="swatch-name">Slate Blue <em>(current)</em></div>
    <code>rgb(54,100,139)</code><br/>
    <div class="swatch-note">학술 기본, 안정적. 적당히 차가움.
    <button class="apply-btn" data-name="1. Slate Blue (현재)" data-c1="rgb(36,65,98)" data-c2="rgb(54,100,139)">▶ Apply</button></div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(14,37,68), rgb(28,52,92));">2. Oxford Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Oxford Blue</div>
    <code>rgb(28,52,92)</code><br/>
    <div class="swatch-note">Oxford/Cambridge 전통, 보수적 엘리트 톤.
    <button class="apply-btn" data-name="2. Oxford Blue" data-c1="rgb(14,37,68)" data-c2="rgb(28,52,92)">▶ Apply</button></div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(26,56,40), rgb(46,85,56));">3. Forest Green</div>
  <div class="swatch-body">
    <div class="swatch-name">Forest Green</div>
    <code>rgb(46,85,56)</code><br/>
    <div class="swatch-note">짙은 숲녹색. Earthy, bio/neuroscience 톤.
    <button class="apply-btn" data-name="3. Forest Green" data-c1="rgb(26,56,40)" data-c2="rgb(46,85,56)">▶ Apply</button></div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(14,74,84), rgb(20,94,108));">4. Deep Teal</div>
  <div class="swatch-body">
    <div class="swatch-name">Deep Teal</div>
    <code>rgb(20,94,108)</code><br/>
    <div class="swatch-note">이전 teal보다 깊게. Modern + academic.
    <button class="apply-btn" data-name="4. Deep Teal" data-c1="rgb(14,74,84)" data-c2="rgb(20,94,108)">▶ Apply</button></div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(70,18,18), rgb(111,29,27));">5. Burgundy</div>
  <div class="swatch-body">
    <div class="swatch-name">Burgundy / Wine</div>
    <code>rgb(111,29,27)</code><br/>
    <div class="swatch-note">Harvard-style. 따뜻하고 권위 있음.
    <button class="apply-btn" data-name="5. Burgundy" data-c1="rgb(70,18,18)" data-c2="rgb(111,29,27)">▶ Apply</button></div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(35,40,48), rgb(55,65,71));">6. Charcoal Slate</div>
  <div class="swatch-body">
    <div class="swatch-name">Charcoal Slate</div>
    <code>rgb(55,65,71)</code><br/>
    <div class="swatch-note">Monochrome 미니멀. 깔끔 중립.
    <button class="apply-btn" data-name="6. Charcoal Slate" data-c1="rgb(35,40,48)" data-c2="rgb(55,65,71)">▶ Apply</button></div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(8,52,94), rgb(15,76,129));">7. Classic Blue (Pantone 2020)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone Classic Blue</div>
    <code>rgb(15,76,129)</code><br/>
    <div class="swatch-note">2020 Pantone 올해의 색. 신뢰/안정.
    <button class="apply-btn" data-name="7. Classic Blue (Pantone 2020)" data-c1="rgb(8,52,94)" data-c2="rgb(15,76,129)">▶ Apply</button></div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(60,78,68), rgb(82,105,90));">8. Sagebrush Green (Pantone)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone Sagebrush</div>
    <code>rgb(82,105,90)</code><br/>
    <div class="swatch-note">부드러운 세이지 그린. Organic.
    <button class="apply-btn" data-name="8. Sagebrush Green (Pantone)" data-c1="rgb(60,78,68)" data-c2="rgb(82,105,90)">▶ Apply</button></div>
  </div>
</div>

</div>

---

### 선택 후 반영 방법

번호(1–8)만 알려주시면 `_config.yml`에 해당 조합으로 즉시 반영합니다.

현재 적용:
```yaml
accent_image:
  background: linear-gradient(to bottom, rgb(36,65,98), rgb(54,100,139))
  overlay: false
accent_color: rgb(54,100,139)
theme_color: rgb(36,65,98)
```

---

### 실시간 토글 가능성 (참고)

- **Hydejack PRO**: Light/Dark mode + accent 토글 내장 (유료)
- **Free + 커스텀**: JavaScript + localStorage 기반 팔레트 스위처 구현 가능
- **권장도**: 개인 홈페이지에선 오버엔지니어링. 사이드바 색은 **한 번 정하면 끝**이 실용적.

---

## Pantone Color of the Year (2017–2025)

학술 사이트에 적용 시 채도(saturation) 주의 — 너무 강한 색은 피로감 유발. 아래는 reference 가치, 톤 다운하여 사용 권장.

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #80594D, #A47864);">P1. Mocha Mousse (2025)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 17-1230 — Mocha Mousse</div>
    <code>#A47864</code><br/>
    <div class="swatch-note">2025 올해의 색. 부드러운 카페오레, 따뜻함.P1. Mocha Mousse (2025)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #DB9270, #FFBE98); color:#5C3A2E;">P2. Peach Fuzz (2024)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 13-1023 — Peach Fuzz</div>
    <code>#FFBE98</code><br/>
    <div class="swatch-note">2024 올해의 색. 부드러운 복숭아. 가독성 위해 어두운 텍스트 필요.P2. Peach Fuzz (2024)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #8C1B36, #BB2649);">P3. Viva Magenta (2023)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 18-1750 — Viva Magenta</div>
    <code>#BB2649</code><br/>
    <div class="swatch-note">2023 올해의 색. 강렬한 마젠타. 학술용엔 다소 강함.P3. Viva Magenta (2023)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #4D4E80, #6667AB);">P4. Very Peri (2022)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 17-3938 — Very Peri</div>
    <code>#6667AB</code><br/>
    <div class="swatch-note">2022 올해의 색. periwinkle 보라. 신비롭고 차분.P4. Very Peri (2022)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #6F7173, #939597);">P5. Ultimate Gray (2021)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 17-5104 — Ultimate Gray</div>
    <code>#939597</code><br/>
    <div class="swatch-note">2021 올해의 색 (with Illuminating). 안정적 중립.P5. Ultimate Gray (2021)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #BFA63E, #F5DF4D); color:#5C5018;">P6. Illuminating (2021)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 13-0647 — Illuminating</div>
    <code>#F5DF4D</code><br/>
    <div class="swatch-note">2021 올해의 색 짝꿍. 활기찬 노랑. 강조용으로만.P6. Illuminating (2021)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #082F58, #0F4C81);">P7. Classic Blue (2020) ⭐</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 19-4052 — Classic Blue</div>
    <code>#0F4C81</code><br/>
    <div class="swatch-note">2020 올해의 색. 학술 사이트에 가장 적합. 신뢰/안정.P7. Classic Blue (2020) ⭐
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #C24B40, #FF6F61);">P8. Living Coral (2019)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 16-1546 — Living Coral</div>
    <code>#FF6F61</code><br/>
    <div class="swatch-note">2019 올해의 색. 따뜻한 산호색. 강렬한 톤.P8. Living Coral (2019)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #423562, #5F4B8B);">P9. Ultra Violet (2018)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 18-3838 — Ultra Violet</div>
    <code>#5F4B8B</code><br/>
    <div class="swatch-note">2018 올해의 색. 짙은 보라. 신비/창의.P9. Ultra Violet (2018)
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, #607F35, #88B04B);">P10. Greenery (2017)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone 15-0343 — Greenery</div>
    <code>#88B04B</code><br/>
    <div class="swatch-note">2017 올해의 색. 신선한 연두. 활기.P10. Greenery (2017)
    <button class="apply-btn" data-name="P1. Mocha Mousse (2025)" data-c1="#80594D" data-c2="#A47864">▶ Apply</button>
    <button class="apply-btn" data-name="P2. Peach Fuzz (2024)" data-c1="#DB9270" data-c2="#FFBE98">▶ Apply</button>
    <button class="apply-btn" data-name="P3. Viva Magenta (2023)" data-c1="#8C1B36" data-c2="#BB2649">▶ Apply</button>
    <button class="apply-btn" data-name="P4. Very Peri (2022)" data-c1="#4D4E80" data-c2="#6667AB">▶ Apply</button>
    <button class="apply-btn" data-name="P5. Ultimate Gray (2021)" data-c1="#6F7173" data-c2="#939597">▶ Apply</button>
    <button class="apply-btn" data-name="P6. Illuminating (2021)" data-c1="#BFA63E" data-c2="#F5DF4D">▶ Apply</button>
    <button class="apply-btn" data-name="P7. Classic Blue (2020) ⭐" data-c1="#082F58" data-c2="#0F4C81">▶ Apply</button>
    <button class="apply-btn" data-name="P8. Living Coral (2019)" data-c1="#C24B40" data-c2="#FF6F61">▶ Apply</button>
    <button class="apply-btn" data-name="P9. Ultra Violet (2018)" data-c1="#423562" data-c2="#5F4B8B">▶ Apply</button>
    <button class="apply-btn" data-name="P10. Greenery (2017)" data-c1="#607F35" data-c2="#88B04B">▶ Apply</button>
</div>

</div>

---

### 학술 사이트 권장 (Pantone 기준)

| 추천 | 사유 |
|---|---|
| ⭐ **P7. Classic Blue (2020)** | 학술 표준 톤, 가독성·신뢰성 최상 |
| **P5. Ultimate Gray (2021)** | 모노크롬 미니멀 |
| **P4. Very Peri (2022)** | 부드러운 보라, 차분 |
| ⚠️ **P2/P3/P6/P8** | 학술용엔 채도 너무 높음 (강조 컬러로만) |

번호 1–8 (앞 슬레이트/옥스포드/포레스트 등) 또는 P1–P10 (Pantone) 중 선택해 주시면 즉시 반영합니다.
