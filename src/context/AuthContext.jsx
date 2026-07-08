// src/context/AuthContext.jsx
// Provides currentUser, login, signup, logout globally via React Context

import { createContext, useContext, useState, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../services/firebase';

// --- Demo mode fallback (no Firebase config) ---
const DEMO_USER = {
  uid: 'demo-user-123',
  email: 'demo@roboinvento.dev',
  displayName: 'Preetam',
  photoURL: null,
};

/** Check if Firebase is configured with real credentials */
function isFirebaseConfigured() {
  return (
    import.meta.env.VITE_FIREBASE_API_KEY &&
    !import.meta.env.VITE_FIREBASE_API_KEY.includes('your_')
  );
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode] = useState(!isFirebaseConfigured());

  useEffect(() => {
    if (isDemoMode) {
      // Auto-login demo user so app is usable without Firebase
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, [isDemoMode]);

  async function signup(email, password, displayName) {
    if (isDemoMode) {
      setCurrentUser({ ...DEMO_USER, email, displayName });
      return;
    }
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    return cred;
  }

  async function login(email, password) {
    if (isDemoMode) {
      setCurrentUser({ ...DEMO_USER, email });
      return;
    }
    return signInWithEmailAndPassword(auth, email, password);
  }

  async function loginWithGoogle() {
    if (isDemoMode) {
      setCurrentUser({ ...DEMO_USER, displayName: 'Google User' });
      return;
    }
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  async function logout() {
    if (isDemoMode) {
      setCurrentUser(null);
      return;
    }
    return signOut(auth);
  }

  const value = {
    currentUser,
    isDemoMode,
    signup,
    login,
    loginWithGoogle,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

/** Custom hook — use this instead of useContext(AuthContext) directly */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}
