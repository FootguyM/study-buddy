# Study Buddy – Beschreibung & Prompt

## Kurzbeschreibung

**Study Buddy** ist eine Webplattform, auf der Studierende an ihrer Uni schnell einen passenden Lernpartner finden.
Man trägt seine Kurse, freien Zeiten, den eigenen Lernstil und bevorzugte Lernorte ein. Die Seite schlägt dann
Kommiliton:innen vor, die zu einem passen, und zeigt, warum sie passen. Der Stil orientiert sich an Lernplattformen wie
Studydrive: hell, aufgeräumt, Navigation links, Inhalte als Karten, blauer Akzent.

## Seiten / Bereiche

0. **Landingpage**
   - Kopfzeile mit Logo, Sprunglinks (So geht's, Funktionen, Fragen) und „App öffnen“
   - Hero: „Lern nicht allein. Finde deinen Study Buddy.“ mit Beispiel-Profilkarte und zwei Buttons: „Jetzt Profil anlegen“ und „Erst mal umschauen“
   - So geht's in drei Schritten, sechs Funktionen, drei Lernstile, häufige Fragen, Abschluss-Aufruf
   - **Profil anlegen** in drei kurzen Schritten mit Fortschrittsbalken und verständlichen Fehlermeldungen

1. **Buddy finden**
   - Begrüßung und eine kurze Anleitung in 3 Schritten (Kurse eintragen → Anfrage schicken → zusammen lernen)
   - Hinweis, wenn das Profil noch unvollständig ist
   - Filterleiste mit Auswahlfeldern und Sortierung, aktive Filter als entfernbare Tags
   - Filter: Kurs, Lernstil (ruhig & konzentriert / erklären & diskutieren / gegenseitig abfragen), Lernort (Bibliothek, Online, Café/Mensa, Lernraum), „nur wer gerade online ist“
   - Profilkarten mit Name, Studiengang, Semester, gemeinsamen Kursen, Lernstil, Ort, gemeinsamen freien Zeiten und **Match in Prozent**
   - Suche nach Kurs oder Name in der oberen Leiste

2. **Profil-Ansicht einer Person (Pop-up)**
   - Kurzer Text über die Person
   - **„Warum ihr gut passt“**: automatisch erzeugte Gründe (gleiche Kurse, gleiche Zeiten, gleicher Lernstil …)
   - Wochenraster mit freien Zeiten; gemeinsame Zeiten sind gelb markiert
   - Positives Feedback anderer Buddies (z. B. „Pünktlich“, „Erklärt gut“)

3. **Anfrage senden (Pop-up)**
   - Vorausgefüllte Nachricht und **Eisbrecher-Vorschläge** zum Antippen
   - Sicherheitshinweis: erstes Treffen an einem öffentlichen Ort, Uni-Mail bleibt bis zur Bestätigung verborgen

4. **Lernsessions**
   - Liste offener Lerngruppen mit Datum, Uhrzeit, Ort, Kurs und freien Plätzen (Platz-Anzeige als Balken)
   - „Mitmachen“ / „Verlassen“ mit einem Klick
   - Eigene Session anbieten über ein einfaches Formular

5. **Anfragen & Buddies**
   - Eingehende Anfragen annehmen oder ablehnen
   - Liste der eigenen Buddies mit einfachem **Chat** und Schnellantworten
   - **Feedback geben** nach dem Lernen (nur positive Kudos)
   - Gesendete Anfragen mit Status „Wartet auf Antwort“

6. **Mein Profil**
   - Kurse hinzufügen/entfernen
   - Freie Zeiten im Wochenraster antippen (Mo–Sa, Vormittag/Nachmittag/Abend)
   - Lernstil, Lernorte und „Über mich“-Text
   - **Fortschrittsbalken** „Profil zu X % vollständig“
   - Änderungen wirken sofort auf die Match-Werte

7. **Seitenleiste**
   - **Klausur-Countdown**: Tage bis zu den Klausuren der eigenen Kurse
   - Lerntipp der Woche

## Kleine Features (Ideen)

- Onboarding in drei Schritten statt eines langen Formulars
- „Rückgängig“ bei wichtigen Aktionen
- Hilfreiche leere Zustände mit einem nächsten Schritt

- Match-Prozent mit Begründung statt Blackbox
- Gemeinsame freie Zeiten auf einen Blick
- Eisbrecher-Nachrichten, damit der erste Schritt leichter fällt
- Klausur-Countdown pro Kurs
- Online-Status (grüner Punkt)
- Positive Kudos statt Sterne-Bewertungen
- Sicherheitshinweis für erste Treffen
- Profil-Vollständigkeit als Motivation
- Mobile Ansicht mit Tab-Leiste unten

## Prompt, der zu dieser Seite führen könnte

> Erstelle einen klickbaren Prototypen für eine Webseite namens **„Study Buddy“**, auf der Studierende an ihrer Uni einen Lernpartner finden. Die Seite beginnt mit einer **Landingpage** (Hero mit klarer Botschaft, „So geht's“ in drei Schritten, Funktionen, Lernstile, FAQ, Abschluss-Aufruf) und einem kurzen **Onboarding in drei Schritten**, um das eigene Profil anzulegen. Die Seite soll einfach und übersichtlich sein und sich optisch an Studydrive orientieren: helle Oberfläche, linke Seitennavigation, Inhalte als Karten, blauer Akzent, gelb für Hervorhebungen. Sprache: Deutsch. Umsetzung als statische Seite mit HTML, CSS und JavaScript (für Vercel), ohne Backend, mit Beispieldaten (ca. 8 fiktive Studierende, Kurse wie Statistik II, Mikroökonomie, Kosten- und Leistungsrechnung).
>
> Bereiche:
> 1. **Buddy finden**: Profilkarten mit Name, Studiengang, Semester, gemeinsamen Kursen, Lernstil, Lernort, gemeinsamen freien Zeiten und einem Match in Prozent. Filter nach Kurs, Lernstil, Ort und „gerade online“. Suchfeld oben.
> 2. **Profil-Pop-up**: Über-mich-Text, Liste „Warum ihr gut passt“, Wochenraster mit gemeinsamen Zeiten, positives Feedback anderer.
> 3. **Anfrage senden**: Nachricht mit Eisbrecher-Vorschlägen und einem Sicherheitshinweis für das erste Treffen.
> 4. **Lernsessions**: offene Lerngruppen mit Datum, Ort, freien Plätzen, Mitmachen-Button und Formular, um eine eigene Session anzubieten.
> 5. **Anfragen & Buddies**: Anfragen annehmen/ablehnen, einfacher Chat mit Buddies, Feedback (Kudos) geben.
> 6. **Mein Profil**: Kurse, freie Zeiten (Wochenraster zum Antippen), Lernstil, Orte, Bio und eine Anzeige, wie vollständig das Profil ist.
> 7. **Seitenleiste**: Klausur-Countdown für die eigenen Kurse und ein Lerntipp.
>
> Usability: jede Seite hat einen klaren Seitenkopf mit Titel, kurzer Erklärung und einer Hauptaktion; Tabs statt langer Listen; hilfreiche leere Zustände; „Rückgängig“ bei Ablehnen, Austragen und Entfernen; verständliche Fehlermeldungen; Tastaturbedienung und sichtbarer Fokus; automatisches Speichern im Browser.
>
> Wichtig: einfache Bedienung, wenige Klicks, funktioniert auch auf dem Handy (dann Navigation als Tab-Leiste unten), Hell- und Dunkelmodus.
