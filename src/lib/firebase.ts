import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDJURF9B9Sp865e7i3BjD52UZyFdinwvTE",
  authDomain: "payement-da78c.firebaseapp.com",
  projectId: "payement-da78c",
  storageBucket: "payement-da78c.firebasestorage.app",
  messagingSenderId: "1079118817672",
  appId: "1:1079118817672:web:dc3294e61026b8b5b0323d",
  measurementId: "G-QR33L8S0G2",
};

// ✅ Prevent re-initializing Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Firebase Auth
export const auth = getAuth(app);

// ✅ Optional Analytics
let analytics = null;
if (typeof window !== "undefined") {
  import("firebase/analytics").then(({ getAnalytics }) => {
    analytics = getAnalytics(app);
  });
}

export { app, analytics };
