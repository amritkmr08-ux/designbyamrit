/* Sensitivity — line morph.
   Two sentences, one line. The characters both sentences share do not fade:
   they travel to where they belong in the second sentence. Only the characters
   that are genuinely leaving fade out, and only the ones genuinely arriving fade in.
   That is the difference between a replacement and a transformation.

   Markup:
     <span class="mline" data-morph>
       <i class="a">before</i>
       <i class="b">after</i>
     </span>
   The trigger is the closest [data-morph-host], or the element itself.
   Written for this site. No dependencies. */
(function () {
  'use strict';

  var REDUCE = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mounted = [];   /* every live host, so a resize can re-measure its glyphs */
/* ── A phone's address bar is not a resize ──────────────────────────────────
   Every one of these exists to answer a change in how much width there is: the
   column, the glyph layout, the nav words, where a panel sits. None of them
   cares how tall the window is. But a phone slides its address bar in and out
   as you scroll, and that fires resize on every frame of it - so the whole page
   was re-measuring itself while you were reading, which is what made scrolling
   feel rough and the specimens shift under you. A resize that only changed the
   height is the address bar; a resize that changed the width is a real one. */
function onWidth(fn){
  var w = innerWidth;
  addEventListener('resize', function(){
    if (innerWidth === w) return;
    w = innerWidth; fn();
  });
}


  /* ── the motion system ──
     Two curves, not one, and the property being animated picks which.

     SPATIAL — anything that moves or changes size. A damped spring, ratio 0.6,
     stiffness 700: it passes its target by about 9% and settles back. That
     overshoot is the whole point — matter has momentum, and a letter that
     arrives dead on the mark reads as a value being set, not a thing arriving.

     EFFECT — opacity, blur, colour. Critically damped: no overshoot at all.
     Light doesn't have momentum. A fade that bounces looks broken.

     Both are sampled springs, so the timing comes from physics rather than from
     a curve someone drew. Older engines get the nearest hand-drawn equivalent. */
  var SPRING = (window.CSS && CSS.supports && CSS.supports('transition-timing-function', 'linear(0, 0.5, 1)'));
  var SPATIAL = SPRING ? 'linear(0.0000, 0.0219, 0.0799, 0.1632, 0.2624, 0.3697, 0.4787, 0.5844, 0.6831, 0.7723, 0.8505, 0.9169, 0.9714, 1.0146, 1.0471, 1.0701, 1.0849, 1.0927, 1.0948, 1.0924, 1.0867, 1.0786, 1.0691, 1.0589, 1.0486, 1.0386, 1.0293, 1.0210, 1.0136, 1.0074, 1.0024, 0.9983, 0.9953, 0.9932, 0.9919, 0.9912, 0.9910, 0.9913, 0.9918, 0.9926, 0.9935, 0.9945, 1.0000)' : 'cubic-bezier(.22,1.2,.36,1)';
  var EFFECT  = SPRING ? 'linear(0.0000, 0.0079, 0.0291, 0.0601, 0.0981, 0.1411, 0.1872, 0.2349, 0.2833, 0.3313, 0.3784, 0.4240, 0.4678, 0.5096, 0.5491, 0.5863, 0.6213, 0.6539, 0.6842, 0.7123, 0.7382, 0.7622, 0.7842, 0.8044, 0.8229, 0.8398, 0.8552, 0.8693, 0.8820, 0.8937, 0.9042, 0.9138, 0.9225, 0.9303, 0.9374, 0.9438, 0.9495, 0.9547, 0.9594, 0.9636, 0.9674, 0.9708, 1.0000)' : 'cubic-bezier(.33,0,.2,1)';
  /* ── Pace ──
     It used to be 348ms for every letter, whether it moved four pixels or three
     hundred, on a stagger that was a straight ramp across the line. That reads
     as a wipe: a value being set, not letters rearranging. Three things changed.
     A letter that travels further takes longer - the base plus a share of the
     distance, capped. Every letter carries a small offset of its own, the same
     one every time, so the ramp has grain in it without being random. And there
     is a beat between the old line leaving and the new one landing. The whole
     morph is about a second and a half, which is long enough to watch. */
  var T_SP = 520, T_EF = 300;          /* base travel, and the fade */
  var PER_PX = 1.10, MAX_EXTRA = 380;  /* distance adds time, up to this much */
  var SPAN_MOVE = 260, SPAN_OUT = 200, SPAN_IN = 340, IN_BASE = 260;  /* the sweeps, and the beat */
  var JITTER = 55, T_REST = 1550;      /* per-letter offset; when the layer is redrawn clean */
  function jit(i) { var h = ((i * 7919) % 97) / 97; return Math.round((h - 0.5) * 2 * JITTER); }

  /* Where a laid-out string ends: the last letter in reading order, as a box
     relative to the host. Known the moment the layout is measured, long before
     the letters have travelled there, so anything that sits after the sentence
     can be placed at once instead of waiting to measure landed glyphs. */
  function endOf(host, B) {
    var LH = parseFloat(getComputedStyle(host).lineHeight) || 28, last = null;
    B.forEach(function (p) {
      if (!p.ch.trim()) return;
      if (!last || p.y > last.y + 1 || (Math.abs(p.y - last.y) <= 1 && p.x + (p.w || 0) > last.x + (last.w || 0))) last = p;
    });
    if (!last) { host._mlEnd = null; return; }
    host._mlEnd = { right: last.x + (last.w || 0), bottom: last.y + LH };
  }

  var TRAVEL = 'transform ' + T_SP + 'ms ' + SPATIAL + ', color ' + T_EF + 'ms ' + EFFECT;
  var FADE   = 'opacity ' + T_EF + 'ms ' + EFFECT +
               ', transform ' + T_SP + 'ms ' + SPATIAL +
               ', filter ' + T_EF + 'ms ' + EFFECT;
  /* exposed so a stylesheet can move on the same physics as the glyphs */
  try {
    var R = document.documentElement.style;
    R.setProperty('--spatial', SPATIAL);   R.setProperty('--spatial-ms', T_SP + 'ms');
    R.setProperty('--effect',  EFFECT);    R.setProperty('--effect-ms',  T_EF + 'ms');
    R.setProperty('--settle', SPRING ? 'linear(0.0000, 0.0118, 0.0431, 0.0888, 0.1444, 0.2065, 0.2722, 0.3390, 0.4054, 0.4697, 0.5312, 0.5890, 0.6428, 0.6921, 0.7370, 0.7775, 0.8136, 0.8455, 0.8736, 0.8980, 0.9191, 0.9371, 0.9524, 0.9652, 0.9759, 0.9846, 0.9916, 0.9973, 1.0016, 1.0050, 1.0074, 1.0091, 1.0102, 1.0109, 1.0111, 1.0110, 1.0107, 1.0102, 1.0097, 1.0090, 1.0083, 1.0075, 1.0000)' : 'cubic-bezier(.22,.61,.36,1)');
    R.setProperty('--settle-ms', 465 + 'ms');
  } catch (e) {}

  /* longest common subsequence over characters, so shared letters keep their identity */
  function pairs(a, b) {
    var n = a.length, m = b.length, i, j;
    if (n * m > 40000) return [];                    /* don't chew on essays */
    var d = new Int32Array((n + 1) * (m + 1));
    for (i = n - 1; i >= 0; i--) {
      for (j = m - 1; j >= 0; j--) {
        d[i * (m + 1) + j] = a[i] === b[j]
          ? d[(i + 1) * (m + 1) + j + 1] + 1
          : Math.max(d[(i + 1) * (m + 1) + j], d[i * (m + 1) + j + 1]);
      }
    }
    var out = []; i = 0; j = 0;
    while (i < n && j < m) {
      if (a[i] === b[j]) { out.push([i, j]); i++; j++; }
      else if (d[(i + 1) * (m + 1) + j] >= d[i * (m + 1) + j + 1]) i++;
      else j++;
    }
    return out;
  }

  /* lay a string out as characters, keeping words unbroken, and report each box */
  function layout(host, text) {
    /* measure against the natural width, never a width we set on a previous pass */
    var lock = host.style.width;
    if (lock) host.style.width = 'auto';
    var probe = document.createElement('span');
    probe.className = 'ml-probe';
    probe.style.cssText = 'display:block;position:static;visibility:hidden';
    /* A shrink-to-fit ancestor will widen to fit the probe while we measure, so the
       glyphs come back laid out for a box the host never actually has. Pin the probe
       to the width the host is really using. (A [data-morph-text] host is measured for
       its natural width on purpose, so it is left alone.) */
    if (!host.hasAttribute('data-morph-text')) {
      var w = host.clientWidth;
      if (w) probe.style.width = w + 'px';
    }
    var cells = [];
    /* a no-break space is part of its word, so "Sirion\u00a0·" never wraps to a line that starts with a dot */
    text.split(/([ \t\r\n\f]+)/).forEach(function (chunk) {
      if (!chunk) return;
      if (/^[ \t\r\n\f]+$/.test(chunk)) {
        chunk.split('').forEach(function (ch) {
          var c = document.createElement('i');
          c.className = 'ml-c'; c.textContent = ch;
          probe.appendChild(c); cells.push(c);
        });
        return;
      }
      var w = document.createElement('span');
      w.className = 'ml-w';
      chunk.split('').forEach(function (ch) {
        var c = document.createElement('i');
        c.className = 'ml-c'; c.textContent = ch;
        w.appendChild(c); cells.push(c);
      });
      probe.appendChild(w);
    });
    host.appendChild(probe);
    var base = host.getBoundingClientRect();
    var pos = cells.map(function (c) {
      var r = c.getBoundingClientRect();
      return { x: r.left - base.left, y: r.top - base.top, ch: c.textContent, w: r.width };
    });
    /* A space that did not fit at the end of a line is wrapped by the browser to the start of
       the next one, which indents that line by one space. Real text lets the space hang past
       the edge instead. Do the same: park it at the end of the line it belongs to. */
    for (var k = 1; k < pos.length; k++) {
      if (/^[ \t\r\n\f]$/.test(pos[k].ch) && pos[k].y > pos[k - 1].y + 1) {
        var lineY = pos[k].y, dx = pos[k].w || 0;
        pos[k].y = pos[k - 1].y;
        pos[k].x = pos[k - 1].x + (pos[k - 1].w || 0);
        for (var m = k + 1; m < pos.length && Math.abs(pos[m].y - lineY) < 1; m++) pos[m].x -= dx;
      }
    }
    var pr = probe.getBoundingClientRect();
    var w = pr.width, h = pr.height;
    host.removeChild(probe);
    if (lock) host.style.width = lock;
    pos.w = w;
    /* How tall the string actually came out. On a desktop every one of these lines fits
       on one, so the boxes were given a fixed height and nothing needed to ask. A phone
       column wraps some of them, and a box that cannot grow draws its second line over
       whatever sits underneath. The measurement is published as a custom property; the
       stylesheet decides, per breakpoint, whether to use it. */
    pos.h = h;
    return pos;
  }

  /* morph a host element from one string to another, leaving it resting on the second */
  function morph(host, fromText, toText, opts) {
    opts = opts || {};
    host.setAttribute('data-ml-busy', '');
    var A = layout(host, fromText), B = layout(host, toText);
    endOf(host, B);
    var link = pairs(A.map(function (p) { return p.ch; }), B.map(function (p) { return p.ch; }));

    /* A letter that shifts a few characters reads as the same letter moving.
       A letter that flies across two lines and half the column reads as debris.
       Past that distance the pair is broken: the old one fades out where it is,
       the new one fades in where it belongs. Grace comes from the long throws
       being cut, not from slowing everything down. */
    var reach = Math.max(120, host.clientWidth * 0.22);
    link = link.filter(function (pr) {
      var a = A[pr[0]], b = B[pr[1]];
      return Math.hypot(b.x - a.x, b.y - a.y) <= reach;
    });

    var aTo = {}, bFrom = {};
    link.forEach(function (p) { aTo[p[0]] = p[1]; bFrom[p[1]] = p[0]; });

    var old = host.querySelector('.ml-layer');
    if (old) old.remove();

    var layer = document.createElement('span');
    layer.className = 'ml-layer';
    layer.setAttribute('aria-hidden', 'true');
    var moves = [], outs = [], ins = [];

    /* Reading order, not string order: a letter's delay comes from where it sits
       on the line, so the old text clears and the new one arrives as a sweep
       across the block rather than as one flat cut. */
    var W = Math.max(host.clientWidth || 1, 1);
    var LH = parseFloat(getComputedStyle(host).lineHeight) || 28;
    function when(p, span, base) {
      var line = Math.round((p.y || 0) / LH);
      return Math.round((base || 0) + line * span * 0.45 + ((p.x || 0) / W) * span);
    }

    A.forEach(function (p, i) {
      if (!p.ch.trim() && aTo[i] === undefined) return;
      var c = document.createElement('i');
      c.className = 'ml-g'; c.textContent = p.ch;
      c.style.left = p.x + 'px'; c.style.top = p.y + 'px';
      layer.appendChild(c);
      if (aTo[i] !== undefined) { var q = B[aTo[i]]; moves.push({ el: c, box: p, dx: q.x - p.x, dy: q.y - p.y }); }
      else outs.push({ el: c, box: p });
    });
    B.forEach(function (p, j) {
      if (bFrom[j] !== undefined || !p.ch.trim()) return;
      var c = document.createElement('i');
      c.className = 'ml-g ml-in'; c.textContent = p.ch;
      c.style.left = p.x + 'px'; c.style.top = p.y + 'px';
      layer.appendChild(c);
      ins.push({ el: c, box: p });
    });
    host.appendChild(layer);

    if (REDUCE) { rest(host, B); return; }

    /* the box is set inside the frame, not before it: measuring the new string
       forces a reflow, and a width written during that reflow lands with no
       old value to travel from — the box would snap while the letters moved */
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      if (host.hasAttribute('data-morph-text')) {
        if (B.w) host.style.width = B.w + 'px';
        if (B.h) host.style.setProperty('--ml-h', B.h + 'px');
      }
      var lands = 0;
      moves.forEach(function (o, k) {
        var dist = Math.sqrt(o.dx * o.dx + o.dy * o.dy);
        var dur  = Math.round(T_SP + Math.min(MAX_EXTRA, dist * PER_PX));
        var dl   = Math.max(0, when(o.box, SPAN_MOVE, 0) + jit(k));
        lands = Math.max(lands, dl + dur);
        o.el.style.transition = 'transform ' + dur + 'ms ' + SPATIAL + ', color ' + T_EF + 'ms ' + EFFECT;
        o.el.style.transitionDelay = dl + 'ms';
        o.el.style.transform = 'translate(' + o.dx + 'px,' + o.dy + 'px)';
        if (opts.toColor) o.el.style.color = opts.toColor;
      });
      outs.forEach(function (o, k) {
        o.el.style.transition = FADE;
        o.el.style.transitionDelay = Math.max(0, when(o.box, SPAN_OUT, 0) + jit(k + 31)) + 'ms';
        o.el.style.opacity = 0; o.el.style.transform = 'translateY(-0.32em)';
        o.el.style.filter = 'blur(3px)';
      });
      ins.forEach(function (o, k) {
        var dl = Math.max(0, when(o.box, SPAN_IN, IN_BASE) + jit(k + 67));
        lands = Math.max(lands, dl + T_SP);
        o.el.style.transition = FADE;
        o.el.style.transitionDelay = dl + 'ms';
        o.el.style.opacity = 1; o.el.style.transform = 'none'; o.el.style.filter = 'none';
      });
      /* the last letter is down at this moment; the redraw at T_REST is only housekeeping */
      host._mlLands = performance.now() + lands;
      try { host.dispatchEvent(new CustomEvent('ml:start', { bubbles: true })); } catch (e) {}
    }); });

    clearTimeout(host._mlT);
    host._mlT = setTimeout(function () { rest(host, B); }, T_REST);
  }

  /* settle: redraw the finished string with no transforms in flight */
  function rest(host, B) {
    endOf(host, B);
    var old = host.querySelector('.ml-layer');
    var layer = document.createElement('span');
    layer.className = 'ml-layer';
    layer.setAttribute('aria-hidden', 'true');
    /* At rest the string is ONE run of real text, not a letter per box. A letter in its
       own box sits at a fractional pixel and, with will-change on it, gets rasterised as
       its own layer - which is what made the resting lines look out of focus. Real text
       is drawn by the text engine, sharp and kerned, and wraps exactly as the probe did
       because the layer has the host's width and the same font. */
    var c = document.createElement('i');
    c.className = 'ml-g ml-rest';
    /* A line that was measured as one line stays one line. The probe measures letters
       one box each, which loses the kerning a real run has, so the two can differ by a
       fraction of a pixel - enough for the last word to wrap out of a fitted box.
       The same disagreement runs the other way on a line that was measured as two: the
       letters travel to the probe's wrap, and then the resting run, left to wrap on its
       own kerning, pulls the last word back up a line the moment the layer is redrawn.
       You saw that as the sentence twitching and the arrow after it flying up from the
       line below. So the breaks the letters landed on are the breaks they keep: the run
       is written with those breaks in it and never asked to find its own. */
    var oneLine = B.every(function (p) { return Math.abs((p.y || 0) - (B[0].y || 0)) < 1; });
    var txt = '';
    if (oneLine) txt = B.map(function (p) { return p.ch; }).join('');
    else {
      var ly = B.length ? (B[0].y || 0) : 0;
      B.forEach(function (p, i) {
        var y = p.y || 0;
        if (i && y > ly + 1) {
          txt = txt.replace(/[ \t]+$/, '') + '\n';   /* the space the wrap ate */
          ly = y;
          if (!p.ch.trim()) return;                  /* and any space it starts with */
        }
        txt += p.ch;
      });
    }
    c.textContent = txt;
    /* pre-wrap rather than pre: the written breaks are kept either way, and a line that
       still does not fit can wrap instead of hanging out of its box. */
    c.style.cssText = 'position:static;display:inline;white-space:' + (oneLine ? 'pre' : 'pre-wrap') +
      ';will-change:auto;transform:none;filter:none;opacity:1';
    layer.appendChild(c);
    if (old) old.remove();
    host.appendChild(layer);
    /* The end of the line is now wherever the real run put its last letter, which can
       differ from the probe by a wrap. Ask the run, not the probe. */
    try {
      var tn = c.firstChild, txt = tn ? tn.textContent : '';
      var e = txt.replace(/\s+$/, '').length;
      if (tn && e > 0) {
        var rg = document.createRange(); rg.setStart(tn, e - 1); rg.setEnd(tn, e);
        var rr = rg.getBoundingClientRect(), hb = host.getBoundingClientRect();
        var LH2 = parseFloat(getComputedStyle(host).lineHeight) || 28;
        var lineTop = Math.round((rr.top - hb.top) / LH2) * LH2;
        host._mlEnd = { right: rr.right - hb.left, bottom: lineTop + LH2 };
      }
    } catch (err) {}
    if (host.hasAttribute('data-morph-text')) {
      if (B.w) host.style.width = B.w + 'px';
      if (B.h) host.style.setProperty('--ml-h', B.h + 'px');
    }
    /* the letters are where they will stay; anything placed against them can trust this */
    host.removeAttribute('data-ml-busy');
    try { host.dispatchEvent(new CustomEvent('ml:rest', { bubbles: true })); } catch (e) {}
  }

  /* A. two states, held by hover or focus: <span data-morph><i class="a">…</i><i class="b">…</i></span> */
  function wirePair(host) {
    var aEl = host.querySelector('.a'), bEl = host.querySelector('.b');
    if (!aEl || !bEl) return;
    var A = aEl.textContent, B = bEl.textContent;
    host.setAttribute('aria-label', A);
    aEl.style.display = 'none'; bEl.style.display = 'none';
    var cur = A, on = false;
    rest(host, layout(host, A));
    mounted.push({ host: host, text: function () { return cur; } });
    function set(state) {
      if (state === on) return;
      on = state;
      host.classList.toggle('is-after', state);
      var next = state ? B : A;
      morph(host, cur, next); cur = next;
    }
    var trigger = host.closest('[data-morph-host]') || host;
    trigger.addEventListener('pointerenter', function () { set(true); });
    trigger.addEventListener('pointerleave', function () { set(false); });
    trigger.addEventListener('focus', function () { set(true); });
    trigger.addEventListener('blur', function () { set(false); });
  }

  /* B. several states, chosen by tabs: buttons carry data-v, the value morphs between them */
  function wireTabs(group) {
    var tabs = [].slice.call(group.querySelectorAll('[data-v]'));
    var host = group.querySelector('[data-morph-value]');
    if (!tabs.length || !host) return;
    var cur = tabs[0].getAttribute('data-v'), seatFor = null;
    host.setAttribute('aria-live', 'polite');
    host.setAttribute('aria-label', cur);
    rest(host, layout(host, cur));
    mounted.push({ host: host, text: function () { return cur; } });

    function pick(t) {
      var next = t.getAttribute('data-v');
      tabs.forEach(function (o) {
        var on = o === t;
        o.classList.toggle('on', on);
        o.setAttribute('aria-selected', on ? 'true' : 'false');
      });
      if (seatFor) seatFor(t, true);
      if (next === cur) return;
      host.setAttribute('aria-label', next);
      morph(host, cur, next); cur = next;
    }
    /* Pointing switches the value, but only after a short wait. Without it, dragging the
       pointer across the row fired every tab on the way past and the line below thrashed.
       90ms is the same wait the Sensitivity framework's terms use, so the two sets of tabs
       behave identically. Pressing and keyboard focus stay instant — those are decisions,
       not a pointer passing through. */
    var intent;
    tabs.forEach(function (t) {
      t.setAttribute('role', 'tab');
      t.setAttribute('aria-selected', 'false');
      t.addEventListener('click', function () { clearTimeout(intent); pick(t); });
      t.addEventListener('pointerenter', function () {
        clearTimeout(intent); intent = setTimeout(function () { pick(t); }, 90); });
      t.addEventListener('pointerleave', function () { clearTimeout(intent); });
      t.addEventListener('focus', function () { clearTimeout(intent); pick(t); });
    });
    /* one shape that travels between the labels, rather than a fill that blinks on */
    var pill = document.createElement('span');
    pill.className = 'ftab-pill';
    pill.setAttribute('aria-hidden', 'true');
    var bar = tabs[0].parentNode;
    bar.insertBefore(pill, bar.firstChild);
    function seat(t, animate) {
      var r = t.getBoundingClientRect(), b = bar.getBoundingClientRect();
      pill.style.transition = animate ? '' : 'none';
      pill.style.width = r.width + 'px';
      pill.style.height = r.height + 'px';
      pill.style.transform = 'translate(' + (r.left - b.left) + 'px,' + (r.top - b.top) + 'px)';
      if (!animate) requestAnimationFrame(function () { pill.style.transition = ''; });
    }
    seatFor = seat;

    tabs[0].classList.add('on');
    tabs[0].setAttribute('aria-selected', 'true');
    seat(tabs[0], false);
    onWidth(function () {
      var on = tabs.filter(function (t) { return t.classList.contains('on'); })[0];
      if (on) seat(on, false);
    });
  }

  /* C. a line whose text is set from code: mount it, then Morphline.to(el, 'new text') */
  function wireText(host) {
    var t = host.textContent.trim();
    host.textContent = '';
    host.setAttribute('aria-label', t);
    var first = layout(host, t);
    rest(host, first);
    /* the resting text sets the floor, so a shorter reply never reflows the line around it */
    if (first.w) host.style.minWidth = first.w + 'px';
    host._mlCur = t;
    mounted.push({ host: host, text: function () { return host._mlCur; } });
  }
  window.Morphline = {
    to: function (host, text) {
      if (!host || host._mlCur === undefined || host._mlCur === text) return;
      host.setAttribute('aria-label', text);
      morph(host, host._mlCur, text);
      host._mlCur = text;
    }
  };

  var rz;
  onWidth(function () {
    clearTimeout(rz);
    rz = setTimeout(function () {
      mounted.forEach(function (m) { rest(m.host, layout(m.host, m.text())); });
    }, 140);
  });

  function start() {
    [].slice.call(document.querySelectorAll('[data-morph]')).forEach(wirePair);
    [].slice.call(document.querySelectorAll('[data-morph-tabs]')).forEach(wireTabs);
    [].slice.call(document.querySelectorAll('[data-morph-text]')).forEach(wireText);
  }
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
  else addEventListener('load', start);
})();

