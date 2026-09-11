/* ==========================================================================
   NetPath — app engine
   Tema, navigazione, progressi, ricerca, quiz, glossario, lab.
   Nessuna dipendenza esterna. Funziona da file:// e da GitHub Pages.
   ========================================================================== */
(function () {
"use strict";

/* --- helpers ----------------------------------------------------------- */
var $  = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var el = function (tag, attrs, html) {
  var n = document.createElement(tag);
  if (attrs) for (var k in attrs) {
    if (k === "class") n.className = attrs[k];
    else if (k === "text") n.textContent = attrs[k];
    else n.setAttribute(k, attrs[k]);
  }
  if (html != null) n.innerHTML = html;
  return n;
};
var esc = function (s) {
  return String(s).replace(/[&<>"']/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
  });
};

/* Profondità relativa: le lezioni stanno in /lezioni/, le pagine in root. */
var ROOT = document.body.getAttribute("data-root") || "";

/* --- storage ----------------------------------------------------------- */
var STORE_KEY = "netpath:v1";
var store = (function () {
  var data = { done: {}, quiz: {}, lab: {}, last: null, notes: {} };
  try {
    var raw = localStorage.getItem(STORE_KEY);
    if (raw) { var p = JSON.parse(raw); for (var k in p) data[k] = p[k]; }
  } catch (e) { /* private mode, storage bloccato: si procede in memoria */ }
  return {
    get: function (k) { return data[k]; },
    set: function (k, v) {
      data[k] = v;
      try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {}
    },
    save: function () { try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); } catch (e) {} },
    raw: data
  };
})();
window.NP_STORE = store;

/* --- tema -------------------------------------------------------------- */
function currentTheme() {
  var f = document.documentElement.getAttribute("data-theme");
  if (f) return f;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}
function toggleTheme() {
  var next = currentTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try { localStorage.setItem("netpath:theme", next); } catch (e) {}
}

/* --- icone ------------------------------------------------------------- */
var ICON = {
  sun:  '<svg class="sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon: '<svg class="moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  check:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>',
  chev: '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>',
  logo: '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="5" r="2.2"/><circle cx="5" cy="18" r="2.2"/><circle cx="19" cy="18" r="2.2"/><path d="M12 7.2v4.3M10.3 13l-3.6 3M13.7 13l3.6 3"/></svg>'
};

/* --- header ------------------------------------------------------------ */
function buildHeader() {
  var host = $("#np-header");
  if (!host) return;
  var page = document.body.getAttribute("data-page") || "";
  var nav = [
    ["percorso.html", "Percorso", "percorso"],
    ["piano.html", "Piano di studio", "piano"],
    ["lab.html", "Laboratorio", "lab"],
    ["strumenti.html", "Strumenti", "strumenti"],
    ["glossario.html", "Glossario", "glossario"]
  ];
  var links = nav.map(function (n) {
    return '<a href="' + ROOT + n[0] + '"' + (page === n[2] ? ' aria-current="page"' : "") + ">" + n[1] + "</a>";
  }).join("");

  host.className = "site-header";
  host.innerHTML =
    '<div class="site-header__inner">' +
      '<button class="icon-btn menu-btn" id="np-menu" aria-label="Apri il menu delle lezioni">' + ICON.menu + '</button>' +
      '<a class="brand" href="' + ROOT + 'index.html">' +
        '<span class="brand__mark">' + ICON.logo + '</span>' +
        '<span class="brand__name">Net<span>Path</span></span>' +
      '</a>' +
      '<nav class="site-nav">' + links + '</nav>' +
      '<div class="header-actions">' +
        '<button class="search-trigger" id="np-search-btn" aria-label="Cerca">' + ICON.search +
          '<span>Cerca lezione o termine</span><kbd>⌘K</kbd></button>' +
        '<button class="icon-btn theme-toggle" id="np-theme" aria-label="Cambia tema chiaro/scuro">' + ICON.sun + ICON.moon + '</button>' +
      '</div>' +
    '</div>';

  $("#np-theme").addEventListener("click", toggleTheme);
  $("#np-search-btn").addEventListener("click", openPalette);
  var mb = $("#np-menu");
  if (mb) mb.addEventListener("click", function () { toggleSidebar(true); });
}

