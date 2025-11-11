import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import { authAPI } from "../api/auth.api";
import { useAuth } from "../../../../hooks/useAuth";
import { useNavigate } from "react-router";

export default function GoogleLoginButton() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleGoogleLogin = async (response: CredentialResponse) => {
    if (!response.credential) {
      toast.error("Google login failed");
      return;
    }

    try {
      // Call backend API to login/register with Google token
      const user = await authAPI.googleLogin({ token: response.credential });
      login(user);
      toast.success(`Welcome back, ${user.firstName}!`);
      navigate("/");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleGoogleLogin}
      onError={() => toast.error("Google login failed")}
      width="100%"
    />
  );
}
