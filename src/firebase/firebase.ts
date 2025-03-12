// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

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

// Proveedor de Google para la autenticación
const googleProvider = new GoogleAuthProvider();

// Función para registrar usuario con Google
const registerWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("Usuario autenticado con Google:", user);
    return user;
  } catch (error) {
    console.error("Error al iniciar sesión con Google:", error);
    throw error;
  }
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

export { auth, registerWithGoogle, registerWithEmailAndPassword, googleProvider };