/* --- footer ------------------------------------------------------------ */
function buildFooter() {
  var host = $("#np-footer");
  if (!host) return;
  host.className = "site-footer";
  host.innerHTML =
    '<div class="wrap">' +
      '<div>' +
        '<div class="brand" style="margin-bottom:10px">' +
          '<span class="brand__mark">' + ICON.logo + '</span>' +
          '<span class="brand__name">Net<span>Path</span></span></div>' +
        '<p>Percorso personale di studio del networking, da zero a livello architetto. ' +
        'I progressi sono salvati solo nel tuo browser: nessun account, nessun server.</p>' +
      '</div>' +
      '<div class="footer-links">' +
        '<a href="' + ROOT + 'percorso.html">Percorso</a>' +
        '<a href="' + ROOT + 'piano.html">Piano di studio</a>' +
        '<a href="' + ROOT + 'lab.html">Laboratorio</a>' +
        '<a href="' + ROOT + 'strumenti.html">Strumenti</a>' +
        '<a href="' + ROOT + 'glossario.html">Glossario</a>' +
        '<a href="' + ROOT + 'verifiche.html">Verifiche</a>' +
      '</div>' +
    '</div>';
}

/* --- sidebar ----------------------------------------------------------- */
function toggleSidebar(open) {
  var sb = $("#np-sidebar"), sc = $("#np-scrim");
  if (!sb) return;
  var willOpen = open != null ? open : !sb.classList.contains("is-open");
  sb.classList.toggle("is-open", willOpen);
  if (sc) sc.classList.toggle("is-open", willOpen);
  document.body.style.overflow = willOpen && window.innerWidth <= 1000 ? "hidden" : "";
}

function buildSidebar() {
  var host = $("#np-sidebar");
  if (!host) return;
  var here = document.body.getAttribute("data-lesson") || "";
  var done = store.get("done") || {};
  var html = "";

  window.NETPATH_CURRICULUM.forEach(function (lv) {
    var hasHere = lv.chapters.some(function (c) {
      return c.lessons.some(function (l) { return l.id === here; });
    });
    var openLv = hasHere || (!here && lv.id === "l1");
    var total = 0, comp = 0;
    lv.chapters.forEach(function (c) {
      c.lessons.forEach(function (l) { total++; if (done[l.id]) comp++; });
    });

    html += '<div class="side-group">';
    html += '<button class="side-level" aria-expanded="' + openLv + '" data-lv="' + lv.id + '">' +
              '<span class="dot" style="background:var(--' + lv.key + ')"></span>' +
              '<span>L' + lv.n + " · " + esc(lv.title) + '</span>' +
              '<span style="margin-left:auto;font-size:.7rem;font-family:var(--font-mono);color:var(--text-faint);font-weight:500">' +
                comp + "/" + total + '</span>' + ICON.chev + '</button>';
    html += '<div class="side-body" data-body="' + lv.id + '"' + (openLv ? "" : ' hidden') + '>';

    lv.chapters.forEach(function (ch) {
      html += '<div class="side-chapter">' + esc(ch.title) + "</div><ul class=\"side-list\">";
      ch.lessons.forEach(function (l) {
        var num = l.id.split("-")[1];
        var cls = (done[l.id] ? " is-done" : "") + (l.ready ? "" : " is-soon");
        if (l.ready) {
          html += "<li><a class=\"" + cls.trim() + "\" href=\"" + ROOT + "lezioni/" + l.id + ".html\"" +
                  (l.id === here ? ' aria-current="page"' : "") + ">" +
                  '<span class="side-num">' + num + "</span>" +
                  '<span class="side-check">' + ICON.check + "</span>" +
                  "<span>" + esc(l.t) + "</span></a></li>";
        } else {
          html += '<li><a class="' + cls.trim() + '" aria-disabled="true">' +
                  '<span class="side-num">' + num + "</span>" +
                  '<span class="side-check">' + ICON.check + "</span>" +
                  "<span>" + esc(l.t) + ' <span class="badge soon" style="font-size:.6rem;padding:0 5px">presto</span></span></a></li>';
        }
      });
      html += "</ul>";
    });
    html += "</div></div>";
  });

  host.innerHTML = html;

  $$(".side-level", host).forEach(function (b) {
    b.addEventListener("click", function () {
      var open = b.getAttribute("aria-expanded") === "true";
      b.setAttribute("aria-expanded", String(!open));
      var body = $('[data-body="' + b.getAttribute("data-lv") + '"]', host);
      if (body) body.hidden = open;
    });
  });

  var sc = $("#np-scrim");
  if (sc) sc.addEventListener("click", function () { toggleSidebar(false); });

  var cur = $('[aria-current="page"]', host);
  if (cur) {
    var t = cur.offsetTop - host.clientHeight / 2;
    host.scrollTop = t > 0 ? t : 0;
  }
}

