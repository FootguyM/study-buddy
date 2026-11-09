# Study Buddy

Prototyp einer Webseite, auf der Studierende an ihrer Uni einen Lernpartner finden.
Entstanden als Uni-Projekt. Alle Personen, Kurse und Termine sind Beispieldaten.

## Aufbau

- **Landingpage:** Botschaft, Beispielkarte, „So geht's“ in drei Schritten, Aufruf zum Profil-Anlegen.
- **Profil anlegen** in drei kurzen Schritten (über dich → Kurse → Lernstil, Orte und Zeiten).
- **Kopfzeile der App:** Logo links, rechts oben die Hauptfunktionen: Buddy finden, Lernsessions, Meine Buddies und das eigene Profil.
- **Buddy finden:** Vorschläge mit Match in Prozent, Filter nach Kurs und Lernstil.
- **Anfrage senden** mit Eisbrecher-Vorschlägen und Sicherheitshinweis.
- **Lernsessions:** offenen Lerngruppen beitreten oder selbst eine anbieten.
- **Meine Buddies (Messenger):** links die Chatliste mit Suche, neuen Anfragen, Chats (letzte Nachricht, Uhrzeit, ungelesen) und gesendeten Anfragen; rechts die Unterhaltung mit Tagestrennern, „Gesehen“/„Zugestellt“, Tipp-Anzeige und Schnellantworten.
  - **Lerntreffen vorschlagen:** Datum, Uhrzeit und Ort als Karte im Chat, die der Buddy zu- oder absagen kann.
  - **Anfragen** öffnen sich wie ein Chat mit Match und Gründen; Annehmen macht daraus direkt eine Unterhaltung.
  - Menü „⋯“: Profil ansehen, Feedback geben, Buddy entfernen. Auf dem Handy erst die Liste, dann der Chat mit Zurück-Pfeil.
- **Mein Profil:** Kurse, Wochenplan, Lernstil und Orte, automatisch gespeichert.

Hell- und Dunkelmodus, mobil nutzbar (auf dem Handy zeigt die Kopfzeile nur Symbole).
Eingaben werden nur im Browser gespeichert (localStorage). Es gibt kein Backend.

## Dateien

```
index.html          Landingpage und App-Gerüst
assets/styles.css   Gestaltung
assets/app.js       Logik, Beispieldaten und Seiten der App
beschreibung.md     Beschreibung der Seite und Prompt
```

## Lokal ansehen

`index.html` im Browser öffnen. Es wird nichts installiert und nichts gebaut.

## Auf Vercel veröffentlichen

1. Auf [vercel.com](https://vercel.com) **Add New → Project** wählen.
2. Dieses Repository importieren.
3. Framework Preset: **Other**. Build Command und Output Directory leer lassen.
4. **Deploy** klicken. Danach geht jede Änderung im `main`-Branch automatisch live.
