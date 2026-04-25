---
layout: page
title: Design Theory
description: >
  Grid systems, Gestalt, color psychology, generative art theory, and UX principles.
permalink: /design/theory/
sitemap: true
---

<style>
.theory-section { margin:0 0 2.2em 0; }
.theory-card { border-left:3px solid #6a9fd0; padding:0.5em 0.9em; margin:0.6em 0 0.9em 0; background:rgba(100,150,220,0.04); }
.theory-card h4 { margin:0 0 0.25em 0; font-size:0.97em; }
.theory-card p { margin:0; font-size:0.91em; color:#444; line-height:1.55; }
.formula { background:#f4f6f9; border-radius:4px; padding:0.3em 0.7em; font-family:monospace; font-size:0.88em; display:inline-block; margin:0.2em 0; }
.tag-theory { display:inline-block; font-size:0.72em; padding:0.08em 0.4em; border-radius:2px; background:#e8eef6; color:#2a4a6a; margin-left:0.4em; vertical-align:middle; }
.color-swatch { display:inline-block; width:1em; height:1em; border-radius:2px; vertical-align:middle; margin-right:0.3em; }
</style>

A personal reference for design principles I draw on in data visualization, web design, and scientific figure-making. Theory-first, with practical application notes.

---

## Grid Systems <span class="tag-theory">Layout</span>

<div class="theory-card">
<h4>The Modular Grid</h4>
<p>A grid is not a template — it's a constraint system that creates visual rhythm and allows the eye to rest. Josef Müller-Brockmann's key insight: <em>the grid defines the negative space</em>, not just the positive placement. A 12-column grid gives you 6, 4, 3, and 2-column configurations without changing the base unit.</p>
</div>

<div class="theory-card">
<h4>Baseline Grid</h4>
<p>All text elements sit on multiples of a base unit (typically 4px or 8px). Consequence: body text, headings, captions, and spacing all rhyme metrically. Practical CSS: set <span class="formula">line-height</span> to a multiple of your base unit, then use <span class="formula">margin-bottom: Nrem</span> consistently.</p>
</div>

<div class="theory-card">
<h4>The Rule of Odds (and Columns)</h4>
<p>Odd numbers of elements (3, 5, 7) feel more natural than even. A 3-column layout resolves differently from a 4-column one: the 3-column creates a clear center focus; the 4-column tends toward bilateral symmetry or a 1+3 split. Choose based on information hierarchy, not aesthetics alone.</p>
</div>

**Key text**: Josef Müller-Brockmann, *Grid Systems in Graphic Design* (1981). Still the primary reference.

---

## Golden Ratio & Proportional Systems <span class="tag-theory">Proportion</span>

The golden ratio φ ≈ 1.618 appears in rectangle proportions, typographic scales, and spatial composition. More practically useful as a **scale generator** than a rule:

<span class="formula">φ = (1 + √5) / 2 ≈ 1.618</span>

**Major/Minor scale**: Divide a dimension in φ ratio — the minor portion (~38%) often works well for sidebars, secondary columns, or margins relative to content.

**Typographic scale** (φ-based): If body = 16px, then h3 ≈ 16 × 1.25 = 20px, h2 ≈ 25px, h1 ≈ 31px. (Modular Scale tool automates this.)

> **Caveat**: The golden ratio is a useful constraint, not a law. Many excellent designs use √2 (A-paper proportions), 4:3, or 16:9 ratios instead. The principle is to use *a consistent proportional system*, not specifically φ.

---

## Color Psychology <span class="tag-theory">Color</span>

<div class="theory-card">
<h4>Hue, Saturation, Lightness</h4>
<p>The most useful mental model for color decisions is HSL, not RGB. Hue = category (blue, red, green). Saturation = intensity/energy. Lightness = value (dark → light). A common mistake: adjusting hue when you mean to adjust saturation. Desaturated colors feel calm and professional; high saturation feels energetic or cheap depending on context.</p>
</div>

<div class="theory-card">
<h4>Cultural Associations (with limits)</h4>
<p>Blue → trust, stability (finance, tech). Green → growth, nature, health. Red → urgency, error states, warmth. Yellow → caution, attention, optimism. These associations are culturally specific and context-dependent — red = luck in Chinese contexts, mourning white in some East Asian contexts. Data vis: avoid red/green as primary pair (8% of males are red-green colorblind). Use blue/orange instead.</p>
</div>

<div class="theory-card">
<h4>60-30-10 Rule</h4>
<p>A practical palette structure: 60% dominant (background/neutral), 30% secondary (main text, sections), 10% accent (CTAs, highlights). The ratio prevents visual fatigue from competing colors. Accent color should be the highest saturation — it earns attention through scarcity, not loudness.</p>
</div>

**Tools**: [Coolors](https://coolors.co/) for palette generation · [Viz Palette](https://projects.susielu.com/viz-palette) for data visualization color checking · [Accessible Colors](https://accessible-colors.com/) for WCAG contrast.

---

## Gestalt Principles <span class="tag-theory">Perception</span>

Gestalt principles describe how the visual system groups elements before conscious interpretation. They are perceptual facts, not aesthetic preferences.

<div class="theory-card">
<h4>Proximity</h4>
<p>Elements close together are perceived as a group. Implication: whitespace is a grouping mechanism. Use consistent internal padding (within a card) and larger external margins (between cards) to make hierarchy legible without explicit borders.</p>
</div>

<div class="theory-card">
<h4>Similarity</h4>
<p>Elements that look alike are perceived as belonging together. Implication: consistent styling of interactive elements (all buttons look like buttons, all links look like links). Inconsistency here causes confusion about affordance.</p>
</div>

<div class="theory-card">
<h4>Continuity</h4>
<p>The eye follows smooth paths over abrupt ones. Implication: alignment creates invisible lines that guide reading. Elements aligned along a common edge form a group even without visual borders.</p>
</div>

<div class="theory-card">
<h4>Figure-Ground</h4>
<p>Every visual element is perceived as either figure (foreground, focal) or ground (background). Contrast, size, and position determine which. Ambiguous figure-ground (Rubin's vase) is disorienting in UI. The content area should always read as figure; chrome and navigation as ground.</p>
</div>

<div class="theory-card">
<h4>Common Fate</h4>
<p>Elements that move together are perceived as a group. The most underused principle in web animation — when elements animate in unison (staggered entrance, synchronized transition), they form perceptual groups that persist even when static.</p>
</div>

---

## UX Laws: Norman Door · Fitts' Law · 70-20-10 <span class="tag-theory">Interaction</span>

<div class="theory-card">
<h4>Norman Door (Affordance & Signifiers)</h4>
<p>A Norman Door is any interface object whose appearance suggests one action but requires another (push plate on a pull door). Don Norman's insight: <em>affordances</em> (what an object allows) need <em>signifiers</em> (visual cues that communicate them). In UI: a button must look tappable; a link must look clickable. Flat design often removes signifiers while preserving affordances — this causes confusion.</p>
</div>

<div class="theory-card">
<h4>Fitts' Law</h4>
<p>Time to reach a target = <span class="formula">a + b × log₂(D/W + 1)</span>, where D = distance and W = target width. Implication: make frequently-used targets large and close to where the cursor/finger currently is. Screen corners and edges are infinite-sized targets (cursor can't overshoot). The back button and hamburger menu are often too small and too far from where users' attention is.</p>
</div>

<div class="theory-card">
<h4>Pareto 80-20 / Feature 70-20-10</h4>
<p>In product design: 70% of effort on core-use cases, 20% on secondary paths, 10% on edge cases. The failure mode is inverting this — building elaborate edge-case handling before the core flow works. In design: 70% safe/proven conventions, 20% signature elements that differentiate, 10% experimental.</p>
</div>

---

## Pixel Art Conventions <span class="tag-theory">Pixel Art</span>

<div class="theory-card">
<h4>Anti-aliasing vs Hard Pixels</h4>
<p>Pixel art deliberately avoids anti-aliasing — each pixel is a discrete unit. Scale up with <span class="formula">image-rendering: pixelated</span> (CSS) or <span class="formula">nearest-neighbor</span> interpolation to preserve crispness. Anti-aliased edges at small sizes produce "muddy" results that lose the aesthetic.</p>
</div>

<div class="theory-card">
<h4>Limited Palettes</h4>
<p>Classic constraints: 4 colors (Game Boy), 16 colors (EGA), 256 colors (VGA/SNES). Constraint forces deliberate color choices — each color must carry meaning. Modern pixel art often uses 8–32 colors. Dithering (alternating two colors in a checkerboard) expands the apparent palette within constraints.</p>
</div>

<div class="theory-card">
<h4>Outline & Form</h4>
<p>At small sizes, black outlines define shape — they're load-bearing. Selective outlining (only some edges are outlined) creates depth hierarchy. Light source is typically upper-left (convention). Avoid single-pixel diagonal lines ("jaggies") — 2-pixel steps read as smoother curves at small sizes.</p>
</div>

---

## Generative Art Formats & Approaches <span class="tag-theory">Generative</span>

<div class="theory-card">
<h4>Flow Fields</h4>
<p>A vector field derived from a noise function (usually Perlin/simplex noise). Particles follow the field vectors, producing organic, flowing curves. Key parameters: noise scale (zoom), field strength, particle lifetime, alpha decay. Tyler Hobbs' <em>Fidenza</em> is the canonical NFT-era example.</p>
</div>

<div class="theory-card">
<h4>L-Systems</h4>
<p>String rewriting systems that produce branching structures (trees, plants, coastlines). A grammar of production rules transforms an axiom string iteratively. Each character in the final string maps to a turtle-graphics command (forward, turn, branch). Prusinkiewicz & Lindenmayer's <em>The Algorithmic Beauty of Plants</em> is the reference text.</p>
</div>

<div class="theory-card">
<h4>Reaction-Diffusion</h4>
<p>Two virtual chemicals (A and B) diffuse through a grid and react. The Gray-Scott model produces spots, stripes, and labyrinthine patterns depending on feed/kill rate parameters. Biologically plausible — produces patterns similar to animal coat markings. Computationally expensive but parallelizable with WebGL shaders.</p>
</div>

<div class="theory-card">
<h4>Signed Distance Functions (SDF)</h4>
<p>A function that returns the distance from any point to the nearest surface. SDFs compose (union, intersection, subtraction, smooth blend) algebraically — no mesh needed. GLSL shader implementations enable complex 3D forms in browser at 60fps. Inigo Quilez's articles at <a href="https://iquilezles.org/">iquilezles.org</a> are the primary reference.</p>
</div>

**Output formats**: SVG (vector, scalable, editable) · PNG/WebP (raster, for web) · glTF (3D, with animation) · PDF (print, vectors) · p5.js sketch (interactive, browser-native).

---

*Back to [Design references →](/design/)*
