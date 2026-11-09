# Study Buddy – Beschreibung & Prompt

## Kurzbeschreibung

**Study Buddy** ist eine moderne, schlichte Webseite, auf der Studierende an ihrer Uni einen Lernpartner finden.
Man legt ein kurzes Profil an (Kurse, freie Zeiten, Lernstil) und bekommt passende Kommiliton:innen vorgeschlagen,
jeweils mit Match in Prozent. Mit einer Anfrage nimmt man Kontakt auf. Die Optik orientiert sich an Studydrive:
helle Flächen, Karten, blauer Akzent, gelb für Hervorhebungen.

## Aufbau

1. **Landingpage** – Überschrift „Lern nicht allein. Finde deinen Study Buddy.“, Beispielkarte, „So geht's“ in drei Schritten, Aufruf zum Profil-Anlegen
2. **Profil anlegen** in drei Schritten mit Fortschrittsbalken
3. **Kopfzeile** – Logo links, rechts oben: Buddy finden · Lernsessions · Meine Buddies (mit Zähler für neue Anfragen) · Profilbild
4. **Buddy finden** – Karten mit Name, Studiengang, gemeinsamen Kursen, Lernstil, Ort, gemeinsamen Zeiten und Match; Filter nach Kurs und Lernstil
5. **Anfrage senden** – vorausgefüllte Nachricht, Eisbrecher-Vorschläge, Hinweis zum ersten Treffen
6. **Lernsessions** – offene Lerngruppen mit Datum, Ort und freien Plätzen; mitmachen oder selbst anbieten
7. **Meine Buddies (Messenger)**
   - Links: Chatliste mit Suche, neuen Anfragen, Chats (letzte Nachricht, Uhrzeit, ungelesen) und gesendeten Anfragen
   - Rechts: Unterhaltung mit Tagestrennern, Uhrzeiten, „Gesehen“/„Zugestellt“, Tipp-Anzeige, Schnellantworten
   - „Treffen vorschlagen“: Lerntreffen mit Datum, Uhrzeit und Ort als Karte im Chat, zusagen oder absagen
   - Anfragen öffnen sich wie ein Chat mit Match und Gründen, darunter Annehmen/Ablehnen
   - Menü „⋯“: Profil ansehen, Feedback geben, Buddy entfernen
8. **Mein Profil** – Name, Studiengang, Kurse, Wochenplan, Lernstil, Orte

## Kleine Features

- Match in Prozent mit Begründung
- Gemeinsame freie Zeiten im Wochenplan markiert
- Eisbrecher für die erste Nachricht
- „Rückgängig“ bei wichtigen Aktionen
- Hell- und Dunkelmodus, mobile Ansicht

## Prompt, der zu dieser Seite führen könnte

> Erstelle einen klickbaren Prototypen für **„Study Buddy“**, eine moderne und schlichte Webseite, auf der Studierende an ihrer Uni einen Lernpartner finden. Optik ähnlich Studydrive: helle Flächen, Karten, blauer Akzent, gelb für Hervorhebungen. Wenige Elemente pro Seite, damit man den Überblick behält. Sprache: Deutsch. Umsetzung als statische Seite mit HTML, CSS und JavaScript ohne Backend (für Vercel), mit Beispieldaten.
>
> Aufbau: eine kurze **Landingpage** (Botschaft, Beispielkarte, „So geht's“ in drei Schritten), danach **Profil anlegen** in drei Schritten. In der App gibt es eine **Kopfzeile** mit Logo links und den Hauptfunktionen rechts oben: **Buddy finden** (Vorschlagskarten mit Match in Prozent, Filter nach Kurs und Lernstil), **Lernsessions** (offene Lerngruppen), **Meine Buddies** als Messenger (links Chatliste mit Anfragen und Suche, rechts die Unterhaltung mit Schnellantworten, Lesebestätigung und der Möglichkeit, ein Lerntreffen mit Datum, Uhrzeit und Ort vorzuschlagen, das der Buddy zu- oder absagen kann) und das **Profil** (Kurse, Wochenplan, Lernstil, Orte). Auf dem Handy zeigt die Kopfzeile nur Symbole. Hell- und Dunkelmodus.