/* --- TOC --------------------------------------------------------------- */
function buildTOC() {
  var rail = $("#np-toc");
  if (!rail) return;
  var heads = $$(".prose h2, .prose h3");
  if (heads.length < 3) { rail.style.display = "none"; return; }

  var ul = el("ul");
  heads.forEach(function (h, i) {
    if (!h.id) h.id = "sec-" + i + "-" + h.textContent.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 36);
    var li = el("li", { class: h.tagName === "H3" ? "lvl-3" : "lvl-2" });
    var a = el("a", { href: "#" + h.id, text: h.textContent.replace(/#$/, "").trim() });
    li.appendChild(a); ul.appendChild(li);
    h.insertAdjacentHTML("beforeend", ' <a class="anchor-link" href="#' + h.id + '" aria-label="Link a questa sezione">#</a>');
  });
  rail.innerHTML = '<div class="toc-rail__title">In questa lezione</div>';
  rail.appendChild(ul);

  var links = $$("a", ul);
  var obs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) {
        l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id);
      });
    });
  }, { rootMargin: "-70px 0px -72% 0px", threshold: 0 });
  heads.forEach(function (h) { obs.observe(h); });
}

/* --- barra di lettura --------------------------------------------------- */
function readProgress() {
  var bar = $("#np-progress");
  if (!bar) return;
  var tick = function () {
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
  };
  document.addEventListener("scroll", tick, { passive: true });
  tick();
}

/* --- completamento lezione + pager ------------------------------------- */
function lessonFooter() {
  var id = document.body.getAttribute("data-lesson");
  if (!id) return;
  var flat = window.NETPATH_FLAT;
  var idx = flat.findIndex(function (l) { return l.id === id; });
  if (idx < 0) return;

  var last = store.get("last") || {};
  last = { id: id, t: flat[idx].t, ts: Date.now() };
  store.set("last", last);

  var host = $("#np-lesson-foot");
  if (!host) return;

  var done = store.get("done") || {};
  var prev = null, next = null;
  for (var i = idx - 1; i >= 0; i--) { if (flat[i].ready) { prev = flat[i]; break; } }
  for (var j = idx + 1; j < flat.length; j++) { if (flat[j].ready) { next = flat[j]; break; } }

  var pager = "";
  if (prev) pager += '<a href="' + ROOT + prev.href + '"><div class="dir">← Lezione precedente</div><div class="ttl">' + esc(prev.t) + "</div></a>";
  else pager += "<span></span>";
  if (next) pager += '<a class="next" href="' + ROOT + next.href + '"><div class="dir">Lezione successiva →</div><div class="ttl">' + esc(next.t) + "</div></a>";

  host.className = "lesson-foot";
  host.innerHTML =
    '<div class="done-row">' +
      '<button class="btn' + (done[id] ? " ok" : "") + '" id="np-done">' +
        (done[id] ? ICON.check + " Completata" : "Segna come completata") + "</button>" +
      "<p id=\"np-done-msg\">" + (done[id] ? "Ottimo. Torna a ripassarla tra una settimana: è così che si fissa." :
        "Segnala solo quando sapresti spiegarla a un collega senza guardare.") + "</p>" +
    "</div>" +
    '<div class="pager">' + pager + "</div>";

  $("#np-done").addEventListener("click", function () {
    var d = store.get("done") || {};
    if (d[id]) { delete d[id]; } else { d[id] = Date.now(); }
    store.set("done", d);
    var on = !!d[id];
    this.className = "btn" + (on ? " ok" : "");
    this.innerHTML = on ? ICON.check + " Completata" : "Segna come completata";
    $("#np-done-msg").textContent = on
      ? "Ottimo. Torna a ripassarla tra una settimana: è così che si fissa."
      : "Segnala solo quando sapresti spiegarla a un collega senza guardare.";
    buildSidebar();
  });
}

