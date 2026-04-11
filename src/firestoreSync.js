// ─── Firestore Sync Layer ────────────────────────────────────
// Fire-and-forget sync functions that mirror localStorage data to Firestore.
// All functions are safe to call even if Firestore is unavailable — they
// silently no-op so the app works identically with or without Firebase.
import { db } from "./firebase.js";
import {
  doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, addDoc,
  collection, increment, arrayUnion
} from "firebase/firestore";

// ─── Helpers ─────────────────────────────────────────────────
const emailToDocId = (email) => email.toLowerCase().trim();

// Check db at call time, not at module load time
const isReady = () => {
  if (!db) {
    console.warn("[Firestore] db is null — Firestore not initialized");
    return false;
  }
  return true;
};

// ─── User Sync ───────────────────────────────────────────────

/** Upsert a user document (includes passwordHash — it's already SHA-256 hashed) */
export const syncUserToFirestore = async (userObj) => {
  if (!isReady()) return;
  try {
    const docId = emailToDocId(userObj.email);
    console.log("[Firestore] Syncing user:", docId);
    await setDoc(doc(db, "users", docId), {
      ...userObj,
      lastSyncedAt: Date.now()
    }, { merge: true });
    console.log("[Firestore] User synced successfully:", docId);
  } catch (err) {
    console.error("[Firestore] syncUser failed:", err.message, err);
  }
};

/** Fetch ALL users from Firestore (for admin dashboard) */
export const fetchAllUsersFromFirestore = async () => {
  if (!isReady()) return null;
  try {
    console.log("[Firestore] Fetching all users...");
    const snapshot = await getDocs(collection(db, "users"));
    const users = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      users[docSnap.id] = data;
    });
    console.log("[Firestore] Fetched", Object.keys(users).length, "users from Firestore");
    return users;
  } catch (err) {
    console.error("[Firestore] fetchAllUsers failed:", err.message, err);
    return null;
  }
};

/** Update specific fields for a user */
export const syncUserUpdateToFirestore = async (email, updates) => {
  if (!isReady()) return;
  try {
    const docId = emailToDocId(email);
    // Use setDoc with merge instead of updateDoc to handle missing docs
    await setDoc(doc(db, "users", docId), {
      ...updates,
      lastSyncedAt: Date.now()
    }, { merge: true });
    console.log("[Firestore] User updated:", docId);
  } catch (err) {
    console.error("[Firestore] syncUserUpdate failed:", err.message, err);
  }
};

/** Fetch a single user from Firestore by email (for cross-device login) */
export const fetchUserFromFirestore = async (email) => {
  if (!isReady()) return null;
  try {
    const docId = emailToDocId(email);
    const docSnap = await getDoc(doc(db, "users", docId));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.error("[Firestore] fetchUser failed:", err.message);
    return null;
  }
};

/** Delete a user document */
export const deleteUserFromFirestore = async (email) => {
  if (!isReady()) return;
  try {
    const docId = emailToDocId(email);
    await deleteDoc(doc(db, "users", docId));
    console.log("[Firestore] User deleted:", docId);
  } catch (err) {
    console.error("[Firestore] deleteUser failed:", err.message, err);
  }
};

// ─── Analytics Sync ──────────────────────────────────────────

/** Sync a visit event — increments totalVisits and today's hit count */
export const syncVisitToFirestore = async () => {
  if (!isReady()) return;
  try {
    const today = new Date().toISOString().split("T")[0];
    const todayKey = today.replace(/-/g, "_"); // Firestore-safe key (no hyphens in nested paths)
    await setDoc(doc(db, "analytics", "global"), {
      totalVisits: increment(1),
      dailyHits: { [todayKey]: increment(1) },
      lastUpdated: Date.now()
    }, { merge: true });
  } catch (err) {
    console.error("[Firestore] syncVisit failed:", err.message, err);
  }
};

/** Sync a login event — appends to loginHistory array */
export const syncLoginToFirestore = async (email) => {
  if (!isReady()) return;
  try {
    const today = new Date().toISOString().split("T")[0];
    await setDoc(doc(db, "analytics", "global"), {
      loginHistory: arrayUnion({
        email,
        timestamp: Date.now(),
        date: today
      }),
      lastUpdated: Date.now()
    }, { merge: true });
    console.log("[Firestore] Login event synced for:", email);
  } catch (err) {
    console.error("[Firestore] syncLogin failed:", err.message, err);
  }
};

/** Fetch analytics from Firestore (for admin dashboard) */
export const fetchAnalyticsFromFirestore = async () => {
  if (!isReady()) return null;
  try {
    console.log("[Firestore] Fetching analytics...");
    const docSnap = await getDoc(doc(db, "analytics", "global"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log("[Firestore] Analytics fetched:", data);
      return data;
    }
    console.log("[Firestore] No analytics document found yet");
    return null;
  } catch (err) {
    console.error("[Firestore] fetchAnalytics failed:", err.message, err);
    return null;
  }
};

// ─── Feedback & Corrections Sync ────────────────────────────

/** Submit a feedback item */
export const submitFeedbackToFirestore = async (feedbackObj) => {
  if (!isReady()) return;
  try {
    await addDoc(collection(db, "feedback"), { ...feedbackObj, syncedAt: Date.now() });
    console.log("[Firestore] Feedback submitted");
  } catch (err) {
    console.error("[Firestore] submitFeedback failed:", err.message);
  }
};

/** Submit a correction item */
export const submitCorrectionToFirestore = async (correctionObj) => {
  if (!isReady()) return;
  try {
    await addDoc(collection(db, "corrections"), { ...correctionObj, syncedAt: Date.now() });
    console.log("[Firestore] Correction submitted");
  } catch (err) {
    console.error("[Firestore] submitCorrection failed:", err.message);
  }
};

/** Fetch all feedback from Firestore (admin) */
export const fetchAllFeedbackFromFirestore = async () => {
  if (!isReady()) return null;
  try {
    const snapshot = await getDocs(collection(db, "feedback"));
    const items = [];
    snapshot.forEach((docSnap) => {
      items.push({ ...docSnap.data(), docId: docSnap.id });
    });
    return items;
  } catch (err) {
    console.error("[Firestore] fetchFeedback failed:", err.message);
    return null;
  }
};

/** Fetch all corrections from Firestore (admin) */
export const fetchAllCorrectionsFromFirestore = async () => {
  if (!isReady()) return null;
  try {
    const snapshot = await getDocs(collection(db, "corrections"));
    const items = [];
    snapshot.forEach((docSnap) => {
      items.push({ ...docSnap.data(), docId: docSnap.id });
    });
    return items;
  } catch (err) {
    console.error("[Firestore] fetchCorrections failed:", err.message);
    return null;
  }
};

/** Toggle resolved status on a feedback item */
export const updateFeedbackResolvedInFirestore = async (docId, resolved) => {
  if (!isReady()) return;
  try {
    await updateDoc(doc(db, "feedback", docId), { resolved });
  } catch (err) {
    console.error("[Firestore] updateFeedbackResolved failed:", err.message);
  }
};

/** Toggle resolved status on a correction item */
export const updateCorrectionResolvedInFirestore = async (docId, resolved) => {
  if (!isReady()) return;
  try {
    await updateDoc(doc(db, "corrections", docId), { resolved });
  } catch (err) {
    console.error("[Firestore] updateCorrectionResolved failed:", err.message);
  }
};
