
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Button } from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/input";
import { PUBLIC_ROUTES } from "../../../../constants/routes";
import GoogleLoginButton from "../components/GoogleLoginButton";

// ✅ Import cover image using alias
import coverImage from "@/assets/images/login-cover.jpg";
import { useLogin } from "../hooks/useLogin";

export default function LoginModalSideFull() {
  const [isOpen, setIsOpen] = useState(false);
  const { form, onSubmit, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <div>
      <Button variant="outline" onClick={() => setIsOpen(true)}>
        Login
      </Button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-background w-full max-w-4xl rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ===== LEFT IMAGE ===== */}
            <div className="hidden md:block md:w-1/2 h-80 md:h-auto">
              <img
                src={coverImage}
                alt="Login Cover"
                className="w-full h-full object-cover"
              />
            </div>

            {/* ===== RIGHT FORM ===== */}
            <div className="w-full md:w-1/2 p-6 relative">
              {/* Close Button */}
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X size={20} />
              </button>

              <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Email */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && (
                    <span className="text-red-500 text-sm">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1">
                  <Label htmlFor="password">Password</Label>
                  <Input id="password" type="password" {...register("password")} />
                  {errors.password && (
                    <span className="text-red-500 text-sm">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end">
                  <Link
                    to={PUBLIC_ROUTES.FORGOT_PASSWORD}
                    className="text-sm font-medium text-blue-600 hover:underline"
                    onClick={() => setIsOpen(false)}
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit */}
                <Button type="submit" className="mt-2" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-2 text-gray-400 text-sm">or</span>
                <hr className="flex-1 border-gray-300" />
              </div>

              {/* Google Login */}
              <GoogleLoginButton />

              {/* Register Link */}
              <p className="mt-4 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to={PUBLIC_ROUTES.REGISTER}
                  className="text-blue-600 font-medium hover:underline"
                  onClick={() => setIsOpen(false)}
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