/* --- QUIZ --------------------------------------------------------------
   Le opzioni vengono mescolate (Fisher-Yates) a ogni render, quindi la
   risposta giusta non è mai nella stessa posizione. La correttezza è
   memorizzata sull'oggetto opzione, non sull'indice.
   ----------------------------------------------------------------------- */
function shuffle(a) {
  var arr = a.slice();
  for (var i = arr.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = arr[i]; arr[i] = arr[j]; arr[j] = t;
  }
  return arr;
}

/* Distributore di posizioni "bilanciato".
   La sola casualità non basta: tirando a caso, con 5 domande capita per puro
   caso che la risposta giusta finisca 3 volte nello stesso posto.
   Questo distributore estrae le posizioni da un sacchetto che contiene ogni
   posizione una volta sola; quando il sacchetto si svuota, se ne riempie uno
   nuovo evitando che la posizione si ripeta a cavallo dei due giri.
   Risultato: le risposte corrette sono sparse in modo uniforme, sempre. */
function positionPicker() {
  var pools = {}, last = {};
  return function (n) {
    if (n <= 1) return 0;
    if (!pools[n] || !pools[n].length) {
      var arr = [];
      for (var i = 0; i < n; i++) arr.push(i);
      arr = shuffle(arr);
      if (last[n] != null && arr[arr.length - 1] === last[n]) {
        var t = arr[arr.length - 1]; arr[arr.length - 1] = arr[0]; arr[0] = t;
      }
      pools[n] = arr;
    }
    var p = pools[n].pop();
    last[n] = p;
    return p;
  };
}

/* Dispone le opzioni di una domanda mettendo la risposta corretta nella
   posizione indicata da `pos` e mescolando le sbagliate tra loro. */
function arrangeOptions(answers, pos) {
  var right = [], wrong = [];
  answers.forEach(function (a) { (a.ok ? right : wrong).push(a); });
  if (right.length !== 1) return shuffle(answers);  // domanda anomala: mescola e basta
  wrong = shuffle(wrong);
  var out = [], wi = 0;
  for (var i = 0; i < answers.length; i++) out.push(i === pos ? right[0] : wrong[wi++]);
  return out;
}