/* ── Putting the nudge mark where the reading stops ────────────────────────
   Morphline knows where a sentence will end the moment it lays it out, before
   a single letter has moved (host._mlEnd), and it knows when the last letter
   will be down (host._mlLands). So the mark is placed at once, exactly, and
   shown at the moment the sentence completes - not a second later when the
   layer is redrawn for housekeeping. Nothing is measured off moving glyphs. */
window.nudgeMark = function (host, go) {
  /* `instant` places the mark without animating it. left and top carry a transition so a
     mark you are already looking at can follow its line rather than jumping, but before
     the mark is visible that same transition turns a re-measure into a flight across the
     block. Out of sight it simply arrives. */
  function put(instant) {
    var e = host._mlEnd; if (!e) return false;
    var cs = getComputedStyle(host);
    var F = parseFloat(cs.fontSize) || 17.5;
    var L = parseFloat(cs.lineHeight) || F * 1.6;
    /* from the line box bottom back up to the baseline: half the leading plus the descender */
    var drop = (L - F * 1.21) / 2 + F * 0.24;
    var l = Math.round(e.right + 7) + 'px';
    var t = Math.round(e.bottom - drop - 14) + 'px';
    if (l === go.style.left && t === go.style.top) return true;
    if (instant) {
      var keep = go.style.transition;
      go.style.transition = 'none';
      go.style.left = l; go.style.top = t;
      void go.offsetWidth;                  /* commit it before the transition comes back */
      go.style.transition = keep;
    } else {
      go.style.left = l; go.style.top = t;
    }
    return true;
  }
  go.classList.remove('set');
  if (host._nmOff) host._nmOff();
  var shown = false, t1 = null, t2 = null;
  function show() {
    if (shown) return; shown = true;
    if (put(true)) go.classList.add('set');
  }
  /* The probe measures one box per letter; real text is kerned, so the settled line can
     end a wrap away from where the probe said. When the line settles, the mark is placed
     again from the settled text, whether or not it is already showing. */
  function onRest() { show(); put(); off(); }
  function off() {
    host.removeEventListener('ml:start', arm); host.removeEventListener('ml:rest', onRest);
    clearTimeout(t1); clearTimeout(t2); host._nmOff = null;
  }
  if (!host.hasAttribute('data-ml-busy')) { show(); return; }
  /* the end is known already; place it now so it never appears anywhere else */
  put(true);
  var arm = function () {
    var wait = Math.max(0, (host._mlLands || performance.now()) - performance.now());
    clearTimeout(t1); t1 = setTimeout(show, wait);
  };
  if (host._mlLands) arm();
  host.addEventListener('ml:start', arm);
  host.addEventListener('ml:rest', onRest);
  t2 = setTimeout(function () { show(); off(); }, 2600);   /* never left armed forever */
  host._nmOff = off;
};
