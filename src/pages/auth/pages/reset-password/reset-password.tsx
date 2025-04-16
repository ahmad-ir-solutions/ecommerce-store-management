import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import loginBg from "@/assets/images/login-bg.svg";
import { PasswordInput } from "@/components/ui/PasswordInput"
import { showErrorMessage } from "@/lib/utils/messageUtils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useResetPassword } from "../../core/hooks/useAuth"
import { ResetPasswordFormData } from "../../core/_models";
import { resetPasswordSchema } from "../../core/_schema";

export default function ResetPasswordPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const { mutate, isPending: isLoading } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await mutate(data);
      navigate("/auth/login", { state: { message: "Password reset successfully. Please log in with your new password." } });
    } catch (err: unknown) {
      showErrorMessage(err instanceof Error ? err.message : "Password reset failed. Please try again.")
    }
  }

  if (!email) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Invalid Request</h1>
          <p className="mt-2 text-gray-600">Please start the password reset process from the beginning.</p>
          <Link to="/auth/forgot-password" className="mt-4 inline-block text-blue-500 hover:text-blue-400">
            Go to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-md">
        <div className="mb-6 text-start">
          <h1 className="text-2xl font-bold text-gray-900">Reset Your Password</h1>
          <p className="mt-2 text-gray-600">
            Please enter your new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password*
            </label>
            <PasswordInput
              id="newPassword"
              type="password"
              {...register("newPassword")}
              className={`w-full ${errors.newPassword ? "border-red-500" : ""}`}
            />
            {errors.newPassword && <p className="mt-1 text-xs text-red-600">{errors.newPassword.message}</p>}
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-700">
              Confirm New Password*
            </label>
            <PasswordInput
              id="confirmNewPassword"
              type="password"
              {...register("confirmNewPassword")}
              className={`w-full ${errors.confirmNewPassword ? "border-red-500" : ""}`}
            />
            {errors.confirmNewPassword && <p className="mt-1 text-xs text-red-600">{errors.confirmNewPassword.message}</p>}
          </div>

          <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Remember your password?{" "}
            <Link to="/auth/login" className="font-medium text-blue-500 hover:text-blue-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
