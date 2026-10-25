// legal articles and office news: content/*.json (edited through /admin), cards on the page,
// "อ่านต่อ" opens the full text in a dialog
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pick = (o, lang) => (o && (o[lang] || o.th)) || '';
const both = (o, tag) => o ? `<${tag} data-th="${esc(pick(o, 'th'))}" data-en="${esc(pick(o, 'en'))}">${esc(pick(o, document.documentElement.lang))}</${tag}>` : '';
const STORIES = [];
const PER_PAGE = 3; // more than this → numbered page tabs under the cards
function renderCards(boxId, items, kind) {
  items.forEach(a => STORIES.push({ ...a, hash: `#${kind}-${a.id}` }));
  const box = document.getElementById(boxId);
  const pager = document.createElement('nav');
  pager.className = 'pager';
  box.after(pager);
  const pages = Math.ceil(items.length / PER_PAGE);
  const card = a => `
    <a class="post" href="#${kind}-${esc(a.id)}">
      <img src="${esc(a.cover || 'logo-full.png?v=2')}" alt="" class="post-img${a.coverFill ? ' fill' : ''}" loading="lazy">
      ${both(a.date, 'small')}
      ${both(a.title, 'h3')}
      ${a.place ? `<p class="post-place">📍 ${both(a.place, 'span')}</p>` : ''}
      ${both({ th: 'อ่านต่อ →', en: 'Read more →' }, 'span')}
    </a>`;
  function show(p) {
    const from = (p - 1) * PER_PAGE;
    box.innerHTML = items.slice(from, from + PER_PAGE).map(card).join('');
    if (pages < 2) { pager.hidden = true; return; }
    const nums = Array.from({ length: pages }, (_, i) => i + 1)
      .map(i => `<button type="button" data-p="${i}" class="${i === p ? 'on' : ''}" aria-label="page ${i}">${i}</button>`).join('');
    pager.innerHTML =
      `<button type="button" data-p="${p - 1}" ${p === 1 ? 'disabled' : ''} aria-label="previous">‹</button>${nums}` +
      `<button type="button" data-p="${p + 1}" ${p === pages ? 'disabled' : ''} aria-label="next">›</button>` +
      `<span class="pager-info">${[...new Set([from + 1, Math.min(from + PER_PAGE, items.length)])].join('–')} / ${items.length}</span>`;
  }
  pager.addEventListener('click', e => {
    const b = e.target.closest('button[data-p]');
    if (b && !b.disabled) show(+b.dataset.p);
  });
  show(1);
}
const newestFirst = list => (list || []).slice().sort((a, b) => (b.sort || '').localeCompare(a.sort || ''));

// JSON entries → the story shape used above. Dates are stored as YYYY-MM-DD and shown in Thai (Buddhist year) / English.
const fmtDate = (iso, lang, month) => iso
  ? new Date(iso + 'T00:00:00').toLocaleDateString(lang === 'en' ? 'en-GB' : 'th-TH', { day: 'numeric', month, year: 'numeric' })
  : '';
const paras = s => String(s || '').split(/\n\s*\n/).map(t => t.trim()).filter(Boolean);
const fromNews = (n, i) => {
  const pics = lang => (n.images || []).filter(p => p.image)
    .map(p => ({ img: p.image, caption: lang === 'en' ? (p.caption_en || p.caption_th) : p.caption_th }));
  return {
    id: n.id || `${n.date}-${i}`, sort: n.date, coverFill: true,
    date: { th: fmtDate(n.date, 'th', 'long'), en: fmtDate(n.date, 'en', 'long') },
    title: { th: n.title_th, en: n.title_en },
    place: n.place_th ? { th: n.place_th, en: n.place_en } : null,
    cover: n.cover || (pics('th')[0] || {}).img,
    body: { th: [...paras(n.body_th), ...pics('th')], en: [...paras(n.body_en || n.body_th), ...pics('en')] }
  };
};
const fromArticle = (a, i) => {
  const ruling = { th: a.ruling ? `คำพิพากษาศาลฎีกาที่ ${a.ruling}` : '', en: a.ruling ? `Supreme Court Judgment ${a.ruling}` : '' };
  const label = lang => [fmtDate(a.date, lang, 'short'), ruling[lang]].filter(Boolean).join(' · ');
  const pic = lang => a.image ? [{ img: a.image, caption: ruling[lang] }] : [];
  return {
    id: a.id || `${a.date}-${i}`, sort: a.date,
    date: { th: label('th'), en: label('en') },
    title: { th: a.title_th, en: a.title_en },
    cover: a.cover || a.image,
    body: { th: [...pic('th'), ...paras(a.body_th)], en: [...pic('en'), ...paras(a.body_en || a.body_th)] }
  };
};
const loadJson = path => fetch(path, { cache: 'no-cache' }).then(r => r.ok ? r.json() : { items: [] }).catch(() => ({ items: [] }));
const storiesReady = Promise.all([loadJson('content/articles.json'), loadJson('content/news.json')]).then(([arts, news]) => {
  renderCards('posts', newestFirst((arts.items || []).map(fromArticle)), 'article');
  renderCards('news-list', newestFirst((news.items || []).map(fromNews)), 'news');
});

