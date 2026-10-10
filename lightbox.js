/* Enlarge a figure. Click or press Enter on any figure image; Esc, click, or the
   close button puts it back. Same look as the one on the Contract Relationships page.
   Self-contained: injects its own styles, so a page only needs the script tag. */
(function () {
  'use strict';
  if (document.getElementById('lb')) return; // page has its own

  var css = '' +
    '.lightbox{position:fixed;inset:0;z-index:100;background:rgba(20,21,19,.94);display:flex;align-items:center;justify-content:center;padding:56px 40px 100px;opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease}' +
    '.lightbox.on{opacity:1;visibility:visible}' +
    '.lightbox img{max-width:100%;max-height:calc(100vh - 160px);width:auto;height:auto;background:#fff;border-radius:3px;box-shadow:0 30px 80px -30px rgba(0,0,0,.6);cursor:zoom-out}' +
    '.lightbox .lb-close{position:absolute;top:18px;right:22px;background:none;border:1px solid rgba(255,255,255,.22);color:#F7F7F5;font-size:12px;letter-spacing:.1em;text-transform:uppercase;font-family:Poppins,-apple-system,sans-serif;padding:7px 12px;border-radius:3px;cursor:pointer}' +
    '.lightbox .lb-close:hover,.lightbox .lb-close:focus-visible{border-color:#F7F7F5;outline:none}' +
    '.lightbox .cap{position:absolute;bottom:22px;left:0;right:0;text-align:center;color:#B9BBB5;font-size:13px;line-height:1.5;padding:0 40px;max-width:80ch;margin:0 auto}' +
    'figure .plate img,figure .shot img,figure > picture > img,.lb-zoom{cursor:zoom-in}' +
    '@media (max-width:700px){.lightbox{padding:56px 14px 96px}.lightbox img{max-height:calc(100vh - 160px)}.lightbox .cap{font-size:12px;padding:0 16px}}' +
    '@media (prefers-reduced-motion:reduce){.lightbox{transition:none}}' +
    '@media print{.lightbox{display:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var lb = document.createElement('div');
  lb.className = 'lightbox'; lb.id = 'lb';
  lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Enlarged figure');
  lb.innerHTML = '<button class="lb-close" type="button">Close &middot; Esc</button><div id="lbBody"></div><p class="cap" id="lbCap"></p>';
  document.body.appendChild(lb);
  var body = lb.querySelector('#lbBody'), cap = lb.querySelector('#lbCap'), closeBtn = lb.querySelector('.lb-close');
  var last = null;

  function open(img, text) {
    body.innerHTML = '';
    var big = new Image();
    // prefer what the browser is already showing; otherwise the first <source>, then the fallback
    var pic = img.closest('picture'), src = pic && pic.querySelector('source[srcset]');
    big.src = img.currentSrc || (src && src.getAttribute('srcset').split(',')[0].trim().split(' ')[0]) || img.src;
    big.alt = img.alt || '';
    body.appendChild(big);
    cap.textContent = text || '';
    lb.classList.add('on');
    document.body.style.overflow = 'hidden';
    last = img;
    closeBtn.focus();
  }
  function close() {
    if (!lb.classList.contains('on')) return;
    lb.classList.remove('on');
    document.body.style.overflow = '';
    if (last) { last.focus({ preventScroll: true }); last = null; }
  }
  lb.addEventListener('click', close);
  closeBtn.addEventListener('click', function (e) { e.stopPropagation(); close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

  var imgs = [].slice.call(document.querySelectorAll('figure img'));
  imgs.forEach(function (img) {
    if (img.closest('a')) return;                 // linked images keep their link
    if (img.naturalWidth && img.naturalWidth < 500 && img.width >= img.naturalWidth) return;
    var fig = img.closest('figure');
    var fc = fig && fig.querySelector('figcaption');
    var text = fc ? fc.textContent.trim().replace(/\s+/g, ' ') : (img.alt || '');
    img.classList.add('lb-zoom');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge: ' + (img.alt || 'figure'));
    img.addEventListener('click', function (e) { e.stopPropagation(); open(img, text); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img, text); }
    });
  });
})();
