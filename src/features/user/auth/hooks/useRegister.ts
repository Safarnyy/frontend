import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { authAPI } from "../api/auth.api";
import { registerSchema, type RegisterForm } from "../schemas/auth.schema";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../hooks/useAuth";
import { useCallback } from "react";

export function useRegister(onSuccessCallback?: () => void) {
  const navigate = useNavigate();
  const { login: loginContext } = useAuth();

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const registerMutation = useMutation({
    mutationFn: (values: RegisterForm) => {
      // Remove confirmPassword before sending to API
      const {  ...apiValues } = values;
      return authAPI.register(apiValues);
    },
    onSuccess: async (user) => {
      loginContext(user);
      toast.success(`Welcome, ${user.firstName}!`);
      
      // Call the success callback to close modal
      if (onSuccessCallback) {
        onSuccessCallback();
      }
      
      navigate("/");
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Registration failed";
      toast.error(message);
      
      // Clear password fields on error
      form.setValue("password", "");
      form.setValue("confirmPassword", "");
    },
  });

  const onSubmit = useCallback((values: RegisterForm) => {
    registerMutation.mutate(values);
  }, [registerMutation]);

  return {
    form,
    onSubmit,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
  };
}