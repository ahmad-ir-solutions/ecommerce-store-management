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
  const { mutate: resetPassword, isPending: isLoading } = useResetPassword();
  const navigate = useNavigate();
  const location = useLocation();
  // Attempt to get email and OTP from location state
  const email = location.state?.email;
  const otp = location.state?.otp; 


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    // Check if API requires email/otp. Adjust payload accordingly.
    const payload = { 
      ...data,
      email: email, // Include email if needed by API
      otp: otp      // Include OTP if needed by API
    };
    
    if (!email || !otp) {
      showErrorMessage("Missing required information. Please try the forgot password process again.");
      navigate('/auth/forgot-password');
      return;
    }

    try {
      await resetPassword(payload);
    } catch (err: unknown) {
      showErrorMessage(err instanceof Error ? err.message : "Password reset failed.");
    }
  };


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
            <Link to="/auth/login" className="font-medium text-[#024AFE] hover:text-[#1302fe]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
