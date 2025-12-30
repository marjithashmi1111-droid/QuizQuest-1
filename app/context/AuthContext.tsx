import React, { createContext, useContext, ReactNode, useEffect, useState } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  userRole: "student" | "teacher" | null;
  userId: string | null;
  userName: string | null;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  userRole: null,
  userId: null,
  userName: null,
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<"student" | "teacher" | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("userRole") as "student" | "teacher" | null;
      const id = localStorage.getItem("userId");
      const name = localStorage.getItem("userName");

      if (token && role && id) {
        setIsAuthenticated(true);
        setUserRole(role);
        setUserId(id);
        setUserName(name);
      } else {
        setIsAuthenticated(false);
        setUserRole(null);
        setUserId(null);
        setUserName(null);
      }
      setLoading(false);
    };

    checkAuth();
    // Listen for storage changes to sync tabs
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
    setUserRole(null);
    setUserId(null);
    setUserName(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, userRole, userId, userName, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const getToken = () => localStorage.getItem("token");
