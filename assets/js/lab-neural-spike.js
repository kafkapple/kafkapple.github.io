(function () {
  var canvas = document.getElementById('neural-spike-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var W, H;
  var N = 22;
  var nodes = [], edges = [];
  var V_REST = -70, V_THRESH = -55, V_PEAK = 40, V_RESET = -75;
  var TAU = 20, REFRAC = 18;

  function resize() {
    W = canvas.width = canvas.offsetWidth;
    H = canvas.height = 260;
    buildNetwork();
  }

  function buildNetwork() {
    nodes = [];
    edges = [];
    // ring + shortcuts (small-world)
    for (var i = 0; i < N; i++) {
      var angle = (i / N) * Math.PI * 2 - Math.PI / 2;
      var rx = W * 0.36, ry = H * 0.38;
      nodes.push({
        x: W / 2 + Math.cos(angle) * rx,
        y: H / 2 + Math.sin(angle) * ry,
        v: V_REST + Math.random() * 4,
        refrac: 0,
        i_ext: 0,
        fired: false,
        fireAge: 0
      });
    }
    // ring connections (k=2 nearest)
    for (var i = 0; i < N; i++) {
      for (var k = 1; k <= 2; k++) {
        var j = (i + k) % N;
        edges.push({ from: i, to: j, pulse: 0, active: false, delay: 0 });
      }
    }
    // random long-range shortcuts
    for (var s = 0; s < 7; s++) {
      var a = Math.floor(Math.random() * N);
      var b = Math.floor(Math.random() * N);
      if (a !== b) edges.push({ from: a, to: b, pulse: 0, active: false, delay: 0 });
    }
  }

  var W_SYN = 6.5; // synaptic weight (mV kick)

  function step() {
    var fired = [];

    for (var i = 0; i < N; i++) {
      var n = nodes[i];
      n.fireAge++;
      if (n.refrac > 0) { n.refrac--; n.v = V_RESET; continue; }

      // LIF update (Euler, dt=1 ms)
      n.v += (-( n.v - V_REST) + n.i_ext) / TAU;
      n.i_ext *= 0.85;

      if (n.v >= V_THRESH) {
        n.v = V_PEAK;
        n.refrac = REFRAC;
        n.fired = true;
        n.fireAge = 0;
        fired.push(i);
      } else {
        n.fired = false;
      }
    }

    // propagate spikes along edges with delay
    for (var e = 0; e < edges.length; e++) {
      var ed = edges[e];
      if (ed.active) {
        ed.delay--;
        ed.pulse = 1 - ed.delay / 8;
        if (ed.delay <= 0) {
          nodes[ed.to].i_ext += W_SYN;
          ed.active = false;
          ed.pulse = 0;
        }
      }
    }
    for (var fi = 0; fi < fired.length; fi++) {
      var src = fired[fi];
      for (var e = 0; e < edges.length; e++) {
        if (edges[e].from === src && !edges[e].active) {
          edges[e].active = true;
          edges[e].delay = 8;
          edges[e].pulse = 0;
        }
      }
    }

    // spontaneous noise
    if (Math.random() < 0.03) {
      var r = Math.floor(Math.random() * N);
      nodes[r].i_ext += 12;
    }
  }

  function potentialToColor(v) {
    var t = Math.max(0, Math.min(1, (v - V_REST) / (V_PEAK - V_REST)));
    var r = Math.round(t < 0.5 ? 20 + t * 2 * (0 - 20) : 0 + (t - 0.5) * 2 * 255);
    var g = Math.round(t < 0.5 ? 80 + t * 2 * (180 - 80) : 180 + (t - 0.5) * 2 * (50 - 180));
    var bv = Math.round(t < 0.5 ? 180 + t * 2 * (100 - 180) : 100 + (t - 0.5) * 2 * (20 - 100));
    return 'rgb(' + Math.max(0,Math.min(255,r)) + ',' + Math.max(0,Math.min(255,g)) + ',' + Math.max(0,Math.min(255,bv)) + ')';
  }

  function draw() {
    ctx.fillStyle = '#080e0a';
    ctx.fillRect(0, 0, W, H);

    // edges
    for (var e = 0; e < edges.length; e++) {
      var ed = edges[e];
      var fn = nodes[ed.from], tn = nodes[ed.to];
      ctx.strokeStyle = ed.active ? 'rgba(120,255,160,0.7)' : 'rgba(46,85,56,0.3)';
      ctx.lineWidth = ed.active ? 1.5 : 0.7;
      ctx.beginPath();
      ctx.moveTo(fn.x, fn.y);
      // pulse dot on edge
      if (ed.active) {
        var px = fn.x + (tn.x - fn.x) * ed.pulse;
        var py = fn.y + (tn.y - fn.y) * ed.pulse;
        ctx.lineTo(px, py);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,255,200,0.9)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(tn.x, tn.y);
      } else {
        ctx.lineTo(tn.x, tn.y);
      }
      ctx.stroke();
    }

    // nodes
    for (var i = 0; i < N; i++) {
      var n = nodes[i];
      var col = potentialToColor(n.v);
      var radius = n.fired ? 10 : 6 + Math.max(0, (n.v - V_REST) / (V_THRESH - V_REST)) * 3;
      if (n.fired) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, radius + 6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180,255,200,0.15)';
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(n.x, n.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    }

    // legend
    ctx.font = '10px monospace';
    ctx.fillStyle = 'rgba(110,190,135,0.6)';
    ctx.fillText('rest', 10, H - 26);
    ctx.fillText('threshold', 10, H - 14);
    ctx.fillStyle = 'rgba(200,60,60,0.7)';
    ctx.fillText('spike', 80, H - 20);
  }

  canvas.addEventListener('click', function (e) {
    var rect = canvas.getBoundingClientRect();
    var mx = (e.clientX - rect.left) * (W / rect.width);
    var my = (e.clientY - rect.top) * (H / rect.height);
    // inject current into nearest node
    var best = 0, bestD = 1e9;
    for (var i = 0; i < N; i++) {
      var dx = nodes[i].x - mx, dy = nodes[i].y - my;
      var d = dx*dx+dy*dy;
      if (d < bestD) { bestD = d; best = i; }
    }
    nodes[best].i_ext += 20;
  });

  function loop() {
    if (!canvas.isConnected) return;
    step();
    draw();
    requestAnimationFrame(loop);
  }

  resize();
  window.addEventListener('resize', resize);
  loop();

  var _ps = document.getElementById('_pushState');
  if (_ps) _ps.addEventListener('hy-push-state-after', function () {
    var c2 = document.getElementById('neural-spike-canvas');
    if (c2 && c2 !== canvas) { canvas = c2; ctx = canvas.getContext('2d'); resize(); loop(); }
  });
})();
