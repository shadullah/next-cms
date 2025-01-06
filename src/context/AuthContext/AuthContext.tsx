"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  currentUser: string | null;
  login: (email: string) => boolean;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage only after component mounts (client-side)
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setCurrentUser(storedEmail);
    }
    setIsLoading(false);
  }, []);

  const login = (email: string): boolean => {
    if (email) {
      setCurrentUser(email);
      localStorage.setItem("email", email);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("email");
  };

  const value = {
    currentUser,
    login,
    logout,
    isLoading,
  };

  // Show nothing while loading to prevent hydration mismatch
  if (isLoading) {
    return null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
