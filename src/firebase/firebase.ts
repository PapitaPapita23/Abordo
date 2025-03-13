
// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  UserCredential
} from "firebase/auth";
import { getStorage } from "firebase/storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_4vEdG0Cv35S5ufLcQIovdrofPcw4K3E",
  authDomain: "abordo-70372.firebaseapp.com",
  projectId: "abordo-70372",
  storageBucket: "abordo-70372.appspot.com",
  messagingSenderId: "374371425258",
  appId: "1:374371425258:web:10521a2d2b3a3c1de37093",
  measurementId: "G-25TP4GY830"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Google provider with improved settings
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Function to register/login with Google
const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

// Function to register with email and password
const registerWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function to login with email and password
const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Function to logout
const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export { 
  auth, 
  signInWithGoogle, 
  registerWithEmailAndPassword, 
  loginWithEmailAndPassword,
  logoutUser,
  onAuthStateChanged,
  storage,
  googleProvider
};
