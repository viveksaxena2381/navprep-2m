// ─── Firestore Sync Layer ────────────────────────────────────
// Fire-and-forget sync functions that mirror localStorage data to Firestore.
// All functions are safe to call even if Firestore is unavailable — they
// silently no-op so the app works identically with or without Firebase.
import { db } from "./firebase.js";
import {
  doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, addDoc,
  collection, increment, arrayUnion
} from "firebase/firestore";

// ─── Dev-only loggers (PII-safe for production) ─────────────
const DEV = !!import.meta.env?.DEV;
const devLog = (...args) => { if (DEV) console.log(...args); };
const devWarn = (...args) => { if (DEV) console.warn(...args); };
// Errors we KEEP in production (operational) but strip PII from the message
const errLog = (label, err) => {
  const msg = err?.message || String(err || "");
  console.error(label, msg);
};

// ─── Helpers ─────────────────────────────────────────────────
const emailToDocId = (email) => email.toLowerCase().trim();

// Check db at call time, not at module load time
const isReady = () => {
  if (!db) {
    devWarn("[Firestore] db is null — Firestore not initialized");
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
    devLog("[Firestore] Syncing user:", docId);
    await setDoc(doc(db, "users", docId), {
      ...userObj,
      lastSyncedAt: Date.now()
    }, { merge: true });
    devLog("[Firestore] User synced successfully");
  } catch (err) {
    errLog("[Firestore] syncUser failed:", err);
  }
};

/** Fetch ALL users from Firestore (for admin dashboard) */
export const fetchAllUsersFromFirestore = async () => {
  if (!isReady()) return null;
  try {
    devLog("[Firestore] Fetching all users...");
    const snapshot = await getDocs(collection(db, "users"));
    const users = {};
    snapshot.forEach((docSnap) => {
      const data = docSnap.data();
      users[docSnap.id] = data;
    });
    devLog("[Firestore] Fetched", Object.keys(users).length, "users from Firestore");
    return users;
  } catch (err) {
    errLog("[Firestore] fetchAllUsers failed:", err);
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
    devLog("[Firestore] User updated");
  } catch (err) {
    errLog("[Firestore] syncUserUpdate failed:", err);
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
    errLog("[Firestore] fetchUser failed:", err);
    return null;
  }
};

/** Delete a user document */
export const deleteUserFromFirestore = async (email) => {
  if (!isReady()) return;
  try {
    const docId = emailToDocId(email);
    await deleteDoc(doc(db, "users", docId));
    devLog("[Firestore] User deleted");
  } catch (err) {
    errLog("[Firestore] deleteUser failed:", err);
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
    errLog("[Firestore] syncVisit failed:", err);
  }
};

/** Sync visit metadata (unique visitor ID, traffic source, device type) */
export const syncVisitMetaToFirestore = async (visitorId, source, device, today) => {
  if (!isReady()) return;
  try {
    const todayKey = today.replace(/-/g, "_");
    await setDoc(doc(db, "analytics", "global"), {
      [`uniqueVisitors.${todayKey}`]: arrayUnion(visitorId),
      [`trafficSources.${source}`]: increment(1),
      [`deviceTypes.${device}`]: increment(1),
      lastUpdated: Date.now()
    }, { merge: true });
    devLog("[Firestore] Visit meta synced");
  } catch (err) {
    errLog("[Firestore] syncVisitMeta failed:", err);
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
    devLog("[Firestore] Login event synced");
  } catch (err) {
    errLog("[Firestore] syncLogin failed:", err);
  }
};

/** Fetch analytics from Firestore (for admin dashboard) */
export const fetchAnalyticsFromFirestore = async () => {
  if (!isReady()) return null;
  try {
    devLog("[Firestore] Fetching analytics...");
    const docSnap = await getDoc(doc(db, "analytics", "global"));
    if (docSnap.exists()) {
      const data = docSnap.data();
      devLog("[Firestore] Analytics fetched");
      return data;
    }
    devLog("[Firestore] No analytics document found yet");
    return null;
  } catch (err) {
    errLog("[Firestore] fetchAnalytics failed:", err);
    return null;
  }
};

// ─── Feedback & Corrections Sync ────────────────────────────

