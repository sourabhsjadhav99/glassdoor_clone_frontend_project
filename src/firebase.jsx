
// File: src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY || "AIzaSyCOhuOSAiOK18Vz9pZAjf7mgYNzrGo0STs",
  authDomain: "glassdoor-clone-c3156.firebaseapp.com",
  projectId: "glassdoor-clone-c3156",
  storageBucket: "glassdoor-clone-c3156.appspot.com",
  messagingSenderId: "592932539345",
  appId: "1:592932539345:web:1789dee48769891bdb6ef0",
  measurementId: "G-HXHQ74KGH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth();
const storage = getStorage(app)

export { app, analytics, db, auth, storage };
