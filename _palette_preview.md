---
layout: page
title: Palette Preview (internal)
description: >
  Sidebar color candidates — pick one and report back.
permalink: /_palette/
sitemap: false
---

# 사이드바 컬러 후보

각 카드는 실제 사이드바에 적용될 gradient + accent_color 조합을 보여줍니다. 원하는 번호 알려주시면 `_config.yml`에 즉시 반영합니다.

<style>
.swatch-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1em; margin: 1em 0; }
.swatch { border-radius: 10px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.swatch-top { height: 120px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; font-size: 1.1em; font-family: Georgia, serif; text-shadow: 0 1px 2px rgba(0,0,0,0.3); }
.swatch-body { padding: 0.8em 1em; background: #fff; font-size: 0.85em; }
.swatch-body code { background: #f4f4f4; padding: 0.15em 0.4em; border-radius: 3px; font-size: 0.85em; }
.swatch-name { font-weight: 600; font-size: 1em; margin-bottom: 0.2em; }
.swatch-note { color: #666; margin-top: 0.3em; font-size: 0.85em; }
</style>

<div class="swatch-grid">

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(36,65,98), rgb(54,100,139));">1. Slate Blue (현재)</div>
  <div class="swatch-body">
    <div class="swatch-name">Slate Blue <em>(current)</em></div>
    <code>rgb(54,100,139)</code><br/>
    <div class="swatch-note">학술 기본, 안정적. 적당히 차가움.</div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(14,37,68), rgb(28,52,92));">2. Oxford Blue</div>
  <div class="swatch-body">
    <div class="swatch-name">Oxford Blue</div>
    <code>rgb(28,52,92)</code><br/>
    <div class="swatch-note">Oxford/Cambridge 전통, 보수적 엘리트 톤.</div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(26,56,40), rgb(46,85,56));">3. Forest Green</div>
  <div class="swatch-body">
    <div class="swatch-name">Forest Green</div>
    <code>rgb(46,85,56)</code><br/>
    <div class="swatch-note">짙은 숲녹색. Earthy, bio/neuroscience 톤.</div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(14,74,84), rgb(20,94,108));">4. Deep Teal</div>
  <div class="swatch-body">
    <div class="swatch-name">Deep Teal</div>
    <code>rgb(20,94,108)</code><br/>
    <div class="swatch-note">이전 teal보다 깊게. Modern + academic.</div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(70,18,18), rgb(111,29,27));">5. Burgundy</div>
  <div class="swatch-body">
    <div class="swatch-name">Burgundy / Wine</div>
    <code>rgb(111,29,27)</code><br/>
    <div class="swatch-note">Harvard-style. 따뜻하고 권위 있음.</div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(35,40,48), rgb(55,65,71));">6. Charcoal Slate</div>
  <div class="swatch-body">
    <div class="swatch-name">Charcoal Slate</div>
    <code>rgb(55,65,71)</code><br/>
    <div class="swatch-note">Monochrome 미니멀. 깔끔 중립.</div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(8,52,94), rgb(15,76,129));">7. Classic Blue (Pantone 2020)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone Classic Blue</div>
    <code>rgb(15,76,129)</code><br/>
    <div class="swatch-note">2020 Pantone 올해의 색. 신뢰/안정.</div>
  </div>
</div>

<div class="swatch">
  <div class="swatch-top" style="background: linear-gradient(to bottom, rgb(60,78,68), rgb(82,105,90));">8. Sagebrush Green (Pantone)</div>
  <div class="swatch-body">
    <div class="swatch-name">Pantone Sagebrush</div>
    <code>rgb(82,105,90)</code><br/>
    <div class="swatch-note">부드러운 세이지 그린. Organic.</div>
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
- **Free + 커스텀**: JavaScript + localStorage 기반 팔레트 스위처 구현 가능 (사용자가 CSS 변수를 덮어쓰고 선택 기억)
  - 장점: 방문자 개인화 유지
  - 단점: CSS 구조 개입 필요, 테마 재작성 리스크
  - **권장도**: 개인 홈페이지에선 오버엔지니어링. 사이드바 색은 **한 번 정하면 끝**이 실용적.

취향대로 1–8 중 번호 알려주세요.
