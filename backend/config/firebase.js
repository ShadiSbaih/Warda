const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

const keyPath = path.join(__dirname, "../firebase-key.json");

if (fs.existsSync(keyPath)) {
  try {
    const serviceAccount = require(keyPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
    console.warn("⚠️ Firebase initialization failed:", error.message);
  }
} else {
  console.warn("⚠️ firebase-key.json not found. Push notifications will be disabled.");
}

module.exports = admin;