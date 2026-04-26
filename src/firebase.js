// ─── Firebase Configuration ──────────────────────────────────
// Config values are read from environment variables (VITE_FIREBASE_*)
// Set them in .env.local for local dev, and in Vercel dashboard for production
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const DEV = !!import.meta.env?.DEV;
const devLog = (...args) => { if (DEV) console.log(...args); };
const devWarn = (...args) => { if (DEV) console.warn(...args); };

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

devLog("[Firebase] Config check — apiKey present:", !!firebaseConfig.apiKey, "projectId:", firebaseConfig.projectId || "MISSING");

if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    devLog("[Firebase] Firestore initialized successfully for project:", firebaseConfig.projectId);
  } catch (err) {
    initError = err;
    // Keep errors visible in production (they're useful for ops) but drop the stack
    console.error("[Firebase] Init failed:", err.message);
  }
} else {
  devWarn("[Firebase] Not configured — running in localStorage-only mode.");
}

export { db, initError };
export const firestoreAvailable = isConfigured && !!db;
