// src/services/firebase.js
// Firebase initialization and exported service instances

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Validate that all required env vars are set
const missingKeys = Object.entries(firebaseConfig).filter(
  ([, v]) => !v || v.includes('your_')
);

if (missingKeys.length > 0) {
  console.warn(
    '[Inventory Robo] Firebase config missing. Running in demo mode.\n' +
    'Fill in your .env file with real Firebase credentials to enable auth + database.'
  );
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
