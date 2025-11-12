import { useState } from "react";

export function useAuthModal() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<"login" | "register">("login");

  const openAuthModal = (view: "login" | "register" = "login") => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    // Reset to login view when closing
    setTimeout(() => setAuthModalView("login"), 300);
  };

  const switchAuthModalView = (view: "login" | "register") => {
    setAuthModalView(view);
  };

  return {
    isAuthModalOpen,
    authModalView,
    openAuthModal,
    closeAuthModal,
    switchAuthModalView,
    setIsAuthModalOpen,
  };
}