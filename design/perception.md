---
layout: page
title: Perception Lab
description: >
  Five interactive demos at the intersection of neuroscience and design —
  visual illusions, contrast sensitivity, and temporal perception.
permalink: /design/perception/
sitemap: true
---

<style>
/* ── Layout ────────────────────────────────────────────────────── */
.demo-nav { display:flex; flex-wrap:wrap; gap:0.5em; margin:1.2em 0 2em; }
.demo-nav button {
  padding:0.4em 0.9em; border:1px solid #ccc; border-radius:20px;
  background:#f5f5f5; cursor:pointer; font-size:0.85em;
  transition:background 0.15s, border-color 0.15s;
}
.demo-nav button.active, .demo-nav button:hover {
  background: rgb(46,85,56); color:#fff; border-color: rgb(46,85,56);
}
.demo-panel { display:none; }
.demo-panel.active { display:block; }
.demo-stage {
  background:#111; border-radius:8px; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
  margin:1em 0; min-height:300px; position:relative;
}
.demo-stage canvas { display:block; max-width:100%; }
.demo-controls { display:flex; flex-wrap:wrap; gap:0.8em 1.5em; margin:0.8em 0; align-items:center; font-size:0.9em; }
.demo-controls label { display:flex; align-items:center; gap:0.5em; }
.demo-controls input[type=range] { width:140px; }
.demo-btn {
  padding:0.35em 1em; background: rgb(46,85,56); color:#fff;
  border:none; border-radius:4px; cursor:pointer; font-size:0.9em;
}
.demo-btn:hover { background: rgb(26,56,40); }
.demo-info { font-size:0.88em; color:#555; line-height:1.6; border-left:3px solid #ddd; padding-left:0.8em; margin:0.8em 0; }
.sdt-result { font-family:monospace; font-size:0.85em; background:#f5f5f5; padding:0.5em 0.8em; border-radius:4px; margin:0.5em 0; }
</style>

Five interactive perceptual demos — each reveals something non-obvious about how the brain constructs visual experience.

<div class="demo-nav" id="demo-nav">
  <button class="active" data-demo="afterimage">① Color Afterimage</button>
  <button data-demo="grating">② Contrast Grating</button>
  <button data-demo="mib">③ Motion Blindness</button>
  <button data-demo="nnet">④ Neural Net</button>
  <button data-demo="tbw">⑤ Temporal Binding</button>
</div>

<!-- ① Color Afterimage ─────────────────────────────────────── -->
<div class="demo-panel active" id="panel-afterimage">
<h3 style="margin-top:0;">① Color Afterimage</h3>
<p class="demo-info">
  Stare at the center dot for 30 seconds without blinking, then click <strong>Switch</strong>. You'll see a cyan ghost where the red circle was — the opponent channel (red/green) fatigues and inverts.
</p>
<div class="demo-stage" id="stage-afterimage" style="background:#fff; min-height:260px;">
  <canvas id="cv-afterimage" width="400" height="260"></canvas>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-afterimage-switch">Switch</button>
  <button class="demo-btn" id="btn-afterimage-reset">Reset</button>
  <span id="afterimage-timer" style="color:#666;">Stare: 0s</span>
</div>
</div>

<!-- ② Contrast Sensitivity Grating ────────────────────────── -->
<div class="demo-panel" id="panel-grating">
<h3 style="margin-top:0;">② Contrast Sensitivity Function</h3>
<p class="demo-info">
  Adjust spatial frequency and contrast. Human sensitivity peaks ~4 cycles/degree and falls at both extremes — the CSF. Fine gratings (high SF) require higher contrast to be visible.
</p>
<div class="demo-stage" style="background:#888;">
  <canvas id="cv-grating" width="500" height="260"></canvas>
</div>
<div class="demo-controls">
  <label>Spatial freq <strong id="sf-val">4</strong> c/°
    <input type="range" id="sf-slider" min="1" max="20" value="4"></label>
  <label>Contrast <strong id="con-val">80</strong>%
    <input type="range" id="con-slider" min="1" max="100" value="80"></label>
</div>
</div>

<!-- ③ Motion-Induced Blindness ─────────────────────────────── -->
<div class="demo-panel" id="panel-mib">
<h3 style="margin-top:0;">③ Motion-Induced Blindness</h3>
<p class="demo-info">
  Fix your gaze on the center cross. The three yellow dots periodically disappear — not because they move, but because the rotating background suppresses them. Awareness ≠ retinal signal.
</p>
<div class="demo-stage">
  <canvas id="cv-mib" width="500" height="300"></canvas>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-mib-toggle">Pause</button>
</div>
</div>

<!-- ④ Simple Neural Net ─────────────────────────────────────── -->
<div class="demo-panel" id="panel-nnet">
<h3 style="margin-top:0;">④ Neural Network — Live Weights</h3>
<p class="demo-info">
  A 2-input → 3-hidden → 1-output network. Click <strong>Train step</strong> to run one backprop pass on the XOR problem. Watch weights update in real time — edge thickness = weight magnitude, color = sign.
</p>
<div class="demo-stage" style="background:#1a1a2e; min-height:320px;">
  <canvas id="cv-nnet" width="500" height="320"></canvas>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-nnet-step">Train step</button>
  <button class="demo-btn" id="btn-nnet-auto">Auto train</button>
  <button class="demo-btn" id="btn-nnet-reset">Reset</button>
  <span id="nnet-loss" style="font-family:monospace;font-size:0.85em;">Loss: —</span>
</div>
</div>

<!-- ⑤ Temporal Binding Window ──────────────────────────────── -->
<div class="demo-panel" id="panel-tbw">
<h3 style="margin-top:0;">⑤ Temporal Binding Window</h3>
<p class="demo-info">
  You'll see a flash and hear (or imagine) a beep with a variable delay. Click <strong>Simultaneous</strong> or <strong>Sequential</strong>. After 10 trials your personal TBW is estimated — the window within which your brain fuses audiovisual events.
</p>
<div class="demo-stage" style="background:#0d0d0d; min-height:240px; flex-direction:column; gap:1em;">
  <div id="tbw-flash" style="width:80px;height:80px;border-radius:50%;background:#333;transition:background 0.05s;"></div>
  <div id="tbw-cue" style="color:#888;font-size:0.9em;letter-spacing:0.05em;">Press Start</div>
</div>
<div class="demo-controls">
  <button class="demo-btn" id="btn-tbw-start">Start</button>
  <button class="demo-btn" id="btn-tbw-sim" disabled>Simultaneous</button>
  <button class="demo-btn" id="btn-tbw-seq" disabled>Sequential</button>
</div>
<div id="tbw-results" class="sdt-result" style="display:none;"></div>
</div>

<script>
(function () {
'use strict';

/* ── Dispatcher ─────────────────────────────────────────────── */
var demos = {};
var currentId = null;

function switchDemo(id) {
  if (currentId && demos[currentId] && demos[currentId].destroy) {
    demos[currentId].destroy();
  }
  document.querySelectorAll('.demo-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('#demo-nav button').forEach(function(b){ b.classList.remove('active'); });
  var panel = document.getElementById('panel-' + id);
  var btn = document.querySelector('[data-demo="' + id + '"]');
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
  currentId = id;
  if (demos[id] && demos[id].init) demos[id].init();
}

document.getElementById('demo-nav').addEventListener('click', function(e){
  var btn = e.target.closest('[data-demo]');
  if (btn) switchDemo(btn.dataset.demo);
});

/* ── Demo 1: Color Afterimage ─────────────────────────────── */
demos.afterimage = (function(){
  var cv, ctx, mode = 'stare', t0 = null, raf = null;

  function drawStare() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cv.width, cv.height);
    // red circle
    ctx.beginPath();
    ctx.arc(200, 130, 90, 0, Math.PI*2);
    ctx.fillStyle = '#cc2200';
    ctx.fill();
    // fixation dot
    ctx.beginPath();
    ctx.arc(200, 130, 5, 0, Math.PI*2);
    ctx.fillStyle = '#000';
    ctx.fill();
  }

  function drawAfterimage() {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, cv.width, cv.height);
    // gray circle — afterimage appears perceptually
    ctx.beginPath();
    ctx.arc(200, 130, 90, 0, Math.PI*2);
    ctx.fillStyle = '#eeeeee';
    ctx.fill();
    // fixation dot
    ctx.beginPath();
    ctx.arc(200, 130, 5, 0, Math.PI*2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.fillStyle = '#444';
    ctx.font = '13px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('← afterimage visible here', 200, 240);
  }

  function tick() {
    if (mode === 'stare' && t0 !== null) {
      var s = Math.floor((Date.now() - t0) / 1000);
      var el = document.getElementById('afterimage-timer');
      if (el) el.textContent = 'Stare: ' + s + 's';
    }
    raf = requestAnimationFrame(tick);
  }

  return {
    init: function() {
      cv = document.getElementById('cv-afterimage');
      ctx = cv.getContext('2d');
      mode = 'stare'; t0 = Date.now();
      drawStare();
      raf = requestAnimationFrame(tick);
      document.getElementById('btn-afterimage-switch').onclick = function() {
        mode = 'after'; drawAfterimage();
        var el = document.getElementById('afterimage-timer');
        if (el) el.textContent = 'Look at the circle!';
      };
      document.getElementById('btn-afterimage-reset').onclick = function() {
        mode = 'stare'; t0 = Date.now(); drawStare();
        var el = document.getElementById('afterimage-timer');
        if (el) el.textContent = 'Stare: 0s';
      };
    },
    destroy: function() {
      if (raf) cancelAnimationFrame(raf); raf = null;
    }
  };
})();

/* ── Demo 2: Contrast Grating ────────────────────────────── */
demos.grating = (function(){
  var cv, ctx;

  function draw(sf, contrast) {
    var W = cv.width, H = cv.height;
    var img = ctx.createImageData(W, H);
    var d = img.data;
    for (var y = 0; y < H; y++) {
      for (var x = 0; x < W; x++) {
        var val = Math.sin(2 * Math.PI * sf * x / W);
        var lum = Math.round(128 + val * (contrast/100) * 127);
        lum = Math.max(0, Math.min(255, lum));
        var i = (y * W + x) * 4;
        d[i] = d[i+1] = d[i+2] = lum; d[i+3] = 255;
      }
    }
    ctx.putImageData(img, 0, 0);
  }

  function update() {
    var sf = parseInt(document.getElementById('sf-slider').value);
    var con = parseInt(document.getElementById('con-slider').value);
    document.getElementById('sf-val').textContent = sf;
    document.getElementById('con-val').textContent = con;
    draw(sf, con);
  }

  return {
    init: function() {
      cv = document.getElementById('cv-grating');
      ctx = cv.getContext('2d');
      document.getElementById('sf-slider').oninput = update;
      document.getElementById('con-slider').oninput = update;
      update();
    },
    destroy: function() {}
  };
})();

/* ── Demo 3: Motion-Induced Blindness ────────────────────── */
demos.mib = (function(){
  var cv, ctx, raf = null, angle = 0, running = true;
  var dots = [{x:0.25,y:0.5},{x:0.75,y:0.5},{x:0.5,y:0.2}];
  var visible = [true, true, true];
  var phaseT = [0, 200, 400];

  function draw(ts) {
    var W = cv.width, H = cv.height;
    ctx.fillStyle = '#111';
    ctx.fillRect(0, 0, W, H);

    // rotating grid
    ctx.save();
    ctx.translate(W/2, H/2);
    ctx.rotate(angle);
    ctx.strokeStyle = 'rgba(80,120,80,0.5)';
    ctx.lineWidth = 1;
    var spacing = 28;
    for (var i = -W; i < W; i += spacing) {
      ctx.beginPath(); ctx.moveTo(i, -H); ctx.lineTo(i, H); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(-W, i); ctx.lineTo(W, i); ctx.stroke();
    }
    ctx.restore();

    // fixation cross
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(W/2-10, H/2); ctx.lineTo(W/2+10, H/2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(W/2, H/2-10); ctx.lineTo(W/2, H/2+10); ctx.stroke();

    // yellow dots with disappearance cycle
    for (var j = 0; j < dots.length; j++) {
      var cycle = ((ts - phaseT[j]) % 3000) / 3000;
      visible[j] = cycle < 0.6;
      if (visible[j]) {
        ctx.beginPath();
        ctx.arc(dots[j].x * W, dots[j].y * H, 10, 0, Math.PI*2);
        ctx.fillStyle = '#ffe600'; ctx.fill();
      }
    }

    angle += 0.015;
    raf = requestAnimationFrame(draw);
  }

  return {
    init: function() {
      cv = document.getElementById('cv-mib');
      ctx = cv.getContext('2d');
      running = true;
      document.getElementById('btn-mib-toggle').onclick = function() {
        running = !running;
        this.textContent = running ? 'Pause' : 'Resume';
        if (running) raf = requestAnimationFrame(draw);
        else { cancelAnimationFrame(raf); raf = null; }
      };
      raf = requestAnimationFrame(draw);
    },
    destroy: function() { if (raf) { cancelAnimationFrame(raf); raf = null; } }
  };
})();

/* ── Demo 4: Neural Net Viz ──────────────────────────────── */
demos.nnet = (function(){
  var cv, ctx, autoRaf = null, autoRunning = false;

  // XOR data
  var data = [[0,0,0],[0,1,1],[1,0,1],[1,1,0]];
  var W1, W2, b1, b2;

  function rand() { return (Math.random() - 0.5) * 0.8; }
  function sigmoid(x) { return 1 / (1 + Math.exp(-x)); }
  function dsigmoid(y) { return y * (1 - y); }

  function reset() {
    W1 = [[rand(),rand()],[rand(),rand()],[rand(),rand()]];
    W2 = [[rand()],[rand()],[rand()]];
    b1 = [0,0,0]; b2 = [0];
    autoRunning = false;
    if (autoRaf) { cancelAnimationFrame(autoRaf); autoRaf = null; }
    if (document.getElementById('btn-nnet-auto'))
      document.getElementById('btn-nnet-auto').textContent = 'Auto train';
  }

  function forward(x) {
    var h = [0,0,0];
    for (var i = 0; i < 3; i++) {
      h[i] = sigmoid(W1[i][0]*x[0] + W1[i][1]*x[1] + b1[i]);
    }
    var o = sigmoid(W2[0][0]*h[0] + W2[1][0]*h[1] + W2[2][0]*h[2] + b2[0]);
    return {h:h, o:o};
  }

  function trainStep() {
    var lr = 0.1, totalLoss = 0;
    for (var d = 0; d < data.length; d++) {
      var x = [data[d][0], data[d][1]], y = data[d][2];
      var fwd = forward(x);
      var h = fwd.h, o = fwd.o;
      totalLoss += 0.5 * Math.pow(y - o, 2);

      var dO = (o - y) * dsigmoid(o);
      var dW2 = [dO * h[0], dO * h[1], dO * h[2]];
      var dH = [dO * W2[0][0], dO * W2[1][0], dO * W2[2][0]];

      for (var i = 0; i < 3; i++) {
        var dHi = dH[i] * dsigmoid(h[i]);
        W1[i][0] -= lr * dHi * x[0];
        W1[i][1] -= lr * dHi * x[1];
        b1[i] -= lr * dHi;
        W2[i][0] -= lr * dW2[i];
      }
      b2[0] -= lr * dO;
    }
    return totalLoss / data.length;
  }

  function drawNet() {
    var W = cv.width, H = cv.height;
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, W, H);

    var layers = [
      [{x:80,y:120},{x:80,y:200}],
      [{x:220,y:80},{x:220,y:160},{x:220,y:240}],
      [{x:380,y:160}]
    ];
    var weights = [W1, W2];

    // draw edges
    for (var l = 0; l < 2; l++) {
      var from = layers[l], to = layers[l+1];
      var wMat = weights[l];
      for (var j = 0; j < to.length; j++) {
        for (var i = 0; i < from.length; i++) {
          var w = wMat[j][i];
          var mag = Math.min(Math.abs(w) * 2, 4);
          ctx.strokeStyle = w > 0 ? 'rgba(100,200,120,' + Math.min(0.9, Math.abs(w)) + ')'
                                   : 'rgba(220,80,80,' + Math.min(0.9, Math.abs(w)) + ')';
          ctx.lineWidth = mag;
          ctx.beginPath();
          ctx.moveTo(from[i].x, from[i].y);
          ctx.lineTo(to[j].x, to[j].y);
          ctx.stroke();
        }
      }
    }

    // draw nodes
    layers.forEach(function(layer, li) {
      layer.forEach(function(n, ni) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 16, 0, Math.PI*2);
        ctx.fillStyle = li === 0 ? '#2a5f8a' : li === 1 ? '#3a7a5a' : '#8a5a2a';
        ctx.fill();
        ctx.strokeStyle = '#aaa'; ctx.lineWidth = 1.5; ctx.stroke();
        var label = li === 0 ? ['x₁','x₂'][ni] : li === 2 ? 'y' : 'h'+(ni+1);
        ctx.fillStyle = '#eee'; ctx.font = '11px monospace'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(label, n.x, n.y);
      });
    });

    ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  }

  return {
    init: function() {
      cv = document.getElementById('cv-nnet');
      ctx = cv.getContext('2d');
      reset();
      drawNet();
      document.getElementById('btn-nnet-step').onclick = function() {
        var loss = trainStep(); drawNet();
        var el = document.getElementById('nnet-loss');
        if (el) el.textContent = 'Loss: ' + loss.toFixed(4);
      };
      document.getElementById('btn-nnet-auto').onclick = function() {
        autoRunning = !autoRunning;
        this.textContent = autoRunning ? 'Stop auto' : 'Auto train';
        if (autoRunning) {
          (function loop() {
            if (!autoRunning) return;
            var loss = trainStep(); drawNet();
            var el = document.getElementById('nnet-loss');
            if (el) el.textContent = 'Loss: ' + loss.toFixed(4);
            autoRaf = requestAnimationFrame(loop);
          })();
        } else {
          if (autoRaf) { cancelAnimationFrame(autoRaf); autoRaf = null; }
        }
      };
      document.getElementById('btn-nnet-reset').onclick = function() {
        reset(); drawNet();
        var el = document.getElementById('nnet-loss');
        if (el) el.textContent = 'Loss: —';
      };
    },
    destroy: function() {
      autoRunning = false;
      if (autoRaf) { cancelAnimationFrame(autoRaf); autoRaf = null; }
    }
  };
})();

/* ── Demo 5: Temporal Binding Window ────────────────────── */
demos.tbw = (function(){
  var trials = [], soas = [0, 33, 66, 100, 150, 200, 300, 400];
  var currentSOA = 0, audioCtx = null, running = false;

  function beep(ac) {
    var osc = ac.createOscillator();
    var gain = ac.createGain();
    osc.connect(gain); gain.connect(ac.destination);
    osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.3, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.08);
    osc.start(); osc.stop(ac.currentTime + 0.08);
  }

  function flash() {
    var el = document.getElementById('tbw-flash');
    if (el) { el.style.background = '#ffe600'; setTimeout(function(){ el.style.background = '#333'; }, 60); }
  }

  function startTrial() {
    if (running) return;
    running = true;
    currentSOA = soas[Math.floor(Math.random() * soas.length)];
    var cue = document.getElementById('tbw-cue');
    var simBtn = document.getElementById('btn-tbw-sim');
    var seqBtn = document.getElementById('btn-tbw-seq');
    if (cue) cue.textContent = 'Get ready…';

    setTimeout(function() {
      flash();
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      setTimeout(function() { beep(audioCtx); }, currentSOA);
      if (cue) cue.textContent = 'Simultaneous or Sequential?';
      if (simBtn) simBtn.disabled = false;
      if (seqBtn) seqBtn.disabled = false;
    }, 800);
  }

  function respond(perceived) {
    trials.push({ soa: currentSOA, perceived: perceived });
    running = false;
    var simBtn = document.getElementById('btn-tbw-sim');
    var seqBtn = document.getElementById('btn-tbw-seq');
    if (simBtn) simBtn.disabled = true;
    if (seqBtn) seqBtn.disabled = true;
    var cue = document.getElementById('tbw-cue');

    if (trials.length < 10) {
      if (cue) cue.textContent = 'Trial ' + trials.length + '/10 — Press Start';
    } else {
      showResults();
    }
  }

  function showResults() {
    var bySOA = {};
    trials.forEach(function(t) {
      if (!bySOA[t.soa]) bySOA[t.soa] = {sim:0, total:0};
      if (t.perceived === 'sim') bySOA[t.soa].sim++;
      bySOA[t.soa].total++;
    });
    var lines = ['SOA(ms) → %simultaneous'];
    Object.keys(bySOA).sort(function(a,b){return a-b;}).forEach(function(soa) {
      var r = bySOA[soa];
      var pct = Math.round(r.sim / r.total * 100);
      var bar = '█'.repeat(Math.round(pct/5));
      lines.push(soa + 'ms  ' + bar + ' ' + pct + '%');
    });
    var res = document.getElementById('tbw-results');
    if (res) { res.style.display = 'block'; res.textContent = lines.join('\n'); }
    var cue = document.getElementById('tbw-cue');
    if (cue) cue.textContent = 'Done! Your TBW ≈ SOA where % drops below 50%.';
    trials = [];
  }

  return {
    init: function() {
      document.getElementById('btn-tbw-start').onclick = function() {
        if (running) return;
        var res = document.getElementById('tbw-results');
        if (res) res.style.display = 'none';
        startTrial();
      };
      document.getElementById('btn-tbw-sim').onclick = function() { respond('sim'); };
      document.getElementById('btn-tbw-seq').onclick = function() { respond('seq'); };
      var cue = document.getElementById('tbw-cue');
      if (cue) cue.textContent = 'Press Start';
    },
    destroy: function() {
      running = false; trials = [];
      var simBtn = document.getElementById('btn-tbw-sim');
      var seqBtn = document.getElementById('btn-tbw-seq');
      if (simBtn) simBtn.disabled = true;
      if (seqBtn) seqBtn.disabled = true;
    }
  };
})();

/* ── Boot ────────────────────────────────────────────────── */
function boot() { switchDemo('afterimage'); }
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else { boot(); }

var _ps = document.getElementById('_pushState');
if (_ps) {
  _ps.addEventListener('hy-push-state-before', function() {
    if (currentId && demos[currentId] && demos[currentId].destroy) {
      demos[currentId].destroy();
    }
  });
  _ps.addEventListener('hy-push-state-after', boot);
}

})();
</script>
