# Study Buddy – Beschreibung & Prompt

## Kurzbeschreibung

**Study Buddy** ist eine schlichte Webseite im Stil eines Online-Forums, auf der Studierende an ihrer Uni Lernpartner
finden. Wer einen Lernpartner sucht, erstellt ein Gesuch für seinen Kurs. Andere sehen die Gesuche in einer Liste,
können öffentlich antworten oder der Person direkt eine Anfrage schicken. Nimmt sie an, schreiben beide per Nachricht.

Die Seite ist bewusst auf die wichtigsten Funktionen reduziert: drei Menüpunkte, eine schmale Inhaltsspalte,
wenige Farben.

## Seiten

1. **Gesuche (Startseite)**
   - Für Gäste: kurze Erklärung in drei Schritten, „Registrieren“ und „Demo ansehen“
   - Liste der Gesuche: Kurs, Titel, Name, Studiengang, Zeitpunkt, Anzahl Antworten
   - Filter nach Kurs (für Angemeldete standardmäßig „Meine Kurse“), Button „Gesuch erstellen“
2. **Gesuch**
   - Beitrag mit Autorenspalte, Kurs, Wann und Wo
   - Hinweis, wenn ihr gemeinsame Kurse habt
   - Button „Anfrage senden“, öffentliche Antworten und Antwortfeld
3. **Gesuch erstellen** – Kurs, Ort, Titel, Zeit, Beschreibung
4. **Nachrichten** – zwei Reiter: „Anfragen“ (annehmen, ablehnen, gesendete Anfragen) und „Buddies“ (Chat)
5. **Profil** – Name, Studiengang, Semester, Kurse, Zeit, Lernort, Über mich; Abmelden

## Kleine Features

- Hinweis auf gemeinsame Kurse im Gesuch
- Vorausgefüllte Anfrage-Nachricht mit Tipp für das erste Treffen
- Zähler für neue Anfragen und Nachrichten im Menü
- „Rückgängig“ beim Ablehnen
- Lesen ohne Konto, Schreiben nach Anmeldung
- Hell- und Dunkelmodus, mobil nutzbar

## Prompt, der zu dieser Seite führen könnte

> Erstelle einen einfachen, klickbaren Prototypen für **„Study Buddy“**, eine Webseite im Stil eines Online-Forums, auf der Studierende an ihrer Uni Lernpartner finden. Reduziere die Seite auf die wichtigsten Funktionen und halte sie übersichtlich: eine dunkelblaue Kopfleiste mit nur drei Menüpunkten (Gesuche, Nachrichten, Profil), eine schmale Inhaltsspalte, Listen statt Karten, wenige Farben. Sprache: Deutsch. Umsetzung als statische Seite mit HTML, CSS und JavaScript ohne Backend (für Vercel), mit Beispieldaten (ca. 6 fiktive Studierende, 5 Kurse, 7 Gesuche).
>
> Funktionen:
> 1. **Gesuche:** Liste aller Lernpartner-Gesuche mit Kurs, Titel, Name, Studiengang, Zeitpunkt und Anzahl Antworten; Filter nach Kurs; Button „Gesuch erstellen“. Für Gäste oben eine kurze Erklärung in drei Schritten.
> 2. **Gesuch ansehen:** Beitrag mit Autor, Kurs, Wann und Wo, Hinweis auf gemeinsame Kurse, Button „Anfrage senden“, öffentliche Antworten.
> 3. **Gesuch erstellen:** Kurs, Ort, Titel, Zeit, Beschreibung.
> 4. **Nachrichten:** Anfragen annehmen oder ablehnen, Chat mit Buddies.
> 5. **Profil:** Name, Studiengang, Semester, Kurse, Zeit, Lernort, Über mich.
>
> Lesen ohne Konto, Schreiben nach Anmeldung (Demo-Konto) oder kurzer Registrierung. Verständliche Fehlermeldungen, Hell- und Dunkelmodus, mobil nutzbar.
