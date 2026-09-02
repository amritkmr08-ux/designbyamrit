/* ------------------------------------------------------------------
   Reader marks — pin a section, read its summary, leave a note.
   Works on every page. Everything is written into the page already:
   no API key, no network request, no model runs when you click.
   State lives in this browser only.
   ------------------------------------------------------------------ */
(function () {
  'use strict';

  var KEY = 'amrit-marks-v1';
  var PAGE = location.pathname.split('/').pop() || 'index.html';
  var PAGE_TITLE = (document.title.split('·')[0] || document.title).trim();

  var store = { pins: [], notes: {} };
  try {
    var raw = localStorage.getItem(KEY);
    if (raw) { var p = JSON.parse(raw); store.pins = p.pins || []; store.notes = p.notes || {}; }
  } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(store)); } catch (e) {} }

  var key = function (id) { return PAGE + '#' + id; };
  var isPinned = function (id) { return store.pins.some(function (x) { return x.k === key(id); }); };
  var noteOf = function (id) { return store.notes[key(id)] || ''; };

  var ICON = {
    pin: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path class="fillable" d="M4 2h8v12l-4-3.1L4 14z"/></svg>',
    sum: '<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h6"/></svg>',
    note:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round"><path d="M11.2 2.3l2.5 2.5L6 12.5 2.8 13.2l.7-3.2z"/></svg>',
    book:'<svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h6"/></svg>',
    dots:'<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor"><circle cx="8" cy="3.2" r="1.35"/><circle cx="8" cy="8" r="1.35"/><circle cx="8" cy="12.8" r="1.35"/></svg>',
    link:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"><path d="M6.6 9.4a3 3 0 004.3 0l2.2-2.2a3 3 0 10-4.3-4.3l-.9.9"/><path d="M9.4 6.6a3 3 0 00-4.3 0L2.9 8.8a3 3 0 104.3 4.3l.9-.9"/></svg>',
    trash:'<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M2.8 4.2h10.4M6.2 4.2V2.8h3.6v1.4M4.2 4.2l.6 8.4h6.4l.6-8.4"/></svg>',
    arrow:'<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 8h9M8.5 4.5L12 8l-3.5 3.5"/></svg>'
  };

  /* ---------------- per-section controls ---------------- */
  var sections = [].slice.call(document.querySelectorAll('[data-mk]'));

  sections.forEach(function (sec) {
    var id = sec.id;
    var h2 = sec.querySelector(sec.dataset.mkHead || 'h2');
    if (!h2 || !id) return;
    if (sec.dataset.mkHead) h2.classList.add('mk-small');

    // wrap the existing heading text so tools can pin to the right edge
    var title = document.createElement('span');
    title.className = 'mk-title';
    while (h2.firstChild) title.appendChild(h2.firstChild);
    h2.appendChild(title);
    h2.classList.add('mk-h2');

    var tools = document.createElement('span');
    tools.className = 'mk-tools';

    function mkBtn(kind, tip) {
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'mk-btn'; b.dataset.kind = kind;
      b.setAttribute('data-tip', tip); b.setAttribute('aria-label', tip + ' — ' + title.textContent.trim());
      b.innerHTML = ICON[kind];
      tools.appendChild(b); return b;
    }
    var bPin  = mkBtn('pin', 'Keep this in Your reading');
    var bSum  = sec.dataset.mk ? mkBtn('sum', 'The short version') : null;
    var bNote = mkBtn('note', 'Write a note here');
    h2.appendChild(tools);

    // drawers
    var host = h2.parentNode;
    var dSum = null;
    if (bSum) {
      dSum = document.createElement('div');
      dSum.className = 'mk-drawer';
      dSum.innerHTML = '<div class="mk-drawer-in"><p class="k">In short</p><p class="s"></p></div>';
      dSum.querySelector('p.s').textContent = sec.dataset.mk;
      host.insertBefore(dSum, h2.nextSibling);
    }

    var dNote = document.createElement('div');
    dNote.className = 'mk-drawer';
    dNote.innerHTML =
      '<div class="mk-drawer-in mk-note">' +
      '<p class="k">Your note</p>' +
      '<textarea placeholder="What matters to you about this section?"></textarea>' +
      '<div class="row"><button type="button" class="done">Done</button>' +
      '<button type="button" class="clr">Clear</button>' +
      '<span class="said"></span></div></div>';
    host.insertBefore(dNote, dSum ? dSum.nextSibling : h2.nextSibling);
    var ta = dNote.querySelector('textarea');
    ta.value = noteOf(id);

    function flagTools() {
      tools.classList.toggle('has', isPinned(id) || !!noteOf(id));
      bPin.classList.toggle('on', isPinned(id));
      bPin.setAttribute('aria-pressed', isPinned(id));
      bPin.setAttribute('data-tip', isPinned(id) ? 'Kept \u2014 remove it' : 'Keep this in Your reading');
      bNote.classList.toggle('on', !!noteOf(id));
      bNote.setAttribute('data-tip', noteOf(id) ? 'Edit your note' : 'Write a note here');
    }

    bPin.addEventListener('click', function () {
      var wasPinned = isPinned(id);
      if (wasPinned) {
        store.pins = store.pins.filter(function (x) { return x.k !== key(id); });
      } else {
        store.pins.push({ k: key(id), page: PAGE, pageTitle: PAGE_TITLE,
                          id: id, title: title.textContent.trim() });
      }
      save(); flagTools(); paint();
      if (!wasPinned) {
        bPin.classList.remove('pin-settle'); void bPin.offsetWidth;
        bPin.classList.add('pin-settle');
        setTimeout(function () { bPin.classList.remove('pin-settle'); }, 600);
      }
    });

    if (bSum) bSum.addEventListener('click', function () {
      var open = dSum.classList.toggle('open');
      bSum.classList.toggle('on', open);
      bSum.setAttribute('aria-expanded', open);
    });

    bNote.addEventListener('click', function () {
      var open = dNote.classList.toggle('open');
      bNote.setAttribute('aria-expanded', open);
      if (open) setTimeout(function () { ta.focus(); }, 200);
    });

    var said = dNote.querySelector('.said');
    var t;
    ta.addEventListener('input', function () {
      clearTimeout(t);
      t = setTimeout(function () {
        var v = ta.value.trim();
        if (v) store.notes[key(id)] = v; else delete store.notes[key(id)];
        save(); flagTools(); paint();
        said.textContent = 'Saved in this browser';
        setTimeout(function () { said.textContent = ''; }, 1600);
      }, 400);
    });
    dNote.querySelector('.done').addEventListener('click', function () {
      dNote.classList.remove('open'); bNote.focus();
    });
    dNote.querySelector('.clr').addEventListener('click', function () {
      ta.value = ''; delete store.notes[key(id)]; save(); flagTools(); paint();
    });

    flagTools();
  });

  /* ---------------- panel ---------------- */
  var pageSummary = document.getElementById('mk-page-summary');
  var summaryHTML = pageSummary
    ? (pageSummary.content ? pageSummary.innerHTML : pageSummary.innerHTML)
    : '';

  var veil = document.createElement('div'); veil.className = 'mk-veil';
  var panel = document.createElement('aside');
  panel.className = 'mk-panel'; panel.hidden = true;
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true');
  panel.setAttribute('aria-label', 'Your reading');
  panel.innerHTML =
    '<div class="mk-head"><span class="glyph">' + ICON.pin + '</span>' +
    '<span class="ttl"><h2>Your reading</h2>' +
    '<span class="desc">A short version of this page, and whatever you pin or ' +
    'note as you go.</span></span>' +
    '<button class="mk-x" type="button">Close</button></div>' +
    '<div class="mk-tabs">' +
      (summaryHTML ? '<button class="mk-tab on" data-p="sum" type="button">Quick read</button>' : '') +
      '<button class="mk-tab' + (summaryHTML ? '' : ' on') + '" data-p="pin" type="button">Your pins <span class="n"></span></button>' +
      '<button class="mk-tab" data-p="note" type="button">Your notes <span class="n"></span></button>' +
    '</div>' +
    '<div class="mk-body">' +
      (summaryHTML ? '<div class="mk-pane on" data-p="sum">' + summaryHTML + '</div>' : '') +
      '<div class="mk-pane' + (summaryHTML ? '' : ' on') + '" data-p="pin"></div>' +
      '<div class="mk-pane" data-p="note"></div>' +
    '</div>' +
    '<div class="mk-foot"></div>';
  document.body.appendChild(veil);
  document.body.appendChild(panel);
  if (pageSummary) pageSummary.remove();

  var xBtn = panel.querySelector('.mk-x');
  var opener = null;
  var dock;
  var openMenu = null, closeMenu = function () {};

  function show() {
    panel.hidden = false;
    dock.classList.add('hidden');
    requestAnimationFrame(function () { panel.classList.add('on'); veil.classList.add('on'); });
    xBtn.focus();
  }
  function hide() {
    closeMenu();
    panel.classList.remove('on'); veil.classList.remove('on');
    dock.classList.remove('hidden');
    resetArm(false);
    setTimeout(function () { panel.hidden = true; }, 220);
    if (opener) opener.focus();
  }
  xBtn.addEventListener('click', hide);
  veil.addEventListener('click', hide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !panel.hidden) {
      if (openMenu) { closeMenu(); return; }   // menu first, panel second
      hide();
    }
    if ((e.key === 'r' || e.key === 'R') && panel.hidden &&
        !/input|textarea/i.test(document.activeElement.tagName) &&
        !e.metaKey && !e.ctrlKey) { e.preventDefault(); show(); }
  });

  panel.querySelectorAll('.mk-tab').forEach(function (t) {
    t.addEventListener('click', function () {
      panel.querySelectorAll('.mk-tab').forEach(function (x) { x.classList.remove('on'); });
      panel.querySelectorAll('.mk-pane').forEach(function (x) { x.classList.remove('on'); });
      t.classList.add('on');
      panel.querySelector('.mk-pane[data-p="' + t.dataset.p + '"]').classList.add('on');
    });
  });

  /* reading dock — fixed bottom-left, identical on every page */
  dock = document.createElement('button');
  dock.type = 'button'; dock.className = 'mk-dock';
  dock.setAttribute('aria-haspopup', 'dialog');
  dock.innerHTML =
    '<span class="glyph">' + ICON.pin + '</span>' +
    '<span class="txt"><span class="t"></span><span class="s"></span></span>' +
    '<span class="kbd">R</span>';
  dock.addEventListener('click', function () { opener = dock; show(); });
  document.body.appendChild(dock);

  /* two-step reset, no browser dialog */
  var foot = panel.querySelector('.mk-foot');
  var MAC = /Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent);

  function mailBody() {
    var base = location.href.split('#')[0].replace(/[^/]*$/, '');
    var lines = ['Amrit Kumar — product designer', '', base, ''];
    if (store.pins.length) {
      lines.push('Sections I pinned:', '');
      store.pins.forEach(function (x) {
        lines.push('· ' + x.title + ' (' + x.pageTitle + ')');
        lines.push('  ' + base + x.page + '#' + x.id);
        var n = store.notes[x.k];
        if (n) lines.push('  note: ' + n);
        lines.push('');
      });
    }
    Object.keys(store.notes).forEach(function (k) {
      if (store.pins.some(function (x) { return x.k === k; })) return;
      var parts = k.split('#');
      lines.push('· note — ' + base + parts[0] + '#' + parts[1]);
      lines.push('  ' + store.notes[k], '');
    });
    return lines.join('\n');
  }

  function resetArm(on) {
    var f = panel.querySelector('.mk-foot');
    var total = store.pins.length + Object.keys(store.notes).length;

    if (on) {
      f.innerHTML = '<span class="where">This deletes every pin and note you have made.</span>' +
        '<div class="row"><span class="confirm"><span>Delete everything?</span>' +
        '<button class="yes" type="button">Delete</button>' +
        '<button class="no" type="button">Cancel</button></span></div>';
      f.querySelector('.confirm').style.marginLeft = '0';
      f.querySelector('.yes').addEventListener('click', function () {
        store.pins = []; store.notes = {};
        try { localStorage.removeItem(KEY); } catch (e) {}
        save(); paint(); refreshTools();
        document.querySelectorAll('.mk-note textarea').forEach(function (t) { t.value = ''; });
        resetArm(false);
      });
      f.querySelector('.no').addEventListener('click', function () { resetArm(false); });
      return;
    }

    f.innerHTML =
      '<span class="where">' +
        (total ? 'Bookmark this to pick up where you left off, or email yourself what you kept to take it beyond this browser.'
               : 'Bookmark this to come back later, or email yourself a copy to take it beyond this browser.') +
      '</span>' +
      '<div class="row">' +
        '<a class="mk-send" href="#"><svg viewBox="0 0 16 16" fill="none" stroke="currentColor" ' +
        'stroke-width="1.4" stroke-linejoin="round"><path d="M1.6 3.4h12.8v9.2H1.6z"/>' +
        '<path d="M1.6 4l6.4 4.6L14.4 4"/></svg>' +
        (total ? 'Email this to me' : 'Email me this portfolio') + '</a>' +
        '<span class="mk-hint">Bookmark <kbd>' + (MAC ? '\u2318' : 'Ctrl') + '</kbd><kbd>D</kbd></span>' +
        '<button class="reset" type="button">Reset</button>' +
      '</div>';

    f.querySelector('.mk-send').addEventListener('click', function (e) {
      e.preventDefault();
      var subject = total ? 'Amrit Kumar \u2014 portfolio, the parts I kept'
                          : 'Amrit Kumar \u2014 product design portfolio';
      location.href = 'mailto:?subject=' + encodeURIComponent(subject) +
                      '&body=' + encodeURIComponent(mailBody());
    });
    f.querySelector('.reset').addEventListener('click', function () { resetArm(true); });
  }
  resetArm(false);

  /* ---------------- overflow menu ---------------- */
  closeMenu = function () {
    if (!openMenu) return;
    openMenu.menu.classList.remove('on');
    openMenu.btn.setAttribute('aria-expanded', 'false');
    openMenu.menu.remove();
    openMenu = null;
  };
  document.addEventListener('click', function (e) {
    if (openMenu && !openMenu.menu.contains(e.target) && !openMenu.btn.contains(e.target)) closeMenu();
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeMenu(); });

  function moreButton(label, build) {
    // wrapper is the anchor, so the menu always hangs off the button itself
    var wrap = document.createElement('span');
    wrap.className = 'mk-morewrap';

    var btn = document.createElement('button');
    btn.type = 'button'; btn.className = 'mk-more';
    btn.setAttribute('aria-label', label);
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-haspopup', 'menu');
    btn.innerHTML = ICON.dots;

    btn.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      var wasMine = openMenu && openMenu.btn === btn;
      closeMenu();
      if (wasMine) return;

      var menu = document.createElement('div');
      menu.className = 'mk-menu'; menu.setAttribute('role', 'menu');
      build(menu, function () { closeMenu(); });
      wrap.appendChild(menu);
      menu.classList.add('on');
      btn.setAttribute('aria-expanded', 'true');

      // sit under the button; flip left/right and up/down only to stay inside the panel
      var body = panel.querySelector('.mk-body').getBoundingClientRect();
      var br = btn.getBoundingClientRect();
      var mw = menu.offsetWidth, mh = menu.offsetHeight;

      menu.style.top = (btn.offsetHeight + 5) + 'px';
      if (br.right - mw < body.left + 8) { menu.style.left = '0px'; menu.style.right = 'auto'; }
      else { menu.style.right = '0px'; menu.style.left = 'auto'; }
      if (br.bottom + 5 + mh > body.bottom - 8) menu.style.top = -(mh + 5) + 'px';

      openMenu = { btn: btn, menu: menu };
    });

    wrap.appendChild(btn);
    return wrap;
  }

  function menuItem(menu, icon, text, danger, fn) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'menuitem');
    if (danger) b.className = 'danger';
    b.innerHTML = icon + '<span>' + text + '</span>';
    b.addEventListener('click', fn);
    menu.appendChild(b);
    return b;
  }

  /* ---------------- painting pinned + notes ---------------- */
  function groupBy(items) {
    var g = {}, order = [];
    items.forEach(function (i) {
      if (!g[i.page]) { g[i.page] = { title: i.pageTitle, rows: [] }; order.push(i.page); }
      g[i.page].rows.push(i);
    });
    return order.map(function (p) { return { page: p, title: g[p].title, rows: g[p].rows }; });
  }

  function row(item, body, onRemove) {
    var el = document.createElement('div'); el.className = 'mk-item';
    var href = (item.page === PAGE ? '' : item.page) + '#' + item.id;

    var go = document.createElement('a');
    go.className = 'go'; go.href = href;
    go.addEventListener('click', function () { if (item.page === PAGE) hide(); });

    var h = document.createElement('span'); h.className = 'h';
    var t = document.createElement('span'); t.textContent = item.title;
    var a = document.createElement('span'); a.className = 'arw'; a.innerHTML = ICON.arrow;
    h.appendChild(t); h.appendChild(a);
    go.appendChild(h);
    if (body) { var p = document.createElement('p'); p.textContent = body; go.appendChild(p); }

    var more = moreButton('More actions for ' + item.title, function (menu, done) {
      menuItem(menu, ICON.arrow, 'Go to section', false, function () {
        done(); if (item.page === PAGE) hide();
        location.href = href;
      });
      menuItem(menu, ICON.link, 'Copy link', false, function () {
        var base = location.href.split('#')[0].replace(/[^/]*$/, '');
        navigator.clipboard.writeText(base + item.page + '#' + item.id);
        done();
      });
      var sep = document.createElement('div'); sep.className = 'sep'; menu.appendChild(sep);
      menuItem(menu, ICON.trash, item.isNote ? 'Delete note' : 'Remove pin', true, function () {
        done(); onRemove();
      });
    });

    el.appendChild(go); el.appendChild(more);
    return el;
  }

  function copyOut(text, btn, label) {
    navigator.clipboard.writeText(text).then(function () {
      var was = btn.textContent; btn.textContent = 'Copied';
      setTimeout(function () { btn.textContent = was; }, 1600);
    }).catch(function () { btn.textContent = 'Press Ctrl+C'; });
  }

  function paint() {
    if (typeof resetArm === 'function') resetArm(false);
    var pinPane  = panel.querySelector('.mk-pane[data-p="pin"]');
    var notePane = panel.querySelector('.mk-pane[data-p="note"]');
    var base = location.href.split('#')[0].replace(/[^/]*$/, '');

    // counts
    var noteKeys = Object.keys(store.notes);
    panel.querySelector('.mk-tab[data-p="pin"] .n').textContent  = store.pins.length ? store.pins.length : '';
    panel.querySelector('.mk-tab[data-p="note"] .n').textContent = noteKeys.length ? noteKeys.length : '';

    var total = store.pins.length + noteKeys.length;
    var bits = [];
    if (store.pins.length) bits.push(store.pins.length + (store.pins.length === 1 ? ' pinned' : ' pinned'));
    if (noteKeys.length)   bits.push(noteKeys.length + (noteKeys.length === 1 ? ' note' : ' notes'));
    dock.classList.toggle('has', total > 0);
    dock.querySelector('.t').textContent = total ? 'Your reading' : 'Read it your way';
    dock.querySelector('.s').textContent = total
      ? bits.join(' \u00b7 ')
      : 'Pin sections, open a short version, leave notes.';
    dock.setAttribute('aria-label', total
      ? 'Your reading — ' + bits.join(', ')
      : 'Reading tools: pin sections, open a short version, leave notes');

    // pinned
    pinPane.innerHTML = '';
    if (!store.pins.length) {
      pinPane.innerHTML = '<p class="mk-empty">Nothing pinned yet. Every section heading has a pin ' +
        'next to it — use it to keep the parts that matter to you, then copy them out as links.</p>';
    } else {
      groupBy(store.pins).forEach(function (g) {
        var wrap = document.createElement('div'); wrap.className = 'mk-group';
        var h = document.createElement('p'); h.className = 'pg'; h.textContent = g.title;
        wrap.appendChild(h);
        g.rows.forEach(function (item) {
          wrap.appendChild(row(item, noteOf(item.id) && item.page === PAGE ? noteOf(item.id) : '', function () {
            store.pins = store.pins.filter(function (x) { return x.k !== item.k; });
            save(); paint(); refreshTools();
          }));
        });
        pinPane.appendChild(wrap);
      });
      var acts = document.createElement('div'); acts.className = 'mk-actions';
      var cp = document.createElement('button'); cp.className = 'mk-do'; cp.type = 'button';
      cp.textContent = 'Copy as links';
      cp.addEventListener('click', function () {
        copyOut(store.pins.map(function (x) {
          return x.title + '\n' + base + x.page + '#' + x.id;
        }).join('\n\n'), cp);
      });
      acts.appendChild(cp);
      acts.appendChild(moreButton('More actions for pinned sections', function (menu, done) {
        menuItem(menu, ICON.trash,
          'Clear all ' + store.pins.length + (store.pins.length === 1 ? ' pin' : ' pins'),
          true, function () {
            done(); store.pins = []; save(); paint(); refreshTools();
          });
      }));
      pinPane.appendChild(acts);
    }

    // notes
    notePane.innerHTML = '';
    if (!noteKeys.length) {
      notePane.innerHTML = '<p class="mk-empty">No notes yet. The pencil beside any section heading ' +
        'opens a box to write in — useful if you are building a case for someone else.</p>';
    } else {
      var items = noteKeys.map(function (k) {
        var parts = k.split('#');
        var known = store.pins.filter(function (x) { return x.k === k; })[0];
        var el = document.querySelector('#' + parts[1] + ' .mk-title');
        return { k: k, isNote: true, page: parts[0], id: parts[1],
                 pageTitle: known ? known.pageTitle : (parts[0] === PAGE ? PAGE_TITLE : parts[0]),
                 title: known ? known.title : (el ? el.textContent.trim() : parts[1]) };
      });
      groupBy(items).forEach(function (g) {
        var wrap = document.createElement('div'); wrap.className = 'mk-group';
        var h = document.createElement('p'); h.className = 'pg'; h.textContent = g.title;
        wrap.appendChild(h);
        g.rows.forEach(function (item) {
          wrap.appendChild(row(item, store.notes[item.k], function () {
            delete store.notes[item.k]; save(); paint(); refreshTools();
          }));
        });
        notePane.appendChild(wrap);
      });
      var a2 = document.createElement('div'); a2.className = 'mk-actions';
      var cp2 = document.createElement('button'); cp2.className = 'mk-do'; cp2.type = 'button';
      cp2.textContent = 'Copy notes';
      cp2.addEventListener('click', function () {
        copyOut(noteKeys.map(function (k) {
          var parts = k.split('#');
          return base + parts[0] + '#' + parts[1] + '\n' + store.notes[k];
        }).join('\n\n'), cp2);
      });
      a2.appendChild(cp2);
      a2.appendChild(moreButton('More actions for notes', function (menu, done) {
        menuItem(menu, ICON.trash,
          'Delete all ' + noteKeys.length + (noteKeys.length === 1 ? ' note' : ' notes'),
          true, function () {
            done(); store.notes = {}; save(); paint(); refreshTools();
            document.querySelectorAll('.mk-note textarea').forEach(function (t) { t.value = ''; });
          });
      }));
      notePane.appendChild(a2);
    }
  }

  function refreshTools() {
    sections.forEach(function (sec) {
      var t = sec.querySelector('.mk-tools'); if (!t) return;
      var pinned = isPinned(sec.id), note = !!noteOf(sec.id);
      t.classList.toggle('has', pinned || note);
      var bp = t.querySelector('[data-kind="pin"]');
      bp.classList.toggle('on', pinned);
      bp.setAttribute('data-tip', pinned ? 'Kept \u2014 remove it' : 'Keep this in Your reading');
      var bn = t.querySelector('[data-kind="note"]');
      bn.classList.toggle('on', note);
      var ta = sec.querySelector('.mk-note textarea');
      if (ta && ta.value.trim() !== noteOf(sec.id)) ta.value = noteOf(sec.id);
    });
  }

  paint();
})();
