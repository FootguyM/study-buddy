/* Study Buddy – reduzierte Fassung
   Kernfunktionen: Gesuche ansehen, eigenes Gesuch erstellen, Anfrage senden, Nachrichten, Profil.
   Reines HTML/CSS/JS ohne Backend. Alle Personen und Beiträge sind Beispieldaten.
   Eingaben werden nur im Browser (localStorage) gespeichert. */
(() => {
  'use strict';

  // ---------------------------------------------------------------------------
  // Stammdaten
  // ---------------------------------------------------------------------------
  const COURSES = {
    STAT2: 'Statistik II',
    MIKRO: 'Mikroökonomie I',
    KLR: 'Kosten- und Leistungsrechnung',
    LINA: 'Lineare Algebra',
    PSY: 'Einführung in die Psychologie',
  };
  const PLACES = { bib: 'Bibliothek', online: 'Online', cafe: 'Café / Mensa', egal: 'Egal' };
  const STUDIES = ['BWL (B.Sc.)', 'VWL (B.Sc.)', 'Wirtschaftsinformatik (B.Sc.)', 'Wirtschaftsmathematik (B.Sc.)', 'Psychologie (B.Sc.)', 'Anderer Studiengang'];

  const USERS = [
    { id: 'jonas', name: 'Jonas Weber', av: 'av1', study: 'BWL', semester: 3, courses: ['STAT2', 'MIKRO'], online: true },
    { id: 'aylin', name: 'Aylin Demir', av: 'av2', study: 'VWL', semester: 3, courses: ['STAT2', 'MIKRO'], online: true },
    { id: 'mehmet', name: 'Mehmet Yilmaz', av: 'av4', study: 'BWL', semester: 3, courses: ['STAT2', 'KLR'], online: false },
    { id: 'clara', name: 'Clara Hoffmann', av: 'av3', study: 'Psychologie', semester: 1, courses: ['PSY', 'STAT2'], online: true },
    { id: 'mia', name: 'Mia Schulz', av: 'av1', study: 'Wirtschaftsmathematik', semester: 3, courses: ['LINA', 'STAT2'], online: true },
    { id: 'noah', name: 'Noah Becker', av: 'av4', study: 'VWL', semester: 5, courses: ['MIKRO'], online: false },
  ];

  const now = () => Date.now();
  const ago = (min) => now() - min * 60000;

  const seed = () => ({
    loggedIn: false,
    nextId: 100,
    me: { name: 'Lena Meier', study: 'BWL (B.Sc.)', semester: 3, courses: ['STAT2', 'MIKRO', 'KLR'], when: 'Di + Do nachmittags', where: 'bib', bio: 'Ich suche jemanden, der bei Statistik bis zur Klausur dranbleibt.' },
    posts: [
      { id: 1, course: 'STAT2', author: 'jonas', t: ago(95), title: 'Suche Lernpartner für Statistik II', when: 'Di + Do nachmittags', where: 'bib',
        text: 'Hi zusammen,\n\nich suche jemanden, der mit mir bis zur Klausur regelmäßig Statistik II lernt. Ich erkläre gern laut und rechne Aufgaben zusammen durch.',
        replies: [{ author: 'mehmet', t: ago(60), text: 'Bin donnerstags auch meistens in der Bib. Schreib mir gern!' }] },
      { id: 2, course: 'MIKRO', author: 'noah', t: ago(60 * 7), title: 'Mikro I wiederholen: Wer lernt mit?', when: 'Mo, Mi oder Fr vormittags', where: 'bib',
        text: 'Ich schreibe Mikro I zur Notenverbesserung noch einmal und kenne die typischen Klausurfallen. Suche jemanden für feste Termine.',
        replies: [{ author: 'aylin', t: ago(60 * 5), text: 'Freitags vormittags wäre ich dabei!' }] },
      { id: 3, course: 'STAT2', author: 'aylin', t: ago(60 * 20), title: 'Altklausuren zusammen durchrechnen', when: 'Fr vormittags', where: 'online',
        text: 'Ich möchte die Altklausuren der letzten Jahre durchrechnen und danach Lösungen vergleichen. Gern per Videocall.', replies: [] },
      { id: 4, course: 'KLR', author: 'mehmet', t: ago(60 * 30), title: 'Feste Lerngruppe für KLR bis zur Klausur', when: 'einmal pro Woche, Do nachmittags', where: 'bib',
        text: 'Suche 2 bis 3 Leute für eine feste Lerngruppe. Ich habe alle Altklausuren seit 2022.', replies: [] },
      { id: 5, course: 'PSY', author: 'clara', t: ago(60 * 26), title: 'Ersti sucht Lernpartner für Psychologie', when: 'Mi nachmittags', where: 'cafe',
        text: 'Ich bin im ersten Semester und möchte die Grundbegriffe mit Karteikarten abfragen.', replies: [] },
      { id: 6, course: 'LINA', author: 'mia', t: ago(60 * 50), title: 'Lineare Algebra: Eigenwerte zusammen üben', when: 'Mo vormittags', where: 'online',
        text: 'Wer will Eigenwerte und Eigenvektoren mit vielen Beispielaufgaben üben?', replies: [{ author: 'clara', t: ago(60 * 45), text: 'Gute Idee, ich schau mal, ob ich Zeit habe.' }] },
      { id: 7, course: 'MIKRO', author: 'jonas', t: ago(60 * 72), title: 'Übungsblätter Mikro gemeinsam lösen', when: 'Mi abends', where: 'online',
        text: 'Ich würde die Übungsblätter gern jede Woche mit jemandem zusammen lösen, bevor die Lösungen hochgeladen werden.', replies: [] },
    ],
    requestsIn: [
      { id: 'mehmet', t: ago(130), text: 'Hi Lena! Wir sind beide in Statistik II. Hast du Lust, donnerstags nach der Vorlesung zusammen die Übungsblätter zu machen?' },
      { id: 'clara', t: ago(60 * 5), text: 'Hallo! Ich suche jemanden, der mit mir Statistik-Karteikarten durchgeht.' },
    ],
    requestsOut: {},
    buddies: ['noah'],
    chats: { noah: [
      { me: false, t: ago(60 * 20), text: 'Hey, passt dir Mittwoch 10 Uhr in der Bib?' },
      { me: true, t: ago(60 * 19), text: 'Ja, passt! Ich bringe das Übungsblatt mit.' },
    ] },
    unread: [],
  });

  // ---------------------------------------------------------------------------
  // Speicherung
  // ---------------------------------------------------------------------------
  const KEY = 'studybuddy:simple-v1';
  function load() { try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch (e) { /* egal */ } return null; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* egal */ } }
  let db = load() || seed();
  const ui = { route: 'start', param: null, filter: null, tab: 'anfragen', chat: null };

  // ---------------------------------------------------------------------------
  // Hilfsfunktionen
  // ---------------------------------------------------------------------------
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => [...document.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const initials = (n) => (n || '?').trim().split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  const first = (n) => (n || '').trim().split(/\s+/)[0];
  const user = (id) => (id === 'me' ? { ...db.me, id: 'me', av: 'av3', study: db.me.study.replace(' (B.Sc.)', ''), online: true } : USERS.find((u) => u.id === id));
  const av = (u, size = '') => `<span class="av ${size} ${u.av}" aria-hidden="true">${initials(u.name)}</span>`;
  const postById = (id) => db.posts.find((p) => p.id === +id);
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const paragraphs = (s) => String(s).split(/\n{2,}/).map((b) => `<p>${b.split('\n').map(esc).join('<br>')}</p>`).join('');

  function fmtT(t) {
    const d = new Date(t), diff = (now() - t) / 60000;
    const hm = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    if (diff < 1) return 'gerade eben';
    if (diff < 60) return `vor ${Math.round(diff)} Min.`;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (t >= today.getTime()) return `heute, ${hm}`;
    if (t >= today.getTime() - 86400000) return `gestern, ${hm}`;
    return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  }

  function relation(id) {
    if (db.buddies.includes(id)) return 'buddy';
    if (db.requestsIn.some((r) => r.id === id)) return 'incoming';
    if (db.requestsOut[id]) return 'sent';
    return 'none';
  }

  let toastTimer;
  function toast(msg, action) {
    const t = $('#toast');
    t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ''}`;
    t.hidden = false;
    if (action) t.querySelector('button').onclick = () => { t.hidden = true; action.fn(); };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, action ? 6000 : 3000);
  }
  const go = (hash) => { if (location.hash === hash) route(); else location.hash = hash; };
  const inbox = () => (db.loggedIn ? db.requestsIn.length + db.unread.length : 0);

  // ---------------------------------------------------------------------------
  // Routing
  // ---------------------------------------------------------------------------
  function route() {
    const h = location.hash.slice(1);
    const m = h.match(/^gesuch-(\d+)$/);
    if (m && postById(m[1])) { ui.route = 'gesuch'; ui.param = +m[1]; }
    else if (['neu', 'nachrichten', 'profil'].includes(h)) { ui.route = h; ui.param = null; }
    else { ui.route = 'start'; ui.param = null; }
    if (ui.route === 'nachrichten' && ui.pendingChat) { ui.tab = 'buddies'; ui.chat = ui.pendingChat; ui.pendingChat = null; }
    closeModal(true);
    render();
    window.scrollTo(0, 0);
  }

  function renderNav() {
    const n = inbox();
    const cur = (r) => (ui.route === r || (r === 'start' && ui.route === 'gesuch') ? 'aria-current="page"' : '');
    $('#nav').innerHTML = `
      <a href="#start" ${cur('start')}>Gesuche</a>
      <a href="#nachrichten" ${cur('nachrichten')}>Nachrichten${n ? ` <span class="badge" aria-label="${n} neu">${n}</span>` : ''}</a>
      ${db.loggedIn ? `<a href="#profil" ${cur('profil')}>Profil</a>` : '<button data-act="login">Anmelden</button>'}`;
  }

  const loginBox = (text) => `<div class="box"><div class="empty"><h2>Bitte melde dich an</h2><p>${text}</p>
    <div class="btn-row"><button class="btn btn-primary" data-act="login">Anmelden</button><button class="btn" data-act="register">Registrieren</button></div></div></div>`;

  // ---------------------------------------------------------------------------
  // Seite: Gesuche
  // ---------------------------------------------------------------------------
  function viewStart() {
    if (ui.filter === null) ui.filter = db.loggedIn ? 'mine' : 'all';
    if (!db.loggedIn && ui.filter === 'mine') ui.filter = 'all';
    const list = db.posts
      .filter((p) => ui.filter === 'all' || (ui.filter === 'mine' ? db.me.courses.includes(p.course) : p.course === ui.filter))
      .sort((a, b) => b.t - a.t);
    const opt = (v, l) => `<option value="${v}" ${ui.filter === v ? 'selected' : ''}>${esc(l)}</option>`;
    const intro = db.loggedIn ? '' : `
      <div class="box box-pad intro">
        <h1>Finde Lernpartner in deinen Kursen</h1>
        <ol>
          <li><b>Gesuch finden</b> oder selbst eins erstellen.</li>
          <li><b>Anfrage senden</b> mit einer kurzen Nachricht.</li>
          <li><b>Zusammen lernen.</b> Den Termin macht ihr per Nachricht aus.</li>
        </ol>
        <div class="btn-row"><button class="btn btn-primary" data-act="register">Registrieren</button><button class="btn" data-act="demo">Demo ansehen</button></div>
      </div>`;
    const rows = list.map((p) => {
      const u = user(p.author);
      return `<a class="row" href="#gesuch-${p.id}">
        ${av(u)}
        <div><div class="title"><span class="tag">${esc(COURSES[p.course])}</span>${esc(p.title)}</div>
          <div class="meta">${p.author === 'me' ? 'Dein Gesuch' : `${esc(u.name)} · ${esc(u.study)}, ${u.semester}. Sem.`} · ${fmtT(p.t)}</div></div>
        <div class="side"><b>${p.replies.length}</b> ${p.replies.length === 1 ? 'Antwort' : 'Antworten'}</div>
      </a>`;
    }).join('');
    return `<div class="stack">
      ${intro}
      <div>
        <div class="head"><div><h${db.loggedIn ? 1 : 2}>Gesuche</h${db.loggedIn ? 1 : 2}><p>Studierende, die gerade einen Lernpartner suchen.</p></div>
          <button class="btn btn-primary" data-act="new">+ Gesuch erstellen</button></div>
        <div class="box">
          <div class="list-head">
            <label class="filter"><span class="small muted">Kurs</span><select id="filter">${db.loggedIn ? opt('mine', 'Meine Kurse') : ''}${opt('all', 'Alle Kurse')}${Object.entries(COURSES).map(([k, v]) => opt(k, v)).join('')}</select></label>
            <span class="small muted">${plural(list.length, 'Gesuch', 'Gesuche')}</span>
          </div>
          ${rows || `<div class="empty"><b>Noch keine Gesuche in diesem Kurs.</b><span>Erstell das erste. Andere aus deinem Kurs sehen es sofort.</span><button class="btn btn-primary" data-act="new">Gesuch erstellen</button></div>`}
        </div>
      </div>
    </div>`;
  }

  // ---------------------------------------------------------------------------
  // Seite: einzelnes Gesuch
  // ---------------------------------------------------------------------------
  function contactButton(id) {
    if (id === 'me') return '<span class="tag good">Dein Gesuch</span>';
    if (!db.loggedIn) return '<button class="btn btn-primary" data-act="login">Anmelden und Anfrage senden</button>';
    switch (relation(id)) {
      case 'buddy': return `<button class="btn btn-primary" data-act="chat" data-id="${id}">Nachricht schreiben</button><span class="tag good">Dein Buddy</span>`;
      case 'incoming': return `<button class="btn btn-good" data-act="accept" data-id="${id}">Ihre Anfrage annehmen</button>`;
      case 'sent': return '<button class="btn" disabled>Anfrage gesendet</button>';
      default: return `<button class="btn btn-primary" data-act="ask" data-id="${id}">Anfrage senden</button>`;
    }
  }

  function authorCol(id) {
    const u = user(id);
    return `<div class="author">${av(u)}<b>${esc(u.name)}</b><span class="muted">${esc(u.study)}, ${u.semester}. Sem.</span></div>`;
  }

  function viewPost(id) {
    const p = postById(id);
    const shared = db.loggedIn && p.author !== 'me' ? user(p.author).courses.filter((c) => db.me.courses.includes(c)) : [];
    const replies = p.replies.map((r) => `<div class="post">${authorCol(r.author)}<div class="post-body"><span class="post-time">${fmtT(r.t)}</span><div class="post-text">${paragraphs(r.text)}</div></div></div>`).join('');
    return `<a class="back" href="#start">‹ Alle Gesuche</a>
      <div class="stack">
        <article class="box">
          <div class="post">${authorCol(p.author)}
            <div class="post-body">
              <div><span class="tag">${esc(COURSES[p.course])}</span><span class="post-time">${fmtT(p.t)}</span></div>
              <h1>${esc(p.title)}</h1>
              <div class="post-text">${paragraphs(p.text)}</div>
              <dl class="facts"><dt>Kurs</dt><dd>${esc(COURSES[p.course])}</dd><dt>Wann</dt><dd>${esc(p.when)}</dd><dt>Wo</dt><dd>${PLACES[p.where]}</dd></dl>
              ${shared.length ? `<p class="common">✓ Ihr seid beide in ${shared.map((c) => esc(COURSES[c])).join(' und ')}.</p>` : ''}
              <div class="btn-row">${contactButton(p.author)}</div>
            </div>
          </div>
          ${replies}
        </article>
        ${db.loggedIn ? `<form class="box box-pad" id="reply-form">
            <div class="field"><label for="reply">Antworten</label><textarea id="reply" placeholder="Öffentliche Antwort an alle. Für Persönliches nutze lieber „Anfrage senden“."></textarea></div>
            <p class="error" id="reply-error" hidden>Deine Antwort ist noch leer.</p>
            <div class="btn-row" style="justify-content:flex-end"><button class="btn btn-primary">Antwort senden</button></div>
          </form>` : ''}
      </div>`;
  }

  // ---------------------------------------------------------------------------
  // Seite: Gesuch erstellen
  // ---------------------------------------------------------------------------
  function viewNew() {
    if (!db.loggedIn) return loginBox('Um ein Gesuch zu erstellen, brauchst du ein Konto.');
    const me = db.me;
    const courses = me.courses.length ? me.courses : Object.keys(COURSES);
    return `<a class="back" href="#start">‹ Alle Gesuche</a>
      <div class="head"><div><h1>Gesuch erstellen</h1><p>Sag kurz, wofür du einen Lernpartner suchst.</p></div></div>
      <form class="box box-pad" id="new-form" novalidate>
        <div class="grid2">
          <div class="field"><label for="n-course">Kurs</label><select id="n-course">${courses.map((c) => `<option value="${c}">${esc(COURSES[c])}</option>`).join('')}</select></div>
          <div class="field"><label for="n-where">Wo</label><select id="n-where">${Object.entries(PLACES).map(([k, v]) => `<option value="${k}" ${me.where === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label for="n-title">Titel</label><input class="input" id="n-title" maxlength="80" placeholder="z. B. Suche Lernpartner für Statistik II"></div>
        <div class="field"><label for="n-when">Wann hast du Zeit?</label><input class="input" id="n-when" maxlength="60" value="${esc(me.when)}" placeholder="z. B. Di + Do nachmittags"></div>
        <div class="field"><label for="n-text">Beschreibung</label><textarea id="n-text" placeholder="Wie lernst du gern? Was ist dir wichtig?"></textarea></div>
        <p class="error" id="n-error" hidden></p>
        <div class="btn-row" style="justify-content:flex-end"><a class="btn" href="#start">Abbrechen</a><button class="btn btn-primary">Gesuch veröffentlichen</button></div>
      </form>`;
  }

  // ---------------------------------------------------------------------------
  // Seite: Nachrichten
  // ---------------------------------------------------------------------------
  function viewMessages() {
    if (!db.loggedIn) return `<div class="head"><h1>Nachrichten</h1></div>` + loginBox('Hier siehst du Anfragen und schreibst mit deinen Buddies.');
    const tabs = `<div class="tabs" role="tablist">
      <button role="tab" aria-selected="${ui.tab === 'anfragen'}" data-act="tab" data-id="anfragen">Anfragen${db.requestsIn.length ? ` <span class="badge">${db.requestsIn.length}</span>` : ''}</button>
      <button role="tab" aria-selected="${ui.tab === 'buddies'}" data-act="tab" data-id="buddies">Buddies${db.unread.length ? ` <span class="badge">${db.unread.length}</span>` : ''}</button>
    </div>`;
    let body;
    if (ui.tab === 'anfragen') {
      const sent = Object.keys(db.requestsOut);
      body = (db.requestsIn.length ? db.requestsIn.map((r) => {
        const u = user(r.id);
        return `<div class="request">${av(u)}<div>
          <b>${esc(u.name)}</b> <span class="small muted">· ${esc(u.study)}, ${u.semester}. Sem. · ${fmtT(r.t)}</span>
          <blockquote>${esc(r.text)}</blockquote>
          <div class="btn-row"><button class="btn btn-good btn-sm" data-act="accept" data-id="${u.id}">Annehmen</button><button class="btn btn-sm" data-act="decline" data-id="${u.id}">Ablehnen</button></div>
        </div></div>`;
      }).join('') : '<div class="empty"><b>Keine neuen Anfragen.</b><span>Schau bei den Gesuchen, ob jemand zu dir passt.</span><a class="btn" href="#start">Zu den Gesuchen</a></div>')
      + (sent.length ? `<div class="list-head" style="border-top:1px solid var(--line)"><span class="small muted">Von dir gesendet</span></div>${sent.map((id) => { const u = user(id); return `<div class="row">${av(u, 'sm')}<div><b>${esc(u.name)}</b><div class="meta">wartet auf Antwort</div></div><div class="side"><button class="btn btn-sm" data-act="withdraw" data-id="${id}">Zurückziehen</button></div></div>`; }).join('')}` : '');
    } else if (ui.chat) {
      const u = user(ui.chat), msgs = db.chats[ui.chat] || [];
      body = `<div class="list-head"><button class="btn btn-sm" data-act="chat-back">‹ Zurück</button><b>${esc(u.name)}</b><span class="small muted">${u.online ? 'online' : 'offline'}</span></div>
        <div class="chat" id="chat">${msgs.map((m) => `<div class="bubble ${m.me ? 'me' : ''}">${esc(m.text)}<small>${fmtT(m.t)}</small></div>`).join('') || '<p class="muted small">Schreibt euch und macht einen Termin aus.</p>'}</div>
        <form class="chat-form" id="chat-form"><label class="sr-only" for="msg">Nachricht</label><input class="input" id="msg" placeholder="Nachricht an ${esc(first(u.name))}" autocomplete="off"><button class="btn btn-primary">Senden</button></form>`;
    } else {
      body = db.buddies.length ? db.buddies.map((id) => {
        const u = user(id), last = (db.chats[id] || []).slice(-1)[0];
        return `<button class="row" style="width:100%;background:none;border:0;border-top:1px solid var(--line-soft);text-align:left" data-act="chat" data-id="${id}">
          ${av(u)}<div><b>${db.unread.includes(id) ? '<span class="unread" aria-label="ungelesen"></span>' : ''}${esc(u.name)}</b><div class="meta">${last ? `${last.me ? 'Du: ' : ''}${esc(last.text)}` : 'Noch keine Nachrichten'}</div></div>
          <div class="side">${last ? fmtT(last.t) : ''}</div></button>`;
      }).join('') : '<div class="empty"><b>Noch keine Buddies.</b><span>Sobald jemand deine Anfrage annimmt, könnt ihr hier schreiben.</span></div>';
    }
    return `<div class="head"><div><h1>Nachrichten</h1><p>Anfragen beantworten und mit deinen Buddies schreiben.</p></div></div>
      <div class="box">${tabs}${body}</div>`;
  }

  // ---------------------------------------------------------------------------
  // Seite: Profil
  // ---------------------------------------------------------------------------
  function viewProfile() {
    if (!db.loggedIn) return loginBox('Hier bearbeitest du dein Profil.');
    const me = db.me;
    return `<div class="head"><div><h1>Mein Profil</h1><p>Das sehen andere, wenn du ihnen eine Anfrage schickst.</p></div></div>
      <div class="stack">
        <form class="box box-pad" id="profile-form">
          <div class="grid2">
            <div class="field"><label for="p-name">Name</label><input class="input" id="p-name" value="${esc(me.name)}" autocomplete="name"></div>
            <div class="field"><label for="p-study">Studiengang</label><select id="p-study">${STUDIES.map((s) => `<option ${me.study === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
            <div class="field"><label for="p-sem">Semester</label><select id="p-sem">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${me.semester === i + 1 ? 'selected' : ''}>${i + 1}. Semester</option>`).join('')}</select></div>
            <div class="field"><label for="p-where">Wo lernst du am liebsten?</label><select id="p-where">${Object.entries(PLACES).map(([k, v]) => `<option value="${k}" ${me.where === k ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
          </div>
          <div class="field"><span class="field-label">Meine Kurse</span><div class="checks">${Object.entries(COURSES).map(([k, v]) => `<label class="check"><input type="checkbox" name="p-course" value="${k}" ${me.courses.includes(k) ? 'checked' : ''}>${esc(v)}</label>`).join('')}</div></div>
          <div class="field"><label for="p-when">Wann hast du Zeit?</label><input class="input" id="p-when" value="${esc(me.when)}" maxlength="60" placeholder="z. B. Di + Do nachmittags"></div>
          <div class="field"><label for="p-bio">Über mich</label><textarea id="p-bio" maxlength="300">${esc(me.bio)}</textarea></div>
          <div class="btn-row" style="justify-content:flex-end"><button class="btn btn-primary">Speichern</button></div>
        </form>
        <div class="btn-row" style="justify-content:space-between">
          <button class="btn" data-act="logout">Abmelden</button>
          <button class="btn" data-act="reset">Beispieldaten zurücksetzen</button>
        </div>
      </div>`;
  }

  // ---------------------------------------------------------------------------
  // Dialoge
  // ---------------------------------------------------------------------------
  let lastFocus = null;
  function openModal(head, body, foot, formId) {
    const o = $('#overlay');
    if (o.hidden) lastFocus = document.activeElement;
    const inner = `<div class="modal-head"><h2>${head}</h2><button type="button" data-act="close" aria-label="Schließen">×</button></div><div class="modal-body">${body}</div><div class="modal-foot">${foot}</div>`;
    o.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(head)}"><form id="${formId}" novalidate>${inner}</form></div>`;
    o.hidden = false;
    const f = o.querySelector('.modal-body input, .modal-body textarea, .modal-body select, .btn-primary');
    if (f) f.focus();
  }
  function closeModal(silent) {
    const o = $('#overlay');
    if (o.hidden) return;
    o.hidden = true; o.innerHTML = '';
    if (!silent && lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function modalLogin() {
    openModal('Anmelden', `
      <div class="field"><label for="l-mail">Uni-Mail</label><input class="input" id="l-mail" type="email" placeholder="vorname.nachname@uni.de" autocomplete="username"></div>
      <div class="field"><label for="l-pw">Passwort</label><input class="input" id="l-pw" type="password" autocomplete="current-password"></div>
      <p class="hint">Prototyp: Es wird nichts geprüft. Du wirst mit dem Demo-Konto von Lena Meier angemeldet.</p>`,
    `<button type="button" class="btn" data-act="register">Neu hier? Registrieren</button><button class="btn btn-primary">Anmelden</button>`, 'login-form');
  }

  function modalRegister() {
    openModal('Registrieren', `
      <div class="field"><label for="r-name">Name</label><input class="input" id="r-name" autocomplete="name" placeholder="Vor- und Nachname"></div>
      <div class="grid2">
        <div class="field"><label for="r-study">Studiengang</label><select id="r-study">${STUDIES.map((s) => `<option>${esc(s)}</option>`).join('')}</select></div>
        <div class="field"><label for="r-sem">Semester</label><select id="r-sem">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}">${i + 1}. Semester</option>`).join('')}</select></div>
      </div>
      <div class="field"><span class="field-label">Welche Kurse belegst du?</span><div class="checks">${Object.entries(COURSES).map(([k, v]) => `<label class="check"><input type="checkbox" name="r-course" value="${k}">${esc(v)}</label>`).join('')}</div></div>
      <p class="error" id="r-error" role="alert" hidden></p>`,
    `<button type="button" class="btn" data-act="close">Abbrechen</button><button class="btn btn-primary">Konto erstellen</button>`, 'register-form');
  }

  function modalAsk(id) {
    const u = user(id);
    const shared = u.courses.filter((c) => db.me.courses.includes(c));
    const text = `Hi ${first(u.name)}! ${shared.length ? `Ich bin auch in ${COURSES[shared[0]]}. ` : ''}Hast du Lust, zusammen zu lernen?`;
    openModal(`Anfrage an ${esc(first(u.name))}`, `
      <div class="field"><label for="a-text">Deine Nachricht</label><textarea id="a-text" maxlength="300">${esc(text)}</textarea>
        <span class="hint">Tipp: Schlag gleich einen Tag und Ort vor. Trefft euch beim ersten Mal an einem öffentlichen Ort.</span></div>`,
    `<button type="button" class="btn" data-act="close">Abbrechen</button><button class="btn btn-primary">Anfrage senden</button>`, 'ask-form');
    $('#ask-form').dataset.id = id;
  }

  // ---------------------------------------------------------------------------
  // Rendern
  // ---------------------------------------------------------------------------
  function render() {
    renderNav();
    const views = { start: viewStart, gesuch: () => viewPost(ui.param), neu: viewNew, nachrichten: viewMessages, profil: viewProfile };
    $('#view').innerHTML = views[ui.route]();
    const titles = { start: '', gesuch: postById(ui.param)?.title, neu: 'Gesuch erstellen', nachrichten: 'Nachrichten', profil: 'Mein Profil' };
    document.title = titles[ui.route] ? `${titles[ui.route]} · Study Buddy` : 'Study Buddy';
    const c = $('#chat'); if (c) c.scrollTop = c.scrollHeight;
    save();
  }

  // Simulierte Reaktionen, damit der Ablauf in der Demo sichtbar wird
  function simulateAccept(id) {
    if (!user(id).online) return;
    setTimeout(() => {
      if (!db.requestsOut[id]) return;
      delete db.requestsOut[id];
      db.buddies.push(id);
      db.chats[id] = [{ me: false, t: now(), text: `Hi ${first(db.me.name)}, gerne! Wann passt es dir?` }];
      if (!db.unread.includes(id)) db.unread.push(id);
      render();
      toast(`${first(user(id).name)} hat deine Anfrage angenommen`, { label: 'Nachricht lesen', fn: () => openChat(id) });
    }, 5000);
  }
  function simulateReply(id) {
    if (!user(id).online) return;
    setTimeout(() => {
      db.chats[id].push({ me: false, t: now(), text: 'Passt mir gut, bis dann!' });
      const viewing = ui.route === 'nachrichten' && ui.chat === id;
      if (!viewing && !db.unread.includes(id)) db.unread.push(id);
      render();
      if (viewing) $('#msg')?.focus();
    }, 4000);
  }
  function openChat(id) {
    db.unread = db.unread.filter((x) => x !== id);
    if (ui.route !== 'nachrichten') { ui.pendingChat = id; location.hash = 'nachrichten'; return; }
    ui.tab = 'buddies'; ui.chat = id; render();
    $('#msg')?.focus();
  }
  const needLogin = () => { if (db.loggedIn) return false; modalLogin(); return true; };

  // ---------------------------------------------------------------------------
  // Ereignisse
  // ---------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    if (e.target.id === 'overlay') return closeModal();
    const t = e.target.closest('[data-act]');
    if (!t) return;
    const id = t.dataset.id;
    switch (t.dataset.act) {
      case 'close': return closeModal();
      case 'login': return modalLogin();
      case 'register': return modalRegister();
      case 'demo': db.loggedIn = true; ui.filter = null; render(); return toast('Angemeldet mit dem Demo-Konto von Lena');
      case 'logout': db.loggedIn = false; ui.filter = null; go('#start'); return toast('Du bist abgemeldet');
      case 'reset': db = { ...seed(), loggedIn: true }; ui.filter = null; render(); return toast('Beispieldaten zurückgesetzt');
      case 'new': if (needLogin()) return; return go('#neu');
      case 'ask': return modalAsk(id);
      case 'accept': case 'decline': {
        const idx = db.requestsIn.findIndex((r) => r.id === id), req = db.requestsIn[idx];
        db.requestsIn.splice(idx, 1);
        const acc = t.dataset.act === 'accept';
        if (acc) { db.buddies.push(id); db.chats[id] = db.chats[id] || [{ me: false, t: req.t, text: req.text }]; }
        render();
        return acc
          ? toast(`${first(user(id).name)} ist jetzt dein Buddy`, { label: 'Nachricht schreiben', fn: () => openChat(id) })
          : toast('Anfrage abgelehnt', { label: 'Rückgängig', fn: () => { db.requestsIn.splice(idx, 0, req); render(); } });
      }
      case 'withdraw': delete db.requestsOut[id]; render(); return toast('Anfrage zurückgezogen');
      case 'tab': ui.tab = id; ui.chat = null; return render();
      case 'chat': return openChat(id);
      case 'chat-back': ui.chat = null; return render();
    }
  });

  document.addEventListener('change', (e) => {
    if (e.target.id === 'filter') { ui.filter = e.target.value; render(); $('#filter').focus(); }
  });

  document.addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.target, v = (s) => $(s).value.trim();
    switch (f.id) {
      case 'login-form': closeModal(true); db.loggedIn = true; ui.filter = null; render(); return toast('Willkommen zurück, Lena!');
      case 'register-form': {
        const courses = $$('input[name="r-course"]:checked').map((i) => i.value);
        const err = !v('#r-name') ? 'Bitte gib deinen Namen ein.' : !courses.length ? 'Wähle mindestens einen Kurs aus.' : '';
        if (err) { const p = $('#r-error'); p.textContent = err; p.hidden = false; return; }
        db = { ...seed(), loggedIn: true, me: { name: v('#r-name'), study: $('#r-study').value, semester: +$('#r-sem').value, courses, when: '', where: 'egal', bio: '' }, requestsIn: [], buddies: [], chats: {} };
        closeModal(true); ui.filter = 'mine'; go('#start');
        return toast(`Willkommen, ${first(db.me.name)}! Hier sind Gesuche aus deinen Kursen.`);
      }
      case 'ask-form': {
        const id = f.dataset.id, text = v('#a-text');
        if (!text) return $('#a-text').focus();
        db.requestsOut[id] = { t: now(), text };
        closeModal(true); render();
        toast(`Anfrage an ${first(user(id).name)} gesendet`);
        return simulateAccept(id);
      }
      case 'reply-form': {
        const text = v('#reply');
        if (!text) { $('#reply-error').hidden = false; return $('#reply').focus(); }
        postById(ui.param).replies.push({ author: 'me', t: now(), text });
        render();
        return toast('Antwort veröffentlicht');
      }
      case 'new-form': {
        const err = v('#n-title').length < 6 ? 'Bitte gib einen Titel ein, z. B. „Suche Lernpartner für Statistik II“.' : !v('#n-when') ? 'Bitte gib an, wann du Zeit hast.' : '';
        if (err) { const p = $('#n-error'); p.textContent = err; p.hidden = false; return; }
        const p = { id: db.nextId++, course: $('#n-course').value, author: 'me', t: now(), title: v('#n-title'), when: v('#n-when'), where: $('#n-where').value, text: v('#n-text') || 'Meldet euch gern!', replies: [] };
        db.posts.push(p);
        go(`#gesuch-${p.id}`);
        return toast('Dein Gesuch ist online');
      }
      case 'chat-form': {
        const text = v('#msg');
        if (!text) return;
        db.chats[ui.chat].push({ me: true, t: now(), text });
        render(); $('#msg').focus();
        return simulateReply(ui.chat);
      }
      case 'profile-form': {
        const courses = $$('input[name="p-course"]:checked').map((i) => i.value);
        Object.assign(db.me, { name: v('#p-name') || db.me.name, study: $('#p-study').value, semester: +$('#p-sem').value, where: $('#p-where').value, when: v('#p-when'), bio: v('#p-bio'), courses });
        render();
        return toast('Profil gespeichert');
      }
    }
  });

  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !$('#overlay').hidden) closeModal(); });
  window.addEventListener('hashchange', route);
  route();
})();