function renderQuiz(host, spec, quizId) {
  var letters = "ABCDEFGH";
  var answered = {}, correct = 0;
  var qs = spec.shuffleQuestions === false ? spec.questions : shuffle(spec.questions);
  var pick = positionPicker();

  var body = el("div", { class: "quiz__body" });
  var foot = el("div", { class: "quiz__foot" });

  host.className = "quiz";
  host.innerHTML =
    '<div class="quiz__head"><h3>' + esc(spec.title || "Verifica quello che hai capito") + "</h3>" +
    '<span class="quiz-meta">' + qs.length + " domande</span></div>";
  host.appendChild(body);

  qs.forEach(function (q, qi) {
    var wrap = el("div", { class: "q" });
    wrap.innerHTML = '<div class="q__num">Domanda ' + (qi + 1) + " di " + qs.length + "</div>" +
                     '<div class="q__text">' + q.q + "</div>";
    var opts = el("div", { class: "opts" });
    var arranged = arrangeOptions(q.a, pick(q.a.length));

    arranged.forEach(function (opt, oi) {
      var b = el("button", { class: "opt", type: "button" });
      b.innerHTML = '<span class="opt__key">' + letters[oi] + "</span><span>" + opt.t + "</span>";
      b.addEventListener("click", function () {
        if (answered[qi]) return;
        answered[qi] = true;
        if (opt.ok) correct++;
        $$(".opt", opts).forEach(function (other, k) {
          other.disabled = true;
          if (arranged[k].ok) other.classList.add("is-correct");
          else if (other === b) other.classList.add("is-wrong");
          else other.classList.add("is-dim");
        });
        var ex = el("div", { class: "q__explain" }, q.e || "");
        wrap.appendChild(ex);
        updateFoot();
      });
      opts.appendChild(b);
    });
    wrap.appendChild(opts);
    body.appendChild(wrap);
  });

  function updateFoot() {
    var n = Object.keys(answered).length;
    var pct = Math.round((correct / qs.length) * 100);
    var verdict = "";
    if (n === qs.length) {
      if (pct >= 90) verdict = "Padronanza. Puoi andare avanti.";
      else if (pct >= 70) verdict = "Buono. Rileggi i punti sbagliati e vai avanti.";
      else if (pct >= 50) verdict = "Le basi ci sono ma sono fragili: rifai la lezione prima di proseguire.";
      else verdict = "Non andare avanti. Rileggi la lezione con calma: qui si costruisce tutto il resto.";
      var qz = store.get("quiz") || {};
      var prevBest = qz[quizId] && qz[quizId].best || 0;
      qz[quizId] = { best: Math.max(prevBest, pct), last: pct, ts: Date.now() };
      store.set("quiz", qz);
    }
    foot.innerHTML =
      '<span class="quiz__score">' + correct + "/" + qs.length +
      ' <small>· ' + pct + "%</small></span>" +
      (verdict ? '<span style="font-size:.86rem;color:var(--text-mute)">' + verdict + "</span>" : "") +
      (n === qs.length ? '<button class="btn ghost sm" id="np-retry-' + quizId + '" style="margin-left:auto">Rifai con ordine diverso</button>' : "");
    var rb = $("#np-retry-" + quizId);
    if (rb) rb.addEventListener("click", function () { renderQuiz(host, spec, quizId); host.scrollIntoView({ block: "start" }); });
  }

  host.appendChild(foot);
  updateFoot();
}

function initQuizzes() {
  $$('script[type="application/json"][data-quiz]').forEach(function (s, i) {
    var spec;
    try { spec = JSON.parse(s.textContent); }
    catch (e) { console.error("Quiz JSON non valido", e); return; }
    var host = el("div");
    s.parentNode.insertBefore(host, s);
    var qid = (document.body.getAttribute("data-lesson") || document.body.getAttribute("data-page") || "q") + "-" + i;
    renderQuiz(host, spec, qid);
  });
}

/* --- glossario: popover sui termini ------------------------------------ */
function initTerms() {
  if (!window.NETPATH_GLOSSARY) return;
  var map = {};
  window.NETPATH_GLOSSARY.forEach(function (g) { map[g.id] = g; });
  var pop = null;
  function hide() { if (pop) { pop.remove(); pop = null; } }

  $$(".term[data-term]").forEach(function (t) {
    var g = map[t.getAttribute("data-term")];
    if (!g) return;
    t.setAttribute("tabindex", "0");
    var show = function () {
      hide();
      pop = el("div", { class: "term-pop" },
        "<strong>" + esc(g.t) + "</strong>" +
        (g.full ? '<div class="en">' + esc(g.full) + "</div>" : "") +
        "<div style=\"margin-top:6px\">" + g.d + "</div>");
      document.body.appendChild(pop);
      var r = t.getBoundingClientRect();
      var top = r.bottom + window.scrollY + 7;
      var left = Math.min(r.left + window.scrollX, window.innerWidth - pop.offsetWidth - 14);
      pop.style.top = top + "px";
      pop.style.left = Math.max(10, left) + "px";
    };
    t.addEventListener("mouseenter", show);
    t.addEventListener("focus", show);
    t.addEventListener("mouseleave", hide);
    t.addEventListener("blur", hide);
  });
  document.addEventListener("scroll", hide, { passive: true });
}

