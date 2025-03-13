
// src/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  GoogleAuthProvider, 
  createUserWithEmailAndPassword, 
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult, 
  onAuthStateChanged,
  User
} from "firebase/auth";

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB_4vEdG0Cv35S5ufLcQIovdrofPcw4K3E",
  authDomain: "abordo-70372.firebaseapp.com",
  projectId: "abordo-70372",
  storageBucket: "abordo-70372.firebasestorage.app",
  messagingSenderId: "374371425258",
  appId: "1:374371425258:web:10521a2d2b3a3c1de37093",
  measurementId: "G-25TP4GY830"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Proveedor de Google con configuración optimizada
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
  // Solicita el perfil y el email del usuario para tener más información
  scope: 'profile email'
});

// Función mejorada para registrar usuario con Google
const registerWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Usuario autenticado con Google:", user);
    // Almacenar datos mínimos necesarios en localStorage para referencia rápida
    saveUserToLocalStorage(user);
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
};

// Función para iniciar sesión con Google con redirección (alternativa para dispositivos móviles)
const loginWithGoogleRedirect = async () => {
  try {
    await signInWithRedirect(auth, googleProvider);
  } catch (error) {
    console.error("Error al redirigir para inicio de sesión con Google:", error);
    throw error;
  }
};

// Función para obtener el resultado de la autenticación por redirección
const getGoogleRedirectResult = async () => {
  try {
    const result = await getRedirectResult(auth);
    if (result) {
      const user = result.user;
      saveUserToLocalStorage(user);
      return user;
    }
    return null;
  } catch (error) {
    console.error("Error al procesar resultado de redirección:", error);
    throw error;
  }
};

// Función para guardar datos importantes del usuario en localStorage
const saveUserToLocalStorage = (user: User) => {
  const userData = {
    uid: user.uid,
    displayName: user.displayName,
    email: user.email,
    photoURL: user.photoURL,
  };
  localStorage.setItem('firebaseUser', JSON.stringify(userData));
};

// Función para registrar usuario con correo electrónico y contraseña
const registerWithEmailAndPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("Usuario registrado con éxito:", user);
    return user;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Función para comprobar si hay un usuario autenticado al cargar la página
const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      if (user) {
        saveUserToLocalStorage(user);
      }
      resolve(user);
    });
  });
};

export { 
  auth, 
  registerWithGoogle, 
  registerWithEmailAndPassword, 
  googleProvider, 
  loginWithGoogleRedirect, 
  getGoogleRedirectResult,
  getCurrentUser
};
