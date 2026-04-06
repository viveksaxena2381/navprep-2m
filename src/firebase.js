// ─── Firebase Configuration ──────────────────────────────────
// Config values are read from environment variables (VITE_FIREBASE_*)
// Set them in .env.local for local dev, and in Vercel dashboard for production
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Check if Firebase is properly configured (not placeholder values)
const isConfigured = firebaseConfig.apiKey &&
  firebaseConfig.apiKey.length > 10 &&
  !firebaseConfig.apiKey.startsWith("your_") &&
  !firebaseConfig.apiKey.startsWith("YOUR_") &&
  firebaseConfig.projectId &&
  firebaseConfig.projectId !== "YOUR_PROJECT_ID";

let db = null;
let initError = null;

console.log("[Firebase] Config check — apiKey present:", !!firebaseConfig.apiKey, "projectId:", firebaseConfig.projectId || "MISSING");

if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    console.log("[Firebase] Firestore initialized successfully for project:", firebaseConfig.projectId);
  } catch (err) {
    initError = err;
    console.error("[Firebase] Init failed:", err.message);
  }
} else {
  console.warn("[Firebase] Not configured — running in localStorage-only mode. Config:", {
    hasApiKey: !!firebaseConfig.apiKey,
    hasProjectId: !!firebaseConfig.projectId,
    apiKeyPrefix: firebaseConfig.apiKey ? firebaseConfig.apiKey.substring(0, 8) + "..." : "missing"
  });
}

export { db, initError };
export const firestoreAvailable = isConfigured && !!db;
