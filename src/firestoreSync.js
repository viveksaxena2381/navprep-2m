// ─── Firestore Sync Layer ────────────────────────────────────
// Fire-and-forget sync functions that mirror localStorage data to Firestore.
// All functions are safe to call even if Firestore is unavailable — they
// silently no-op so the app works identically with or without Firebase.
import { db, firestoreAvailable } from "./firebase.js";
import {
  doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc,
  collection, increment, arrayUnion, serverTimestamp
} from "firebase/firestore";

// ─── Helpers ─────────────────────────────────────────────────
// Firestore doc IDs can't contain '/' — emails with dots are fine
const emailToDocId = (email) => email.toLowerCase().trim();

const guard = () => firestoreAvailable && db;

// ─── User Sync ───────────────────────────────────────────────

/** Upsert a user document (strips passwordHash for security) */
export const syncUserToFirestore = async (userObj) => {
  if (!guard()) return;
  try {
    const { passwordHash, ...safeUser } = userObj;
    const docId = emailToDocId(safeUser.email);
    await setDoc(doc(db, "users", docId), {
      ...safeUser,
      lastSyncedAt: Date.now()
    }, { merge: true });
  } catch (err) {
    console.warn("[Firestore] syncUser failed:", err.message);
  }
};

/** Fetch ALL users from Firestore (for admin dashboard) */
export const fetchAllUsersFromFirestore = async () => {
  if (!guard()) return null;
  try {
    const snapshot = await getDocs(collection(db, "users"));
    const users = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      users[docSnap.id] = data;
    });
    return users;
  } catch (err) {
    console.warn("[Firestore] fetchAllUsers failed:", err.message);
    return null;
  }
};

/** Update specific fields for a user */
export const syncUserUpdateToFirestore = async (email, updates) => {
  if (!guard()) return;
  try {
    const docId = emailToDocId(email);
    // Remove passwordHash if accidentally included
    const { passwordHash, ...safeUpdates } = updates;
    await updateDoc(doc(db, "users", docId), {
      ...safeUpdates,
      lastSyncedAt: Date.now()
    });
  } catch (err) {
    console.warn("[Firestore] syncUserUpdate failed:", err.message);
  }
};

/** Delete a user document */
export const deleteUserFromFirestore = async (email) => {
  if (!guard()) return;
  try {
    const docId = emailToDocId(email);
    await deleteDoc(doc(db, "users", docId));
  } catch (err) {
    console.warn("[Firestore] deleteUser failed:", err.message);
  }
};

// ─── Analytics Sync ──────────────────────────────────────────

/** Sync a visit event — increments totalVisits and today's hit count */
export const syncVisitToFirestore = async () => {
  if (!guard()) return;
  try {
    const today = new Date().toISOString().split("T")[0];
    await setDoc(doc(db, "analytics", "global"), {
      totalVisits: increment(1),
      [`dailyHits.${today}`]: increment(1),
      lastUpdated: Date.now()
    }, { merge: true });
  } catch (err) {
    console.warn("[Firestore] syncVisit failed:", err.message);
  }
};

/** Sync a login event — appends to loginHistory array */
export const syncLoginToFirestore = async (email) => {
  if (!guard()) return;
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
  } catch (err) {
    console.warn("[Firestore] syncLogin failed:", err.message);
  }
};

/** Fetch analytics from Firestore (for admin dashboard) */
export const fetchAnalyticsFromFirestore = async () => {
  if (!guard()) return null;
  try {
    const docSnap = await getDoc(doc(db, "analytics", "global"));
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (err) {
    console.warn("[Firestore] fetchAnalytics failed:", err.message);
    return null;
  }
};
