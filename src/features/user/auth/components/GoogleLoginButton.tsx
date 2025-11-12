import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { authAPI } from "../api/auth.api";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";
import { useState } from "react";
import { Spinner } from "../../../../components/ui/Spinner";

interface GoogleLoginButtonProps {
  onSuccess?: () => void;
}

export default function GoogleLoginButton({ onSuccess }: GoogleLoginButtonProps) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async (response: CredentialResponse) => {
    if (!response.credential) {
      toast.error("Google login failed");
      return;
    }

    setIsLoading(true);
    try {
      const user = await authAPI.googleLogin({ token: response.credential });
      login(user);
      toast.success(`Welcome back, ${user.firstName}!`);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      navigate("/");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full flex justify-center py-2">
        <Spinner size="sm" />
      </div>
    );
  }

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => toast.error("Google login failed")}
      width="100%"
      theme="outline"
      size="large"
      text="continue_with"
    />
  );
}