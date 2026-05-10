import React, { createContext, useContext, useState, useCallback } from "react";
import { MOCK_USERS, type User, type UserRole } from "@/data/mock";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  logout: () => void;
  isAuthenticated: boolean;
  updateSavedProperties: (propertyIds: string[]) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("realhaven_user");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const found = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) {
      return { success: false, error: "Invalid email or password" };
    }
    if (found.status === "suspended") {
      return { success: false, error: "Your account has been suspended" };
    }
    setUser(found);
    localStorage.setItem("realhaven_user", JSON.stringify(found));
    return { success: true, role: found.role };
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("realhaven_user");
  }, []);

  const updateSavedProperties = useCallback((propertyIds: string[]) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, savedProperties: propertyIds };
      localStorage.setItem("realhaven_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated: !!user, updateSavedProperties }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
