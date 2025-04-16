import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Form, FormField, FormItem, FormControl, FormMessage } from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import useBack from "@/hooks/use-back";
// import { verifyOtp } from "../../core/_requests";
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils";
import { OTPFormData } from "../../core/_models";
import { otpSchema } from "../../core/_schema";
import loginBg from "@/assets/images/login-bg.svg";

function Verification() {
  const navigate = useNavigate();
  const forgotEmail = localStorage.getItem("forgotEmail");
  const { handleBack } = useBack();

  const [countdown, setCountdown] = useState(59);
  const [resendDisabled, setResendDisabled] = useState(false);

  const form = useForm<OTPFormData>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: OTPFormData) => {
    try {
      await verifyOtp({ email: forgotEmail, otp: values.otp });
      showSuccessMessage("Verified Otp");
      localStorage.setItem("verifiedOtp", values.otp);
      navigate("/auth/reset-password");
    } catch (error) {
      showErrorMessage("Invalid OTP. Time out!");
      console.error("Error:", error);
    }
  };

  // Countdown timer logic
  useEffect(() => {
    const storedTimestamp = localStorage.getItem("resendTimestamp");
    if (storedTimestamp) {
      const diff = Math.floor((Date.now() - parseInt(storedTimestamp, 10)) / 1000);
      if (diff < 59) {
        setResendDisabled(true);
        setCountdown(59 - diff);
      }
    }
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown <= 0) {
      setResendDisabled(false);
    }
    return () => clearTimeout(timer);
  }, [resendDisabled, countdown]);

  return (
    <section className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-md">
          <h1 className="text-3xl pb-1 font-semibold text-black">Verify OTP</h1>
          <h2 className="text-lg pb-8 text-gray-600">Enter the 6-digit OTP sent to your email</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="otp">Enter OTP</Label>
                    <FormControl>
                      {/* <Input
                        id="otp"
                        type="text"
                        maxLength={6}
                        placeholder="Enter OTP"
                        className="text-center tracking-widest text-xl"
                        {...field}
                      /> */}
                      <InputOTP 
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      >
                      <InputOTPGroup>
                        {[...Array(6)].map((_, i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant="primary" type="submit" className="w-full mt-4" disabled={form.watch("otp").length < 6}>
              Submit
            </Button>

              <Button
                type="button" className="w-full rounded-3xl"
                variant="outline"
                disabled={resendDisabled}
              >
                {resendDisabled ? `Resend OTP (${countdown})` : "Resend OTP"}
              </Button>
          
            <Button variant="outline" onClick={handleBack} type="button" className="w-full rounded-3xl">
              Cancel
            </Button>
            </form>
          </Form>
        </div>
      </section>
  );
}

export default Verification;