/** Submit a feedback item */
export const submitFeedbackToFirestore = async (feedbackObj) => {
  if (!isReady()) return;
  try {
    await addDoc(collection(db, "feedback"), { ...feedbackObj, syncedAt: Date.now() });
    devLog("[Firestore] Feedback submitted");
  } catch (err) {
    errLog("[Firestore] submitFeedback failed:", err);
  }
};

/** Submit a correction item */
export const submitCorrectionToFirestore = async (correctionObj) => {
  if (!isReady()) return;
  try {
    await addDoc(collection(db, "corrections"), { ...correctionObj, syncedAt: Date.now() });
    devLog("[Firestore] Correction submitted");
  } catch (err) {
    errLog("[Firestore] submitCorrection failed:", err);
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
    errLog("[Firestore] fetchFeedback failed:", err);
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
    errLog("[Firestore] fetchCorrections failed:", err);
    return null;
  }
};

/** Toggle resolved status on a feedback item */
export const updateFeedbackResolvedInFirestore = async (docId, resolved) => {
  if (!isReady()) return;
  try {
    await updateDoc(doc(db, "feedback", docId), { resolved });
  } catch (err) {
    errLog("[Firestore] updateFeedbackResolved failed:", err);
  }
};

/** Toggle resolved status on a correction item */
export const updateCorrectionResolvedInFirestore = async (docId, resolved) => {
  if (!isReady()) return;
  try {
    await updateDoc(doc(db, "corrections", docId), { resolved });
  } catch (err) {
    errLog("[Firestore] updateCorrectionResolved failed:", err);
  }
};

// ─── Exam Reports ─────────────────────────────────────────────

/** Submit a new exam report (community post-oral report) */
export const submitExamReportToFirestore = async (obj) => {
  if (!isReady()) return;
  try {
    await addDoc(collection(db, "exam_reports"), obj);
  } catch (err) {
    errLog("[Firestore] submitExamReport failed:", err);
  }
};

/** Fetch all exam reports (newest first) */
export const fetchExamReportsFromFirestore = async () => {
  if (!isReady()) return [];
  try {
    const snap = await getDocs(collection(db, "exam_reports"));
    return snap.docs.map(d => ({ ...d.data(), docId: d.id }));
  } catch (err) {
    errLog("[Firestore] fetchExamReports failed:", err);
    return [];
  }
};

// ─── Topic View Tracking (admin analytics) ───────────────────

/** Increment view count for a single topic in /analytics/topicViews */
export const syncTopicViewToFirestore = async (topicEntry) => {
  if (!isReady() || !topicEntry?.id) return;
  try {
    const safeId = String(topicEntry.id).replace(/[^a-zA-Z0-9_-]/g, "_");
    await setDoc(doc(db, "analytics", "topicViews", "items", safeId), {
      id: topicEntry.id,
      name: topicEntry.name || null,
      subjectId: topicEntry.subjectId || null,
      subjectName: topicEntry.subjectName || null,
      moduleId: topicEntry.moduleId || null,
      moduleName: topicEntry.moduleName || null,
      count: increment(1),
      lastViewedAt: Date.now(),
    }, { merge: true });
  } catch (err) {
    errLog("[Firestore] syncTopicView failed:", err);
  }
};

/** Fetch all topic-view records (admin dashboard only) */
export const fetchTopicViewsFromFirestore = async () => {
  if (!isReady()) return null;
  try {
    const snap = await getDocs(collection(db, "analytics", "topicViews", "items"));
    const items = [];
    snap.forEach(d => items.push({ ...d.data(), id: d.data().id || d.id }));
    return items;
  } catch (err) {
    errLog("[Firestore] fetchTopicViews failed:", err);
    return null;
  }
};

// ─── Oral Performance Sync ────────────────────────────────────

/** Sync oral performance data for a user to Firestore */
export const syncOralPerfToFirestore = async (email, perfData) => {
  if (!isReady()) return;
  try {
    const docId = emailToDocId(email);
    await setDoc(doc(db, "oral_perf", docId), { perf: perfData, updatedAt: Date.now() }, { merge: true });
  } catch (err) {
    errLog("[Firestore] syncOralPerf failed:", err);
  }
};
