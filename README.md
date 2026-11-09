# Study Buddy

Prototyp einer Webseite, auf der Studierende an ihrer Uni Lernpartner finden.
Entstanden als Uni-Projekt. Alle Personen und Beiträge sind Beispieldaten.

## Funktionen

Bewusst auf das Wichtigste reduziert:

- **Gesuche:** Liste aller Lernpartner-Gesuche im Forum-Stil, filterbar nach Kurs. Für Gäste steht oben eine kurze Erklärung in drei Schritten.
- **Gesuch ansehen:** Text, Kurs, wann, wo und ob ihr gemeinsame Kurse habt. Darunter öffentliche Antworten.
- **Anfrage senden:** kurze Nachricht an die Person, die das Gesuch erstellt hat.
- **Gesuch erstellen:** Kurs, Titel, Zeit, Ort und Beschreibung.
- **Nachrichten:** Anfragen annehmen oder ablehnen, mit Buddies chatten.
- **Profil:** Name, Studiengang, Kurse, freie Zeit, Lernort, Text über dich.

Lesen geht ohne Konto, zum Schreiben meldet man sich an (Demo-Konto) oder registriert sich.
Eingaben werden nur im Browser gespeichert (localStorage). Es gibt kein Backend.

## Dateien

```
index.html          Gerüst mit Kopfleiste und Fußzeile
assets/styles.css   Gestaltung (Hell/Dunkel, mobil)
assets/app.js       Beispieldaten und Logik
beschreibung.md     Beschreibung der Seite und Prompt
```

## Lokal ansehen

`index.html` im Browser öffnen. Es wird nichts installiert und nichts gebaut.

## Auf Vercel veröffentlichen

1. Auf [vercel.com](https://vercel.com) **Add New → Project** wählen.
2. Dieses Repository importieren.
3. Framework Preset: **Other**. Build Command und Output Directory leer lassen.
4. **Deploy** klicken. Danach geht jede Änderung im `main`-Branch automatisch live.
