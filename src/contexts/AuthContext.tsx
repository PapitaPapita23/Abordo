
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  signInWithGoogle, 
  registerWithEmailAndPassword, 
  loginWithEmailAndPassword,
  logoutUser,
  onAuthStateChanged
} from '@/firebase/firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  email: string | null;
  name: string | null;
  photoURL: string | null;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const userData: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'Usuario',
          photoURL: firebaseUser.photoURL,
        };
        
        setUser(userData);
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  // Google login
  const loginWithGoogleHandler = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await signInWithGoogle();
      const firebaseUser = result.user;
      
      toast({
        title: "Inicio de sesión exitoso",
        description: `Bienvenido, ${firebaseUser.displayName || firebaseUser.email}`,
      });
      
      return true;
    } catch (error: any) {
      console.error("Error logging in with Google:", error);
      
      toast({
        title: "Error de autenticación",
        description: error.message || "Hubo un problema al iniciar sesión con Google",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Email/password login
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await loginWithEmailAndPassword(email, password);
      
      toast({
        title: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error logging in:", error);
      
      let errorMessage = "Hubo un problema al iniciar sesión";
      if (error.code === "auth/invalid-credential") {
        errorMessage = "Credenciales inválidas. Verifica tu email y contraseña.";
      } else if (error.code === "auth/user-not-found") {
        errorMessage = "Usuario no encontrado";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Contraseña incorrecta";
      }
      
      toast({
        title: "Error de inicio de sesión",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Email/password registration
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const userCredential = await registerWithEmailAndPassword(email, password);
      
      toast({
        title: "Registro exitoso",
        description: "Tu cuenta ha sido creada correctamente",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error registering:", error);
      
      let errorMessage = "Hubo un problema al registrar tu cuenta";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Este email ya está en uso";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "La contraseña es demasiado débil";
      }
      
      toast({
        title: "Error de registro",
        description: errorMessage,
        variant: "destructive",
      });
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout
  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await logoutUser();
      
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      
      toast({
        title: "Error",
        description: "Hubo un problema al cerrar sesión",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle: loginWithGoogleHandler,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
