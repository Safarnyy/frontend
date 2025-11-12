import React, { useState, useEffect, useCallback } from "react";
import { AuthContext, type User, type UpdatedUser } from "./AuthContext";
import { authAPI } from "../features/user/auth/api/auth.api";

type Props = { children: React.ReactNode };

export default function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [resetEmail, setResetEmail] = useState<string | null>(null);
  const [isCodeVerified, setIsCodeVerified] = useState(false);

  const isAuthenticated = !!user;

  const fetchCurrentUser = useCallback(async () => {
    try {
      const me = await authAPI.me();
      setUser(me);
    } catch (error) {
      console.error("Failed to fetch current user:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = useCallback((loggedUser: User) => {
    setUser(loggedUser);
    setUpdatedUser(null);
  }, []);

  const logout = useCallback(async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setUser(null);
      setUpdatedUser(null);
      setResetEmail(null);
      setIsCodeVerified(false);
    }
  }, []);

  const updateUser = useCallback((updated: UpdatedUser) => {
    setUser((prev) => prev ? { ...prev, ...updated } : null);
    setUpdatedUser(updated);
  }, []);

  const handleSetUser = useCallback((newUser: User | null) => {
    setUser(newUser);
    if (!newUser) {
      setUpdatedUser(null);
    }
  }, []);

  const handleSetUpdatedUser = useCallback((updated: UpdatedUser | null) => {
    setUpdatedUser(updated);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        updatedUser,
        setUpdatedUser: handleSetUpdatedUser,
        setUser: handleSetUser,
        isAuthenticated,
        isLoading,
        login,
        logout,
        updateUser,
        resetEmail,
        setResetEmail,
        isCodeVerified,
        setIsCodeVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}