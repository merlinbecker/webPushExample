# WebPush Demo - Ein minimales Beispiel

Dieses Projekt demonstriert eine vollständige Web Push Notification Implementation mit Node.js/Express und einer einfachen Frontend-Oberfläche.

## 🚀 Was macht diese Demo?

Diese Anwendung zeigt die drei Hauptkomponenten einer Web Push Integration:

1. **Service Worker Registrierung** - Ermöglicht Push Notifications im Browser
2. **Push Subscription** - Client abonniert Benachrichtigungen beim Server  
3. **Push Versendung** - Server sendet nach 10 Sekunden eine Test-Benachrichtigung

## 📁 Projektstruktur

```
├── server.js           # Express Server mit Web Push Logic
├── public/
│   ├── index.html      # Frontend mit Alpine.js & Pico.css
│   └── sw.js          # Service Worker für Push Handling
└── package.json       # Dependencies (express, web-push)
```

## 🔧 Technische Details

### Backend (server.js)
- **Express Server** auf Port 5000 (Replit-kompatibel)
- **VAPID Keys** werden zur Laufzeit generiert (nur für Demo!)
- **In-Memory Storage** für Push Subscriptions
- **Endpunkte:**
  - `GET /vapidPublicKey` - VAPID Public Key für Frontend
  - `POST /subscribe` - Client registriert Push Subscription
  - `POST /trigger` - Löst Push nach 10s an alle Subscribers aus

### Frontend (public/index.html)
- **Alpine.js** für reaktive UI-Logic
- **Pico.css** für minimales Styling
- **3-Schritt Prozess:**
  1. Service Worker registrieren
  2. Push Permission + Subscription beim Server registrieren
  3. Test-Push in 10 Sekunden auslösen

### Service Worker (public/sw.js)
- **Push Event Handler** - Zeigt empfangene Notifications
- **Click Handler** - Öffnet/fokussiert die Hauptseite bei Klick

## 🎯 Demo-Ablauf

1. **Schritt 1:** "Service Worker registrieren" - Registriert SW für Push Handling
2. **Schritt 2:** "Subscribe & beim Server registrieren" - Fordert Browser-Permission an und meldet Client beim Server an
3. **Schritt 3:** "Push in 10s auslösen" - Server plant Push-Versendung nach 10 Sekunden

Nach Schritt 3 erhalten Sie eine Browser-Benachrichtigung mit dem Text: "Diese Notification kam nach 10 Sekunden vom Server."

## 🔒 Sicherheitshinweise für Produktion

⚠️ **Diese Demo ist NUR für Entwicklung/Testing geeignet!**

Für Produktionsumgebungen beachten Sie:
- **VAPID Keys** persistent speichern (nicht zur Laufzeit generieren)
- **Subscriptions** in echter Datenbank speichern (nicht in Memory)
- **HTTPS** ist zwingend erforderlich für Web Push
- **Error Handling** für fehlgeschlagene Push-Versendungen
- **Subscription Cleanup** bei ungültigen Endpunkten

## 🌐 Browser-Kompatibilität

Web Push wird von allen modernen Browsern unterstützt:
- Chrome/Edge 50+
- Firefox 44+
- Safari 16+ (macOS 13+, iOS 16.4+)

## 📚 Weiterführende Ressourcen

- [MDN: Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [web.dev: Push Notifications](https://web.dev/explore/notifications)
- [RFC 8030: Generic Event Delivery Using HTTP Push](https://tools.ietf.org/rfc/rfc8030.txt)