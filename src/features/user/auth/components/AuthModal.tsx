import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";
import GoogleLoginButton from "./GoogleLoginButton";
import loginCover from "../../../../assets/images/login-cover.jpg";
import registerCover from "../../../../assets/images/register-cover.jpg";
import { Spinner } from "../../../../components/ui/Spinner";

type AuthModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  defaultView?: "login" | "register";
};

export default function AuthModal({ 
  isOpen, 
  setIsOpen, 
  defaultView = "login" 
}: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(defaultView === "login");

  const loginHook = useLogin(setIsOpen);
  const registerHook = useRegister(setIsOpen);

  const { form: loginForm, onSubmit: loginSubmit, isLoading: loginLoading } = loginHook;
  const { register: loginRegister, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors, isValid: isLoginValid } } = loginForm;

  const { form: registerForm, onSubmit: registerSubmit, isLoading: registerLoading } = registerHook;
  const { register: registerRegister, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors, isValid: isRegisterValid } } = registerForm;

  // Reset forms when modal opens/closes or switches mode
  useEffect(() => {
    if (!isOpen) {
      loginForm.reset();
      registerForm.reset();
    }
  }, [isOpen, loginForm, registerForm]);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen, setIsOpen]);

  const handleViewSwitch = (view: "login" | "register") => {
    loginForm.reset();
    registerForm.reset();
    setIsLogin(view === "login");
  };

  const handleClose = () => {
    if (!loginLoading && !registerLoading) setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-8">
      <div
        className="bg-white w-1/2 max-w-full h-[650px] rounded-xl shadow-2xl overflow-hidden relative flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="loginLayout"
              className="flex flex-col md:flex-row w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image Left */}
              <div className="hidden md:block md:w-1/2 h-auto">
                <img
                  src={loginCover}
                  alt="Login Cover"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Login Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={handleClose}
                  disabled={loginLoading || registerLoading}
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
                  <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                <form onSubmit={handleLoginSubmit(loginSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-sm font-medium">Email Address</Label>
                    <Input id="login-email" type="email" placeholder="Enter your email" {...loginRegister("email")} disabled={loginLoading} />
                    {loginErrors.email && <span className="text-red-500 text-sm">{loginErrors.email.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-sm font-medium">Password</Label>
                    <Input id="login-password" type="password" placeholder="Enter your password" {...loginRegister("password")} disabled={loginLoading} />
                    {loginErrors.password && <span className="text-red-500 text-sm">{loginErrors.password.message}</span>}
                  </div>

                  <Button type="submit" className="w-full mt-2" disabled={loginLoading || !isLoginValid}>
                    {loginLoading ? <div className="flex items-center justify-center gap-2"><Spinner size="sm" /> Signing in...</div> : "Sign In"}
                  </Button>
                </form>

                <div className="flex items-center my-6">
                  <hr className="flex-1 border-gray-300" />
                  <span className="px-3 text-gray-500 text-sm">Or continue with</span>
                  <hr className="flex-1 border-gray-300" />
                </div>

                <GoogleLoginButton onSuccess={() => setIsOpen(false)} />

                <p className="mt-6 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => handleViewSwitch("register")}
                    disabled={loginLoading || registerLoading}
                  >
                    Sign up
                  </button>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="registerLayout"
              className="flex flex-col md:flex-row w-full h-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              {/* Register Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={handleClose}
                  disabled={loginLoading || registerLoading}
                >
                  <X size={24} />
                </button>

                <div className="text-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
                  <p className="text-gray-600 mt-2">Join us today</p>
                </div>

                <form onSubmit={handleRegisterSubmit(registerSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label htmlFor="register-firstName" className="text-sm font-medium">First Name</Label>
                      <Input id="register-firstName" type="text" placeholder="First name" {...registerRegister("firstName")} disabled={registerLoading} />
                      {registerErrors.firstName && <span className="text-red-500 text-sm">{registerErrors.firstName.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-lastName" className="text-sm font-medium">Last Name</Label>
                      <Input id="register-lastName" type="text" placeholder="Last name" {...registerRegister("lastName")} disabled={registerLoading} />
                      {registerErrors.lastName && <span className="text-red-500 text-sm">{registerErrors.lastName.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-sm font-medium">Email Address</Label>
                    <Input id="register-email" type="email" placeholder="Enter your email" {...registerRegister("email")} disabled={registerLoading} />
                    {registerErrors.email && <span className="text-red-500 text-sm">{registerErrors.email.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-sm font-medium">Password</Label>
                    <Input id="register-password" type="password" placeholder="Create a password" {...registerRegister("password")} disabled={registerLoading} />
                    {registerErrors.password && <span className="text-red-500 text-sm">{registerErrors.password.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="register-confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                    <Input id="register-confirmPassword" type="password" placeholder="Confirm your password" {...registerRegister("confirmPassword")} disabled={registerLoading} />
                    {registerErrors.confirmPassword && <span className="text-red-500 text-sm">{registerErrors.confirmPassword.message}</span>}
                  </div>

                  <Button type="submit" className="w-full mt-2" disabled={registerLoading || !isRegisterValid}>
                    {registerLoading ? <div className="flex items-center justify-center gap-2"><Spinner size="sm" /> Creating account...</div> : "Create Account"}
                  </Button>
                </form>

                <div className="flex items-center my-6">
                  <hr className="flex-1 border-gray-300" />
                  <span className="px-3 text-gray-500 text-sm">Or continue with</span>
                  <hr className="flex-1 border-gray-300" />
                </div>

                <GoogleLoginButton onSuccess={() => setIsOpen(false)} />

                <p className="mt-6 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-700 font-medium"
                    onClick={() => handleViewSwitch("login")}
                    disabled={loginLoading || registerLoading}
                  >
                    Sign in
                  </button>
                </p>
              </div>

              {/* Image Right */}
              <div className="hidden md:block md:w-1/2 h-auto">
                <img src={registerCover} alt="Register Cover" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
