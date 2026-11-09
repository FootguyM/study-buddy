/* Study Buddy – Prototyp
   Reines HTML/CSS/JS ohne Backend. Alle Personen und Termine sind Beispieldaten.
   Eingaben werden nur im Browser (localStorage) gespeichert. */
(() => {
  'use strict';

  // ---------------------------------------------------------------------------
  // Stammdaten
  // ---------------------------------------------------------------------------
  const COURSES = {
    STAT2: { name: 'Statistik II', code: 'WIWI-B-05', exam: '2027-02-03' },
    MIKRO: { name: 'Mikroökonomie I', code: 'WIWI-B-02', exam: '2027-02-10' },
    KLR:   { name: 'Kosten- und Leistungsrechnung', code: 'BWL-B-07', exam: '2027-02-17' },
    MAKRO: { name: 'Makroökonomie I', code: 'WIWI-B-03', exam: '2027-02-19' },
    MARK:  { name: 'Marketing Grundlagen', code: 'BWL-B-09', exam: '2027-02-05' },
    LINA:  { name: 'Lineare Algebra', code: 'MATH-B-01', exam: '2027-02-08' },
    PROG:  { name: 'Programmierung I', code: 'INF-B-01', exam: '2027-02-15' },
    PSY:   { name: 'Einführung in die Psychologie', code: 'PSY-B-01', exam: '2027-02-12' },
  };
  const STUDIES = ['BWL (B.Sc.)', 'VWL (B.Sc.)', 'Wirtschaftsinformatik (B.Sc.)', 'Wirtschaftsmathematik (B.Sc.)', 'Psychologie (B.Sc.)', 'Anderer Studiengang'];
  const STYLES = { ruhig: 'Ruhig & konzentriert', diskussion: 'Erklären & diskutieren', abfragen: 'Gegenseitig abfragen' };
  const PLACES = { bib: 'Bibliothek', online: 'Online', cafe: 'Café / Mensa', campus: 'Lernraum Campus' };
  const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const TIMES = { v: 'Vormittag', n: 'Nachmittag', a: 'Abend' };
  const KUDOS = { puenktlich: 'Pünktlich', erklaert: 'Erklärt gut', motiviert: 'Motiviert', vorbereitet: 'Gut vorbereitet' };

  const PEOPLE = [
    { id: 'jonas', name: 'Jonas Weber', av: 'av1', study: 'BWL (B.Sc.)', semester: 3, courses: ['STAT2', 'MIKRO', 'MARK'], style: 'diskussion', places: ['bib', 'cafe'], avail: ['Mo-n', 'Di-n', 'Mi-a', 'Do-n'], online: true, bio: 'Erkläre gern Sachen laut, dann verstehe ich sie selbst besser. Kaffee geht auf mich.', kudos: { puenktlich: 4, erklaert: 7 } },
    { id: 'aylin', name: 'Aylin Demir', av: 'av2', study: 'VWL (B.Sc.)', semester: 3, courses: ['STAT2', 'MIKRO', 'MAKRO'], style: 'ruhig', places: ['bib', 'online'], avail: ['Di-v', 'Di-n', 'Fr-v', 'Sa-v'], online: true, bio: 'Pomodoro-Fan: 50 Minuten lernen, 10 Minuten Pause, dazwischen kurz Fragen klären.', kudos: { vorbereitet: 6, puenktlich: 5 } },
    { id: 'mehmet', name: 'Mehmet Yilmaz', av: 'av4', study: 'BWL (B.Sc.)', semester: 3, courses: ['STAT2', 'KLR'], style: 'ruhig', places: ['bib'], avail: ['Mo-n', 'Do-n', 'Fr-v'], online: false, bio: 'Suche jemanden für feste Termine bis zur Klausur. Habe alle Altklausuren seit 2022.', kudos: { vorbereitet: 3 } },
    { id: 'clara', name: 'Clara Hoffmann', av: 'av3', study: 'Psychologie (B.Sc.)', semester: 1, courses: ['PSY', 'STAT2'], style: 'abfragen', places: ['online', 'cafe'], avail: ['Mi-n', 'Do-a', 'Sa-n'], online: true, bio: 'Erstes Semester, Statistik ist für mich noch neu. Ich frage gern mit Karteikarten ab.', kudos: { motiviert: 2 } },
    { id: 'paul', name: 'Paul Schneider', av: 'av2', study: 'Wirtschaftsinformatik (B.Sc.)', semester: 1, courses: ['PROG', 'LINA', 'KLR'], style: 'abfragen', places: ['online', 'campus'], avail: ['Di-a', 'Mi-a', 'Do-a'], online: false, bio: 'Abends am produktivsten. Gern per Videocall mit geteiltem Bildschirm.', kudos: { erklaert: 2, motiviert: 3 } },
    { id: 'mia', name: 'Mia Schulz', av: 'av1', study: 'Wirtschaftsmathematik (B.Sc.)', semester: 3, courses: ['LINA', 'STAT2', 'PROG'], style: 'diskussion', places: ['online', 'bib'], avail: ['Mo-v', 'Di-n', 'Fr-v'], online: true, bio: 'Suche einen Tausch: Ich erkläre Statistik, du hilfst mir bei Java.', kudos: { erklaert: 9, vorbereitet: 4 } },
    { id: 'noah', name: 'Noah Becker', av: 'av4', study: 'VWL (B.Sc.)', semester: 5, courses: ['MAKRO', 'MIKRO'], style: 'ruhig', places: ['bib', 'campus'], avail: ['Mo-v', 'Mi-v', 'Fr-v'], online: false, bio: 'Wiederhole Mikro zur Notenverbesserung und kenne die typischen Fallen.', kudos: { puenktlich: 6 } },
    { id: 'sophie', name: 'Sophie Krüger', av: 'av3', study: 'BWL (B.Sc.)', semester: 5, courses: ['KLR', 'MARK'], style: 'diskussion', places: ['cafe', 'campus'], avail: ['Di-n', 'Do-v'], online: false, bio: 'War letztes Jahr Tutorin in KLR. Lerne gern in der Mensa nach dem Mittagessen.', kudos: { erklaert: 11, puenktlich: 3 } },
  ];

  const isoIn = (days) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + days); return toIso(d); };
  function toIso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

  const demoProfile = () => ({
    name: 'Lena Meier', study: 'BWL (B.Sc.)', semester: 3,
    courses: ['STAT2', 'MIKRO', 'KLR'], style: 'ruhig', places: ['bib', 'online'],
    avail: ['Mo-n', 'Di-v', 'Di-n', 'Do-n', 'Fr-v'],
    bio: 'Ich lerne am liebsten vormittags in der Bib und suche jemanden, der bei Statistik dranbleibt.',
  });

  const seedState = () => ({
    me: demoProfile(),
    sent: { aylin: { text: 'Hi Aylin, hast du Lust, dienstags vormittags zusammen Statistik zu machen?' } },
    incoming: [
      { id: 'mehmet', text: 'Hi! Wir sitzen beide in Statistik II. Hast du Lust, donnerstags nach der Vorlesung zusammen die Übungsblätter zu machen?' },
      { id: 'clara', text: 'Hallo! Ich bin im ersten Semester und suche jemanden, der mit mir Statistik-Karteikarten durchgeht.' },
    ],
    buddies: ['sophie'],
    chats: {
      sophie: [
        { me: false, text: 'Hey, steht Freitag 10 Uhr in der Mensa?' },
        { me: true, text: 'Ja! Ich bringe die Zusammenfassung zu Kapitel 4 mit.' },
        { me: false, text: 'Super, dann machen wir danach die Deckungsbeitragsrechnung.' },
      ],
    },
    extraKudos: {},
    sessions: [
      { id: 's1', course: 'STAT2', title: 'Altklausuren WiSe 25/26 durchrechnen', date: isoIn(3), from: '14:00', to: '16:00', place: 'Bibliothek, Gruppenraum 2.04', host: 'aylin', seats: 5, taken: 2, joined: false },
      { id: 's2', course: 'MIKRO', title: 'Übungsblatt 5: Haushaltsoptimum', date: isoIn(2), from: '18:00', to: '19:30', place: 'Online (Link nach Beitritt)', host: 'jonas', seats: 4, taken: 3, joined: false },
      { id: 's3', course: 'KLR', title: 'Karteikarten abfragen, Kapitel 3 bis 5', date: isoIn(4), from: '10:00', to: '11:30', place: 'Mensa, hinterer Bereich', host: 'sophie', seats: 3, taken: 2, joined: true },
      { id: 's4', course: 'LINA', title: 'Eigenwerte gemeinsam verstehen', date: isoIn(1), from: '16:00', to: '18:00', place: 'Lernraum Campus, R 112', host: 'mia', seats: 4, taken: 4, joined: false },
      { id: 's5', course: 'PSY', title: 'Lernpsychologie: Begriffe abfragen', date: isoIn(5), from: '17:00', to: '18:00', place: 'Online (Link nach Beitritt)', host: 'clara', seats: 4, taken: 1, joined: false },
    ],
  });

  // ---------------------------------------------------------------------------
  // Speicherung (nur im Browser)
  // ---------------------------------------------------------------------------
  const KEY = 'studybuddy:v2';
  function load() {
    try { const raw = localStorage.getItem(KEY); if (raw) return JSON.parse(raw); } catch (e) { /* ignorieren */ }
    return null;
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* ignorieren */ }
  }
  let db = load() || seedState();

  // Ansichtszustand, wird nicht gespeichert
  const ui = {
    route: 'start', q: '', course: 'mine', style: '', place: '', sort: 'match', onlyOnline: false,
    sessionTab: 'all', reqTab: db.incoming.length ? 'in' : 'buddies', confirmReset: false,
  };

  // ---------------------------------------------------------------------------
  // Hilfsfunktionen
  // ---------------------------------------------------------------------------
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const initials = (n) => (n || '?').trim().split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  const person = (id) => PEOPLE.find((p) => p.id === id);
  const firstName = (n) => (n || '').trim().split(/\s+/)[0] || 'du';
  const slotLabel = (s) => { const [d, t] = s.split('-'); return `${d} ${TIMES[t]}`; };
  const courseName = (c) => COURSES[c]?.name || c;
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

  function daysUntil(iso) {
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return Math.round((new Date(iso + 'T00:00:00') - t) / 86400000);
  }
  const fmtDate = (iso, opts) => new Date(iso + 'T00:00:00').toLocaleDateString('de-DE', opts);

  function avatar(p, size = '') {
    return `<span class="avatar ${size} ${p.av}">${initials(p.name)}${p.online ? '<span class="online" title="Gerade online"></span>' : ''}</span>`;
  }
  const myAvatar = (size = '') => `<span class="avatar ${size} av3">${initials(db.me.name)}</span>`;

  function kudosOf(p) {
    const k = { ...p.kudos };
    Object.entries(db.extraKudos[p.id] || {}).forEach(([key, n]) => { k[key] = (k[key] || 0) + n; });
    return k;
  }

  // Passung: gemeinsame Kurse zählen am meisten, danach Zeiten, Lernstil, Orte.
  function matchInfo(p) {
    const me = db.me;
    const shared = p.courses.filter((c) => me.courses.includes(c));
    const sharedPlaces = p.places.filter((x) => me.places.includes(x));
    const sharedSlots = p.avail.filter((s) => me.avail.includes(s));
    let score = 20;
    score += Math.min(shared.length * 22, 44);
    if (p.style === me.style) score += 14;
    score += Math.min(sharedPlaces.length * 6, 10);
    score += Math.min(sharedSlots.length * 5, 15);
    if (p.semester === me.semester) score += 4;
    if (!shared.length) score = Math.min(score, 45);
    score = Math.max(10, Math.min(98, score));

    const reasons = [];
    if (shared.length) reasons.push(`Ihr belegt beide ${shared.map(courseName).join(' und ')}.`);
    if (sharedSlots.length) reasons.push(`Ihr habt gleichzeitig Zeit: ${sharedSlots.map(slotLabel).join(', ')}.`);
    if (p.style === me.style) reasons.push(`Gleicher Lernstil: ${STYLES[p.style]}.`);
    if (sharedPlaces.length) reasons.push(`Ihr lernt beide gern hier: ${sharedPlaces.map((x) => PLACES[x]).join(', ')}.`);
    if (p.semester === me.semester) reasons.push(`Ihr seid beide im ${p.semester}. Semester.`);
    return { score, shared, sharedSlots, reasons };
  }
  const matchClass = (s) => (s >= 75 ? '' : s >= 50 ? 'mid' : 'low');

  function profileChecks() {
    const me = db.me;
    return [
      { ok: !!me.name.trim() && !!me.study, label: 'Name und Studiengang' },
      { ok: me.courses.length > 0, label: 'Mindestens ein Kurs' },
      { ok: me.avail.length >= 3, label: 'Mindestens 3 freie Zeiten' },
      { ok: !!me.style && me.places.length > 0, label: 'Lernstil und Lernorte' },
      { ok: me.bio.trim().length >= 20, label: 'Kurzer Text über dich' },
    ];
  }
  const completeness = () => { const c = profileChecks(); return Math.round((c.filter((x) => x.ok).length / c.length) * 100); };

  // Toast mit optionaler Aktion (z. B. Rückgängig)
  let toastTimer;
  function toast(msg, action) {
    const t = $('#toast');
    t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ''}`;
    t.classList.toggle('no-action', !action);
    t.hidden = false;
    if (action) t.querySelector('button').onclick = () => { t.hidden = true; action.fn(); };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, action ? 6000 : 3000);
  }

  // ---------------------------------------------------------------------------
  // Routing
  // ---------------------------------------------------------------------------
  const ROUTES = [
    { id: 'finden', label: 'Buddy finden', short: 'Finden', icon: 'compass' },
    { id: 'sessions', label: 'Lernsessions', short: 'Sessions', icon: 'cal' },
    { id: 'anfragen', label: 'Anfragen & Buddies', short: 'Buddies', icon: 'users' },
    { id: 'profil', label: 'Mein Profil', short: 'Profil', icon: 'user' },
  ];
  const LANDING_ANCHORS = ['so-gehts', 'funktionen', 'faq'];

  function route() {
    const h = location.hash.replace('#', '');
    const isApp = ROUTES.some((r) => r.id === h);
    $('#landing').hidden = isApp;
    $('#app').hidden = !isApp;
    $('#tab-nav').hidden = !isApp;
    document.title = isApp ? `${ROUTES.find((r) => r.id === h).label} · Study Buddy` : 'Study Buddy';
    if (isApp) {
      ui.route = h;
      ui.confirmReset = false;
      render();
      window.scrollTo(0, 0);
    } else {
      ui.route = 'start';
      if (LANDING_ANCHORS.includes(h)) document.getElementById(h)?.scrollIntoView();
      else window.scrollTo(0, 0);
    }
  }

  // ---------------------------------------------------------------------------
  // Rahmen: Navigation und Profil-Chip
  // ---------------------------------------------------------------------------
  function renderChrome() {
    const n = db.incoming.length;
    $('#side-nav').innerHTML = `<span class="label nav-title">Menü</span>` + ROUTES.map((r) => `<a href="#${r.id}" ${ui.route === r.id ? 'aria-current="page"' : ''}>${icon(r.icon)}<span>${r.label}</span>${r.id === 'anfragen' && n ? `<span class="badge" aria-label="${n} neue Anfragen">${n}</span>` : ''}</a>`).join('');
    $('#tab-nav').innerHTML = ROUTES.map((r) => `<a href="#${r.id}" ${ui.route === r.id ? 'aria-current="page"' : ''}>${icon(r.icon)}${r.short}${r.id === 'anfragen' && n ? `<span class="dot" aria-label="${n} neue Anfragen"></span>` : ''}</a>`).join('');
    $('#me-chip').innerHTML = `${myAvatar('sm')}<span class="me-name small"><b>${esc(db.me.name || 'Mein Profil')}</b></span>`;
    $('#me-chip').setAttribute('aria-label', 'Mein Profil');
  }

  const pageHead = (title, text, action = '') => `
    <header class="page-head">
      <div><h1>${title}</h1><p>${text}</p></div>
      ${action}
    </header>`;

  // ---------------------------------------------------------------------------
  // Seite: Buddy finden
  // ---------------------------------------------------------------------------
  function candidates() {
    const q = ui.q.trim().toLowerCase();
    const me = db.me;
    let list = PEOPLE
      .filter((p) => !db.buddies.includes(p.id) && !db.incoming.some((r) => r.id === p.id))
      .filter((p) => ui.course === 'all' ? true : ui.course === 'mine' ? p.courses.some((c) => me.courses.includes(c)) : p.courses.includes(ui.course))
      .filter((p) => !ui.style || p.style === ui.style)
      .filter((p) => !ui.place || p.places.includes(ui.place))
      .filter((p) => !ui.onlyOnline || p.online)
      .filter((p) => !q || p.name.toLowerCase().includes(q) || p.study.toLowerCase().includes(q) || p.courses.some((c) => courseName(c).toLowerCase().includes(q)))
      .map((p) => ({ p, m: matchInfo(p) }));
    const sorters = {
      match: (a, b) => b.m.score - a.m.score,
      time: (a, b) => b.m.sharedSlots.length - a.m.sharedSlots.length || b.m.score - a.m.score,
      semester: (a, b) => Math.abs(a.p.semester - me.semester) - Math.abs(b.p.semester - me.semester) || b.m.score - a.m.score,
    };
    return list.sort(sorters[ui.sort]);
  }

  function personCard({ p, m }) {
    const sent = !!db.sent[p.id];
    const other = p.courses.filter((c) => !m.shared.includes(c));
    return `
      <article class="card">
        <div class="card-head">
          ${avatar(p)}
          <div class="who">
            <h3>${esc(p.name)}</h3>
            <p class="small muted">${esc(p.study)} · ${p.semester}. Sem.</p>
          </div>
          <div class="match ${matchClass(m.score)}" title="Übereinstimmung mit deinem Profil"><b>${m.score}%</b><small>Match</small></div>
        </div>
        <div class="tags">${m.shared.map((c) => `<span class="tag">${esc(courseName(c))}</span>`).join('')}${other.map((c) => `<span class="tag plain">${esc(courseName(c))}</span>`).join('')}</div>
        <div class="facts">
          <div>${icon('bulb')}<span>${STYLES[p.style]}</span></div>
          <div>${icon('pin')}<span>${p.places.map((x) => PLACES[x]).join(', ')}</span></div>
          <div>${icon('clock')}<span>${m.sharedSlots.length ? `Gemeinsam frei: ${m.sharedSlots.map(slotLabel).join(', ')}` : '<span class="muted">Keine gemeinsamen freien Zeiten</span>'}</span></div>
        </div>
        <div class="card-actions">
          <button class="btn btn-ghost" data-act="view" data-id="${p.id}">Profil ansehen</button>
          ${sent ? `<button class="btn btn-good" disabled>${icon('check')}Angefragt</button>` : `<button class="btn btn-primary" data-act="ask" data-id="${p.id}">${icon('send')}Anfragen</button>`}
        </div>
      </article>`;
  }

  function examsWidget() {
    const exams = db.me.courses.map((c) => ({ c, days: daysUntil(COURSES[c].exam) })).filter((e) => e.days >= 0).sort((a, b) => a.days - b.days);
    return `
      <section class="widget" aria-labelledby="w-exams">
        <div class="widget-head"><h3 id="w-exams">Klausur-Countdown</h3><span class="label">Deine Kurse</span></div>
        ${exams.length ? exams.map(({ c, days }) => `
          <div class="exam ${days <= 60 ? 'soon' : ''}">
            <div class="days"><b>${days}</b><small>${days === 1 ? 'Tag' : 'Tage'}</small></div>
            <div><b class="small">${esc(courseName(c))}</b><p class="small muted">${fmtDate(COURSES[c].exam, { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}</p></div>
          </div>`).join('') : '<p class="small muted">Trag in deinem Profil Kurse ein, dann siehst du hier deine Klausurtermine.</p>'}
      </section>`;
  }

  function nextSessionWidget() {
    const mine = db.sessions.filter((s) => s.joined && daysUntil(s.date) >= 0).sort((a, b) => a.date.localeCompare(b.date))[0];
    return `
      <section class="widget" aria-labelledby="w-next">
        <div class="widget-head"><h3 id="w-next">Deine nächste Session</h3></div>
        ${mine ? `<div><b class="small">${esc(mine.title)}</b><p class="small muted">${fmtDate(mine.date, { weekday: 'long', day: '2-digit', month: '2-digit' })}, ${mine.from} Uhr<br>${esc(mine.place)}</p></div>
          <a class="btn btn-ghost" href="#sessions">Alle Sessions</a>`
        : `<p class="small muted">Du bist noch bei keiner Session dabei.</p><a class="btn btn-ghost" href="#sessions">Sessions ansehen</a>`}
      </section>`;
  }

  function viewFind() {
    const list = candidates();
    const me = db.me;
    const pc = completeness();
    const opt = (v, label, cur) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${esc(label)}</option>`;
    const active = [];
    if (ui.course !== 'mine') active.push({ key: 'course', label: ui.course === 'all' ? 'Alle Kurse' : courseName(ui.course) });
    if (ui.style) active.push({ key: 'style', label: STYLES[ui.style] });
    if (ui.place) active.push({ key: 'place', label: PLACES[ui.place] });
    if (ui.onlyOnline) active.push({ key: 'onlyOnline', label: 'Gerade online' });
    if (ui.q) active.push({ key: 'q', label: `Suche: „${ui.q}“` });

    return `
      ${pageHead(`Hallo ${esc(firstName(me.name))}, wer lernt mit dir?`, 'Vorschläge aus deinen Kursen. Die Personen, die am besten zu dir passen, stehen oben.')}
      <div class="layout">
        <div class="stack">
          ${pc < 100 ? `<div class="notice">
            <div><b>Dein Profil ist zu ${pc}% vollständig.</b> <span class="small">Je mehr du einträgst, desto genauer werden die Vorschläge.</span></div>
            <a class="btn btn-primary" href="#profil">Profil vervollständigen</a>
          </div>` : ''}

          <form class="toolbar" aria-label="Vorschläge filtern" onsubmit="return false">
            <div class="field"><label for="f-course">Kurs</label>
              <select id="f-course" data-ui="course">${opt('mine', 'Alle meine Kurse', ui.course)}${me.courses.map((c) => opt(c, courseName(c), ui.course)).join('')}${opt('all', 'Alle Kurse der Uni', ui.course)}</select></div>
            <div class="field"><label for="f-style">Lernstil</label>
              <select id="f-style" data-ui="style">${opt('', 'Egal', ui.style)}${Object.entries(STYLES).map(([k, v]) => opt(k, v, ui.style)).join('')}</select></div>
            <div class="field"><label for="f-place">Ort</label>
              <select id="f-place" data-ui="place">${opt('', 'Egal', ui.place)}${Object.entries(PLACES).map(([k, v]) => opt(k, v, ui.place)).join('')}</select></div>
            <div class="field"><label for="f-sort">Sortieren nach</label>
              <select id="f-sort" data-ui="sort">${opt('match', 'Beste Übereinstimmung', ui.sort)}${opt('time', 'Meiste gemeinsame Zeiten', ui.sort)}${opt('semester', 'Ähnliches Semester', ui.sort)}</select></div>
          </form>

          <div class="result-bar">
            <div class="active-filters">
              <b>${plural(list.length, 'Vorschlag', 'Vorschläge')}</b>
              ${active.map((a) => `<span class="tag plain">${esc(a.label)}<button type="button" data-act="clear-filter" data-id="${a.key}" aria-label="Filter ${esc(a.label)} entfernen">${icon('x').replace('<svg', '<svg width="14" height="14"')}</button></span>`).join('')}
              ${active.length > 1 ? '<button class="btn btn-text" data-act="reset-filters">Alle zurücksetzen</button>' : ''}
            </div>
            <label class="switch"><input type="checkbox" id="f-online" data-ui="onlyOnline" ${ui.onlyOnline ? 'checked' : ''}>Nur wer gerade online ist</label>
          </div>

          ${list.length ? `<div class="grid">${list.map(personCard).join('')}</div>` : `
            <div class="empty">
              <h3>Niemand passt zu diesen Filtern</h3>
              <p class="muted small">Entferne einen Filter oder schau bei den offenen Lernsessions vorbei. Dort findest du oft schnell Anschluss.</p>
              <div class="card-actions" style="justify-content:center"><button class="btn btn-primary" data-act="reset-filters">Filter zurücksetzen</button><a class="btn btn-ghost" href="#sessions">Zu den Sessions</a></div>
            </div>`}
        </div>
        <aside class="aside" aria-label="Übersicht">
          ${examsWidget()}
          ${nextSessionWidget()}
          <div class="tip"><span class="label">Tipp</span><p class="small"><b>Feste Termine wirken.</b> Trefft euch jede Woche zur gleichen Zeit. So bleibt ihr bis zur Klausur leichter dran.</p></div>
        </aside>
      </div>`;
  }

  // ---------------------------------------------------------------------------
  // Seite: Lernsessions
  // ---------------------------------------------------------------------------
  function viewSessions() {
    const upcoming = db.sessions.filter((s) => daysUntil(s.date) >= 0).sort((a, b) => (a.date + a.from).localeCompare(b.date + b.from));
    const tabs = {
      all: { label: 'Alle', list: upcoming },
      mine: { label: 'Meine Kurse', list: upcoming.filter((s) => db.me.courses.includes(s.course)) },
      joined: { label: 'Ich bin dabei', list: upcoming.filter((s) => s.joined) },
    };
    const list = tabs[ui.sessionTab].list;
    const item = (s) => {
      const host = person(s.host);
      const full = s.taken >= s.seats && !s.joined;
      const free = s.seats - s.taken;
      const seats = Array.from({ length: s.seats }, (_, i) => `<i class="${i < s.taken ? 'on' : ''}"></i>`).join('');
      return `
        <article class="session">
          <div class="when" aria-hidden="true"><small>${fmtDate(s.date, { weekday: 'short' }).replace('.', '')}</small><b>${fmtDate(s.date, { day: '2-digit' })}</b><small>${fmtDate(s.date, { month: 'short' }).replace('.', '')}</small></div>
          <div style="min-width:0">
            <div class="tags"><span class="tag ${db.me.courses.includes(s.course) ? '' : 'plain'}">${esc(courseName(s.course))}</span>${s.joined ? '<span class="status ok">Du bist dabei</span>' : ''}</div>
            <h3>${esc(s.title)}</h3>
            <div class="meta">
              <span>${icon('clock')}${fmtDate(s.date, { weekday: 'long', day: 'numeric', month: 'long' })}, ${s.from}–${s.to} Uhr</span>
              <span>${icon('pin')}${esc(s.place)}</span>
              <span>${icon('user')}${host ? `von ${esc(firstName(host.name))}` : 'von dir'}</span>
            </div>
            <div class="seats" aria-hidden="true">${seats}</div>
          </div>
          <div class="session-side">
            <span class="small muted">${full ? 'Ausgebucht' : `${plural(free, 'Platz', 'Plätze')} frei`} · ${s.taken}/${s.seats}</span>
            ${s.joined ? `<button class="btn btn-ghost" data-act="leave" data-id="${s.id}">Austragen</button>`
              : full ? `<button class="btn btn-ghost" disabled>Ausgebucht</button>`
              : `<button class="btn btn-primary" data-act="join" data-id="${s.id}">Mitmachen</button>`}
          </div>
        </article>`;
    };
    return `
      ${pageHead('Lernsessions', 'Offene Lerngruppen mit festem Termin. Tritt einer bei oder biete selbst eine an.', `<button class="btn btn-primary" data-act="new-session">${icon('plus')}Session anbieten</button>`)}
      <div class="stack">
        <div class="tabs" role="tablist" aria-label="Sessions filtern">
          ${Object.entries(tabs).map(([k, t]) => `<button role="tab" aria-selected="${ui.sessionTab === k}" data-act="session-tab" data-id="${k}">${t.label} <span class="muted">${t.list.length}</span></button>`).join('')}
        </div>
        ${list.length ? `<div class="stack" style="gap:12px">${list.map(item).join('')}</div>` : `
          <div class="empty">
            <h3>${ui.sessionTab === 'joined' ? 'Du bist noch bei keiner Session dabei' : 'Keine Sessions gefunden'}</h3>
            <p class="small muted">${ui.sessionTab === 'joined' ? 'Schau unter „Alle“, ob etwas für dich dabei ist.' : 'Biete doch selbst eine Session an. Andere aus deinem Kurs sehen sie sofort.'}</p>
            <button class="btn btn-primary" data-act="${ui.sessionTab === 'joined' ? 'session-tab' : 'new-session'}" data-id="all">${ui.sessionTab === 'joined' ? 'Alle Sessions zeigen' : 'Session anbieten'}</button>
          </div>`}
      </div>`;
  }

  // ---------------------------------------------------------------------------
  // Seite: Anfragen & Buddies
  // ---------------------------------------------------------------------------
  function viewRequests() {
    const sentIds = Object.keys(db.sent);
    const tabs = { in: ['Eingang', db.incoming.length], buddies: ['Meine Buddies', db.buddies.length], sent: ['Gesendet', sentIds.length] };
    let body = '';
    if (ui.reqTab === 'in') {
      body = db.incoming.length ? `<div class="list">${db.incoming.map((r) => {
        const p = person(r.id), m = matchInfo(p);
        return `<div class="row">
          ${avatar(p)}
          <div class="grow">
            <b>${esc(p.name)}</b> <span class="small muted">· ${esc(p.study)} · ${m.score}% Match</span>
            <p class="quote">${esc(r.text)}</p>
          </div>
          <div class="actions">
            <button class="btn btn-ghost" data-act="view" data-id="${p.id}">Profil</button>
            <button class="btn btn-ghost" data-act="decline" data-id="${p.id}">Ablehnen</button>
            <button class="btn btn-primary" data-act="accept" data-id="${p.id}">${icon('check')}Annehmen</button>
          </div>
        </div>`;
      }).join('')}</div>` : `<div class="empty"><h3>Keine neuen Anfragen</h3><p class="small muted">Warte nicht ab, schreib selbst jemanden an. Die meisten freuen sich über eine Anfrage.</p><a class="btn btn-primary" href="#finden">Buddy finden</a></div>`;
    } else if (ui.reqTab === 'buddies') {
      body = db.buddies.length ? `<div class="list">${db.buddies.map((id) => {
        const p = person(id), m = matchInfo(p);
        const last = (db.chats[id] || []).slice(-1)[0];
        return `<div class="row">
          ${avatar(p)}
          <div class="grow"><b>${esc(p.name)}</b><p class="small muted">${m.shared.length ? 'Gemeinsam: ' + m.shared.map((c) => esc(courseName(c))).join(', ') : esc(p.study)}</p>
            ${last ? `<p class="small muted" style="margin-top:4px">Letzte Nachricht: „${esc(last.text)}“</p>` : ''}</div>
          <div class="actions">
            <button class="btn btn-ghost" data-act="kudos" data-id="${p.id}">Feedback geben</button>
            <button class="btn btn-ghost" data-act="remove-buddy" data-id="${p.id}" aria-label="${esc(p.name)} entfernen">Entfernen</button>
            <button class="btn btn-primary" data-act="chat" data-id="${p.id}">${icon('chat')}Nachricht</button>
          </div>
        </div>`;
      }).join('')}</div>` : `<div class="empty"><h3>Noch keine Buddies</h3><p class="small muted">Sobald jemand deine Anfrage annimmt, erscheint die Person hier.</p><a class="btn btn-primary" href="#finden">Buddy finden</a></div>`;
    } else {
      body = sentIds.length ? `<div class="list">${sentIds.map((id) => {
        const p = person(id);
        return `<div class="row">${avatar(p, 'sm')}<div class="grow"><b>${esc(p.name)}</b><p class="small muted">„${esc(db.sent[id].text)}“</p></div><span class="status wait">Wartet auf Antwort</span><button class="btn btn-ghost" data-act="withdraw" data-id="${id}">Zurückziehen</button></div>`;
      }).join('')}</div>` : `<div class="empty"><h3>Keine offenen Anfragen</h3><p class="small muted">Hier siehst du Anfragen, die du verschickt hast und auf die noch keine Antwort kam.</p></div>`;
    }
    return `
      ${pageHead('Anfragen & Buddies', 'Beantworte neue Anfragen und bleib mit deinen Lernpartnern in Kontakt.')}
      <div class="stack">
        <div class="tabs" role="tablist" aria-label="Bereiche">
          ${Object.entries(tabs).map(([k, [label, n]]) => `<button role="tab" aria-selected="${ui.reqTab === k}" data-act="req-tab" data-id="${k}">${label} ${k === 'in' && n ? `<span class="badge">${n}</span>` : `<span class="muted">${n}</span>`}</button>`).join('')}
        </div>
        ${body}
      </div>`;
  }

  // ---------------------------------------------------------------------------
  // Seite: Mein Profil
  // ---------------------------------------------------------------------------
  function weekTable(slots, { editable = false, highlight = [] } = {}) {
    return `<div class="week-wrap"><table class="week">
      <thead><tr><th><span class="sr-only">Tageszeit</span></th>${DAYS.map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
      <tbody>${Object.entries(TIMES).map(([t, label]) => `<tr><th scope="row">${label}</th>${DAYS.map((d) => {
        const k = `${d}-${t}`, on = slots.includes(k), both = highlight.includes(k);
        return `<td><button type="button" ${editable ? `data-slot="${k}"` : 'disabled'} class="${both ? 'shared' : ''}" aria-pressed="${on}" aria-label="${d} ${label}: ${on ? 'frei' : 'keine Zeit'}">${icon('check')}</button></td>`;
      }).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function viewProfile() {
    const me = db.me;
    const pc = completeness();
    const options = Object.keys(COURSES).filter((c) => !me.courses.includes(c));
    return `
      ${pageHead('Mein Profil', 'So sehen dich andere. Je vollständiger dein Profil, desto besser die Vorschläge.', `<span class="saved">${icon('check')}Wird automatisch gespeichert</span>`)}
      <div class="layout">
        <div class="stack">
          <section class="panel" aria-labelledby="p-about">
            <div class="panel-head"><h2 id="p-about">Über dich</h2><p>Name, Studiengang und ein kurzer Text.</p></div>
            <div class="form-grid">
              <div class="field"><label for="me-name">Name</label><input class="input" id="me-name" data-me="name" value="${esc(me.name)}" autocomplete="name"></div>
              <div class="field"><label for="me-study">Studiengang</label><select id="me-study" data-me="study">${STUDIES.map((s) => `<option ${me.study === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
              <div class="field"><label for="me-sem">Semester</label><select id="me-sem" data-me="semester">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${me.semester === i + 1 ? 'selected' : ''}>${i + 1}. Semester</option>`).join('')}</select></div>
            </div>
            <div class="field"><label for="me-bio">Kurzer Text über dich</label><textarea id="me-bio" data-me="bio" maxlength="240" placeholder="z. B. Wann und wie lernst du gern? Wobei brauchst du Hilfe?">${esc(me.bio)}</textarea><span class="hint" id="bio-count">${me.bio.length}/240 Zeichen</span></div>
          </section>

          <section class="panel" aria-labelledby="p-courses">
            <div class="panel-head"><h2 id="p-courses">Meine Kurse</h2><p>Du bekommst Vorschläge aus diesen Kursen.</p></div>
            <div class="tags">${me.courses.map((c) => `<span class="tag">${esc(courseName(c))}<button type="button" data-act="rm-course" data-id="${c}" aria-label="${esc(courseName(c))} entfernen"><svg width="14" height="14" aria-hidden="true"><use href="#i-x"/></svg></button></span>`).join('') || '<span class="small muted">Noch keine Kurse eingetragen.</span>'}</div>
            ${options.length ? `<div class="form-grid" style="align-items:end">
              <div class="field"><label for="add-course">Kurs hinzufügen</label><select id="add-course">${options.map((c) => `<option value="${c}">${esc(courseName(c))} (${COURSES[c].code})</option>`).join('')}</select></div>
              <div><button class="btn btn-ghost" data-act="add-course">${icon('plus')}Hinzufügen</button></div>
            </div>` : ''}
          </section>

          <section class="panel" aria-labelledby="p-times">
            <div class="panel-head"><h2 id="p-times">Wann hast du Zeit?</h2><p>Tippe auf die Felder, an denen du regelmäßig lernen kannst.</p></div>
            ${weekTable(me.avail, { editable: true })}
            <div class="legend"><span><i class="l-free"></i>Frei zum Lernen</span><span><i class="l-none"></i>Keine Zeit</span></div>
          </section>

          <section class="panel" aria-labelledby="p-style">
            <div class="panel-head"><h2 id="p-style">Wie lernst du?</h2><p>Wähle einen Lernstil und beliebig viele Orte.</p></div>
            <div class="field"><span class="field-label" id="lbl-style">Lernstil</span><div class="chip-group" role="group" aria-labelledby="lbl-style">${Object.entries(STYLES).map(([k, v]) => `<button class="chip" data-act="my-style" data-id="${k}" aria-pressed="${me.style === k}">${v}</button>`).join('')}</div></div>
            <div class="field"><span class="field-label" id="lbl-places">Lernorte</span><div class="chip-group" role="group" aria-labelledby="lbl-places">${Object.entries(PLACES).map(([k, v]) => `<button class="chip" data-act="my-place" data-id="${k}" aria-pressed="${me.places.includes(k)}">${v}</button>`).join('')}</div></div>
          </section>

          <section class="panel" aria-labelledby="p-reset">
            <div class="danger-zone">
              <div class="panel-head"><h2 id="p-reset">Prototyp zurücksetzen</h2><p>Setzt alle Eingaben auf die Beispieldaten zurück.</p></div>
              ${ui.confirmReset
                ? `<div class="card-actions"><button class="btn btn-ghost" data-act="reset-cancel">Abbrechen</button><button class="btn btn-primary" data-act="reset-do">Ja, zurücksetzen</button></div>`
                : `<button class="btn btn-ghost" data-act="reset-ask">Zurücksetzen</button>`}
            </div>
          </section>
        </div>

        <aside class="aside" aria-label="Profilstatus">
          <section class="widget">
            <div class="profile-top">${myAvatar('lg')}<div class="grow"><b>${esc(me.name || 'Ohne Namen')}</b><span class="small muted">${esc(me.study)} · ${me.semester}. Semester</span></div></div>
            <div class="block">
              <div class="small" id="pc-label"><b>Profil ${pc}% vollständig</b></div>
              <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pc}" aria-labelledby="pc-label"><i style="width:${pc}%"></i></div>
            </div>
            <ul class="checklist" id="checklist">${checklistHtml()}</ul>
          </section>
          ${examsWidget()}
        </aside>
      </div>`;
  }
  const checklistHtml = () => profileChecks().map((c) => `<li class="${c.ok ? 'done' : ''}">${icon(c.ok ? 'check' : 'plus')}${c.label}</li>`).join('');

  // ---------------------------------------------------------------------------
  // Dialoge
  // ---------------------------------------------------------------------------
  let lastFocus = null;
  function openModal(html, label) {
    const o = $('#overlay');
    if (o.hidden) lastFocus = document.activeElement;
    o.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(label)}">${html}</div>`;
    o.hidden = false;
    document.body.style.overflow = 'hidden';
    const f = o.querySelector('[autofocus], textarea, input, select, .btn-primary');
    if (f) f.focus();
  }
  function closeModal() {
    const o = $('#overlay');
    if (o.hidden) return;
    o.hidden = true; o.innerHTML = '';
    document.body.style.overflow = '';
    if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }
  const closeBtn = `<button class="icon-btn" data-act="close" aria-label="Schließen">${icon('x')}</button>`;

  function modalProfile(id) {
    const p = person(id), m = matchInfo(p);
    const kudos = Object.entries(kudosOf(p)).map(([k, n]) => `<span class="tag plain">${KUDOS[k]} · ${n}</span>`).join('');
    const isBuddy = db.buddies.includes(id), isIncoming = db.incoming.some((r) => r.id === id);
    let action;
    if (isBuddy) action = `<button class="btn btn-primary" data-act="chat" data-id="${id}">${icon('chat')}Nachricht schreiben</button>`;
    else if (isIncoming) action = `<button class="btn btn-primary" data-act="accept" data-id="${id}">${icon('check')}Anfrage annehmen</button>`;
    else if (db.sent[id]) action = `<button class="btn btn-good" disabled>${icon('check')}Angefragt</button>`;
    else action = `<button class="btn btn-primary" data-act="ask" data-id="${id}">${icon('send')}Anfrage senden</button>`;
    openModal(`
      <div class="modal-head">${avatar(p, 'lg')}<div class="who"><h2>${esc(p.name)}</h2><p class="small muted">${esc(p.study)} · ${p.semester}. Semester${p.online ? ' · gerade online' : ''}</p></div>${closeBtn}</div>
      <div class="tags"><span class="match ${matchClass(m.score)}" style="display:inline-flex;gap:6px;align-items:baseline"><b style="display:inline">${m.score}%</b><small>Match</small></span></div>
      <p>${esc(p.bio)}</p>
      <div class="block"><span class="label">Warum ihr gut passt</span>
        ${m.reasons.length ? `<ul class="reasons">${m.reasons.map((r) => `<li>${icon('check')}<span>${esc(r)}</span></li>`).join('')}</ul>` : '<p class="small muted">Ihr habt wenig gemeinsam. Vielleicht passt jemand anderes besser.</p>'}
      </div>
      <div class="block"><span class="label">Kurse</span><div class="tags">${p.courses.map((c) => `<span class="tag ${m.shared.includes(c) ? '' : 'plain'}">${esc(courseName(c))}</span>`).join('')}</div></div>
      <div class="block"><span class="label">Freie Zeiten</span>
        ${weekTable(p.avail, { highlight: m.sharedSlots })}
        <div class="legend"><span><i class="l-both"></i>Ihr habt beide Zeit</span><span><i class="l-free"></i>Nur ${esc(firstName(p.name))} hat Zeit</span></div>
      </div>
      ${kudos ? `<div class="block"><span class="label">Feedback von anderen Buddies</span><div class="tags">${kudos}</div></div>` : ''}
      <div class="modal-foot"><button class="btn btn-ghost" data-act="close">Schließen</button>${action}</div>`, `Profil von ${p.name}`);
  }

  function modalAsk(id) {
    const p = person(id), m = matchInfo(p);
    const c = m.shared[0] ? courseName(m.shared[0]) : 'deinem Kurs';
    const slot = m.sharedSlots[0] ? slotLabel(m.sharedSlots[0]) : 'diese Woche';
    const ideas = [
      `Hi ${firstName(p.name)}! Wir sind beide in ${c}. Hast du Lust, ${slot} zusammen zu lernen?`,
      `Hey, ich suche jemanden, um Altklausuren in ${c} durchzurechnen. Wärst du dabei?`,
      `Hallo ${firstName(p.name)}, sollen wir uns einmal pro Woche fest zum Lernen treffen?`,
    ];
    modalAsk.ideas = ideas;
    openModal(`
      <div class="modal-head">${avatar(p)}<div class="who"><h2>Anfrage an ${esc(firstName(p.name))}</h2><p class="small muted">${m.score}% Match${m.shared.length ? ' · ' + m.shared.map(courseName).join(', ') : ''}</p></div>${closeBtn}</div>
      <form class="stack" id="ask-form" data-id="${id}">
        <div class="field"><label for="ask-text">Deine Nachricht</label><textarea id="ask-text" maxlength="300" required>${esc(ideas[0])}</textarea><span class="hint">Tipp: Nenn einen konkreten Kurs und einen Zeitpunkt.</span></div>
        <div class="block"><span class="label">Oder nimm einen Vorschlag</span>
          <div class="icebreakers">${ideas.map((t, i) => `<button type="button" class="chip" data-act="ice" data-i="${i}">${esc(t)}</button>`).join('')}</div>
        </div>
        <div class="safety">${icon('shield')}<span>Trefft euch beim ersten Mal an einem öffentlichen Ort, zum Beispiel in der Bibliothek. Deine Uni-Mail bleibt verborgen, bis ihr beide zugestimmt habt.</span></div>
        <div class="modal-foot"><button type="button" class="btn btn-ghost" data-act="close">Abbrechen</button><button class="btn btn-primary">${icon('send')}Anfrage senden</button></div>
      </form>`, `Anfrage an ${p.name}`);
  }

  function modalChat(id, keepFocus) {
    const p = person(id);
    const msgs = db.chats[id] || [];
    openModal(`
      <div class="modal-head">${avatar(p)}<div class="who"><h2>${esc(p.name)}</h2><p class="small muted">Dein Buddy</p></div>${closeBtn}</div>
      <div class="chat" id="chat" aria-live="polite">${msgs.map((m) => `<div class="bubble ${m.me ? 'me' : ''}">${esc(m.text)}</div>`).join('') || '<p class="small muted">Schreibt euch die erste Nachricht und macht einen Termin aus.</p>'}</div>
      <div class="chip-group">
        <button type="button" class="chip" data-act="quick" data-id="${id}" data-t="Wann passt es dir diese Woche?">Wann passt es dir diese Woche?</button>
        <button type="button" class="chip" data-act="quick" data-id="${id}" data-t="Ich bin heute in der Bib, 2. OG.">Ich bin heute in der Bib</button>
      </div>
      <form class="chat-form" id="chat-form" data-id="${id}"><label class="sr-only" for="chat-input">Nachricht</label><input class="input" id="chat-input" placeholder="Nachricht schreiben" autocomplete="off" autofocus><button class="btn btn-primary" aria-label="Senden">${icon('send')}</button></form>`, `Chat mit ${p.name}`);
    const c = $('#chat'); c.scrollTop = c.scrollHeight;
    if (keepFocus) $('#chat-input').focus();
  }

  function modalKudos(id) {
    const p = person(id);
    openModal(`
      <div class="modal-head">${avatar(p)}<div class="who"><h2>Wie war das Lernen mit ${esc(firstName(p.name))}?</h2><p class="small muted">Wähle alles, was passt. Nur positives Feedback, sichtbar im Profil.</p></div>${closeBtn}</div>
      <div class="chip-group">${Object.entries(KUDOS).map(([k, v]) => `<button type="button" class="chip" data-act="kudo-pick" data-id="${k}" aria-pressed="false">${v}</button>`).join('')}</div>
      <p class="small muted" id="kudo-hint" hidden>Wähle mindestens eine Eigenschaft aus.</p>
      <div class="modal-foot"><button class="btn btn-ghost" data-act="close">Abbrechen</button><button class="btn btn-primary" data-act="kudo-send" data-id="${id}">Feedback senden</button></div>`, `Feedback für ${p.name}`);
  }

  function modalNewSession() {
    openModal(`
      <div class="modal-head"><div class="who"><h2>Session anbieten</h2><p class="small muted">Andere aus deinem Kurs sehen sie sofort und können mitmachen.</p></div>${closeBtn}</div>
      <form class="stack" id="session-form" novalidate>
        <div class="form-grid">
          <div class="field"><label for="ns-course">Kurs</label><select id="ns-course">${(db.me.courses.length ? db.me.courses : Object.keys(COURSES)).map((c) => `<option value="${c}">${esc(courseName(c))}</option>`).join('')}</select></div>
          <div class="field"><label for="ns-seats">Plätze inklusive dir</label><select id="ns-seats">${[2, 3, 4, 5, 6].map((n) => `<option ${n === 4 ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
        </div>
        <div class="field"><label for="ns-title">Thema</label><input class="input" id="ns-title" placeholder="z. B. Übungsblatt 6 besprechen" maxlength="80"></div>
        <div class="form-grid">
          <div class="field"><label for="ns-date">Datum</label><input class="input" id="ns-date" type="date" min="${isoIn(0)}" value="${isoIn(2)}"></div>
          <div class="field"><label for="ns-from">Von</label><input class="input" id="ns-from" type="time" value="14:00"></div>
          <div class="field"><label for="ns-to">Bis</label><input class="input" id="ns-to" type="time" value="15:30"></div>
        </div>
        <div class="field"><label for="ns-place">Ort</label><input class="input" id="ns-place" placeholder="z. B. Bibliothek, Gruppenraum 1.12" maxlength="80"></div>
        <p class="small" id="ns-error" style="color:var(--warn)" hidden></p>
        <div class="modal-foot"><button type="button" class="btn btn-ghost" data-act="close">Abbrechen</button><button class="btn btn-primary">Session veröffentlichen</button></div>
      </form>`, 'Session anbieten');
  }

  // Onboarding in drei Schritten
  let ob = null;
  function startOnboarding() {
    ob = { step: 1, data: { name: '', study: STUDIES[0], semester: 1, courses: [], style: 'ruhig', places: [], avail: [] }, error: '' };
    renderOnboarding();
  }
  function renderOnboarding() {
    const d = ob.data;
    const steps = `<div class="stepper" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${i <= ob.step ? 'on' : ''}"></i>`).join('')}</div>`;
    let body = '';
    if (ob.step === 1) body = `
      <div class="field"><label for="ob-name">Wie heißt du?</label><input class="input" id="ob-name" value="${esc(d.name)}" placeholder="Vor- und Nachname" autocomplete="name" autofocus></div>
      <div class="form-grid">
        <div class="field"><label for="ob-study">Studiengang</label><select id="ob-study">${STUDIES.map((s) => `<option ${d.study === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div class="field"><label for="ob-sem">Semester</label><select id="ob-sem">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${d.semester === i + 1 ? 'selected' : ''}>${i + 1}. Semester</option>`).join('')}</select></div>
      </div>`;
    if (ob.step === 2) body = `
      <div class="block"><span class="field-label" style="font-weight:600;font-size:.84rem">Welche Kurse belegst du dieses Semester?</span>
        <div class="course-pick">${Object.entries(COURSES).map(([k, c]) => `<button type="button" class="chip" data-act="ob-course" data-id="${k}" aria-pressed="${d.courses.includes(k)}">${esc(c.name)}</button>`).join('')}</div>
      </div>`;
    if (ob.step === 3) body = `
      <div class="field"><span class="field-label">Wie lernst du am liebsten?</span><div class="chip-group">${Object.entries(STYLES).map(([k, v]) => `<button type="button" class="chip" data-act="ob-style" data-id="${k}" aria-pressed="${d.style === k}">${v}</button>`).join('')}</div></div>
      <div class="field"><span class="field-label">Wo lernst du gern?</span><div class="chip-group">${Object.entries(PLACES).map(([k, v]) => `<button type="button" class="chip" data-act="ob-place" data-id="${k}" aria-pressed="${d.places.includes(k)}">${v}</button>`).join('')}</div></div>
      <div class="field"><span class="field-label">Wann hast du Zeit? <span class="muted" style="font-weight:400">(kannst du später ändern)</span></span>${weekTable(d.avail, { editable: true }).replaceAll('data-slot=', 'data-obslot=')}</div>`;
    const titles = ['', 'Erzähl uns kurz von dir', 'Deine Kurse', 'Dein Lernstil'];
    openModal(`
      <div class="modal-head"><div class="who"><span class="label">Schritt ${ob.step} von 3</span><h2>${titles[ob.step]}</h2></div>${closeBtn}</div>
      ${steps}
      <form class="stack" id="ob-form" novalidate>
        ${body}
        <p class="small" style="color:var(--warn)" role="alert" ${ob.error ? '' : 'hidden'}>${esc(ob.error)}</p>
        <div class="modal-foot" style="justify-content:space-between">
          ${ob.step === 1 ? '<button type="button" class="btn btn-text" data-act="ob-demo">Mit Demo-Profil ansehen</button>' : '<button type="button" class="btn btn-ghost" data-act="ob-back">Zurück</button>'}
          <button class="btn btn-primary">${ob.step === 3 ? 'Fertig, Vorschläge zeigen' : 'Weiter'} ${icon('arrow')}</button>
        </div>
      </form>`, 'Profil anlegen');
  }
  function obCollect() {
    if (ob.step === 1) {
      ob.data.name = $('#ob-name').value.trim();
      ob.data.study = $('#ob-study').value;
      ob.data.semester = +$('#ob-sem').value;
    }
  }
  function obNext() {
    obCollect();
    ob.error = '';
    if (ob.step === 1 && !ob.data.name) ob.error = 'Bitte gib deinen Namen ein, damit andere wissen, wer anfragt.';
    if (ob.step === 2 && !ob.data.courses.length) ob.error = 'Wähle mindestens einen Kurs aus. Danach suchen wir passende Buddies.';
    if (ob.step === 3 && !ob.data.places.length) ob.error = 'Wähle mindestens einen Lernort aus.';
    if (ob.error) return renderOnboarding();
    if (ob.step < 3) { ob.step++; return renderOnboarding(); }
    db.me = { ...ob.data, bio: '' };
    ob = null;
    save();
    closeModal();
    ui.course = 'mine';
    location.hash = 'finden';
    toast(`Willkommen, ${firstName(db.me.name)}! Hier sind deine Vorschläge.`);
  }

  // ---------------------------------------------------------------------------
  // Rendern
  // ---------------------------------------------------------------------------
  function render() {
    if (ui.route === 'start') return;
    const focusId = document.activeElement?.id;
    renderChrome();
    $('#view').innerHTML = { finden: viewFind, sessions: viewSessions, anfragen: viewRequests, profil: viewProfile }[ui.route]();
    if (focusId && $('#app').contains(document.getElementById(focusId))) document.getElementById(focusId).focus();
    save();
  }

  // Simuliert, dass online-Personen eine Anfrage nach kurzer Zeit annehmen.
  function simulateAnswer(id) {
    const p = person(id);
    if (!p.online) return;
    setTimeout(() => {
      if (!db.sent[id]) return;
      delete db.sent[id];
      if (!db.buddies.includes(id)) db.buddies.push(id);
      db.chats[id] = [{ me: false, text: `Hi ${firstName(db.me.name)}, gerne! Wann passt es dir?` }];
      render();
      toast(`${firstName(p.name)} hat deine Anfrage angenommen`, { label: 'Chat öffnen', fn: () => modalChat(id) });
    }, 5000);
  }

  // ---------------------------------------------------------------------------
  // Ereignisse
  // ---------------------------------------------------------------------------
  document.addEventListener('click', (e) => {
    if (e.target.id === 'overlay') return closeModal();
    const skip = e.target.closest('[data-skip]');
    if (skip) { e.preventDefault(); const m = $('#app').hidden ? $('#main-landing') : $('#main'); m.setAttribute('tabindex', '-1'); m.focus(); return; }

    const slot = e.target.closest('[data-slot]');
    if (slot) {
      const k = slot.dataset.slot, a = db.me.avail;
      db.me.avail = a.includes(k) ? a.filter((x) => x !== k) : [...a, k];
      return render();
    }
    const obslot = e.target.closest('[data-obslot]');
    if (obslot) {
      const k = obslot.dataset.obslot, a = ob.data.avail;
      ob.data.avail = a.includes(k) ? a.filter((x) => x !== k) : [...a, k];
      obslot.setAttribute('aria-pressed', ob.data.avail.includes(k));
      return;
    }

    const t = e.target.closest('[data-act]');
    if (!t) return;
    const id = t.dataset.id;
    switch (t.dataset.act) {
      case 'onboard': return startOnboarding();
      case 'ob-demo': ob = null; closeModal(); location.hash = 'finden'; return;
      case 'ob-back': obCollect(); ob.error = ''; ob.step--; return renderOnboarding();
      case 'ob-course': { const c = ob.data.courses; ob.data.courses = c.includes(id) ? c.filter((x) => x !== id) : [...c, id]; t.setAttribute('aria-pressed', ob.data.courses.includes(id)); return; }
      case 'ob-style': ob.data.style = id; $$('[data-act="ob-style"]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.id === id)); return;
      case 'ob-place': { const p = ob.data.places; ob.data.places = p.includes(id) ? p.filter((x) => x !== id) : [...p, id]; t.setAttribute('aria-pressed', ob.data.places.includes(id)); return; }

      case 'close': ob = null; return closeModal();
      case 'view': return modalProfile(id);
      case 'ask': return modalAsk(id);
      case 'ice': $('#ask-text').value = modalAsk.ideas[+t.dataset.i]; $('#ask-text').focus(); return;

      case 'clear-filter':
        if (id === 'course') ui.course = 'mine'; else if (id === 'onlyOnline') ui.onlyOnline = false;
        else if (id === 'q') { ui.q = ''; $('#q').value = ''; } else ui[id] = '';
        return render();
      case 'reset-filters': Object.assign(ui, { course: 'mine', style: '', place: '', onlyOnline: false, q: '' }); $('#q').value = ''; return render();

      case 'session-tab': ui.sessionTab = id; return render();
      case 'new-session': return modalNewSession();
      case 'join': case 'leave': {
        const s = db.sessions.find((x) => x.id === id);
        const join = t.dataset.act === 'join';
        s.joined = join; s.taken += join ? 1 : -1;
        render();
        const undo = { label: 'Rückgängig', fn: () => { s.joined = !join; s.taken += join ? -1 : 1; render(); } };
        return toast(join ? `Du bist dabei: ${fmtDate(s.date, { weekday: 'short', day: '2-digit', month: '2-digit' })}, ${s.from} Uhr` : 'Du hast dich ausgetragen', undo);
      }

      case 'req-tab': ui.reqTab = id; return render();
      case 'accept': case 'decline': {
        const idx = db.incoming.findIndex((r) => r.id === id);
        const req = db.incoming[idx];
        db.incoming.splice(idx, 1);
        const accept = t.dataset.act === 'accept';
        if (accept) { db.buddies.push(id); delete db.sent[id]; }
        closeModal(); render();
        const name = firstName(person(id).name);
        return toast(accept ? `${name} ist jetzt dein Buddy` : `Anfrage von ${name} abgelehnt`, {
          label: 'Rückgängig', fn: () => { db.incoming.splice(idx, 0, req); if (accept) db.buddies = db.buddies.filter((b) => b !== id); render(); },
        });
      }
      case 'withdraw': {
        const old = db.sent[id]; delete db.sent[id]; render();
        return toast('Anfrage zurückgezogen', { label: 'Rückgängig', fn: () => { db.sent[id] = old; render(); } });
      }
      case 'remove-buddy': {
        const idx = db.buddies.indexOf(id); db.buddies.splice(idx, 1); render();
        return toast(`${firstName(person(id).name)} entfernt`, { label: 'Rückgängig', fn: () => { db.buddies.splice(idx, 0, id); render(); } });
      }
      case 'chat': return modalChat(id);
      case 'quick': return sendChat(id, t.dataset.t);
      case 'kudos': return modalKudos(id);
      case 'kudo-pick': t.setAttribute('aria-pressed', t.getAttribute('aria-pressed') !== 'true'); $('#kudo-hint').hidden = true; return;
      case 'kudo-send': {
        const picked = $$('[data-act="kudo-pick"][aria-pressed="true"]').map((b) => b.dataset.id);
        if (!picked.length) { $('#kudo-hint').hidden = false; return; }
        const ex = db.extraKudos[id] = db.extraKudos[id] || {};
        picked.forEach((k) => { ex[k] = (ex[k] || 0) + 1; });
        closeModal(); save();
        return toast(`Danke! ${firstName(person(id).name)} sieht dein Feedback im Profil.`);
      }

      case 'rm-course': {
        const idx = db.me.courses.indexOf(id); db.me.courses.splice(idx, 1); render();
        return toast(`${courseName(id)} entfernt`, { label: 'Rückgängig', fn: () => { db.me.courses.splice(idx, 0, id); render(); } });
      }
      case 'add-course': { const v = $('#add-course').value; if (v && !db.me.courses.includes(v)) db.me.courses.push(v); render(); return toast(`${courseName(v)} hinzugefügt`); }
      case 'my-style': db.me.style = id; return render();
      case 'my-place': { const p = db.me.places; db.me.places = p.includes(id) ? p.filter((x) => x !== id) : [...p, id]; return render(); }
      case 'reset-ask': ui.confirmReset = true; return render();
      case 'reset-cancel': ui.confirmReset = false; return render();
      case 'reset-do': db = seedState(); ui.confirmReset = false; ui.reqTab = 'in'; render(); return toast('Prototyp zurückgesetzt');
    }
  });

  function sendChat(id, text) {
    text = (text || '').trim();
    if (!text) return;
    (db.chats[id] = db.chats[id] || []).push({ me: true, text });
    save();
    modalChat(id, true);
  }

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.dataset.ui) { ui[el.dataset.ui] = el.type === 'checkbox' ? el.checked : el.value; return render(); }
    if (el.dataset.me === 'study') { db.me.study = el.value; return render(); }
    if (el.dataset.me === 'semester') { db.me.semester = +el.value; return render(); }
  });

  document.addEventListener('input', (e) => {
    const el = e.target;
    if (el.id === 'q') {
      ui.q = el.value;
      if (ui.route !== 'finden') { location.hash = 'finden'; return; }
      render();
      return;
    }
    if (el.dataset.me === 'name' || el.dataset.me === 'bio') {
      db.me[el.dataset.me] = el.value;
      save();
      if (el.dataset.me === 'bio') $('#bio-count').textContent = `${el.value.length}/240 Zeichen`;
      const pc = completeness();
      $('#pc-label').innerHTML = `<b>Profil ${pc}% vollständig</b>`;
      $('.progress i').style.width = pc + '%';
      $('.progress').setAttribute('aria-valuenow', pc);
      $('#checklist').innerHTML = checklistHtml();
      renderChrome();
    }
  });

  document.addEventListener('submit', (e) => {
    const f = e.target;
    e.preventDefault();
    if (f.id === 'ob-form') return obNext();
    if (f.id === 'ask-form') {
      const id = f.dataset.id;
      const text = $('#ask-text').value.trim();
      if (!text) { $('#ask-text').focus(); return; }
      db.sent[id] = { text };
      closeModal(); render();
      toast(`Anfrage an ${firstName(person(id).name)} gesendet`, { label: 'Rückgängig', fn: () => { delete db.sent[id]; render(); } });
      return simulateAnswer(id);
    }
    if (f.id === 'chat-form') return sendChat(f.dataset.id, $('#chat-input').value);
    if (f.id === 'session-form') {
      const v = (sel) => $(sel).value.trim();
      const err = !v('#ns-title') ? 'Bitte gib ein Thema an, damit andere wissen, worum es geht.'
        : !v('#ns-date') || daysUntil(v('#ns-date')) < 0 ? 'Bitte wähle ein Datum ab heute.'
        : !v('#ns-from') || !v('#ns-to') || v('#ns-to') <= v('#ns-from') ? 'Die Endzeit muss nach der Startzeit liegen.'
        : !v('#ns-place') ? 'Bitte gib einen Ort an, zum Beispiel einen Raum oder „Online“.' : '';
      if (err) { const p = $('#ns-error'); p.textContent = err; p.hidden = false; return; }
      db.sessions.push({ id: 's' + Date.now(), course: v('#ns-course'), title: v('#ns-title'), date: v('#ns-date'), from: v('#ns-from'), to: v('#ns-to'), place: v('#ns-place'), host: null, seats: +v('#ns-seats'), taken: 1, joined: true });
      closeModal(); ui.sessionTab = 'joined'; render();
      return toast('Deine Session ist online. Andere können jetzt mitmachen.');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !$('#overlay').hidden) { ob = null; closeModal(); }
    // Fokus im Dialog halten
    if (e.key === 'Tab' && !$('#overlay').hidden) {
      const items = $$('#overlay button:not([disabled]), #overlay input, #overlay select, #overlay textarea, #overlay a[href]');
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  window.addEventListener('hashchange', () => { closeModal(); route(); });
  route();
})();
