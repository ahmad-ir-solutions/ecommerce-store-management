import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import useBack from "@/hooks/use-back";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils";
import { ResetPasswordFormData } from "../../core/_models";
import loginBg from "@/assets/images/login-bg.svg"; 
import { formSchema } from "../../core/_schema";
import { resetPassword } from "../../core/_requests";

function ResetPassword() {
  const { handleBack } = useBack();
  const navigate = useNavigate();

  const forgotEmail = localStorage.getItem("forgotEmail");
  const verifiedOtp = localStorage.getItem("verifiedOtp");

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    const body = {
      email: forgotEmail,
      newPassword: values.newPassword,
      otp: verifiedOtp,
    };

    await resetPassword(body);

    try {
      // await resetPassword(body);
      showSuccessMessage("Successfully updated!");
      localStorage.removeItem("forgotEmail");
      localStorage.removeItem("verifiedOtp");
      navigate("/auth/login");
    } catch (error) {
      showErrorMessage("Error while updating!");
      console.error("Reset error:", error);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat" 
    style={{ backgroundImage: `url(${loginBg})` }}>
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-md">
        <h1 className="text-3xl pb-10 font-semibold text-black">Set New Password</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="newPassword">New Password</Label>
                  <FormControl>
                    <PasswordInput type="password" placeholder="New Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmNewPassword"
              render={({ field }) => (
                <FormItem>
                  <Label htmlFor="confirmNewPassword">Confirm New Password</Label>
                  <FormControl>
                    <PasswordInput type="password" placeholder="Confirm Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button variant="primary" type="submit" className="w-full mt-4">
              Submit
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

export default ResetPassword;
