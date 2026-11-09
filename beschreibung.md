# Study Buddy – Beschreibung & Prompt

## Kurzbeschreibung

**Study Buddy** ist ein Online-Forum, in dem Studierende an ihrer Uni Lernpartner finden. Jeder Kurs hat ein eigenes
Unterforum. Dort posten Studierende Gesuche („Suche Buddy“), stellen Fragen zum Stoff oder laden zu Lerngruppen ein.
Passende Lernpartner kann man direkt als Buddy anfragen. Nimmt die Person an, schreibt man sich über private Nachrichten.

Der Stil ist bewusst schlicht und klassisch: dunkelblaues Kopfband, Navigationsleiste, Brotkrumen, Tabellen mit
Kategorie-Kopfzeilen, Beiträge mit Autorenspalte, Ränge und Signaturen. Keine großen runden Karten, keine Verläufe.

## Bereiche

1. **Forum (Startseite)**
   - Für Gäste: kurze Erklärung „So funktioniert's“, Buttons „Registrieren“ und „Demo-Zugang“
   - Für Angemeldete: „Willkommen zurück“ mit Hinweis auf neue Anfragen und Nachrichten
   - Kategorien (Wirtschaftswissenschaften, Mathematik & Informatik, Psychologie, Rund ums Studium) mit Unterforen pro Kurs
   - Spalten: Themen, Beiträge, letzter Beitrag; eigene Kurse mit ★ markiert, neue Beiträge hervorgehoben
   - Seitenleiste: neue Gesuche, Klausur-Countdown, „Wer ist online?“, Statistik

2. **Kursforum**
   - Themenliste mit Präfixen: Suche Buddy, Frage, Lerngruppe, Info
   - Angepinnte Themen oben, Filter nach Art, Sortierung
   - Button „Neues Thema“

3. **Thema**
   - Beiträge mit Autorenspalte: Avatar, Benutzername, Rang, Studium, Beiträge, dabei seit, Online-Status
   - Bei „Suche Buddy“: Kasten mit Kursen, freien Zeiten, Lernort, Lernstil, Match in Prozent und Gründen, Button „Als Buddy anfragen“
   - Bei „Lerngruppe“: Termin, Ort, Plätze und Button „Teilnehmen“
   - Zitieren, Antworten, Signaturen

4. **Lernpartner finden** – Mitgliederliste mit Match, gemeinsamen Kursen und Filtern

5. **Mitgliederprofil** – Über mich, „Passt die Person zu dir?“, Wochenplan mit gemeinsamen Zeiten, Feedback, letzte Beiträge

6. **Lerngruppen** – Terminliste, Teilnehmen/Abmelden, eigene Lerngruppe eintragen (erstellt automatisch ein Thema)

7. **Nachrichten** (überarbeitete „Anfragen & Buddies“)
   - Ordner links: Posteingang, Buddy-Anfragen, Meine Buddies, Gesendete Anfragen
   - Posteingang als Liste mit Betreff, ungelesene Nachrichten fett; Unterhaltungen mit Antwortfeld
   - Buddy-Anfragen mit Match, gemeinsamen Kursen und Nachricht; Annehmen, Ablehnen, Profil
   - Kurze Erklärung, was beim Annehmen passiert
   - Buddyliste mit Status und den Aktionen Nachricht, Feedback, Entfernen

8. **Persönlicher Bereich** – Profil, Kurse, Lernzeiten, Lernstil und Orte, Fortschrittsanzeige, automatisches Speichern

9. **Hilfe & FAQ** mit Forenregeln, **Suche** über Themen und Mitglieder

10. **Anmelden / Registrieren** – Registrierung in drei Schritten mit verständlichen Fehlermeldungen

## Kleine Features

- Match in Prozent mit Begründung
- Gemeinsame freie Zeiten im Wochenplan markiert
- Eisbrecher-Vorschläge für die erste Buddy-Anfrage
- Klausur-Countdown für die eigenen Kurse
- Positives Feedback (Kudos) statt Sternebewertung
- „Rückgängig“ bei Ablehnen, Entfernen, Abmelden von Terminen
- Lesen ohne Konto, Schreiben nach Anmeldung
- Hell- und Dunkelmodus, mobile Ansicht

## Prompt, der zu dieser Seite führen könnte

> Erstelle einen klickbaren Prototypen für **„Study Buddy“**, ein Online-Forum, in dem Studierende an ihrer Uni Lernpartner finden. Die Seite soll wie ein typisches Forum aussehen (ähnlich phpBB oder Studydrive): dunkelblaues Kopfband mit Logo und Suche, Navigationsleiste, Brotkrumen, Tabellen mit Kategorie-Kopfzeilen, Beiträge mit Autorenspalte, Ränge und Signaturen. Schlichter, dichter Stil ohne große runde Karten und ohne Verläufe. Sprache: Deutsch. Umsetzung als statische Seite mit HTML, CSS und JavaScript ohne Backend (für Vercel), mit Beispieldaten (ca. 8 fiktive Studierende, Kurse wie Statistik II, Mikroökonomie, Kosten- und Leistungsrechnung).
>
> Bereiche:
> 1. **Forum-Startseite** mit Unterforen pro Kurs (Themen, Beiträge, letzter Beitrag), für Gäste eine kurze Erklärung mit „Registrieren“ und „Demo-Zugang“, Seitenleiste mit neuen Gesuchen, Klausur-Countdown, „Wer ist online?“ und Statistik.
> 2. **Kursforum** mit Themenliste und Präfixen (Suche Buddy, Frage, Lerngruppe, Info), angepinnten Themen, Filter und „Neues Thema“.
> 3. **Thema** mit Beiträgen, Zitieren und Antworten. Bei „Suche Buddy“ unter dem ersten Beitrag Kurse, Zeiten, Ort, Lernstil, Match in Prozent mit Gründen und „Als Buddy anfragen“.
> 4. **Lernpartner finden**: Mitgliederliste mit Match und Filtern. **Mitgliederprofil** mit Wochenplan und gemeinsamen Zeiten.
> 5. **Lerngruppen**: Terminliste mit Teilnehmen und „Lerngruppe eintragen“.
> 6. **Nachrichten**: Posteingang, Buddy-Anfragen (annehmen/ablehnen), Buddyliste, gesendete Anfragen.
> 7. **Persönlicher Bereich** für Profil, Kurse, Lernzeiten, Lernstil und Orte. **Hilfe & FAQ** mit Forenregeln.
>
> Usability: Lesen ohne Konto, Schreiben nach Anmeldung; Registrierung in drei Schritten; klare Seitentitel; „Rückgängig“ bei wichtigen Aktionen; hilfreiche leere Zustände; verständliche Fehlermeldungen; Tastaturbedienung; mobil nutzbar; Hell- und Dunkelmodus.
