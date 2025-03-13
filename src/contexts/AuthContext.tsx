import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  signInWithGoogle, 
  registerWithEmailAndPassword, 
  loginWithEmailAndPassword,
  logoutUser,
  onAuthStateChanged,
  getAuthErrorMessage,
  updateProfile
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
  updateUserProfile: (name: string, photoURL?: string) => Promise<boolean>;
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
        
        // Show welcome toast when user logs in
        toast({
          title: "¡Bienvenido de nuevo!",
          description: `Hola, ${userData.name}`,
        });
      } else {
        // User is signed out
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, [toast]);

  // Google login with improved error handling
  const loginWithGoogleHandler = async (): Promise<boolean> => {
    try {
      setIsLoading(true);
      const result = await signInWithGoogle();
      const firebaseUser = result.user;
      
      // Success toast shown by useEffect when auth state changes
      return true;
    } catch (error: any) {
      console.error("Error logging in with Google:", error);
      
      // Specific handling for unauthorized domain error
      if (error.code === 'auth/unauthorized-domain') {
        // Show more detailed error for development environments
        const currentDomain = window.location.hostname;
        const isLocalhost = ['localhost', '127.0.0.1'].includes(currentDomain);
        
        const errorTitle = isLocalhost 
          ? "Error de configuración de Firebase" 
          : "Error de autenticación";
          
        const errorMessage = isLocalhost
          ? `El dominio "${currentDomain}" no está autorizado. Agrega "${currentDomain}" en Firebase Console > Authentication > Settings > Authorized domains.`
          : "Este dominio no está autorizado para usar la autenticación de Google. Por favor, contacta al administrador.";
        
        toast({
          title: errorTitle,
          description: errorMessage,
          variant: "destructive",
          duration: 6000, // Show longer for this important error
        });
      } else {
        // Handle other errors
        const errorMessage = error.code 
          ? getAuthErrorMessage(error.code)
          : "Hubo un problema al iniciar sesión con Google";
        
        toast({
          title: "Error de autenticación",
          description: errorMessage,
          variant: "destructive",
        });
      }
      
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Email/password login with improved error handling
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await loginWithEmailAndPassword(email, password);
      
      // Success toast shown by useEffect when auth state changes
      return true;
    } catch (error: any) {
      console.error("Error logging in:", error);
      
      const errorMessage = error.code 
        ? getAuthErrorMessage(error.code) 
        : "Hubo un problema al iniciar sesión";
      
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

  // Email/password registration with improved error handling and user profile setup
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      await registerWithEmailAndPassword(email, password, name);
      
      // Success toast shown by useEffect when auth state changes
      return true;
    } catch (error: any) {
      console.error("Error registering:", error);
      
      const errorMessage = error.code 
        ? getAuthErrorMessage(error.code) 
        : "Hubo un problema al registrar tu cuenta";
      
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

  // Logout with improved handling
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

  // Update user profile
  const updateUserProfile = async (name: string, photoURL?: string): Promise<boolean> => {
    try {
      if (!auth.currentUser) return false;
      
      const updateData: { displayName: string; photoURL?: string } = { displayName: name };
      if (photoURL) updateData.photoURL = photoURL;
      
      await updateProfile(auth.currentUser, updateData);
      
      // Update local user state
      setUser(prev => {
        if (!prev) return null;
        return {
          ...prev,
          name,
          ...(photoURL ? { photoURL } : {})
        };
      });
      
      toast({
        title: "Perfil actualizado",
        description: "Tu información de perfil ha sido actualizada correctamente",
      });
      
      return true;
    } catch (error: any) {
      console.error("Error updating profile:", error);
      
      toast({
        title: "Error al actualizar el perfil",
        description: "No se pudo actualizar tu información de perfil",
        variant: "destructive",
      });
      
      return false;
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
        updateUserProfile,
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
