# Study Buddy

Prototyp eines Forums, in dem Studierende an ihrer Uni Lernpartner finden.
Entstanden als Uni-Projekt. Alle Personen, Beiträge und Termine sind Beispieldaten.

## Aufbau der Seite

Die Seite ist wie ein klassisches Online-Forum aufgebaut:

- **Forum (Startseite):** Unterforen pro Kurs, gruppiert nach Fachbereich, mit Anzahl der Themen und Beiträge und dem letzten Beitrag. Für Gäste gibt es oben eine kurze Erklärung, wie Study Buddy funktioniert.
- **Kursforum:** Themenliste mit Präfixen (Suche Buddy, Frage, Lerngruppe, Info), angepinnten Themen, Antworten, Zugriffen und letztem Beitrag. Filter nach Art und Sortierung.
- **Thema:** Beiträge mit Autorenspalte (Rang, Beiträge, Dabei seit, Online-Status) und Signatur. Bei „Suche Buddy“ stehen Kurse, Zeiten, Lernort, Lernstil und der Match mit dir direkt unter dem Beitrag. Antworten und Zitieren.
- **Lernpartner finden:** Mitgliederliste, sortiert nach Übereinstimmung, mit Filtern nach Kurs, Lernstil und Ort.
- **Mitgliederprofil:** Über mich, „Passt die Person zu dir?“, Wochenplan mit gemeinsamen freien Zeiten, Feedback von Buddies, letzte Beiträge.
- **Lerngruppen:** Termine als Liste. Teilnehmen oder selbst eine Lerngruppe eintragen (dabei entsteht automatisch ein Thema im Kursforum).
- **Nachrichten:** Posteingang mit Unterhaltungen, Buddy-Anfragen (annehmen/ablehnen), Buddyliste und gesendete Anfragen.
- **Persönlicher Bereich:** Profil, Kurse, Lernzeiten, Lernstil und Lernorte. Wird automatisch gespeichert.
- **Hilfe & FAQ** mit Forenregeln, **Suche** über Themen und Mitglieder.
- Anmelden (Demo-Konto) und Registrieren in drei Schritten.

Lesen geht ohne Konto, zum Schreiben muss man angemeldet sein. Wichtige Aktionen lassen sich rückgängig machen.
Eingaben werden nur im Browser gespeichert (localStorage). Es gibt kein Backend.

## Dateien

```
index.html          Gerüst: Kopfzeile, Navigation, Fußzeile
assets/styles.css   Gestaltung (Forum-Stil, Hell/Dunkel, mobil)
assets/app.js       Beispieldaten, Seiten und Logik
beschreibung.md     Beschreibung der Seite und Prompt
```

Adressen: `#start`, `#kurs-stat2`, `#thema-2`, `#mitglieder`, `#nutzer-jonas`, `#lerngruppen`, `#nachrichten`, `#profil`, `#hilfe`.

## Lokal ansehen

`index.html` im Browser öffnen. Es wird nichts installiert und nichts gebaut.

## Auf Vercel veröffentlichen

1. Auf [vercel.com](https://vercel.com) **Add New → Project** wählen.
2. Dieses Repository importieren.
3. Framework Preset: **Other**. Build Command und Output Directory leer lassen.
4. **Deploy** klicken. Danach geht jede Änderung im `main`-Branch automatisch live.
