# Study Buddy

Prototyp einer Webseite, auf der Studierende an ihrer Uni einen Lernpartner finden.
Entstanden als Uni-Projekt. Alle Personen, Kurse und Termine sind Beispieldaten.

## Was die Seite kann

- **Landingpage** mit Erklärung in drei Schritten, Funktionen, Lernstilen und häufigen Fragen
- **Profil anlegen** in drei kurzen Schritten (Name und Studiengang → Kurse → Lernstil, Orte und Zeiten)
- **Buddy finden**: Vorschläge mit Match in Prozent und einer Begründung, Filter nach Kurs, Lernstil und Ort, Sortierung
- **Anfrage senden** mit Eisbrecher-Vorschlägen und einem Sicherheitshinweis
- **Lernsessions**: offenen Lerngruppen beitreten oder selbst eine anbieten
- **Anfragen & Buddies**: Anfragen annehmen oder ablehnen, chatten, Feedback (Kudos) geben
- **Mein Profil** mit Wochenplan, Fortschrittsanzeige und automatischem Speichern
- **Klausur-Countdown** für die eigenen Kurse
- Rückgängig-Funktion bei wichtigen Aktionen, Hell- und Dunkelmodus, mobile Ansicht mit Tab-Leiste

Eingaben werden nur im Browser gespeichert (localStorage). Es gibt kein Backend.

## Aufbau

```
index.html          Landingpage und App-Gerüst
assets/styles.css   Gestaltung (Farben, Layout, Hell/Dunkel)
assets/app.js       Logik, Beispieldaten und Seiten der App
beschreibung.md     Beschreibung der Seite und Prompt
```

Die Seiten der App werden über die Adresse gesteuert: `#start` (Landingpage), `#finden`, `#sessions`, `#anfragen`, `#profil`.

## Lokal ansehen

`index.html` im Browser öffnen. Es wird nichts installiert und nichts gebaut.

## Auf Vercel veröffentlichen

1. Auf [vercel.com](https://vercel.com) anmelden und **Add New → Project** wählen.
2. Dieses Repository importieren.
3. Framework Preset: **Other**. Build Command und Output Directory leer lassen.
4. **Deploy** klicken. Danach wird jede Änderung im `main`-Branch automatisch veröffentlicht.
