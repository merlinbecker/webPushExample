# WebPush Demo - Replit Projekt

## Projektübersicht
Minimales WebPush-Benachrichtigungsbeispiel mit Express.js Backend und vanille JavaScript Frontend.

## Replit Konfiguration
- **Port:** 5000 (Frontend-Server)
- **Host:** 0.0.0.0 (für Replit Proxy-Kompatibilität)
- **Workflow:** "WebPush Demo Server" startet `npm start`

## Letzte Änderungen
- **2024-09-14:** Projekt für Replit eingerichtet
  - Server.js für Port 5000 und 0.0.0.0 Host konfiguriert
  - Dependencies installiert (express, web-push)
  - Workflow für automatischen Start konfiguriert
  - README.md mit detaillierter Projektbeschreibung erstellt

## Projektarchitektur
- **Backend:** Express.js Server mit VAPID-Key-Generierung
- **Frontend:** Alpine.js + Pico.css für einfache UI
- **Service Worker:** Behandelt Push-Event-Empfang
- **Storage:** In-Memory (nur für Demo-Zwecke)

## Benutzerpräferenzen
- Deutsch als Hauptsprache
- Minimaler, funktionaler Code-Stil
- Ausführliche Kommentierung für Demo-Zwecke