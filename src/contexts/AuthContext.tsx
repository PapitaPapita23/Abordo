
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User as FirebaseUser, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, getCurrentUser } from '@/firebase/firebase';
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
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  refreshUserData: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Función para convertir FirebaseUser a nuestro tipo User
  const formatUser = (firebaseUser: FirebaseUser): User => {
    return {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      photoURL: firebaseUser.photoURL
    };
  };

  // Función para refrescar los datos del usuario desde Firebase
  const refreshUserData = () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(formatUser(currentUser));
    }
  };

  useEffect(() => {
    // Verificar si hay un usuario en localStorage primero para una carga rápida
    const storedUser = localStorage.getItem('firebaseUser');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser({
          id: parsedUser.uid,
          email: parsedUser.email,
          name: parsedUser.displayName,
          photoURL: parsedUser.photoURL
        });
      } catch (e) {
        console.error("Error parsing stored user:", e);
      }
    }

    // Verificar estado de autenticación con Firebase
    const initAuth = async () => {
      try {
        const firebaseUser = await getCurrentUser();
        if (firebaseUser) {
          setUser(formatUser(firebaseUser));
        } else {
          setUser(null);
          localStorage.removeItem('firebaseUser');
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
        toast({
          title: "Error",
          description: "Hubo un problema al verificar tu sesión",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // Configurar listener para cambios de estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser(formatUser(firebaseUser));
      } else {
        setUser(null);
        localStorage.removeItem('firebaseUser');
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mantener la función de login para autenticación con email/password
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Find user with matching email and password
    const matchedUser = users.find((u: any) => 
      u.email === email && u.password === password
    );
    
    if (matchedUser) {
      // Create a copy without the password
      const { password, ...userWithoutPassword } = matchedUser;
      
      // Save user to localStorage and update state
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      setUser({
        id: userWithoutPassword.id,
        email: userWithoutPassword.email,
        name: userWithoutPassword.name,
        photoURL: null
      });
      return true;
    }
    
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Mantener la función de registro para autenticación con email/password
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user already exists
    if (users.some((u: any) => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };
    
    // Add to users array and save
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Log user in
    const { password: _, ...userWithoutPassword } = newUser;
    localStorage.setItem('user', JSON.stringify(userWithoutPassword));
    setUser({
      id: userWithoutPassword.id,
      email: userWithoutPassword.email,
      name: userWithoutPassword.name,
      photoURL: null
    });
    
    return true;
  };

  const logout = () => {
    auth.signOut();
    localStorage.removeItem('user');
    localStorage.removeItem('firebaseUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        isLoading,
        login, 
        register, 
        logout,
        refreshUserData
      }}
    >
      {!isLoading ? children : (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#599ACF]"></div>
        </div>
      )}
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
