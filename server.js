import express from "express";
import webpush from "web-push";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --- VAPID Keys: für Demo zur Laufzeit erzeugen (in Memory) ---
const { publicKey, privateKey } = webpush.generateVAPIDKeys(); // nur für Demo!
webpush.setVapidDetails(
  "mailto:example@example.com", // Demo-Subject
  publicKey,
  privateKey
);

// --- In-Memory Subscription Store (nach endpoint deduplizieren) ---
const subscriptions = new Map(); // key: endpoint, value: subscription

// Frontend braucht den Public Key
app.get("/vapidPublicKey", (_req, res) => {
  res.json({ publicKey });
});

// Client registriert/aktualisiert Subscription
app.post("/subscribe", (req, res) => {
  const sub = req.body;
  if (!sub || !sub.endpoint) return res.status(400).json({ ok: false });
  subscriptions.set(sub.endpoint, sub);
  res.json({ ok: true, count: subscriptions.size });
});

// Trigger: nach 10s verschicken wir einen Push an alle gespeicherten Subs
app.post("/trigger", async (req, res) => {
  res.json({ ok: true, scheduledInSeconds: 10, targets: subscriptions.size });
  setTimeout(async () => {
    const payload = JSON.stringify({
      title: "Web Push ✅",
      body: "Diese Notification kam nach 10 Sekunden vom Server."
    });
    for (const [endpoint, sub] of subscriptions) {
      try {
        await webpush.sendNotification(sub, payload, { TTL: 60 });
      } catch (err) {
        // Bei 410/404 Subscription entfernen
        if (err.statusCode === 410 || err.statusCode === 404) {
          subscriptions.delete(endpoint);
        }
        console.error("send error:", err.statusCode || err.message);
      }
    }
  }, 10_000);
});

// Start - Replit erfordert 0.0.0.0:5000 für Frontend
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`➡ Server on http://0.0.0.0:${PORT}`);
  console.log(`➡ VAPID public key:\n${publicKey}`);
});