/* --- copia codice ------------------------------------------------------ */
function initCopy() {
  $$(".code").forEach(function (c) {
    var bar = $(".code__bar", c);
    if (!bar || $(".copy-btn", bar)) return;
    var b = el("button", { class: "copy-btn", type: "button", text: "copia" });
    b.addEventListener("click", function () {
      var pre = $("pre", c);
      var txt = pre ? pre.innerText : "";
      var ok = function () { b.textContent = "copiato"; b.classList.add("ok"); setTimeout(function () { b.textContent = "copia"; b.classList.remove("ok"); }, 1600); };
      if (navigator.clipboard) navigator.clipboard.writeText(txt).then(ok, function(){});
      else {
        var ta = el("textarea"); ta.value = txt; document.body.appendChild(ta);
        ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {}
        ta.remove();
      }
    });
    bar.appendChild(b);
  });
}

/* --- checklist laboratorio --------------------------------------------- */
function initLab() {
  var labs = $$("[data-lab]");
  if (!labs.length) return;
  var st = store.get("lab") || {};
  labs.forEach(function (box) {
    var key = box.getAttribute("data-lab");
    st[key] = st[key] || {};
    $$('input[type="checkbox"]', box).forEach(function (cb, i) {
      var k = "s" + i;
      cb.checked = !!st[key][k];
      cb.addEventListener("change", function () {
        var s = store.get("lab") || {};
        s[key] = s[key] || {};
        s[key][k] = cb.checked;
        store.set("lab", s);
        updateLabCount(box, key);
      });
    });
    updateLabCount(box, key);
  });
  store.set("lab", st);
}
function updateLabCount(box, key) {
  var out = $("[data-lab-count]", box);
  if (!out) return;
  var all = $$('input[type="checkbox"]', box);
  var n = all.filter(function (c) { return c.checked; }).length;
  out.textContent = n + "/" + all.length;
}

