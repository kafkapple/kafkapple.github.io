---
layout: page
title: Lab
description: >
  Experimental interactive media — generative art, creative coding, and visual experiments.
permalink: /lab/
sitemap: true
---

<style>
.lab-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(320px,1fr)); gap:1.4em; margin:1.4em 0; }
.lab-card { border:1px solid #dde; border-radius:8px; overflow:hidden; background:#fafafa; }
.lab-card-title { padding:0.6em 0.9em 0.4em; font-weight:600; font-size:0.95em; border-bottom:1px solid #eee; }
.lab-card-canvas { display:block; width:100%; cursor:crosshair; }
.lab-card-desc { padding:0.4em 0.9em 0.7em; font-size:0.82em; color:#666; }
.lab-tag { display:inline-block; font-size:0.72em; padding:0.08em 0.4em; border-radius:2px; background:#e8eef6; color:#2a4a6a; margin-right:0.3em; }
</style>

Experiments in creative coding, generative systems, and browser-native interaction. Click or hover on each to interact.

<div class="lab-grid">

<!-- 1. Pixel Art Canvas -->
<div class="lab-card">
<div class="lab-card-title">Pixel Art Canvas <span class="lab-tag">draw</span></div>
<canvas id="pixel-canvas" class="lab-card-canvas" width="320" height="240"></canvas>
<div class="lab-card-desc">Click/drag to paint pixels. Scroll to change brush color.</div>
</div>

<!-- 2. Generative Flow Field -->
<div class="lab-card">
<div class="lab-card-title">Flow Field <span class="lab-tag">generative</span><span class="lab-tag">p5.js</span></div>
<canvas id="flow-canvas" class="lab-card-canvas" width="320" height="240"></canvas>
<div class="lab-card-desc">Perlin noise vector field. Click to respawn particles.</div>
</div>

<!-- 3. Cursor Blob -->
<div class="lab-card">
<div class="lab-card-title">Cursor Blob <span class="lab-tag">interaction</span></div>
<canvas id="blob-canvas" class="lab-card-canvas" width="320" height="240" style="background:#0d0d1a;"></canvas>
<div class="lab-card-desc">Move mouse over canvas. Metaball fluid simulation.</div>
</div>

<!-- 4. Glitch Text -->
<div class="lab-card">
<div class="lab-card-title">Glitch Text <span class="lab-tag">typography</span><span class="lab-tag">CSS</span></div>
<div id="glitch-box" style="height:240px;display:flex;align-items:center;justify-content:center;background:#0a0a0a;overflow:hidden;cursor:pointer;">
<div id="glitch-text" style="font-family:monospace;font-size:2.4em;color:#fff;font-weight:700;position:relative;user-select:none;">NEURAL</div>
</div>
<div class="lab-card-desc">Click to trigger glitch. Hover for continuous distortion.</div>
</div>

<!-- 5. CRT Filter -->
<div class="lab-card">
<div class="lab-card-title">CRT Scanlines <span class="lab-tag">filter</span><span class="lab-tag">retro</span></div>
<canvas id="crt-canvas" class="lab-card-canvas" width="320" height="240"></canvas>
<div class="lab-card-desc">Animated CRT phosphor simulation with scanline overlay.</div>
</div>

<!-- 6. Lava Lamp / Color Cycle -->
<div class="lab-card">
<div class="lab-card-title">Color Cycle <span class="lab-tag">generative</span></div>
<canvas id="lava-canvas" class="lab-card-canvas" width="320" height="240"></canvas>
<div class="lab-card-desc">Metaball blobs with HSL cycle. Click to add a blob.</div>
</div>

</div>

<script>
// ─── 1. Pixel Art Canvas ───────────────────────────────────────
(function() {
  const c = document.getElementById('pixel-canvas');
  const ctx = c.getContext('2d');
  const SZ = 8;
  const cols = c.width / SZ, rows = c.height / SZ;
  const grid = new Uint32Array(cols * rows);
  let painting = false;
  let hue = 220;
  const palette = ['#e8f4f8','#b0d4e8','#6aaedc','#3a88c0','#1a5898','#0d2a5a','#ff6b6b','#ffd166','#06d6a0'];
  let colorIdx = 0;

  function draw() {
    ctx.clearRect(0,0,c.width,c.height);
    for(let i=0;i<cols*rows;i++) {
      if(grid[i]) {
        ctx.fillStyle = '#'+grid[i].toString(16).padStart(6,'0');
        ctx.fillRect((i%cols)*SZ,(Math.floor(i/cols))*SZ,SZ-1,SZ-1);
      }
    }
    // grid lines
    ctx.strokeStyle='#e0e4ea'; ctx.lineWidth=0.5;
    for(let x=0;x<=cols;x++){ctx.beginPath();ctx.moveTo(x*SZ,0);ctx.lineTo(x*SZ,c.height);ctx.stroke();}
    for(let y=0;y<=rows;y++){ctx.beginPath();ctx.moveTo(0,y*SZ);ctx.lineTo(c.width,y*SZ);ctx.stroke();}
  }
  function paint(e) {
    const r=c.getBoundingClientRect();
    const x=Math.floor((e.clientX-r.left)/SZ), y=Math.floor((e.clientY-r.top)/SZ);
    if(x>=0&&x<cols&&y>=0&&y<rows) {
      const color = palette[colorIdx];
      grid[y*cols+x] = parseInt(color.slice(1),16);
      draw();
    }
  }
  c.addEventListener('mousedown', e=>{painting=true; paint(e);});
  c.addEventListener('mousemove', e=>{if(painting) paint(e);});
  c.addEventListener('mouseup', ()=>painting=false);
  c.addEventListener('wheel', e=>{colorIdx=(colorIdx+(e.deltaY>0?1:-1)+palette.length)%palette.length; e.preventDefault();},{passive:false});
  draw();
})();

// ─── 2. Flow Field ─────────────────────────────────────────────
(function() {
  const c = document.getElementById('flow-canvas');
  const ctx = c.getContext('2d');
  const W=c.width, H=c.height;
  const N=180;
  const particles=[];
  let t=0;
  function noise(x,y,z){
    // simple smooth noise approximation
    const s=(x+y*79.3+z*197.7);
    return Math.sin(s*0.1+Math.cos(s*0.07))*0.5+0.5;
  }
  function reset(p){p.x=Math.random()*W;p.y=Math.random()*H;p.life=Math.random()*80+40;p.age=0;}
  for(let i=0;i<N;i++){const p={};reset(p);particles.push(p);}
  ctx.fillStyle='#f8f9fc'; ctx.fillRect(0,0,W,H);
  function frame(){
    ctx.fillStyle='rgba(248,249,252,0.07)';ctx.fillRect(0,0,W,H);
    for(const p of particles){
      const angle=noise(p.x/60,p.y/60,t)*Math.PI*4;
      const speed=1.2;
      const nx=p.x+Math.cos(angle)*speed, ny=p.y+Math.sin(angle)*speed;
      const hue=200+noise(p.x/80,p.y/80,t+10)*120;
      const alpha=Math.sin(p.age/p.life*Math.PI)*0.7;
      ctx.strokeStyle=`hsla(${hue},60%,50%,${alpha})`;
      ctx.lineWidth=1.2;
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(nx,ny);ctx.stroke();
      p.x=nx; p.y=ny; p.age++;
      if(p.age>p.life||p.x<0||p.x>W||p.y<0||p.y>H) reset(p);
    }
    t+=0.005;
    requestAnimationFrame(frame);
  }
  c.addEventListener('click', ()=>{ctx.fillStyle='#f8f9fc';ctx.fillRect(0,0,W,H); for(const p of particles) reset(p);});
  frame();
})();

// ─── 3. Cursor Blob (metaball-ish) ─────────────────────────────
(function() {
  const c = document.getElementById('blob-canvas');
  const ctx = c.getContext('2d');
  const W=c.width, H=c.height;
  const blobs=[
    {x:W/2,y:H/2,vx:0.8,vy:0.5,r:55,hue:260},
    {x:W*0.3,y:H*0.4,vx:-0.5,vy:0.7,r:40,hue:200},
    {x:W*0.7,y:H*0.6,vx:0.3,vy:-0.6,r:45,hue:300},
  ];
  let mx=-999,my=-999;
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  c.addEventListener('mouseleave',()=>{mx=-999;my=-999;});
  function frame(){
    ctx.fillStyle='#0d0d1a'; ctx.fillRect(0,0,W,H);
    for(const b of blobs){
      b.x+=b.vx; b.y+=b.vy;
      if(b.x<b.r||b.x>W-b.r) b.vx*=-1;
      if(b.y<b.r||b.y>H-b.r) b.vy*=-1;
      // mouse attract
      if(mx>0){const dx=mx-b.x,dy=my-b.y,d=Math.sqrt(dx*dx+dy*dy);if(d<150){b.vx+=dx/d*0.05;b.vy+=dy/d*0.05;}}
      const spd=Math.sqrt(b.vx*b.vx+b.vy*b.vy);
      if(spd>2){b.vx=b.vx/spd*2;b.vy=b.vy/spd*2;}
      const g=ctx.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);
      g.addColorStop(0,`hsla(${b.hue},80%,70%,0.9)`);
      g.addColorStop(1,`hsla(${b.hue},80%,50%,0)`);
      ctx.fillStyle=g;
      ctx.beginPath();ctx.arc(b.x,b.y,b.r,0,Math.PI*2);ctx.fill();
      b.hue+=0.3;
    }
    requestAnimationFrame(frame);
  }
  frame();
})();

// ─── 4. Glitch Text ────────────────────────────────────────────
(function() {
  const box = document.getElementById('glitch-box');
  const el = document.getElementById('glitch-text');
  const words = ['NEURAL','SIGNAL','CORTEX','SYNAPSE','LATENT','DIFFUSE','EMBED'];
  let wordIdx=0, glitching=false;
  const chars='!@#$%^&*<>?/|\\~`';
  function glitch(duration){
    if(glitching) return;
    glitching=true;
    const orig=el.textContent;
    let frames=0;
    const id=setInterval(()=>{
      if(frames++ > duration*3){clearInterval(id);el.textContent=orig;el.style.color='#fff';el.style.transform='';glitching=false;return;}
      let s='';
      for(let i=0;i<orig.length;i++) s+=Math.random()<0.3?chars[Math.floor(Math.random()*chars.length)]:orig[i];
      el.textContent=s;
      el.style.color=`hsl(${Math.random()*60+160},90%,70%)`;
      el.style.transform=`translateX(${(Math.random()-0.5)*8}px) skewX(${(Math.random()-0.5)*5}deg)`;
    },50);
  }
  box.addEventListener('click',()=>{wordIdx=(wordIdx+1)%words.length; el.textContent=words[wordIdx]; glitch(15);});
  box.addEventListener('mouseenter',()=>glitch(8));
})();

// ─── 5. CRT Scanlines ──────────────────────────────────────────
(function() {
  const c = document.getElementById('crt-canvas');
  const ctx = c.getContext('2d');
  const W=c.width, H=c.height;
  const text=['> INIT SYSTEM','> LOADING...','> NEURAL NET ACTIVE','> PATTERN FOUND','> OUTPUT READY'];
  let lineIdx=0, charIdx=0, scanY=0;
  function drawText(){
    ctx.fillStyle='#0a1a0a'; ctx.fillRect(0,0,W,H);
    ctx.font='13px monospace'; ctx.fillStyle='#00ff66';
    text.slice(0,lineIdx+1).forEach((l,i)=>{
      const drawn = i<lineIdx ? l : l.slice(0,charIdx);
      ctx.fillText(drawn, 14, 30+i*22);
    });
    // scanlines
    ctx.fillStyle='rgba(0,0,0,0.22)';
    for(let y=0;y<H;y+=2) ctx.fillRect(0,y,W,1);
    // scan beam
    const g=ctx.createLinearGradient(0,scanY-6,0,scanY+6);
    g.addColorStop(0,'rgba(0,255,102,0)');
    g.addColorStop(0.5,'rgba(0,255,102,0.08)');
    g.addColorStop(1,'rgba(0,255,102,0)');
    ctx.fillStyle=g; ctx.fillRect(0,scanY-6,W,12);
    // vignette
    const v=ctx.createRadialGradient(W/2,H/2,H*0.3,W/2,H/2,H*0.8);
    v.addColorStop(0,'rgba(0,0,0,0)'); v.addColorStop(1,'rgba(0,0,0,0.55)');
    ctx.fillStyle=v; ctx.fillRect(0,0,W,H);
  }
  let last=0;
  function frame(ts){
    scanY=(scanY+1.5)%H;
    if(ts-last>80){
      last=ts;
      if(lineIdx<text.length){
        charIdx++;
        if(charIdx>text[lineIdx].length){charIdx=0;lineIdx=Math.min(lineIdx+1,text.length-1);}
      }
    }
    drawText();
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();

// ─── 6. Lava Lamp / Color Cycle ────────────────────────────────
(function() {
  const c = document.getElementById('lava-canvas');
  const ctx = c.getContext('2d');
  const W=c.width, H=c.height;
  const blobs=[
    {x:W*0.3,y:H*0.5,vx:0.6,vy:-0.4,r:50,h:0},
    {x:W*0.7,y:H*0.4,vx:-0.4,vy:0.7,r:40,h:120},
    {x:W*0.5,y:H*0.7,vx:0.3,vy:-0.5,r:45,h:240},
  ];
  let t=0;
  c.addEventListener('click',e=>{
    const r=c.getBoundingClientRect();
    blobs.push({x:e.clientX-r.left,y:e.clientY-r.top,vx:(Math.random()-0.5)*1.5,vy:(Math.random()-0.5)*1.5,r:30+Math.random()*25,h:Math.random()*360});
  });
  function frame(){
    ctx.fillStyle='#10101a'; ctx.fillRect(0,0,W,H);
    for(const b of blobs){
      b.x+=b.vx; b.y+=b.vy;
      if(b.x<b.r||b.x>W-b.r) b.vx*=-1;
      if(b.y<b.r||b.y>H-b.r) b.vy*=-1;
      b.h=(b.h+0.4)%360;
      const squeeze=1+Math.sin(t*2+b.h)*0.12;
      ctx.save();
      ctx.translate(b.x,b.y);
      ctx.scale(squeeze,1/squeeze);
      const g=ctx.createRadialGradient(0,0,0,0,0,b.r);
      g.addColorStop(0,`hsla(${b.h},90%,75%,0.95)`);
      g.addColorStop(0.6,`hsla(${b.h},80%,55%,0.7)`);
      g.addColorStop(1,`hsla(${b.h},70%,35%,0)`);
      ctx.fillStyle=g;
      ctx.beginPath();ctx.arc(0,0,b.r,0,Math.PI*2);ctx.fill();
      ctx.restore();
    }
    t+=0.016;
    requestAnimationFrame(frame);
  }
  frame();
})();
</script>

---

*Source for all experiments: vanilla Canvas API + no dependencies. See [Design references →](/interests/design/) for tools and inspirations.*

---

## Site Experiments

External test sites I'm building outside this Jekyll repo to evaluate alternative templates and frameworks.

<div class="lab-grid">

<div class="lab-card" style="padding:1em 1.1em;">
<div class="lab-card-title" style="border:none;padding:0;">Next.js Blog Template <span class="lab-tag">Next.js</span><span class="lab-tag">test build</span></div>
<div class="lab-card-desc" style="padding:0.5em 0 0 0;">
A static-export Next.js blog deployed via GitHub Actions to a project page. Used to evaluate Next.js + MDX as an alternative to the current Jekyll/Hydejack stack.<br>
→ <a href="https://kafkapple.github.io/nextjs-blog/" target="_blank" rel="noopener">View live</a> · <a href="https://github.com/kafkapple/nextjs-blog" target="_blank" rel="noopener">Source</a>
</div>
</div>

</div>
