/* ------------------------------------------------------------------
   Remembering. Where the reader got to in each case study, and where
   they were on the homepage when they left it. Same browser only.
   ------------------------------------------------------------------ */
(function () {
  'use strict';
  var KEY = 'amrit-visits-v1';
  var PAGE = location.pathname.split('/').pop() || 'index.html';
  var CASES = ['contract-understanding.html', 'auto-extraction.html', 'intent-model.html', 'airtel-self-serve.html'];
  var v = {};
  try { v = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch (e) {} }

  /* the pill's style travels with the script, so pages without marks.css still get it */
  if (!document.querySelector('link[href="marks.css"]')) {
    var st = document.createElement('style');
    st.textContent = '.mk-resume{position:fixed;left:50%;bottom:24px;transform:translate(-50%,12px);z-index:50;padding:10px 16px;border-radius:999px;border:1px solid #E3E3DF;background:#fff;font-family:"Inter",-apple-system,BlinkMacSystemFont,sans-serif;font-size:13.5px;color:#191A18;cursor:pointer;box-shadow:0 12px 32px -14px rgba(25,26,24,.22);opacity:0;transition:opacity .35s ease,transform .35s ease}.mk-resume.on{opacity:1;transform:translate(-50%,0)}.mk-resume:hover{border-color:#191A18}@media (max-width:560px){.mk-resume{bottom:72px}}@media (prefers-reduced-motion:reduce){.mk-resume{transition:none;transform:translate(-50%,0)}}';
    document.head.appendChild(st);
  }

  /* on a case study: record how far the reader got */
  if (CASES.indexOf(PAGE) > -1) {
    var rec = v[PAGE] || { depth: 0, y: 0 };
    var lastY = rec.y || 0, lastDepth = rec.depth || 0;   /* where they were before this visit */
    var t = null;
    function measure() {
      var max = document.documentElement.scrollHeight - innerHeight;
      var d = max > 0 ? Math.min(1, (scrollY + innerHeight * 0.25) / max) : 1;
      if (d > rec.depth) rec.depth = d;
      if (scrollY > 0) rec.y = scrollY;   /* a fresh load at the top does not erase their place */
      rec.at = Date.now();
      v[PAGE] = rec; save();
    }
    addEventListener('scroll', function () { clearTimeout(t); t = setTimeout(measure, 150); }, { passive: true });
    addEventListener('pagehide', measure);
    measure();
    /* going home: ask the homepage to put the reader back where they were */
    document.querySelectorAll('a[href^="index.html"], a[href="./"], a[href="/"]').forEach(function (a) {
      a.addEventListener('click', function () { try { sessionStorage.setItem('amrit-return', '1'); } catch (e) {} });
    });
    /* coming back to a half-read case study: offer to pick up */
    if (lastDepth > 0.08 && lastDepth < 0.9 && lastY > innerHeight * 0.8 && !location.hash) {
      var back = document.createElement('button');
      back.type = 'button'; back.className = 'mk-resume';
      back.textContent = 'Pick up where you left off ↓';
      back.addEventListener('click', function () {
        window.scrollTo({ top: lastY, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
        back.remove();
      });
      document.body.appendChild(back);
      setTimeout(function () { back.classList.add('on'); }, 600);
      addEventListener('scroll', function gone() { if (scrollY > 400) { back.classList.remove('on'); setTimeout(function () { back.remove(); }, 400); removeEventListener('scroll', gone); } }, { passive: true });
    }
  }

  /* on the homepage: mark what has been read, offer to continue what hasn't been finished */
  if (PAGE === 'index.html') {
    document.querySelectorAll('a.item[href], a.btext[href]').forEach(function (a) {
      var page = a.getAttribute('href').split('#')[0];
      var r = v[page]; if (!r || r.depth < 0.08) return;
      a.classList.add('seen');
      var tag = a.querySelector('.seen-tag');
      var done = r.depth >= 0.9;
      if (tag) tag.textContent = done ? 'Read' : 'Started';
      var go = a.querySelector('.go, .bgo');
      if (go && !done) {
        var arrow = go.querySelector('span');
        go.textContent = 'Continue reading ';
        if (arrow) go.appendChild(arrow);
        a.href = page;
      }
    });
    /* returning from a case study: same place on the page, no animation */
    var returning = false;
    try { returning = sessionStorage.getItem('amrit-return') === '1'; sessionStorage.removeItem('amrit-return'); } catch (e) {}
    var homeY = 0; try { homeY = parseInt(localStorage.getItem('amrit-home-y') || '0', 10); } catch (e) {}
    if (returning && homeY > 0 && !location.hash) {
      var sb = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, homeY);
      requestAnimationFrame(function () { document.documentElement.style.scrollBehavior = sb; });
    }
    var ht = null;
    addEventListener('scroll', function () { clearTimeout(ht); ht = setTimeout(function () { try { localStorage.setItem('amrit-home-y', String(scrollY)); } catch (e) {} }, 150); }, { passive: true });
  }
})();