/* --- palette di ricerca (⌘K) ------------------------------------------- */
var paletteEl = null, paletteSel = 0, paletteItems = [];
function buildIndex() {
  var idx = window.NETPATH_FLAT.map(function (l) {
    return { label: l.t, sub: "L" + l.levelN + " · " + l.chapter, kind: "lezione",
             href: l.ready ? ROOT + l.href : null, hay: (l.t + " " + l.s + " " + l.chapter).toLowerCase() };
  });
  if (window.NETPATH_GLOSSARY) {
    window.NETPATH_GLOSSARY.forEach(function (g) {
      idx.push({ label: g.t, sub: g.full || "", kind: "termine",
                 href: ROOT + "glossario.html#g-" + g.id,
                 hay: (g.t + " " + (g.full || "") + " " + g.d).toLowerCase() });
    });
  }
  [["Percorso completo","percorso.html"],["Piano di studio","piano.html"],["Laboratorio MikroTik","lab.html"],
   ["Strumenti e calcolatori","strumenti.html"],["Glossario","glossario.html"],["Verifiche trimestrali","verifiche.html"]]
    .forEach(function (p) { idx.push({ label: p[0], sub: "", kind: "pagina", href: ROOT + p[1], hay: p[0].toLowerCase() }); });
  return idx;
}
function openPalette() {
  if (paletteEl) return;
  var index = buildIndex();
  paletteEl = el("div", { class: "palette-backdrop" });
  paletteEl.innerHTML =
    '<div class="palette" role="dialog" aria-label="Ricerca">' +
      '<input type="text" id="np-pal-input" placeholder="Cerca una lezione, un termine, una pagina…" autocomplete="off" spellcheck="false">' +
      '<div class="palette__results" id="np-pal-res"></div></div>';
  document.body.appendChild(paletteEl);
  document.body.style.overflow = "hidden";

  var input = $("#np-pal-input"), res = $("#np-pal-res");
  function render(q) {
    q = q.trim().toLowerCase();
    var list = q ? index.filter(function (i) { return i.hay.indexOf(q) >= 0; }) : index.slice(0, 14);
    list = list.slice(0, 40);
    paletteItems = list;
    paletteSel = 0;
    if (!list.length) { res.innerHTML = '<div class="palette__empty">Nessun risultato per "' + esc(q) + '"</div>'; return; }
    res.innerHTML = list.map(function (i, n) {
      return (i.href ? '<a href="' + i.href + '"' : '<a aria-disabled="true"') + (n === 0 ? ' class="is-sel"' : "") + ">" +
        "<span>" + esc(i.label) + (i.sub ? ' <span style="color:var(--text-faint);font-size:.8em"> — ' + esc(i.sub) + "</span>" : "") + "</span>" +
        '<span class="kind">' + (i.href ? i.kind : "in arrivo") + "</span></a>";
    }).join("");
  }
  render("");
  input.addEventListener("input", function () { render(this.value); });
  input.focus();

  paletteEl.addEventListener("click", function (e) { if (e.target === paletteEl) closePalette(); });
  input.addEventListener("keydown", function (e) {
    var links = $$("a", res);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      paletteSel = Math.max(0, Math.min(links.length - 1, paletteSel + (e.key === "ArrowDown" ? 1 : -1)));
      links.forEach(function (l, i) { l.classList.toggle("is-sel", i === paletteSel); });
      if (links[paletteSel]) links[paletteSel].scrollIntoView({ block: "nearest" });
    } else if (e.key === "Enter") {
      var t = links[paletteSel];
      if (t && t.getAttribute("href")) location.href = t.getAttribute("href");
    } else if (e.key === "Escape") closePalette();
  });
}
function closePalette() {
  if (!paletteEl) return;
  paletteEl.remove(); paletteEl = null; document.body.style.overflow = "";
}

/* --- scorciatoie -------------------------------------------------------- */
document.addEventListener("keydown", function (e) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); paletteEl ? closePalette() : openPalette(); }
  if (e.key === "Escape") { closePalette(); toggleSidebar(false); }
  if (e.key === "/" && !/^(INPUT|TEXTAREA)$/.test(document.activeElement.tagName)) { e.preventDefault(); openPalette(); }
});

/* --- API pubblica per le pagine ---------------------------------------- */
window.NetPath = {
  store: store, esc: esc, el: el, $: $, $$: $$, ROOT: ROOT,
  shuffle: shuffle, renderQuiz: renderQuiz, buildSidebar: buildSidebar,
  progress: function () {
    var done = store.get("done") || {};
    var out = { total: 0, done: 0, ready: 0, levels: {} };
    window.NETPATH_CURRICULUM.forEach(function (lv) {
      var t = 0, d = 0, r = 0;
      lv.chapters.forEach(function (c) {
        c.lessons.forEach(function (l) { t++; if (l.ready) r++; if (done[l.id]) d++; });
      });
      out.levels[lv.id] = { total: t, done: d, ready: r };
      out.total += t; out.done += d; out.ready += r;
    });
    return out;
  }
};

/* --- boot --------------------------------------------------------------- */
function boot() {
  buildHeader();
  buildFooter();
  buildSidebar();
  buildTOC();
  readProgress();
  lessonFooter();
  initQuizzes();
  initTerms();
  initCopy();
  initLab();
  if (window.NP_PAGE_INIT) window.NP_PAGE_INIT();
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
else boot();

})();
