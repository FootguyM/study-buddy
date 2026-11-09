/* Study Buddy – Forum-Prototyp
   Reines HTML/CSS/JS ohne Backend. Alle Personen, Beiträge und Termine sind Beispieldaten.
   Eingaben werden nur im Browser (localStorage) gespeichert. */
(() => {
  'use strict';

  // ===========================================================================
  // Stammdaten
  // ===========================================================================
  const COURSES = {
    STAT2: { name: 'Statistik II', code: 'WIWI-B-05', exam: '2027-02-03' },
    MIKRO: { name: 'Mikroökonomie I', code: 'WIWI-B-02', exam: '2027-02-10' },
    MAKRO: { name: 'Makroökonomie I', code: 'WIWI-B-03', exam: '2027-02-19' },
    KLR:   { name: 'Kosten- und Leistungsrechnung', code: 'BWL-B-07', exam: '2027-02-17' },
    MARK:  { name: 'Marketing Grundlagen', code: 'BWL-B-09', exam: '2027-02-05' },
    LINA:  { name: 'Lineare Algebra', code: 'MATH-B-01', exam: '2027-02-08' },
    PROG:  { name: 'Programmierung I', code: 'INF-B-01', exam: '2027-02-15' },
    PSY:   { name: 'Einführung in die Psychologie', code: 'PSY-B-01', exam: '2027-02-12' },
  };
  const BOARDS = {
    ...Object.fromEntries(Object.entries(COURSES).map(([k, c]) => [k, { name: c.name, desc: `Lernpartner, Fragen und Lerngruppen · ${c.code}`, course: true }])),
    CAMPUS: { name: 'Lernorte & Tipps', desc: 'Wo lernt man gut? Methoden, Apps, Motivation.' },
    HALLO: { name: 'Vorstellungsrunde', desc: 'Neu hier? Stell dich kurz vor.' },
  };
  const CATEGORIES = [
    { name: 'Wirtschaftswissenschaften', boards: ['STAT2', 'MIKRO', 'MAKRO', 'KLR', 'MARK'] },
    { name: 'Mathematik & Informatik', boards: ['LINA', 'PROG'] },
    { name: 'Psychologie', boards: ['PSY'] },
    { name: 'Rund ums Studium', boards: ['CAMPUS', 'HALLO'] },
  ];
  const TYPES = {
    buddy: { label: 'Suche Buddy', cls: 'p-buddy' },
    frage: { label: 'Frage', cls: 'p-frage' },
    gruppe: { label: 'Lerngruppe', cls: 'p-gruppe' },
    info: { label: 'Info', cls: 'p-info' },
  };
  const STUDIES = ['BWL (B.Sc.)', 'VWL (B.Sc.)', 'Wirtschaftsinformatik (B.Sc.)', 'Wirtschaftsmathematik (B.Sc.)', 'Psychologie (B.Sc.)', 'Anderer Studiengang'];
  const STYLES = { ruhig: 'Ruhig & konzentriert', diskussion: 'Erklären & diskutieren', abfragen: 'Gegenseitig abfragen' };
  const PLACES = { bib: 'Bibliothek', online: 'Online', cafe: 'Café / Mensa', campus: 'Lernraum Campus' };
  const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'];
  const TIMES = { v: 'Vormittag', n: 'Nachmittag', a: 'Abend' };
  const KUDOS = { puenktlich: 'Pünktlich', erklaert: 'Erklärt gut', motiviert: 'Motiviert', vorbereitet: 'Gut vorbereitet' };

  const USERS = [
    { id: 'jonas', nick: 'jonas.w', name: 'Jonas Weber', av: 'av1', study: 'BWL (B.Sc.)', semester: 3, courses: ['STAT2', 'MIKRO', 'MARK'], style: 'diskussion', places: ['bib', 'cafe'], avail: ['Mo-n', 'Di-n', 'Mi-a', 'Do-n'], online: true, joined: 'Okt. 2025', posts: 48, bio: 'Erkläre gern Sachen laut, dann verstehe ich sie selbst besser. Kaffee geht auf mich.', sig: 'BWL 3. Semester · Statistik ist kein Hexenwerk', kudos: { puenktlich: 4, erklaert: 7 } },
    { id: 'aylin', nick: 'aylin_d', name: 'Aylin Demir', av: 'av2', study: 'VWL (B.Sc.)', semester: 3, courses: ['STAT2', 'MIKRO', 'MAKRO'], style: 'ruhig', places: ['bib', 'online'], avail: ['Di-v', 'Di-n', 'Fr-v', 'Sa-v'], online: true, joined: 'Okt. 2025', posts: 63, bio: 'Pomodoro-Fan: 50 Minuten lernen, 10 Minuten Pause, dazwischen kurz Fragen klären.', sig: '', kudos: { vorbereitet: 6, puenktlich: 5 } },
    { id: 'mehmet', nick: 'mehmet94', name: 'Mehmet Yilmaz', av: 'av4', study: 'BWL (B.Sc.)', semester: 3, courses: ['STAT2', 'KLR'], style: 'ruhig', places: ['bib'], avail: ['Mo-n', 'Do-n', 'Fr-v'], online: false, seen: 180, joined: 'Apr. 2026', posts: 21, bio: 'Suche jemanden für feste Termine bis zur Klausur. Habe alle Altklausuren seit 2022.', sig: 'Altklausuren > Skript', kudos: { vorbereitet: 3 } },
    { id: 'clara', nick: 'clara.h', name: 'Clara Hoffmann', av: 'av3', study: 'Psychologie (B.Sc.)', semester: 1, courses: ['PSY', 'STAT2'], style: 'abfragen', places: ['online', 'cafe'], avail: ['Mi-n', 'Do-a', 'Sa-n'], online: true, joined: 'Okt. 2026', posts: 6, bio: 'Erstes Semester, Statistik ist für mich noch neu. Ich frage gern mit Karteikarten ab.', sig: '', kudos: { motiviert: 2 } },
    { id: 'paul', nick: 'paulsch', name: 'Paul Schneider', av: 'av2', study: 'Wirtschaftsinformatik (B.Sc.)', semester: 1, courses: ['PROG', 'LINA', 'KLR'], style: 'abfragen', places: ['online', 'campus'], avail: ['Di-a', 'Mi-a', 'Do-a'], online: false, seen: 900, joined: 'Okt. 2026', posts: 14, bio: 'Abends am produktivsten. Gern per Videocall mit geteiltem Bildschirm.', sig: 'while (!klausur) lernen();', kudos: { erklaert: 2, motiviert: 3 } },
    { id: 'mia', nick: 'mia_s', name: 'Mia Schulz', av: 'av1', study: 'Wirtschaftsmathematik (B.Sc.)', semester: 3, courses: ['LINA', 'STAT2', 'PROG'], style: 'diskussion', places: ['online', 'bib'], avail: ['Mo-v', 'Di-n', 'Fr-v'], online: true, joined: 'Okt. 2025', posts: 112, bio: 'Suche einen Tausch: Ich erkläre Statistik, du hilfst mir bei Java.', sig: 'Fragen zu Statistik? Einfach PN.', kudos: { erklaert: 9, vorbereitet: 4 } },
    { id: 'noah', nick: 'noah.b', name: 'Noah Becker', av: 'av4', study: 'VWL (B.Sc.)', semester: 5, courses: ['MAKRO', 'MIKRO'], style: 'ruhig', places: ['bib', 'campus'], avail: ['Mo-v', 'Mi-v', 'Fr-v'], online: false, seen: 60 * 26, joined: 'Okt. 2024', posts: 87, bio: 'Wiederhole Mikro zur Notenverbesserung und kenne die typischen Fallen.', sig: '', kudos: { puenktlich: 6 } },
    { id: 'sophie', nick: 'sophie_k', name: 'Sophie Krüger', av: 'av3', study: 'BWL (B.Sc.)', semester: 5, courses: ['KLR', 'MARK'], style: 'diskussion', places: ['cafe', 'campus'], avail: ['Di-n', 'Do-v'], online: false, seen: 35, joined: 'Okt. 2024', posts: 341, rank: 'Tutorin', bio: 'War letztes Jahr Tutorin in KLR. Lerne gern in der Mensa nach dem Mittagessen.', sig: 'Tutorin KLR · Sprechstunde Do 10 Uhr', kudos: { erklaert: 11, puenktlich: 3 } },
  ];

  // ===========================================================================
  // Beispielinhalte
  // ===========================================================================
  const now = () => Date.now();
  const ago = (min) => now() - min * 60000;
  const isoIn = (days) => { const d = new Date(); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + days); return toIso(d); };
  function toIso(d) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }

  const demoMe = () => ({
    name: 'Lena Meier', nick: 'lena.m', study: 'BWL (B.Sc.)', semester: 3, joined: 'Okt. 2025',
    courses: ['STAT2', 'MIKRO', 'KLR'], style: 'ruhig', places: ['bib', 'online'],
    avail: ['Mo-n', 'Di-v', 'Di-n', 'Do-n', 'Fr-v'],
    bio: 'Ich lerne am liebsten vormittags in der Bib und suche jemanden, der bei Statistik dranbleibt.',
  });

  const P = (author, min, text) => ({ author, t: ago(min), text });
  const seed = () => ({
    loggedIn: false,
    me: demoMe(),
    nextId: 100,
    read: [1, 18, 9, 15, 16],
    threads: [
      { id: 1, board: 'STAT2', type: 'info', sticky: true, title: 'Sammelthread: Altklausuren, Formelsammlung und Tutorien', views: 1240, posts: [
        P('sophie', 60 * 24 * 30, 'Hier sammeln wir alles Wichtige zu Statistik II:\n\nDie Altklausuren der letzten drei Jahre liegen in der Fachschaft (Raum E.14) aus. Die erlaubte Formelsammlung ist die vom Lehrstuhl, eigene Notizen sind nicht erlaubt.\n\nTutorien: Mo 12 Uhr und Mi 16 Uhr, jeweils im Hörsaal B.\n\nWenn ihr Lernpartner sucht, macht bitte ein eigenes Thema mit dem Präfix „Suche Buddy“ auf.')] },
      { id: 2, board: 'STAT2', type: 'buddy', title: 'Suche Lernpartner für Statistik II, Di/Do nachmittags in der Bib', views: 86, posts: [
        P('jonas', 95, 'Hi zusammen,\n\nich suche jemanden, der mit mir bis zur Klausur regelmäßig Statistik II lernt. Am liebsten dienstags und donnerstags nachmittags in der Bib. Ich erkläre gern laut und rechne Aufgaben zusammen durch.\n\nMeldet euch einfach hier oder per PN!'),
        P('mehmet', 60, 'Bin auch BWL im 3. Semester und donnerstags nachmittags meistens in der Bib. Schreib mir gern eine PN!'),
        P('jonas', 42, 'Cool, hab dir geschrieben.')] },
      { id: 3, board: 'STAT2', type: 'frage', title: 'Unterschied zwischen t-Test und z-Test?', views: 154, posts: [
        P('clara', 300, 'Ich verstehe nicht, wann ich in der Klausur den t-Test und wann den z-Test nehmen soll. Kann mir das jemand einfach erklären?'),
        P('mia', 250, '> clara.h schrieb:\n> wann ich in der Klausur den t-Test und wann den z-Test nehmen soll\n\nFaustregel: Kennst du die Varianz der Grundgesamtheit, nimmst du den z-Test. Musst du sie aus der Stichprobe schätzen, nimmst du den t-Test. Bei großen Stichproben (n > 30) sind beide fast gleich.'),
        P('clara', 230, 'Danke, jetzt hab ich es verstanden!')] },
      { id: 4, board: 'STAT2', type: 'gruppe', session: 's1', title: 'Altklausuren WiSe 25/26 durchrechnen, noch Plätze frei', views: 201, posts: [
        P('aylin', 1500, 'Wir rechnen gemeinsam die Altklausur vom letzten Wintersemester durch. Bringt bitte Taschenrechner und Formelsammlung mit. Anmeldung über den Button unten.')] },
      { id: 5, board: 'MIKRO', type: 'buddy', title: 'Mikro I wiederholen: Wer lernt vormittags mit?', views: 73, posts: [
        P('noah', 2900, 'Ich schreibe Mikro I zur Notenverbesserung noch einmal und suche jemanden für Montag, Mittwoch oder Freitag vormittags. Ich kenne die typischen Klausurfallen und erkläre die gern.'),
        P('aylin', 2600, 'Ich wäre freitags vormittags dabei!')] },
      { id: 6, board: 'MIKRO', type: 'frage', title: 'Übungsblatt 5, Aufgabe 3: Haushaltsoptimum mit Lagrange', views: 132, posts: [
        P('jonas', 600, 'Bei Aufgabe 3 komme ich nach dem Ableiten nicht weiter. Muss ich die beiden Bedingungen gleichsetzen?'),
        P('noah', 520, 'Genau. Teil die ersten beiden Bedingungen durcheinander, dann fällt Lambda raus und du bekommst Grenzrate der Substitution = Preisverhältnis. Das setzt du dann in die Budgetgerade ein.')] },
      { id: 7, board: 'MIKRO', type: 'gruppe', session: 's2', title: 'Übungsblatt 5 gemeinsam online besprechen', views: 64, posts: [
        P('jonas', 800, 'Wir gehen Übungsblatt 5 zusammen durch. Den Link zum Videocall schicke ich allen, die sich anmelden.')] },
      { id: 8, board: 'KLR', type: 'buddy', title: 'Feste Lerngruppe für KLR bis zur Klausur', views: 58, posts: [
        P('mehmet', 4300, 'Suche 2–3 Leute für eine feste Lerngruppe in KLR. Treffen einmal pro Woche in der Bib, ich habe alle Altklausuren seit 2022.'),
        P('sophie', 4000, 'Ich kann als Tutorin ab und zu dazukommen, wenn ihr Fragen sammelt.')] },
      { id: 9, board: 'KLR', type: 'frage', title: 'Deckungsbeitrag vs. Betriebsergebnis: wo ist der Unterschied?', views: 240, posts: [
        P('paul', 7000, 'Ich bringe die beiden Begriffe ständig durcheinander. Hat jemand eine einfache Erklärung?'),
        P('sophie', 6800, 'Deckungsbeitrag = Umsatz minus variable Kosten. Er zeigt, was ein Produkt zur Deckung der Fixkosten beiträgt.\n\nBetriebsergebnis = Summe aller Deckungsbeiträge minus Fixkosten. Erst hier siehst du Gewinn oder Verlust.')] },
      { id: 10, board: 'KLR', type: 'gruppe', session: 's3', title: 'Karteikarten abfragen, Kapitel 3 bis 5', views: 47, posts: [
        P('sophie', 3000, 'Kleine Runde in der Mensa: Wir fragen uns gegenseitig die Begriffe aus Kapitel 3 bis 5 ab. Karteikarten bringe ich mit.')] },
      { id: 11, board: 'LINA', type: 'gruppe', session: 's4', title: 'Eigenwerte gemeinsam verstehen', views: 91, posts: [
        P('mia', 5000, 'Eigenwerte und Eigenvektoren mit vielen Beispielen. Wir rechnen an der Tafel im Lernraum.')] },
      { id: 12, board: 'PROG', type: 'buddy', title: 'Tausch: Ich erkläre Statistik, du hilfst mir bei Java', views: 102, posts: [
        P('mia', 1800, 'Mathe liegt mir, Programmieren eher nicht. Wer hat Lust auf einen Tausch? Ich helfe bei Statistik, du bei Java.'),
        P('paul', 1700, 'Deal! Java kann ich gut, Statistik gar nicht.')] },
      { id: 13, board: 'PSY', type: 'buddy', title: 'Ersti sucht Lernpartner für Psychologie-Grundlagen', views: 39, posts: [
        P('clara', 900, 'Hallo! Ich bin im ersten Semester und suche jemanden, mit dem ich die Grundbegriffe abfragen kann. Gern online oder in der Mensa.')] },
      { id: 14, board: 'PSY', type: 'gruppe', session: 's5', title: 'Lernpsychologie: Begriffe abfragen', views: 22, posts: [
        P('clara', 950, 'Online-Runde, wir fragen uns die Begriffe aus der Vorlesung zur Lernpsychologie ab.')] },
      { id: 15, board: 'MAKRO', type: 'frage', title: 'IS-LM-Modell: Wer hat eine gute Zusammenfassung?', views: 118, posts: [
        P('noah', 10000, 'Hat jemand eine gute Zusammenfassung zum IS-LM-Modell? Die Folien sind leider sehr knapp.')] },
      { id: 16, board: 'MARK', type: 'info', title: 'Fallstudien aus der Vorlesung: Lösungsideen sammeln', views: 77, posts: [
        P('sophie', 12000, 'Hier können wir Lösungsideen zu den Fallstudien sammeln. Bitte keine kompletten Lösungen posten, sondern Ansätze.')] },
      { id: 17, board: 'CAMPUS', type: 'frage', title: 'Wo lernt ihr am liebsten auf dem Campus?', views: 310, posts: [
        P('paul', 1300, 'Ich suche einen ruhigen Ort zum Lernen, an dem man auch mal reden darf. Tipps?'),
        P('aylin', 1200, 'Bib 2. OG für ruhiges Lernen. Zum Reden sind die Gruppenräume gut, die kann man online buchen.'),
        P('jonas', 1100, 'Mensa nach 14 Uhr, dann ist es fast leer.')] },
      { id: 18, board: 'HALLO', type: 'info', sticky: true, title: 'Stell dich kurz vor!', views: 890, posts: [
        P('sophie', 60 * 24 * 40, 'Neu hier? Schreib kurz, was du studierst und welche Kurse du dieses Semester hast.'),
        P('clara', 60 * 24 * 20, 'Hi, ich bin Clara, 1. Semester Psychologie. Ich suche vor allem Leute für Statistik!')] },
    ],
    sessions: [
      { id: 's1', thread: 4, course: 'STAT2', title: 'Altklausuren WiSe 25/26 durchrechnen', date: isoIn(3), from: '14:00', to: '16:00', place: 'Bibliothek, Gruppenraum 2.04', host: 'aylin', seats: 5, taken: 2, joined: false },
      { id: 's2', thread: 7, course: 'MIKRO', title: 'Übungsblatt 5 gemeinsam online besprechen', date: isoIn(2), from: '18:00', to: '19:30', place: 'Online, Link nach Anmeldung', host: 'jonas', seats: 4, taken: 3, joined: false },
      { id: 's3', thread: 10, course: 'KLR', title: 'Karteikarten abfragen, Kapitel 3 bis 5', date: isoIn(4), from: '10:00', to: '11:30', place: 'Mensa, hinterer Bereich', host: 'sophie', seats: 3, taken: 2, joined: true },
      { id: 's4', thread: 11, course: 'LINA', title: 'Eigenwerte gemeinsam verstehen', date: isoIn(1), from: '16:00', to: '18:00', place: 'Lernraum Campus, R 112', host: 'mia', seats: 4, taken: 4, joined: false },
      { id: 's5', thread: 14, course: 'PSY', title: 'Lernpsychologie: Begriffe abfragen', date: isoIn(5), from: '17:00', to: '18:00', place: 'Online, Link nach Anmeldung', host: 'clara', seats: 4, taken: 1, joined: false },
    ],
    convs: [
      { id: 'c1', with: 'sophie', subject: 'Lerntreffen am Freitag', unread: false, msgs: [
        { me: false, t: ago(60 * 20), text: 'Hey, steht Freitag 10 Uhr in der Mensa?' },
        { me: true, t: ago(60 * 19), text: 'Ja! Ich bringe die Zusammenfassung zu Kapitel 4 mit.' },
        { me: false, t: ago(60 * 18), text: 'Super, dann machen wir danach die Deckungsbeitragsrechnung.' }] },
    ],
    requestsIn: [
      { id: 'mehmet', t: ago(130), text: 'Hi! Wir sitzen beide in Statistik II. Hast du Lust, donnerstags nach der Vorlesung zusammen die Übungsblätter zu machen?' },
      { id: 'clara', t: ago(60 * 5), text: 'Hallo! Ich bin im ersten Semester und suche jemanden, der mit mir Statistik-Karteikarten durchgeht.' },
    ],
    requestsOut: { aylin: { t: ago(60 * 26), text: 'Hi Aylin, hast du Lust, dienstags vormittags zusammen Statistik zu machen?' } },
    buddies: ['sophie'],
    extraKudos: {},
  });

  // ===========================================================================
  // Speicherung (nur im Browser)
  // ===========================================================================
  const KEY = 'studybuddy:forum-v1';
  function load() { try { const r = localStorage.getItem(KEY); if (r) return JSON.parse(r); } catch (e) { /* egal */ } return null; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch (e) { /* egal */ } }
  let db = load() || seed();

  const ui = {
    route: 'start', param: null,
    boardFilter: 'all', boardSort: 'last',
    mCourse: 'mine', mStyle: '', mPlace: '', mOnline: false,
    groupTab: 'all',
    box: 'inbox', conv: null,
    q: '', confirmReset: false, newTopicBoard: null,
  };

  // ===========================================================================
  // Hilfsfunktionen
  // ===========================================================================
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id) => `<svg aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const initials = (n) => (n || '?').trim().split(/\s+/).map((p) => p[0]).join('').slice(0, 2).toUpperCase();
  const user = (id) => (id === 'me' ? { ...db.me, id: 'me', av: 'av3', online: true, posts: myPostCount() } : USERS.find((u) => u.id === id));
  const first = (n) => (n || '').trim().split(/\s+/)[0] || '';
  const courseName = (c) => COURSES[c]?.name || c;
  const slotLabel = (s) => { const [d, t] = s.split('-'); return `${d} ${TIMES[t]}`; };
  const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
  const boardHash = (b) => `#kurs-${b.toLowerCase()}`;
  const threadById = (id) => db.threads.find((t) => t.id === +id);
  const lastPost = (t) => t.posts[t.posts.length - 1];
  const myPostCount = () => 12 + db.threads.reduce((n, t) => n + t.posts.filter((p) => p.author === 'me').length, 0);

  function rankOf(u) {
    if (u.rank) return u.rank;
    const n = u.posts || 0;
    return n < 10 ? 'Ersti' : n < 50 ? 'Mitglied' : n < 200 ? 'Stammgast' : 'Lernprofi';
  }
  function fmtT(t) {
    const d = new Date(t), diff = (now() - t) / 60000;
    const hm = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    if (diff < 1) return 'gerade eben';
    if (diff < 60) return `vor ${Math.round(diff)} Min.`;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    if (t >= today.getTime()) return `heute, ${hm}`;
    if (t >= today.getTime() - 86400000) return `gestern, ${hm}`;
    return `${d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })}, ${hm}`;
  }
  const fmtDate = (iso, o) => new Date(iso + 'T00:00:00').toLocaleDateString('de-DE', o);
  function daysUntil(iso) { const t = new Date(); t.setHours(0, 0, 0, 0); return Math.round((new Date(iso + 'T00:00:00') - t) / 86400000); }
  function seenText(u) {
    if (u.id === 'me' || u.online) return '<span class="online-dot"></span>online';
    return `<span class="offline-dot"></span>zuletzt ${fmtT(ago(u.seen || 600)).replace('heute, ', 'heute ')}`;
  }

  // Beitragstext: Zeilen mit "> " werden Zitate, Leerzeilen trennen Absätze.
  function fmtText(s) {
    const blocks = String(s).split(/\n{2,}/);
    return blocks.map((b) => {
      const lines = b.split('\n');
      if (lines.every((l) => l.startsWith('>'))) return `<blockquote>${lines.map((l) => esc(l.replace(/^>\s?/, ''))).join('<br>')}</blockquote>`;
      return `<p>${lines.map(esc).join('<br>')}</p>`;
    }).join('');
  }

  const av = (u, size = '') => `<span class="av ${size} ${u.av}" aria-hidden="true">${initials(u.name)}</span>`;
  const userLink = (id) => {
    const u = user(id);
    return id === 'me' ? `<a href="#profil"><b>${esc(u.nick)}</b></a>` : `<a href="#nutzer-${id}"><b>${esc(u.nick)}</b></a>`;
  };
  const prefix = (type) => `<span class="prefix ${TYPES[type].cls}">${TYPES[type].label}</span>`;

  // Passung zwischen mir und einer Person
  function matchInfo(u) {
    const me = db.me;
    const shared = u.courses.filter((c) => me.courses.includes(c));
    const sharedPlaces = u.places.filter((x) => me.places.includes(x));
    const sharedSlots = u.avail.filter((s) => me.avail.includes(s));
    let score = 20 + Math.min(shared.length * 22, 44) + (u.style === me.style ? 14 : 0) + Math.min(sharedPlaces.length * 6, 10) + Math.min(sharedSlots.length * 5, 15) + (u.semester === me.semester ? 4 : 0);
    if (!shared.length) score = Math.min(score, 45);
    score = Math.max(10, Math.min(98, score));
    const reasons = [];
    if (shared.length) reasons.push(`Ihr belegt beide ${shared.map(courseName).join(' und ')}.`);
    if (sharedSlots.length) reasons.push(`Ihr habt gleichzeitig Zeit: ${sharedSlots.map(slotLabel).join(', ')}.`);
    if (u.style === me.style) reasons.push(`Gleicher Lernstil: ${STYLES[u.style]}.`);
    if (sharedPlaces.length) reasons.push(`Ihr lernt beide gern hier: ${sharedPlaces.map((x) => PLACES[x]).join(', ')}.`);
    if (u.semester === me.semester) reasons.push(`Ihr seid beide im ${u.semester}. Semester.`);
    return { score, shared, sharedSlots, reasons };
  }
  const matchCls = (s) => (s >= 75 ? 'hi' : s >= 50 ? 'mid' : 'low');
  const matchHtml = (s) => `<span class="match ${matchCls(s)}">${s}%<span class="meter" aria-hidden="true"><i style="width:${s}%"></i></span></span>`;

  function relation(id) {
    if (db.buddies.includes(id)) return 'buddy';
    if (db.requestsIn.some((r) => r.id === id)) return 'incoming';
    if (db.requestsOut[id]) return 'sent';
    return 'none';
  }
  function buddyButton(id, small = true) {
    const s = small ? 'btn-sm' : '';
    switch (relation(id)) {
      case 'buddy': return `<span class="tag hl">Dein Buddy</span>`;
      case 'incoming': return `<button class="btn ${s} btn-good" data-act="accept" data-id="${id}">Anfrage annehmen</button>`;
      case 'sent': return `<button class="btn ${s}" disabled>Angefragt</button>`;
      default: return `<button class="btn ${s} btn-primary" data-act="ask" data-id="${id}">Als Buddy anfragen</button>`;
    }
  }

  function profileChecks() {
    const me = db.me;
    return [
      { ok: !!me.name.trim() && !!me.nick.trim(), label: 'Name und Benutzername' },
      { ok: me.courses.length > 0, label: 'Mindestens ein Kurs' },
      { ok: me.avail.length >= 3, label: 'Mindestens 3 freie Zeiten' },
      { ok: me.places.length > 0, label: 'Lernstil und Lernorte' },
      { ok: me.bio.trim().length >= 20, label: 'Kurzer Text über dich' },
    ];
  }
  const completeness = () => { const c = profileChecks(); return Math.round(c.filter((x) => x.ok).length / c.length * 100); };
  const unreadCount = () => db.convs.filter((c) => c.unread).length;
  const mailCount = () => (db.loggedIn ? unreadCount() + db.requestsIn.length : 0);

  let toastTimer;
  function toast(msg, action) {
    const t = $('#toast');
    t.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ''}`;
    t.hidden = false;
    if (action) t.querySelector('button').onclick = () => { t.hidden = true; action.fn(); };
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, action ? 6500 : 3200);
  }
  const go = (hash) => { if (location.hash === hash) route(); else location.hash = hash; };

  // ===========================================================================
  // Routing
  // ===========================================================================
  const NAV = [
    { hash: '#start', label: 'Forum', icon: 'home', match: ['start', 'kurs', 'thema', 'neues-thema', 'suche'] },
    { hash: '#mitglieder', label: 'Lernpartner finden', icon: 'users', match: ['mitglieder', 'nutzer'] },
    { hash: '#lerngruppen', label: 'Lerngruppen', icon: 'cal', match: ['lerngruppen'] },
    { hash: '#nachrichten', label: 'Nachrichten', icon: 'mail', match: ['nachrichten'] },
    { hash: '#hilfe', label: 'Hilfe', icon: 'help', match: ['hilfe'] },
  ];

  function parseHash() {
    const h = location.hash.slice(1);
    let m;
    if ((m = h.match(/^kurs-([a-z0-9]+)$/)) && BOARDS[m[1].toUpperCase()]) return ['kurs', m[1].toUpperCase()];
    if ((m = h.match(/^thema-(\d+)$/)) && threadById(m[1])) return ['thema', +m[1]];
    if ((m = h.match(/^nutzer-([a-z]+)$/)) && user(m[1]) && m[1] !== 'me') return ['nutzer', m[1]];
    if (['mitglieder', 'lerngruppen', 'nachrichten', 'hilfe', 'profil', 'neues-thema', 'suche'].includes(h)) return [h, null];
    return ['start', null];
  }

  function route() {
    const [r, p] = parseHash();
    const changed = r !== ui.route || p !== ui.param;
    ui.route = r; ui.param = p;
    if (r === 'thema' && changed) {
      const t = threadById(p);
      t.views++;
      if (!db.read.includes(t.id)) db.read.push(t.id);
    }
    if (r === 'nachrichten' && changed) { ui.conv = ui.pendingConv || null; ui.pendingConv = null; }
    ui.confirmReset = false;
    closeModal(true);
    render();
    if (changed) window.scrollTo(0, 0);
  }

  // ===========================================================================
  // Rahmen
  // ===========================================================================
  function renderChrome() {
    const n = mailCount();
    $('#nav-main').innerHTML = NAV.map((x) => `<a href="${x.hash}" ${x.match.includes(ui.route) ? 'aria-current="page"' : ''}>${icon(x.icon)}${x.label}${x.hash === '#nachrichten' && n ? ` <span class="count" aria-label="${n} neu">${n}</span>` : ''}</a>`).join('');
    $('#nav-user').innerHTML = db.loggedIn
      ? `<a href="#profil" ${ui.route === 'profil' ? 'aria-current="page"' : ''}>${icon('user')}${esc(db.me.nick)}</a><button class="navlink" data-act="logout">Abmelden</button>`
      : `<button class="navlink" data-act="login">Anmelden</button><button class="navlink" data-act="register">Registrieren</button>`;
  }

  function crumbs(items) {
    const all = [['#start', 'Study Buddy'], ...items];
    $('#crumbs').innerHTML = all.map(([h, l], i) => (h && i < all.length - 1 ? `<a href="${h}">${esc(l)}</a>` : `<span>${esc(l)}</span>`)).join('<span class="sep" aria-hidden="true">›</span>');
  }

  const title = (h, text = '', actions = '') => `<div class="page-title"><div><h1>${h}</h1>${text ? `<p>${text}</p>` : ''}</div>${actions ? `<div class="btn-row">${actions}</div>` : ''}</div>`;

  function loginGate(what) {
    return `<div class="box"><div class="empty">
      <h2>Bitte melde dich an</h2>
      <p>${what}</p>
      <div class="btn-row"><button class="btn btn-primary" data-act="login">Anmelden</button><button class="btn" data-act="register">Registrieren</button></div>
    </div></div>`;
  }

  // ===========================================================================
  // Seitenleiste
  // ===========================================================================
  function sideLatest() {
    const list = db.threads.filter((t) => t.type === 'buddy').sort((a, b) => b.posts[0].t - a.posts[0].t).slice(0, 5);
    return `<div class="box"><div class="box-head">Neue Gesuche</div>
      ${list.map((t) => `<div class="box-body" style="gap:2px"><a href="#thema-${t.id}"><b>${esc(t.title)}</b></a><span class="xs muted">${esc(BOARDS[t.board].name)} · ${fmtT(t.posts[0].t)}</span></div>`).join('')}
    </div>`;
  }
  function sideExams() {
    if (!db.loggedIn) return '';
    const ex = db.me.courses.map((c) => ({ c, d: daysUntil(COURSES[c].exam) })).filter((e) => e.d >= 0).sort((a, b) => a.d - b.d);
    return `<div class="box"><div class="box-head">Deine Klausuren</div><div class="box-body">
      ${ex.length ? ex.map(({ c, d }) => `<div class="exam ${d <= 60 ? 'soon' : ''}"><span>${esc(courseName(c))}<br><span class="xs muted">${fmtDate(COURSES[c].exam, { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}</span></span><b>in ${d} Tagen</b></div>`).join('') : '<span class="muted">Trag im persönlichen Bereich deine Kurse ein.</span>'}
    </div></div>`;
  }
  function sideOnline() {
    const on = USERS.filter((u) => u.online);
    const names = [...(db.loggedIn ? [`<a href="#profil">${esc(db.me.nick)}</a>`] : []), ...on.map((u) => `<a href="#nutzer-${u.id}">${esc(u.nick)}</a>`)];
    return `<div class="box"><div class="box-head">Wer ist online?</div><div class="box-body who-online">
      <span>${plural(names.length, 'Mitglied', 'Mitglieder')} online: ${names.join(', ')}</span>
    </div></div>`;
  }
  function sideStats() {
    const posts = db.threads.reduce((n, t) => n + t.posts.length, 0);
    return `<div class="box"><div class="box-head">Statistik</div><div class="box-body"><dl class="stats">
      <dt>Themen</dt><dd>${db.threads.length}</dd><dt>Beiträge</dt><dd>${posts}</dd><dt>Mitglieder</dt><dd>${USERS.length + (db.loggedIn ? 1 : 0)}</dd>
      <dt>Neuestes Mitglied</dt><dd><a href="#nutzer-clara">clara.h</a></dd>
    </dl></div></div>`;
  }

  // ===========================================================================
  // Seite: Forum-Startseite
  // ===========================================================================
  function boardRow(key) {
    const b = BOARDS[key];
    const threads = db.threads.filter((t) => t.board === key);
    const posts = threads.reduce((n, t) => n + t.posts.length, 0);
    const latest = threads.slice().sort((a, b2) => lastPost(b2).t - lastPost(a).t)[0];
    const hasNew = db.loggedIn && threads.some((t) => !db.read.includes(t.id));
    const mine = db.loggedIn && db.me.courses.includes(key);
    return `<tr>
      <td class="w-icon"><span class="status-icon ${hasNew ? 'new' : ''}" title="${hasNew ? 'Neue Beiträge' : 'Keine neuen Beiträge'}">${icon(hasNew ? 'topic-new' : 'board')}</span></td>
      <td><a class="title" href="${boardHash(key)}">${esc(b.name)}</a>${mine ? '<span class="mine-star" title="Dein Kurs">★</span>' : ''}<div class="sub">${esc(b.desc)}</div>
        <div class="inline-meta">${plural(threads.length, 'Thema', 'Themen')} · ${plural(posts, 'Beitrag', 'Beiträge')}</div></td>
      <td class="w-num hide-sm">${threads.length}</td>
      <td class="w-num hide-sm">${posts}</td>
      <td class="w-last hide-sm">${latest ? `<div class="last-post"><a class="t" href="#thema-${latest.id}">${esc(latest.title)}</a>von ${userLink(lastPost(latest).author)}<br><span class="muted">${fmtT(lastPost(latest).t)}</span></div>` : '<span class="muted xs">Noch keine Beiträge</span>'}</td>
    </tr>`;
  }

  function viewStart() {
    crumbs([['#start', 'Forum']]);
    const me = db.me;
    const top = db.loggedIn ? `
      <div class="box"><div class="welcome-back">
        <div><b>Willkommen zurück, ${esc(first(me.name))}!</b><br><span class="small muted">${db.requestsIn.length ? `Du hast ${plural(db.requestsIn.length, 'neue Buddy-Anfrage', 'neue Buddy-Anfragen')}` : 'Keine neuen Buddy-Anfragen'} und ${plural(unreadCount(), 'ungelesene Nachricht', 'ungelesene Nachrichten')}.</span></div>
        <div class="btn-row"><a class="btn" href="#nachrichten">Zu den Nachrichten</a><a class="btn btn-primary" href="#neues-thema">${icon('plus')}Neues Thema</a></div>
      </div></div>` : `
      <div class="box welcome">
        <div class="intro">
          <h1>Finde Lernpartner in deinen Kursen</h1>
          <p>Study Buddy ist das Forum für alle, die nicht allein lernen wollen. Such in deinem Kurs nach Lernpartnern, stell Fragen zum Stoff oder tritt einer Lerngruppe bei.</p>
          <div class="btn-row"><button class="btn btn-primary" data-act="register">Kostenlos registrieren</button><button class="btn" data-act="demo">Demo-Zugang ansehen</button></div>
          <span class="xs muted">Lesen geht auch ohne Konto. Zum Schreiben brauchst du eine Uni-Mail.</span>
        </div>
        <div class="how">
          <h2>So funktioniert's</h2>
          <ol>
            <li><b>Registrieren</b> und Kurse, freie Zeiten und Lernstil angeben.</li>
            <li><b>Im Kursforum</b> ein Gesuch mit „Suche Buddy“ posten oder auf eines antworten.</li>
            <li><b>Buddy-Anfrage senden.</b> Nimmt die Person an, schreibt ihr euch per Nachricht und macht einen Termin aus.</li>
          </ol>
        </div>
      </div>`;
    const cats = CATEGORIES.map((c) => `
      <section class="box">
        <div class="box-head"><span>${esc(c.name)}</span></div>
        <div class="tbl-wrap"><table class="tbl">
          <thead><tr><th class="w-icon"><span class="sr-only">Status</span></th><th>Forum</th><th class="w-num hide-sm">Themen</th><th class="w-num hide-sm">Beiträge</th><th class="w-last hide-sm">Letzter Beitrag</th></tr></thead>
          <tbody>${c.boards.map(boardRow).join('')}</tbody>
        </table></div>
      </section>`).join('');
    return `<div class="stack">${top}
      <div class="layout">
        <div class="stack">${cats}
          <p class="xs muted">${icon('topic-new').replace('<svg', '<svg width="14" height="14" style="color:var(--unread);vertical-align:-2px"')} Neue Beiträge seit deinem letzten Besuch · ★ Dein Kurs</p>
        </div>
        <aside class="stack side" aria-label="Übersicht">${sideLatest()}${sideExams()}${sideOnline()}${sideStats()}</aside>
      </div></div>`;
  }

  // ===========================================================================
  // Seite: Unterforum (Kurs)
  // ===========================================================================
  function threadRow(t, showBoard = false) {
    const lp = lastPost(t);
    const isNew = db.loggedIn && !db.read.includes(t.id);
    const ic = t.sticky ? 'pin' : isNew ? 'topic-new' : 'topic';
    return `<tr class="${t.sticky ? 'sticky' : ''}">
      <td class="w-icon"><span class="status-icon ${t.sticky ? 'pin' : isNew ? 'new' : ''}" title="${t.sticky ? 'Angepinnt' : isNew ? 'Ungelesen' : 'Gelesen'}">${icon(ic)}</span></td>
      <td>${prefix(t.type)}<a class="title" href="#thema-${t.id}">${esc(t.title)}</a>
        <div class="sub">von ${userLink(t.posts[0].author)} » ${fmtT(t.posts[0].t)}${showBoard ? ` · in <a href="${boardHash(t.board)}">${esc(BOARDS[t.board].name)}</a>` : ''}</div>
        <div class="inline-meta">${plural(t.posts.length - 1, 'Antwort', 'Antworten')} · letzter Beitrag ${fmtT(lp.t)}</div></td>
      <td class="w-num hide-sm">${t.posts.length - 1}</td>
      <td class="w-num hide-sm">${t.views}</td>
      <td class="w-last hide-sm"><div class="last-post">von ${userLink(lp.author)}<br><span class="muted">${fmtT(lp.t)}</span></div></td>
    </tr>`;
  }
  const threadTable = (list, showBoard) => `<div class="tbl-wrap"><table class="tbl">
      <thead><tr><th class="w-icon"><span class="sr-only">Status</span></th><th>Thema</th><th class="w-num hide-sm">Antworten</th><th class="w-num hide-sm">Zugriffe</th><th class="w-last hide-sm">Letzter Beitrag</th></tr></thead>
      <tbody>${list.map((t) => threadRow(t, showBoard)).join('')}</tbody></table></div>`;

  function viewBoard(key) {
    const b = BOARDS[key];
    crumbs([['#start', 'Forum'], [null, b.name]]);
    let list = db.threads.filter((t) => t.board === key);
    const counts = Object.fromEntries(Object.keys(TYPES).map((k) => [k, list.filter((t) => t.type === k).length]));
    if (ui.boardFilter !== 'all') list = list.filter((t) => t.type === ui.boardFilter);
    const sorters = { last: (a, c) => lastPost(c).t - lastPost(a).t, new: (a, c) => c.posts[0].t - a.posts[0].t, replies: (a, c) => c.posts.length - a.posts.length };
    list.sort((a, c) => (c.sticky ? 1 : 0) - (a.sticky ? 1 : 0) || sorters[ui.boardSort](a, c));
    const exam = COURSES[key] ? `Klausur am ${fmtDate(COURSES[key].exam, { day: '2-digit', month: '2-digit', year: 'numeric' })} · ${COURSES[key].code}` : b.desc;
    const seg = [['all', 'Alle', list.length], ...Object.entries(TYPES).map(([k, v]) => [k, v.label, counts[k]])];
    return `
      ${title(esc(b.name), esc(exam), `<a class="btn btn-primary" href="#neues-thema" data-act="new-topic" data-id="${key}">${icon('plus')}Neues Thema</a>`)}
      <div class="stack-sm">
        <div class="toolbar">
          <div class="seg" role="group" aria-label="Nach Art filtern">${seg.map(([k, l, n]) => `<button aria-pressed="${ui.boardFilter === k}" data-act="board-filter" data-id="${k}">${l}${k !== 'all' ? ` <span class="xs">${n}</span>` : ''}</button>`).join('')}</div>
          <div class="field"><label class="sr-only" for="b-sort">Sortieren</label>
            <select id="b-sort" data-ui="boardSort"><option value="last" ${ui.boardSort === 'last' ? 'selected' : ''}>Letzter Beitrag zuerst</option><option value="new" ${ui.boardSort === 'new' ? 'selected' : ''}>Neueste Themen zuerst</option><option value="replies" ${ui.boardSort === 'replies' ? 'selected' : ''}>Meiste Antworten</option></select></div>
        </div>
        <section class="box">
          <div class="box-head"><span>Themen</span><span class="xs">${plural(list.length, 'Thema', 'Themen')}</span></div>
          ${list.length ? threadTable(list) : `<div class="empty"><b>Hier gibt es noch keine Themen dieser Art.</b><span>Mach den Anfang und eröffne ein neues Thema.</span><a class="btn btn-primary" href="#neues-thema" data-act="new-topic" data-id="${key}">Neues Thema</a></div>`}
        </section>
      </div>`;
  }

  // ===========================================================================
  // Seite: Thema
  // ===========================================================================
  function authorBox(id) {
    const u = user(id);
    return `<div class="author">
      ${av(u, 'lg')}
      <div><a class="nick" href="${id === 'me' ? '#profil' : `#nutzer-${id}`}">${esc(u.nick)}</a><div class="rank">${esc(rankOf(u))}</div></div>
      <dl><dt>Studium</dt><dd>${esc(u.study.replace(' (B.Sc.)', ''))}, ${u.semester}. Sem.</dd><dt>Beiträge</dt><dd class="num">${u.posts}</dd><dt>Dabei seit</dt><dd>${esc(u.joined)}</dd><dt>Status</dt><dd>${seenText(u)}</dd></dl>
    </div>`;
  }

  function detailsPanel(t) {
    const authorId = t.posts[0].author;
    if (t.type === 'buddy' && authorId !== 'me') {
      const u = user(authorId);
      const m = db.loggedIn ? matchInfo(u) : null;
      return `<div class="details-panel">
        <b>Gesuch von ${esc(u.nick)}</b>
        <dl>
          <dt>Kurse</dt><dd>${u.courses.map((c) => `<span class="tag ${m && m.shared.includes(c) ? 'hl' : ''}">${esc(courseName(c))}</span>`).join(' ')}</dd>
          <dt>Freie Zeiten</dt><dd>${u.avail.map(slotLabel).join(', ')}</dd>
          <dt>Lernort</dt><dd>${u.places.map((x) => PLACES[x]).join(', ')}</dd>
          <dt>Lernstil</dt><dd>${STYLES[u.style]}</dd>
          ${m ? `<dt>Passt zu dir</dt><dd>${matchHtml(m.score)}</dd>` : ''}
        </dl>
        ${m && m.reasons.length ? `<ul class="reasons">${m.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>` : ''}
        <div class="btn-row">${db.loggedIn ? buddyButton(authorId, false) : '<button class="btn btn-primary" data-act="login">Anmelden, um anzufragen</button>'}<a class="btn" href="#nutzer-${authorId}">Profil ansehen</a></div>
      </div>`;
    }
    if (t.type === 'gruppe' && t.session) {
      const s = db.sessions.find((x) => x.id === t.session);
      if (!s) return '';
      const full = s.taken >= s.seats && !s.joined;
      return `<div class="details-panel">
        <b>Termin</b>
        <dl>
          <dt>Wann</dt><dd>${fmtDate(s.date, { weekday: 'long', day: 'numeric', month: 'long' })}, ${s.from}–${s.to} Uhr</dd>
          <dt>Wo</dt><dd>${esc(s.place)}</dd>
          <dt>Plätze</dt><dd class="num">${s.taken} von ${s.seats} belegt${full ? ' · ausgebucht' : ''}</dd>
        </dl>
        <div class="btn-row">${sessionButton(s, false)}</div>
      </div>`;
    }
    return '';
  }

  function viewThread(id) {
    const t = threadById(id);
    crumbs([['#start', 'Forum'], [boardHash(t.board), BOARDS[t.board].name], [null, t.title]]);
    const posts = t.posts.map((p, i) => {
      const u = user(p.author);
      return `<article class="post ${i === 0 ? 'first' : ''}" id="post-${i}">
        ${authorBox(p.author)}
        <div class="post-body">
          <div class="post-meta"><span>${i === 0 ? '<b>Eröffnungsbeitrag</b> · ' : ''}${fmtT(p.t)}</span><span>#${i + 1}</span></div>
          <div class="post-text">${fmtText(p.text)}</div>
          ${i === 0 ? detailsPanel(t) : ''}
          ${u.sig ? `<div class="signature">${esc(u.sig)}</div>` : ''}
          <div class="post-actions">
            ${db.loggedIn && p.author !== 'me' ? `<button class="btn btn-sm" data-act="pm" data-id="${p.author}">Nachricht</button>` : ''}
            <button class="btn btn-sm" data-act="quote" data-i="${i}">${icon('reply')}Zitieren</button>
          </div>
        </div>
      </article>`;
    }).join('');
    const reply = db.loggedIn ? `
      <section class="box" id="reply-box">
        <div class="box-head">Antworten</div>
        <form class="box-body" id="reply-form">
          <div class="field"><label for="reply-text">Deine Antwort</label><textarea id="reply-text" placeholder="Schreib etwas Hilfreiches. Mit „Zitieren“ übernimmst du einen Beitrag."></textarea>
          <span class="hint">Leerzeile = neuer Absatz. Zeilen mit „&gt;“ am Anfang werden als Zitat angezeigt.</span></div>
          <p class="error" id="reply-error" hidden>Deine Antwort ist noch leer.</p>
          <div class="btn-row" style="justify-content:flex-end"><button class="btn btn-primary">Antwort absenden</button></div>
        </form>
      </section>` : `<div class="box"><div class="welcome-back"><div><b>Du möchtest antworten?</b><br><span class="small muted">Melde dich an oder registriere dich. Das dauert keine zwei Minuten.</span></div><div class="btn-row"><button class="btn" data-act="login">Anmelden</button><button class="btn btn-primary" data-act="register">Registrieren</button></div></div></div>`;
    return `
      ${title(`${prefix(t.type)}${esc(t.title)}`, `${plural(t.posts.length - 1, 'Antwort', 'Antworten')} · ${t.views} Zugriffe · in <a href="${boardHash(t.board)}">${esc(BOARDS[t.board].name)}</a>`, `<button class="btn btn-primary" data-act="to-reply">${icon('reply')}Antworten</button>`)}
      <div class="stack">
        <div>${posts}</div>
        ${reply}
        <div><a href="${boardHash(t.board)}">‹ Zurück zu ${esc(BOARDS[t.board].name)}</a></div>
      </div>`;
  }

  // ===========================================================================
  // Seite: Neues Thema
  // ===========================================================================
  function viewNewTopic() {
    crumbs([['#start', 'Forum'], [null, 'Neues Thema']]);
    if (!db.loggedIn) return title('Neues Thema') + loginGate('Um ein Thema zu eröffnen, brauchst du ein Konto.');
    const sel = ui.newTopicBoard || db.me.courses[0] || 'STAT2';
    return `
      ${title('Neues Thema eröffnen', 'Such einen Lernpartner, stell eine Frage oder teile etwas mit deinem Kurs.')}
      <section class="box">
        <div class="box-head">Thema verfassen</div>
        <form class="box-body" id="topic-form" novalidate>
          <div class="form-grid">
            <div class="field"><label for="nt-board">Forum</label><select id="nt-board">${CATEGORIES.map((c) => `<optgroup label="${esc(c.name)}">${c.boards.map((b) => `<option value="${b}" ${b === sel ? 'selected' : ''}>${esc(BOARDS[b].name)}</option>`).join('')}</optgroup>`).join('')}</select></div>
          </div>
          <div class="field"><span class="field-label">Art des Themas</span>
            <div class="choices">${Object.entries(TYPES).filter(([k]) => k !== 'gruppe').map(([k, v], i) => `<label class="choice"><input type="radio" name="nt-type" value="${k}" ${i === 0 ? 'checked' : ''}>${v.label}</label>`).join('')}</div>
            <span class="hint">Für Lerngruppen mit festem Termin nutze bitte <a href="#lerngruppen">Lerngruppen › Lerngruppe eintragen</a>.</span>
          </div>
          <div class="field"><label for="nt-title">Titel</label><input class="input" id="nt-title" maxlength="90" placeholder="z. B. Suche Lernpartner für Statistik II, montags nachmittags"></div>
          <div class="field"><label for="nt-text">Text</label><textarea id="nt-text" placeholder="Was suchst du? Wann hast du Zeit? Wie lernst du gern?"></textarea>
            <span class="hint">Bei „Suche Buddy“ werden deine Kurse, freien Zeiten und Lernorte aus deinem Profil automatisch unter dem Beitrag angezeigt.</span></div>
          <p class="error" id="nt-error" hidden></p>
          <div class="btn-row" style="justify-content:flex-end"><a class="btn" href="${boardHash(sel)}">Abbrechen</a><button class="btn btn-primary">Thema erstellen</button></div>
        </form>
      </section>`;
  }

  // ===========================================================================
  // Seite: Lernpartner finden (Mitgliederliste)
  // ===========================================================================
  function viewMembers() {
    crumbs([[null, 'Lernpartner finden']]);
    const li = db.loggedIn;
    if (!li && ui.mCourse === 'mine') ui.mCourse = 'all';
    let list = USERS.filter((u) => {
      if (ui.mCourse === 'mine') return u.courses.some((c) => db.me.courses.includes(c));
      if (ui.mCourse !== 'all') return u.courses.includes(ui.mCourse);
      return true;
    }).filter((u) => (!ui.mStyle || u.style === ui.mStyle) && (!ui.mPlace || u.places.includes(ui.mPlace)) && (!ui.mOnline || u.online))
      .map((u) => ({ u, m: li ? matchInfo(u) : null }));
    list.sort((a, b) => (li ? b.m.score - a.m.score : a.u.nick.localeCompare(b.u.nick)));
    const opt = (v, l, cur) => `<option value="${v}" ${cur === v ? 'selected' : ''}>${esc(l)}</option>`;
    const rows = list.map(({ u, m }) => `<tr>
      <td><div class="who">${av(u)}<div><a href="#nutzer-${u.id}"><b>${esc(u.nick)}</b></a><span class="xs muted">${esc(u.name)} · ${u.online ? '<span class="online-dot"></span>online' : 'offline'}</span>
        <span class="inline-meta">${esc(u.study.replace(' (B.Sc.)', ''))}, ${u.semester}. Sem.</span>
        <span class="inline-meta" style="margin-top:6px">${li ? buddyButton(u.id) : `<a class="btn btn-sm" href="#nutzer-${u.id}">Profil</a>`}</span></div></div></td>
      <td class="hide-sm small">${esc(u.study.replace(' (B.Sc.)', ''))}<br><span class="muted">${u.semester}. Semester</span></td>
      <td class="hide-sm"><div class="tags">${u.courses.map((c) => `<span class="tag ${m && m.shared.includes(c) ? 'hl' : ''}">${esc(courseName(c))}</span>`).join('')}</div></td>
      <td class="hide-sm small">${STYLES[u.style]}</td>
      ${li ? `<td>${matchHtml(m.score)}<div class="xs muted">${m.sharedSlots.length ? plural(m.sharedSlots.length, 'gemeinsame Zeit', 'gemeinsame Zeiten') : 'keine gem. Zeiten'}</div></td>` : ''}
      <td class="r hide-sm">${li ? buddyButton(u.id) : `<a class="btn btn-sm" href="#nutzer-${u.id}">Profil</a>`}</td>
    </tr>`).join('');
    return `
      ${title('Lernpartner finden', li ? 'Mitglieder aus deinen Kursen, sortiert danach, wie gut sie zu dir passen.' : 'Alle Mitglieder. Melde dich an, um zu sehen, wer zu dir passt.')}
      <div class="stack-sm">
        <form class="toolbar" onsubmit="return false" aria-label="Filter">
          <div class="filters">
            <div class="field"><label for="m-course">Kurs</label><select id="m-course" data-ui="mCourse">${li ? opt('mine', 'Alle meine Kurse', ui.mCourse) : ''}${opt('all', 'Alle Kurse', ui.mCourse)}${Object.keys(COURSES).map((c) => opt(c, courseName(c), ui.mCourse)).join('')}</select></div>
            <div class="field"><label for="m-style">Lernstil</label><select id="m-style" data-ui="mStyle">${opt('', 'Egal', ui.mStyle)}${Object.entries(STYLES).map(([k, v]) => opt(k, v, ui.mStyle)).join('')}</select></div>
            <div class="field"><label for="m-place">Lernort</label><select id="m-place" data-ui="mPlace">${opt('', 'Egal', ui.mPlace)}${Object.entries(PLACES).map(([k, v]) => opt(k, v, ui.mPlace)).join('')}</select></div>
          </div>
          <label class="check"><input type="checkbox" id="m-online" data-ui="mOnline" ${ui.mOnline ? 'checked' : ''}>Nur wer gerade online ist</label>
        </form>
        <section class="box">
          <div class="box-head"><span>Mitglieder</span><span class="xs">${plural(list.length, 'Treffer', 'Treffer')}</span></div>
          ${list.length ? `<div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Mitglied</th><th class="hide-sm">Studium</th><th class="hide-sm">Kurse</th><th class="hide-sm">Lernstil</th>${li ? '<th>Match</th>' : ''}<th class="r hide-sm"><span class="sr-only">Aktion</span></th></tr></thead>
            <tbody>${rows}</tbody></table></div>`
          : `<div class="empty"><b>Niemand passt zu diesen Filtern.</b><button class="btn" data-act="reset-members">Filter zurücksetzen</button></div>`}
        </section>
        ${li ? '' : '<div class="info-note"><b>Tipp:</b> Mit einem Konto siehst du für jedes Mitglied, wie gut es zu deinen Kursen, Zeiten und deinem Lernstil passt.</div>'}
      </div>`;
  }

  // ===========================================================================
  // Seite: Profil eines Mitglieds
  // ===========================================================================
  function weekTable(slots, { editable = false, highlight = [] } = {}) {
    return `<div class="week-wrap"><table class="week">
      <thead><tr><th><span class="sr-only">Tageszeit</span></th>${DAYS.map((d) => `<th scope="col">${d}</th>`).join('')}</tr></thead>
      <tbody>${Object.entries(TIMES).map(([t, label]) => `<tr><th scope="row">${label}</th>${DAYS.map((d) => {
        const k = `${d}-${t}`, on = slots.includes(k), both = highlight.includes(k);
        const cls = both ? 'both' : on ? 'on' : '';
        return `<td>${editable ? `<button type="button" data-slot="${k}" class="${cls}" aria-pressed="${on}" aria-label="${d} ${label}"></button>` : `<span class="${cls}" title="${d} ${label}${on ? ': frei' : ''}"></span>`}</td>`;
      }).join('')}</tr>`).join('')}</tbody></table></div>`;
  }

  function viewUser(id) {
    const u = user(id);
    crumbs([['#mitglieder', 'Lernpartner finden'], [null, u.nick]]);
    const m = db.loggedIn ? matchInfo(u) : null;
    const kudos = { ...u.kudos };
    Object.entries(db.extraKudos[id] || {}).forEach(([k, n]) => { kudos[k] = (kudos[k] || 0) + n; });
    const posts = db.threads.flatMap((t) => t.posts.map((p, i) => ({ t, p, i }))).filter((x) => x.p.author === id).sort((a, b) => b.p.t - a.p.t).slice(0, 5);
    return `
      ${title(`Profil von ${esc(u.nick)}`)}
      <div class="profile">
        <aside class="box profile-card">
          ${av(u, 'lg')}
          <div><b style="font-size:1.1rem">${esc(u.nick)}</b><div class="small muted">${esc(u.name)}</div><div class="xs" style="color:var(--warn);font-weight:700">${esc(rankOf(u))}</div></div>
          <dl><dt>Studium</dt><dd>${esc(u.study.replace(' (B.Sc.)', ''))}</dd><dt>Semester</dt><dd>${u.semester}.</dd><dt>Dabei seit</dt><dd>${esc(u.joined)}</dd><dt>Beiträge</dt><dd class="num">${u.posts}</dd><dt>Status</dt><dd>${seenText(u)}</dd></dl>
          ${db.loggedIn ? `<div class="stack-sm" style="width:100%">${buddyButton(id, false)}<button class="btn" data-act="pm" data-id="${id}">${icon('mail')}Nachricht schreiben</button></div>`
            : '<button class="btn btn-primary" data-act="login" style="width:100%">Anmelden, um anzufragen</button>'}
        </aside>
        <div class="stack">
          <section class="box"><div class="box-head">Über mich</div><div class="box-body"><p>${esc(u.bio)}</p></div></section>
          ${m ? `<section class="box"><div class="box-head"><span>Passt ${esc(u.nick)} zu dir?</span><span>${m.score}%</span></div><div class="box-body">
            ${m.reasons.length ? `<ul class="reasons">${m.reasons.map((r) => `<li>${esc(r)}</li>`).join('')}</ul>` : '<p class="muted">Ihr habt wenig gemeinsam.</p>'}</div></section>` : ''}
          <section class="box"><div class="box-head">Lernen</div><div class="box-body"><div class="details-panel" style="background:none;border:0;padding:0"><dl>
            <dt>Kurse</dt><dd><div class="tags">${u.courses.map((c) => `<span class="tag ${m && m.shared.includes(c) ? 'hl' : ''}">${esc(courseName(c))}</span>`).join('')}</div></dd>
            <dt>Lernstil</dt><dd>${STYLES[u.style]}</dd><dt>Lernorte</dt><dd>${u.places.map((x) => PLACES[x]).join(', ')}</dd>
          </dl></div></div>
          <div class="box-body"><span class="field-label">Freie Zeiten</span>${weekTable(u.avail, { highlight: m ? m.sharedSlots : [] })}
            <div class="legend"><span><i class="on"></i>${esc(first(u.name))} hat Zeit</span>${m ? '<span><i class="both"></i>Ihr habt beide Zeit</span>' : ''}</div></div></section>
          <section class="box"><div class="box-head">Feedback von Buddies</div><div class="box-body">${Object.keys(kudos).length ? `<div class="tags">${Object.entries(kudos).map(([k, n]) => `<span class="tag">${KUDOS[k]} <b class="num">${n}×</b></span>`).join('')}</div>` : '<span class="muted">Noch kein Feedback.</span>'}</div></section>
          <section class="box"><div class="box-head">Letzte Beiträge</div>${posts.length ? `<div class="tbl-wrap"><table class="tbl"><tbody>${posts.map(({ t, p }) => `<tr><td>${prefix(t.type)}<a href="#thema-${t.id}"><b>${esc(t.title)}</b></a><div class="sub">in ${esc(BOARDS[t.board].name)} · ${fmtT(p.t)}</div></td></tr>`).join('')}</tbody></table></div>` : '<div class="box-body muted">Noch keine Beiträge.</div>'}</section>
        </div>
      </div>`;
  }

  // ===========================================================================
  // Seite: Lerngruppen
  // ===========================================================================
  function sessionButton(s, small = true) {
    const c = small ? 'btn-sm' : '';
    if (!db.loggedIn) return `<button class="btn ${c}" data-act="login">Anmelden</button>`;
    if (s.host === 'me') return `<span class="tag hl">Von dir</span>`;
    if (s.joined) return `<button class="btn ${c}" data-act="leave" data-id="${s.id}">Abmelden</button>`;
    if (s.taken >= s.seats) return `<button class="btn ${c}" disabled>Ausgebucht</button>`;
    return `<button class="btn ${c} btn-primary" data-act="join" data-id="${s.id}">Teilnehmen</button>`;
  }
  function viewGroups() {
    crumbs([[null, 'Lerngruppen']]);
    const up = db.sessions.filter((s) => daysUntil(s.date) >= 0).sort((a, b) => (a.date + a.from).localeCompare(b.date + b.from));
    const tabs = { all: ['Alle', up], mine: ['Meine Kurse', up.filter((s) => db.me.courses.includes(s.course))], joined: ['Angemeldet', up.filter((s) => s.joined || s.host === 'me')] };
    if (!db.loggedIn) { delete tabs.mine; delete tabs.joined; ui.groupTab = 'all'; }
    const list = tabs[ui.groupTab][1];
    return `
      ${title('Lerngruppen', 'Offene Termine zum gemeinsamen Lernen. Melde dich an oder trag selbst einen Termin ein.', `<button class="btn btn-primary" data-act="new-group">${icon('plus')}Lerngruppe eintragen</button>`)}
      <div class="stack-sm">
        <div class="toolbar"><div class="seg" role="group" aria-label="Filter">${Object.entries(tabs).map(([k, [l, arr]]) => `<button aria-pressed="${ui.groupTab === k}" data-act="group-tab" data-id="${k}">${l} <span class="xs">${arr.length}</span></button>`).join('')}</div></div>
        <section class="box">
          <div class="box-head"><span>Termine</span><span class="xs">${plural(list.length, 'Termin', 'Termine')}</span></div>
          ${list.length ? `<div class="tbl-wrap"><table class="tbl">
            <thead><tr><th>Wann</th><th>Thema</th><th class="hide-sm">Ort</th><th class="c hide-sm">Plätze</th><th class="r"><span class="sr-only">Aktion</span></th></tr></thead>
            <tbody>${list.map((s) => `<tr>
              <td class="num"><b>${fmtDate(s.date, { weekday: 'short', day: '2-digit', month: '2-digit' })}</b><br><span class="small muted">${s.from}–${s.to}</span></td>
              <td><a href="#thema-${s.thread}"><b>${esc(s.title)}</b></a><div class="sub"><span class="tag ${db.loggedIn && db.me.courses.includes(s.course) ? 'hl' : ''}">${esc(courseName(s.course))}</span> von ${userLink(s.host)}</div>
                <div class="inline-meta">${esc(s.place)} · ${s.taken}/${s.seats} Plätze</div></td>
              <td class="hide-sm small">${esc(s.place)}</td>
              <td class="c hide-sm num">${s.taken}/${s.seats}</td>
              <td class="r">${sessionButton(s)}</td></tr>`).join('')}</tbody></table></div>`
          : `<div class="empty"><b>${ui.groupTab === 'joined' ? 'Du bist für keinen Termin angemeldet.' : 'Keine Termine gefunden.'}</b><button class="btn" data-act="group-tab" data-id="all">Alle Termine zeigen</button></div>`}
        </section>
      </div>`;
  }

  // ===========================================================================
  // Seite: Nachrichten (Postfach, Buddy-Anfragen, Buddyliste)
  // ===========================================================================
  function viewMessages() {
    crumbs([[null, 'Nachrichten']]);
    if (!db.loggedIn) return title('Nachrichten') + loginGate('Hier findest du deine Nachrichten und Buddy-Anfragen.');
    const sentIds = Object.keys(db.requestsOut);
    const nav = [
      ['inbox', 'Posteingang', unreadCount()],
      ['requests', 'Buddy-Anfragen', db.requestsIn.length],
      'sep',
      ['buddies', 'Meine Buddies', null, db.buddies.length],
      ['sent', 'Gesendete Anfragen', null, sentIds.length],
    ];
    const navHtml = nav.map((n) => (n === 'sep' ? '<div class="sep"></div>' : `<button data-act="box" data-id="${n[0]}" aria-current="${ui.box === n[0]}"><span>${n[1]}</span>${n[2] ? `<span class="count">${n[2]}</span>` : n[3] != null ? `<span class="xs muted">${n[3]}</span>` : ''}</button>`)).join('');
    let body = '';

    if (ui.box === 'inbox' && ui.conv) {
      const c = db.convs.find((x) => x.id === ui.conv);
      const u = user(c.with);
      body = `<section class="box">
        <div class="box-head"><span>${esc(c.subject)}</span><button class="btn btn-sm" data-act="conv-back" style="color:var(--ink)">‹ Zurück</button></div>
        <div class="box-body small" style="gap:2px">Unterhaltung mit ${userLink(c.with)} · ${seenText(u)}</div>
        <div id="msgs">${c.msgs.map((m) => { const a = m.me ? user('me') : u; return `<div class="msg ${m.me ? 'me' : ''}">${av(a)}<div><div class="msg-head"><b>${esc(a.nick)}</b><span class="muted xs">${fmtT(m.t)}</span></div><div class="post-text">${fmtText(m.text)}</div></div></div>`; }).join('')}</div>
        <form class="box-body" id="conv-form" data-id="${c.id}">
          <label class="sr-only" for="conv-text">Antwort</label><textarea id="conv-text" rows="3" style="min-height:80px" placeholder="Antwort an ${esc(u.nick)} schreiben"></textarea>
          <div class="btn-row" style="justify-content:space-between"><span class="xs muted">Tipp: Schlagt einen konkreten Termin und Ort vor.</span><button class="btn btn-primary">Senden</button></div>
        </form></section>`;
    } else if (ui.box === 'inbox') {
      const convs = db.convs.slice().sort((a, b) => lastPost({ posts: b.msgs }).t - lastPost({ posts: a.msgs }).t);
      body = `<section class="box"><div class="box-head"><span>Posteingang</span><button class="btn btn-sm" data-act="compose" style="color:var(--ink)">${icon('plus')}Neue Nachricht</button></div>
        ${convs.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th class="w-icon"><span class="sr-only">Ungelesen</span></th><th>Betreff</th><th class="hide-sm">Mit</th><th class="r">Letzte Nachricht</th></tr></thead><tbody>
          ${convs.map((c) => { const lm = c.msgs[c.msgs.length - 1]; return `<tr class="${c.unread ? 'unread-row' : ''}">
            <td class="w-icon c">${c.unread ? '<span class="unread-mark" title="Ungelesen"></span>' : ''}</td>
            <td><button class="btn-link" data-act="open-conv" data-id="${c.id}">${esc(c.subject)}</button><div class="sub" style="font-weight:400">${lm.me ? 'Du: ' : ''}${esc(lm.text.slice(0, 70))}${lm.text.length > 70 ? '…' : ''}</div></td>
            <td class="hide-sm">${userLink(c.with)}</td><td class="r small muted">${fmtT(lm.t)}</td></tr>`; }).join('')}
        </tbody></table></div>` : '<div class="empty"><b>Noch keine Nachrichten.</b><span>Sobald ein Buddy dir schreibt, erscheint die Nachricht hier.</span></div>'}</section>`;
    } else if (ui.box === 'requests') {
      body = `<div class="stack-sm">
        <div class="info-note"><b>Was passiert, wenn ich annehme?</b> Ihr steht dann in euren Buddylisten, seht gegenseitig eure freien Zeiten und könnt euch Nachrichten schreiben. Wenn du ablehnst, wird die andere Person nicht benachrichtigt.</div>
        <section class="box"><div class="box-head"><span>Offene Buddy-Anfragen</span><span class="xs">${db.requestsIn.length}</span></div>
        ${db.requestsIn.length ? db.requestsIn.map((r) => { const u = user(r.id), m = matchInfo(u); return `<div class="request">
          ${av(u)}
          <div style="min-width:0"><a href="#nutzer-${u.id}"><b>${esc(u.nick)}</b></a> <span class="small muted">${esc(u.name)} · ${esc(u.study.replace(' (B.Sc.)', ''))}, ${u.semester}. Sem. · ${fmtT(r.t)}</span>
            <div class="small" style="margin-top:4px">Passt zu dir: ${matchHtml(m.score)} ${m.shared.length ? `· gemeinsam: ${m.shared.map((c) => `<span class="tag hl">${esc(courseName(c))}</span>`).join(' ')}` : ''}</div>
            <blockquote>${esc(r.text)}</blockquote></div>
          <div class="btn-row"><a class="btn btn-sm" href="#nutzer-${u.id}">Profil</a><button class="btn btn-sm" data-act="decline" data-id="${u.id}">Ablehnen</button><button class="btn btn-sm btn-good" data-act="accept" data-id="${u.id}">Annehmen</button></div>
        </div>`; }).join('') : '<div class="empty"><b>Keine offenen Anfragen.</b><span>Warte nicht ab: Such dir selbst jemanden aus deinen Kursen.</span><a class="btn btn-primary" href="#mitglieder">Lernpartner finden</a></div>'}
        </section></div>`;
    } else if (ui.box === 'buddies') {
      body = `<section class="box"><div class="box-head"><span>Meine Buddies</span><span class="xs">${db.buddies.length}</span></div>
        ${db.buddies.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Buddy</th><th class="hide-sm">Gemeinsame Kurse</th><th class="hide-sm">Status</th><th class="r"><span class="sr-only">Aktionen</span></th></tr></thead><tbody>
          ${db.buddies.map((id) => { const u = user(id), m = matchInfo(u); return `<tr>
            <td><div class="who">${av(u)}<div><a href="#nutzer-${id}"><b>${esc(u.nick)}</b></a><span class="xs muted">${esc(u.name)}</span><span class="inline-meta">${seenText(u)}</span></div></div></td>
            <td class="hide-sm"><div class="tags">${m.shared.map((c) => `<span class="tag hl">${esc(courseName(c))}</span>`).join('') || '<span class="muted small">keine</span>'}</div></td>
            <td class="hide-sm small">${seenText(u)}</td>
            <td class="r"><div class="btn-row" style="justify-content:flex-end"><button class="btn btn-sm btn-primary" data-act="pm" data-id="${id}">Nachricht</button><button class="btn btn-sm" data-act="kudos" data-id="${id}">Feedback</button><button class="btn btn-sm" data-act="remove-buddy" data-id="${id}">Entfernen</button></div></td></tr>`; }).join('')}
        </tbody></table></div>` : '<div class="empty"><b>Noch keine Buddies.</b><span>Sobald jemand deine Anfrage annimmt, steht die Person hier.</span><a class="btn btn-primary" href="#mitglieder">Lernpartner finden</a></div>'}</section>`;
    } else {
      body = `<section class="box"><div class="box-head"><span>Gesendete Anfragen</span><span class="xs">${sentIds.length}</span></div>
        ${sentIds.length ? `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>An</th><th class="hide-sm">Deine Nachricht</th><th>Status</th><th class="r"><span class="sr-only">Aktion</span></th></tr></thead><tbody>
          ${sentIds.map((id) => { const u = user(id), r = db.requestsOut[id]; return `<tr>
            <td><div class="who">${av(u, 'sm')}<div><a href="#nutzer-${id}"><b>${esc(u.nick)}</b></a><span class="xs muted">${fmtT(r.t)}</span></div></div></td>
            <td class="hide-sm small muted">${esc(r.text)}</td><td><span class="prefix p-frage">Wartet</span></td>
            <td class="r"><button class="btn btn-sm" data-act="withdraw" data-id="${id}">Zurückziehen</button></td></tr>`; }).join('')}
        </tbody></table></div>` : '<div class="empty"><b>Keine offenen Anfragen.</b><span>Hier siehst du Anfragen, auf die noch keine Antwort kam.</span></div>'}</section>`;
    }
    return `${title('Nachrichten', 'Dein Postfach, deine Buddy-Anfragen und deine Buddyliste.')}
      <div class="mail"><nav class="box mail-nav" aria-label="Ordner">${navHtml}</nav><div class="stack-sm">${body}</div></div>`;
  }

  // ===========================================================================
  // Seite: Persönlicher Bereich
  // ===========================================================================
  const checklistHtml = () => profileChecks().map((c) => `<li class="${c.ok ? 'done' : ''}">${c.label}</li>`).join('');
  function viewProfile() {
    crumbs([[null, 'Persönlicher Bereich']]);
    if (!db.loggedIn) return title('Persönlicher Bereich') + loginGate('Hier bearbeitest du dein Profil, deine Kurse und deine Lernzeiten.');
    const me = db.me, pc = completeness();
    const opts = Object.keys(COURSES).filter((c) => !me.courses.includes(c));
    return `
      ${title('Persönlicher Bereich', 'Änderungen werden automatisch gespeichert.')}
      <div class="layout">
        <div class="stack">
          <section class="box"><div class="box-head">Profil</div><div class="box-body">
            <div class="form-grid">
              <div class="field"><label for="me-name">Name</label><input class="input" id="me-name" data-me="name" value="${esc(me.name)}" autocomplete="name"></div>
              <div class="field"><label for="me-nick">Benutzername</label><input class="input" id="me-nick" data-me="nick" value="${esc(me.nick)}" maxlength="20"></div>
              <div class="field"><label for="me-study">Studiengang</label><select id="me-study" data-me="study">${STUDIES.map((s) => `<option ${me.study === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
              <div class="field"><label for="me-sem">Semester</label><select id="me-sem" data-me="semester">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${me.semester === i + 1 ? 'selected' : ''}>${i + 1}. Semester</option>`).join('')}</select></div>
            </div>
            <div class="field"><label for="me-bio">Über mich</label><textarea id="me-bio" data-me="bio" maxlength="300" placeholder="Wann und wie lernst du gern? Wobei brauchst du Hilfe?">${esc(me.bio)}</textarea><span class="hint" id="bio-count">${me.bio.length}/300 Zeichen</span></div>
          </div></section>

          <section class="box"><div class="box-head">Meine Kurse</div><div class="box-body">
            <div class="tags">${me.courses.map((c) => `<span class="tag hl">${esc(courseName(c))} <button type="button" class="btn-link" data-act="rm-course" data-id="${c}" aria-label="${esc(courseName(c))} entfernen" style="color:inherit">×</button></span>`).join('') || '<span class="muted">Noch keine Kurse.</span>'}</div>
            ${opts.length ? `<div class="btn-row"><label class="sr-only" for="add-course">Kurs hinzufügen</label><select id="add-course" style="width:auto;flex:1 1 220px">${opts.map((c) => `<option value="${c}">${esc(courseName(c))} (${COURSES[c].code})</option>`).join('')}</select><button class="btn" data-act="add-course">Hinzufügen</button></div>` : ''}
          </div></section>

          <section class="box"><div class="box-head">Wann hast du Zeit?</div><div class="box-body">
            <p class="small muted">Klick auf die Felder, an denen du regelmäßig lernen kannst.</p>
            ${weekTable(me.avail, { editable: true })}
            <div class="legend"><span><i class="on"></i>Frei</span><span><i></i>Keine Zeit</span></div>
          </div></section>

          <section class="box"><div class="box-head">Lernstil und Lernorte</div><div class="box-body">
            <div class="field"><span class="field-label">Lernstil</span><div class="choices">${Object.entries(STYLES).map(([k, v]) => `<label class="choice"><input type="radio" name="me-style" value="${k}" ${me.style === k ? 'checked' : ''}>${v}</label>`).join('')}</div></div>
            <div class="field"><span class="field-label">Lernorte</span><div class="choices">${Object.entries(PLACES).map(([k, v]) => `<label class="choice"><input type="checkbox" name="me-place" value="${k}" ${me.places.includes(k) ? 'checked' : ''}>${v}</label>`).join('')}</div></div>
          </div></section>

          <section class="box"><div class="box-head">Prototyp zurücksetzen</div><div class="box-body">
            <div class="btn-row" style="justify-content:space-between"><span class="small muted">Setzt alle Beiträge, Nachrichten und Profildaten auf die Beispieldaten zurück.</span>
            ${ui.confirmReset ? '<span class="btn-row"><button class="btn" data-act="reset-cancel">Abbrechen</button><button class="btn btn-primary" data-act="reset-do">Ja, zurücksetzen</button></span>' : '<button class="btn" data-act="reset-ask">Zurücksetzen</button>'}</div>
          </div></section>
        </div>
        <aside class="stack side">
          <div class="box"><div class="box-head">Profil-Status</div><div class="box-body">
            <div class="who">${av(user('me'), 'lg')}<div><b>${esc(me.nick)}</b><span class="small muted">${esc(rankOf(user('me')))} · ${myPostCount()} Beiträge</span></div></div>
            <div class="small" id="pc-label"><b>${pc}% vollständig</b></div>
            <div class="progress" role="progressbar" aria-valuenow="${pc}" aria-valuemin="0" aria-valuemax="100" aria-labelledby="pc-label"><i style="width:${pc}%"></i></div>
            <ul class="checklist" id="checklist">${checklistHtml()}</ul>
          </div></div>
          ${sideExams()}
        </aside>
      </div>`;
  }

  // ===========================================================================
  // Seite: Hilfe
  // ===========================================================================
  function viewHelp() {
    crumbs([[null, 'Hilfe & FAQ']]);
    const faq = [
      ['Kostet Study Buddy etwas?', 'Nein. Study Buddy ist für Studierende kostenlos und ohne Werbung.'],
      ['Was ist ein Buddy?', 'Ein Buddy ist ein fester Lernpartner. Nehmt ihr beide die Anfrage an, steht ihr in euren Buddylisten und könnt euch Nachrichten schreiben.'],
      ['Wer sieht mein Profil?', 'Alle angemeldeten Mitglieder deiner Uni. Deine Uni-Mail bleibt verborgen.'],
      ['Was passiert, wenn ich eine Anfrage ablehne?', 'Nichts. Die andere Person bekommt keine Benachrichtigung.'],
      ['Wie berechnet sich der Match-Wert?', 'Am meisten zählen gemeinsame Kurse. Danach gemeinsame freie Zeiten, der gleiche Lernstil, gemeinsame Lernorte und das Semester.'],
      ['Ist das eine echte Plattform?', 'Nein, das ist ein Prototyp aus einem Uni-Projekt. Alle Personen und Beiträge sind Beispieldaten. Deine Eingaben bleiben in deinem Browser.'],
    ];
    return `
      ${title('Hilfe & FAQ', 'Alles, was du für den Start wissen musst.')}
      <div class="layout"><div class="stack">
        <section class="box"><div class="box-head">So funktioniert Study Buddy</div><div class="box-body welcome" style="display:block;padding:12px 14px"><ol style="margin:0">
          <li><b>Registrieren:</b> Kurse, freie Zeiten, Lernstil und Lernorte angeben.</li>
          <li><b>Lernpartner finden:</b> In der Mitgliederliste siehst du, wer zu dir passt. Oder du postest im Kursforum ein Thema mit „Suche Buddy“.</li>
          <li><b>Buddy-Anfrage senden:</b> mit einer kurzen Nachricht. Vorschläge für den ersten Satz bekommst du gleich mit.</li>
          <li><b>Termin ausmachen:</b> per Nachricht oder über eine offene Lerngruppe.</li>
        </ol></div></section>
        <section class="box"><div class="box-head">Häufige Fragen</div>${faq.map(([q, a]) => `<div class="box-body" style="gap:2px"><b>${q}</b><span class="muted">${a}</span></div>`).join('')}</section>
      </div>
      <aside class="stack side"><div class="box"><div class="box-head">Forenregeln</div><div class="box-body small"><ol style="margin:0;padding-left:18px;display:grid;gap:4px">
        <li>Freundlich bleiben, auch bei „dummen“ Fragen.</li>
        <li>Ein Thema pro Gesuch, mit passendem Präfix.</li>
        <li>Keine kompletten Lösungen zu Hausaufgaben posten.</li>
        <li>Erste Treffen an öffentlichen Orten, z. B. in der Bibliothek.</li>
      </ol></div></div></aside></div>`;
  }

  // ===========================================================================
  // Seite: Suche
  // ===========================================================================
  function viewSearch() {
    crumbs([[null, 'Suche']]);
    const q = ui.q.trim().toLowerCase();
    if (!q) return title('Suche', 'Gib oben einen Begriff ein, zum Beispiel einen Kurs oder einen Benutzernamen.');
    const threads = db.threads.filter((t) => t.title.toLowerCase().includes(q) || BOARDS[t.board].name.toLowerCase().includes(q) || t.posts.some((p) => p.text.toLowerCase().includes(q)));
    const users = USERS.filter((u) => u.nick.toLowerCase().includes(q) || u.name.toLowerCase().includes(q) || u.courses.some((c) => courseName(c).toLowerCase().includes(q)));
    return `
      ${title(`Suchergebnisse für „${esc(ui.q)}“`, `${plural(threads.length, 'Thema', 'Themen')} und ${plural(users.length, 'Mitglied', 'Mitglieder')} gefunden.`)}
      <div class="stack">
        <section class="box"><div class="box-head">Themen</div>${threads.length ? threadTable(threads, true) : '<div class="empty">Keine Themen gefunden.</div>'}</section>
        <section class="box"><div class="box-head">Mitglieder</div>${users.length ? `<div class="tbl-wrap"><table class="tbl"><tbody>${users.map((u) => `<tr><td><div class="who">${av(u)}<div><a href="#nutzer-${u.id}"><b>${esc(u.nick)}</b></a><span class="xs muted">${esc(u.study)} · ${u.courses.map(courseName).join(', ')}</span></div></div></td></tr>`).join('')}</tbody></table></div>` : '<div class="empty">Keine Mitglieder gefunden.</div>'}</section>
      </div>`;
  }

  // ===========================================================================
  // Dialoge
  // ===========================================================================
  let lastFocus = null;
  function openModal(head, body, foot, formId) {
    const o = $('#overlay');
    if (o.hidden) lastFocus = document.activeElement;
    const inner = `<div class="box-head"><span>${head}</span><button type="button" data-act="close" aria-label="Schließen">×</button></div><div class="modal-body">${body}</div>${foot ? `<div class="modal-foot">${foot}</div>` : ''}`;
    o.innerHTML = `<div class="modal" role="dialog" aria-modal="true" aria-label="${esc(head.replace(/<[^>]+>/g, ''))}">${formId ? `<form id="${formId}" novalidate>${inner}</form>` : inner}</div>`;
    o.hidden = false;
    document.body.style.overflow = 'hidden';
    const f = o.querySelector('[autofocus], .modal-body input, .modal-body textarea, .modal-body select, .btn-primary');
    if (f) f.focus();
  }
  function closeModal(silent) {
    const o = $('#overlay');
    if (o.hidden) return;
    o.hidden = true; o.innerHTML = '';
    document.body.style.overflow = '';
    reg = null;
    if (!silent && lastFocus && document.contains(lastFocus)) lastFocus.focus();
  }

  function modalLogin(reason) {
    openModal('Anmelden', `
      ${reason ? `<div class="info-note">${esc(reason)}</div>` : ''}
      <div class="field"><label for="li-mail">Uni-Mail</label><input class="input" id="li-mail" type="email" placeholder="vorname.nachname@uni.de" autocomplete="username"></div>
      <div class="field"><label for="li-pw">Passwort</label><input class="input" id="li-pw" type="password" autocomplete="current-password"></div>
      <p class="xs muted">Prototyp: Es wird nichts geprüft. Du wirst mit dem Demo-Konto von Lena Meier angemeldet.</p>
      <p class="small">Noch kein Konto? <button type="button" class="btn-link" data-act="register">Jetzt registrieren</button></p>`,
    `<button type="button" class="btn" data-act="close">Abbrechen</button><button class="btn btn-primary">Anmelden</button>`, 'login-form');
  }

  // Registrierung in drei Schritten
  let reg = null;
  function startRegister() { reg = { step: 1, error: '', d: { name: '', nick: '', study: STUDIES[0], semester: 1, courses: [], style: 'ruhig', places: [], avail: [] } }; renderRegister(); }
  function renderRegister() {
    const d = reg.d;
    let body = `<div class="steps-bar" aria-hidden="true">${[1, 2, 3].map((i) => `<i class="${i <= reg.step ? 'on' : ''}"></i>`).join('')}</div><span class="xs muted">Schritt ${reg.step} von 3</span>`;
    if (reg.step === 1) body += `
      <div class="form-grid">
        <div class="field"><label for="rg-name">Name</label><input class="input" id="rg-name" value="${esc(d.name)}" autocomplete="name" placeholder="Vor- und Nachname"></div>
        <div class="field"><label for="rg-nick">Benutzername</label><input class="input" id="rg-nick" value="${esc(d.nick)}" maxlength="20" placeholder="z. B. max.m"><span class="hint">Wird im Forum angezeigt.</span></div>
        <div class="field"><label for="rg-study">Studiengang</label><select id="rg-study">${STUDIES.map((s) => `<option ${d.study === s ? 'selected' : ''}>${esc(s)}</option>`).join('')}</select></div>
        <div class="field"><label for="rg-sem">Semester</label><select id="rg-sem">${Array.from({ length: 10 }, (_, i) => `<option value="${i + 1}" ${d.semester === i + 1 ? 'selected' : ''}>${i + 1}. Semester</option>`).join('')}</select></div>
      </div>`;
    if (reg.step === 2) body += `
      <div class="field"><span class="field-label">Welche Kurse belegst du dieses Semester?</span>
        <div class="choices">${Object.entries(COURSES).map(([k, c]) => `<label class="choice"><input type="checkbox" name="rg-course" value="${k}" ${d.courses.includes(k) ? 'checked' : ''}>${esc(c.name)}</label>`).join('')}</div>
        <span class="hint">Du siehst dann diese Kursforen markiert und bekommst passende Lernpartner vorgeschlagen.</span></div>`;
    if (reg.step === 3) body += `
      <div class="field"><span class="field-label">Wie lernst du am liebsten?</span><div class="choices">${Object.entries(STYLES).map(([k, v]) => `<label class="choice"><input type="radio" name="rg-style" value="${k}" ${d.style === k ? 'checked' : ''}>${v}</label>`).join('')}</div></div>
      <div class="field"><span class="field-label">Wo lernst du gern?</span><div class="choices">${Object.entries(PLACES).map(([k, v]) => `<label class="choice"><input type="checkbox" name="rg-place" value="${k}" ${d.places.includes(k) ? 'checked' : ''}>${v}</label>`).join('')}</div></div>
      <div class="field"><span class="field-label">Wann hast du Zeit? <span class="muted" style="font-weight:400">(kannst du später ändern)</span></span>${weekTable(d.avail, { editable: true }).replaceAll('data-slot=', 'data-regslot=')}</div>`;
    body += `<p class="error" role="alert" ${reg.error ? '' : 'hidden'}>${esc(reg.error)}</p>`;
    const titles = ['', 'Registrieren: Über dich', 'Registrieren: Deine Kurse', 'Registrieren: Wie du lernst'];
    openModal(titles[reg.step], body,
      `${reg.step > 1 ? '<button type="button" class="btn" data-act="reg-back">Zurück</button>' : '<button type="button" class="btn" data-act="demo">Lieber Demo-Zugang</button>'}<button class="btn btn-primary">${reg.step === 3 ? 'Registrierung abschließen' : 'Weiter'}</button>`, 'reg-form');
  }
  function regCollect() {
    const d = reg.d;
    if (reg.step === 1) { d.name = $('#rg-name').value.trim(); d.nick = $('#rg-nick').value.trim(); d.study = $('#rg-study').value; d.semester = +$('#rg-sem').value; }
    if (reg.step === 2) d.courses = $$('input[name="rg-course"]:checked').map((i) => i.value);
    if (reg.step === 3) { d.style = $('input[name="rg-style"]:checked').value; d.places = $$('input[name="rg-place"]:checked').map((i) => i.value); }
  }
  function regNext() {
    regCollect();
    const d = reg.d;
    reg.error = reg.step === 1 && !d.name ? 'Bitte gib deinen Namen ein.'
      : reg.step === 1 && !/^[a-z0-9._-]{3,20}$/i.test(d.nick) ? 'Der Benutzername braucht 3 bis 20 Zeichen: Buchstaben, Zahlen, Punkt, Unterstrich oder Bindestrich.'
      : reg.step === 2 && !d.courses.length ? 'Wähle mindestens einen Kurs aus.'
      : reg.step === 3 && !d.places.length ? 'Wähle mindestens einen Lernort aus.' : '';
    if (reg.error) return renderRegister();
    if (reg.step < 3) { reg.step++; return renderRegister(); }
    db = { ...seed(), loggedIn: true, me: { ...d, bio: '', joined: 'Nov. 2026' }, requestsIn: [], requestsOut: {}, buddies: [], convs: [] };
    closeModal(true);
    ui.mCourse = 'mine';
    go('#mitglieder');
    toast(`Willkommen, ${d.nick}! Hier sind Lernpartner aus deinen Kursen.`);
  }

  function modalAsk(id) {
    const u = user(id), m = matchInfo(u);
    const c = m.shared[0] ? courseName(m.shared[0]) : 'deinem Kurs';
    const slot = m.sharedSlots[0] ? slotLabel(m.sharedSlots[0]) : 'diese Woche';
    modalAsk.ideas = [
      `Hi ${first(u.name)}! Wir sind beide in ${c}. Hast du Lust, ${slot} zusammen zu lernen?`,
      `Hey, ich suche jemanden, um Altklausuren in ${c} durchzurechnen. Wärst du dabei?`,
      `Hallo ${first(u.name)}, sollen wir uns einmal pro Woche fest zum Lernen treffen?`,
    ];
    openModal(`Buddy-Anfrage an ${esc(u.nick)}`, `
      <div class="who">${av(u)}<div><b>${esc(u.nick)}</b><span class="small muted">${esc(u.name)} · passt zu ${m.score}%</span></div></div>
      <div class="field"><label for="ask-text">Deine Nachricht</label><textarea id="ask-text" maxlength="300" style="min-height:90px">${esc(modalAsk.ideas[0])}</textarea></div>
      <div class="field"><span class="field-label">Vorschläge</span><div class="stack-sm">${modalAsk.ideas.map((t, i) => `<button type="button" class="btn btn-sm" style="white-space:normal;justify-content:flex-start;text-align:left" data-act="ice" data-i="${i}">${esc(t)}</button>`).join('')}</div></div>
      <div class="info-note">Trefft euch beim ersten Mal an einem öffentlichen Ort, zum Beispiel in der Bibliothek.</div>`,
    `<button type="button" class="btn" data-act="close">Abbrechen</button><button class="btn btn-primary" data-id="${id}">Anfrage senden</button>`, 'ask-form');
    $('#ask-form').dataset.id = id;
  }

  function modalCompose(to) {
    const opts = USERS.map((u) => `<option value="${u.id}" ${u.id === to ? 'selected' : ''}>${esc(u.nick)} (${esc(u.name)})${db.buddies.includes(u.id) ? ' · Buddy' : ''}</option>`).join('');
    openModal('Neue Nachricht', `
      <div class="field"><label for="cm-to">An</label><select id="cm-to">${opts}</select></div>
      <div class="field"><label for="cm-subj">Betreff</label><input class="input" id="cm-subj" maxlength="80" placeholder="z. B. Lerntreffen nächste Woche"></div>
      <div class="field"><label for="cm-text">Nachricht</label><textarea id="cm-text"></textarea></div>
      <p class="error" id="cm-error" hidden>Bitte fülle Betreff und Nachricht aus.</p>`,
    `<button type="button" class="btn" data-act="close">Abbrechen</button><button class="btn btn-primary">Senden</button>`, 'compose-form');
    if (to) $('#cm-subj').focus();
  }

  function modalKudos(id) {
    const u = user(id);
    openModal(`Feedback für ${esc(u.nick)}`, `
      <p>Wie war das Lernen mit ${esc(first(u.name))}? Wähle alles, was passt. Es gibt nur positives Feedback, es erscheint im Profil.</p>
      <div class="choices">${Object.entries(KUDOS).map(([k, v]) => `<label class="choice"><input type="checkbox" name="kd" value="${k}">${v}</label>`).join('')}</div>
      <p class="error" id="kd-error" hidden>Wähle mindestens eine Eigenschaft aus.</p>`,
    `<button type="button" class="btn" data-act="close">Abbrechen</button><button class="btn btn-primary">Feedback senden</button>`, 'kudos-form');
    $('#kudos-form').dataset.id = id;
  }

  function modalNewGroup() {
    openModal('Lerngruppe eintragen', `
      <div class="form-grid">
        <div class="field"><label for="ng-course">Kurs</label><select id="ng-course">${(db.me.courses.length ? db.me.courses : Object.keys(COURSES)).map((c) => `<option value="${c}">${esc(courseName(c))}</option>`).join('')}</select></div>
        <div class="field"><label for="ng-seats">Plätze inkl. dir</label><select id="ng-seats">${[2, 3, 4, 5, 6, 8].map((n) => `<option ${n === 4 ? 'selected' : ''}>${n}</option>`).join('')}</select></div>
      </div>
      <div class="field"><label for="ng-title">Thema</label><input class="input" id="ng-title" maxlength="80" placeholder="z. B. Übungsblatt 6 besprechen"></div>
      <div class="form-grid">
        <div class="field"><label for="ng-date">Datum</label><input class="input" id="ng-date" type="date" min="${isoIn(0)}" value="${isoIn(2)}"></div>
        <div class="field"><label for="ng-from">Von</label><input class="input" id="ng-from" type="time" value="14:00"></div>
        <div class="field"><label for="ng-to">Bis</label><input class="input" id="ng-to" type="time" value="15:30"></div>
      </div>
      <div class="field"><label for="ng-place">Ort</label><input class="input" id="ng-place" maxlength="80" placeholder="z. B. Bibliothek, Gruppenraum 1.12"></div>
      <div class="field"><label for="ng-text">Beschreibung</label><textarea id="ng-text" style="min-height:80px" placeholder="Was macht ihr? Was soll man mitbringen?"></textarea><span class="hint">Es wird automatisch ein Thema im Kursforum erstellt.</span></div>
      <p class="error" id="ng-error" hidden></p>`,
    `<button type="button" class="btn" data-act="close">Abbrechen</button><button class="btn btn-primary">Eintragen</button>`, 'group-form');
  }

  // ===========================================================================
  // Rendern
  // ===========================================================================
  function render() {
    const focusId = document.activeElement?.id;
    renderChrome();
    const views = { start: viewStart, kurs: () => viewBoard(ui.param), thema: () => viewThread(ui.param), 'neues-thema': viewNewTopic, mitglieder: viewMembers, nutzer: () => viewUser(ui.param), lerngruppen: viewGroups, nachrichten: viewMessages, profil: viewProfile, hilfe: viewHelp, suche: viewSearch };
    $('#view').innerHTML = views[ui.route]();
    const navLabel = { start: 'Forum', kurs: BOARDS[ui.param]?.name, thema: threadById(ui.param)?.title, mitglieder: 'Lernpartner finden', nutzer: user(ui.param)?.nick, lerngruppen: 'Lerngruppen', nachrichten: 'Nachrichten', profil: 'Persönlicher Bereich', hilfe: 'Hilfe', suche: 'Suche', 'neues-thema': 'Neues Thema' }[ui.route];
    document.title = ui.route === 'start' ? 'Study Buddy' : `${navLabel} · Study Buddy`;
    if (focusId && $('#view').contains(document.getElementById(focusId))) document.getElementById(focusId).focus();
    save();
  }

  // ===========================================================================
  // Simulierte Antworten (damit sich der Prototyp lebendig anfühlt)
  // ===========================================================================
  function simulateAccept(id) {
    const u = user(id);
    if (!u.online) return;
    setTimeout(() => {
      if (!db.requestsOut[id]) return;
      delete db.requestsOut[id];
      if (!db.buddies.includes(id)) db.buddies.push(id);
      const c = { id: 'c' + (db.nextId++), with: id, subject: 'Buddy-Anfrage angenommen', unread: true, msgs: [{ me: false, t: now(), text: `Hi ${first(db.me.name)}, gerne! Wann passt es dir diese Woche?` }] };
      db.convs.push(c);
      render();
      toast(`${u.nick} hat deine Buddy-Anfrage angenommen`, { label: 'Nachricht lesen', fn: () => { ui.box = 'inbox'; openConv(c.id); } });
    }, 5000);
  }
  function simulateReply(convId) {
    const c = db.convs.find((x) => x.id === convId);
    const u = user(c.with);
    if (!u.online) return;
    setTimeout(() => {
      c.msgs.push({ me: false, t: now(), text: 'Passt mir gut. Dann bis dann!' });
      const viewing = ui.route === 'nachrichten' && ui.conv === convId;
      c.unread = !viewing;
      render();
      if (!viewing) toast(`Neue Nachricht von ${u.nick}`, { label: 'Lesen', fn: () => { ui.box = 'inbox'; openConv(convId); } });
    }, 4000);
  }
  function openConv(id) {
    const c = db.convs.find((x) => x.id === id);
    c.unread = false;
    ui.box = 'inbox';
    if (ui.route !== 'nachrichten') { ui.pendingConv = id; location.hash = 'nachrichten'; return; }
    ui.conv = id;
    render();
  }
  function pmTo(id) {
    const c = db.convs.find((x) => x.with === id);
    if (c) return openConv(c.id);
    modalCompose(id);
  }

  // ===========================================================================
  // Ereignisse
  // ===========================================================================
  const needLogin = (msg) => { if (db.loggedIn) return false; modalLogin(msg); return true; };

  document.addEventListener('click', (e) => {
    if (e.target.id === 'overlay') return closeModal();
    if (e.target.closest('[data-skip]')) { e.preventDefault(); $('#inhalt').focus(); return; }

    const slot = e.target.closest('[data-slot]');
    if (slot) { const k = slot.dataset.slot, a = db.me.avail; db.me.avail = a.includes(k) ? a.filter((x) => x !== k) : [...a, k]; return render(); }
    const rslot = e.target.closest('[data-regslot]');
    if (rslot) {
      const k = rslot.dataset.regslot, a = reg.d.avail;
      reg.d.avail = a.includes(k) ? a.filter((x) => x !== k) : [...a, k];
      const on = reg.d.avail.includes(k);
      rslot.classList.toggle('on', on); rslot.setAttribute('aria-pressed', on);
      return;
    }

    const t = e.target.closest('[data-act]');
    if (!t) return;
    const id = t.dataset.id;
    switch (t.dataset.act) {
      case 'close': return closeModal();
      case 'login': return modalLogin();
      case 'register': return startRegister();
      case 'demo': closeModal(true); db.loggedIn = true; render(); return toast('Du bist mit dem Demo-Konto angemeldet (lena.m).');
      case 'logout': db.loggedIn = false; ui.box = 'inbox'; ui.conv = null; render(); return toast('Du bist abgemeldet.');
      case 'reg-back': regCollect(); reg.error = ''; reg.step--; return renderRegister();

      case 'board-filter': ui.boardFilter = id; return render();
      case 'new-topic': e.preventDefault(); ui.newTopicBoard = id; if (needLogin('Um ein Thema zu eröffnen, melde dich bitte an.')) return; return go('#neues-thema');
      case 'to-reply': { if (needLogin('Um zu antworten, melde dich bitte an.')) return; const r = $('#reply-text'); r.scrollIntoView({ block: 'center' }); r.focus(); return; }
      case 'quote': {
        if (needLogin('Um zu antworten, melde dich bitte an.')) return;
        const th = threadById(ui.param), p = th.posts[+t.dataset.i];
        const q = `> ${user(p.author).nick} schrieb:\n` + p.text.split('\n').filter((l) => !l.startsWith('>')).filter(Boolean).map((l) => `> ${l}`).join('\n') + '\n\n';
        const r = $('#reply-text'); r.value = q + r.value; r.scrollIntoView({ block: 'center' }); r.focus(); r.setSelectionRange(r.value.length, r.value.length);
        return;
      }

      case 'ask': return modalAsk(id);
      case 'ice': $('#ask-text').value = modalAsk.ideas[+t.dataset.i]; $('#ask-text').focus(); return;
      case 'accept': case 'decline': {
        const idx = db.requestsIn.findIndex((r) => r.id === id);
        const req = db.requestsIn[idx];
        db.requestsIn.splice(idx, 1);
        const acc = t.dataset.act === 'accept';
        if (acc) { db.buddies.push(id); delete db.requestsOut[id]; }
        render();
        return toast(acc ? `${user(id).nick} ist jetzt dein Buddy` : `Anfrage von ${user(id).nick} abgelehnt`, { label: 'Rückgängig', fn: () => { db.requestsIn.splice(idx, 0, req); if (acc) db.buddies = db.buddies.filter((b) => b !== id); render(); } });
      }
      case 'withdraw': { const old = db.requestsOut[id]; delete db.requestsOut[id]; render(); return toast('Anfrage zurückgezogen', { label: 'Rückgängig', fn: () => { db.requestsOut[id] = old; render(); } }); }
      case 'remove-buddy': { const idx = db.buddies.indexOf(id); db.buddies.splice(idx, 1); render(); return toast(`${user(id).nick} aus deiner Buddyliste entfernt`, { label: 'Rückgängig', fn: () => { db.buddies.splice(idx, 0, id); render(); } }); }
      case 'kudos': return modalKudos(id);
      case 'pm': if (needLogin('Um Nachrichten zu schreiben, melde dich bitte an.')) return; return pmTo(id);
      case 'compose': return modalCompose();
      case 'box': ui.box = id; ui.conv = null; return render();
      case 'open-conv': return openConv(id);
      case 'conv-back': ui.conv = null; return render();

      case 'group-tab': ui.groupTab = id; return render();
      case 'new-group': if (needLogin('Um eine Lerngruppe einzutragen, melde dich bitte an.')) return; return modalNewGroup();
      case 'join': case 'leave': {
        const s = db.sessions.find((x) => x.id === id), join = t.dataset.act === 'join';
        s.joined = join; s.taken += join ? 1 : -1; render();
        return toast(join ? `Angemeldet: ${fmtDate(s.date, { weekday: 'short', day: '2-digit', month: '2-digit' })}, ${s.from} Uhr` : 'Vom Termin abgemeldet', { label: 'Rückgängig', fn: () => { s.joined = !join; s.taken += join ? -1 : 1; render(); } });
      }
      case 'reset-members': Object.assign(ui, { mCourse: db.loggedIn ? 'mine' : 'all', mStyle: '', mPlace: '', mOnline: false }); return render();

      case 'rm-course': { const idx = db.me.courses.indexOf(id); db.me.courses.splice(idx, 1); render(); return toast(`${courseName(id)} entfernt`, { label: 'Rückgängig', fn: () => { db.me.courses.splice(idx, 0, id); render(); } }); }
      case 'add-course': { const v = $('#add-course').value; if (!db.me.courses.includes(v)) db.me.courses.push(v); render(); return toast(`${courseName(v)} hinzugefügt`); }
      case 'reset-ask': ui.confirmReset = true; return render();
      case 'reset-cancel': ui.confirmReset = false; return render();
      case 'reset-do': db = { ...seed(), loggedIn: true }; ui.confirmReset = false; render(); return toast('Prototyp zurückgesetzt');
    }
  });

  document.addEventListener('change', (e) => {
    const el = e.target;
    if (el.dataset.ui) { ui[el.dataset.ui] = el.type === 'checkbox' ? el.checked : el.value; return render(); }
    if (el.dataset.me === 'study') { db.me.study = el.value; return render(); }
    if (el.dataset.me === 'semester') { db.me.semester = +el.value; return render(); }
    if (el.name === 'me-style') { db.me.style = el.value; return render(); }
    if (el.name === 'me-place') { db.me.places = $$('input[name="me-place"]:checked').map((i) => i.value); return render(); }
  });

  document.addEventListener('input', (e) => {
    const el = e.target, k = el.dataset.me;
    if (k === 'name' || k === 'nick' || k === 'bio') {
      db.me[k] = el.value;
      save();
      if (k === 'bio') $('#bio-count').textContent = `${el.value.length}/300 Zeichen`;
      const pc = completeness();
      $('#pc-label').innerHTML = `<b>${pc}% vollständig</b>`;
      $('.progress i').style.width = pc + '%';
      $('#checklist').innerHTML = checklistHtml();
      if (k === 'nick') renderChrome();
    }
  });

  document.addEventListener('submit', (e) => {
    const f = e.target;
    e.preventDefault();
    switch (f.id) {
      case 'search-form': ui.q = $('#q').value; return go('#suche');
      case 'login-form': closeModal(true); db.loggedIn = true; render(); return toast(`Willkommen zurück, ${db.me.nick}!`);
      case 'reg-form': return regNext();
      case 'ask-form': {
        const id = f.dataset.id, text = $('#ask-text').value.trim();
        if (!text) return $('#ask-text').focus();
        db.requestsOut[id] = { t: now(), text };
        closeModal(true); render();
        toast(`Buddy-Anfrage an ${user(id).nick} gesendet`, { label: 'Rückgängig', fn: () => { delete db.requestsOut[id]; render(); } });
        return simulateAccept(id);
      }
      case 'reply-form': {
        const text = $('#reply-text').value.trim();
        if (!text) { $('#reply-error').hidden = false; return $('#reply-text').focus(); }
        const th = threadById(ui.param);
        th.posts.push({ author: 'me', t: now(), text });
        render();
        document.getElementById(`post-${th.posts.length - 1}`)?.scrollIntoView({ block: 'start' });
        return toast('Deine Antwort wurde veröffentlicht');
      }
      case 'topic-form': {
        const board = $('#nt-board').value, type = $('input[name="nt-type"]:checked').value, ttl = $('#nt-title').value.trim(), text = $('#nt-text').value.trim();
        const err = ttl.length < 8 ? 'Der Titel ist zu kurz. Beschreib in einem Satz, worum es geht.' : text.length < 10 ? 'Bitte schreib noch ein paar Sätze in den Text.' : '';
        if (err) { const p = $('#nt-error'); p.textContent = err; p.hidden = false; return; }
        const th = { id: db.nextId++, board, type, title: ttl, views: 0, posts: [{ author: 'me', t: now(), text }] };
        db.threads.push(th); db.read.push(th.id);
        go(`#thema-${th.id}`);
        return toast('Dein Thema ist online');
      }
      case 'conv-form': {
        const text = $('#conv-text').value.trim();
        if (!text) return $('#conv-text').focus();
        const c = db.convs.find((x) => x.id === f.dataset.id);
        c.msgs.push({ me: true, t: now(), text });
        render();
        $('#conv-text').focus();
        return simulateReply(c.id);
      }
      case 'compose-form': {
        const to = $('#cm-to').value, subj = $('#cm-subj').value.trim(), text = $('#cm-text').value.trim();
        if (!subj || !text) { $('#cm-error').hidden = false; return; }
        const c = { id: 'c' + (db.nextId++), with: to, subject: subj, unread: false, msgs: [{ me: true, t: now(), text }] };
        db.convs.push(c);
        closeModal(true);
        openConv(c.id);
        toast(`Nachricht an ${user(to).nick} gesendet`);
        return simulateReply(c.id);
      }
      case 'kudos-form': {
        const picked = $$('input[name="kd"]:checked').map((i) => i.value);
        if (!picked.length) { $('#kd-error').hidden = false; return; }
        const id = f.dataset.id, ex = db.extraKudos[id] = db.extraKudos[id] || {};
        picked.forEach((k) => { ex[k] = (ex[k] || 0) + 1; });
        closeModal(); save();
        return toast(`Danke! Dein Feedback steht jetzt im Profil von ${user(id).nick}.`);
      }
      case 'group-form': {
        const v = (s) => $(s).value.trim();
        const err = !v('#ng-title') ? 'Bitte gib ein Thema an.'
          : !v('#ng-date') || daysUntil(v('#ng-date')) < 0 ? 'Bitte wähle ein Datum ab heute.'
          : !v('#ng-from') || !v('#ng-to') || v('#ng-to') <= v('#ng-from') ? 'Die Endzeit muss nach der Startzeit liegen.'
          : !v('#ng-place') ? 'Bitte gib einen Ort an, zum Beispiel einen Raum oder „Online“.' : '';
        if (err) { const p = $('#ng-error'); p.textContent = err; p.hidden = false; return; }
        const sid = 's' + (db.nextId++), tid = db.nextId++;
        db.sessions.push({ id: sid, thread: tid, course: v('#ng-course'), title: v('#ng-title'), date: v('#ng-date'), from: v('#ng-from'), to: v('#ng-to'), place: v('#ng-place'), host: 'me', seats: +v('#ng-seats'), taken: 1, joined: true });
        db.threads.push({ id: tid, board: v('#ng-course'), type: 'gruppe', session: sid, title: v('#ng-title'), views: 0, posts: [{ author: 'me', t: now(), text: v('#ng-text') || `Lerngruppe am ${fmtDate(v('#ng-date'), { weekday: 'long', day: 'numeric', month: 'long' })}. Meldet euch über den Button an!` }] });
        db.read.push(tid);
        closeModal(true); ui.groupTab = 'joined'; render();
        return toast('Deine Lerngruppe ist eingetragen');
      }
    }
  });

  document.addEventListener('keydown', (e) => {
    const open = !$('#overlay').hidden;
    if (e.key === 'Escape' && open) closeModal();
    if (e.key === 'Tab' && open) {
      const items = $$('#overlay button:not([disabled]), #overlay input, #overlay select, #overlay textarea, #overlay a[href]');
      const a = items[0], z = items[items.length - 1];
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus(); }
      else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus(); }
    }
  });

  window.addEventListener('hashchange', route);
  route();
})();