const reader = document.getElementById('reader');
function showArticle() {
  const a = STORIES.find(x => x.hash === location.hash);
  if (!a) { if (reader.open) reader.close(); return; }
  const lang = document.documentElement.lang;
  const blocks = pick(a.body, lang) || [];
  document.getElementById('reader-body').innerHTML =
    `<small>${esc(pick(a.date, lang))}${a.place ? ' · 📍 ' + esc(pick(a.place, lang)) : ''}</small><h2>${esc(pick(a.title, lang))}</h2>` +
    blocks.map(b => typeof b === 'string'
      ? `<p>${esc(b)}</p>`
      : `<figure><img src="${esc(b.img)}" alt=""><figcaption>${esc(b.caption || '')}</figcaption></figure>`).join('');
  if (!reader.open) reader.showModal();
  reader.scrollTop = 0;
}
function closeArticle() {
  // drop the hash without jumping, so the page stays at the section the story came from
  const back = location.hash.startsWith('#news-') ? '#news' : '#articles';
  history.replaceState(null, '', location.pathname + location.search + back);
  if (reader.open) reader.close();
}
document.getElementById('reader-x').addEventListener('click', closeArticle);
reader.addEventListener('click', e => { if (e.target === reader) closeArticle(); });
reader.addEventListener('cancel', e => { e.preventDefault(); closeArticle(); });
addEventListener('hashchange', showArticle);

// language toggle (TH / EN) using data-th / data-en attributes
function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('[data-' + lang + ']').forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll('.lang button').forEach(b => b.classList.toggle('on', b.dataset.lang === lang));
  try { localStorage.setItem('lang', lang); } catch (e) {}
  if (reader.open) showArticle();
}
document.querySelectorAll('.lang button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
try { const saved = localStorage.getItem('lang'); if (saved) setLang(saved); } catch (e) {}
storiesReady.then(showArticle); // opened from a shared #article-... link

// mobile menu
const menu = document.getElementById('menu');
document.getElementById('burger').addEventListener('click', () => menu.classList.toggle('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => menu.classList.remove('open')));

// highlight the menu item of the section currently on screen
const nav = document.querySelector('.nav');
const links = [...menu.querySelectorAll('a')];
function markActive() {
  const y = nav.offsetHeight + 40;
  let id = 'top', best = -Infinity;
  links.forEach(a => {
    if (a.hash === '#top') return;
    const top = document.querySelector(a.hash).getBoundingClientRect().top;
    if (top <= y && top > best) { best = top; id = a.hash.slice(1); }
  });
  // at the very bottom the last section may never reach the top, so force it
  if (innerHeight + scrollY >= document.documentElement.scrollHeight - 2) id = 'contact';
  links.forEach(a => a.classList.toggle('active', a.hash === '#' + id));
}
addEventListener('scroll', markActive, { passive: true });
addEventListener('resize', markActive);
markActive();

// count-up stats when visible
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target, end = +el.dataset.count, t0 = performance.now();
    const step = t => {
      const p = Math.min((t - t0) / 1200, 1);
      el.textContent = Math.round(end * p).toLocaleString();
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
    io.unobserve(el);
  });
});
document.querySelectorAll('[data-count]').forEach(el => io.observe(el));

// contact form — sent through FormSubmit (no server needed). The form is registered to the site admin
// (Jeerasak, who activated it in FormSubmit); every message is also copied to the office (MAIL_CC).
// FORM_ID is FormSubmit's alias for Jeerasak.rlgroup@gmail.com, issued after activation (hides the address).
const FORM_ID = '8b0e9951ce59a6d5a0e6763146968a4f';
const MAIL_CC = 'ratirat.rlgroup@gmail.com,Thippawan.rlgroup@gmail.com';
const form = document.getElementById('form');

// Thai phone: 0 + 8–9 digits (02-xxx-xxxx landline, 08x-xxx-xxxx mobile); dashes/spaces allowed
const phone = form.elements.phone;
const phoneOk = v => /^0\d{8,9}$/.test(v.replace(/[\s-]/g, ''));
phone.addEventListener('input', () => {
  phone.value = phone.value.replace(/[^\d\s-]/g, '');
  phone.setCustomValidity('');
});
function checkPhone() {
  const bad = !phoneOk(phone.value);
  phone.setCustomValidity(bad ? (document.documentElement.lang === 'en'
    ? 'Please enter a valid phone number, e.g. 081-234-5678 (9–10 digits starting with 0)'
    : 'กรุณากรอกเบอร์โทรให้ถูกต้อง เช่น 081-234-5678 (9–10 หลัก ขึ้นต้นด้วย 0)') : '');
  return !bad;
}
form.querySelector('button[type=submit]').addEventListener('click', checkPhone);

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!checkPhone()) { phone.reportValidity(); return; }
  const f = new FormData(form);
  if (f.get('_honey')) return; // spam bot filled the hidden field
  const ok = document.getElementById('ok'), err = document.getElementById('err');
  const btn = form.querySelector('button[type=submit]'), label = btn.textContent;
  ok.hidden = err.hidden = true;
  btn.disabled = true;
  btn.textContent = document.documentElement.lang === 'en' ? 'Sending…' : 'กำลังส่ง…';
  try {
    const res = await fetch('https://formsubmit.co/ajax/' + FORM_ID, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'ติดต่อจากเว็บไซต์: ' + f.get('name'),
        _template: 'table',
        _cc: MAIL_CC,
        _replyto: f.get('email') || undefined,
        'ชื่อ-นามสกุล': f.get('name'),
        'เบอร์โทร': f.get('phone'),
        'อีเมล': f.get('email') || '-',
        'ประเภทคดี': f.get('type'),
        'รายละเอียด': f.get('msg') || '-'
      })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || String(data.success) !== 'true') throw new Error(data.message || res.status);
    ok.hidden = false;
    form.reset();
  } catch (x) {
    console.warn('form send failed', x);
    err.hidden = false;
  } finally {
    btn.disabled = false;
    btn.textContent = label;
  }
});
