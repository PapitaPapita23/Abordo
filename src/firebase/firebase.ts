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
  updateProfile,
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
  prompt: 'select_account',
  // Adding additional OAuth scopes for better user data
  access_type: 'offline',
});

// Function to register with email and password
const registerWithEmailAndPassword = async (
  email: string, 
  password: string, 
  displayName?: string
): Promise<UserCredential> => {
  try {
    console.log(`Attempting to register user with email: ${email}`);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // If displayName is provided, update the user profile
    if (displayName && userCredential.user) {
      console.log(`Updating profile for user: ${userCredential.user.uid} with name: ${displayName}`);
      await updateProfile(userCredential.user, {
        displayName: displayName
      });
    }
    
    console.log(`Registration successful for user: ${userCredential.user.uid}`);
    return userCredential;
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
};

// Function to login with email and password
const loginWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  try {
    console.log(`Attempting to login user with email: ${email}`);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(`Login successful for user: ${userCredential.user.uid}`);
    return userCredential;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
};

// Function to register/login with Google
const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error signing in with Google:", error);
    
    // Check if this is a domain authorization error and provide a more helpful message
    if (error instanceof Error && 'code' in error && error.code === 'auth/unauthorized-domain') {
      // Rethrow with a more descriptive message about domain authorization
      const currentDomain = window.location.hostname;
      const customError = new Error(`This domain (${currentDomain}) is not authorized for Firebase authentication. Please add it to your Firebase console under Authentication > Settings > Authorized domains.`);
      Object.assign(customError, { code: error.code, originalError: error });
      throw customError;
    }
    
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

// Function to get Firebase authentication errors in human-readable format
const getAuthErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    // Registration errors
    case 'auth/email-already-in-use':
      return 'Este correo electrónico ya está registrado.';
    case 'auth/invalid-email':
      return 'El formato del correo electrónico es inválido.';
    case 'auth/weak-password':
      return 'La contraseña es demasiado débil. Debe tener al menos 6 caracteres.';
    case 'auth/operation-not-allowed':
      return 'Este método de inicio de sesión no está habilitado.';
    
    // Login errors
    case 'auth/user-disabled':
      return 'Esta cuenta ha sido deshabilitada.';
    case 'auth/user-not-found':
      return 'No existe una cuenta con este correo electrónico.';
    case 'auth/wrong-password':
      return 'Contraseña incorrecta.';
    case 'auth/invalid-credential':
      return 'Credenciales inválidas. Por favor, verifica tu correo y contraseña.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos fallidos. Por favor, inténtalo más tarde.';
    
    // Google sign-in errors
    case 'auth/popup-closed-by-user':
      return 'Inicio de sesión cancelado. La ventana se cerró antes de completar el proceso.';
    case 'auth/popup-blocked':
      return 'El navegador bloqueó la ventana emergente. Por favor, permite ventanas emergentes para este sitio.';
    case 'auth/cancelled-popup-request':
      return 'La solicitud de inicio de sesión fue cancelada.';
    case 'auth/account-exists-with-different-credential':
      return 'Ya existe una cuenta con este correo electrónico pero con otro método de inicio de sesión.';
    case 'auth/unauthorized-domain':
      return 'Este dominio no está autorizado para la autenticación de Firebase. Si estás en desarrollo, agrega este dominio en la consola de Firebase.';
    
    // Default error
    default:
      return 'Ocurrió un error durante la autenticación. Por favor, inténtalo de nuevo.';
  }
};

// Export functions and objects
export { 
  auth, 
  signInWithGoogle, 
  registerWithEmailAndPassword, 
  loginWithEmailAndPassword,
  logoutUser,
  onAuthStateChanged,
  storage,
  googleProvider,
  getAuthErrorMessage,
  updateProfile
};
