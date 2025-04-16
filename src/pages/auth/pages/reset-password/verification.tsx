import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import loginBg from "@/assets/images/login-bg.svg";
import { showErrorMessage } from "@/lib/utils/messageUtils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useVerifyOtp } from "../../core/hooks/useAuth"
import { OTPFormData } from "../../core/_models";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { otpSchema } from "../../core/_schema";


export default function VerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const { mutate, isPending: isLoading } = useVerifyOtp();

  const {
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
  });

  const onSubmit = async (data: OTPFormData) => {
    try {
      await mutate(data);
      navigate("/auth/reset-password", { state: { email } });
    } catch (err: unknown) {
      showErrorMessage(err instanceof Error ? err.message : "OTP verification failed. Please try again.")
    }
  }

  const handleOTPComplete = (value: string) => {
    setValue("otp", value);
  };

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
          <h1 className="text-2xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="mt-2 text-gray-600">
            We've sent a verification code to <span className="font-medium">{email}</span>. 
            Please enter the code below to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Verification Code*
            </label>
            <InputOTP
              maxLength={6}
              onComplete={handleOTPComplete}
              render={({ slots }) => (
                <InputOTPGroup>
                  {slots.map((slot, index) => (
                    <InputOTPSlot key={index} {...slot} index={index} />
                  ))}
                </InputOTPGroup>
              )}
            />
            {errors.otp && <p className="mt-1 text-xs text-red-600">{errors.otp.message}</p>}
          </div>

          <Button variant="primary" type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Verify Code"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Didn't receive a code?{" "}
            <Link to="/auth/forgot-password" className="font-medium text-blue-500 hover:text-blue-400">
              Resend
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
