# Bahrehdar, Kavian

## Projekttitel: SMART DASHBOARD

### Link zum MyGit-Repository
https://mygit.th-deg.de/kb10523/webprogrammierung2/

# Projektbeschreibung
### Titel: SMART HOME DASHBOARD

Thema: Stellen Sie sich ein Smart Dashboard vor, auf dem Sie alles, was zu Hause und darüber hinaus passiert, sehen können. Es gibt einen guten Überblick auf der Wettersituationen, mit der Sie Wetter bis zum 4 Tagen sehen können, damit Sie sich besser für Ihre Pläne entscheiden könenn. Es gibt auch eine dynamische Grafik, die die Luftfeuchtigkeit sowie Lufttemperature angezeigt und in Echtzeit aktualisiert werden. Außerdem gibt der Dashboard Ihnen auch diese Möglichkeit, dass verschiedene Users ein Profile erstellen. Das kann hilfreich sein, wenn zum Beispiel mehrere Personen in einem Haus wohnen und verschiedene Anpassungen haben wollen. Welche Anpassungen? Sie können gerne Ihre Tasks hinzüfugen, damit Sie nicht mehr vergessen. Zum Schluss haben Sie diese Möglichkeit, Ihre Speisepläne für Mensa-Deggendorf auch sehen. Dieses Dashboard dient als praktische Mini-Kommandozentrale für zu Hause und die täglichen Routinen, mit zusätzlichen Funktionen wie Regen- und Stromüberwachung für eine bessere Vorbereitung.

# Voraussetzugen
- Die Ausführung des Befehls node --version liefert Informationen über die installierte Version von Node.js. Die angezeigte Version ist v20.12.0
- Bootstrap 4.6.2 wurde als Framework ausgewählt.
- Die Ausführung von vue --version in der Eingabeaufforderung zeigt, dass die installierte Vue CLI-Version 5.0.8 ist.
- typescript@5.4.5
- MongoDB 7.0.7 Community 

# Installation
1. klonen Sie das Repository auf Ihrem Rechner, dafür bitte navigieren Sie in Ihrem Git-Repository zur Registerkarte „Code“, wählen Sie „Klonen“ mit dem verfügbaren HTTP-Link und kopieren Sie ihn. Öffnen Sie dann das Terminal, navigieren Sie zu dem gewünschten Ordner und führen Sie den Befehl aus: `git clone <kopierte Repository-URL>`.
2. Stellen Sie sicher, dass Node.js sowie MongoDB installiert sind
3. Nach dem clonen navigieren Sie in dem Ordner 'backend' und öffnen Sie ein Termial zum Beispiel 'Powershell'
    - `npm install`
    - `npm install ts-node`
4. Navigieren Sie in dem Ordner 'dashboard-app' und öffnen Sie bitte wieder ein Terminal (Hier wird wahrscheinlch npm install nicht funktioniert, dazu müssen Sie --legacy-peer-deps verwenden)
    - `npm install --legacy-peer-deps`
    - `npm install --legacy-peer-deps popper.js -save`
    - `npm install --legacy-peer-deps jquery`

    die jquery und popper sind für bootstrap4 benötigt

# Erste Schritte
1. Verbinden Sie sich unbedignt mit dem THD VPN.
2. Öffnen Sie Visual Studio Code und diese Verzeichnis öffnen.
3. Navigieren Sie zum Verzeichnis „backend“, indem Sie Folgendes eingeben: `cd backend`.
4. Starten Sie den Server durch Eingabe von: `npm run dev`
    - Das server läuft auf port 3000
5.  Navigieren Sie zum Ordner „dashboard-app“ durch Eingabe von `cd dashboard-app`
6. starten Sie das ClientServer durch die Eingabe von `npm run serve`
    - drucken Sie bitte unbedingt auf http://localhost:8080
7. Es wird ein Popup angezeigt, das zegit eine Fehlermeldung, drucken Sie bitte mehrmals auf "schließen", bis das Popup weg wird und drucken Sie demnächst auf "login" in Header und geben Sie die Daten ein:
    - username: Kavian
    - Password: 123123

    Sie werden danach nach Hompage umgeleitet

# Implementation der Anforderungen
- Client-Server-Anwendung mit Front- und Backend
Das Front-End nutzte HTML, CSS und JavaScript, um eine interaktive Benutzererfahrung zu bieten. Das Backend wurde mit Node.js und Express.js implementiert. Dieser architektonische Ansatz erleichterte die nahtlose Kommunikation zwischen Client und Server und ermöglichte einen effizienten Datentransfer und Aktualisierungen in Echtzeit.
- Programmier Sprache:  typescript@5.4.5
- Frontend: Vue3 with Composition API and routing, CSS, Bootstrap
Alle Komponenten wurden mit der Composition API erstellt.
Bootstrap 4 wird verwendet.
- Die Webseite folgt die THD Indentität wie LOGO und Farbe sowie Schrifftstil
- Backend: Express JS with Typescript, mongoDB Database
    - "express": "^4.19.2"
    - MongoDB 7.0.7 Community
    - Das Backend verfügt über ein DB-Verzeichnis, das ein DB-Schema und Modelle für die erforderlichen Daten enthält.
- Im header wurde ein Einstellung Icon eingebeben, mit dem Sie für jede User die URls für Sensoren, sehen, hinzüfugen, löschen sowie aktualisieren können. Diese URL wurde in dem DatenBank geschpeichert.
- User Daten können können auch gelöscht, geändert werden. Um einen neuen User hinzüfugen, loggen Sie sich aus, dann auf login seite drucken Sie bitte auf SIGN-UP, wegen der Sicheheitsrisiko kann das Password leider nicht geändert werden.

- Static Chart
    -  Es wurde eine statische Chart mit chart-js implementiert, die daten kommen von systeminformation , die als npm packet installiert worden sind.
- Dynamic Chart
    - Es wurde eine dynamische Chart mit chart-js implementiert, die Luftfeuchtigkeit sowie Temperatue von Sensoren darstellt. Die Chart wird aktualisiert, sobald eine URI mit Einstellungsicon gespeicher wird.
- Rest API
    - Im Dashboard wurde APIs von https://openweathermap.org/api sowie https://openmensa.org/ benutzt, um Wetterinformationen und Speiseplan abzurufen.
    - Es wurde aber schon selsbt definierte API implementiert (siehe: http://localhost:3000/api/task/gettask/6644df814c1a5d7b6b823152), hier nachdem Sie den Backendserver gestartet haben, können Sie selbst definierte Tasks für user sehen.
    - Es wurde User API implementiert, wo kann man userdaten abrufen, es benötigt jedoch ein Token, deswegen kann man das aktuel vermeiden.
- Open Street Map
    - Mithilfe von Leaflet.js, einer Mapping-Bibliothek, wird die Karte mit einer Basisebene von OpenStreetMap erstellt

**Sehen Sie bitte die erste Anwendungsschritte durch dieses Viedeo auf dem Wiki(https://mygit.th-deg.de/kb10523/webprogrammierung2/-/wikis/Dashboard-Anwendung)**
