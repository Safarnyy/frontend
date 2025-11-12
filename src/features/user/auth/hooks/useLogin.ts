import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authAPI } from "../api/auth.api";
import { loginSchema, type LoginForm } from "../schemas/auth.schema";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../hooks/useAuth";
import { useCallback } from "react";

export function useLogin(onSuccessCallback?: () => void) {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onChange",
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginForm) => authAPI.login(values),
    onSuccess: async (user) => {
      loginContext(user);
      toast.success(`Welcome back, ${user.firstName}!`);
      
      // Call the success callback to close modal
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      
      navigate("/");
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Login failed";
      toast.error(message);
      
      // Clear password field on error
      form.setValue("password", "");
    },
  });

  const onSubmit = useCallback((values: LoginForm) => {
    loginMutation.mutate(values);
  }, [loginMutation]);

  return { 
    form, 
    onSubmit, 
    isLoading: loginMutation.isPending, 
    error: loginMutation.error 
  };
}